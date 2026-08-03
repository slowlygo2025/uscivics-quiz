import { NextResponse } from "next/server";
import { isSentryConfigured } from "@/lib/sentry-options";

/** Lightweight readiness probe for ops (no secrets leaked). */
export async function GET() {
  return NextResponse.json({
    ok: true,
    sentry: isSentryConfigured(),
    env:
      process.env.NEXT_PUBLIC_VERCEL_ENV ||
      process.env.VERCEL_ENV ||
      process.env.NODE_ENV ||
      "unknown",
  });
}
