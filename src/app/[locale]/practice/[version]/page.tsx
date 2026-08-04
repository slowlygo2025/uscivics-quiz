import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale, TestVersion } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import StudyHub from "@/components/StudyHub";
import { RelatedStudyLinksForPath } from "@/components/RelatedStudyLinks";
import { buildPageMetadata } from "@/lib/seo";
import { isLocale } from "@/lib/locales";

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
  const title = `${version === "2025" ? dict.practice2025 : dict.practice2008} — ${dict.practiceMetaTitleSuffix}`;
  const description = dict.practiceHubLead;
  return buildPageMetadata({
    locale: locale as Locale,
    path: `/practice/${version}`,
    title,
    description,
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
