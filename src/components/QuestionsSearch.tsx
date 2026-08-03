"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import type { CivicsQuestion, Locale } from "@/lib/types";
import type { Dictionary } from "@/lib/dictionary";

type SearchHit = CivicsQuestion & { version: "2008" | "2025" };

export default function QuestionsSearch({
  locale,
  dict,
  initialQuery,
  bank2008,
  bank2025,
}: {
  locale: Locale;
  dict: Dictionary;
  initialQuery: string;
  bank2008: CivicsQuestion[];
  bank2025: CivicsQuestion[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);
  const [pending, startTransition] = useTransition();

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [] as SearchHit[];
    const match = (item: CivicsQuestion) => {
      const hay = `${item.id} ${item.question} ${item.answers.join(" ")} ${item.category}`.toLowerCase();
      return hay.includes(q);
    };
    const out: SearchHit[] = [];
    for (const item of bank2025) {
      if (match(item)) out.push({ ...item, version: "2025" });
    }
    for (const item of bank2008) {
      if (match(item)) out.push({ ...item, version: "2008" });
    }
    return out.slice(0, 40);
  }, [query, bank2008, bank2025]);

  function commitSearch(value: string) {
    const next = value.trim();
    const url = next
      ? `${pathname}?q=${encodeURIComponent(next)}`
      : pathname;
    startTransition(() => {
      router.replace(url, { scroll: false });
    });
  }

  return (
    <section className="border border-line bg-surface p-4 sm:p-5" aria-label={dict.questionsSearchLabel}>
      <form
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          commitSearch(query);
        }}
      >
        <label className="block min-w-0 flex-1">
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-muted">
            {dict.questionsSearchLabel}
          </span>
          <input
            type="search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => {
              if (query.trim() !== initialQuery.trim()) commitSearch(query);
            }}
            placeholder={dict.browseSearch}
            autoComplete="off"
            className="mt-1.5 w-full border border-line bg-canvas px-3 py-2.5 text-base text-ink outline-none focus:border-signal"
          />
        </label>
        <button type="submit" className="gw-btn gw-btn-primary shrink-0" disabled={pending}>
          {dict.questionsSearchSubmit}
        </button>
      </form>
      <p className="mt-2 text-sm text-muted">{dict.questionsSearchHint}</p>

      {query.trim().length >= 2 ? (
        <div className="mt-4">
          <p className="text-sm font-semibold text-ink">
            {dict.questionsSearchResults}: {hits.length}
            {hits.length === 40 ? "+" : ""}
          </p>
          {hits.length === 0 ? (
            <p className="mt-2 text-sm text-muted">{dict.browseEmpty}</p>
          ) : (
            <ul className="mt-3 divide-y divide-line border border-line">
              {hits.map((hit) => (
                <li key={`${hit.version}-${hit.id}`} className="px-3 py-3 sm:px-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                      {hit.version} · {dict.question} {hit.id}
                    </p>
                    <Link
                      href={`/${locale}/practice/${hit.version}`}
                      className="text-sm font-semibold text-signal underline-offset-2 hover:underline"
                    >
                      {dict.seoStartPractice}
                    </Link>
                  </div>
                  <p className="mt-1 text-sm font-semibold leading-snug text-ink">
                    {hit.question}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {hit.answers.slice(0, 2).join(" · ")}
                    {hit.answers.length > 2 ? "…" : ""}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </section>
  );
}
