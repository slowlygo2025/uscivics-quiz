import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL_EXPORT } from "@/lib/site-pages";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = await rateLimit({
    key: `contact:${ip}`,
    max: 5,
    windowMs: 60_000,
  });
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 }
    );
  }

  let body: {
    name?: string;
    email?: string;
    message?: string;
    locale?: string;
    website?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot — bots fill hidden field
  if (body.website?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim().slice(0, 120);
  const email = (body.email ?? "").trim().slice(0, 160);
  const message = (body.message ?? "").trim().slice(0, 4000);
  const locale = (body.locale ?? "en").trim().slice(0, 8);

  if (!name || !email || !message || !isEmail(email)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = (process.env.CONTACT_TO ?? CONTACT_EMAIL_EXPORT).trim();
  const from =
    process.env.CONTACT_FROM?.trim() || "USCivics Quiz <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error: "not_configured",
        mailto: `mailto:${to}?subject=${encodeURIComponent(`Contact from ${name}`)}&body=${encodeURIComponent(message + `\n\n— ${name} <${email}>`)}`,
      },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `[USCivics Quiz] Contact (${locale}) — ${name}`,
      text: `From: ${name} <${email}>\nLocale: ${locale}\nIP: ${ip}\n\n${message}`,
    });
    if (error) {
      console.error("contact/resend", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact/exception", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
