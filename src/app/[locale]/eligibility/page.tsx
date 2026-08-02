import type { Metadata } from "next";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import EligibilityFlow from "@/components/EligibilityFlow";
import { buildPageMetadata } from "@/lib/seo";
import { isLocale } from "@/lib/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/eligibility",
    title: dict.eligibilityTitle,
    description: dict.eligibilityLead,
  });
}

export default async function EligibilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <EligibilityFlow locale={locale as Locale} />;
}
