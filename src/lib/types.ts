export type Locale = "en" | "es";

export type TestVersion = "2008" | "2025";

export interface CivicsQuestion {
  id: number;
  category: string;
  question: string;
  answers: string[];
  /** True for the 20 starred questions used in the 65/20 special consideration. */
  senior?: boolean;
}

export interface EligibilityAnswers {
  filedBeforeOct2025: boolean | null;
  seniorExemption: boolean | null;
}
