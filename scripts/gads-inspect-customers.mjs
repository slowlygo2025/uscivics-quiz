import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { GoogleAdsApi } = require("google-ads-api");

const env = Object.fromEntries(
  readFileSync("secrets/google-ads.env", "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const api = new GoogleAdsApi({
  client_id: env.GOOGLE_ADS_CLIENT_ID,
  client_secret: env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: env.GOOGLE_ADS_DEVELOPER_TOKEN,
});

const q = `
  SELECT
    customer.id,
    customer.descriptive_name,
    customer.manager,
    customer.test_account,
    customer.status,
    customer.currency_code,
    customer.time_zone,
    customer.payment_mode
  FROM customer
  LIMIT 1
`;

for (const id of ["1941905637", "7851455619"]) {
  try {
    const c = api.Customer({
      customer_id: id,
      refresh_token: env.GOOGLE_ADS_REFRESH_TOKEN,
      login_customer_id: "7851455619",
    });
    const rows = await c.query(q);
    console.log("---", id);
    console.log(JSON.stringify(rows, null, 2));
  } catch (e) {
    console.log("---", id, "ERR");
    console.log(e?.errors ? JSON.stringify(e.errors, null, 2) : e?.message || e);
  }
}
