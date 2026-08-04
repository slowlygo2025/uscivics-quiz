import Link from "next/link";
import { cookies } from "next/headers";
import { getDictionary } from "@/lib/dictionary";
import { isLocale, LOCALE_COOKIE } from "@/lib/locales";
import type { Locale } from "@/lib/types";

/** Locale-scoped 404 — prefers locale cookie when set by the proxy. */
export default async function LocaleNotFound() {
  const jar = await cookies();
  const raw = jar.get(LOCALE_COOKIE)?.value;
  const locale: Locale = raw && isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-start justify-center gap-4 py-16">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-signal">
        {dict.brand}
      </p>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink">
        {dict.notFoundTitle}
      </h1>
      <p className="text-base leading-relaxed text-muted">{dict.notFoundLead}</p>
      <Link href={`/${locale}`} className="gw-btn gw-btn-primary mt-2">
        {dict.notFoundHome}
      </Link>
    </div>
  );
}
