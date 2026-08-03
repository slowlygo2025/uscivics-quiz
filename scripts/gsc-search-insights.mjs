/**
 * Pull Search Console query performance and flag low-CTR opportunities.
 *
 * Usage:
 *   node scripts/gsc-search-insights.mjs
 *   node scripts/gsc-search-insights.mjs --days=28 --minImpressions=30 --maxCtr=0.05
 *
 * Auth: secrets/gsc-service-account.json (same SA as indexing; needs Search Analytics access).
 * When the site is new, rows may be empty — script still exits 0 and prints next steps.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { GoogleAuth } from "google-auth-library";

const KEY_PATH = new URL("../secrets/gsc-service-account.json", import.meta.url);
const SITE = "sc-domain:uscivics-quiz.com";

const daysArg = process.argv.find((a) => a.startsWith("--days="));
const minImpArg = process.argv.find((a) => a.startsWith("--minImpressions="));
const maxCtrArg = process.argv.find((a) => a.startsWith("--maxCtr="));
const DAYS = daysArg ? Number(daysArg.split("=")[1]) : 28;
const MIN_IMP = minImpArg ? Number(minImpArg.split("=")[1]) : 25;
const MAX_CTR = maxCtrArg ? Number(maxCtrArg.split("=")[1]) : 0.05;

/** Intent → suggested title/meta improvements when GSC has little data yet. */
const INTENT_PLAYBOOK = [
  {
    queryLike: /65\s*\/?\s*20|starred|senior civics|age 65/i,
    path: "/learn/65-20",
    titleHint:
      "65/20 Civics Test Explained: 20 Starred Questions (Age 65 + 20 Years LPR)",
  },
  {
    queryLike: /n-?400|filing date|2008 vs 2025|which civics test/i,
    path: "/learn/n-400-filing-date",
    titleHint:
      "N-400 Filing Date: Which Civics Test Do You Take — 2008 or 2025?",
  },
  {
    queryLike: /128 questions|all 128|2025 civics/i,
    path: "/questions/all-128",
    titleHint: "All 128 USCIS Civics Questions (2025) — Free Practice",
  },
  {
    queryLike: /100 questions|2008 civics/i,
    path: "/questions/all-100",
    titleHint: "All 100 USCIS Civics Questions (2008) — Free Practice",
  },
  {
    queryLike: /texas|austin governor/i,
    path: "/learn/texas-civics-answers",
    titleHint:
      "Texas Civics Test Answers: Capital, Governor, Senators (USCIS)",
  },
  {
    queryLike: /florida|tallahassee/i,
    path: "/learn/florida-civics-answers",
    titleHint:
      "Florida Civics Test Answers: Capital, Governor, Local Officials",
  },
  {
    queryLike: /new york|albany governor/i,
    path: "/learn/new-york-civics-answers",
    titleHint:
      "New York Civics Test Answers: Capital, Governor, and ZIP Officials",
  },
];

async function main() {
  const key = JSON.parse(readFileSync(KEY_PATH, "utf8"));
  console.log(`Using ${key.client_email}`);

  const auth = new GoogleAuth({
    credentials: key,
    scopes: [
      "https://www.googleapis.com/auth/webmasters.readonly",
      "https://www.googleapis.com/auth/webmasters",
    ],
  });
  const client = await auth.getClient();

  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 3); // GSC lag
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - DAYS);

  const startDate = start.toISOString().slice(0, 10);
  const endDate = end.toISOString().slice(0, 10);
  console.log(`\nQuery window ${startDate} → ${endDate}`);

  const siteEnc = encodeURIComponent(SITE);
  let rows = [];
  try {
    const res = await client.request({
      url: `https://www.googleapis.com/webmasters/v3/sites/${siteEnc}/searchAnalytics/query`,
      method: "POST",
      data: {
        startDate,
        endDate,
        dimensions: ["query"],
        rowLimit: 250,
      },
    });
    rows = res.data.rows || [];
  } catch (e) {
    console.error("Search Analytics query failed:", e?.response?.data || e.message);
    process.exit(1);
  }

  console.log(`Raw query rows: ${rows.length}`);

  const lowCtr = rows
    .filter((r) => (r.impressions || 0) >= MIN_IMP && (r.ctr || 0) < MAX_CTR)
    .sort((a, b) => (b.impressions || 0) - (a.impressions || 0));

  const report = {
    generatedAt: new Date().toISOString(),
    window: { startDate, endDate },
    filters: { minImpressions: MIN_IMP, maxCtr: MAX_CTR },
    totalQueries: rows.length,
    lowCtrCount: lowCtr.length,
    lowCtr: lowCtr.slice(0, 40).map((r) => ({
      query: r.keys?.[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      position: r.position,
      playbook: INTENT_PLAYBOOK.find((p) => p.queryLike.test(r.keys?.[0] || ""))
        ?.path,
      titleHint: INTENT_PLAYBOOK.find((p) =>
        p.queryLike.test(r.keys?.[0] || "")
      )?.titleHint,
    })),
    playbookFallback: INTENT_PLAYBOOK,
  };

  const outPath = new URL("../gsc-search-insights.json", import.meta.url);
  writeFileSync(outPath, JSON.stringify(report, null, 2) + "\n");
  console.log(`Wrote ${outPath.pathname}`);

  if (!rows.length) {
    console.log(
      "\nNo Search Analytics rows yet (site may be too new).\n" +
        "Titles/meta already tuned via intent playbook for 65/20, N-400, states, drills.\n" +
        "Re-run this script weekly once GSC shows impressions."
    );
  } else {
    console.log(`\nLow-CTR opportunities (imps≥${MIN_IMP}, ctr<${MAX_CTR}): ${lowCtr.length}`);
    for (const row of report.lowCtr.slice(0, 15)) {
      console.log(
        `  "${row.query}" imps=${row.impressions} ctr=${(row.ctr * 100).toFixed(2)}% pos=${row.position.toFixed(1)}` +
          (row.playbook ? ` → ${row.playbook}` : "")
      );
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
