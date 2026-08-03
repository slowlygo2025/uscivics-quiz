import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import { isLocale } from "@/lib/locales";
import EnglishPractice from "@/components/EnglishPractice";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_IMAGES, absoluteImageUrl } from "@/lib/site-images";

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
    path: "/english",
    title: dict.englishTitle,
    description: dict.englishLead,
    image: absoluteImageUrl(SITE_IMAGES.english.src),
    imageAlt: SITE_IMAGES.english.alt,
  });
}

export default async function EnglishPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw as Locale);
  return <EnglishPractice dict={dict} locale={raw} />;
}
