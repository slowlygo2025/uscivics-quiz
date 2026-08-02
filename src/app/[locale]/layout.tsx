import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import { LOCALES, isLocale, isRtlLocale } from "@/lib/locales";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";

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
      <header className="gw-safe-top sticky top-0 z-40 border-b border-line/80 bg-paper/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-3.5">
          <div className="flex min-w-0 items-center gap-4 md:gap-6">
            <Link
              href={`/${locale}`}
              className="truncate font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-ink sm:text-xl"
            >
              {dict.brand}
            </Link>
            <nav className="hidden items-center gap-4 text-sm font-medium text-ink-soft md:flex">
              <Link
                href={`/${locale}/practice/2025`}
                className="min-h-10 inline-flex items-center hover:text-ink"
              >
                {dict.navPractice}
              </Link>
              <Link
                href={`/${locale}/english`}
                className="min-h-10 inline-flex items-center hover:text-ink"
              >
                {dict.navEnglish}
              </Link>
              <Link
                href={`/${locale}/learn`}
                className="min-h-10 inline-flex items-center hover:text-ink"
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

      <footer className="gw-safe-bottom border-t border-line/80">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-ink">
            {dict.brand}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {dict.disclaimer}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-3 text-sm font-medium text-signal">
            <Link
              href={`/${locale}/learn`}
              className="inline-flex min-h-10 items-center"
            >
              {dict.navLearn}
            </Link>
            <Link
              href={`/${locale}/english`}
              className="inline-flex min-h-10 items-center"
            >
              {dict.navEnglish}
            </Link>
            <Link
              href={`/${locale}/practice/2025`}
              className="inline-flex min-h-10 items-center"
            >
              {dict.practice2025}
            </Link>
            <Link
              href={`/${locale}/eligibility`}
              className="inline-flex min-h-10 items-center"
            >
              {dict.startEligibility}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
