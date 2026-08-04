"use client";

import Link from "next/link";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/types";
import { useUscisUpdatesContext } from "@/components/UscisUpdatesProvider";

/** Amber alert for answers that change — links to the narrow Updates hub. */
export default function ChangingAnswersBanner({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const updates = useUscisUpdatesContext();

  return (
    <aside className="rounded-2xl border border-amber/25 bg-amber-soft/80 px-5 py-4 sm:px-6">
      <p className="text-sm font-semibold text-amber">{dict.changingBannerTitle}</p>
      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
        {dict.changingBannerBody}
      </p>
      {updates.alert ? (
        <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-3">
          {updates.alert}
        </p>
      ) : null}
      <p className="mt-3">
        <Link
          href={`/${locale}/updates`}
          className="text-sm font-semibold text-signal underline-offset-2 hover:underline"
        >
          {dict.changingBannerLink} →
        </Link>
      </p>
    </aside>
  );
}
