/**
 * Diff ads/negatives.txt vs campaign-level negatives on USCQ Search Core (read-only).
 * Requires Basic (or approved) developer token — Explorer may fail on production accounts.
 *
 * Usage: npm run gads:negatives
 */
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { GoogleAdsApi } = require("google-ads-api");

const ENV_PATH = new URL("../secrets/google-ads.env", import.meta.url);
const NEG_PATH = new URL("../ads/negatives.txt", import.meta.url);

function parseEnv(text) {
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    out[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return out;
}

function loadWanted() {
  const raw = readFileSync(NEG_PATH, "utf8");
  return raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => l.toLowerCase());
}

function norm(text) {
  return String(text || "")
    .trim()
    .toLowerCase()
    .replace(/^\[|\]$/g, "")
    .replace(/^"|"$/g, "");
}

async function main() {
  if (!existsSync(ENV_PATH)) {
    console.error("Missing secrets/google-ads.env — see ads/SETUP.md");
    process.exit(1);
  }
  const env = parseEnv(readFileSync(ENV_PATH, "utf8"));
  const wanted = loadWanted();
  const api = new GoogleAdsApi({
    client_id: env.GOOGLE_ADS_CLIENT_ID,
    client_secret: env.GOOGLE_ADS_CLIENT_SECRET,
    developer_token: env.GOOGLE_ADS_DEVELOPER_TOKEN,
  });

  const customerId = (env.GOOGLE_ADS_CUSTOMER_ID || "").replace(/-/g, "");
  const loginId = (env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || "").replace(/-/g, "");
  const customer = api.Customer({
    customer_id: customerId,
    refresh_token: env.GOOGLE_ADS_REFRESH_TOKEN,
    ...(loginId ? { login_customer_id: loginId } : {}),
  });

  console.log("Customer", customerId, "· comparing ads/negatives.txt");

  let rows;
  try {
    rows = await customer.query(`
      SELECT campaign_criterion.keyword.text,
             campaign_criterion.keyword.match_type
      FROM campaign_criterion
      WHERE campaign.name = 'USCQ Search Core'
        AND campaign_criterion.negative = TRUE
        AND campaign_criterion.type = 'KEYWORD'
    `);
  } catch (e) {
    const blob = `${e?.message || ""} ${JSON.stringify(e?.errors || e || "")}`;
    if (
      /DEVELOPER_TOKEN_NOT_APPROVED|only approved for use with test accounts|authorization_error|PERMISSION_DENIED|not approved/i.test(
        blob
      )
    ) {
      console.error("\nAPI blocked (Explorer token or permissions).");
      console.error(
        "Apply for Basic access: Ads → Tools → API Center — see ads/SETUP.md"
      );
      console.error(
        "Until then, paste missing rows from ads/negatives.txt in the UI."
      );
      process.exit(2);
    }
    throw e;
  }

  const inAccount = new Set();
  for (const row of rows) {
    const t = norm(row?.campaign_criterion?.keyword?.text);
    if (t) inAccount.add(t);
  }

  const missing = wanted.filter((w) => !inAccount.has(norm(w)));
  const extra = [...inAccount].filter(
    (a) => !wanted.some((w) => norm(w) === a)
  );

  console.log(`\nIn account: ${inAccount.size} · File: ${wanted.length}`);
  console.log(`\n=== MISSING IN ACCOUNT (${missing.length}) ===`);
  for (const m of missing) console.log(m);
  console.log(`\n=== IN ACCOUNT NOT IN FILE (${extra.length}) ===`);
  for (const e of extra.slice(0, 50)) console.log(e);
  if (extra.length > 50) console.log(`… +${extra.length - 50} more`);

  if (missing.length) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e?.errors ? JSON.stringify(e.errors, null, 2) : e?.message || e);
  process.exit(1);
});
