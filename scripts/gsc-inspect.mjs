/**
 * Sample URL Inspection for Tier 1–2 money pages (EN).
 * Uses Search Console URL Inspection API — separate from Indexing publish quota.
 *
 * Usage:
 *   npm run gsc:inspect
 *   npm run gsc:inspect -- --tier=1 --limit=15
 */
import { writeFileSync } from "node:fs";
import {
  getGscClient,
  SITE,
  SITE_ORIGIN,
  errorMessage,
} from "./gsc-lib.mjs";
import {
  INDEX_PRIORITY,
  absoluteIndexUrl,
} from "../src/lib/indexing-priority.ts";

const tierArg = process.argv.find((a) => a.startsWith("--tier="));
const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const TIER = tierArg ? Number(tierArg.split("=")[1]) : 1;
const LIMIT = limitArg ? Number(limitArg.split("=")[1]) : 12;

async function main() {
  const { client, email } = await getGscClient([
    "https://www.googleapis.com/auth/webmasters",
    "https://www.googleapis.com/auth/webmasters.readonly",
  ]);
  console.log(`Using ${email}`);

  const paths = INDEX_PRIORITY.filter((i) => i.tier === TIER).slice(0, LIMIT);
  const results = [];

  console.log(
    `\nInspecting ${paths.length} Tier ${TIER} EN URLs (URL Inspection API)…`
  );

  for (const item of paths) {
    const url = absoluteIndexUrl("en", item.path);
    try {
      const res = await client.request({
        url: "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
        method: "POST",
        data: {
          inspectionUrl: url,
          siteUrl: SITE,
          languageCode: "en-US",
        },
      });
      const idx = res.data?.inspectionResult?.indexStatusResult || {};
      const row = {
        url,
        why: item.why,
        verdict: idx.verdict,
        coverageState: idx.coverageState,
        robotsTxtState: idx.robotsTxtState,
        indexingState: idx.indexingState,
        lastCrawlTime: idx.lastCrawlTime,
        pageFetchState: idx.pageFetchState,
        crawledAs: idx.crawledAs,
      };
      results.push(row);
      console.log(
        `${idx.coverageState || idx.verdict || "?"}  ${url}` +
          (idx.lastCrawlTime ? ` · crawled ${idx.lastCrawlTime}` : "")
      );
    } catch (e) {
      const msg = errorMessage(e);
      results.push({ url, why: item.why, error: msg });
      console.error(`FAIL ${url}`);
      console.error("    ", msg);
      if (/quota|rate.?limit/i.test(msg)) {
        console.error("\nInspection quota hit — stopping.");
        break;
      }
    }
    await new Promise((r) => setTimeout(r, 400));
  }

  const out = {
    generatedAt: new Date().toISOString(),
    site: SITE_ORIGIN,
    tier: TIER,
    results,
  };
  const outPath = new URL("../gsc-inspect.json", import.meta.url);
  writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n");
  console.log(`\nWrote ${outPath.pathname}`);
  const indexed = results.filter((r) => {
    const c = r.coverageState || "";
    return /^Indexed/i.test(c) || r.verdict === "PASS";
  }).length;
  const discovered = results.filter((r) =>
    /Discovered/i.test(r.coverageState || "")
  ).length;
  console.log(
    `Coverage: indexed=${indexed} discovered-not-indexed=${discovered} other=${results.length - indexed - discovered}`
  );
}

main().catch((e) => {
  console.error(e?.response?.data || e);
  process.exit(1);
});
