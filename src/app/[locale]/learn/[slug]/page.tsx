import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import { LOCALES, isLocale } from "@/lib/locales";
import { LEARN_POSTS, getLearnPost, learnPostCopy } from "@/lib/learn-posts";
import JsonLd from "@/components/JsonLd";
import EditorialCover from "@/components/EditorialCover";
import { RelatedStudyLinksForLearn } from "@/components/RelatedStudyLinks";
import {
  hrefFor,
  learnHeroCtas,
  type StudyLink,
} from "@/lib/internal-links";
import type { Dictionary } from "@/lib/dictionary";
import { buildPageMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import {
  imageForLearnSlug,
  ogPathForLearnSlug,
  absoluteImageUrl,
} from "@/lib/site-images";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    LEARN_POSTS.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = getLearnPost(slug);
  if (!post) return {};
  const copy = learnPostCopy(post, locale);
  const cover = imageForLearnSlug(slug);
  return buildPageMetadata({
    locale: locale as Locale,
    path: `/learn/${slug}`,
    title: copy.title,
    description: copy.description,
    type: "article",
    image: absoluteImageUrl(ogPathForLearnSlug(slug)),
    imageAlt: cover.alt,
  });
}

export default async function LearnPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const post = getLearnPost(slug);
  if (!post) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const copy = learnPostCopy(post, locale);
  const cover = imageForLearnSlug(slug);

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <JsonLd
        data={[
          articleJsonLd({
            locale,
            path: `/learn/${slug}`,
            title: copy.title,
            description: copy.description,
          }),
          breadcrumbJsonLd(locale, [
            { name: dict.navLearn, path: "/learn" },
            { name: copy.title, path: `/learn/${slug}` },
          ]),
        ]}
      />
      <p>
        <Link
          href={`/${locale}/learn`}
          className="text-sm font-semibold text-signal underline-offset-2 hover:underline"
        >
          ← {dict.learnPostBack}
        </Link>
      </p>
      <header className="space-y-5">
        <EditorialCover image={cover} priority />
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
            {copy.description}
          </p>
        </div>
      </header>
      <div className="space-y-8">
        {copy.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink">
              {s.heading}
            </h2>
            <p className="mt-2 text-base leading-relaxed text-ink-soft">
              {s.body}
            </p>
          </section>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 border-t border-line pt-6">
        {learnHeroCtas(slug).map((link, i) => (
          <LearnCtaLink
            key={link.path}
            link={link}
            locale={locale}
            dict={dict}
            primary={i === 0}
          />
        ))}
      </div>
      <p className="text-xs leading-relaxed text-muted">{dict.disclaimer}</p>
      <RelatedStudyLinksForLearn slug={slug} locale={locale} dict={dict} />
    </article>
  );
}

function LearnCtaLink({
  link,
  locale,
  dict,
  primary,
}: {
  link: StudyLink;
  locale: Locale;
  dict: Dictionary;
  primary: boolean;
}) {
  const label =
    link.labelKey === "custom"
      ? (link.customLabel ?? link.path)
      : (dict[link.labelKey as keyof Dictionary] as string) ?? link.path;
  return (
    <Link
      href={hrefFor(locale, link.path)}
      className={primary ? "gw-btn gw-btn-primary" : "gw-btn gw-btn-ghost"}
    >
      {label}
      {primary ? <span aria-hidden>→</span> : null}
    </Link>
  );
}
