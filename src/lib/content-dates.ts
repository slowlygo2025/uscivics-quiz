import { getLearnDates } from "@/lib/learn-dates";

/**
 * Default last-modified for product/static URLs (bump on meaningful content ships).
 * ISO date noon UTC avoids timezone off-by-one in sitemaps.
 */
export const SITE_CONTENT_UPDATED = "2026-08-04";

/** Path without locale → last meaningful content update (YYYY-MM-DD). */
const PATH_LASTMOD: Record<string, string> = {
  "": "2026-08-04",
  "/eligibility": "2026-08-04",
  "/practice/2008": "2026-08-03",
  "/practice/2025": "2026-08-03",
  "/english": "2026-07-22",
  "/english/reading": "2026-07-22",
  "/english/writing": "2026-07-22",
  "/learn": "2026-08-03",
  "/updates": "2026-08-03",
  "/questions": "2026-08-03",
  "/questions/all-128": "2026-08-03",
  "/questions/all-100": "2026-08-03",
  "/questions/senior": "2026-08-03",
  "/about": "2026-07-01",
  "/contact": "2026-07-01",
  "/privacy": "2026-07-01",
  "/terms": "2026-07-01",
};

function toDate(isoDay: string): Date {
  return new Date(`${isoDay}T12:00:00.000Z`);
}

/** Sitemap / freshness helper for a locale-relative path (e.g. `/learn/65-20`). */
export function lastModifiedForPath(path: string): Date {
  if (path.startsWith("/learn/") && path !== "/learn") {
    const slug = path.slice("/learn/".length);
    return toDate(getLearnDates(slug).modified);
  }
  if (path.startsWith("/questions/state/")) {
    return toDate("2026-08-02");
  }
  if (path.startsWith("/questions/topic/") || path.startsWith("/questions/drill/")) {
    return toDate("2026-08-03");
  }
  return toDate(PATH_LASTMOD[path] ?? SITE_CONTENT_UPDATED);
}
