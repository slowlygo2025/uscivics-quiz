import type { Locale } from "@/lib/types";
import type { DictKeys } from "@/lib/dict/en";

/** One internal link target (path after locale prefix). */
export type StudyLink = {
  path: string;
  /** Dictionary key, or "custom" with customLabel */
  labelKey: DictKeys | "custom";
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
    { path: "/learn/n-400-filing-date", labelKey: "linkN400Filing" },
    { path: "/learn/65-20", labelKey: "link6520" },
    { path: "/learn/how-many-questions", labelKey: "linkHowMany" },
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
      { path: "/learn/n-400-filing-date", labelKey: "linkN400Filing" },
      { path: "/learn/how-many-questions", labelKey: "linkHowMany" },
      { path: "/learn/pass-score", labelKey: "linkPassScore" },
    ],
    questions: [
      { path: "/questions/senior", labelKey: "navSenior" },
      { path: "/questions/all-100", labelKey: "seoAll100Title" },
      { path: "/questions/all-128", labelKey: "seoAll128Title" },
    ],
    practice: [
      { path: "/practice/2025?senior=1", labelKey: "linkPractice2025Senior" },
      { path: "/practice/2008?senior=1", labelKey: "linkPractice2008Senior" },
      { path: "/eligibility", labelKey: "startEligibility" },
    ],
  },
  "n-400-filing-date": {
    learn: [
      { path: "/learn/2025-changes", labelKey: "link2025Changes" },
      { path: "/learn/65-20", labelKey: "link6520" },
      { path: "/learn/how-many-questions", labelKey: "linkHowMany" },
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
  "2025-changes": {
    learn: [
      { path: "/learn/n-400-filing-date", labelKey: "linkN400Filing" },
      { path: "/learn/how-many-questions", labelKey: "linkHowMany" },
    ],
    questions: [
      { path: "/questions/all-128", labelKey: "seoAll128Title" },
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
      { path: "/learn/n-400-filing-date", labelKey: "linkN400Filing" },
      { path: "/learn/2025-changes", labelKey: "link2025Changes" },
      { path: "/learn/65-20", labelKey: "link6520" },
    ],
    questions: [
      { path: "/questions/senior", labelKey: "navSenior" },
      { path: "/questions/all-100", labelKey: "seoAll100Title" },
    ],
    practice: [
      { path: "/practice/2025", labelKey: "navTest2025" },
      { path: "/eligibility", labelKey: "startEligibility" },
    ],
  },
  "/questions/all-100": {
    learn: [
      { path: "/learn/n-400-filing-date", labelKey: "linkN400Filing" },
      { path: "/learn/65-20", labelKey: "link6520" },
    ],
    questions: [
      { path: "/questions/all-128", labelKey: "seoAll128Title" },
      { path: "/questions/senior", labelKey: "navSenior" },
    ],
    practice: [
      { path: "/practice/2008", labelKey: "navTest2008" },
      { path: "/eligibility", labelKey: "startEligibility" },
    ],
  },
  "/questions/drill/dates-2025": defaults,
  "/questions/drill/names-2025": defaults,
  "/questions/drill/officials-2025": defaults,
  "/questions/drill/dates-2008": defaults,
  "/questions/drill/names-2008": defaults,
  "/questions/drill/officials-2008": defaults,
  "/practice/2025": {
    learn: [
      { path: "/learn/n-400-filing-date", labelKey: "linkN400Filing" },
      { path: "/learn/65-20", labelKey: "link6520" },
      { path: "/learn/how-many-questions", labelKey: "linkHowMany" },
    ],
    questions: [
      { path: "/questions/all-128", labelKey: "seoAll128Title" },
      { path: "/questions/senior", labelKey: "navSenior" },
    ],
    practice: [
      { path: "/eligibility", labelKey: "startEligibility" },
      { path: "/practice/2025?senior=1", labelKey: "linkPractice2025Senior" },
      { path: "/english", labelKey: "navEnglish" },
    ],
  },
  "/practice/2008": {
    learn: [
      { path: "/learn/n-400-filing-date", labelKey: "linkN400Filing" },
      { path: "/learn/65-20", labelKey: "link6520" },
      { path: "/learn/how-many-questions", labelKey: "linkHowMany" },
    ],
    questions: [
      { path: "/questions/all-100", labelKey: "seoAll100Title" },
      { path: "/questions/senior", labelKey: "navSenior" },
    ],
    practice: [
      { path: "/eligibility", labelKey: "startEligibility" },
      { path: "/practice/2008?senior=1", labelKey: "linkPractice2008Senior" },
    ],
  },
  "/eligibility": {
    learn: [
      { path: "/learn/n-400-filing-date", labelKey: "linkN400Filing" },
      { path: "/learn/65-20", labelKey: "link6520" },
      { path: "/learn/2025-changes", labelKey: "link2025Changes" },
    ],
    questions: [
      { path: "/questions/all-128", labelKey: "seoAll128Title" },
      { path: "/questions/all-100", labelKey: "seoAll100Title" },
      { path: "/questions/senior", labelKey: "navSenior" },
    ],
    practice: [
      { path: "/practice/2025", labelKey: "navTest2025" },
      { path: "/practice/2008", labelKey: "navTest2008" },
    ],
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

/**
 * Hero CTA row for learn posts: practice (or eligibility) first, then supporting links.
 * Money slugs get stronger practice ↔ list wiring.
 */
export function learnHeroCtas(slug: string): StudyLink[] {
  if (slug === "n-400-filing-date") {
    return [
      { path: "/eligibility", labelKey: "startEligibility" },
      { path: "/practice/2025", labelKey: "navTest2025" },
      { path: "/practice/2008", labelKey: "navTest2008" },
      { path: "/questions/all-128", labelKey: "seoAll128Title" },
    ];
  }
  if (slug === "65-20") {
    return [
      { path: "/practice/2025?senior=1", labelKey: "seoStartPractice" },
      { path: "/questions/senior", labelKey: "navSenior" },
      { path: "/eligibility", labelKey: "startEligibility" },
      { path: "/learn/n-400-filing-date", labelKey: "linkN400Filing" },
    ];
  }
  if (slug === "2025-changes" || slug === "how-many-questions" || slug === "pass-score") {
    return [
      { path: "/practice/2025", labelKey: "seoStartPractice" },
      { path: "/eligibility", labelKey: "startEligibility" },
      { path: "/questions/all-128", labelKey: "seoAll128Title" },
    ];
  }
  return [
    { path: "/practice/2025", labelKey: "seoStartPractice" },
    { path: "/eligibility", labelKey: "startEligibility" },
    { path: "/questions/all-128", labelKey: "seoAll128Title" },
  ];
}

export function hrefFor(locale: Locale, path: string): string {
  const [base, qs] = path.split("?");
  const clean = base.startsWith("/") ? base : `/${base}`;
  return qs ? `/${locale}${clean}?${qs}` : `/${locale}${clean}`;
}
