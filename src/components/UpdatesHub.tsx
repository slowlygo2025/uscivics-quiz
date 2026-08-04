"use client";

import Link from "next/link";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/types";
import TestVersionNotice from "@/components/TestVersionNotice";
import ChangingAnswersBanner from "@/components/ChangingAnswersBanner";
import FederalOfficials from "@/components/FederalOfficials";
import ZipOfficials from "@/components/ZipOfficials";
import TrustDiffStrip from "@/components/TrustDiffStrip";
import { UscisUpdatesProvider } from "@/components/UscisUpdatesProvider";
import { USCIS_TEST_UPDATES } from "@/lib/uscis-links";

const POLICY_LINKS: { path: string; labelKey: keyof Dictionary }[] = [
  { path: "/learn/n-400-filing-date", labelKey: "linkN400Filing" },
  { path: "/learn/which-civics-test", labelKey: "linkWhichCivicsTest" },
  { path: "/learn/2025-changes", labelKey: "link2025Changes" },
  { path: "/learn/65-20", labelKey: "link6520" },
];

/** Narrow policy/exam hub — changelog style, not a news feed. */
export default function UpdatesHub({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <UscisUpdatesProvider>
      <div className="space-y-10">
        <header className="gw-rise max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-signal">
            {dict.navUpdates}
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {dict.updatesHubTitle}
          </h1>
          <p className="mt-2 text-base leading-relaxed text-muted">
            {dict.updatesHubLead}
          </p>
          <TrustDiffStrip dict={dict} variant="compact" />
        </header>

        <TestVersionNotice dict={dict} />

        <ChangingAnswersBanner dict={dict} locale={locale} />

        <section className="space-y-4">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-ink sm:text-2xl">
              {dict.updatesLiveHeading}
            </h2>
            <p className="mt-1 text-sm text-muted">{dict.updatesVerifyNote}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <FederalOfficials dict={dict} locale={locale} />
            <ZipOfficials dict={dict} />
          </div>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {dict.updatesPolicyHeading}
          </h2>
          <ul className="mt-4 divide-y divide-line border border-line bg-surface">
            {POLICY_LINKS.map((item) => (
              <li key={item.path}>
                <Link
                  href={`/${locale}${item.path}`}
                  className="flex min-h-12 items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-mist hover:text-signal sm:px-5"
                >
                  <span>{dict[item.labelKey]}</span>
                  <span aria-hidden className="text-muted">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:flex-wrap sm:items-center">
          <Link href={`/${locale}/eligibility`} className="gw-btn">
            {dict.startEligibility}
            <span aria-hidden>→</span>
          </Link>
          <Link
            href={`/${locale}/practice/2025`}
            className="text-sm font-semibold text-signal underline-offset-2 hover:underline"
          >
            {dict.startInSecondsCta} →
          </Link>
          <a
            href={USCIS_TEST_UPDATES}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-muted underline-offset-2 hover:text-ink hover:underline"
          >
            {dict.uscisUpdatesTitle} (USCIS.gov) ↗
          </a>
        </div>

        <p className="text-xs leading-relaxed text-muted">{dict.disclaimer}</p>
      </div>
    </UscisUpdatesProvider>
  );
}
