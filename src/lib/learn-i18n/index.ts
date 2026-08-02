import type { Locale } from "@/lib/types";

export type LearnSection = { heading: string; body: string };
export type LearnLocalized = {
  title: string;
  description: string;
  sections: LearnSection[];
};

import en from "./en.json";
import es from "./es.json";
import zh from "./zh.json";
import vi from "./vi.json";
import tl from "./tl.json";
import ar from "./ar.json";
import ko from "./ko.json";
import hi from "./hi.json";
import ru from "./ru.json";
import ht from "./ht.json";
import fr from "./fr.json";

type Bundle = Record<string, LearnLocalized>;

const BUNDLES: Record<Locale, Bundle> = {
  en: en as Bundle,
  es: es as Bundle,
  zh: zh as Bundle,
  vi: vi as Bundle,
  tl: tl as Bundle,
  ar: ar as Bundle,
  ko: ko as Bundle,
  hi: hi as Bundle,
  ru: ru as Bundle,
  ht: ht as Bundle,
  fr: fr as Bundle,
};

export function getLearnLocaleCopy(
  slug: string,
  locale: Locale
): LearnLocalized | undefined {
  return BUNDLES[locale]?.[slug] ?? BUNDLES.en[slug];
}

export function listLearnLocaleCopy(locale: Locale): {
  slug: string;
  copy: LearnLocalized;
}[] {
  const bundle = BUNDLES[locale] ?? BUNDLES.en;
  return Object.keys(BUNDLES.en).map((slug) => ({
    slug,
    copy: bundle[slug] ?? BUNDLES.en[slug],
  }));
}
