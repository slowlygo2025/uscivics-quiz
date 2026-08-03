/**
 * Validate local Google Ads env (does not call the API).
 * Usage: npm run gads:check
 */
import { existsSync, readFileSync } from "node:fs";

const PATH = new URL("../secrets/google-ads.env", import.meta.url);
const EXAMPLE = new URL("../ads/google-ads.env.example", import.meta.url);

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

const required = [
  "GOOGLE_ADS_DEVELOPER_TOKEN",
  "GOOGLE_ADS_CUSTOMER_ID",
  "GOOGLE_ADS_CLIENT_ID",
  "GOOGLE_ADS_CLIENT_SECRET",
  "GOOGLE_ADS_REFRESH_TOKEN",
];

if (!existsSync(PATH)) {
  console.log("Missing secrets/google-ads.env");
  console.log(`Copy: copy ads\\google-ads.env.example secrets\\google-ads.env`);
  console.log(`Template also at: ${EXAMPLE.pathname}`);
  console.log("\nYou can still launch ads via Google Ads Editor + ads/google-ads-editor-import.csv");
  console.log("See ads/SETUP.md");
  process.exit(1);
}

const env = parseEnv(readFileSync(PATH, "utf8"));
let ok = true;
for (const key of required) {
  const v = env[key];
  if (!v) {
    console.log(`FAIL  ${key} empty`);
    ok = false;
  } else {
    const masked =
      v.length <= 4 ? "****" : `${v.slice(0, 2)}…${v.slice(-2)} (${v.length} chars)`;
    console.log(`OK    ${key} = ${masked}`);
  }
}

if (!/^\d{3}-\d{3}-\d{4}$/.test(env.GOOGLE_ADS_CUSTOMER_ID || "")) {
  console.log("WARN  GOOGLE_ADS_CUSTOMER_ID should look like 123-456-7890");
}

if (ok) {
  console.log("\nEnv looks complete. Next: wire google-ads API client (phase 2) or use Editor import now.");
  console.log("Launch path without API: ads/SETUP.md");
  process.exit(0);
}

console.log("\nFill empty fields, then re-run npm run gads:check");
console.log("Campaigns can go live today with ads/google-ads-editor-import.csv (no API).");
process.exit(1);
