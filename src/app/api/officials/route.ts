import { NextResponse } from "next/server";
import { getStateInfo } from "@/lib/states";
import type { OfficialPerson, OfficialsResponse } from "@/lib/officials";
import { clientIp, rateLimit } from "@/lib/rate-limit";

type RepsContactMember = {
  type: string;
  first_name: string;
  last_name: string;
  party?: string;
  state?: string;
  district?: number | null;
  url?: string | null;
};

type RepsContactResponse = {
  zip?: string;
  representatives?: RepsContactMember[];
  ambiguous?: boolean;
};

function fullName(m: RepsContactMember) {
  return `${m.first_name} ${m.last_name}`.trim();
}

export async function GET(request: Request) {
  const ip = clientIp(request);
  const limited = await rateLimit({
    key: `officials:${ip}`,
    max: 30,
    windowMs: 60_000,
  });
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many lookups. Try again in a minute." },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const zip = (searchParams.get("zip") ?? "").replace(/\D/g, "").slice(0, 5);

  if (!/^\d{5}$/.test(zip)) {
    return NextResponse.json(
      { error: "Enter a valid 5-digit U.S. ZIP code." },
      { status: 400 }
    );
  }

  try {
    const upstream = await fetch(
      `https://repscontact.com/api/reps?zip=${zip}`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 86400 },
      }
    );

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Could not look up representatives for this ZIP." },
        { status: 502 }
      );
    }

    const data = (await upstream.json()) as RepsContactResponse;
    const members = data.representatives ?? [];
    const stateCode = members.find((m) => m.state)?.state ?? null;
    const state = stateCode ? getStateInfo(stateCode) : null;

    const senators: OfficialPerson[] = members
      .filter((m) => m.type === "sen")
      .map((m) => ({
        name: fullName(m),
        party: m.party ?? null,
        role: "senator" as const,
        district: null,
        url: m.url ?? null,
      }));

    const representatives: OfficialPerson[] = members
      .filter((m) => m.type === "rep")
      .map((m) => ({
        name: fullName(m),
        party: m.party ?? null,
        role: "representative" as const,
        district: m.district ?? null,
        url: m.url ?? null,
      }));

    if (!stateCode && senators.length === 0 && representatives.length === 0) {
      return NextResponse.json(
        { error: "No officials found for this ZIP code." },
        { status: 404 }
      );
    }

    const body: OfficialsResponse = {
      zip,
      state: stateCode,
      stateName: state?.name ?? null,
      capital: state?.capital ?? null,
      governor: state?.governor ?? null,
      senators,
      representatives,
      ambiguous: Boolean(data.ambiguous) || representatives.length > 1,
      sourceNote:
        "Congressional data via RepsContact. Governor/capital from local reference (Aug 2026). Verify current officials before your interview.",
    };

    return NextResponse.json(body, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Lookup failed. Try again in a moment." },
      { status: 502 }
    );
  }
}
