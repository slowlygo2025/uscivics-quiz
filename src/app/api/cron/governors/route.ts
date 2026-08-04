import { NextResponse } from "next/server";
import { assertCronAuth } from "@/lib/cron-auth";
import { GOVERNORS_AS_OF } from "@/data/governors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Reminder endpoint for governor freshness.
 * Full scrape runs in CI/local via `npm run scrape:governors` (Wikipedia HTML
 * is not reliably fetchable from all Vercel regions). This cron surfaces age
 * in monitoring so stale data is visible.
 */
export async function GET(request: Request) {
  const denied = assertCronAuth(request);
  if (denied) return denied;

  const asOf = new Date(GOVERNORS_AS_OF + "T00:00:00Z");
  const ageDays = Math.floor(
    (Date.now() - asOf.getTime()) / (1000 * 60 * 60 * 24)
  );
  const stale = ageDays > 45;

  return NextResponse.json({
    ok: true,
    asOf: GOVERNORS_AS_OF,
    ageDays,
    stale,
    hint: stale
      ? "Run npm run scrape:governors and deploy updated src/data/governors.ts"
      : "Governors snapshot is fresh enough",
  });
}
