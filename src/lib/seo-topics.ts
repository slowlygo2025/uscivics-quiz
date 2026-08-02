import type { TestVersion } from "./types";

export type TopicDef = {
  slug: string;
  /** Exact category string in EN question banks */
  categoryEn: string;
  version: TestVersion;
  title: string;
  description: string;
};

/** SEO topic landings aligned with official USCIS category names. */
export const SEO_TOPICS: TopicDef[] = [
  {
    slug: "american-government",
    categoryEn: "American Government",
    version: "2025",
    title: "American Government — 2025 Civics Questions",
    description:
      "Practice USCIS American Government questions from the 2025 (128-question) civics test.",
  },
  {
    slug: "american-history",
    categoryEn: "American History",
    version: "2025",
    title: "American History — 2025 Civics Questions",
    description:
      "Practice USCIS American History questions from the 2025 (128-question) civics test.",
  },
  {
    slug: "symbols-and-holidays",
    categoryEn: "Symbols and Holidays",
    version: "2025",
    title: "Symbols and Holidays — 2025 Civics Questions",
    description:
      "Practice USCIS Symbols and Holidays questions from the 2025 civics test.",
  },
  {
    slug: "american-government-2008",
    categoryEn: "American Government",
    version: "2008",
    title: "American Government — 2008 Civics Questions",
    description:
      "Practice American Government questions from the 2008 (100-question) civics test.",
  },
  {
    slug: "american-history-2008",
    categoryEn: "American History",
    version: "2008",
    title: "American History — 2008 Civics Questions",
    description:
      "Practice American History questions from the 2008 (100-question) civics test.",
  },
  {
    slug: "integrated-civics-2008",
    categoryEn: "Integrated Civics",
    version: "2008",
    title: "Integrated Civics — 2008 Civics Questions",
    description:
      "Practice Integrated Civics questions from the 2008 (100-question) civics test.",
  },
];

export const SEO_STATE_CODES = ["CA", "TX", "FL", "NY"] as const;
export type SeoStateCode = (typeof SEO_STATE_CODES)[number];

export function getTopicBySlug(slug: string): TopicDef | undefined {
  return SEO_TOPICS.find((t) => t.slug === slug);
}

export function isSeoStateCode(code: string): code is SeoStateCode {
  return (SEO_STATE_CODES as readonly string[]).includes(code.toUpperCase());
}
