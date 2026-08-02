import type { Locale } from "./types";
import { en, type Dictionary } from "./dict/en";
import { es } from "./dict/es";
import { zh } from "./dict/zh";
import { vi } from "./dict/vi";
import { tl } from "./dict/tl";
import { ar } from "./dict/ar";
import { ko } from "./dict/ko";
import { hi } from "./dict/hi";
import { ru } from "./dict/ru";
import { ht } from "./dict/ht";
import { fr } from "./dict/fr";

export type { Dictionary };

export const dictionary: Record<Locale, Partial<Dictionary>> = {
  en,
  es,
  zh,
  vi,
  tl,
  ar,
  ko,
  hi,
  ru,
  ht,
  fr,
};

export function getDictionary(locale: Locale): Dictionary {
  return { ...en, ...dictionary[locale] };
}
