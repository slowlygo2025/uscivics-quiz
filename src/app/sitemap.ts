import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/locales";
import { SEO_TOPICS, SEO_STATE_CODES } from "@/lib/seo-topics";
import { SEO_DRILLS } from "@/lib/seo-drills";
import { LEARN_POSTS } from "@/lib/learn-posts";

const BASE = "https://uscivics-quiz.com";

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
      entries.push({
        url: `${BASE}/${locale}${path}`,
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.7,
      });
    }
    for (const t of SEO_TOPICS) {
      entries.push({
        url: `${BASE}/${locale}/questions/topic/${t.slug}`,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
    for (const d of SEO_DRILLS) {
      entries.push({
        url: `${BASE}/${locale}/questions/drill/${d.slug}`,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    }
    for (const code of SEO_STATE_CODES) {
      entries.push({
        url: `${BASE}/${locale}/questions/state/${code.toLowerCase()}`,
        changeFrequency: "monthly",
        priority: 0.75,
      });
    }
    for (const p of LEARN_POSTS) {
      entries.push({
        url: `${BASE}/${locale}/learn/${p.slug}`,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
