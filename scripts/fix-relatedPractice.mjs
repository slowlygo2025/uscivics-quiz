import fs from "node:fs";
import path from "node:path";

const practice = {
  en: "Practice",
  es: "Práctica",
  zh: "练习",
  vi: "Luyện tập",
  tl: "Practice",
  ar: "تدريب",
  ko: "연습",
  hi: "अभ्यास",
  ru: "Практика",
  ht: "Pratik",
  fr: "Pratique",
};

for (const [loc, label] of Object.entries(practice)) {
  const p = path.join("src/lib/dict", `${loc}.ts`);
  let s = fs.readFileSync(p, "utf8");
  s = s.replace(
    /relatedPractice:\s*\n(\s*)premiumWaitlistTitle/,
    `relatedPractice: ${JSON.stringify(label)},\n$1premiumWaitlistTitle`
  );
  fs.writeFileSync(p, s);
  const ok = s.includes(`relatedPractice: ${JSON.stringify(label)}`);
  console.log(loc, ok ? "fixed" : "CHECK");
}
