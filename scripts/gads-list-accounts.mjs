/**
 * List Google Ads accounts visible to the OAuth refresh token.
 * Usage: npm run gads:accounts
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
  const client = new GoogleAdsApi({
    client_id: env.GOOGLE_ADS_CLIENT_ID,
    client_secret: env.GOOGLE_ADS_CLIENT_SECRET,
    developer_token: env.GOOGLE_ADS_DEVELOPER_TOKEN,
  });
  const customers = await client.listAccessibleCustomers(env.GOOGLE_ADS_REFRESH_TOKEN);
  console.log("Accessible customers:");
  console.log(customers);
}

main().catch((e) => {
  console.error(e?.errors || e?.message || e);
  process.exit(1);
});
