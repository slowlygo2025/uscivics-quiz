import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import { LOCALES, isLocale, isRtlLocale } from "@/lib/locales";
import BrandLogo from "@/components/BrandLogo";
import SiteHeader from "@/components/SiteHeader";
import CookieConsent from "@/components/CookieConsent";
import OutboundClickTracker from "@/components/OutboundClickTracker";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const rtl = isRtlLocale(locale);

  return (
    <div className="gw-shell" lang={locale} dir={rtl ? "rtl" : "ltr"}>
      <SiteHeader locale={locale} dict={dict} />
      <CookieConsent locale={locale} />
      <OutboundClickTracker />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
        {children}
      </main>

      <footer className="gw-safe-bottom border-t border-line bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <div className="h-1 w-16 bg-[var(--header)]" aria-hidden />
          <div className="mt-5">
            <BrandLogo
              title={dict.brand}
              subtitle={dict.logoSubtitle}
              variant="onLight"
              size="md"
            />
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            {dict.disclaimer}
          </p>
          <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-signal">
            <Link
              href={`/${locale}/questions`}
              className="inline-flex min-h-10 items-center underline-offset-2 hover:underline"
            >
              {dict.navQuestions}
            </Link>
            <Link
              href={`/${locale}/learn`}
              className="inline-flex min-h-10 items-center underline-offset-2 hover:underline"
            >
              {dict.navLearn}
            </Link>
            <Link
              href={`/${locale}/practice/2025`}
              className="inline-flex min-h-10 items-center underline-offset-2 hover:underline"
            >
              {dict.navTest2025}
            </Link>
            <Link
              href={`/${locale}/practice/2008`}
              className="inline-flex min-h-10 items-center underline-offset-2 hover:underline"
            >
              {dict.navTest2008}
            </Link>
            <Link
              href={`/${locale}/questions/senior`}
              className="inline-flex min-h-10 items-center underline-offset-2 hover:underline"
            >
              {dict.navSenior}
            </Link>
            <Link
              href={`/${locale}/english`}
              className="inline-flex min-h-10 items-center underline-offset-2 hover:underline"
            >
              {dict.navEnglish}
            </Link>
            <Link
              href={`/${locale}/eligibility`}
              className="inline-flex min-h-10 items-center underline-offset-2 hover:underline"
            >
              {dict.startEligibility}
            </Link>
          </nav>
          <nav
            aria-label={dict.legalBadge}
            className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted"
          >
            <Link
              href={`/${locale}/about`}
              className="inline-flex min-h-10 items-center underline-offset-2 hover:text-ink hover:underline"
            >
              {dict.navAbout}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex min-h-10 items-center underline-offset-2 hover:text-ink hover:underline"
            >
              {dict.navContact}
            </Link>
            <Link
              href={`/${locale}/privacy`}
              className="inline-flex min-h-10 items-center underline-offset-2 hover:text-ink hover:underline"
            >
              {dict.navPrivacy}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="inline-flex min-h-10 items-center underline-offset-2 hover:text-ink hover:underline"
            >
              {dict.navTerms}
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
