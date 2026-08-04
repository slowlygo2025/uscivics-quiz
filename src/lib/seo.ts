import type { Metadata } from "next";
import { LOCALES, LOCALE_LABELS } from "@/lib/locales";
import type { Locale } from "@/lib/types";

export const SITE_URL = "https://uscivics-quiz.com";
export const SITE_NAME = "USCivics Quiz";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`;

/** Path after locale, e.g. `/questions/all-128` or `` for home. */
export function localePath(locale: Locale, path = ""): string {
  const clean = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `/${locale}${clean}`;
}

export function absoluteUrl(locale: Locale, path = ""): string {
  return `${SITE_URL}${localePath(locale, path)}`;
}

/** hreflang map for every supported locale + x-default (en). */
export function buildLanguageAlternates(path = ""): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale] = absoluteUrl(locale, path);
  }
  languages["x-default"] = absoluteUrl("en", path);
  return languages;
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  image,
  imageAlt,
}: {
  locale: Locale;
  /** Path without locale prefix, e.g. `/learn/interview` */
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  /** Absolute or site-relative OG image URL */
  image?: string;
  imageAlt?: string;
}): Metadata {
  const url = absoluteUrl(locale, path);
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`
    : DEFAULT_OG_IMAGE;
  const ogAlt = imageAlt ?? SITE_NAME;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      type,
      locale: locale === "zh" ? "zh_CN" : locale,
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const BRAND_ALTERNATE_NAMES = [
  "uscivics-quiz",
  "uscivics quiz",
  "US Civics Quiz",
  "uscivics-quiz.com",
];

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: BRAND_ALTERNATE_NAMES,
    url: SITE_URL,
    logo: `${SITE_URL}/brand-seal.svg`,
    email: "contact@uscivics-quiz.com",
    description:
      "USCivics Quiz (uscivics-quiz.com) — free USCIS naturalization civics and English test practice — 2008 and 2025 question banks.",
    sameAs: [
      "https://github.com/slowlygo2025/uscivics-quiz",
      "https://uscivics-quiz.vercel.app",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: BRAND_ALTERNATE_NAMES,
    url: SITE_URL,
    inLanguage: LOCALES.map((l) => l),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/en/questions?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqJsonLd(
  items: { question: string; answer: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function articleJsonLd({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: locale,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand-seal.svg`,
      },
    },
    mainEntityOfPage: absoluteUrl(locale, path),
  };
}

export function breadcrumbJsonLd(
  locale: Locale,
  crumbs: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(locale, c.path),
    })),
  };
}

export function localeLabel(locale: Locale): string {
  return LOCALE_LABELS[locale];
}
