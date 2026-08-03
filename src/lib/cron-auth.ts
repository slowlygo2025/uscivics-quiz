import { NextResponse } from "next/server";

/**
 * Vercel Cron sends Authorization: Bearer $CRON_SECRET.
 * Reject unauthenticated calls in production when secret is set.
 */
export function assertCronAuth(request: Request): NextResponse | null {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    if (process.env.VERCEL === "1" && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { ok: false, error: "CRON_SECRET not configured" },
        { status: 500 }
      );
    }
    return null;
  }
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
