import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import { LOCALES, isLocale } from "@/lib/locales";
import {
  SITE_PAGES,
  getSitePage,
  pageCopy,
  CONTACT_EMAIL_EXPORT,
} from "@/lib/site-pages";
import { buildPageMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SITE_PAGES.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const page = getSitePage(slug);
  if (!page) return {};
  const copy = pageCopy(page, locale as Locale);
  return buildPageMetadata({
    locale: locale as Locale,
    path: `/${slug}`,
    title: copy.title,
    description: copy.description,
    type: "article",
  });
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const page = getSitePage(slug);
  if (!page) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const copy = pageCopy(page, locale);

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <JsonLd
        data={[
          articleJsonLd({
            locale,
            path: `/${slug}`,
            title: copy.title,
            description: copy.description,
          }),
          breadcrumbJsonLd(locale, [
            { name: dict.navHome, path: "" },
            { name: copy.title, path: `/${slug}` },
          ]),
        ]}
      />
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-signal">
          {dict.legalBadge}
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
          {copy.description}
        </p>
      </header>

      <div className="space-y-8">
        {copy.sections.map((s, i) => (
          <section key={s.heading}>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink">
              {s.heading}
            </h2>
            <p className="mt-2 text-base leading-relaxed text-ink-soft whitespace-pre-wrap">
              {s.body}
            </p>
            {page.slug === "contact" && i === 0 ? (
              <p className="mt-3">
                <a
                  href={`mailto:${CONTACT_EMAIL_EXPORT}`}
                  className="font-semibold text-signal underline-offset-2 hover:underline"
                >
                  {CONTACT_EMAIL_EXPORT}
                </a>
              </p>
            ) : null}
          </section>
        ))}
      </div>

      <nav className="flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-6 text-sm font-semibold text-signal">
        <Link href={`/${locale}/about`} className="hover:underline">
          {dict.navAbout}
        </Link>
        <Link href={`/${locale}/contact`} className="hover:underline">
          {dict.navContact}
        </Link>
        <Link href={`/${locale}/privacy`} className="hover:underline">
          {dict.navPrivacy}
        </Link>
        <Link href={`/${locale}/terms`} className="hover:underline">
          {dict.navTerms}
        </Link>
      </nav>
    </article>
  );
}
