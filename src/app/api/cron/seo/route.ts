import { NextResponse } from "next/server";
import { assertCronAuth } from "@/lib/cron-auth";
import { SITE_ORIGIN } from "@/lib/indexing-priority";
import {
  buildTierUrls,
  getGscAuthClient,
  isGscConfigured,
  publishUrlUpdated,
  rotatingBatch,
  searchPulse,
  submitSitemap,
  WARM_PATHS,
} from "@/lib/gsc-server";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

/**
 * Daily SEO ops:
 * 1) Warm money URLs
 * 2) Resubmit sitemap
 * 3) Re-notify Tier 1 EN+ES
 * 4) Rotating Tier 2 batch (quota-safe)
 * 5) Search Analytics pulse (logs)
 *
 * Auth: Authorization Bearer CRON_SECRET (Vercel Cron).
 * Env: GSC_SERVICE_ACCOUNT_JSON, CRON_SECRET
 * Optional: SEO_CRON_T2_BUDGET (default 40), SEO_CRON_SKIP_INDEX=1
 */
export async function GET(request: Request) {
  const denied = assertCronAuth(request);
  if (denied) return denied;

  const started = Date.now();
  const skipIndex = process.env.SEO_CRON_SKIP_INDEX === "1";
  const t2Budget = Number(process.env.SEO_CRON_T2_BUDGET || "40");
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || SITE_ORIGIN;

  const result: Record<string, unknown> = {
    ok: true,
    at: new Date().toISOString(),
    gscConfigured: isGscConfigured(),
  };

  const warm: { path: string; status: number | string }[] = [];
  for (const path of WARM_PATHS) {
    try {
      const res = await fetch(`${origin}${path}`, {
        method: "GET",
        headers: { "user-agent": "USCivicsQuiz-SEOCron/1.0" },
        cache: "no-store",
        signal: AbortSignal.timeout(20_000),
      });
      warm.push({ path, status: res.status });
    } catch (e) {
      warm.push({
        path,
        status: e instanceof Error ? e.message : "fetch_failed",
      });
    }
  }
  result.warm = warm;

  if (!isGscConfigured()) {
    result.skipped = "GSC_SERVICE_ACCOUNT_JSON missing — warm only";
    result.ms = Date.now() - started;
    return NextResponse.json(result);
  }

  try {
    const { client, email } = await getGscAuthClient();
    result.serviceAccount = email;

    result.sitemap = await submitSitemap(client);
    result.searchPulse = await searchPulse(client, 7);

    if (skipIndex) {
      result.index = { skipped: true, reason: "SEO_CRON_SKIP_INDEX=1" };
    } else {
      const t1 = buildTierUrls(1).filter(
        (r) => r.locale === "en" || r.locale === "es"
      );
      const t2Batch = rotatingBatch(
        buildTierUrls(2),
        Number.isFinite(t2Budget) ? t2Budget : 40
      );

      const published: string[] = [];
      const failed: { url: string; error: string }[] = [];
      let quotaHit = false;

      for (const row of [...t1, ...t2Batch]) {
        if (quotaHit) break;
        const pub = await publishUrlUpdated(client, row.url);
        if (pub.ok) {
          published.push(row.url);
        } else {
          failed.push({ url: row.url, error: pub.error || "unknown" });
          if (pub.quota) {
            quotaHit = true;
            break;
          }
        }
        await new Promise((r) => setTimeout(r, 120));
      }

      result.index = {
        tier1EnEs: t1.length,
        tier2Batch: t2Batch.length,
        published: published.length,
        failed: failed.length,
        quotaHit,
        samplePublished: published.slice(0, 5),
        sampleFailed: failed.slice(0, 3),
      };
    }
  } catch (e) {
    result.ok = false;
    result.error = e instanceof Error ? e.message : String(e);
  }

  result.ms = Date.now() - started;
  return NextResponse.json(result);
}
