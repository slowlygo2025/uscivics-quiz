import type { Locale } from "./types";
import { isLocale } from "./locales";
import {
  getLearnLocaleCopy,
  listLearnLocaleCopy,
  type LearnLocalized,
  type LearnSection,
} from "./learn-i18n";
import enBundle from "./learn-i18n/en.json";

export type { LearnLocalized, LearnSection };

export type LearnPost = {
  slug: string;
};

/** Slug index for routing / sitemap (content lives in learn-i18n/*.json). */
export const LEARN_POSTS: LearnPost[] = Object.keys(enBundle).map((slug) => ({
  slug,
}));

export function getLearnPost(slug: string): LearnPost | undefined {
  return LEARN_POSTS.find((p) => p.slug === slug);
}

export function learnPostCopy(
  post: LearnPost,
  locale: string
): LearnLocalized & { slug: string } {
  const loc: Locale = isLocale(locale) ? locale : "en";
  const copy =
    getLearnLocaleCopy(post.slug, loc) ??
    (enBundle as Record<string, LearnLocalized>)[post.slug];
  return { slug: post.slug, ...copy };
}

export function listLearnPosts(locale: string) {
  const loc: Locale = isLocale(locale) ? locale : "en";
  return listLearnLocaleCopy(loc);
}
