import type { Metadata } from "next";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import UpdatesHub from "@/components/UpdatesHub";
import { RelatedStudyLinksForPath } from "@/components/RelatedStudyLinks";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { isLocale } from "@/lib/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/updates",
    title: dict.updatesHubTitle,
    description: dict.updatesHubLead,
  });
}

export default async function UpdatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.navHome, path: "" },
          { name: dict.navUpdates, path: "/updates" },
        ])}
      />
      <UpdatesHub locale={locale} dict={dict} />
      <RelatedStudyLinksForPath path="/updates" locale={locale} dict={dict} />
    </div>
  );
}
