import Link from "next/link";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/types";
import BrandLogo from "@/components/BrandLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";

export default function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const fullLinks = [
    { href: `/${locale}/eligibility`, label: dict.navCitizenship },
    { href: `/${locale}/practice/2025`, label: dict.navTest2025 },
    { href: `/${locale}/practice/2008`, label: dict.navTest2008 },
    { href: `/${locale}/questions/senior`, label: dict.navSenior },
    { href: `/${locale}/questions`, label: dict.navQuestions },
    { href: `/${locale}/english/reading`, label: dict.navReadingTest },
    { href: `/${locale}/english/writing`, label: dict.navWritingTest },
    { href: `/${locale}/learn`, label: dict.navLearn },
  ];

  const midHrefs = new Set([
    `/${locale}/practice/2025`,
    `/${locale}/practice/2008`,
    `/${locale}/questions/senior`,
    `/${locale}/questions`,
    `/${locale}/learn`,
  ]);

  return (
    <header className="gw-header gw-safe-top sticky top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href={`/${locale}`}
          className="min-w-0 shrink opacity-100 transition-opacity hover:opacity-90"
        >
          <BrandLogo
            title={dict.brand}
            subtitle={dict.logoSubtitle}
            variant="onLight"
            size="sm"
          />
        </Link>

        <div className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2">
          <nav
            aria-label={dict.navHome}
            className="hidden items-center gap-2.5 2xl:flex 2xl:gap-3.5"
          >
            {fullLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex min-h-10 items-center whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <nav
            aria-label={dict.navHome}
            className="hidden items-center gap-2.5 lg:flex 2xl:hidden"
          >
            {fullLinks
              .filter((l) => midHrefs.has(l.href))
              .map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex min-h-10 items-center whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
          </nav>

          <div className="hidden h-5 w-px bg-line lg:block" aria-hidden />

          <LanguageSwitcher locale={locale} variant="header" />
          <ThemeToggle
            labelLight={dict.themeToLight}
            labelDark={dict.themeToDark}
            variant="header"
          />
          <MobileNav locale={locale} dict={dict} />
        </div>
      </div>
    </header>
  );
}
