import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import { LOCALES, isLocale } from "@/lib/locales";
import { SEO_TOPICS, getTopicBySlug, topicCopy } from "@/lib/seo-topics";
import { buildPageMetadata } from "@/lib/seo";
import { QuestionsPageShell } from "@/components/QuestionsPageShell";
import { absoluteImageUrl, ogForQuestionsLanding } from "@/lib/site-images";

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
  const copy = topicCopy(topic, locale);
  const og = ogForQuestionsLanding({ kind: "topic" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: `/questions/topic/${slug}`,
    title: copy.title,
    description: copy.description,
    image: absoluteImageUrl(og.src),
    imageAlt: og.alt,
  });
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
  const copy = topicCopy(topic, locale);
  return (
    <QuestionsPageShell
      dict={dict}
      locale={locale}
      title={copy.title}
      lead={copy.description}
      version={topic.version}
      categoryEn={topic.categoryEn}
      practiceHref={`/${locale}/practice/${topic.version}`}
      path={`/questions/topic/${slug}`}
    />
  );
}
