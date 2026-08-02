import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale, TestVersion } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import Quiz from "@/components/Quiz";

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
  const dict = getDictionary(locale as Locale);
  return {
    title: version === "2025" ? dict.practice2025 : dict.practice2008,
  };
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
    <Quiz
      locale={locale as Locale}
      version={version as TestVersion}
      senior={senior === "1"}
    />
  );
}
