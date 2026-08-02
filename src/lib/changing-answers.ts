import type { TestVersion } from "./types";
import { USCIS_TEST_UPDATES } from "./uscis-links";

/**
 * Questions whose answers depend on elections or appointments.
 * Always verify at uscis.gov/citizenship/testupdates before the interview.
 */
export const CHANGING_ANSWER_IDS: Record<TestVersion, number[]> = {
  "2025": [23, 29, 30, 38, 39, 57, 61, 62],
  "2008": [20, 23, 28, 29, 40, 43, 44, 47],
};

export const USCIS_TEST_UPDATES_URL = USCIS_TEST_UPDATES;

export function isChangingAnswer(
  version: TestVersion,
  questionId: number
): boolean {
  return CHANGING_ANSWER_IDS[version].includes(questionId);
}
