"use client";

import Link from "next/link";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/types";
import { asOfDate } from "@/lib/federal-officials";
import {
  useFederalOfficialsLive,
  useUscisUpdatesContext,
} from "@/components/UscisUpdatesProvider";
import { USCIS_TEST_UPDATES } from "@/lib/uscis-links";

const LABELS: Record<string, keyof Dictionary> = {
  president: "federalPresident",
  vicePresident: "federalVP",
  speaker: "federalSpeaker",
  chiefJustice: "federalChief",
  presidentParty: "federalParty",
};

export default function FederalOfficials({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const officials = useFederalOfficialsLive();
  const updates = useUscisUpdatesContext();
  const shown = officials.filter((o) => o.office !== "presidentParty");

  return (
    <section className="rounded-2xl border border-line bg-surface/90 p-5 sm:p-6">
      <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-ink">
        {dict.federalTitle}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{dict.federalLead}</p>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        {shown.map((o) => (
          <div key={o.office} className="rounded-xl bg-mist/55 px-4 py-3">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
              {dict[LABELS[o.office]]}
            </dt>
            <dd className="mt-1.5 text-sm font-semibold text-ink">{o.name}</dd>
            <dd className="mt-1 text-xs text-muted">
              {o.answers.filter((a) => a !== o.name).join(" · ")}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-xs text-muted">
        {dict.federalAsOf} {asOfDate(updates.scrapedAt)}
        {" · "}
        {updates.live ? dict.updatesLiveBadge : dict.updatesCachedBadge}.{" "}
        <Link
          href={`/${locale}/updates`}
          className="font-semibold text-signal underline-offset-2 hover:underline"
        >
          {dict.navUpdates}
        </Link>
        {" · "}
        <a
          href={USCIS_TEST_UPDATES}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-signal underline-offset-2 hover:underline"
        >
          USCIS.gov
        </a>
      </p>
    </section>
  );
}
