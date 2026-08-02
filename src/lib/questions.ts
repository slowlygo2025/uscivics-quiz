import type { CivicsQuestion, Locale, TestVersion } from "./types";

import q2008en from "@/data/questions/2008-en.json";
import q2008es from "@/data/questions/2008-es.json";
import q2025en from "@/data/questions/2025-en.json";
import q2025es from "@/data/questions/2025-es.json";

const BANKS: Record<TestVersion, Record<Locale, CivicsQuestion[]>> = {
  "2008": { en: q2008en, es: q2008es },
  "2025": { en: q2025en, es: q2025es },
};

export function getQuestionBank(
  version: TestVersion,
  locale: Locale,
  options?: { seniorOnly?: boolean }
): CivicsQuestion[] {
  const bank = BANKS[version][locale];
  if (options?.seniorOnly) return bank.filter((q) => q.senior);
  return bank;
}

export function getRandomQuestions(
  version: TestVersion,
  locale: Locale,
  count: number,
  options?: { seniorOnly?: boolean }
): CivicsQuestion[] {
  const bank = [...getQuestionBank(version, locale, options)];
  const result: CivicsQuestion[] = [];
  const n = Math.min(count, bank.length);
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * bank.length);
    result.push(bank.splice(idx, 1)[0]);
  }
  return result;
}
