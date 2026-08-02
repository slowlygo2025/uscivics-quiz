import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import { LOCALES, isLocale } from "@/lib/locales";
import { SEO_STATE_CODES, isSeoStateCode } from "@/lib/seo-topics";
import { getStateInfo } from "@/lib/states";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SEO_STATE_CODES.map((code) => ({
      locale,
      code: code.toLowerCase(),
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; code: string }>;
}): Promise<Metadata> {
  const { locale, code } = await params;
  if (!isLocale(locale) || !isSeoStateCode(code.toUpperCase())) return {};
  const st = getStateInfo(code.toUpperCase())!;
  return {
    title: `${st.name} Civics Test Practice — Capital & Governor`,
    description: `Study changing USCIS civics answers for ${st.name}: capital ${st.capital}, governor ${st.governor}. Free practice for the naturalization interview.`,
  };
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ locale: string; code: string }>;
}) {
  const { locale: raw, code: rawCode } = await params;
  if (!isLocale(raw)) notFound();
  const code = rawCode.toUpperCase();
  if (!isSeoStateCode(code)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const st = getStateInfo(code)!;

  return (
    <div className="space-y-8">
      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-signal">
          {code}
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {st.name} — {dict.seoStatesHeading}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
          {dict.seoStateLead}
        </p>
      </header>

      <dl className="grid gap-3 sm:grid-cols-2">
        <div className="border border-line bg-surface px-4 py-4">
          <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
            {dict.seoStateCapital}
          </dt>
          <dd className="mt-1 text-lg font-bold text-ink">{st.capital}</dd>
        </div>
        <div className="border border-line bg-surface px-4 py-4">
          <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
            {dict.seoStateGovernor}
          </dt>
          <dd className="mt-1 text-lg font-bold text-ink">{st.governor}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/${locale}/practice/2025`}
          className="gw-btn gw-btn-primary"
        >
          {dict.seoStatePractice}
          <span aria-hidden>→</span>
        </Link>
        <Link
          href={`/${locale}/questions/all-128`}
          className="gw-btn gw-btn-ghost"
        >
          {dict.seoAll128Title}
        </Link>
      </div>
    </div>
  );
}
