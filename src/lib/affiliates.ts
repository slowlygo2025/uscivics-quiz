/**
 * Soft Phase 1 affiliate prep links.
 * Disclosure required. Never claim USCIS affiliation.
 * Set NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG to enable tagged Amazon URLs.
 */

export type AffiliateItem = {
  id: string;
  /** Dict key for visible title */
  titleKey: string;
  /** Dict key for one-line blurb */
  blurbKey: string;
  /** Amazon search keywords (tag appended when env set) */
  amazonQuery: string;
};

export const AFFILIATE_DISCLOSURE_KEY = "affiliateDisclosure" as const;

export const AFFILIATE_ITEMS: AffiliateItem[] = [
  {
    id: "civics_flashcards",
    titleKey: "affiliateItemFlashcards",
    blurbKey: "affiliateItemFlashcardsBlurb",
    amazonQuery: "US citizenship civics test flash cards",
  },
  {
    id: "naturalization_guide",
    titleKey: "affiliateItemGuide",
    blurbKey: "affiliateItemGuideBlurb",
    amazonQuery: "US citizenship naturalization study guide",
  },
  {
    id: "english_practice",
    titleKey: "affiliateItemEnglish",
    blurbKey: "affiliateItemEnglishBlurb",
    amazonQuery: "English for US citizenship test practice",
  },
];

export function affiliateAmazonUrl(query: string): string {
  const tag =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG?.trim()
      : undefined;
  const base = `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;
  return tag ? `${base}&tag=${encodeURIComponent(tag)}` : base;
}
