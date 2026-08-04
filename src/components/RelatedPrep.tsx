"use client";

import type { Dictionary } from "@/lib/dictionary";
import {
  AFFILIATE_ITEMS,
  affiliateAmazonUrl,
} from "@/lib/affiliates";
import { trackAffiliateClick } from "@/lib/analytics";

/** Soft Phase 1 — Related prep (affiliate). Never gates practice. */
export default function RelatedPrep({
  dict,
  source,
}: {
  dict: Dictionary;
  source: "learn" | "sim_complete";
}) {
  return (
    <aside className="border border-line bg-surface px-4 py-4 sm:px-5">
      <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">
        {dict.affiliateHeading}
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-muted">
        {dict.affiliateLead}
      </p>
      <ul className="mt-4 space-y-3">
        {AFFILIATE_ITEMS.map((item) => {
          const href = affiliateAmazonUrl(item.amazonQuery);
          const title = dict[item.titleKey as keyof Dictionary];
          const blurb = dict[item.blurbKey as keyof Dictionary];
          return (
            <li key={item.id}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group block rounded-lg border border-transparent px-1 py-1 transition-colors hover:border-line hover:bg-mist/50"
                onClick={() => {
                  void trackAffiliateClick(item.id, source);
                }}
              >
                <span className="text-sm font-semibold text-signal group-hover:underline">
                  {title} ↗
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                  {blurb}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-[0.7rem] leading-relaxed text-muted">
        {dict.affiliateDisclosure}
      </p>
    </aside>
  );
}
