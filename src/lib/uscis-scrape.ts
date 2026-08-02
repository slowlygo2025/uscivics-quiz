import type { FederalOfficial, UscisUpdatesPayload } from "./federal-officials";

export const USCIS_TEST_UPDATES_URL =
  "https://www.uscis.gov/citizenship/find-study-materials-and-resources/check-for-test-updates";

type OfficeMeta = {
  office: FederalOfficial["office"] | "supremeCourtCount";
  re: RegExp;
  questionIds: { "2025": number | null; "2008": number | null };
};

const OFFICE_BY_PATTERN: OfficeMeta[] = [
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

function decodeEntities(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\u00a0/g, " ");
}

function stripTags(s: string) {
  return decodeEntities(s.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function extractPanel(html: string, headerSnippet: string) {
  const h = html.indexOf(headerSnippet);
  if (h < 0) return "";
  const panelStart = html.indexOf('class="accordion__panel"', h);
  if (panelStart < 0) return "";
  const open = html.indexOf(">", panelStart) + 1;
  const nextHeader = html.indexOf('class="accordion__header"', open);
  const end =
    nextHeader > 0 ? nextHeader : html.indexOf("</div></div>", open);
  return html.slice(open, end > 0 ? end : open + 8000);
}

function parseQuestions(panelHtml: string) {
  const items: { question: string; answers: string[] }[] = [];
  const re =
    /<p[^>]*>\s*<strong>([\s\S]*?)<\/strong>[\s\S]*?<\/p>\s*<ul>([\s\S]*?)<\/ul>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(panelHtml))) {
    const question = stripTags(m[1]).replace(/\*+$/, "").trim();
    const answers: string[] = [];
    const liRe = /<li>([\s\S]*?)<\/li>/gi;
    let li: RegExpExecArray | null;
    while ((li = liRe.exec(m[2]))) {
      const text = stripTags(li[1]);
      if (text) answers.push(text);
    }
    if (question && answers.length) items.push({ question, answers });
  }
  return items;
}

function matchOffice(question: string) {
  for (const row of OFFICE_BY_PATTERN) {
    if (row.re.test(question)) return row;
  }
  return null;
}

function pickPrimaryName(answers: string[]) {
  const cleaned = answers
    .map((a) => a.replace(/\s*\(birth name\)\s*/i, "").trim())
    .filter(Boolean);
  return cleaned[0] ?? "";
}

function isVarying(answers: string[]) {
  return answers.some((a) => /answers will vary/i.test(a));
}

export type ScrapedUscisUpdates = Omit<UscisUpdatesPayload, "live"> & {
  extras: { supremeCourtJustices: string | null };
};

export function parseUscisTestUpdatesHtml(html: string): ScrapedUscisUpdates {
  const panel2008 = extractPanel(html, "Civics Test (2008 Version) Updates");
  const panel2025 = extractPanel(
    html,
    "Civics Test (2025 Naturalization Civics Test) Updates"
  );

  const q2008 = parseQuestions(panel2008);
  const q2025 = parseQuestions(panel2025);

  type Acc = {
    office: string;
    name: string;
    answers: string[];
    questionIds: { "2008": number | null; "2025": number | null };
    sources: string[];
  };
  const byOffice: Record<string, Acc> = {};

  function ingest(
    items: { question: string; answers: string[] }[],
    version: "2008" | "2025"
  ) {
    for (const item of items) {
      if (isVarying(item.answers)) continue;
      const meta = matchOffice(item.question);
      if (!meta) continue;
      const answers = item.answers
        .map((a) => a.replace(/\s*\(birth name\)\s*/i, "").trim())
        .filter(Boolean);
      if (meta.office === "presidentParty") {
        for (const extra of [
          "Republican",
          "Republican Party",
          "Republican (Party)",
        ]) {
          if (
            answers.some((a) => /republican/i.test(a)) &&
            !answers.includes(extra)
          ) {
            answers.push(extra);
          }
        }
      }
      const existing = byOffice[meta.office];
      if (existing) {
        for (const a of answers) {
          if (!existing.answers.includes(a)) existing.answers.push(a);
        }
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

  const officials = Object.values(byOffice)
    .filter((o) => o.office !== "supremeCourtCount")
    .map(
      (o): FederalOfficial => ({
        office: o.office as FederalOfficial["office"],
        name: o.name,
        answers: o.answers,
        questionIds: o.questionIds,
      })
    );

  const alertMatch = html.match(
    /<p><strong>ALERT:<\/strong>\s*([\s\S]*?)<\/p>/i
  );

  return {
    source: USCIS_TEST_UPDATES_URL,
    scrapedAt: new Date().toISOString(),
    alert: alertMatch ? stripTags(alertMatch[1]) : null,
    officials,
    extras: {
      supremeCourtJustices:
        byOffice.supremeCourtCount?.answers?.[0] ?? null,
    },
    rawCounts: { "2008": q2008.length, "2025": q2025.length },
  };
}

export async function scrapeUscisTestUpdates(): Promise<ScrapedUscisUpdates> {
  const res = await fetch(USCIS_TEST_UPDATES_URL, {
    headers: {
      "User-Agent":
        "USCivicsQuiz/1.0 (+https://uscivics-quiz.com; study tool mirroring public USCIS test updates)",
      Accept: "text/html,application/xhtml+xml",
    },
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
    throw new Error(`USCIS fetch failed: ${res.status} ${res.statusText}`);
  }
  const html = await res.text();
  return parseUscisTestUpdatesHtml(html);
}
