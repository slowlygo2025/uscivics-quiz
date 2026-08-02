/**
 * Build 2025 Arabic question bank from USAHello bilingual PDF text.
 * Arabic numerals often lack a proper "N." prefix (e.g. "٣٨ ما." / "٥٩اذكر." / "١٢٤-").
 *
 * Run: node scripts/build-2025-ar.mjs
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

const CAT = {
  gov: "الحكومة الأمريكية",
  hist: "التاريخ الأمريكي",
  sym: "الرموز والعطل",
};

function category2025(id) {
  if (id <= 75) return CAT.gov;
  if (id <= 118) return CAT.hist;
  return CAT.sym;
}

const ARABIC_INDIC = "٠١٢٣٤٥٦٧٨٩";

function toWesternDigits(s) {
  return s.replace(/[٠-٩]/g, (d) => String(ARABIC_INDIC.indexOf(d)));
}

function toArabicDigits(n) {
  return String(n)
    .split("")
    .map((d) => ARABIC_INDIC[+d])
    .join("");
}

function looksEnglish(block) {
  const body = block
    .replace(/^\s*[0-9٠-٩]{1,3}[\.．\-]?\s*/, "")
    .trim();
  return /^(What |Name |Who |How |Why |When |Where |The |There |Under |During |Before |If |Many |Some |Which |Define |Describe |It is |Supreme |Benjamin |George |Thomas |James |Alexander |Abraham |Dwight |Martin |The Nation)/i.test(
    body
  );
}

function hasArabic(s) {
  return /[\u0600-\u06FF]/.test(s);
}

function collectStarts(text) {
  const starts = [];
  // Flexible: 38. / ٣٨. / ٣٨ / ٣٨- / ٥٩اذكر.
  const re =
    /(?:^|\n)\s*([0-9٠-٩]{1,3})(?:[\.．\-]\s*|\s+(?=[\u0600-\u06FF])|(?=[\u0600-\u06FF]))/g;
  let m;
  while ((m = re.exec(text))) {
    const n = Number(toWesternDigits(m[1]));
    if (n < 1 || n > 128) continue;
    const index = m.index + (m[0].startsWith("\n") ? 1 : 0);
    starts.push({ n, index });
  }
  // Dedupe same n+index
  const seen = new Set();
  return starts.filter((s) => {
    const k = `${s.n}@${s.index}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function pickArabicCandidate(candidates, text) {
  if (!candidates.length) return null;
  const scored = candidates.map((c) => {
    const preview = text.slice(c.index, c.index + 160);
    return {
      c,
      arabic: hasArabic(preview),
      english: looksEnglish(preview),
    };
  });
  return (
    scored.find((s) => s.arabic && !s.english) ||
    scored.find((s) => s.arabic) ||
    scored.find((s) => !s.english) ||
    scored[scored.length - 1]
  ).c;
}

function cleanQuestion(s) {
  return s
    .replace(/\*/g, "")
    .replace(/USAHello[^\n]*/gi, "")
    .replace(/128 Civics[^\n]*/gi, "")
    .replace(/\w+ Translation[^\n]*/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractAnswers(answerPart) {
  const answers = [];
  for (const part of answerPart
    .split(/•/)
    .map((s) => s.trim())
    .filter(Boolean)) {
    let a = part
      .split(/\n\s*(?:[0-9٠-٩]{1,3})(?:[\.．\-]|\s)/)[0]
      .replace(/\*/g, "")
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // Join broken tanween / short glyphs left as separate lines already flattened
    a = a
      .replace(
        /\s+(AMERICAN|SYMBOLS|A:|B:|C:|65\/20|USAHello|128 Civics|100 Civics|Principles of|System of|Rights and|National Holidays|American History|American Symbols|Contents|M-1778|التاریخ|الرموز|الأعیاد).*$/i,
        ""
      )
      .trim();

    if (!a || a.length > 500) continue;
    // Drop pure English answers when Arabic bank
    if (/^[A-Za-z0-9(“”"'.,\-\s)]+$/.test(a) && a.length > 3) {
      // keep uscis URLs / Visit lines in Arabic context as Arabic visit instruction preferred
      if (/^Visit /i.test(a)) continue;
    }
    answers.push(a);
  }
  return answers;
}

function parse2025Arabic(text) {
  text = text.replace(/\r/g, "").replace(/[▪]/g, "•");
  const start = text.search(/\n1\.\s+What is the form of government/);
  const sliced = start >= 0 ? text.slice(start) : text;
  const starts = collectStarts(sliced);

  const questions = [];
  for (let n = 1; n <= 128; n++) {
    const candidates = starts.filter((s) => s.n === n);
    const locCand = pickArabicCandidate(candidates, sliced);
    if (!locCand) {
      console.warn(`Missing 2025-ar Q${n}`);
      continue;
    }

    const next = starts.find((s) => s.index > locCand.index);
    let block = sliced.slice(locCand.index, next ? next.index : sliced.length);

    // Strip number prefix (flexible)
    block = block.replace(
      /^\s*[0-9٠-٩]{1,3}(?:[\.．\-]\s*|\s*)/,
      ""
    );

    // Cut at following English question if present inside block
    const enBreak = block.search(
      /\n\s*(?:[0-9٠-٩]{1,3})[\.．]\s+(?:What |Name |Who |How |Why |When |Where |The |There |Under |During |Before |If |Many |Some |Which |It is |Supreme |Benjamin |George |Thomas |James |Alexander |Abraham |Dwight |Martin )/
    );
    if (enBreak > 0) block = block.slice(0, enBreak);

    block = block
      .replace(/USAHello[^\n]*/g, "")
      .replace(/128 Civics Questions[^\n]*/g, "")
      .replace(/\w+ Translation[^\n]*/g, "");

    const bulletIdx = block.search(/•/);
    let questionPart = bulletIdx === -1 ? block : block.slice(0, bulletIdx);
    let answerPart = bulletIdx === -1 ? "" : block.slice(bulletIdx);
    const senior = /\*/.test(questionPart) || /\*\s*•/.test(block.slice(0, 300));

    // Some ZIP/varying answers have no bullet — answer starts with سوف تتباین
    if (!answerPart) {
      const vary = questionPart.search(/سوف تتبا[يی]ن/);
      if (vary > 0) {
        answerPart = "• " + questionPart.slice(vary);
        questionPart = questionPart.slice(0, vary);
      }
    }

    let question = cleanQuestion(questionPart);
    // Drop trailing English leftovers
    question = question
      .replace(/\s+(What |Who |How |Name |The |Visit ).*$/i, "")
      .trim();

    // Fix common RTL/PDF number artifacts: "ما." / "من." / "إلى." / "اذكر."
    question = question
      .replace(/^(ما|من|إلى|اذكر)\.\s*/u, "$1 ")
      .replace(/مدى\s*؟\s*\.?الحیاة/gu, "مدى الحياة؟")
      .replace(/\s+؟\./g, "؟")
      .replace(/؟\.(\S)/g, " $1؟")
      .replace(/\s{2,}/g, " ")
      .trim();

    const answers = extractAnswers(answerPart);

    questions.push({
      id: n,
      category: category2025(n),
      question,
      answers,
      ...(senior ? { senior: true } : {}),
    });
  }
  return questions;
}

async function main() {
  const pdfPath = path.join(rawDir, "2025-ar.pdf");
  if (!fs.existsSync(pdfPath)) {
    console.error("Missing", pdfPath);
    process.exit(1);
  }

  const text = (await pdf(fs.readFileSync(pdfPath))).text;
  fs.writeFileSync(path.join(rawDir, "2025-ar.txt"), text, "utf8");

  const en = JSON.parse(
    fs.readFileSync(path.join(outDir, "2025-en.json"), "utf8")
  );
  const seniorIds = new Set(en.filter((q) => q.senior).map((q) => q.id));

  let qs = parse2025Arabic(text);
  const byId = new Map(qs.map((q) => [q.id, q]));

  const out = [];
  for (let id = 1; id <= 128; id++) {
    const ar = byId.get(id);
    const enQ = en.find((q) => q.id === id);
    const question =
      ar?.question && hasArabic(ar.question) ? ar.question : enQ.question;
    const answers =
      ar?.answers?.length && ar.answers.some(hasArabic)
        ? ar.answers
        : ar?.answers?.length
          ? ar.answers
          : enQ.answers;

    if (!ar?.question || !hasArabic(ar.question)) {
      console.warn(`EN question fallback Q${id}`);
    } else if (!ar.answers?.length) {
      console.warn(`EN answers fallback Q${id}`);
    }

    out.push({
      id,
      category: category2025(id),
      question,
      answers,
      ...(seniorIds.has(id) || ar?.senior ? { senior: true } : {}),
    });
  }

  const outPath = path.join(outDir, "2025-ar.json");
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");

  const arabicQ = out.filter((q) => hasArabic(q.question)).length;
  const arabicA = out.filter((q) => q.answers.some(hasArabic)).length;
  const empty = out.filter((q) => !q.answers.length).length;
  console.log(
    `Wrote 2025-ar.json — ${out.length} Qs, arabic questions ${arabicQ}/128, arabic answers ${arabicA}/128, empty ${empty}`
  );
  for (const id of [1, 38, 56, 59, 74, 95, 124, 128]) {
    const q = out[id - 1];
    console.log(
      `Q${id}: ${q.question.slice(0, 70)} → [${q.answers
        .slice(0, 2)
        .join(" | ")}]`
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
