"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/types";
import { LOCALES, LOCALE_COOKIE, LOCALE_LABELS } from "@/lib/locales";

const LOCALE_RE = /^\/(en|es|zh|vi|tl|ar|ko|hi|ru|ht|fr)/;

function persistLocale(locale: Locale) {
  try {
    document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`;
  } catch {
    // ignore
  }
}

export default function LanguageSwitcher({
  locale,
  variant = "default",
}: {
  locale: Locale;
  variant?: "default" | "header";
}) {
  const pathname = usePathname() || `/${locale}`;
  const rest = pathname.replace(LOCALE_RE, "") || "";
  const header = variant === "header";

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{LOCALE_LABELS[locale]}</span>
      <select
        value={locale}
        onChange={(e) => {
          const next = e.target.value as Locale;
          persistLocale(next);
          window.location.href = `/${next}${rest}`;
        }}
        className={
          header
            ? "appearance-none bg-transparent py-2.5 pl-2 pr-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft outline-none transition-colors hover:text-ink min-h-10 touch-manipulation"
            : "appearance-none rounded-[var(--radius)] border border-line bg-surface py-2.5 pl-3.5 pr-8 text-sm font-semibold text-ink outline-none transition-colors hover:border-signal min-h-11 touch-manipulation"
        }
      >
        {LOCALES.map((code) => (
          <option key={code} value={code}>
            {LOCALE_LABELS[code]}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className={
          header
            ? "pointer-events-none absolute end-0 text-[9px] text-muted"
            : "pointer-events-none absolute end-2.5 text-[10px] text-muted"
        }
      >
        ▾
      </span>
    </label>
  );
}
