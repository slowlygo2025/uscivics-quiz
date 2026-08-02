import type { Dictionary } from "./en";
import { en } from "./en";

/** Fill any missing keys from English. */
export function completeDict(partial: Partial<Dictionary>): Dictionary {
  return { ...en, ...partial };
}
