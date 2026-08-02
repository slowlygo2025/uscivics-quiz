"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/types";
import {
  CONSENT_COPY,
  loadMonetagIfNeeded,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";
import { getFirebaseAnalytics } from "@/lib/firebase";

export default function CookieConsent({ locale }: { locale: Locale }) {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const copy = CONSENT_COPY[locale] ?? CONSENT_COPY.en;

  useEffect(() => {
    const existing = readConsent();
    setChoice(existing);
    setOpen(existing === null);
    setReady(true);
    if (existing === "all") {
      loadMonetagIfNeeded();
      void getFirebaseAnalytics();
    }
  }, []);

  useEffect(() => {
    function onConsent(e: Event) {
      const detail = (e as CustomEvent<ConsentChoice>).detail;
      setChoice(detail);
      if (detail === "all") {
        loadMonetagIfNeeded();
        void getFirebaseAnalytics();
      }
    }
    window.addEventListener("uscivics-consent", onConsent);
    return () => window.removeEventListener("uscivics-consent", onConsent);
  }, []);

  function decide(next: ConsentChoice) {
    writeConsent(next);
    setChoice(next);
    setOpen(false);
    if (next === "all") {
      loadMonetagIfNeeded();
      void getFirebaseAnalytics();
    }
  }

  if (!ready) return null;

  return (
    <>
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-consent-title"
          className="gw-safe-bottom fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-surface p-4 shadow-[0_-12px_40px_rgba(11,28,44,0.16)] sm:p-5"
        >
          <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 flex-1">
              <h2
                id="cookie-consent-title"
                className="font-[family-name:var(--font-display)] text-lg font-bold text-ink"
              >
                {copy.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {copy.body}{" "}
                <Link
                  href={`/${locale}/privacy`}
                  className="font-semibold text-signal underline-offset-2 hover:underline"
                >
                  {copy.privacy}
                </Link>
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                className="gw-btn gw-btn-ghost min-h-11"
                onClick={() => decide("essential")}
              >
                {copy.reject}
              </button>
              <button
                type="button"
                className="gw-btn gw-btn-primary min-h-11"
                onClick={() => decide("all")}
              >
                {copy.accept}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="gw-safe-bottom fixed bottom-3 end-3 z-50 rounded-[var(--radius)] border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink-soft shadow-sm transition-colors hover:border-signal hover:text-ink"
          onClick={() => setOpen(true)}
          aria-label={copy.manage}
        >
          {copy.manage}
        </button>
      )}
      {choice ? (
        <span className="sr-only" data-consent={choice}>
          {choice}
        </span>
      ) : null}
    </>
  );
}
