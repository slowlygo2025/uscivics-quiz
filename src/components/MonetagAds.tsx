"use client";

import Script from "next/script";

/**
 * Loads Monetag Multitag (popunder, push, in-page push, vignette).
 * Requires public/sw.js at the site root for HTTPS push formats.
 */
export default function MonetagAds() {
  return (
    <Script
      id="monetag-multitag"
      src="https://quge5.com/88/tag.min.js"
      strategy="afterInteractive"
      data-zone="266272"
      data-cfasync="false"
      async
    />
  );
}
