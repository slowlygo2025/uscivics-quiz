/**
 * Submit sitemap + notify Google Indexing API for Tier 1 URLs.
 *
 * Prerequisites:
 * - secrets/gsc-service-account.json (gitignored)
 * - Service account email added as Owner in Search Console
 * - Indexing API + Search Console API enabled
 *
 * Usage: node scripts/gsc-index-tier1.mjs
 */
import { readFileSync } from "node:fs";
import { GoogleAuth } from "google-auth-library";
import { LOCALES } from "../src/lib/locales.ts";
import { buildIndexingChecklist } from "../src/lib/indexing-priority.ts";

const KEY_PATH = new URL("../secrets/gsc-service-account.json", import.meta.url);
const SITE = "sc-domain:uscivics-quiz.com";
const SITEMAP = "https://uscivics-quiz.com/sitemap.xml";

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

  // 1) Submit sitemap via Search Console API
  const sitemapPath = encodeURIComponent(SITEMAP);
  const siteEnc = encodeURIComponent(SITE);
  const smUrl = `https://www.googleapis.com/webmasters/v3/sites/${siteEnc}/sitemaps/${sitemapPath}`;
  console.log("\nSubmitting sitemap…");
  try {
    const smRes = await client.request({ url: smUrl, method: "PUT" });
    console.log(`Sitemap OK (${smRes.status})`);
  } catch (e) {
    console.error("Sitemap submit failed:", e?.response?.data || e.message);
  }

  // 2) Indexing API — Tier 1 all locales
  const tier1 = buildIndexingChecklist([...LOCALES]).filter((r) => r.tier === 1);
  console.log(
    `\nPublishing ${tier1.length} Tier 1 URL_UPDATED notifications (${LOCALES.length} locales)…`
  );

  let ok = 0;
  let fail = 0;
  for (const row of tier1) {
    try {
      await client.request({
        url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
        method: "POST",
        data: { url: row.url, type: "URL_UPDATED" },
      });
      ok++;
      console.log(`OK  ${row.url}`);
    } catch (e) {
      fail++;
      const err = e?.response?.data?.error || e?.response?.data || e.message;
      console.error(`FAIL ${row.url}`);
      console.error("    ", typeof err === "string" ? err : JSON.stringify(err));
    }
    await new Promise((r) => setTimeout(r, 150));
  }

  console.log(`\nDone. ok=${ok} fail=${fail}`);
  if (fail) {
    console.log(
      "\nIf Permission denied: add",
      key.client_email,
      "as Owner in Search Console, and enable Indexing API + Search Console API."
    );
    if (String(JSON.stringify(fail)).includes("Quota") || fail > 0) {
      console.log("Note: default Indexing API quota is often ~200 URL_UPDATED/day.");
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
