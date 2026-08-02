import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import { LOCALES, isLocale } from "@/lib/locales";
import EnglishPractice from "@/components/EnglishPractice";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/english/reading",
    title: dict.seoReadingTitle,
    description: dict.seoReadingLead,
  });
}

export default async function EnglishReadingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw as Locale);
  return (
    <div className="space-y-4">
      <header className="mx-auto max-w-3xl">
        <h1 className="sr-only">{dict.seoReadingTitle}</h1>
        <p className="text-sm leading-relaxed text-muted">{dict.seoReadingLead}</p>
      </header>
      <EnglishPractice dict={dict} locale={raw} initialTab="reading" />
    </div>
  );
}
