"use client";

import { useEffect, useId, useRef, useState } from "react";
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
import { trackAcceptConsent } from "@/lib/analytics";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function CookieConsent({ locale }: { locale: Locale }) {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const copy = CONSENT_COPY[locale] ?? CONSENT_COPY.en;
  const dialogRef = useRef<HTMLDivElement>(null);
  const manageRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();

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

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const root = dialogRef.current;
    const focusables = root
      ? ([...root.querySelectorAll(FOCUSABLE)] as HTMLElement[])
      : [];
    focusables[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        if (choice === null) {
          decide("essential");
        } else {
          setOpen(false);
        }
        return;
      }
      if (e.key !== "Tab" || !root) return;
      const nodes = [...root.querySelectorAll(FOCUSABLE)] as HTMLElement[];
      if (nodes.length === 0) return;
      const first = nodes[0]!;
      const last = nodes[nodes.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused.current?.focus?.();
      manageRef.current?.focus?.();
    };
    // choice intentionally read for Escape → essential on first visit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function decide(next: ConsentChoice) {
    writeConsent(next);
    setChoice(next);
    setOpen(false);
    void trackAcceptConsent(next);
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
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="gw-safe-bottom fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-surface p-[var(--page-gutter)] shadow-[0_-12px_40px_rgba(11,28,44,0.16)]"
        >
          <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 flex-1">
              <h2
                id={titleId}
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
          ref={manageRef}
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
