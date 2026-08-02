export type KeyFact = { value: string; label: string };

export const KEY_NUMBERS: KeyFact[] = [
  { value: "128", label: "Total questions (2025 pool)" },
  { value: "20", label: "Questions asked (2025)" },
  { value: "12", label: "Correct to pass (2025)" },
  { value: "9", label: "Wrong = fail (2025)" },
  { value: "100", label: "U.S. Senators" },
  { value: "435", label: "House Representatives" },
  { value: "27", label: "Constitutional amendments" },
  { value: "9", label: "Supreme Court justices" },
  { value: "6 yrs", label: "Senator term" },
  { value: "2 yrs", label: "House term" },
  { value: "4 yrs", label: "President term" },
  { value: "2", label: "Max presidential terms" },
  { value: "50", label: "States" },
  { value: "13", label: "Original colonies" },
  { value: "5", label: "Justices to decide a case" },
  { value: "Life", label: "Supreme Court tenure" },
];

export const KEY_AMENDMENTS: { num: string; text: string }[] = [
  { num: "1st", text: "Speech, religion, press, assembly, petition" },
  { num: "2nd", text: "Right to bear arms" },
  { num: "13th", text: "Abolished slavery (1865)" },
  { num: "14th", text: "Citizenship for all born or naturalized in the U.S." },
  { num: "15th", text: "Vote cannot be denied based on race (1870)" },
  { num: "19th", text: "Women’s right to vote (1920)" },
  { num: "22nd", text: "President limited to 2 terms" },
  { num: "24th", text: "No poll tax to vote" },
  { num: "26th", text: "Voting age lowered to 18" },
];

export const BRANCHES = [
  {
    name: "Legislative",
    detail: "Congress = Senate (100, 6-year) + House (435, 2-year). Writes laws.",
  },
  {
    name: "Executive",
    detail:
      "President + Cabinet. 4-year term, max 2 terms. Signs/vetoes laws, commands military.",
  },
  {
    name: "Judicial",
    detail:
      "Supreme Court (9 justices, life) + federal courts. Reviews laws for constitutionality.",
  },
];
