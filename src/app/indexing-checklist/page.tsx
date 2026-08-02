import type { Metadata } from "next";
import {
  INDEXING_STEPS,
  buildIndexingChecklist,
  SITE_ORIGIN,
} from "@/lib/indexing-priority";

export const metadata: Metadata = {
  title: "Indexing checklist (internal)",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function IndexingChecklistPage() {
  const rows = buildIndexingChecklist(["en", "es"]);
  const byTier = {
    1: rows.filter((r) => r.tier === 1),
    2: rows.filter((r) => r.tier === 2),
    3: rows.filter((r) => r.tier === 3),
    4: rows.filter((r) => r.tier === 4),
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 font-sans text-ink">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-signal">
        Internal · noindex
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold">
        Google Search Console — indexing checklist
      </h1>
      <p className="mt-3 text-muted">
        Use after sitemap submit. For each URL: Search Console → Inspect URL →
        Request indexing. Prefer Tier 1, then Tier 2. Sitemap:{" "}
        <a className="text-signal underline" href={`${SITE_ORIGIN}/sitemap.xml`}>
          {SITE_ORIGIN}/sitemap.xml
        </a>
      </p>

      <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
        {INDEXING_STEPS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>

      {([1, 2, 3, 4] as const).map((tier) => (
        <section key={tier} className="mt-10">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold">
            Tier {tier}
          </h2>
          <ul className="mt-3 space-y-2">
            {byTier[tier].map((r) => (
              <li
                key={`${r.tier}-${r.locale}-${r.url}`}
                className="border border-line bg-surface px-3 py-2 text-sm"
              >
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />
                  <span>
                    <a
                      href={r.url}
                      className="font-semibold text-signal underline-offset-2 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {r.url}
                    </a>
                    <span className="mt-0.5 block text-xs text-muted">
                      {r.why} · {r.locale.toUpperCase()}
                    </span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
