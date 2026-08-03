import { GoogleAuth, type JWT } from "google-auth-library";
import { LOCALES } from "@/lib/locales";
import {
  INDEX_PRIORITY,
  SITE_ORIGIN,
  absoluteIndexUrl,
  type IndexTier,
} from "@/lib/indexing-priority";

export const GSC_SITE = "sc-domain:uscivics-quiz.com";
export const GSC_SITEMAP = `${SITE_ORIGIN}/sitemap.xml`;

type SaJson = {
  client_email: string;
  private_key: string;
  [key: string]: unknown;
};

function loadServiceAccount(): SaJson | null {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!raw?.trim()) return null;
  try {
    return JSON.parse(raw) as SaJson;
  } catch {
    throw new Error("GSC_SERVICE_ACCOUNT_JSON is not valid JSON");
  }
}

export function isGscConfigured(): boolean {
  return Boolean(process.env.GSC_SERVICE_ACCOUNT_JSON?.trim());
}

export async function getGscAuthClient() {
  const credentials = loadServiceAccount();
  if (!credentials) {
    throw new Error("GSC_SERVICE_ACCOUNT_JSON missing");
  }
  const auth = new GoogleAuth({
    credentials,
    scopes: [
      "https://www.googleapis.com/auth/indexing",
      "https://www.googleapis.com/auth/webmasters",
      "https://www.googleapis.com/auth/webmasters.readonly",
    ],
  });
  const client = (await auth.getClient()) as JWT;
  return { client, email: credentials.client_email };
}

function siteEnc() {
  return encodeURIComponent(GSC_SITE);
}

export async function submitSitemap(
  client: JWT
): Promise<{ ok: boolean; status?: number; error?: string }> {
  try {
    const sitemapPath = encodeURIComponent(GSC_SITEMAP);
    const res = await client.request({
      url: `https://www.googleapis.com/webmasters/v3/sites/${siteEnc()}/sitemaps/${sitemapPath}`,
      method: "PUT",
    });
    return { ok: true, status: res.status };
  } catch (e) {
    const err = e as { message?: string; response?: { data?: unknown } };
    return {
      ok: false,
      error: JSON.stringify(err.response?.data || err.message || e),
    };
  }
}

export type IndexUrlRow = {
  url: string;
  tier: IndexTier;
  path: string;
  locale: string;
};

/** Flatten INDEX_PRIORITY × locales for a tier. */
export function buildTierUrls(tier: IndexTier): IndexUrlRow[] {
  const paths = INDEX_PRIORITY.filter((i) => i.tier === tier);
  const out: IndexUrlRow[] = [];
  for (const item of paths) {
    for (const locale of LOCALES) {
      out.push({
        url: absoluteIndexUrl(locale, item.path),
        tier,
        path: item.path,
        locale,
      });
    }
  }
  return out;
}

/**
 * Deterministic rotating window — no DB required.
 * Same day → same batch; advances ~budget URLs/day across the list.
 */
export function rotatingBatch<T>(items: T[], budget: number, daySeed?: number): T[] {
  if (!items.length || budget <= 0) return [];
  const day =
    daySeed ?? Math.floor(Date.now() / 86_400_000);
  const start = (day * budget) % items.length;
  const doubled = items.concat(items);
  return doubled.slice(start, start + Math.min(budget, items.length));
}

export async function publishUrlUpdated(
  client: JWT,
  url: string
): Promise<{ ok: boolean; error?: string; quota?: boolean }> {
  try {
    await client.request({
      url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
      method: "POST",
      data: { url, type: "URL_UPDATED" },
    });
    return { ok: true };
  } catch (e) {
    const err = e as { message?: string; response?: { data?: unknown } };
    const msg = JSON.stringify(err.response?.data || err.message || e);
    const quota = /quota|rate.?limit|dailyLimitExceeded|RESOURCE_EXHAUSTED/i.test(
      msg
    );
    return { ok: false, error: msg, quota };
  }
}

/** Lightweight Search Analytics pulse for cron logs. */
export async function searchPulse(
  client: JWT,
  days = 7
): Promise<{
  impressions: number;
  clicks: number;
  queryRows: number;
  window: { startDate: string; endDate: string };
}> {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 3);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days);
  const startDate = start.toISOString().slice(0, 10);
  const endDate = end.toISOString().slice(0, 10);

  try {
    const res = await client.request<{
      rows?: { clicks?: number; impressions?: number }[];
    }>({
      url: `https://www.googleapis.com/webmasters/v3/sites/${siteEnc()}/searchAnalytics/query`,
      method: "POST",
      data: {
        startDate,
        endDate,
        dimensions: ["query"],
        rowLimit: 250,
      },
    });
    const rows = res.data?.rows || [];
    return {
      impressions: rows.reduce((s, r) => s + (r.impressions || 0), 0),
      clicks: rows.reduce((s, r) => s + (r.clicks || 0), 0),
      queryRows: rows.length,
      window: { startDate, endDate },
    };
  } catch {
    return {
      impressions: 0,
      clicks: 0,
      queryRows: 0,
      window: { startDate, endDate },
    };
  }
}

export const WARM_PATHS = [
  "/api/monitoring-health",
  "/en",
  "/es",
  "/en/questions/all-128",
  "/en/questions/all-100",
  "/en/eligibility",
  "/en/practice/2025",
  "/en/learn",
  "/en/learn/n-400-filing-date",
  "/en/learn/65-20",
] as const;
