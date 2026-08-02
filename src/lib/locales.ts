import type { Locale } from "./types";

export const LOCALES: Locale[] = [
  "en",
  "es",
  "zh",
  "vi",
  "tl",
  "ar",
  "ko",
  "hi",
  "ru",
  "ht",
  "fr",
];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  zh: "中文",
  vi: "Tiếng Việt",
  tl: "Tagalog",
  ar: "العربية",
  ko: "한국어",
  hi: "हिन्दी",
  ru: "Русский",
  ht: "Kreyòl",
  fr: "Français",
};

export const RTL_LOCALES: Locale[] = ["ar"];

export const DEFAULT_LOCALE: Locale = "en";

/** Cookie that remembers explicit or auto-detected locale preference. */
export const LOCALE_COOKIE = "uscivics-locale";

/** Prefer English for oral interview TTS practice. */
export const TTS_LANG = "en-US";

/** Map BCP-47 primary tags / aliases → our Locale. */
const LOCALE_ALIASES: Record<string, Locale> = {
  en: "en",
  es: "es",
  zh: "zh",
  vi: "vi",
  tl: "tl",
  fil: "tl",
  tgl: "tl",
  ar: "ar",
  ko: "ko",
  hi: "hi",
  ru: "ru",
  ht: "ht",
  hat: "ht",
  fr: "fr",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as string[]).includes(value);
}

export function isRtlLocale(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

/**
 * Parse Accept-Language and return ordered tags by quality (highest first).
 * Example: "es-MX,es;q=0.9,en;q=0.8,ar;q=0.7"
 */
export function parseAcceptLanguage(header: string): string[] {
  if (!header.trim()) return [];

  return header
    .split(",")
    .map((part) => {
      const [tagRaw, ...params] = part.trim().split(";");
      const tag = tagRaw.trim().toLowerCase();
      let q = 1;
      for (const p of params) {
        const [k, v] = p.trim().split("=");
        if (k === "q" && v) {
          const parsed = Number(v);
          if (!Number.isNaN(parsed)) q = parsed;
        }
      }
      return { tag, q };
    })
    .filter((x) => x.tag && x.q > 0)
    .sort((a, b) => b.q - a.q)
    .map((x) => x.tag);
}

/** Match a single language tag (e.g. es-MX, zh-Hans, fil) to a supported Locale. */
export function matchLocaleTag(tag: string): Locale | null {
  const normalized = tag.trim().toLowerCase().replace(/_/g, "-");
  if (!normalized || normalized === "*") return null;

  if (isLocale(normalized)) return normalized;

  const primary = normalized.split("-")[0] ?? "";
  if (LOCALE_ALIASES[normalized]) return LOCALE_ALIASES[normalized];
  if (LOCALE_ALIASES[primary]) return LOCALE_ALIASES[primary];

  // zh-CN / zh-TW / zh-Hans → zh
  if (primary === "zh") return "zh";

  return null;
}

/**
 * Pick best supported locale from the browser Accept-Language header.
 * Honors q-values so "es-MX,en;q=0.8" → es.
 */
export function preferLocaleFromAcceptLanguage(header: string): Locale {
  for (const tag of parseAcceptLanguage(header)) {
    const matched = matchLocaleTag(tag);
    if (matched) return matched;
  }
  return DEFAULT_LOCALE;
}

/** Resolve locale: saved cookie → browser language → default. */
export function resolvePreferredLocale(
  cookieValue: string | undefined,
  acceptLanguageHeader: string
): Locale {
  if (cookieValue && isLocale(cookieValue)) return cookieValue;
  return preferLocaleFromAcceptLanguage(acceptLanguageHeader);
}

export function localeCookieOptions(maxAgeSeconds = 60 * 60 * 24 * 365) {
  return {
    path: "/",
    maxAge: maxAgeSeconds,
    sameSite: "lax" as const,
  };
}
