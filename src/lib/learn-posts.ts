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
        body: "This site is a study tool, not legal advice. For case-specific eligibility, consult official guidance or a qualified immigration attorney — then use our practice tools to prepare for the interview.",
      },
    ],
  },
  {
    slug: "how-to-apply",
    title: "How to Apply for U.S. Citizenship — Simple Study Roadmap",
    description:
      "A practical overview of the naturalization path and how to prepare for the English and civics tests while your case moves forward.",
    sections: [
      {
        heading: "The big picture",
        body: "Naturalization usually means confirming you meet eligibility rules, filing Form N-400, attending biometrics if required, completing the interview (English + civics unless exempt), and attending the oath ceremony if approved.",
      },
      {
        heading: "File N-400 carefully",
        body: "Your filing date can determine whether you take the 2008 or 2025 civics test. Double-check every answer on the form — the officer will review your application at the interview.",
      },
      {
        heading: "Study while you wait",
        body: "Do not wait until the appointment notice arrives. Practice civics daily in short sessions, add English reading and writing drills, and run interview simulations so the oral format feels normal.",
      },
      {
        heading: "Use this site",
        body: "Start with Find my test version, then practice your bank with flashcards, smart review, and speak mode. Browse all 100 or 128 questions with free audio when you want a full list review.",
      },
    ],
  },
  {
    slug: "after-becoming-citizen",
    title: "5 Things to Do After Becoming a U.S. Citizen",
    description:
      "Practical next steps after the oath ceremony: documents, passport, voting, family, and staying informed.",
    sections: [
      {
        heading: "1. Keep your Certificate of Naturalization safe",
        body: "Store the certificate securely and make copies. You may need it for a U.S. passport, Social Security updates, and other identity or benefits processes.",
      },
      {
        heading: "2. Apply for a U.S. passport",
        body: "A passport is often the most useful travel and identity document after naturalization. Apply with the documents required for first-time passport applicants.",
      },
      {
        heading: "3. Update records",
        body: "Update your name or citizenship status where needed — for example Social Security, employer records, and state ID or driver’s license — following each agency’s process.",
      },
      {
        heading: "4. Register to vote (if you choose)",
        body: "U.S. citizens can register and vote in elections for which they are eligible. Check your state or local election office for registration rules and deadlines.",
      },
      {
        heading: "5. Help family and community",
        body: "Many new citizens later petition eligible relatives or help others study for the civics test. Share free practice tools and remind learners that the interview is oral.",
      },
    ],
  },
  {
    slug: "study-tips",
    title: "How to Study for the U.S. Citizenship Civics Test",
    description:
      "A simple study plan: short daily practice, oral answers, weak-spot review, and interview simulation before test day.",
    sections: [
      {
        heading: "Confirm your version first",
        body: "2008 and 2025 use different banks and pass rules. Practicing the wrong list wastes time. Use our eligibility checker, then stick to one version.",
      },
      {
        heading: "Ten focused minutes beat long cramming",
        body: "Most learners remember more with daily 10–20 minute sessions than weekend marathons. Rotate flashcards, topic drills, and a short speak session.",
      },
      {
        heading: "Say answers out loud",
        body: "The civics test is oral. Reading silently is not enough. Hear the English question, answer aloud, then check accepted answers — including alternate phrasings officers may accept.",
      },
      {
        heading: "Fix weak questions",
        body: "Use smart review to return to items you miss. Changing answers (president, senators, governor, capital) deserve extra checks close to your interview date.",
      },
      {
        heading: "Simulate the real format",
        body: "In the final 1–2 weeks, run interview simulations until you consistently hit 6/10 (2008) or 12/20 (2025). Confidence comes from repetition in the real scoring format.",
      },
    ],
  },
  {
    slug: "english-test",
    title: "U.S. Citizenship English Test — Reading, Writing, and Speaking",
    description:
      "What to expect on the English portion of the naturalization interview and how to practice reading and writing vocabulary.",
    sections: [
      {
        heading: "Three English skills",
        body: "Unless you qualify for an exemption, the officer evaluates speaking (during the interview conversation), reading (one of three sentences), and writing (one of three dictated sentences).",
      },
      {
        heading: "Official vocabulary",
        body: "Reading and writing use defined USCIS vocabulary lists — people, civics words, places, holidays, and common verbs. Practice sentences built from those words, not random English textbooks.",
      },
      {
        heading: "Speaking tip",
        body: "Speak clearly and answer the officer’s questions about your application. You do not need perfect grammar; you need to show you understand and can communicate in English.",
      },
      {
        heading: "Practice here",
        body: "Use our free English reading and writing pages with audio. Combine them with civics speak mode so both parts of the interview feel familiar.",
      },
    ],
  },
  {
    slug: "65-20",
    title: "65/20 Special Consideration — Civics Test Explained",
    description:
      "How the 65/20 civics consideration works: 20 starred questions, 10 asked, 6 to pass, and language of choice for civics.",
    sections: [
      {
        heading: "Who it is for",
        body: "Applicants who are 65 or older and have been lawful permanent residents for 20 or more years may qualify for a specially selected set of civics questions.",
      },
      {
        heading: "How the test works",
        body: "You study 20 starred questions from your test version (2008 or 2025, based on N-400 filing date). The officer asks 10; you need 6 correct to pass.",
      },
      {
        heading: "Language of choice",
        body: "Under this consideration, you may take the civics test in your language of choice. Bring an interpreter if required by current interview rules for your situation.",
      },
      {
        heading: "Practice the starred set",
        body: "Use our 65/20 question landing and senior practice mode so you only drill the questions that matter for this path — still saying answers out loud.",
      },
    ],
  },
  {
    slug: "changing-answers",
    title: "Civics Answers That Change — Officials, Elections, and Your State",
    description:
      "Which USCIS civics answers can change with elections or appointments, and how to stay current before your interview.",
    sections: [
      {
        heading: "Why some answers move",
        body: "Questions about the President, Vice President, Speaker, Chief Justice, your senators, representative, governor, and state capital depend on who currently serves — not on a fixed textbook year.",
      },
      {
        heading: "Federal officials",
        body: "Our practice hub shows current federal names and refreshes from public test-update information. Always answer with the official in office on your interview day.",
      },
      {
        heading: "Your state and district",
        body: "Governor and capital are state-based. Senators and your House representative depend on where you live. Use ZIP lookup in practice, and review again the week of your interview.",
      },
      {
        heading: "Study habit",
        body: "Memorize stable history and government facts first. Recheck changing answers close to the appointment so you do not carry an outdated name into the interview.",
      },
    ],
  },
];

export function getLearnPost(slug: string): LearnPost | undefined {
  return LEARN_POSTS.find((p) => p.slug === slug);
}
