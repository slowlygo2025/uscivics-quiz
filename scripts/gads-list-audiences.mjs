/**
 * List user lists + campaign audience criteria for USCQ Search Core.
 * Usage: node scripts/gads-list-audiences.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { GoogleAdsApi } = require("google-ads-api");

const ENV_PATH = new URL("../secrets/google-ads.env", import.meta.url);

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

async function main() {
  if (!existsSync(ENV_PATH)) throw new Error("Missing secrets/google-ads.env");
  const env = parseEnv(readFileSync(ENV_PATH, "utf8"));
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

  console.log("Customer", customerId, "login", loginId || "(none)");

  const lists = await customer.query(`
    SELECT user_list.id, user_list.name, user_list.type,
           user_list.membership_status, user_list.size_for_search,
           user_list.size_for_display, user_list.account_user_list_status
    FROM user_list
    ORDER BY user_list.name
    LIMIT 80
  `);
  console.log("\n=== USER LISTS ===");
  for (const row of lists) {
    const u = row.user_list;
    console.log(
      `- ${u.name} | id=${u.id} | type=${u.type} | membership=${u.membership_status} | searchSize=${u.size_for_search ?? "n/a"} | status=${u.account_user_list_status}`
    );
  }

  const crit = await customer.query(`
    SELECT campaign.name, campaign_criterion.criterion_id,
           campaign_criterion.negative, campaign_criterion.type,
           campaign_criterion.status,
           campaign_criterion.user_list.user_list
    FROM campaign_criterion
    WHERE campaign.name = 'USCQ Search Core'
      AND campaign_criterion.type = 'USER_LIST'
  `);
  console.log("\n=== CAMPAIGN USER_LIST CRITERIA (USCQ Search Core) ===");
  console.log(JSON.stringify(crit, null, 2));
}

main().catch((e) => {
  console.error(e?.message || e);
  if (e?.errors) console.error(JSON.stringify(e.errors, null, 2));
  process.exit(1);
});
