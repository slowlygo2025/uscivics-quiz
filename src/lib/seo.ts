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
  absoluteTitle = false,
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
  /** Skip root `%s | USCivics Quiz` template (home + money pages). */
  absoluteTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(locale, path);
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`
    : DEFAULT_OG_IMAGE;
  const ogAlt = imageAlt ?? SITE_NAME;
  return {
    title: absoluteTitle ? { absolute: title } : title,
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
      // No brand X/Twitter handle yet — omit twitter:site until one exists.
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

/** Marks the product as a free browser practice tool (not a blog-only site). */
export function webApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    alternateName: BRAND_ALTERNATE_NAMES,
    url: SITE_URL,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires a modern web browser with JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free USCIS naturalization civics practice — 2008 and 2025 question banks, audio, flashcards, and interview simulation in 10+ languages.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
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
  datePublished,
  dateModified,
  image,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}) {
  const published = datePublished ?? dateModified;
  const modified = dateModified ?? datePublished;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: locale,
    ...(published
      ? { datePublished: `${published}T12:00:00.000Z` }
      : {}),
    ...(modified ? { dateModified: `${modified}T12:00:00.000Z` } : {}),
    ...(image ? { image: [image] } : {}),
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

/** Legal / trust pages — not articles. */
export function webPageJsonLd({
  locale,
  path,
  title,
  description,
  pageType = "WebPage",
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  pageType?: "WebPage" | "AboutPage" | "ContactPage";
}) {
  return {
    "@context": "https://schema.org",
    "@type": pageType,
    name: title,
    description,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    url: absoluteUrl(locale, path),
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
