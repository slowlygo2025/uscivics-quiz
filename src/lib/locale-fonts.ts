import {
  Noto_Sans,
  Noto_Sans_Arabic,
  Noto_Sans_SC,
  Noto_Sans_KR,
  Noto_Sans_Devanagari,
} from "next/font/google";
import type { Locale } from "@/lib/types";

/** Script fonts — preload false to avoid bloating every locale shell. */
const notoSc = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-script",
  display: "swap",
  preload: false,
});

const notoAr = Noto_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-script",
  display: "swap",
  preload: false,
});

const notoKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-script",
  display: "swap",
  preload: false,
});

const notoHi = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-script",
  display: "swap",
  preload: false,
});

const notoRu = Noto_Sans({
  subsets: ["cyrillic", "latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-script",
  display: "swap",
  preload: false,
});

/** Returns extra className (CSS variable) for locales that need script coverage. */
export function localeScriptFontClass(locale: Locale): string {
  switch (locale) {
    case "zh":
      return notoSc.variable;
    case "ar":
      return notoAr.variable;
    case "ko":
      return notoKr.variable;
    case "hi":
      return notoHi.variable;
    case "ru":
      return notoRu.variable;
    default:
      return "";
  }
}

export function localeUsesScriptFont(locale: Locale): boolean {
  return Boolean(localeScriptFontClass(locale));
}
