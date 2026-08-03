/** Canonical Google Ads UTM schema for USCQ Search Core. */

export const ADS_UTM_SOURCE = "google";
export const ADS_UTM_MEDIUM = "cpc";
export const ADS_UTM_CAMPAIGN = "uscq_search";

/** Allowed utm_content values (keywords, sitelinks, brand). */
export const ADS_UTM_CONTENT = {
  filing_date: "filing_date",
  eligibility: "eligibility",
  "6520": "6520",
  senior: "senior",
  all128: "all128",
  practice2025: "practice2025",
  brand: "brand",
  competitors: "competitors",
  sitelink_eligibility: "sitelink_eligibility",
  sitelink_filing: "sitelink_filing",
  sitelink_6520: "sitelink_6520",
  sitelink_senior: "sitelink_senior",
  sitelink_all128: "sitelink_all128",
  sitelink_practice: "sitelink_practice",
} as const;

export type AdsUtmContent =
  (typeof ADS_UTM_CONTENT)[keyof typeof ADS_UTM_CONTENT];

const SITE = "https://uscivics-quiz.com";

/**
 * Build an absolute Ads final URL with standard UTMs.
 * @param path Locale path starting with /en/... (or other locale)
 * @param content utm_content token
 */
export function buildAdsFinalUrl(
  path: string,
  content: AdsUtmContent | string
): string {
  const normalized = path.startsWith("http")
    ? path
    : `${SITE}${path.startsWith("/") ? path : `/${path}`}`;
  const url = new URL(normalized);
  url.searchParams.set("utm_source", ADS_UTM_SOURCE);
  url.searchParams.set("utm_medium", ADS_UTM_MEDIUM);
  url.searchParams.set("utm_campaign", ADS_UTM_CAMPAIGN);
  url.searchParams.set("utm_content", content);
  return url.toString();
}

/** Query string only (for appending to existing paths). */
export function adsUtmQuery(content: AdsUtmContent | string): string {
  const q = new URLSearchParams({
    utm_source: ADS_UTM_SOURCE,
    utm_medium: ADS_UTM_MEDIUM,
    utm_campaign: ADS_UTM_CAMPAIGN,
    utm_content: content,
  });
  return q.toString();
}
