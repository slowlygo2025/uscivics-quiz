/**
 * Build bilingual question banks from USAHello / USCIS PDFs.
 * Run: node scripts/build-p1-languages.mjs
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

const CAT_2025 = {
  zh: { gov: "美国政府", hist: "美国历史", sym: "象征与节日" },
  vi: { gov: "Chính quyền Hoa Kỳ", hist: "Lịch sử Hoa Kỳ", sym: "Biểu tượng và ngày lễ" },
  tl: { gov: "Pamahalaang Amerikano", hist: "Kasaysayan ng Amerika", sym: "Mga Simbolo at Pagdiriwang" },
  ar: { gov: "الحكومة الأمريكية", hist: "التاريخ الأمريكي", sym: "الرموز والعطل" },
  ko: { gov: "미국 정부", hist: "미국 역사", sym: "상징과 공휴일" },
  hi: { gov: "अमेरिकी सरकार", hist: "अमेरिकी इतिहास", sym: "प्रतीक और छुट्टियाँ" },
  ru: { gov: "Американское правительство", hist: "Американская история", sym: "Символы и праздники" },
  ht: { gov: "Gouvènman Ameriken", hist: "Istwa Ameriken", sym: "Senbòl ak jou ferye" },
  fr: { gov: "Gouvernement américain", hist: "Histoire américaine", sym: "Symboles et jours fériés" },
};

const CAT_2008 = {
  zh: { gov: "美国政府", hist: "美国历史", civ: "综合公民知识" },
  vi: { gov: "Chính quyền Hoa Kỳ", hist: "Lịch sử Hoa Kỳ", civ: "Giáo dục công dân tích hợp" },
  tl: { gov: "Pamahalaang Amerikano", hist: "Kasaysayan ng Amerika", civ: "Sibika" },
  ar: { gov: "الحكومة الأمريكية", hist: "التاريخ الأمريكي", civ: "التربية المدنية المتكاملة" },
  ko: { gov: "미국 정부", hist: "미국 역사", civ: "통합 시민 교육" },
  hi: { gov: "अमेरिकी सरकार", hist: "अमेरिकी इतिहास", civ: "एकीकृत नागरिक शिक्षा" },
  ru: { gov: "Американское правительство", hist: "Американская история", civ: "Интегрированное гражданское образование" },
  ht: { gov: "Gouvènman Ameriken", hist: "Istwa Ameriken", civ: "Edikasyon sivik entegre" },
  fr: { gov: "Gouvernement américain", hist: "Histoire américaine", civ: "Éducation civique intégrée" },
};

const LOCALES_2025 = Object.keys(CAT_2025);
const LOCALES_2008 = Object.keys(CAT_2008);

function normalizePdfText(text) {
  return text.replace(/\r/g, "").replace(/[•▪]/g, "•");
}

const ARABIC_INDIC = "٠١٢٣٤٥٦٧٨٩";

function toWesternDigits(s) {
  return s.replace(/[٠-٩]/g, (d) => String(ARABIC_INDIC.indexOf(d)));
}

function looksEnglishQuestion(block) {
  const body = block.replace(/^\s*[0-9٠-٩]{1,3}[\.．]\s+/, "").trim();
  return /^(What |Name |Who |How |Why |When |Where |The |There |Under |During |Before |If |Many |Some |Which |Define |Describe )/i.test(
    body
  );
}

function category2025(id, locale) {
  const c = CAT_2025[locale];
  if (id <= 75) return c.gov;
  if (id <= 118) return c.hist;
  return c.sym;
}

function category2008(id, locale) {
  const c = CAT_2008[locale];
  if (id <= 57) return c.gov;
  if (id <= 87) return c.hist;
  return c.civ;
}

function extractAnswers(answerPart) {
  const answers = [];
  for (const part of answerPart.split(/•/).map((s) => s.trim()).filter(Boolean)) {
    let a = part
      .split(/\n\s*(?:[0-9٠-٩]{1,3})[\.．]\s+/)[0]
      .replace(/\*/g, "")
      .replace(/\s+/g, " ")
      .trim();
    a = a
      .replace(
        /\s+(AMERICAN|SYMBOLS|A:|B:|C:|65\/20|USAHello|128 Civics|100 Civics|Principles of|System of|Rights and|National Holidays|American History|American Symbols|Contents|M-1778).*$/i,
        ""
      )
      .trim();
    if (/[\u4e00-\u9fff]/.test(a)) {
      a = a.replace(/(?<=[\u4e00-\u9fff])\s+(?=[\u4e00-\u9fff])/g, "");
    }
    if (a && a.length < 500) answers.push(a);
  }
  return answers;
}

function collapseCjkSpaces(s) {
  return s.replace(/(?<=[\u4e00-\u9fff])\s+(?=[\u4e00-\u9fff])/g, "");
}

function collectNumberedStarts(sliced, maxN) {
  const starts = [];
  const re = /(?:^|\n)\s*([0-9٠-٩]{1,3})[\.．]\s+/g;
  let m;
  while ((m = re.exec(sliced))) {
    const n = Number(toWesternDigits(m[1]));
    if (n < 1 || n > maxN) continue;
    starts.push({
      n,
      index: m.index + (m[0].startsWith("\n") ? 1 : 0),
    });
  }
  return starts;
}

function pickLocaleCandidate(candidates, sliced) {
  if (!candidates.length) return null;
  const scored = candidates.map((c) => {
    const preview = sliced.slice(c.index, c.index + 120);
    return { c, english: looksEnglishQuestion(preview) };
  });
  return (scored.find((s) => !s.english) || scored[scored.length - 1]).c;
}

function parseBilingual2025(text, locale) {
  text = normalizePdfText(text);
  const start = text.search(/\n1\.\s+What is the form of government/);
  const sliced = start >= 0 ? text.slice(start) : text;
  const starts = collectNumberedStarts(sliced, 128);

  const questions = [];
  for (let n = 1; n <= 128; n++) {
    const candidates = starts.filter((s) => s.n === n);
    const locCand = pickLocaleCandidate(candidates, sliced);
    if (!locCand) {
      console.warn(`Missing 2025-${locale} Q${n}`);
      continue;
    }

    const next = starts.find((s) => s.index > locCand.index);
    let block = sliced.slice(locCand.index, next ? next.index : sliced.length);
    block = block.replace(/^\s*[0-9٠-٩]{1,3}[\.．]\s+/, "");

    const enBreak = block.search(
      /\n\s*(?:[0-9٠-٩]{1,3})[\.．]\s+(?:What |Name |Who |How |Why |When |Where |The |There |Under |During |Before |If |Many |Some )/
    );
    if (enBreak > 0) block = block.slice(0, enBreak);

    block = block
      .replace(/USAHello[^\n]*/g, "")
      .replace(/128 Civics Questions[^\n]*/g, "")
      .replace(/\w+ Translation[^\n]*/g, "");

    const bulletIdx = block.search(/•/);
    const questionPart = bulletIdx === -1 ? block : block.slice(0, bulletIdx);
    const answerPart = bulletIdx === -1 ? "" : block.slice(bulletIdx);
    const senior = /\*/.test(questionPart) || /\*\s*•/.test(block.slice(0, 300));

    let question = collapseCjkSpaces(
      questionPart.replace(/\*/g, "").replace(/\s+/g, " ").trim()
    );
    const answers = extractAnswers(answerPart);

    questions.push({
      id: n,
      category: category2025(n, locale),
      question,
      answers,
      ...(senior ? { senior: true } : {}),
    });
  }
  return questions;
}

function parseBilingual2008(text, locale) {
  text = normalizePdfText(text);
  const start = text.search(/(?:^|\n)\s*(?:1|١)\.\s+/);
  const sliced = start >= 0 ? text.slice(start) : text;
  const starts = collectNumberedStarts(sliced, 100);

  const questions = [];
  for (let n = 1; n <= 100; n++) {
    const candidates = starts.filter((s) => s.n === n);
    const locCand = pickLocaleCandidate(candidates, sliced);
    if (!locCand) {
      console.warn(`Missing 2008-${locale} Q${n}`);
      continue;
    }

    const next = starts.find((s) => s.index > locCand.index);
    let block = sliced.slice(locCand.index, next ? next.index : sliced.length);
    block = block.replace(/^\s*[0-9٠-٩]{1,3}[\.．]\s+/, "");
    block = block
      .replace(/USAHello[^\n]*/g, "")
      .replace(/100 Civics[^\n]*/g, "")
      .replace(/www\.uscis\.gov[^\n]*/g, "");

    const bulletIdx = block.search(/•/);
    const questionPart = bulletIdx === -1 ? block : block.slice(0, bulletIdx);
    const answerPart = bulletIdx === -1 ? "" : block.slice(bulletIdx);
    const senior = /\*/.test(questionPart);

    let question = collapseCjkSpaces(
      questionPart.replace(/\*/g, "").replace(/\s+/g, " ").trim()
    );
    question = question.replace(/\s+(What |Who |How |Name |The ).*$/, "").trim();
    const answers = extractAnswers(answerPart);

    questions.push({
      id: n,
      category: category2008(n, locale),
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
  console.log(`Wrote ${filename}: ${data.length}`);
}

function report(name, data) {
  const empty = data.filter((q) => !q.question || q.answers.length === 0);
  const senior = data.filter((q) => q.senior).length;
  console.log(
    `${name}: ${data.length} total, ${senior} senior*, ${empty.length} incomplete`
  );
  if (empty.length) {
    console.log("  incomplete:", empty.slice(0, 8).map((q) => q.id).join(", "));
  }
  console.log("  Q1:", data[0]?.question?.slice(0, 70));
}

function patchFromEnglish(localeData, enData) {
  const byId = new Map(enData.map((q) => [q.id, q]));
  return localeData.map((q) => {
    if (q.question && q.answers.length) return q;
    const en = byId.get(q.id);
    if (!en) return q;
    return {
      ...q,
      question: q.question || en.question,
      answers: q.answers.length ? q.answers : en.answers,
    };
  });
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const en2025 = JSON.parse(
    fs.readFileSync(path.join(outDir, "2025-en.json"), "utf8")
  );
  const en2008 = JSON.parse(
    fs.readFileSync(path.join(outDir, "2008-en.json"), "utf8")
  );

  for (const locale of LOCALES_2025) {
    const pdfPath = path.join(rawDir, `2025-${locale}.pdf`);
    if (!fs.existsSync(pdfPath)) {
      console.warn(`Skip missing ${pdfPath}`);
      continue;
    }
    const text = (await pdf(fs.readFileSync(pdfPath))).text;
    fs.writeFileSync(path.join(rawDir, `2025-${locale}.txt`), text);
    let qs = parseBilingual2025(text, locale);
    qs = patchFromEnglish(qs, en2025);
    writeJson(`2025-${locale}.json`, qs);
    report(`2025-${locale}`, qs);
  }

  for (const locale of LOCALES_2008) {
    const pdfPath = path.join(rawDir, `2008-${locale}.pdf`);
    if (!fs.existsSync(pdfPath)) {
      console.warn(`Skip missing 2008-${locale}`);
      continue;
    }
    const text = (await pdf(fs.readFileSync(pdfPath))).text;
    fs.writeFileSync(path.join(rawDir, `2008-${locale}.txt`), text);
    let qs = parseBilingual2008(text, locale);
    // If parse collapsed (too few), fall back to English bank labels with EN text
    if (qs.length < 80) {
      console.warn(`Weak 2008-${locale} parse (${qs.length}); using EN fallback`);
      qs = en2008.map((q) => ({
        ...q,
        category: category2008(q.id, locale),
      }));
    } else {
      qs = patchFromEnglish(qs, en2008);
    }
    writeJson(`2008-${locale}.json`, qs);
    report(`2008-${locale}`, qs);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
