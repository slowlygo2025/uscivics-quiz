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
import { buildPageMetadata, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import EditorialCover from "@/components/EditorialCover";
import { SITE_IMAGES, absoluteImageUrl } from "@/lib/site-images";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SITE_PAGES.map((p) => ({ locale, slug: p.slug }))
  );
}

function pageTypeForSlug(
  slug: string
): "WebPage" | "AboutPage" | "ContactPage" {
  if (slug === "about") return "AboutPage";
  if (slug === "contact") return "ContactPage";
  return "WebPage";
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
  const isAbout = slug === "about";
  return buildPageMetadata({
    locale: locale as Locale,
    path: `/${slug}`,
    title: copy.title,
    description: copy.description,
    type: "website",
    ...(isAbout
      ? {
          image: absoluteImageUrl(SITE_IMAGES.about.src),
          imageAlt: SITE_IMAGES.about.alt,
        }
      : {}),
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
          webPageJsonLd({
            locale,
            path: `/${slug}`,
            title: copy.title,
            description: copy.description,
            pageType: pageTypeForSlug(slug),
          }),
          breadcrumbJsonLd(locale, [
            { name: dict.navHome, path: "" },
            { name: copy.title, path: `/${slug}` },
          ]),
        ]}
      />
      <header className="space-y-5">
        {page.slug === "about" ? (
          <EditorialCover image={SITE_IMAGES.about} priority />
        ) : null}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-signal">
            {dict.legalBadge}
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
            {copy.description}
          </p>
        </div>
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
