/**
 * Build 2008 Arabic civics bank from official USCIS HTML page.
 * Source: https://www.uscis.gov/civics-questions-and-answers-2008-version-arabic
 *
 * (USAHello bilingual PDF extracts with null bytes / broken RTL — not usable.)
 * Run: node scripts/build-2008-ar.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rawDir = path.join(__dirname, "raw");
const outDir = path.join(__dirname, "..", "src", "data", "questions");

const CAT = {
  gov: "الحكومة الأمريكية",
  hist: "التاريخ الأمريكي",
  civ: "التربية المدنية المتكاملة",
};

function category2008(id) {
  if (id <= 57) return CAT.gov;
  if (id <= 87) return CAT.hist;
  return CAT.civ;
}

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCharCode(parseInt(h, 16))
    );
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, " "));
}

function cleanText(s) {
  return s
    .replace(/\u00A0/g, " ")
    .replace(/^\s*[.\u066B]\s*/u, "")
    .replace(/\s+/g, " ")
    .trim();
}

const SECTION_RE =
  /^(الحكومة الأمريكية|الحكومة األمريكية|أ\s*:|ب\s*:|ج\s*:|أ\.\s*|ب\.\s*|ج\.\s*|التاريخ الأمريكي|التاريخ األمريكي|الرموز الأمريكية|الرموز األمريكية|التكامل|التربية المدنية المتكاملة|مبادئ الديمقراطية|نظام الحكم|الحقوق والواجبات)$/;

function isSection(text) {
  const t = text.replace(/\s+/g, " ").trim();
  if (SECTION_RE.test(t)) return true;
  if (/^[أابج]:/.test(t) && t.length < 80) return true;
  if (/^التاريخ ا/.test(t) && t.length < 40) return true;
  if (/^التربية المدنية المتكاملة$/.test(t)) return true;
  if (/^الرموز ا/.test(t) && t.length < 40) return true;
  return false;
}

function looksLikeQuestion(text) {
  if (/[؟?]/.test(text)) return true;
  if (/^(ما |من |كم |ماذا |لماذا |متى |أين |اذكر |ا ذكر |صف |كيف |أي |هل |إذا |بموجب |هناك |كانت |أيدت |كان )/u.test(text))
    return true;
  return false;
}

function isAnswerContinuation(text, prevAnswer) {
  if (!prevAnswer) return false;
  if (/[؟?]/.test(text)) return false;
  if (/^(ما |من |كم |ماذا |لماذا |متى |أين |اذكر |صف |كيف |أي |هل )/u.test(text))
    return false;
  // Long parenthetical spill from previous answer
  if (/^[(\[]/.test(text) || /]\.?$/.test(text)) return true;
  if (text.length < 120 && !/^[■•]/.test(text)) {
    // mid-sentence continuation
    if (/^(أو |كذلك |وسكان |\(أو )/u.test(text)) return true;
  }
  return false;
}

function parseHtml(html) {
  const marker = "ما هو القانون";
  const markerAt = html.indexOf(marker);
  if (markerAt < 0) throw new Error("Could not find first question in HTML");

  // Back up to the opening <p> so the first question paragraph is complete
  const pOpen = html.lastIndexOf("<p", markerAt);
  const start = pOpen >= 0 ? pOpen : markerAt;

  const endMarkers = [
    "إذا كان عمرك 65",
    "Last Reviewed",
    "Was this page helpful",
  ];
  let end = html.length;
  for (const m of endMarkers) {
    const i = html.indexOf(m, start);
    if (i > 0 && i < end) end = i;
  }
  const chunk = html.slice(start, end);

  const paras = [
    ...chunk.matchAll(/<(?:p|h2|h3)\b[^>]*>([\s\S]*?)<\/(?:p|h2|h3)>/gi),
  ].map((m) => cleanText(stripTags(m[1])));

  const questions = [];
  let current = null;

  for (const raw of paras) {
    if (!raw) continue;
    if (isSection(raw)) continue;

    if (raw.startsWith("■") || raw.startsWith("•")) {
      if (!current) continue;
      const ans = cleanText(raw.replace(/^[■•]\s*/, ""));
      if (ans) current.answers.push(ans);
      continue;
    }

    if (current && isAnswerContinuation(raw, current.answers.at(-1))) {
      current.answers[current.answers.length - 1] = cleanText(
        `${current.answers.at(-1)} ${raw}`
      );
      continue;
    }

    // New question
    if (current && current.answers.length === 0 && !looksLikeQuestion(raw)) {
      // orphan text after a question with no answers yet — treat as answer
      current.answers.push(raw);
      continue;
    }

    if (current) questions.push(current);
    current = {
      question: raw.replace(/\bا ذكر\b/g, "اذكر").replace(/\bم ا\b/g, "ما"),
      answers: [],
      seniorMark: /\*/.test(raw),
    };
  }
  if (current) questions.push(current);

  return questions;
}

function normalizeArabicPresentation(s) {
  return s
    .replace(/ا\s+ذكر/g, "اذكر")
    .replace(/م\s+ا\s+/g, "ما ")
    .replace(/^م\s+ا\b/g, "ما")
    .replace(/\s+([؟?!.،,])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

async function main() {
  const htmlPath = path.join(rawDir, "2008-ar-uscis.html");
  if (!fs.existsSync(htmlPath)) {
    console.error("Missing", htmlPath, "— download the USCIS Arabic page first.");
    process.exit(1);
  }
  const html = fs.readFileSync(htmlPath, "utf8");
  const en = JSON.parse(
    fs.readFileSync(path.join(outDir, "2008-en.json"), "utf8")
  );
  const seniorIds = new Set(en.filter((q) => q.senior).map((q) => q.id));

  let parsed = parseHtml(html).filter((q) => {
    if (isSection(q.question) && q.answers.length === 0) return false;
    if (!looksLikeQuestion(q.question) && q.answers.length === 0) return false;
    return true;
  });

  // Merge non-question blocks (answer spill without ■) into previous answers
  const compacted = [];
  for (const q of parsed) {
    if (
      compacted.length &&
      !looksLikeQuestion(q.question) &&
      q.answers.length > 0
    ) {
      const prev = compacted[compacted.length - 1];
      prev.answers.push(q.question, ...q.answers);
      continue;
    }
    if (
      compacted.length &&
      !looksLikeQuestion(q.question) &&
      q.answers.length === 0
    ) {
      const prev = compacted[compacted.length - 1];
      if (prev.answers.length) {
        prev.answers[prev.answers.length - 1] = cleanText(
          `${prev.answers.at(-1)} ${q.question}`
        );
      } else {
        prev.answers.push(q.question);
      }
      continue;
    }
    compacted.push(q);
  }
  parsed = compacted;

  console.log(`Parsed ${parsed.length} question blocks from HTML`);

  if (parsed.length !== 100) {
    console.warn(`Expected 100, got ${parsed.length}`);
    parsed.forEach((q, i) =>
      console.log(
        String(i + 1).padStart(3),
        q.answers.length,
        q.question.slice(0, 70)
      )
    );
  }

  // Drop the previous broken merge block — alignment is 1:1 when count is 100
  void 0;

  // If still short, leave gaps filled from EN (should be rare)
  const out = [];
  for (let id = 1; id <= 100; id++) {
    const ar = parsed[id - 1];
    const enQ = en.find((q) => q.id === id);
    if (!ar || !ar.question || ar.answers.length === 0) {
      console.warn(`Fallback EN for Q${id}`);
      out.push({
        id,
        category: category2008(id),
        question: ar?.question || enQ.question,
        answers: ar?.answers?.length ? ar.answers : enQ.answers,
        ...(seniorIds.has(id) ? { senior: true } : {}),
      });
      continue;
    }
    out.push({
      id,
      category: category2008(id),
      question: normalizeArabicPresentation(
        ar.question
          .replace(/\*/g, "")
          .replace(/\bا ذكر\b/g, "اذكر")
          .replace(/\bم ا\b/g, "ما")
          .trim()
      ),
      answers: ar.answers.map((a) =>
        normalizeArabicPresentation(a.replace(/\*/g, "").trim())
      ),
      ...(seniorIds.has(id) ? { senior: true } : {}),
    });
  }

  // Add Juneteenth if Q100 answers miss it but EN has it
  const q100 = out[99];
  if (
    q100 &&
    !q100.answers.some((a) => /جونتينث|Juneteenth|الحرية/i.test(a))
  ) {
    q100.answers.splice(5, 0, "يوم الحرية/اليوبيل (جونتينث)");
  }

  const outPath = path.join(outDir, "2008-ar.json");
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");

  const arabicQs = out.filter((q) => /[\u0600-\u06FF]/.test(q.question)).length;
  const empty = out.filter((q) => !q.answers.length).length;
  console.log(
    `Wrote 2008-ar.json — ${out.length} Qs, ${arabicQs} Arabic questions, ${empty} empty answers, ${seniorIds.size} senior*`
  );
  for (const id of [1, 2, 6, 20, 21, 44, 95, 100]) {
    const q = out[id - 1];
    console.log(
      `Q${id}: ${q.question.slice(0, 60)} → [${q.answers.slice(0, 3).join(" | ")}]`
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
