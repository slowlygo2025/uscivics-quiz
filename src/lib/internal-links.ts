import type { Locale } from "@/lib/types";

/** One internal link target (path after locale prefix). */
export type StudyLink = {
  path: string;
  /** Dictionary key or literal label resolved by caller */
  labelKey:
    | "startEligibility"
    | "seoAll128Title"
    | "seoAll100Title"
    | "navSenior"
    | "navTest2025"
    | "navTest2008"
    | "navLearn"
    | "navQuestions"
    | "seoDrillsHeading"
    | "relatedLearn"
    | "relatedPractice"
    | "relatedQuestions"
    | "custom";
  /** Used when labelKey is "custom" */
  customLabel?: string;
};

export type LinkCluster = {
  learn: StudyLink[];
  questions: StudyLink[];
  practice: StudyLink[];
};

const defaults: LinkCluster = {
  learn: [
    { path: "/learn/n-400-filing-date", labelKey: "custom", customLabel: "N-400 filing date" },
    { path: "/learn/65-20", labelKey: "custom", customLabel: "65/20 special consideration" },
    { path: "/learn/how-many-questions", labelKey: "custom", customLabel: "How many questions" },
  ],
  questions: [
    { path: "/questions/all-128", labelKey: "seoAll128Title" },
    { path: "/questions", labelKey: "navQuestions" },
  ],
  practice: [
    { path: "/eligibility", labelKey: "startEligibility" },
    { path: "/practice/2025", labelKey: "navTest2025" },
  ],
};

/** Per-learn-slug related destinations for topical internal linking. */
const LEARN_LINKS: Record<string, LinkCluster> = {
  "65-20": {
    learn: [
      { path: "/learn/n-400-filing-date", labelKey: "custom", customLabel: "N-400 filing date (2008 vs 2025)" },
      { path: "/learn/how-many-questions", labelKey: "custom", customLabel: "How many questions are asked" },
      { path: "/learn/pass-score", labelKey: "custom", customLabel: "What score to pass" },
    ],
    questions: [
      { path: "/questions/senior", labelKey: "navSenior" },
      { path: "/questions/all-100", labelKey: "seoAll100Title" },
      { path: "/questions/all-128", labelKey: "seoAll128Title" },
    ],
    practice: [
      { path: "/practice/2025?senior=1", labelKey: "custom", customLabel: "2025 · 65/20 practice" },
      { path: "/practice/2008?senior=1", labelKey: "custom", customLabel: "2008 · 65/20 practice" },
      { path: "/eligibility", labelKey: "startEligibility" },
    ],
  },
  "n-400-filing-date": {
    learn: [
      { path: "/learn/2025-changes", labelKey: "custom", customLabel: "2025 civics changes" },
      { path: "/learn/65-20", labelKey: "custom", customLabel: "65/20 if you qualify" },
      { path: "/learn/how-many-questions", labelKey: "custom", customLabel: "How many questions" },
    ],
    questions: [
      { path: "/questions/all-100", labelKey: "seoAll100Title" },
      { path: "/questions/all-128", labelKey: "seoAll128Title" },
    ],
    practice: [
      { path: "/eligibility", labelKey: "startEligibility" },
      { path: "/practice/2008", labelKey: "navTest2008" },
      { path: "/practice/2025", labelKey: "navTest2025" },
    ],
  },
  "hardest-civics-questions": {
    learn: [
      { path: "/learn/changing-answers", labelKey: "custom", customLabel: "Answers that change" },
      { path: "/learn/dates-names-officials-drills", labelKey: "custom", customLabel: "Dates, names & officials drills" },
      { path: "/learn/study-tips", labelKey: "custom", customLabel: "Study tips" },
    ],
    questions: [
      { path: "/questions/drill/dates-2025", labelKey: "custom", customLabel: "Dates drill (2025)" },
      { path: "/questions/drill/names-2025", labelKey: "custom", customLabel: "Names drill (2025)" },
      { path: "/questions/drill/officials-2025", labelKey: "custom", customLabel: "Officials drill (2025)" },
    ],
    practice: [
      { path: "/practice/2025", labelKey: "navTest2025" },
      { path: "/eligibility", labelKey: "startEligibility" },
    ],
  },
  "changing-answers": {
    learn: [
      { path: "/learn/senators-by-zip", labelKey: "custom", customLabel: "Find senators by ZIP" },
      { path: "/learn/california-civics-answers", labelKey: "custom", customLabel: "California answers" },
      { path: "/learn/texas-civics-answers", labelKey: "custom", customLabel: "Texas answers" },
    ],
    questions: [
      { path: "/questions/drill/officials-2025", labelKey: "custom", customLabel: "Officials drill (2025)" },
      { path: "/questions/state/ca", labelKey: "custom", customLabel: "California state page" },
      { path: "/questions/state/tx", labelKey: "custom", customLabel: "Texas state page" },
    ],
    practice: [
      { path: "/practice/2025", labelKey: "navTest2025" },
      { path: "/eligibility", labelKey: "startEligibility" },
    ],
  },
  "dates-names-officials-drills": {
    learn: [
      { path: "/learn/hardest-civics-questions", labelKey: "custom", customLabel: "Hardest questions" },
      { path: "/learn/changing-answers", labelKey: "custom", customLabel: "Changing answers" },
      { path: "/learn/flashcards-vs-simulation", labelKey: "custom", customLabel: "Flashcards vs simulation" },
    ],
    questions: [
      { path: "/questions/drill/dates-2025", labelKey: "custom", customLabel: "2025 dates drill" },
      { path: "/questions/drill/names-2025", labelKey: "custom", customLabel: "2025 names drill" },
      { path: "/questions/drill/officials-2025", labelKey: "custom", customLabel: "2025 officials drill" },
      { path: "/questions/drill/dates-2008", labelKey: "custom", customLabel: "2008 dates drill" },
    ],
    practice: [
      { path: "/practice/2025", labelKey: "navTest2025" },
      { path: "/practice/2008", labelKey: "navTest2008" },
    ],
  },
  "california-civics-answers": stateLearn("ca", "California"),
  "texas-civics-answers": stateLearn("tx", "Texas"),
  "florida-civics-answers": stateLearn("fl", "Florida"),
  "new-york-civics-answers": stateLearn("ny", "New York"),
  "senators-by-zip": {
    learn: [
      { path: "/learn/changing-answers", labelKey: "custom", customLabel: "Changing answers" },
      { path: "/learn/california-civics-answers", labelKey: "custom", customLabel: "California" },
      { path: "/learn/texas-civics-answers", labelKey: "custom", customLabel: "Texas" },
    ],
    questions: [
      { path: "/questions/drill/officials-2025", labelKey: "custom", customLabel: "Officials drill" },
      { path: "/questions/state/ca", labelKey: "custom", customLabel: "CA state page" },
    ],
    practice: [
      { path: "/practice/2025", labelKey: "navTest2025" },
      { path: "/eligibility", labelKey: "startEligibility" },
    ],
  },
  "2025-changes": {
    learn: [
      { path: "/learn/n-400-filing-date", labelKey: "custom", customLabel: "Which test by filing date" },
      { path: "/learn/how-many-questions", labelKey: "custom", customLabel: "How many questions" },
    ],
    questions: [
      { path: "/questions/all-128", labelKey: "seoAll128Title" },
      { path: "/questions/topic/american-government", labelKey: "custom", customLabel: "American Government topic" },
    ],
    practice: [
      { path: "/practice/2025", labelKey: "navTest2025" },
      { path: "/eligibility", labelKey: "startEligibility" },
    ],
  },
};

function stateLearn(code: string, name: string): LinkCluster {
  return {
    learn: [
      { path: "/learn/changing-answers", labelKey: "custom", customLabel: "Answers that change" },
      { path: "/learn/senators-by-zip", labelKey: "custom", customLabel: "ZIP lookup for officials" },
      { path: "/learn/dates-names-officials-drills", labelKey: "custom", customLabel: "Officials drills" },
    ],
    questions: [
      { path: `/questions/state/${code}`, labelKey: "custom", customLabel: `${name} state study page` },
      { path: "/questions/drill/officials-2025", labelKey: "custom", customLabel: "Officials drill (2025)" },
      { path: "/questions/all-128", labelKey: "seoAll128Title" },
    ],
    practice: [
      { path: "/practice/2025", labelKey: "navTest2025" },
      { path: "/eligibility", labelKey: "startEligibility" },
    ],
  };
}

/** Topic / drill / state path → related cluster */
const PATH_LINKS: Record<string, LinkCluster> = {
  "/questions/senior": LEARN_LINKS["65-20"],
  "/questions/all-128": {
    learn: [
      { path: "/learn/n-400-filing-date", labelKey: "custom", customLabel: "Confirm 2025 vs 2008" },
      { path: "/learn/2025-changes", labelKey: "custom", customLabel: "2025 changes" },
      { path: "/learn/hardest-civics-questions", labelKey: "custom", customLabel: "Hardest questions" },
    ],
    questions: [
      { path: "/questions/drill/dates-2025", labelKey: "custom", customLabel: "Dates drill" },
      { path: "/questions/topic/american-government", labelKey: "custom", customLabel: "Government topic" },
    ],
    practice: [
      { path: "/practice/2025", labelKey: "navTest2025" },
      { path: "/eligibility", labelKey: "startEligibility" },
    ],
  },
  "/questions/all-100": {
    learn: [
      { path: "/learn/n-400-filing-date", labelKey: "custom", customLabel: "Confirm you need 2008" },
      { path: "/learn/65-20", labelKey: "custom", customLabel: "65/20 path" },
    ],
    questions: [
      { path: "/questions/drill/dates-2008", labelKey: "custom", customLabel: "2008 dates drill" },
      { path: "/questions/drill/officials-2008", labelKey: "custom", customLabel: "2008 officials drill" },
    ],
    practice: [
      { path: "/practice/2008", labelKey: "navTest2008" },
      { path: "/eligibility", labelKey: "startEligibility" },
    ],
  },
  "/questions/drill/dates-2025": LEARN_LINKS["dates-names-officials-drills"],
  "/questions/drill/names-2025": LEARN_LINKS["dates-names-officials-drills"],
  "/questions/drill/officials-2025": LEARN_LINKS["changing-answers"],
  "/questions/drill/dates-2008": LEARN_LINKS["dates-names-officials-drills"],
  "/questions/drill/names-2008": LEARN_LINKS["dates-names-officials-drills"],
  "/questions/drill/officials-2008": LEARN_LINKS["changing-answers"],
  "/practice/2025": {
    learn: [
      { path: "/learn/n-400-filing-date", labelKey: "custom", customLabel: "Confirm test version" },
      { path: "/learn/30-day-study-plan", labelKey: "custom", customLabel: "30-day study plan" },
      { path: "/learn/flashcards-vs-simulation", labelKey: "custom", customLabel: "Flashcards vs simulation" },
    ],
    questions: [
      { path: "/questions/all-128", labelKey: "seoAll128Title" },
      { path: "/questions/drill/officials-2025", labelKey: "custom", customLabel: "Officials drill" },
    ],
    practice: [
      { path: "/eligibility", labelKey: "startEligibility" },
      { path: "/english", labelKey: "custom", customLabel: "English reading & writing" },
    ],
  },
  "/practice/2008": {
    learn: [
      { path: "/learn/n-400-filing-date", labelKey: "custom", customLabel: "Confirm test version" },
      { path: "/learn/65-20", labelKey: "custom", customLabel: "65/20 if eligible" },
    ],
    questions: [
      { path: "/questions/all-100", labelKey: "seoAll100Title" },
      { path: "/questions/drill/officials-2008", labelKey: "custom", customLabel: "Officials drill" },
    ],
    practice: [{ path: "/eligibility", labelKey: "startEligibility" }],
  },
};

export function linksForLearnSlug(slug: string): LinkCluster {
  return LEARN_LINKS[slug] ?? defaults;
}

export function linksForPath(path: string): LinkCluster {
  const clean = path.split("?")[0].replace(/\/$/, "") || "/";
  if (PATH_LINKS[clean]) return PATH_LINKS[clean];
  const state = clean.match(/^\/questions\/state\/([a-z]{2})$/);
  if (state) {
    const code = state[1];
    return {
      learn: [
        { path: "/learn/changing-answers", labelKey: "custom", customLabel: "Changing answers" },
        { path: "/learn/senators-by-zip", labelKey: "custom", customLabel: "ZIP lookup" },
        { path: "/learn/dates-names-officials-drills", labelKey: "custom", customLabel: "Officials drills" },
      ],
      questions: [
        { path: "/questions/drill/officials-2025", labelKey: "custom", customLabel: "Officials drill" },
        { path: "/questions/all-128", labelKey: "seoAll128Title" },
      ],
      practice: [
        { path: "/practice/2025", labelKey: "navTest2025" },
        { path: `/questions/state/${code}`, labelKey: "custom", customLabel: "This state page" },
      ],
    };
  }
  return defaults;
}

export function hrefFor(locale: Locale, path: string): string {
  const [base, qs] = path.split("?");
  const clean = base.startsWith("/") ? base : `/${base}`;
  return qs ? `/${locale}${clean}?${qs}` : `/${locale}${clean}`;
}
