"use client";

import { useLayoutEffect } from "react";

/** Keep <html lang/dir> in sync with the active locale (axe + SR). */
export default function DocumentLocale({
  locale,
  rtl,
}: {
  locale: string;
  rtl: boolean;
}) {
  useLayoutEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [locale, rtl]);

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang=${JSON.stringify(locale)};document.documentElement.dir=${JSON.stringify(rtl ? "rtl" : "ltr")};`,
      }}
    />
  );
}
