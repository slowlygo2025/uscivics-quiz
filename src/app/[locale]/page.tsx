import Link from "next/link";
import type { Metadata } from "next";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import BrandLogo from "@/components/BrandLogo";
import HeroWithPhoto from "@/components/HeroWithPhoto";
import TestVersionNotice from "@/components/TestVersionNotice";
import TrustDiffStrip from "@/components/TrustDiffStrip";
import HomeLiveStrip from "@/components/HomeLiveStrip";
import {
  buildPageMetadata,
  organizationJsonLd,
  websiteJsonLd,
  webApplicationJsonLd,
  faqJsonLd,
} from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { isLocale } from "@/lib/locales";
import { SITE_IMAGES, absoluteImageUrl } from "@/lib/site-images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return buildPageMetadata({
    locale: locale as Locale,
    path: "",
    title: dict.homeMetaTitle,
    description: dict.homeMetaDescription,
    image: absoluteImageUrl(SITE_IMAGES.homeHero.src),
    imageAlt: SITE_IMAGES.homeHero.alt,
    absoluteTitle: true,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  return (
    <div className="flex flex-col">
      <JsonLd
        data={[
          organizationJsonLd(),
          websiteJsonLd(),
          webApplicationJsonLd(),
          faqJsonLd([
            { question: dict.faqQ1, answer: dict.faqA1 },
            { question: dict.faqQ2, answer: dict.faqA2 },
            { question: dict.faqQ3, answer: dict.faqA3 },
            { question: dict.faqQ5, answer: dict.faqA5 },
          ]),
        ]}
      />
      <HeroWithPhoto image={SITE_IMAGES.homeHero} priority>
        <h1 className="gw-rise gw-hero__brand" aria-label={dict.brand}>
          <BrandLogo
            title={dict.brand}
            subtitle={dict.logoSubtitle}
            variant="onDark"
            size="lg"
          />
        </h1>

        <div className="gw-rise gw-rise-delay-1 gw-hero__copy">
          <p className="gw-hero__headline">{dict.tagline}</p>
          <p className="gw-hero__support">{dict.heroSupport}</p>
        </div>

        <div className="gw-rise gw-rise-delay-2 gw-hero__actions">
          <Link href={`/${locale}/eligibility`} className="gw-btn gw-btn-block-sm gw-btn-hero">
            {dict.startEligibility}
            <span aria-hidden>→</span>
          </Link>
          <Link
            href={`/${locale}/practice/2025`}
            className="gw-hero__secondary"
          >
            {dict.startInSecondsCta}
            <span aria-hidden>→</span>
          </Link>
        </div>

        <p className="gw-rise gw-rise-delay-3 gw-hero__meta">
          <span>{dict.freeBadge}</span>
          <span aria-hidden>·</span>
          <span>{dict.officialBadge}</span>
          <span aria-hidden>·</span>
          <span>{dict.bilingualBadge}</span>
        </p>
      </HeroWithPhoto>

      <div className="mt-8 sm:mt-10">
        <TrustDiffStrip dict={dict} variant="compact" />
      </div>

      <div className="mt-10 sm:mt-12">
        <TestVersionNotice dict={dict} locale={locale as Locale} />
      </div>

      <div className="mt-10 sm:mt-12">
        <HomeLiveStrip dict={dict} locale={locale as Locale} />
      </div>

      <section className="mt-14 sm:mt-16">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {dict.practiceHeading}
          </h2>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
          <Link
            href={`/${locale}/questions/all-100`}
            className="gw-practice-link group"
          >
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-signal">
              2008
            </p>
            <p className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-ink group-hover:text-signal">
              {dict.practice2008}
            </p>
            <p className="gw-practice-link__meta">{dict.practice2008Meta}</p>
            <span className="gw-practice-link__arrow">
              {dict.practiceCta} →
            </span>
          </Link>
          <Link
            href={`/${locale}/questions/all-128`}
            className="gw-practice-link group"
          >
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-signal">
              2025
            </p>
            <p className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-ink group-hover:text-signal">
              {dict.practice2025}
            </p>
            <p className="gw-practice-link__meta">{dict.practice2025Meta}</p>
            <span className="gw-practice-link__arrow">
              {dict.practiceCta} →
            </span>
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted">
          <Link
            href={`/${locale}/questions`}
            className="font-semibold text-signal underline-offset-2 hover:underline"
          >
            {dict.seoAllLandings}
          </Link>
          {" · "}
          <Link
            href={`/${locale}/practice/2025`}
            className="font-semibold text-signal underline-offset-2 hover:underline"
          >
            {dict.navPractice}
          </Link>
          {" · "}
          <Link
            href={`/${locale}/updates`}
            className="font-semibold text-signal underline-offset-2 hover:underline"
          >
            {dict.navUpdates}
          </Link>
        </p>
      </section>
    </div>
  );
}
