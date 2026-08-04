import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/locales";
import { SEO_TOPICS, SEO_STATE_CODES } from "@/lib/seo-topics";
import { SEO_DRILLS } from "@/lib/seo-drills";
import { LEARN_POSTS } from "@/lib/learn-posts";
import { SITE_ORIGIN, sitemapMetaForPath } from "@/lib/indexing-priority";

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

  for (const locale of LOCALES) {
    for (const path of staticPaths) {
      const meta = sitemapMetaForPath(path);
      entries.push({
        url: `${SITE_ORIGIN}/${locale}${path}`,
        changeFrequency: meta.changeFrequency,
        priority: meta.priority,
      });
    }
    for (const t of SEO_TOPICS) {
      const path = `/questions/topic/${t.slug}`;
      const meta = sitemapMetaForPath(path);
      entries.push({
        url: `${SITE_ORIGIN}/${locale}${path}`,
        changeFrequency: meta.changeFrequency,
        priority: meta.priority,
      });
    }
    for (const d of SEO_DRILLS) {
      const path = `/questions/drill/${d.slug}`;
      const meta = sitemapMetaForPath(path);
      entries.push({
        url: `${SITE_ORIGIN}/${locale}${path}`,
        changeFrequency: meta.changeFrequency,
        priority: meta.priority,
      });
    }
    for (const code of SEO_STATE_CODES) {
      const path = `/questions/state/${code.toLowerCase()}`;
      const meta = sitemapMetaForPath(path);
      entries.push({
        url: `${SITE_ORIGIN}/${locale}${path}`,
        changeFrequency: meta.changeFrequency,
        priority: meta.priority,
      });
    }
    for (const p of LEARN_POSTS) {
      const path = `/learn/${p.slug}`;
      const meta = sitemapMetaForPath(path);
      entries.push({
        url: `${SITE_ORIGIN}/${locale}${path}`,
        changeFrequency: meta.changeFrequency,
        priority: meta.priority,
      });
    }
  }

  return entries;
}
