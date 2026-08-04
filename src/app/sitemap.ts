import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/locales";
import { SEO_TOPICS, SEO_STATE_CODES } from "@/lib/seo-topics";
import { SEO_DRILLS } from "@/lib/seo-drills";
import { LEARN_POSTS } from "@/lib/learn-posts";
import { SITE_ORIGIN, sitemapMetaForPath } from "@/lib/indexing-priority";
import { lastModifiedForPath } from "@/lib/content-dates";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/eligibility",
    "/practice/2008",
    "/practice/2025",
    "/english",
    "/english/reading",
    "/english/writing",
    "/learn",
    "/updates",
    "/questions",
    "/questions/all-128",
    "/questions/all-100",
    "/questions/senior",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const entries: MetadataRoute.Sitemap = [];

  function push(path: string) {
    const meta = sitemapMetaForPath(path);
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_ORIGIN}/${locale}${path}`,
        lastModified: lastModifiedForPath(path),
        changeFrequency: meta.changeFrequency,
        priority: meta.priority,
      });
    }
  }

  for (const path of staticPaths) push(path);
  for (const t of SEO_TOPICS) push(`/questions/topic/${t.slug}`);
  for (const d of SEO_DRILLS) push(`/questions/drill/${d.slug}`);
  for (const code of SEO_STATE_CODES) {
    push(`/questions/state/${code.toLowerCase()}`);
  }
  for (const p of LEARN_POSTS) push(`/learn/${p.slug}`);

  return entries;
}
