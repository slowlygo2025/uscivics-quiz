import Link from "next/link";
import type { Metadata } from "next";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import { isLocale } from "@/lib/locales";
import { BRANCHES, KEY_AMENDMENTS, KEY_NUMBERS } from "@/lib/study-guide";
import { USCIS_TEST_UPDATES_URL } from "@/lib/changing-answers";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.learnTitle, description: dict.learnLead };
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  const faqs = [
    { q: dict.faqQ1, a: dict.faqA1 },
    { q: dict.faqQ2, a: dict.faqA2 },
    { q: dict.faqQ3, a: dict.faqA3 },
    { q: dict.faqQ4, a: dict.faqA4 },
    { q: dict.faqQ5, a: dict.faqA5 },
  ];

  const tips = [dict.tip1, dict.tip2, dict.tip3, dict.tip4];

  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <header className="gw-rise">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {dict.learnTitle}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
          {dict.learnLead}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`/${locale}/practice/2025`} className="gw-btn gw-btn-primary">
            {dict.practice2025}
          </Link>
          <Link href={`/${locale}/eligibility`} className="gw-btn gw-btn-secondary">
            {dict.startEligibility}
          </Link>
        </div>
      </header>

      <section className="gw-rise gw-rise-delay-1">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
          {dict.keyNumbersTitle}
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {KEY_NUMBERS.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-line bg-surface/90 px-3 py-3"
            >
              <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tabular-nums text-signal">
                {item.value}
              </p>
              <p className="mt-1 text-xs leading-snug text-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
          {dict.guideBranchesTitle}
        </h2>
        <ul className="mt-4 space-y-3">
          {BRANCHES.map((b) => (
            <li
              key={b.name}
              className="rounded-2xl border border-line bg-surface/90 px-5 py-4"
            >
              <p className="font-semibold text-ink">{b.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{b.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
          {dict.guideAmendmentsTitle}
        </h2>
        <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {KEY_AMENDMENTS.map((a) => (
            <li key={a.num} className="flex gap-4 px-4 py-3 text-sm">
              <span className="w-12 shrink-0 font-semibold text-signal">{a.num}</span>
              <span className="text-ink-soft">{a.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
          {dict.guideTipsTitle}
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink-soft sm:text-base">
          {tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted">
          <a
            href={USCIS_TEST_UPDATES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-signal underline-offset-2 hover:underline"
          >
            {dict.changingBannerLink}
          </a>
        </p>
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
          {dict.faqTitle}
        </h2>
        <div className="mt-4 space-y-4">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-line bg-surface/90 px-5 py-4"
            >
              <summary className="cursor-pointer list-none font-semibold text-ink marker:content-none">
                <span className="flex items-start justify-between gap-3">
                  {item.q}
                  <span className="text-muted transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
