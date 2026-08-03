import type { Metadata } from "next";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import EligibilityFlow from "@/components/EligibilityFlow";
import { RelatedStudyLinksForPath } from "@/components/RelatedStudyLinks";
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
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  return (
    <div className="space-y-8">
      <EligibilityFlow locale={locale} />
      <RelatedStudyLinksForPath
        path="/eligibility"
        locale={locale}
        dict={dict}
      />
    </div>
  );
}
