/**
 * Shared GSC helpers: auth, site id, analytics query, progress file.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { GoogleAuth } from "google-auth-library";

export const SITE = "sc-domain:uscivics-quiz.com";
export const SITEMAP = "https://uscivics-quiz.com/sitemap.xml";
export const SITE_ORIGIN = "https://uscivics-quiz.com";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
export const KEY_PATH = `${ROOT}/secrets/gsc-service-account.json`;
export const PROGRESS_PATH = `${ROOT}/secrets/gsc-index-progress.json`;
export const REPORT_PATH = `${ROOT}/gsc-report.json`;
export const INSIGHTS_PATH = `${ROOT}/gsc-search-insights.json`;

export function loadServiceAccount() {
  if (!existsSync(KEY_PATH)) {
    throw new Error(`Missing ${KEY_PATH}`);
  }
  return JSON.parse(readFileSync(KEY_PATH, "utf8"));
}

export async function getGscClient(scopes) {
  const key = loadServiceAccount();
  const auth = new GoogleAuth({
    credentials: key,
    scopes: scopes ?? [
      "https://www.googleapis.com/auth/indexing",
      "https://www.googleapis.com/auth/webmasters",
      "https://www.googleapis.com/auth/webmasters.readonly",
    ],
  });
  const client = await auth.getClient();
  return { client, email: key.client_email };
}

export function siteEnc() {
  return encodeURIComponent(SITE);
}

/** @returns {{ version: number, updatedAt: string, published: Record<string, string> }} */
export function loadIndexProgress() {
  if (!existsSync(PROGRESS_PATH)) {
    return { version: 1, updatedAt: null, published: {} };
  }
  try {
    return JSON.parse(readFileSync(PROGRESS_PATH, "utf8"));
  } catch {
    return { version: 1, updatedAt: null, published: {} };
  }
}

export function saveIndexProgress(progress) {
  mkdirSync(dirname(PROGRESS_PATH), { recursive: true });
  progress.updatedAt = new Date().toISOString();
  writeFileSync(PROGRESS_PATH, JSON.stringify(progress, null, 2) + "\n");
}

export function markPublished(progress, url, tier) {
  progress.published[url] = {
    at: new Date().toISOString(),
    tier,
  };
}

export function isPublished(progress, url) {
  return Boolean(progress.published?.[url]);
}

export async function submitSitemap(client) {
  const sitemapPath = encodeURIComponent(SITEMAP);
  const res = await client.request({
    url: `https://www.googleapis.com/webmasters/v3/sites/${siteEnc()}/sitemaps/${sitemapPath}`,
    method: "PUT",
  });
  return res.status;
}

export async function listSitemaps(client) {
  const res = await client.request({
    url: `https://www.googleapis.com/webmasters/v3/sites/${siteEnc()}/sitemaps`,
    method: "GET",
  });
  return res.data?.sitemap || [];
}

/**
 * Search Analytics query helper.
 * @param {{ startDate: string, endDate: string, dimensions: string[], rowLimit?: number, dimensionFilterGroups?: unknown }} opts
 */
export async function searchAnalytics(client, opts) {
  const res = await client.request({
    url: `https://www.googleapis.com/webmasters/v3/sites/${siteEnc()}/searchAnalytics/query`,
    method: "POST",
    data: {
      startDate: opts.startDate,
      endDate: opts.endDate,
      dimensions: opts.dimensions,
      rowLimit: opts.rowLimit ?? 250,
      dimensionFilterGroups: opts.dimensionFilterGroups,
    },
  });
  return res.data?.rows || [];
}

/** GSC data lag ~2–3 days */
export function analyticsWindow(days = 28) {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 3);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days);
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

export function isQuotaError(msg) {
  const s = typeof msg === "string" ? msg : JSON.stringify(msg);
  return /quota|rate.?limit|dailyLimitExceeded|rateLimitExceeded/i.test(s);
}

export function errorMessage(e) {
  const err = e?.response?.data?.error || e?.response?.data || e.message;
  return typeof err === "string" ? err : JSON.stringify(err);
}
