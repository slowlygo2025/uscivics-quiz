import fs from "fs";
import path from "path";

const dir = "src/lib/learn-i18n";

/** Localized title + description only for money learn posts */
const copy = {
  fr: {
    "65-20": {
      title:
        "Examen civique 65/20 expliqué : 20 questions étoilées (65 ans + 20 ans LPR)",
      description:
        "65 ans + 20 ans LPR ? Étudiez seulement 20 questions USCIS étoilées — 10 posées, 6 pour réussir. Gratuit · sans inscription · audio · en quelques secondes · 10+ langues.",
    },
    "n-400-filing-date": {
      title:
        "Date de dépôt N-400 : quel examen civique — 2008 ou 2025 ?",
      description:
        "Votre date de dépôt N-400 décide 2008 (100) vs 2025 (128). Gratuit · sans inscription · en quelques secondes — éligibilité + banque officielle avec audio et simulation.",
    },
  },
  zh: {
    "65-20": {
      title: "65/20 公民测验说明：20 道星标题（65 岁 + 20 年 LPR）",
      description:
        "年满 65 且 LPR 满 20 年？只需学习 20 道星标 USCIS 题——问 10 题，需对 6 题。免费 · 无需注册 · 音频 · 几秒开始 · 10+ 语言。",
    },
    "n-400-filing-date": {
      title: "N-400 递交日期：参加 2008 还是 2025 公民测验？",
      description:
        "N-400 递交日期决定 2008（100）或 2025（128）。免费 · 无需注册 · 几秒开始——资格核对 + 官方题库音频与面试模拟。",
    },
  },
  vi: {
    "65-20": {
      title:
        "Giải thích thi công dân 65/20: 20 câu gắn sao (65 tuổi + 20 năm LPR)",
      description:
        "65 tuổi + 20 năm LPR? Chỉ học 20 câu USCIS gắn sao — hỏi 10, cần 6 đúng. Miễn phí · không đăng ký · audio · vài giây · hơn 10 ngôn ngữ.",
    },
    "n-400-filing-date": {
      title: "Ngày nộp N-400: thi công dân 2008 hay 2025?",
      description:
        "Ngày nộp N-400 quyết định 2008 (100) vs 2025 (128). Miễn phí · không đăng ký · vài giây — kiểm tra đủ điều kiện + ngân hàng chính thức với audio và mô phỏng.",
    },
  },
  tl: {
    "65-20": {
      title:
        "65/20 Civics Test Explained: 20 Starred Questions (Age 65 + 20 Years LPR)",
      description:
        "65 + 20 taon LPR? 20 starred USCIS questions lang — 10 tinatanong, 6 para pumasa. Libre · walang sign-up · audio · ilang segundo · 10+ wika.",
    },
    "n-400-filing-date": {
      title: "N-400 Filing Date: Aling Civics Test — 2008 o 2025?",
      description:
        "Ang N-400 filing date ang tumutukoy sa 2008 (100) vs 2025 (128). Libre · walang sign-up · ilang segundo — eligibility + opisyal na bank na may audio at simulation.",
    },
  },
  ar: {
    "65-20": {
      title: "امتحان المدني 65/20: 20 سؤالاً بنجمة (65 عاماً + 20 سنة إقامة)",
      description:
        "65+ و20 سنة إقامة دائمة؟ ادرس فقط 20 سؤالاً بنجمة — يُطرح 10 وتحتاج 6. مجاني · بدون تسجيل · صوت · ثوانٍ · أكثر من 10 لغات.",
    },
    "n-400-filing-date": {
      title: "تاريخ تقديم N-400: أي امتحان مدني — 2008 أم 2025؟",
      description:
        "تاريخ N-400 يحدد 2008 (100) مقابل 2025 (128). مجاني · بدون تسجيل · ثوانٍ — أهلية + بنك رسمي مع صوت ومحاكاة مقابلة.",
    },
  },
  ko: {
    "65-20": {
      title: "65/20 시민권 시험 설명: 별표 20문항 (65세 + LPR 20년)",
      description:
        "65세+ 및 LPR 20년? 별표 20문항만 — 10문항, 6개 정답. 무료 · 가입 없음 · 오디오 · 몇 초 · 10개 이상 언어.",
    },
    "n-400-filing-date": {
      title: "N-400 제출일: 2008 vs 2025 시민권 시험",
      description:
        "N-400 제출일이 2008(100) vs 2025(128)을 결정합니다. 무료 · 가입 없음 · 몇 초 — 자격 확인 + 공식 은행 오디오·면접 시뮬레이션.",
    },
  },
  hi: {
    "65-20": {
      title: "65/20 नागरिक परीक्षा: 20 स्टार प्रश्न (65 वर्ष + 20 वर्ष LPR)",
      description:
        "65+ और 20 वर्ष LPR? केवल 20 स्टार USCIS प्रश्न — 10 पूछे, 6 सही। मुफ़्त · बिना साइन-अप · ऑडियो · सेकंड · 10+ भाषाएँ।",
    },
    "n-400-filing-date": {
      title: "N-400 फाइलिंग दिनांक: 2008 या 2025 नागरिक परीक्षा?",
      description:
        "N-400 दिनांक 2008 (100) बनाम 2025 (128) तय करता है। मुफ़्त · बिना साइन-अप · सेकंड — पात्रता + आधिकारिक बैंक ऑडियो और सिमुलेशन।",
    },
  },
  ru: {
    "65-20": {
      title:
        "Экзамен civics 65/20: 20 вопросов со звёздочкой (65 лет + 20 лет LPR)",
      description:
        "65+ и 20 лет LPR? Только 20 вопросов со звёздочкой — 10 спрашивают, нужно 6. Бесплатно · без регистрации · аудио · секунды · 10+ языков.",
    },
    "n-400-filing-date": {
      title: "Дата подачи N-400: какой экзамен — 2008 или 2025?",
      description:
        "Дата N-400 решает 2008 (100) vs 2025 (128). Бесплатно · без регистрации · секунды — eligibility + официальный банк с аудио и симуляцией.",
    },
  },
  ht: {
    "65-20": {
      title:
        "Egzamen sitwayèn 65/20 eksplike: 20 kesyon zetwal (65 ane + 20 ane LPR)",
      description:
        "65+ ak 20 ane LPR? Etidye sèlman 20 kesyon USCIS zetwal — yo poze 10, ou bezwen 6. Gratis · pa enskripsyon · odyo · segonn · plis pase 10 lang.",
    },
    "n-400-filing-date": {
      title: "Dat depo N-400: ki egzamen sitwayèn — 2008 oswa 2025?",
      description:
        "Dat N-400 deside 2008 (100) vs 2025 (128). Gratis · pa enskripsyon · segonn — elijibilite + bank ofisyèl ak odyo ak simulasyon.",
    },
  },
};

for (const [locale, posts] of Object.entries(copy)) {
  const file = path.join(dir, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const [slug, fields] of Object.entries(posts)) {
    if (!data[slug]) {
      console.error("missing slug", locale, slug);
      continue;
    }
    data[slug].title = fields.title;
    data[slug].description = fields.description;
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log("learn-i18n", locale);
}
