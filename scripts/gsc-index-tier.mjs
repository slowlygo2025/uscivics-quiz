/**
 * Notify Google Indexing API for a given checklist tier (all locales).
 *
 * Usage:
 *   npx tsx scripts/gsc-index-tier.mjs 2
 *   npx tsx scripts/gsc-index-tier.mjs 1
 *   npx tsx scripts/gsc-index-tier.mjs 2 --skip=81   # resume after quota
 */
import { readFileSync } from "node:fs";
import { GoogleAuth } from "google-auth-library";
import { LOCALES } from "../src/lib/locales.ts";
import {
  INDEX_PRIORITY,
  absoluteIndexUrl,
} from "../src/lib/indexing-priority.ts";

const KEY_PATH = new URL("../secrets/gsc-service-account.json", import.meta.url);
const SITE = "sc-domain:uscivics-quiz.com";
const SITEMAP = "https://uscivics-quiz.com/sitemap.xml";

const tierArg = Number(process.argv[2] || "2");
const skipArg = process.argv.find((a) => a.startsWith("--skip="));
const skip = skipArg ? Number(skipArg.split("=")[1]) : 0;

if (![1, 2].includes(tierArg) || Number.isNaN(skip) || skip < 0) {
  console.error("Usage: npx tsx scripts/gsc-index-tier.mjs <1|2> [--skip=N]");
  process.exit(1);
}

async function main() {
  const key = JSON.parse(readFileSync(KEY_PATH, "utf8"));
  console.log(`Using ${key.client_email}`);

  const auth = new GoogleAuth({
    credentials: key,
    scopes: [
      "https://www.googleapis.com/auth/indexing",
      "https://www.googleapis.com/auth/webmasters",
    ],
  });
  const client = await auth.getClient();

  const sitemapPath = encodeURIComponent(SITEMAP);
  const siteEnc = encodeURIComponent(SITE);
  console.log("\nSubmitting sitemap…");
  try {
    const smRes = await client.request({
      url: `https://www.googleapis.com/webmasters/v3/sites/${siteEnc}/sitemaps/${sitemapPath}`,
      method: "PUT",
    });
    console.log(`Sitemap OK (${smRes.status})`);
  } catch (e) {
    console.error("Sitemap submit failed:", e?.response?.data || e.message);
  }

  const paths = INDEX_PRIORITY.filter((i) => i.tier === tierArg);
  const urls = [];
  for (const item of paths) {
    for (const locale of LOCALES) {
      urls.push({
        url: absoluteIndexUrl(locale, item.path),
        why: item.why,
        locale,
      });
    }
  }

  const queue = skip > 0 ? urls.slice(skip) : urls;
  console.log(
    `\nPublishing Tier ${tierArg}: ${queue.length} of ${urls.length} URL_UPDATED` +
      ` (${paths.length} paths × ${LOCALES.length} locales` +
      (skip ? `, skip=${skip}` : "") +
      ")…"
  );

  let ok = 0;
  let fail = 0;
  let quotaHit = false;
  let processed = skip;

  for (const row of queue) {
    if (quotaHit) break;
    try {
      await client.request({
        url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
        method: "POST",
        data: { url: row.url, type: "URL_UPDATED" },
      });
      ok++;
      processed++;
      console.log(`OK  ${row.url}`);
    } catch (e) {
      fail++;
      const err = e?.response?.data?.error || e?.response?.data || e.message;
      const msg = typeof err === "string" ? err : JSON.stringify(err);
      console.error(`FAIL ${row.url}`);
      console.error("    ", msg);
      if (
        msg.includes("Quota") ||
        msg.includes("quota") ||
        msg.includes("Rate Limit") ||
        msg.includes("rateLimitExceeded") ||
        msg.includes("dailyLimitExceeded")
      ) {
        quotaHit = true;
        console.error(
          `\nQuota/rate limit hit — stopping at index ${processed}.` +
            `\nResume tomorrow: npx tsx scripts/gsc-index-tier.mjs ${tierArg} --skip=${processed}`
        );
      } else {
        processed++;
      }
    }
    await new Promise((r) => setTimeout(r, 150));
  }

  console.log(
    `\nDone Tier ${tierArg}. ok=${ok} fail=${fail} processed=${processed}/${urls.length}`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
