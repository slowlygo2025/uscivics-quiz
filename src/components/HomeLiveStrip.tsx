"use client";

import Link from "next/link";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/types";
import {
  UscisUpdatesProvider,
  useFederalOfficialsLive,
  useUscisUpdatesContext,
} from "@/components/UscisUpdatesProvider";
import { asOfDate } from "@/lib/federal-officials";

const OFFICES = ["president", "vicePresident", "speaker", "chiefJustice"] as const;

const LABELS: Record<(typeof OFFICES)[number], keyof Dictionary> = {
  president: "federalPresident",
  vicePresident: "federalVP",
  speaker: "federalSpeaker",
  chiefJustice: "federalChief",
};

function StripInner({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const officials = useFederalOfficialsLive();
  const updates = useUscisUpdatesContext();
  const shown = OFFICES.map((office) =>
    officials.find((o) => o.office === office)
  ).filter(Boolean);

  return (
    <section className="gw-rise overflow-hidden border border-line bg-surface shadow-[var(--shadow-soft)]">
      <div className="border-b border-line bg-mist/40 px-4 py-3.5 sm:px-5">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-ink sm:text-xl">
            {dict.homeLiveHeading}
          </h2>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
            {updates.live ? dict.updatesLiveBadge : dict.updatesCachedBadge}
            {" · "}
            {dict.federalAsOf} {asOfDate(updates.scrapedAt)}
          </p>
        </div>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">
          {dict.homeLiveLead}
        </p>
      </div>

      <dl className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((o) =>
          o ? (
            <div key={o.office} className="bg-surface px-4 py-3.5 sm:px-5">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                {dict[LABELS[o.office as (typeof OFFICES)[number]]]}
              </dt>
              <dd className="mt-1 text-sm font-semibold text-ink">{o.name}</dd>
            </div>
          ) : null
        )}
      </dl>

      <div className="flex flex-col gap-2 border-t border-line px-4 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:px-5">
        <Link
          href={`/${locale}/updates`}
          className="text-sm font-semibold text-signal underline-offset-2 hover:underline"
        >
          {dict.homeLiveCta} →
        </Link>
        <Link
          href={`/${locale}/practice/2025`}
          className="text-sm font-semibold text-signal underline-offset-2 hover:underline"
        >
          {dict.zipTitle} →
        </Link>
      </div>
    </section>
  );
}

/** Compact live officials on home — signals a practice app, not a blog. */
export default function HomeLiveStrip({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <UscisUpdatesProvider>
      <StripInner dict={dict} locale={locale} />
    </UscisUpdatesProvider>
  );
}
