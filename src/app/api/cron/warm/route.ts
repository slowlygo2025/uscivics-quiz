import { NextResponse } from "next/server";
import { assertCronAuth } from "@/lib/cron-auth";
import { SITE_ORIGIN } from "@/lib/indexing-priority";
import { WARM_PATHS } from "@/lib/gsc-server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Lightweight keep-warm for money pages + health.
 * Does not call Indexing API (no publish quota).
 *
 * Auth: Authorization Bearer CRON_SECRET
 */
export async function GET(request: Request) {
  const denied = assertCronAuth(request);
  if (denied) return denied;

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || SITE_ORIGIN;
  const started = Date.now();
  const hits: { path: string; status: number | string; ms: number }[] = [];

  for (const path of WARM_PATHS) {
    const t0 = Date.now();
    try {
      const res = await fetch(`${origin}${path}`, {
        method: "GET",
        headers: { "user-agent": "USCivicsQuiz-WarmCron/1.0" },
        cache: "no-store",
        signal: AbortSignal.timeout(15_000),
      });
      hits.push({ path, status: res.status, ms: Date.now() - t0 });
    } catch (e) {
      hits.push({
        path,
        status: e instanceof Error ? e.message : "fetch_failed",
        ms: Date.now() - t0,
      });
    }
  }

  const ok = hits.every((h) => typeof h.status === "number" && h.status < 500);
  return NextResponse.json({
    ok,
    at: new Date().toISOString(),
    ms: Date.now() - started,
    hits,
  });
}
