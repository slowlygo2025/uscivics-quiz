/**
 * Fast i18n/integrity checks for CI (no browser).
 * Usage: node scripts/check-i18n.mjs
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const cwd = process.cwd();

function keysFromDictFile(filePath) {
  const src = readFileSync(filePath, "utf8");
  const keys = new Set();
  for (const m of src.matchAll(/^\s+([a-zA-Z0-9_]+):/gm)) {
    keys.add(m[1]);
  }
  return keys;
}

const LOCALES = ["en", "es", "zh", "vi", "tl", "ar", "ko", "hi", "ru", "ht", "fr"];
let failed = 0;

const enKeys = keysFromDictFile(join(cwd, "src/lib/dict/en.ts"));
console.log(`EN dict keys: ${enKeys.size}`);

for (const locale of LOCALES) {
  const keys = keysFromDictFile(join(cwd, `src/lib/dict/${locale}.ts`));
  const missing = [...enKeys].filter((k) => !keys.has(k));
  const extra = [...keys].filter((k) => !enKeys.has(k));
  if (missing.length || extra.length) {
    failed++;
    console.error(
      `FAIL dict ${locale}: missing=${missing.length} extra=${extra.length}`
    );
    if (missing.length) console.error("  missing:", missing.slice(0, 12).join(", "));
  } else {
    console.log(`OK   dict ${locale}: ${keys.size}/${enKeys.size}`);
  }
}

const sitePages = readFileSync(join(cwd, "src/lib/site-pages.ts"), "utf8");
for (const slug of ["about", "contact", "privacy", "terms"]) {
  if (!sitePages.includes(`slug: "${slug}"`)) {
    failed++;
    console.error(`FAIL site-pages missing slug ${slug}`);
  }
}
for (const locale of LOCALES) {
  // each locale appears as a key in title/description/sections records
  const re = new RegExp(`\\b${locale}:\\s*["'\`]|\\b${locale}:\\s*\\[`, "m");
  if (!re.test(sitePages)) {
    failed++;
    console.error(`FAIL site-pages weak coverage for locale ${locale}`);
  }
}
console.log("OK   site-pages structure scan");

const topics = readFileSync(join(cwd, "src/lib/seo-topics.ts"), "utf8");
const drills = readFileSync(join(cwd, "src/lib/seo-drills.ts"), "utf8");
if (!topics.includes("Record<Locale, string>") || !topics.includes("topicCopy")) {
  failed++;
  console.error("FAIL seo-topics missing localized Record/topicCopy");
} else {
  console.log("OK   seo-topics localized");
}
if (!drills.includes("Record<Locale, string>") || !drills.includes("drillCopy")) {
  failed++;
  console.error("FAIL seo-drills missing localized Record/drillCopy");
} else {
  console.log("OK   seo-drills localized");
}

const learnDir = join(cwd, "src/lib/learn-i18n");
const learnFiles = readdirSync(learnDir).filter((f) => f.endsWith(".json"));
if (learnFiles.length < 11) {
  failed++;
  console.error(`FAIL learn-i18n json count ${learnFiles.length} < 11`);
} else {
  console.log(`OK   learn-i18n files: ${learnFiles.length}`);
}

if (failed) {
  console.error(`\ncheck-i18n failed (${failed})`);
  process.exit(1);
}
console.log("\ncheck-i18n passed");
