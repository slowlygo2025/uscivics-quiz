export type LearnPost = {
  slug: string;
  title: string;
  description: string;
  sections: { heading: string; body: string }[];
};

/** Short long-tail SEO articles (EN source; UI chrome uses dict). */
export const LEARN_POSTS: LearnPost[] = [
  {
    slug: "2025-changes",
    title: "Civics Test 2025 Changes — What Applicants Need to Know",
    description:
      "How the 2025 USCIS naturalization civics test differs from the 2008 version, including N-400 filing dates and passing scores.",
    sections: [
      {
        heading: "Which test do you take?",
        body: "If you filed Form N-400 before October 20, 2025, you take the 2008 civics test (up to 10 questions from 100; need 6 correct). If you filed on or after that date, you take the 2025 test (up to 20 questions from 128; need 12 correct).",
      },
      {
        heading: "What changed in 2025?",
        body: "The question bank grew from 100 to 128. Officers ask more questions and the passing threshold is higher (12 of 20). Much of the content overlaps with 2008, with added material emphasizing constitutional principles and civics.",
      },
      {
        heading: "What did not change?",
        body: "The English reading, writing, and speaking portions of the naturalization interview follow the same vocabulary lists. Some civics answers still change with elections — study current officials for your interview date.",
      },
      {
        heading: "How to prepare",
        body: "Confirm your test version with our eligibility checker, then practice the matching question bank. Use flashcards and interview simulation until you consistently meet the pass threshold for your version.",
      },
    ],
  },
  {
    slug: "interview",
    title: "What to Expect at Your Naturalization Interview",
    description:
      "A practical overview of the USCIS naturalization interview: application review, English test, and civics test.",
    sections: [
      {
        heading: "Before you go",
        body: "Bring the appointment notice and required documents. Review your N-400 answers — the officer will ask about your application and background. Study civics and English for your test version.",
      },
      {
        heading: "During the interview",
        body: "An officer places you under oath, reviews your application, and tests English (speaking, reading, writing) unless you qualify for an exemption. Then comes the oral civics test from the official question list.",
      },
      {
        heading: "Civics scoring",
        body: "2008 version: up to 10 questions, need 6 correct. 2025 version: up to 20 questions, need 12 correct. Officers may stop early once you pass or fail. Answer with the official serving at the time of your interview for questions that change.",
      },
      {
        heading: "Practice tip",
        body: "Say answers out loud. The real test is oral. Use our speak mode and interview simulation so the format feels familiar on test day.",
      },
    ],
  },
  {
    slug: "eligibility",
    title: "Am I Eligible to Apply for U.S. Citizenship?",
    description:
      "Key naturalization eligibility themes and how to choose the right civics test practice set.",
    sections: [
      {
        heading: "Common requirements (overview)",
        body: "Typical requirements include a period as a lawful permanent resident, continuous residence and physical presence, good moral character, attachment to the Constitution, and the ability to demonstrate English and civics knowledge — with important exceptions for age and long-term residency.",
      },
      {
        heading: "English and civics exceptions",
        body: "Some applicants qualify for English exemptions (for example 50/20 or 55/15 rules) or the 65/20 special civics consideration (20 starred questions; 10 asked; need 6; civics may be in your language of choice). Confirm current policy for your situation.",
      },
      {
        heading: "Choosing your practice set",
        body: "Your civics practice bank depends on when you filed Form N-400 (2008 vs 2025). Use our free eligibility flow to pick the right version, then practice until you hit the pass threshold consistently.",
      },
      {
        heading: "Next step",
        body: "This site is a study tool, not legal advice. For case-specific eligibility, consult USCIS guidance or a qualified immigration attorney — then use our practice tools to prepare for the interview.",
      },
    ],
  },
];

export function getLearnPost(slug: string): LearnPost | undefined {
  return LEARN_POSTS.find((p) => p.slug === slug);
}
