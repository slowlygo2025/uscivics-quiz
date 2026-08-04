import fs from "fs";
import path from "path";

const map = {
  es: "Saltar al contenido principal",
  zh: "跳到主要内容",
  vi: "Chuyển tới nội dung chính",
  tl: "Laktawan papunta sa pangunahing nilalaman",
  ar: "انتقل إلى المحتوى الرئيسي",
  ko: "본문으로 건너뛰기",
  hi: "मुख्य सामग्री पर जाएँ",
  ru: "Перейти к основному содержанию",
  ht: "Ale nan kontni prensipal la",
  fr: "Aller au contenu principal",
};

for (const [locale, text] of Object.entries(map)) {
  const p = path.join("src/lib/dict", `${locale}.ts`);
  let s = fs.readFileSync(p, "utf8");
  if (s.includes("skipToContent:")) continue;
  s = s.replace(
    /(\s+)(linkUpdates:)/,
    `$1skipToContent: ${JSON.stringify(text)},\n$1$2`
  );
  // fallback if linkUpdates order differs — insert after accountUnavailable
  if (!s.includes("skipToContent:")) {
    s = s.replace(
      /(accountUnavailable: [^\n]+\n)/,
      `$1  skipToContent: ${JSON.stringify(text)},\n`
    );
  }
  fs.writeFileSync(p, s);
  console.log(locale);
}
