/**
 * Advanced GSC ops report: sitemap, index progress, queries, pages, countries,
 * devices, low-CTR, and priority coverage gaps.
 *
 * Usage:
 *   npm run gsc:report
 *   npm run gsc:report -- --days=28 --minImpressions=25 --maxCtr=0.05
 *
 * Writes gsc-report.json (gitignored) and prints an executive summary.
 */
import { writeFileSync } from "node:fs";
import {
  getGscClient,
  loadIndexProgress,
  listSitemaps,
  searchAnalytics,
  analyticsWindow,
  REPORT_PATH,
  SITE_ORIGIN,
} from "./gsc-lib.mjs";
import { LOCALES } from "../src/lib/locales.ts";
import {
  INDEX_PRIORITY,
  absoluteIndexUrl,
} from "../src/lib/indexing-priority.ts";

// Playbook kept here so report stays self-contained for title hints
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
  {
    queryLike: /california|sacramento/i,
    path: "/questions/state/ca",
    titleHint:
      "California Civics Test Answers: Capital, Governor & ZIP Officials",
  },
  {
    queryLike: /citizenship interview|naturalization interview/i,
    path: "/learn/interview",
    titleHint: "US Citizenship Interview: What to Expect (Civics + English)",
  },
];

const daysArg = process.argv.find((a) => a.startsWith("--days="));
const minImpArg = process.argv.find((a) => a.startsWith("--minImpressions="));
const maxCtrArg = process.argv.find((a) => a.startsWith("--maxCtr="));
const DAYS = daysArg ? Number(daysArg.split("=")[1]) : 28;
const MIN_IMP = minImpArg ? Number(minImpArg.split("=")[1]) : 25;
const MAX_CTR = maxCtrArg ? Number(maxCtrArg.split("=")[1]) : 0.05;

function matchPlaybook(query) {
  const hit = INTENT_PLAYBOOK.find((p) => p.queryLike.test(query || ""));
  return hit
    ? { path: hit.path, titleHint: hit.titleHint }
    : { path: null, titleHint: null };
}

function mapRows(rows) {
  return rows.map((r) => ({
    key: r.keys?.[0],
    clicks: r.clicks || 0,
    impressions: r.impressions || 0,
    ctr: r.ctr || 0,
    position: r.position || 0,
  }));
}

async function main() {
  const { client, email } = await getGscClient([
    "https://www.googleapis.com/auth/webmasters.readonly",
    "https://www.googleapis.com/auth/webmasters",
  ]);
  console.log(`Using ${email}`);

  const window = analyticsWindow(DAYS);
  console.log(`\nWindow ${window.startDate} → ${window.endDate} (${DAYS}d)`);

  let sitemaps = [];
  try {
    sitemaps = await listSitemaps(client);
  } catch (e) {
    console.error("Sitemaps list failed:", e?.message || e);
  }

  const [queries, pages, countries, devices] = await Promise.all([
    searchAnalytics(client, { ...window, dimensions: ["query"], rowLimit: 250 }),
    searchAnalytics(client, { ...window, dimensions: ["page"], rowLimit: 250 }),
    searchAnalytics(client, {
      ...window,
      dimensions: ["country"],
      rowLimit: 50,
    }),
    searchAnalytics(client, {
      ...window,
      dimensions: ["device"],
      rowLimit: 10,
    }),
  ]);

  const qMapped = mapRows(queries);
  const pMapped = mapRows(pages);
  const pageImp = new Map(pMapped.map((p) => [p.key, p.impressions]));

  const lowCtrQueries = qMapped
    .filter((r) => r.impressions >= MIN_IMP && r.ctr < MAX_CTR)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 40)
    .map((r) => ({ ...r, ...matchPlaybook(r.key) }));

  const lowCtrPages = pMapped
    .filter((r) => r.impressions >= MIN_IMP && r.ctr < MAX_CTR)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 40);

  // Priority coverage: Tier 1–2 EN/ES with 0 impressions in window
  const priorityUrls = [];
  for (const item of INDEX_PRIORITY.filter((i) => i.tier <= 2)) {
    for (const locale of ["en", "es"]) {
      priorityUrls.push({
        url: absoluteIndexUrl(locale, item.path),
        path: item.path,
        tier: item.tier,
        locale,
        why: item.why,
      });
    }
  }
  const coverageGaps = priorityUrls
    .filter((u) => !(pageImp.get(u.url) > 0))
    .slice(0, 80);

  const progress = loadIndexProgress();
  const publishedCount = Object.keys(progress.published || {}).length;
  const tierStats = {};
  for (const t of [1, 2, 3]) {
    const paths = INDEX_PRIORITY.filter((i) => i.tier === t);
    const total = paths.length * LOCALES.length;
    let done = 0;
    for (const item of paths) {
      for (const locale of LOCALES) {
        const url = absoluteIndexUrl(locale, item.path);
        if (progress.published?.[url]) done++;
      }
    }
    tierStats[t] = { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  const totals = {
    clicks: qMapped.reduce((s, r) => s + r.clicks, 0),
    impressions: qMapped.reduce((s, r) => s + r.impressions, 0),
  };
  totals.ctr = totals.impressions
    ? totals.clicks / totals.impressions
    : 0;

  const report = {
    generatedAt: new Date().toISOString(),
    site: SITE_ORIGIN,
    window,
    filters: { minImpressions: MIN_IMP, maxCtr: MAX_CTR },
    sitemaps: sitemaps.map((s) => ({
      path: s.path,
      lastSubmitted: s.lastSubmitted,
      isPending: s.isPending,
      warnings: s.warnings,
      errors: s.errors,
      contents: s.contents,
    })),
    indexProgress: {
      updatedAt: progress.updatedAt,
      publishedUrls: publishedCount,
      tiers: tierStats,
    },
    totals,
    topQueries: qMapped.slice(0, 25),
    topPages: pMapped.slice(0, 25),
    countries: mapRows(countries).slice(0, 15),
    devices: mapRows(devices),
    lowCtrQueries,
    lowCtrPages,
    coverageGaps,
    playbookFallback: INTENT_PLAYBOOK.map((p) => ({
      path: p.path,
      titleHint: p.titleHint,
    })),
    nextActions: buildNextActions(tierStats, qMapped.length, lowCtrQueries),
  };

  writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + "\n");
  console.log(`\nWrote ${REPORT_PATH}`);

  printSummary(report);
}

function buildNextActions(tierStats, queryCount, lowCtr) {
  const actions = [];
  if (tierStats[2]?.done < tierStats[2]?.total) {
    actions.push({
      pri: "P0",
      action: `npm run gsc:tier -- 2`,
      why: `Tier 2 ${tierStats[2].done}/${tierStats[2].total} published`,
    });
  }
  if (queryCount === 0) {
    actions.push({
      pri: "Biz",
      action: "Distribución + esperar crawl (GSC sin queries aún)",
      why: "Sin impresiones no hay CTR real que optimizar",
    });
  } else if (lowCtr.length) {
    actions.push({
      pri: "P1",
      action: "Retitular/meta páginas del lowCtrQueries top",
      why: `${lowCtr.length} queries con impresiones y CTR bajo`,
    });
  }
  actions.push({
    pri: "Ops",
    action: "npm run gsc:report (semanal)",
    why: "Monitorear cobertura, CTR y gaps",
  });
  return actions;
}

function printSummary(report) {
  const t2 = report.indexProgress.tiers[2];
  const t1 = report.indexProgress.tiers[1];
  console.log("\n══ GSC Report ══");
  console.log(
    `Sitemap entries: ${report.sitemaps.length}` +
      (report.sitemaps[0]
        ? ` · lastSubmitted=${report.sitemaps[0].lastSubmitted || "n/a"}`
        : "")
  );
  console.log(
    `Index progress: T1 ${t1.done}/${t1.total} · T2 ${t2.done}/${t2.total}` +
      ` · published file ${report.indexProgress.publishedUrls}`
  );
  console.log(
    `Search: ${report.totals.impressions} imps · ${report.totals.clicks} clicks · CTR ${(report.totals.ctr * 100).toFixed(2)}% · ${report.topQueries.length} query rows`
  );
  console.log(
    `Low-CTR queries: ${report.lowCtrQueries.length} · Low-CTR pages: ${report.lowCtrPages.length} · Coverage gaps (T1–2 EN/ES): ${report.coverageGaps.length}`
  );
  console.log("\nNext actions:");
  for (const a of report.nextActions) {
    console.log(`  [${a.pri}] ${a.action} — ${a.why}`);
  }
  if (report.lowCtrQueries.length) {
    console.log("\nTop low-CTR queries:");
    for (const row of report.lowCtrQueries.slice(0, 10)) {
      console.log(
        `  "${row.key}" imps=${row.impressions} ctr=${(row.ctr * 100).toFixed(2)}%` +
          (row.path ? ` → ${row.path}` : "")
      );
    }
  } else if (!report.topQueries.length) {
    console.log(
      "\nNo Search Analytics rows yet. Playbook titles already applied; re-run weekly."
    );
  }
}

main().catch((e) => {
  console.error(e?.response?.data || e);
  process.exit(1);
});
