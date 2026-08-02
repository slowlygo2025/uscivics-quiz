import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import { LOCALES, isLocale } from "@/lib/locales";
import { buildPageMetadata } from "@/lib/seo";
import { QuestionsPageShell } from "@/components/QuestionsPageShell";

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
    path: "/questions/all-128",
    title: dict.seoAll128Title,
    description: dict.seoAll128Lead,
  });
}

export default async function All128Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  return (
    <QuestionsPageShell
      dict={dict}
      locale={locale}
      title={dict.seoAll128Title}
      lead={dict.seoAll128Lead}
      version="2025"
      practiceHref={`/${locale}/practice/2025`}
      path="/questions/all-128"
    />
  );
}
