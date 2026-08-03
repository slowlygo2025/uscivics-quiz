import { writeFileSync } from "node:fs";
import { loadIndexProgress, isPublished } from "./gsc-lib.mjs";
import { INDEX_PRIORITY, absoluteIndexUrl } from "../src/lib/indexing-priority.ts";
import { LOCALES } from "../src/lib/locales.ts";

const progress = loadIndexProgress();
const pending = [];
for (const item of INDEX_PRIORITY.filter((i) => i.tier === 2)) {
  for (const locale of LOCALES) {
    const url = absoluteIndexUrl(locale, item.path);
    if (!isPublished(progress, url)) {
      pending.push({ url, locale, path: item.path, why: item.why });
    }
  }
}
const out = {
  publishedCount: Object.keys(progress.published || {}).length,
  pendingTotal: pending.length,
  en: pending.filter((p) => p.locale === "en"),
  es: pending.filter((p) => p.locale === "es"),
  byLocale: Object.fromEntries(
    LOCALES.map((l) => [l, pending.filter((p) => p.locale === l).length])
  ),
};
writeFileSync(new URL("../tier2-pending.json", import.meta.url), JSON.stringify(out, null, 2));
console.log(`pending=${out.pendingTotal} en=${out.en.length} es=${out.es.length}`);
for (const p of out.en) console.log(p.url);
