"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/types";

export default function MobileNav({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const primary = [
    { href: `/${locale}`, label: dict.navHome },
    { href: `/${locale}/eligibility`, label: dict.navCitizenship },
    { href: `/${locale}/practice/2025`, label: dict.navTest2025 },
    { href: `/${locale}/practice/2008`, label: dict.navTest2008 },
    { href: `/${locale}/questions/senior`, label: dict.navSenior },
    { href: `/${locale}/questions`, label: dict.navQuestions },
    { href: `/${locale}/english/reading`, label: dict.navReadingTest },
    { href: `/${locale}/english/writing`, label: dict.navWritingTest },
    { href: `/${locale}/updates`, label: dict.navUpdates },
  ];

  const secondary = [
    { href: `/${locale}/learn`, label: dict.navLearn },
    { href: `/${locale}/english`, label: dict.navEnglish },
    { href: `/${locale}/about`, label: dict.navAbout },
    { href: `/${locale}/contact`, label: dict.navContact },
    { href: `/${locale}/privacy`, label: dict.navPrivacy },
    { href: `/${locale}/terms`, label: dict.navTerms },
  ];

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius)] text-ink-soft touch-manipulation transition-colors hover:bg-mist hover:text-ink"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? dict.menuClose : dict.menuOpen}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? dict.menuClose : dict.menuOpen}</span>
        <span aria-hidden className="flex w-4 flex-col gap-1">
          <span
            className={`h-0.5 rounded-full bg-current transition-transform ${
              open ? "translate-y-1.5 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 rounded-full bg-current transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 rounded-full bg-current transition-transform ${
              open ? "-translate-y-1.5 -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label={dict.menuClose}
            className="fixed inset-0 z-40 bg-ink/35 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          <nav
            id={panelId}
            className="gw-safe-bottom fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl border border-line bg-surface px-4 pb-4 pt-3 shadow-[0_-16px_48px_rgba(11,28,44,0.18)]"
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" />
            <ul className="flex flex-col gap-1">
              {primary.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center rounded-xl px-3 text-sm font-semibold uppercase tracking-[0.1em] text-ink-soft transition-colors active:bg-mist hover:bg-mist hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              {dict.legalBadge}
            </p>
            <ul className="mt-1 flex flex-col gap-1">
              {secondary.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center rounded-xl px-3 text-sm font-medium text-muted transition-colors active:bg-mist hover:bg-mist hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
