import type { TestVersion } from "./types";

export const TEST_CONFIG: Record<
  TestVersion,
  { totalQuestions: number; asked: number; passThreshold: number; effectiveDate: string }
> = {
  "2008": { totalQuestions: 100, asked: 10, passThreshold: 6, effectiveDate: "before 2025-10-20" },
  "2025": { totalQuestions: 128, asked: 20, passThreshold: 12, effectiveDate: "on/after 2025-10-20" },
};

export const SENIOR_EXEMPTION = {
  totalQuestions: 10,
  passThreshold: 6,
};
