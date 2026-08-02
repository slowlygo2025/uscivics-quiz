/**
 * Builds official USCIS civics question banks into src/data/questions/*.json
 *
 * Sources:
 * - 2008 EN/ES: USCIS HTML pages
 * - 2025 EN: USCIS PDF (M-1778)
 * - 2025 ES: USAHello Spanish translation of the 2025 bank
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rawDir = path.join(__dirname, "raw");
const outDir = path.join(__dirname, "..", "src", "data", "questions");

const CATEGORY_MAP_EN = {
  "AMERICAN GOVERNMENT": "American Government",
  "AMERICAN HISTORY": "American History",
  "INTEGRATED CIVICS": "Integrated Civics",
};

const CATEGORY_MAP_ES = {
  "GOBIERNO ESTADOUNIDENSE": "Gobierno estadounidense",
  "HISTORIA ESTADOUNIDENSE": "Historia estadounidense",
  "EDUCACIÓN CÍVICA INTEGRADA": "Educación cívica integrada",
  "EDUCACION CIVICA INTEGRADA": "Educación cívica integrada",
};

const TRIBE_ANSWERS = [
  "Cherokee", "Navajo", "Sioux", "Chippewa", "Choctaw", "Pueblo", "Apache",
  "Iroquois", "Creek", "Blackfeet", "Seminole", "Cheyenne", "Arawak", "Shawnee",
  "Mohegan", "Huron", "Oneida", "Lakota", "Crow", "Teton", "Hopi", "Inuit",
];

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\u00a0/g, " ");
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
}

function parseHtmlBank(html, locale) {
  const catMap = locale === "es" ? CATEGORY_MAP_ES : CATEGORY_MAP_EN;
  const startMarker =
    locale === "es" ? "GOBIERNO ESTADOUNIDENSE" : "AMERICAN GOVERNMENT";
  const start = html.indexOf(startMarker);
  const endMarkers =
    locale === "es"
      ? ["*Si usted tiene 65", "Última Revisión", "¿Fue útil esta página"]
      : ["* If you are 65", "Last Reviewed", "Was this page helpful"];
  let end = html.length;
  for (const m of endMarkers) {
    const i = html.indexOf(m, start);
    if (i !== -1 && i < end) end = i;
  }
  const body = html.slice(start, end);

  let category =
    locale === "es" ? "Gobierno estadounidense" : "American Government";
  const questions = [];

  const tokenRe =
    /<p[^>]*>\s*<strong>([^<]+)<\/strong>\s*<\/p>|<ol[^>]*>([\s\S]*?)<\/ol>/gi;
  let match;
  while ((match = tokenRe.exec(body))) {
    if (match[1]) {
      const heading = stripTags(match[1]).toUpperCase().replace(/\s+/g, " ").trim();
      if (/^[A-C]:/.test(heading)) continue;
      for (const [key, val] of Object.entries(catMap)) {
        if (heading.includes(key)) {
          category = val;
          break;
        }
      }
      continue;
    }

    const ol = match[2];
    const itemRe = /<li>([\s\S]*?)<ul>([\s\S]*?)<\/ul>\s*<\/li>/gi;
    let item;
    while ((item = itemRe.exec(ol))) {
      pushQuestion(stripTags(item[1].replace(/<ul>[\s\S]*$/, "")), item[2], category);
    }

    // Q87 (2008): tribe question has answers outside the <li>
    const orphan = ol.match(
      /<li>\s*(Name one American Indian tribe in the United States\.|Mencione una tribu de indios estadounidenses en Estados Unidos\.)\s*<\/li>/i
    );
    if (orphan) {
      pushQuestion(orphan[1], null, category, TRIBE_ANSWERS);
    }
  }

  function pushQuestion(qText, answersHtml, cat, presetAnswers) {
    const senior = /\*/.test(qText);
    qText = qText.replace(/\*+\s*$/, "").trim();
    let answers = presetAnswers ? [...presetAnswers] : [];
    if (answersHtml) {
      const ansRe = /<li>([\s\S]*?)<\/li>/gi;
      let a;
      while ((a = ansRe.exec(answersHtml))) {
        if (/<ul>/i.test(a[1])) continue;
        const ans = stripTags(a[1]);
        if (ans) answers.push(ans);
      }
    }
    if (!qText || answers.length === 0) return;
    if (questions.some((q) => q.question === qText)) return;
    questions.push({
      id: questions.length + 1,
      category: cat,
      question: qText,
      answers,
      ...(senior ? { senior: true } : {}),
    });
  }

  return questions;
}

function normalizePdfText(text) {
  return text.replace(/\r/g, "").replace(/[•▪]/g, "•");
}

function categoryFor2025(id, locale) {
  // M-1778: AG 1–75, History 76–118, Symbols & Holidays 119–128
  if (locale === "es") {
    if (id <= 75) return "Gobierno estadounidense";
    if (id <= 118) return "Historia estadounidense";
    return "Símbolos y días festivos";
  }
  if (id <= 75) return "American Government";
  if (id <= 118) return "American History";
  return "Symbols and Holidays";
}

function extractAnswers(answerPart) {
  const answers = [];
  for (const part of answerPart.split(/•/).map((s) => s.trim()).filter(Boolean)) {
    let a = part
      .split(/\n\s*\d{1,3}\.\s+/)[0]
      .replace(/\*/g, "")
      .replace(/\s+/g, " ")
      .trim();
    a = a
      .replace(/\s+(AMERICAN|SYMBOLS|A:|B:|C:|65\/20|USAHello|128 Civics|Principles of|System of|Rights and|National Holidays|American History|American Symbols).*$/i, "")
      .trim();
    if (a && a.length < 500) answers.push(a);
  }
  return answers;
}

function parse2025EnPdf(text) {
  text = normalizePdfText(text);
  const start = text.search(/\n1\.\s+What is the form of government/);
  const sliced = start >= 0 ? text.slice(start) : text;

  const starts = [];
  const qStartRe = /(?:^|\n)\s*(\d{1,3})\.\s+/g;
  let m;
  while ((m = qStartRe.exec(sliced))) {
    starts.push({
      n: Number(m[1]),
      index: m.index + (m[0].startsWith("\n") ? 1 : 0),
    });
  }

  const byNum = new Map();
  for (let i = 0; i < starts.length; i++) {
    const cur = starts[i];
    if (byNum.has(cur.n)) continue;
    const next = starts[i + 1];
    byNum.set(cur.n, sliced.slice(cur.index, next ? next.index : sliced.length));
  }

  const questions = [];
  for (let n = 1; n <= 128; n++) {
    const raw = byNum.get(n);
    if (!raw) {
      console.warn(`Missing 2025-EN question ${n}`);
      continue;
    }

    let body = raw
      .replace(/^\s*\d{1,3}\.\s+/, "")
      .replace(/M-1778[\s\S]*?\n/g, "\n")
      .replace(/128 Civics Questions[\s\S]*?\n/g, "\n")
      .replace(/www\.uscis\.gov[^\n]*/g, "");

    const bulletIdx = body.search(/•/);
    const questionPart = bulletIdx === -1 ? body : body.slice(0, bulletIdx);
    const answerPart = bulletIdx === -1 ? "" : body.slice(bulletIdx);
    const senior = /\*/.test(questionPart) || /\*\s*•/.test(body.slice(0, 300));

    let question = questionPart
      .replace(/\*/g, "")
      .replace(/\s+/g, " ")
      .replace(/\s+\d{1,3}\.\s+.*$/, "")
      .trim();

    const answers = extractAnswers(answerPart);
    questions.push({
      id: n,
      category: categoryFor2025(n, "en"),
      question,
      answers,
      ...(senior ? { senior: true } : {}),
    });
  }
  return questions;
}

function parse2025EsPdf(text) {
  text = normalizePdfText(text);
  // Drop TOC — bilingual PDF lists EN then ES for each number
  const start = text.search(/\n1\.\s+What is the form of government/);
  const sliced = start >= 0 ? text.slice(start) : text;

  const starts = [];
  const re = /(?:^|\n)\s*(\d{1,3})\.\s+/g;
  let m;
  while ((m = re.exec(sliced))) {
    const idx = m.index + (m[0].startsWith("\n") ? 1 : 0);
    starts.push({ n: Number(m[1]), index: idx });
  }

  const questions = [];
  for (let n = 1; n <= 128; n++) {
    const candidates = starts.filter((s) => s.n === n);
    // Prefer 2nd occurrence (Spanish). Fall back to last if only one match looks Spanish-ish.
    const esCand = candidates[1] || candidates[0];
    if (!esCand) {
      console.warn(`Missing 2025-ES question ${n}`);
      continue;
    }

    // End at next numbered block after this one
    const next = starts.find((s) => s.index > esCand.index);
    let block = sliced.slice(esCand.index, next ? next.index : sliced.length);
    block = block.replace(/^\s*\d{1,3}\.\s+/, "");

    // If English content somehow included, stop at English question start inside
    const enBreak = block.search(/\n\s*\d{1,3}\.\s+(?:What |Name |Who |How |Why |When |Where |The |There |Under |During |Before |If |Many |Some )/);
    if (enBreak > 0) block = block.slice(0, enBreak);

    block = block
      .replace(/USAHello[^\n]*/g, "")
      .replace(/128 Civics Questions[^\n]*/g, "")
      .replace(/Spanish Translation[^\n]*/g, "");

    const bulletIdx = block.search(/•/);
    const questionPart = bulletIdx === -1 ? block : block.slice(0, bulletIdx);
    const answerPart = bulletIdx === -1 ? "" : block.slice(bulletIdx);
    const senior = /\*/.test(questionPart) || /\*\s*•/.test(block.slice(0, 300));

    let question = questionPart
      .replace(/\*/g, "")
      .replace(/\s+/g, " ")
      .trim();

    let answers = extractAnswers(answerPart);

    // Page-break glue: first answer fused after year/period without bullet
    // e.g. "...años 1900.La Primera Guerra Mundial"
    const glued = question.match(/^(.+?\d)\.([A-ZÁÉÍÓÚÑ¡¿].+)$/);
    if (glued) {
      question = glued[1] + ".";
      answers = [glued[2].trim(), ...answers];
    }

    questions.push({
      id: n,
      category: categoryFor2025(n, "es"),
      question,
      answers,
      ...(senior ? { senior: true } : {}),
    });
  }

  return questions;
}

function writeJson(filename, data) {
  fs.writeFileSync(
    path.join(outDir, filename),
    JSON.stringify(data, null, 2) + "\n",
    "utf8"
  );
  console.log(`Wrote ${filename}: ${data.length} questions`);
}

function report(name, data) {
  const empty = data.filter((q) => !q.question || q.answers.length === 0);
  const senior = data.filter((q) => q.senior).length;
  console.log(
    `${name}: ${data.length} total, ${senior} senior*, ${empty.length} incomplete`
  );
  if (empty.length) {
    console.log("  incomplete ids:", empty.map((q) => q.id).join(", "));
    console.log("  sample:", JSON.stringify(empty[0], null, 2));
  }
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const q2008en = parseHtmlBank(
    fs.readFileSync(path.join(rawDir, "2008-en.html"), "utf8"),
    "en"
  );
  const q2008es = parseHtmlBank(
    fs.readFileSync(path.join(rawDir, "2008-es.html"), "utf8"),
    "es"
  );

  writeJson("2008-en.json", q2008en);
  writeJson("2008-es.json", q2008es);

  const enText = (await pdf(fs.readFileSync(path.join(rawDir, "2025-en.pdf")))).text;
  const esText = (await pdf(fs.readFileSync(path.join(rawDir, "2025-es.pdf")))).text;
  fs.writeFileSync(path.join(rawDir, "2025-en.txt"), enText);
  fs.writeFileSync(path.join(rawDir, "2025-es.txt"), esText);

  const q2025en = parse2025EnPdf(enText);
  const q2025es = parse2025EsPdf(esText);

  writeJson("2025-en.json", q2025en);
  writeJson("2025-es.json", q2025es);

  report("2008-en", q2008en);
  report("2008-es", q2008es);
  report("2025-en", q2025en);
  report("2025-es", q2025es);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
