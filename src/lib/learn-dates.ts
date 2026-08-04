/**
 * Editorial dates for learn guides (ISO YYYY-MM-DD).
 * Used in Article JSON-LD, visible <time>, and sitemap lastModified.
 */
export type LearnDates = {
  published: string;
  modified: string;
};

/** Fallback when a slug is missing (should not happen for shipped posts). */
export const LEARN_DATES_FALLBACK: LearnDates = {
  published: "2025-11-01",
  modified: "2026-08-04",
};

export const LEARN_DATES: Record<string, LearnDates> = {
  "2025-changes": { published: "2025-10-15", modified: "2026-08-03" },
  interview: { published: "2025-11-01", modified: "2026-07-20" },
  eligibility: { published: "2025-11-01", modified: "2026-08-03" },
  "how-to-apply": { published: "2025-11-05", modified: "2026-07-15" },
  "after-becoming-citizen": { published: "2025-11-10", modified: "2026-07-10" },
  "study-tips": { published: "2025-11-12", modified: "2026-07-18" },
  "english-test": { published: "2025-11-15", modified: "2026-07-22" },
  "65-20": { published: "2025-11-18", modified: "2026-08-03" },
  "changing-answers": { published: "2025-11-20", modified: "2026-08-02" },
  "how-many-questions": { published: "2025-11-22", modified: "2026-07-25" },
  "pass-score": { published: "2025-11-22", modified: "2026-07-25" },
  "fail-citizenship-test": { published: "2025-12-01", modified: "2026-07-28" },
  "30-day-study-plan": { published: "2025-12-05", modified: "2026-07-28" },
  "n-400-filing-date": { published: "2025-12-08", modified: "2026-08-03" },
  "hardest-civics-questions": { published: "2025-12-12", modified: "2026-07-20" },
  "senators-by-zip": { published: "2025-12-15", modified: "2026-08-02" },
  "interview-day-checklist": { published: "2026-01-05", modified: "2026-07-15" },
  "oath-ceremony": { published: "2026-01-08", modified: "2026-07-10" },
  "reading-writing-tips": { published: "2026-01-12", modified: "2026-07-22" },
  "flashcards-vs-simulation": { published: "2026-01-15", modified: "2026-07-18" },
  "california-civics-answers": { published: "2026-02-01", modified: "2026-08-02" },
  "dates-names-officials-drills": { published: "2026-02-05", modified: "2026-08-02" },
  "texas-civics-answers": { published: "2026-02-08", modified: "2026-08-02" },
  "florida-civics-answers": { published: "2026-02-08", modified: "2026-08-02" },
  "new-york-civics-answers": { published: "2026-02-08", modified: "2026-08-02" },
  "which-civics-test": { published: "2026-02-15", modified: "2026-08-03" },
};

export function getLearnDates(slug: string): LearnDates {
  return LEARN_DATES[slug] ?? LEARN_DATES_FALLBACK;
}
