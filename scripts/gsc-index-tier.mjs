/**
 * Notify Google Indexing API for a checklist tier (all locales).
 * Persists successful publishes so resume is URL-based (survives list growth).
 *
 * Usage:
 *   npm run gsc:tier -- 2
 *   npm run gsc:tier -- 1
 *   npm run gsc:tier -- 2 --force              # re-notify already published
 *   npm run gsc:tier -- 2 --limit=50          # cap this run (quota-safe)
 *   npm run gsc:tier -- 2 --bootstrap-skip=81 # mark first N as done (no API)
 */
import {
  getGscClient,
  loadIndexProgress,
  saveIndexProgress,
  markPublished,
  isPublished,
  submitSitemap,
  isQuotaError,
  errorMessage,
} from "./gsc-lib.mjs";
import { LOCALES } from "../src/lib/locales.ts";
import {
  INDEX_PRIORITY,
  absoluteIndexUrl,
} from "../src/lib/indexing-priority.ts";

const tierArg = Number(process.argv[2] || "2");
const bootstrapArg = process.argv.find((a) => a.startsWith("--bootstrap-skip="));
const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const force = process.argv.includes("--force");
const bootstrapSkip = bootstrapArg
  ? Number(bootstrapArg.split("=")[1])
  : 0;
const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;

if (
  ![1, 2, 3].includes(tierArg) ||
  Number.isNaN(bootstrapSkip) ||
  bootstrapSkip < 0
) {
  console.error(
    "Usage: npm run gsc:tier -- <1|2|3> [--bootstrap-skip=N] [--limit=N] [--force]"
  );
  process.exit(1);
}

async function main() {
  const { client, email } = await getGscClient();
  console.log(`Using ${email}`);

  console.log("\nSubmitting sitemap…");
  try {
    const status = await submitSitemap(client);
    console.log(`Sitemap OK (${status})`);
  } catch (e) {
    console.error("Sitemap submit failed:", errorMessage(e));
  }

  const paths = INDEX_PRIORITY.filter((i) => i.tier === tierArg);
  /** @type {{ url: string, why: string, locale: string }[]} */
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

  const progress = loadIndexProgress();

  if (bootstrapSkip > 0) {
    let marked = 0;
    for (const row of urls.slice(0, bootstrapSkip)) {
      if (!isPublished(progress, row.url)) {
        markPublished(progress, row.url, tierArg);
        marked++;
      }
    }
    saveIndexProgress(progress);
    console.log(
      `\nBootstrap: marked ${marked} URLs as already published (first ${bootstrapSkip}).`
    );
  }

  const already = urls.filter((r) => isPublished(progress, r.url)).length;

  let queue = force
    ? urls
    : urls.filter((r) => !isPublished(progress, r.url));

  if (Number.isFinite(limit) && limit > 0) {
    queue = queue.slice(0, limit);
  }

  console.log(
    `\nPublishing Tier ${tierArg}: ${queue.length} queued` +
      ` (${paths.length} paths × ${LOCALES.length} locales;` +
      ` ${already}/${urls.length} already in progress file` +
      (force ? "; FORCE re-notify" : "") +
      ")…"
  );

  let ok = 0;
  let fail = 0;
  let quotaHit = false;

  for (const row of queue) {
    if (quotaHit) break;
    try {
      await client.request({
        url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
        method: "POST",
        data: { url: row.url, type: "URL_UPDATED" },
      });
      ok++;
      markPublished(progress, row.url, tierArg);
      saveIndexProgress(progress);
      console.log(`OK  ${row.url}`);
    } catch (e) {
      fail++;
      const msg = errorMessage(e);
      console.error(`FAIL ${row.url}`);
      console.error("    ", msg);
      if (isQuotaError(msg)) {
        quotaHit = true;
        const remaining = urls.filter((r) => !isPublished(progress, r.url)).length;
        console.error(
          `\nQuota/rate limit hit — progress saved.` +
            `\nRemaining unpublished Tier ${tierArg}: ${remaining}` +
            `\nResume: npm run gsc:tier -- ${tierArg}`
        );
      }
    }
    await new Promise((r) => setTimeout(r, 150));
  }

  const done = urls.filter((r) => isPublished(progress, r.url)).length;
  console.log(
    `\nDone Tier ${tierArg}. ok=${ok} fail=${fail}` +
      ` · progress ${done}/${urls.length}` +
      (quotaHit ? " · STOPPED (quota)" : "")
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
