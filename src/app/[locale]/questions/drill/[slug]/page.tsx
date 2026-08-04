import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import { LOCALES, isLocale } from "@/lib/locales";
import { SEO_DRILLS, getDrillBySlug, drillCopy } from "@/lib/seo-drills";
import { buildPageMetadata } from "@/lib/seo";
import { QuestionsPageShell } from "@/components/QuestionsPageShell";
import { absoluteImageUrl, ogForQuestionsLanding } from "@/lib/site-images";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SEO_DRILLS.map((d) => ({ locale, slug: d.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const drill = getDrillBySlug(slug);
  if (!drill) return {};
  const copy = drillCopy(drill, locale);
  const og = ogForQuestionsLanding({ kind: "drill" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: `/questions/drill/${slug}`,
    title: copy.title,
    description: copy.description,
    image: absoluteImageUrl(og.src),
    imageAlt: og.alt,
  });
}

export default async function DrillPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const drill = getDrillBySlug(slug);
  if (!drill) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const copy = drillCopy(drill, locale);

  return (
    <QuestionsPageShell
      dict={dict}
      locale={locale}
      title={copy.title}
      lead={copy.lead}
      version={drill.version}
      questionIds={drill.ids}
      practiceHref={`/${locale}/practice/${drill.version}`}
      path={`/questions/drill/${slug}`}
    />
  );
}
