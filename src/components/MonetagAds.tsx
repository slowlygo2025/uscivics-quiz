"use client";

import Script from "next/script";

/** Monetag Multitag zone from publisher dashboard (pairs with /sw.js). */
const MONETAG_ZONE_ID = "11486881";
const MONETAG_TAG_SRC = "https://5gvci.com/act/files/tag.min.js";

/**
 * Loads Monetag Multitag (popunder, push, in-page push, vignette).
 * Requires public/sw.js at the site root for HTTPS push formats.
 */
export default function MonetagAds() {
  return (
    <Script
      id="monetag-multitag"
      src={MONETAG_TAG_SRC}
      strategy="afterInteractive"
      data-zone={MONETAG_ZONE_ID}
      data-cfasync="false"
    />
  );
}
