import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import { LOCALES, isLocale } from "@/lib/locales";
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
  return { title: dict.seoAll100Title, description: dict.seoAll100Lead };
}

export default async function All100Page({
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
      title={dict.seoAll100Title}
      lead={dict.seoAll100Lead}
      version="2008"
      practiceHref={`/${locale}/practice/2008`}
    />
  );
}
