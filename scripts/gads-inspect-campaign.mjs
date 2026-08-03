/**
 * Inspect USCQ Search Core structure on the client account.
 * Usage: node scripts/gads-inspect-campaign.mjs
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

  const campaigns = await customer.query(`
    SELECT campaign.id, campaign.name, campaign.status, campaign.advertising_channel_type,
           campaign_budget.amount_micros
    FROM campaign
    WHERE campaign.name = 'USCQ Search Core'
  `);
  console.log("\n=== CAMPAIGNS ===");
  console.log(JSON.stringify(campaigns, null, 2));

  const adGroups = await customer.query(`
    SELECT ad_group.id, ad_group.name, ad_group.status, campaign.name
    FROM ad_group
    WHERE campaign.name = 'USCQ Search Core'
  `);
  console.log("\n=== AD GROUPS ===");
  console.log(JSON.stringify(adGroups, null, 2));

  const keywords = await customer.query(`
    SELECT ad_group.name, ad_group_criterion.keyword.text,
           ad_group_criterion.keyword.match_type,
           ad_group_criterion.status,
           ad_group_criterion.final_urls
    FROM ad_group_criterion
    WHERE campaign.name = 'USCQ Search Core'
      AND ad_group_criterion.type = 'KEYWORD'
  `);
  console.log("\n=== KEYWORDS ===");
  console.log(JSON.stringify(keywords, null, 2));

  const ads = await customer.query(`
    SELECT ad_group.name, ad_group_ad.ad.id, ad_group_ad.status,
           ad_group_ad.ad.type,
           ad_group_ad.ad.responsive_search_ad.headlines,
           ad_group_ad.ad.responsive_search_ad.descriptions,
           ad_group_ad.ad.final_urls,
           ad_group_ad.ad.responsive_search_ad.path1,
           ad_group_ad.ad.responsive_search_ad.path2
    FROM ad_group_ad
    WHERE campaign.name = 'USCQ Search Core'
  `);
  console.log("\n=== ADS ===");
  console.log(JSON.stringify(ads, null, 2));

  const negatives = await customer.query(`
    SELECT campaign.name, campaign_criterion.keyword.text,
           campaign_criterion.keyword.match_type,
           campaign_criterion.negative
    FROM campaign_criterion
    WHERE campaign.name = 'USCQ Search Core'
      AND campaign_criterion.negative = TRUE
  `);
  console.log("\n=== CAMPAIGN NEGATIVES ===");
  console.log(JSON.stringify(negatives, null, 2));
}

main().catch((e) => {
  const blob = `${e?.message || ""} ${JSON.stringify(e?.errors || e || "")}`;
  if (/only approved for use with test accounts|authorization_error|DEVELOPER_TOKEN_NOT_APPROVED/i.test(blob)) {
    console.error("API blocked: developer token is Explorer-only. Apply for Basic — ads/SETUP.md");
    process.exit(2);
  }
  console.error(e?.errors ? JSON.stringify(e.errors, null, 2) : e?.message || e);
  process.exit(1);
});
