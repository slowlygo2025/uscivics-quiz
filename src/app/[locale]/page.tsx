import Link from "next/link";
import type { Metadata } from "next";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import BrandLogo from "@/components/BrandLogo";
import TestVersionNotice from "@/components/TestVersionNotice";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return { title: dict.siteName, description: dict.tagline };
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
      <section className="gw-hero -mx-4 border border-line sm:-mx-6">
        <div className="gw-hero__glow" aria-hidden />
        <div className="gw-hero__stripes" aria-hidden />
        <div className="gw-hero__sheen" aria-hidden />

        <div className="gw-hero__inner">
          <h1 className="gw-rise">
            <BrandLogo
              title={dict.brand}
              subtitle={dict.officialBadge}
              variant="onDark"
              size="lg"
            />
          </h1>

          <div className="gw-rise gw-rise-delay-1 space-y-3">
            <p className="max-w-xl text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl lg:text-[1.7rem]">
              {dict.tagline}
            </p>
            <p className="max-w-md text-base leading-relaxed text-white/78 sm:text-lg">
              {dict.heroSupport}
            </p>
          </div>

          <div className="gw-rise gw-rise-delay-2">
            <Link href={`/${locale}/eligibility`} className="gw-btn gw-btn-block-sm gw-btn-hero">
              {dict.startEligibility}
              <span aria-hidden>→</span>
            </Link>
          </div>

          <p className="gw-rise gw-rise-delay-3 text-sm font-medium tracking-wide text-white/65">
            {dict.freeBadge}
          </p>
        </div>
      </section>

      <div className="mt-10 sm:mt-12">
        <TestVersionNotice dict={dict} />
      </div>

      <section className="mt-14 sm:mt-16">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {dict.practiceHeading}
          </h2>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
          <Link
            href={`/${locale}/practice/2008`}
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
            href={`/${locale}/practice/2025`}
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
      </section>
    </div>
  );
}
