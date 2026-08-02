import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";

const LOCALES: Locale[] = ["en", "es"];

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
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) notFound();
  const dict = getDictionary(locale as Locale);
  const otherLocale = locale === "en" ? "es" : "en";

  return (
    <>
      <header className="border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
          <Link href={`/${locale}`} className="font-semibold">
            {dict.siteName}
          </Link>
          <Link
            href={`/${otherLocale}`}
            className="text-sm underline underline-offset-4"
          >
            {otherLocale === "en" ? "English" : "Español"}
          </Link>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-8">{children}</main>
      <footer className="border-t border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-3xl px-4 py-6 text-xs opacity-60">
          Not affiliated with or endorsed by USCIS or the U.S. government. Practice
          questions are for study purposes only.
        </div>
      </footer>
    </>
  );
}
