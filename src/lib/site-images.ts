/**
 * Curated royalty-free site imagery (Unsplash / Wikimedia).
 * Files live under public/images/ — see scripts/download-site-images.mjs
 * and public/images/ATTRIBUTION.md
 */

export type SiteImage = {
  /** Path from public/, e.g. /images/hero/home.jpg */
  src: string;
  alt: string;
  /** Optional credit line for ABOUT / footer note */
  credit?: string;
};

export const SITE_IMAGES = {
  homeHero: {
    src: "/images/hero/home.jpg",
    alt: "Adult studying with notebooks and a laptop at a bright desk",
    credit: "Unsplash",
  },
  about: {
    src: "/images/about/study-group.jpg",
    alt: "Adults studying together around a table with books and notes",
    credit: "Unsplash",
  },
  english: {
    src: "/images/english/writing.jpg",
    alt: "Close-up of a hand writing English sentences in a notebook",
    credit: "Unsplash",
  },
  learnHub: {
    src: "/images/learn/hub.jpg",
    alt: "Open study books and notes on a wooden desk",
    credit: "Unsplash",
  },
  clusterTestVersion: {
    src: "/images/learn/test-version.jpg",
    alt: "Desk calendar and planner used to track important filing dates",
    credit: "Unsplash",
  },
  clusterSenior: {
    src: "/images/learn/senior.jpg",
    alt: "Older adult reading quietly at a table",
    credit: "Unsplash",
  },
  clusterInterview: {
    src: "/images/learn/interview.jpg",
    alt: "Two people in a calm professional conversation across a table",
    credit: "Unsplash",
  },
  clusterStudy: {
    src: "/images/learn/study.jpg",
    alt: "Student reviewing flashcards and textbooks",
    credit: "Unsplash",
  },
  clusterEnglish: {
    src: "/images/learn/english.jpg",
    alt: "Person practicing reading and writing in English",
    credit: "Unsplash",
  },
  clusterOfficials: {
    src: "/images/learn/officials.jpg",
    alt: "Folded paper map used to look up local places and districts",
    credit: "Unsplash",
  },
  clusterOath: {
    src: "/images/learn/oath.jpg",
    alt: "Soft-focus American flag in natural light",
    credit: "Unsplash",
  },
  stateTexas: {
    src: "/images/states/texas.jpg",
    alt: "Downtown Texas city skyline under clear daylight",
    credit: "Unsplash",
  },
  stateFlorida: {
    src: "/images/states/florida.jpg",
    alt: "Palm trees and Florida coastline in soft daylight",
    credit: "Unsplash",
  },
  stateNewYork: {
    src: "/images/states/new-york.jpg",
    alt: "New York City skyline across the water",
    credit: "Unsplash",
  },
  stateCalifornia: {
    src: "/images/states/california.jpg",
    alt: "Golden Gate Bridge in San Francisco, California",
    credit: "Unsplash",
  },
} as const satisfies Record<string, SiteImage>;

export type SiteImageKey = keyof typeof SITE_IMAGES;

/** Map learn slug → shared visual cluster (fewer unique photos, clearer themes). */
const LEARN_SLUG_IMAGE: Record<string, SiteImageKey> = {
  "n-400-filing-date": "clusterTestVersion",
  "2025-changes": "clusterTestVersion",
  eligibility: "clusterTestVersion",
  "how-many-questions": "clusterTestVersion",
  "pass-score": "clusterTestVersion",
  "65-20": "clusterSenior",
  interview: "clusterInterview",
  "interview-day-checklist": "clusterInterview",
  "fail-citizenship-test": "clusterInterview",
  "oath-ceremony": "clusterOath",
  "after-becoming-citizen": "clusterOath",
  "how-to-apply": "clusterInterview",
  "30-day-study-plan": "clusterStudy",
  "study-tips": "clusterStudy",
  "flashcards-vs-simulation": "clusterStudy",
  "hardest-civics-questions": "clusterStudy",
  "english-test": "clusterEnglish",
  "reading-writing-tips": "clusterEnglish",
  "dates-names-officials-drills": "clusterOfficials",
  "senators-by-zip": "clusterOfficials",
  "changing-answers": "clusterOfficials",
  "texas-civics-answers": "stateTexas",
  "florida-civics-answers": "stateFlorida",
  "new-york-civics-answers": "stateNewYork",
  "california-civics-answers": "stateCalifornia",
};

/** Static OG files under public/images/og/ */
const LEARN_OG: Record<string, string> = {
  "n-400-filing-date": "/images/og/test-version.jpg",
  "2025-changes": "/images/og/test-version.jpg",
  eligibility: "/images/og/test-version.jpg",
  "how-many-questions": "/images/og/test-version.jpg",
  "pass-score": "/images/og/test-version.jpg",
  interview: "/images/og/interview.jpg",
  "interview-day-checklist": "/images/og/interview.jpg",
  "fail-citizenship-test": "/images/og/interview.jpg",
  "how-to-apply": "/images/og/interview.jpg",
};

export function imageForLearnSlug(slug: string): SiteImage {
  const key = LEARN_SLUG_IMAGE[slug] ?? "clusterStudy";
  return SITE_IMAGES[key];
}

export function ogPathForLearnSlug(slug: string): string {
  return LEARN_OG[slug] ?? "/images/og/default.jpg";
}

export function absoluteImageUrl(src: string): string {
  if (src.startsWith("http")) return src;
  const base = "https://uscivics-quiz.com";
  return `${base}${src.startsWith("/") ? src : `/${src}`}`;
}
