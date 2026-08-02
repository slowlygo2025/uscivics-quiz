import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import { LOCALES, isLocale } from "@/lib/locales";
import { SEO_TOPICS, getTopicBySlug } from "@/lib/seo-topics";
import { QuestionsPageShell } from "@/components/QuestionsPageShell";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SEO_TOPICS.map((t) => ({ locale, slug: t.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const topic = getTopicBySlug(slug);
  if (!topic) return {};
  return { title: topic.title, description: topic.description };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  return (
    <QuestionsPageShell
      dict={dict}
      locale={locale}
      title={topic.title}
      lead={topic.description}
      version={topic.version}
      categoryEn={topic.categoryEn}
      practiceHref={`/${locale}/practice/${topic.version}`}
    />
  );
}
