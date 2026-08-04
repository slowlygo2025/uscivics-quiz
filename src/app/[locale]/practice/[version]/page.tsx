import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale, TestVersion } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import StudyHub from "@/components/StudyHub";
import { RelatedStudyLinksForPath } from "@/components/RelatedStudyLinks";
import { buildPageMetadata } from "@/lib/seo";
import { isLocale } from "@/lib/locales";
import { absoluteImageUrl, ogForMoneyPath } from "@/lib/site-images";

const VERSIONS: TestVersion[] = ["2008", "2025"];

export function generateStaticParams() {
  return VERSIONS.map((version) => ({ version }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; version: string }>;
}): Promise<Metadata> {
  const { locale, version } = await params;
  if (!isLocale(locale) || !VERSIONS.includes(version as TestVersion)) return {};
  const dict = getDictionary(locale as Locale);
  const path = `/practice/${version}`;
  const og = ogForMoneyPath(path);
  const title =
    version === "2025" ? dict.practiceSeoTitle2025 : dict.practiceSeoTitle2008;
  return buildPageMetadata({
    locale: locale as Locale,
    path,
    title,
    description: dict.practiceHubLead,
    image: absoluteImageUrl(og.src),
    imageAlt: og.alt,
    absoluteTitle: true,
  });
}

export default async function PracticePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; version: string }>;
  searchParams: Promise<{ senior?: string }>;
}) {
  const { locale: raw, version } = await params;
  const { senior } = await searchParams;
  if (!isLocale(raw) || !VERSIONS.includes(version as TestVersion)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  return (
    <div className="space-y-8">
      <StudyHub
        locale={locale}
        version={version as TestVersion}
        senior={senior === "1"}
      />
      <RelatedStudyLinksForPath
        path={`/practice/${version}`}
        locale={locale}
        dict={dict}
      />
    </div>
  );
}
