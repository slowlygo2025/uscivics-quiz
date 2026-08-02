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

  const links = [
    { href: `/${locale}`, label: dict.navHome },
    { href: `/${locale}/practice/2025`, label: dict.navPractice },
    { href: `/${locale}/english`, label: dict.navEnglish },
    { href: `/${locale}/learn`, label: dict.navLearn },
    { href: `/${locale}/eligibility`, label: dict.startEligibility },
  ];

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius)] border border-white/40 bg-white/15 text-white touch-manipulation"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? dict.menuClose : dict.menuOpen}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? dict.menuClose : dict.menuOpen}</span>
        <span aria-hidden className="flex w-4 flex-col gap-1">
          <span
            className={`h-0.5 rounded-full bg-white transition-transform ${
              open ? "translate-y-1.5 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 rounded-full bg-white transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 rounded-full bg-white transition-transform ${
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
            className="gw-safe-bottom fixed inset-x-0 bottom-0 z-50 rounded-t-2xl border border-line bg-surface px-4 pb-4 pt-3 shadow-[0_-16px_48px_rgba(11,28,44,0.18)]"
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" />
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center rounded-xl px-3 text-base font-semibold text-ink-soft transition-colors active:bg-mist hover:bg-mist hover:text-ink"
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
