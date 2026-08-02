import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import { LOCALES, isLocale } from "@/lib/locales";
import { SEO_TOPICS, SEO_STATE_CODES } from "@/lib/seo-topics";
import { SEO_DRILLS, drillCopy } from "@/lib/seo-drills";
import { getStateInfo } from "@/lib/states";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/questions",
    title: dict.seoQuestionsHubTitle,
    description: dict.seoQuestionsHubLead,
  });
}

export default async function QuestionsHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="space-y-10">
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.navHome, path: "" },
          { name: dict.navQuestions, path: "/questions" },
        ])}
      />
      <header className="max-w-3xl">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {dict.seoQuestionsHubTitle}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
          {dict.seoQuestionsHubLead}
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2">
        <Link href={`/${locale}/questions/all-128`} className="gw-practice-link">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-signal">
            2025
          </p>
          <p className="font-[family-name:var(--font-display)] text-xl font-bold text-ink">
            {dict.seoAll128Title}
          </p>
        </Link>
        <Link href={`/${locale}/questions/all-100`} className="gw-practice-link">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-signal">
            2008
          </p>
          <p className="font-[family-name:var(--font-display)] text-xl font-bold text-ink">
            {dict.seoAll100Title}
          </p>
        </Link>
        <Link
          href={`/${locale}/questions/senior`}
          className="gw-practice-link sm:col-span-2"
        >
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-signal">
            65/20
          </p>
          <p className="font-[family-name:var(--font-display)] text-xl font-bold text-ink">
            {dict.seoSeniorTitle}
          </p>
        </Link>
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
          {dict.seoDrillsHeading}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">{dict.seoDrillsLead}</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {SEO_DRILLS.map((d) => {
            const copy = drillCopy(d, locale);
            return (
              <li key={d.slug}>
                <Link
                  href={`/${locale}/questions/drill/${d.slug}`}
                  className="block border border-line bg-surface px-4 py-3 font-semibold text-signal underline-offset-2 hover:border-signal hover:underline"
                >
                  {copy.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
          {dict.seoTopicsHeading}
        </h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {SEO_TOPICS.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/${locale}/questions/topic/${t.slug}`}
                className="block border border-line bg-surface px-4 py-3 font-semibold text-signal underline-offset-2 hover:border-signal hover:underline"
              >
                {t.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
          {dict.seoStatesHeading}
        </h2>
        <p className="mt-2 text-sm text-muted">
          {SEO_STATE_CODES.length} {dict.seoStatesCount}
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SEO_STATE_CODES.map((code) => {
            const st = getStateInfo(code)!;
            return (
              <li key={code}>
                <Link
                  href={`/${locale}/questions/state/${code.toLowerCase()}`}
                  className="block border border-line bg-surface px-4 py-3 font-semibold text-signal underline-offset-2 hover:border-signal hover:underline"
                >
                  {st.name} ({code})
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
