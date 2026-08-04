import type { Metadata } from "next";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import EligibilityFlow from "@/components/EligibilityFlow";
import { RelatedStudyLinksForPath } from "@/components/RelatedStudyLinks";
import { buildPageMetadata, faqJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { isLocale } from "@/lib/locales";
import { absoluteImageUrl, ogForMoneyPath } from "@/lib/site-images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  const og = ogForMoneyPath("/eligibility");
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/eligibility",
    title: dict.eligibilityMetaTitle,
    description: dict.eligibilityLead,
    image: absoluteImageUrl(og.src),
    imageAlt: og.alt,
    absoluteTitle: true,
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
      <JsonLd
        data={faqJsonLd([
          { question: dict.faqQ1, answer: dict.faqA1 },
          { question: dict.faqQ2, answer: dict.faqA2 },
          { question: dict.faqQ3, answer: dict.faqA3 },
          { question: dict.faqQ4, answer: dict.faqA4 },
        ])}
      />
      <EligibilityFlow locale={locale} />
      <RelatedStudyLinksForPath
        path="/eligibility"
        locale={locale}
        dict={dict}
      />
    </div>
  );
}
