import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale, TestVersion } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import StudyHub from "@/components/StudyHub";
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
  const title = version === "2025" ? dict.practice2025 : dict.practice2008;
  const description =
    version === "2025" ? dict.practice2025Meta : dict.practice2008Meta;
  return buildPageMetadata({
    locale: locale as Locale,
    path: `/practice/${version}`,
    title,
    description: `${title} — ${description}`,
  });
}

export default async function PracticePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; version: string }>;
  searchParams: Promise<{ senior?: string }>;
}) {
  const { locale, version } = await params;
  const { senior } = await searchParams;
  if (!VERSIONS.includes(version as TestVersion)) notFound();

  return (
    <StudyHub
      locale={locale as Locale}
      version={version as TestVersion}
      senior={senior === "1"}
    />
  );
}
