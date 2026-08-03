/**
 * Thin wrapper: query-focused CTR insights (also covered by gsc:report).
 *
 * Usage:
 *   npm run gsc:insights
 *   npm run gsc:insights -- --days=28 --minImpressions=30 --maxCtr=0.05
 */
import { writeFileSync } from "node:fs";
import {
  getGscClient,
  searchAnalytics,
  analyticsWindow,
  INSIGHTS_PATH,
} from "./gsc-lib.mjs";

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
    titleHint: "Texas Civics Test Answers: Capital, Governor, Senators (USCIS)",
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

const daysArg = process.argv.find((a) => a.startsWith("--days="));
const minImpArg = process.argv.find((a) => a.startsWith("--minImpressions="));
const maxCtrArg = process.argv.find((a) => a.startsWith("--maxCtr="));
const DAYS = daysArg ? Number(daysArg.split("=")[1]) : 28;
const MIN_IMP = minImpArg ? Number(minImpArg.split("=")[1]) : 25;
const MAX_CTR = maxCtrArg ? Number(maxCtrArg.split("=")[1]) : 0.05;

async function main() {
  const { client, email } = await getGscClient([
    "https://www.googleapis.com/auth/webmasters.readonly",
    "https://www.googleapis.com/auth/webmasters",
  ]);
  console.log(`Using ${email}`);
  console.log("(Full ops: npm run gsc:report)\n");

  const window = analyticsWindow(DAYS);
  console.log(`Query window ${window.startDate} → ${window.endDate}`);

  const rows = await searchAnalytics(client, {
    ...window,
    dimensions: ["query"],
    rowLimit: 250,
  });
  console.log(`Raw query rows: ${rows.length}`);

  const lowCtr = rows
    .filter((r) => (r.impressions || 0) >= MIN_IMP && (r.ctr || 0) < MAX_CTR)
    .sort((a, b) => (b.impressions || 0) - (a.impressions || 0));

  const report = {
    generatedAt: new Date().toISOString(),
    window,
    filters: { minImpressions: MIN_IMP, maxCtr: MAX_CTR },
    totalQueries: rows.length,
    lowCtrCount: lowCtr.length,
    lowCtr: lowCtr.slice(0, 40).map((r) => {
      const q = r.keys?.[0] || "";
      const hit = INTENT_PLAYBOOK.find((p) => p.queryLike.test(q));
      return {
        query: q,
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position,
        playbook: hit?.path ?? null,
        titleHint: hit?.titleHint ?? null,
      };
    }),
    playbookFallback: INTENT_PLAYBOOK,
  };

  writeFileSync(INSIGHTS_PATH, JSON.stringify(report, null, 2) + "\n");
  console.log(`Wrote ${INSIGHTS_PATH}`);

  if (!rows.length) {
    console.log(
      "\nNo Search Analytics rows yet (site may be too new).\n" +
        "Titles/meta already tuned via intent playbook.\n" +
        "Prefer: npm run gsc:report for full coverage + index progress."
    );
  } else {
    console.log(
      `\nLow-CTR opportunities (imps≥${MIN_IMP}, ctr<${MAX_CTR}): ${lowCtr.length}`
    );
    for (const row of report.lowCtr.slice(0, 15)) {
      console.log(
        `  "${row.query}" imps=${row.impressions} ctr=${(row.ctr * 100).toFixed(2)}%` +
          (row.playbook ? ` → ${row.playbook}` : "")
      );
    }
  }
}

main().catch((e) => {
  console.error(e?.response?.data || e);
  process.exit(1);
});
