import type { TestVersion } from "./types";

export type InterviewConfig = {
  totalQuestions: number;
  asked: number;
  passThreshold: number;
  /** Officer stops (fail) once wrong answers reach this count. */
  failThreshold: number;
  effectiveDate?: string;
};

export const TEST_CONFIG: Record<TestVersion, InterviewConfig> = {
  "2008": {
    totalQuestions: 100,
    asked: 10,
    passThreshold: 6,
    failThreshold: 5,
    effectiveDate: "before 2025-10-20",
  },
  "2025": {
    totalQuestions: 128,
    asked: 20,
    passThreshold: 12,
    failThreshold: 9,
    effectiveDate: "on/after 2025-10-20",
  },
};

export const SENIOR_EXEMPTION: InterviewConfig = {
  totalQuestions: 10,
  asked: 10,
  passThreshold: 6,
  failThreshold: 5,
};

export function getInterviewConfig(
  version: TestVersion,
  senior = false
): InterviewConfig {
  return senior ? SENIOR_EXEMPTION : TEST_CONFIG[version];
}
