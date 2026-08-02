import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import { LOCALES, isLocale, isRtlLocale } from "@/lib/locales";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";
import BrandLogo from "@/components/BrandLogo";

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
      <header className="gw-header gw-safe-top sticky top-0 z-40 text-[var(--header-ink)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-4 md:gap-8">
            <Link
              href={`/${locale}`}
              className="min-w-0 shrink opacity-100 transition-opacity hover:opacity-90"
            >
              <BrandLogo
                title={dict.brand}
                subtitle={dict.logoSubtitle}
                variant="onDark"
                size="sm"
              />
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
              <Link
                href={`/${locale}/practice/2025`}
                className="min-h-10 inline-flex items-center opacity-90 transition-opacity hover:opacity-100 hover:underline"
              >
                {dict.navPractice}
              </Link>
              <Link
                href={`/${locale}/english`}
                className="min-h-10 inline-flex items-center opacity-90 transition-opacity hover:opacity-100 hover:underline"
              >
                {dict.navEnglish}
              </Link>
              <Link
                href={`/${locale}/learn`}
                className="min-h-10 inline-flex items-center opacity-90 transition-opacity hover:opacity-100 hover:underline"
              >
                {dict.navLearn}
              </Link>
            </nav>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle
              labelLight={dict.themeToLight}
              labelDark={dict.themeToDark}
            />
            <LanguageSwitcher locale={locale} />
            <MobileNav locale={locale} dict={dict} />
          </div>
        </div>
      </header>

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
              href={`/${locale}/learn`}
              className="inline-flex min-h-10 items-center underline-offset-2 hover:underline"
            >
              {dict.navLearn}
            </Link>
            <Link
              href={`/${locale}/english`}
              className="inline-flex min-h-10 items-center underline-offset-2 hover:underline"
            >
              {dict.navEnglish}
            </Link>
            <Link
              href={`/${locale}/practice/2025`}
              className="inline-flex min-h-10 items-center underline-offset-2 hover:underline"
            >
              {dict.practice2025}
            </Link>
            <Link
              href={`/${locale}/eligibility`}
              className="inline-flex min-h-10 items-center underline-offset-2 hover:underline"
            >
              {dict.startEligibility}
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
