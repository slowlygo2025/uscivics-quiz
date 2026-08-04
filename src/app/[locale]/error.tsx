"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import { getDictionary } from "@/lib/dictionary";
import { isLocale } from "@/lib/locales";
import type { Locale } from "@/lib/types";

function localeFromPath(pathname: string | null): Locale {
  const seg = pathname?.split("/").filter(Boolean)[0];
  return seg && isLocale(seg) ? seg : "en";
}

/** Route-level error UI (localized). Also reports to Sentry. */
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const dict = getDictionary(locale);

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-start justify-center gap-4 py-16">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-signal">
        {dict.brand}
      </p>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink">
        {dict.errorPageTitle}
      </h1>
      <p className="text-base leading-relaxed text-muted">{dict.errorPageLead}</p>
      <div className="flex flex-wrap gap-3 pt-2">
        <button type="button" className="gw-btn gw-btn-primary" onClick={() => reset()}>
          {dict.errorPageRetry}
        </button>
        <Link href={`/${locale}`} className="gw-btn gw-btn-secondary">
          {dict.errorPageHome}
        </Link>
      </div>
    </div>
  );
}
