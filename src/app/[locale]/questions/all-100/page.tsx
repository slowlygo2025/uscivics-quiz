import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import { LOCALES, isLocale } from "@/lib/locales";
import { buildPageMetadata } from "@/lib/seo";
import { QuestionsPageShell } from "@/components/QuestionsPageShell";
import { absoluteImageUrl, ogForMoneyPath } from "@/lib/site-images";

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
  const og = ogForMoneyPath("/questions/all-100");
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/questions/all-100",
    title: dict.seoAll100Title,
    description: dict.seoAll100Lead,
    image: absoluteImageUrl(og.src),
    imageAlt: og.alt,
    absoluteTitle: true,
  });
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
      path="/questions/all-100"
    />
  );
}
