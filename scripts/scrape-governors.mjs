/**
 * Scrape current US governors from Wikipedia and rewrite src/data/governors.ts
 * Capitals are preserved from the existing file (stable).
 *
 * Usage: node scripts/scrape-governors.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "../src/data/governors.ts");

const STATE_CODES = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
};

async function main() {
  const existing = fs.readFileSync(outPath, "utf8");
  const capitalByCode = {};
  for (const m of existing.matchAll(
    /(\w{2}):\s*\{\s*name:\s*"([^"]+)",\s*capital:\s*"([^"]+)",\s*governor:\s*"([^"]+)"/g
  )) {
    capitalByCode[m[1]] = { name: m[2], capital: m[3], governor: m[4] };
  }

  const url =
    "https://en.wikipedia.org/wiki/List_of_current_United_States_governors";
  const html = await fetch(url, {
    headers: { "User-Agent": "uscivics-quiz-governors-bot/1.0" },
  }).then((r) => r.text());

  const governors = { ...capitalByCode };
  // Match state name link then later a person link in the same row (simplified)
  const rowRe =
    /title="([^"]+)"[^>]*>\1<\/a><\/td>\s*<td[^>]*>[\s\S]*?title="([^"]+)"[^>]*>([^<]+)<\/a>/gi;
  let match;
  let updates = 0;
  while ((match = rowRe.exec(html)) !== null) {
    const stateName = match[1].replace(/\s*\(list\)\s*$/i, "").trim();
    const code = STATE_CODES[stateName];
    if (!code || !governors[code]) continue;
    const person = match[3].replace(/\s+/g, " ").trim();
    if (person && person !== governors[code].governor) {
      console.log(`${code}: ${governors[code].governor} → ${person}`);
      governors[code] = { ...governors[code], governor: person };
      updates++;
    } else if (person) {
      governors[code] = { ...governors[code], governor: person };
    }
  }

  // Keep DC mayor from existing
  if (capitalByCode.DC) governors.DC = capitalByCode.DC;

  const asOf = new Date().toISOString().slice(0, 10);
  const codes = Object.keys(governors).sort((a, b) =>
    a === "DC" ? 1 : b === "DC" ? -1 : a.localeCompare(b)
  );

  const lines = codes.map((code) => {
    const g = governors[code];
    return `  ${code}: { name: ${JSON.stringify(g.name)}, capital: ${JSON.stringify(g.capital)}, governor: ${JSON.stringify(g.governor)} },`;
  });

  const file = `/**
 * Governors + capitals snapshot for ZIP / state study answers.
 * asOf: ISO date of last manual or scripted refresh.
 * Automated refresh: \\\`npm run scrape:governors\\\` → writes this file; cron hits /api/cron/governors.
 */
export type GovernorRecord = {
  name: string;
  capital: string;
  governor: string;
};

export const GOVERNORS_AS_OF = ${JSON.stringify(asOf)};

export const GOVERNORS: Record<string, GovernorRecord> = {
${lines.join("\n")}
};
`;

  fs.writeFileSync(outPath, file);
  console.log(`Wrote ${outPath} (updates≈${updates}, asOf=${asOf})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
