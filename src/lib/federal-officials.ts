import { USCIS_TEST_UPDATES_URL } from "./changing-answers";
import type { TestVersion } from "./types";

/**
 * Federal officials that change with elections/appointments.
 * Source of truth: https://www.uscis.gov/citizenship/testupdates
 * Update this file whenever USCIS posts new names.
 */
export type FederalOffice =
  | "president"
  | "vicePresident"
  | "speaker"
  | "chiefJustice"
  | "presidentParty";

export type FederalOfficial = {
  office: FederalOffice;
  /** Display name (primary). */
  name: string;
  /** All answers USCIS lists as acceptable. */
  answers: string[];
  questionIds: Record<TestVersion, number | null>;
};

/** Last verified against USCIS test updates page. */
export const FEDERAL_OFFICIALS_AS_OF = "2025-09-18";

export const FEDERAL_OFFICIALS: FederalOfficial[] = [
  {
    office: "president",
    name: "Donald J. Trump",
    answers: ["Donald J. Trump", "Donald Trump", "Trump"],
    questionIds: { "2025": 38, "2008": 28 },
  },
  {
    office: "vicePresident",
    name: "JD Vance",
    answers: ["JD Vance", "Vance"],
    questionIds: { "2025": 39, "2008": 29 },
  },
  {
    office: "speaker",
    name: "Mike Johnson",
    answers: ["Mike Johnson", "Johnson", "James Michael Johnson"],
    questionIds: { "2025": 30, "2008": 47 },
  },
  {
    office: "chiefJustice",
    name: "John G. Roberts, Jr.",
    answers: ["John Roberts", "John G. Roberts, Jr.", "Roberts"],
    questionIds: { "2025": 57, "2008": 40 },
  },
  {
    office: "presidentParty",
    name: "Republican (Party)",
    answers: ["Republican", "Republican Party", "Republican (Party)"],
    questionIds: { "2025": null, "2008": 46 },
  },
];

export { USCIS_TEST_UPDATES_URL };

export function getFederalAnswersForQuestion(
  version: TestVersion,
  questionId: number
): string[] | null {
  const hit = FEDERAL_OFFICIALS.find(
    (o) => o.questionIds[version] === questionId
  );
  return hit ? hit.answers : null;
}
