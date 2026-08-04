import fs from "fs";
import path from "path";

const homes = {
  es: "Volver al inicio",
  zh: "返回首页",
  vi: "Về trang chủ",
  tl: "Bumalik sa home",
  ar: "العودة للرئيسية",
  ko: "홈으로",
  hi: "होम पर जाएँ",
  ru: "На главную",
  ht: "Tounen lakay",
  fr: "Retour à l'accueil",
};

const dir = "src/lib/dict";
for (const [locale, home] of Object.entries(homes)) {
  const p = path.join(dir, `${locale}.ts`);
  let s = fs.readFileSync(p, "utf8");
  const next = s.replace(
    /notFoundHome:\s*,\s*\n\s*navUpdates:/,
    `notFoundHome: ${JSON.stringify(home)},\n  navUpdates:`
  );
  if (next === s) {
    console.log("unchanged?", locale, /notFoundHome:\s*,/.test(s));
  } else {
    fs.writeFileSync(p, next);
    console.log("fixed", locale);
  }
}
