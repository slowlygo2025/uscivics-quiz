/**
 * Scrapes USCIS "Check for Test Updates" and writes src/data/uscis-test-updates.json
 * Run: npm run scrape:uscis
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "src", "data", "uscis-test-updates.json");

export const USCIS_TEST_UPDATES_URL =
  "https://www.uscis.gov/citizenship/find-study-materials-and-resources/check-for-test-updates";

const OFFICE_BY_PATTERN = [
  {
    office: "vicePresident",
    re: /name of the Vice President of the United States now/i,
    questionIds: { "2025": 39, "2008": 29 },
  },
  {
    office: "president",
    re: /name of the (?!Vice )President of the United States now/i,
    questionIds: { "2025": 38, "2008": 28 },
  },
  {
    office: "speaker",
    re: /name of the Speaker of the House of Representatives now/i,
    questionIds: { "2025": 30, "2008": 47 },
  },
  {
    office: "chiefJustice",
    re: /Chief Justice of the United States now/i,
    questionIds: { "2025": 57, "2008": 40 },
  },
  {
    office: "presidentParty",
    re: /political party of the President now/i,
    questionIds: { "2025": null, "2008": 46 },
  },
  {
    office: "supremeCourtCount",
    re: /How many justices are on the Supreme Court/i,
    questionIds: { "2025": null, "2008": 39 },
  },
];

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\u00a0/g, " ");
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function extractPanel(html, headerSnippet) {
  const h = html.indexOf(headerSnippet);
  if (h < 0) return "";
  const panelStart = html.indexOf('class="accordion__panel"', h);
  if (panelStart < 0) return "";
  const open = html.indexOf(">", panelStart) + 1;
  const nextHeader = html.indexOf('class="accordion__header"', open);
  const end = nextHeader > 0 ? nextHeader : html.indexOf("</div></div>", open);
  return html.slice(open, end > 0 ? end : open + 8000);
}

function parseQuestions(panelHtml) {
  const items = [];
  const re =
    /<p[^>]*>\s*<strong>([\s\S]*?)<\/strong>[\s\S]*?<\/p>\s*<ul>([\s\S]*?)<\/ul>/gi;
  let m;
  while ((m = re.exec(panelHtml))) {
    const question = stripTags(m[1]).replace(/\*+$/, "").trim();
    const answers = [];
    const liRe = /<li>([\s\S]*?)<\/li>/gi;
    let li;
    while ((li = liRe.exec(m[2]))) {
      const text = stripTags(li[1]);
      if (text) answers.push(text);
    }
    if (question && answers.length) items.push({ question, answers });
  }
  return items;
}

function matchOffice(question) {
  for (const row of OFFICE_BY_PATTERN) {
    if (row.re.test(question)) return row;
  }
  return null;
}

function pickPrimaryName(answers) {
  // USCIS lists the preferred answer first
  const cleaned = answers
    .map((a) => a.replace(/\s*\(birth name\)\s*/i, "").trim())
    .filter(Boolean);
  return cleaned[0] ?? "";
}

function isVarying(answers) {
  return answers.some((a) => /answers will vary/i.test(a));
}

/**
 * @param {string} html
 */
export function parseUscisTestUpdatesHtml(html) {
  const panel2008 = extractPanel(html, "Civics Test (2008 Version) Updates");
  const panel2025 = extractPanel(
    html,
    "Civics Test (2025 Naturalization Civics Test) Updates"
  );

  const q2008 = parseQuestions(panel2008);
  const q2025 = parseQuestions(panel2025);

  /** @type {Record<string, { office: string, name: string, answers: string[], questionIds: Record<string, number|null>, sources: string[] }>} */
  const byOffice = {};

  function ingest(items, version) {
    for (const item of items) {
      if (isVarying(item.answers)) {
        // Keep as local/varying tip, not a federal name
        continue;
      }
      const meta = matchOffice(item.question);
      if (!meta) continue;
      const existing = byOffice[meta.office];
      const answers = [
        ...item.answers.map((a) =>
          a.replace(/\s*\(birth name\)\s*/i, "").trim()
        ),
      ].filter(Boolean);
      if (meta.office === "presidentParty") {
        for (const extra of ["Republican", "Republican Party", "Republican (Party)"]) {
          if (answers.some((a) => /republican/i.test(a)) && !answers.includes(extra)) {
            answers.push(extra);
          }
        }
      }
      if (existing) {
        for (const a of answers) {
          if (!existing.answers.includes(a)) existing.answers.push(a);
        }
        if (!existing.name) existing.name = pickPrimaryName(existing.answers);
        existing.questionIds[version] = meta.questionIds[version];
        if (!existing.sources.includes(version)) existing.sources.push(version);
      } else {
        byOffice[meta.office] = {
          office: meta.office,
          name: pickPrimaryName(answers),
          answers,
          questionIds: { ...meta.questionIds },
          sources: [version],
        };
      }
    }
  }

  ingest(q2008, "2008");
  ingest(q2025, "2025");

  const officials = Object.values(byOffice).filter(
    (o) => o.office !== "supremeCourtCount"
  );

  const extras = {
    supremeCourtJustices:
      byOffice.supremeCourtCount?.answers?.[0] ?? null,
  };

  const alertMatch = html.match(
    /<p><strong>ALERT:<\/strong>\s*([\s\S]*?)<\/p>/i
  );
  const alert = alertMatch ? stripTags(alertMatch[1]) : null;

  return {
    source: USCIS_TEST_UPDATES_URL,
    scrapedAt: new Date().toISOString(),
    alert,
    officials,
    extras,
    rawCounts: { "2008": q2008.length, "2025": q2025.length },
  };
}

export async function scrapeUscisTestUpdates() {
  const res = await fetch(USCIS_TEST_UPDATES_URL, {
    headers: {
      "User-Agent":
        "USCivicsQuiz/1.0 (+https://uscivics-quiz.com; study tool mirroring public USCIS test updates)",
      Accept: "text/html,application/xhtml+xml",
    },
  });
  if (!res.ok) {
    throw new Error(`USCIS fetch failed: ${res.status} ${res.statusText}`);
  }
  const html = await res.text();
  return parseUscisTestUpdatesHtml(html);
}

async function main() {
  console.log("Scraping", USCIS_TEST_UPDATES_URL);
  const data = await scrapeUscisTestUpdates();
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log("Wrote", OUT);
  console.log(
    "Officials:",
    data.officials.map((o) => `${o.office}=${o.name}`).join(", ")
  );
}

const isDirect =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirect) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
