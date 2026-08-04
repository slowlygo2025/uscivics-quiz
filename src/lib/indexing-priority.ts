import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/locales";
import type { Locale } from "@/lib/types";
import { SEO_TOPICS, SEO_STATE_CODES } from "@/lib/seo-topics";
import { LEARN_POSTS } from "@/lib/learn-posts";

export const SITE_ORIGIN = "https://uscivics-quiz.com";

export type IndexTier = 1 | 2 | 3 | 4;

export type IndexPriorityItem = {
  /** Path without locale, e.g. /questions/all-128 */
  path: string;
  tier: IndexTier;
  /** Sitemap priority 0–1 */
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  /** Why to request indexing in GSC */
  why: string;
};

/**
 * GSC indexing checklist — request these first (tier 1), then work down.
 * Tier 1–2: Inspect URL → Request indexing after each deploy with new content.
 */
export const INDEX_PRIORITY: IndexPriorityItem[] = [
  // Tier 1 — money pages
  {
    path: "",
    tier: 1,
    priority: 1,
    changeFrequency: "weekly",
    why: "Home / brand",
  },
  {
    path: "/questions/all-128",
    tier: 1,
    priority: 0.95,
    changeFrequency: "weekly",
    why: "Primary 2025 long-tail landing",
  },
  {
    path: "/questions/all-100",
    tier: 1,
    priority: 0.95,
    changeFrequency: "weekly",
    why: "Primary 2008 long-tail landing",
  },
  {
    path: "/eligibility",
    tier: 1,
    priority: 0.92,
    changeFrequency: "weekly",
    why: "Version chooser conversion",
  },
  {
    path: "/updates",
    tier: 1,
    priority: 0.91,
    changeFrequency: "daily",
    why: "Narrow policy/exam updates hub + live officials",
  },
  {
    path: "/practice/2025",
    tier: 1,
    priority: 0.9,
    changeFrequency: "weekly",
    why: "Core product 2025",
  },
  {
    path: "/questions/senior",
    tier: 1,
    priority: 0.9,
    changeFrequency: "weekly",
    why: "65/20 landing",
  },
  {
    path: "/english/reading",
    tier: 1,
    priority: 0.88,
    changeFrequency: "weekly",
    why: "English reading SEO",
  },
  {
    path: "/english/writing",
    tier: 1,
    priority: 0.88,
    changeFrequency: "weekly",
    why: "English writing SEO",
  },
  {
    path: "/questions",
    tier: 1,
    priority: 0.9,
    changeFrequency: "weekly",
    why: "Questions hub",
  },
  {
    path: "/learn",
    tier: 1,
    priority: 0.88,
    changeFrequency: "weekly",
    why: "Learn hub",
  },
  {
    path: "/learn/n-400-filing-date",
    tier: 1,
    priority: 0.93,
    changeFrequency: "weekly",
    why: "Ads money: N-400 filing date",
  },
  {
    path: "/learn/65-20",
    tier: 1,
    priority: 0.92,
    changeFrequency: "weekly",
    why: "Ads money: 65/20 explained",
  },
  {
    path: "/learn/which-civics-test",
    tier: 1,
    priority: 0.93,
    changeFrequency: "weekly",
    why: "Money hub: which civics test (2008 / 2025 / 65/20)",
  },
  // Tier 2 — drills + top learn + top states
  {
    path: "/questions/drill/dates-2025",
    tier: 2,
    priority: 0.86,
    changeFrequency: "weekly",
    why: "Dates drill 2025",
  },
  {
    path: "/questions/drill/names-2025",
    tier: 2,
    priority: 0.86,
    changeFrequency: "weekly",
    why: "Names drill 2025",
  },
  {
    path: "/questions/drill/officials-2025",
    tier: 2,
    priority: 0.86,
    changeFrequency: "weekly",
    why: "Officials drill 2025",
  },
  {
    path: "/questions/drill/dates-2008",
    tier: 2,
    priority: 0.82,
    changeFrequency: "weekly",
    why: "Dates drill 2008",
  },
  {
    path: "/questions/drill/names-2008",
    tier: 2,
    priority: 0.82,
    changeFrequency: "weekly",
    why: "Names drill 2008",
  },
  {
    path: "/questions/drill/officials-2008",
    tier: 2,
    priority: 0.82,
    changeFrequency: "weekly",
    why: "Officials drill 2008",
  },
  {
    path: "/practice/2008",
    tier: 2,
    priority: 0.85,
    changeFrequency: "weekly",
    why: "Core product 2008",
  },
  {
    path: "/english",
    tier: 2,
    priority: 0.8,
    changeFrequency: "weekly",
    why: "English hub",
  },
  {
    path: "/questions/state/ca",
    tier: 2,
    priority: 0.84,
    changeFrequency: "monthly",
    why: "Top state CA",
  },
  {
    path: "/questions/state/tx",
    tier: 2,
    priority: 0.84,
    changeFrequency: "monthly",
    why: "Top state TX",
  },
  {
    path: "/questions/state/fl",
    tier: 2,
    priority: 0.84,
    changeFrequency: "monthly",
    why: "Top state FL",
  },
  {
    path: "/questions/state/ny",
    tier: 2,
    priority: 0.84,
    changeFrequency: "monthly",
    why: "Top state NY",
  },
  {
    path: "/learn/2025-changes",
    tier: 2,
    priority: 0.84,
    changeFrequency: "monthly",
    why: "Top learn: 2025 changes",
  },
  {
    path: "/learn/how-many-questions",
    tier: 2,
    priority: 0.84,
    changeFrequency: "monthly",
    why: "Top learn: how many questions",
  },
  {
    path: "/learn/pass-score",
    tier: 2,
    priority: 0.84,
    changeFrequency: "monthly",
    why: "Top learn: pass score",
  },
  {
    path: "/learn/fail-citizenship-test",
    tier: 2,
    priority: 0.83,
    changeFrequency: "monthly",
    why: "Top learn: fail / retest prep",
  },
  {
    path: "/learn/30-day-study-plan",
    tier: 2,
    priority: 0.83,
    changeFrequency: "monthly",
    why: "Top learn: 30-day study plan",
  },
  {
    path: "/learn/reading-writing-tips",
    tier: 2,
    priority: 0.83,
    changeFrequency: "monthly",
    why: "Top learn: reading/writing tips",
  },
  {
    path: "/learn/dates-names-officials-drills",
    tier: 2,
    priority: 0.83,
    changeFrequency: "monthly",
    why: "Top learn: dates/names/officials drills hub",
  },
  {
    path: "/learn/texas-civics-answers",
    tier: 2,
    priority: 0.82,
    changeFrequency: "monthly",
    why: "Top learn: Texas state answers",
  },
  {
    path: "/learn/florida-civics-answers",
    tier: 2,
    priority: 0.82,
    changeFrequency: "monthly",
    why: "Top learn: Florida state answers",
  },
  {
    path: "/learn/new-york-civics-answers",
    tier: 2,
    priority: 0.82,
    changeFrequency: "monthly",
    why: "Top learn: New York state answers",
  },
  {
    path: "/about",
    tier: 2,
    priority: 0.7,
    changeFrequency: "monthly",
    why: "Trust / E-E-A-T",
  },
  {
    path: "/contact",
    tier: 2,
    priority: 0.55,
    changeFrequency: "yearly",
    why: "Trust / contactability",
  },
  {
    path: "/privacy",
    tier: 2,
    priority: 0.5,
    changeFrequency: "yearly",
    why: "Trust / ads compliance",
  },
  {
    path: "/terms",
    tier: 2,
    priority: 0.45,
    changeFrequency: "yearly",
    why: "Trust / legal terms",
  },
];

const PRIORITY_MAP = new Map(INDEX_PRIORITY.map((i) => [i.path, i]));

export function sitemapMetaForPath(path: string): Pick<
  IndexPriorityItem,
  "priority" | "changeFrequency"
> {
  const hit = PRIORITY_MAP.get(path);
  if (hit) return { priority: hit.priority, changeFrequency: hit.changeFrequency };
  if (path.startsWith("/learn/")) {
    return { priority: 0.72, changeFrequency: "monthly" };
  }
  if (path.startsWith("/questions/state/")) {
    return { priority: 0.74, changeFrequency: "monthly" };
  }
  if (path.startsWith("/questions/topic/")) {
    return { priority: 0.78, changeFrequency: "weekly" };
  }
  if (path.startsWith("/questions/drill/")) {
    return { priority: 0.82, changeFrequency: "weekly" };
  }
  return { priority: 0.65, changeFrequency: "monthly" };
}

export function absoluteIndexUrl(locale: string, path: string): string {
  return `${SITE_ORIGIN}/${locale}${path}`;
}

/** Checklist rows for GSC (default: English + Spanish money pages). */
export function buildIndexingChecklist(locales: Locale[] = ["en", "es"]) {
  const tiers: Record<IndexTier, IndexPriorityItem[]> = {
    1: [],
    2: [],
    3: [],
    4: [],
  };
  for (const item of INDEX_PRIORITY) {
    tiers[item.tier].push(item);
  }

  const rows: {
    tier: IndexTier;
    locale: Locale;
    url: string;
    why: string;
    done: boolean;
  }[] = [];

  for (const tier of [1, 2] as IndexTier[]) {
    for (const item of tiers[tier]) {
      for (const locale of locales) {
        rows.push({
          tier,
          locale,
          url: absoluteIndexUrl(locale, item.path),
          why: item.why,
          done: false,
        });
      }
    }
  }

  // Tier 3 sample: all learn posts EN only (request after tier 1–2)
  for (const p of LEARN_POSTS) {
    rows.push({
      tier: 3,
      locale: "en",
      url: absoluteIndexUrl("en", `/learn/${p.slug}`),
      why: `Learn: ${p.slug}`,
      done: false,
    });
  }

  // Tier 3: remaining top topics EN
  for (const t of SEO_TOPICS) {
    rows.push({
      tier: 3,
      locale: "en",
      url: absoluteIndexUrl("en", `/questions/topic/${t.slug}`),
      why: `Topic: ${t.slug}`,
      done: false,
    });
  }

  // Tier 4 note rows for bulk state coverage
  rows.push({
    tier: 4,
    locale: "en",
    url: `${SITE_ORIGIN}/sitemap.xml`,
    why: `Submit sitemap (covers ${SEO_STATE_CODES.length} states × ${LOCALES.length} locales)`,
    done: false,
  });

  return rows;
}

export const INDEXING_STEPS = [
  "Search Console → Sitemaps → add https://uscivics-quiz.com/sitemap.xml (also: npm run gsc:tier)",
  "Tier 1–2 via Indexing API: npm run gsc:tier -- 1 then npm run gsc:tier -- 2 (progress auto-saved)",
  "Weekly ops: npm run gsc:report (sitemap + index progress + queries/pages/CTR + coverage gaps)",
  "Low-CTR follow-up: npm run gsc:insights or apply titleHints from gsc-report.json",
  "Let sitemap + internal links pull Tier 3–4; spot-check “Discovered / not indexed” in GSC",
  "After major content deploys, re-run Tier 1 only (or --force for specific tiers)",
] as const;
