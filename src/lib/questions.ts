import type { CivicsQuestion, Locale, TestVersion } from "./types";
import type { VersionProgress } from "./progress";
import { smartPriority } from "./progress";

import q2008en from "@/data/questions/2008-en.json";
import q2008es from "@/data/questions/2008-es.json";
import q2008zh from "@/data/questions/2008-zh.json";
import q2008vi from "@/data/questions/2008-vi.json";
import q2008tl from "@/data/questions/2008-tl.json";
import q2008ar from "@/data/questions/2008-ar.json";
import q2008ko from "@/data/questions/2008-ko.json";
import q2008hi from "@/data/questions/2008-hi.json";
import q2008ru from "@/data/questions/2008-ru.json";
import q2008ht from "@/data/questions/2008-ht.json";
import q2008fr from "@/data/questions/2008-fr.json";
import q2025en from "@/data/questions/2025-en.json";
import q2025es from "@/data/questions/2025-es.json";
import q2025zh from "@/data/questions/2025-zh.json";
import q2025vi from "@/data/questions/2025-vi.json";
import q2025tl from "@/data/questions/2025-tl.json";
import q2025ar from "@/data/questions/2025-ar.json";
import q2025ko from "@/data/questions/2025-ko.json";
import q2025hi from "@/data/questions/2025-hi.json";
import q2025ru from "@/data/questions/2025-ru.json";
import q2025ht from "@/data/questions/2025-ht.json";
import q2025fr from "@/data/questions/2025-fr.json";

const BANKS: Record<TestVersion, Record<Locale, CivicsQuestion[]>> = {
  "2008": {
    en: q2008en,
    es: q2008es,
    zh: q2008zh,
    vi: q2008vi,
    tl: q2008tl,
    ar: q2008ar,
    ko: q2008ko,
    hi: q2008hi,
    ru: q2008ru,
    ht: q2008ht,
    fr: q2008fr,
  },
  "2025": {
    en: q2025en,
    es: q2025es,
    zh: q2025zh,
    vi: q2025vi,
    tl: q2025tl,
    ar: q2025ar,
    ko: q2025ko,
    hi: q2025hi,
    ru: q2025ru,
    ht: q2025ht,
    fr: q2025fr,
  },
};

export type BankOptions = {
  seniorOnly?: boolean;
  category?: string | null;
};

export function getQuestionBank(
  version: TestVersion,
  locale: Locale,
  options?: BankOptions
): CivicsQuestion[] {
  let bank = BANKS[version][locale] ?? BANKS[version].en;
  if (options?.seniorOnly) bank = bank.filter((q) => q.senior);
  if (options?.category) {
    bank = bank.filter((q) => q.category === options.category);
  }
  return bank;
}

export function getEnglishQuestion(
  version: TestVersion,
  id: number
): CivicsQuestion | undefined {
  return BANKS[version].en.find((q) => q.id === id);
}

export function getCategories(
  version: TestVersion,
  locale: Locale,
  options?: { seniorOnly?: boolean }
): string[] {
  const bank = getQuestionBank(version, locale, options);
  return [...new Set(bank.map((q) => q.category))];
}

function shuffleCopy<T>(items: T[]): T[] {
  const bank = [...items];
  for (let i = bank.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bank[i], bank[j]] = [bank[j], bank[i]];
  }
  return bank;
}

export function getRandomQuestions(
  version: TestVersion,
  locale: Locale,
  count: number,
  options?: BankOptions
): CivicsQuestion[] {
  const bank = shuffleCopy(getQuestionBank(version, locale, options));
  return bank.slice(0, Math.min(count, bank.length));
}

export function getSmartQuestions(
  version: TestVersion,
  locale: Locale,
  count: number,
  progress: VersionProgress,
  options?: BankOptions
): CivicsQuestion[] {
  const bank = [...getQuestionBank(version, locale, options)];
  bank.sort(
    (a, b) =>
      smartPriority(b.id, progress) -
      smartPriority(a.id, progress) +
      (Math.random() - 0.5) * 20
  );
  return bank.slice(0, Math.min(count, bank.length));
}
