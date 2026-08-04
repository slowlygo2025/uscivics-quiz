/**
 * Apply content-cluster strategy: which-civics-test hub + reinforce money guides.
 * Run: node scripts/patch-learn-content-cluster.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "src/lib/learn-i18n");

const whichEn = {
  title: "Which Civics Test Do I Take? 2008, 2025, or 65/20",
  description:
    "One page to pick the right USCIS civics bank before you study — N-400 filing date (2008 vs 2025), 65/20 senior path, free eligibility check, audio, and interview simulation. No sign-up.",
  sections: [
    {
      heading: "Start here — do not guess the bank",
      body: "Studying the wrong list is the most expensive mistake in civics prep. Your Form N-400 filing date decides 2008 (100 questions) vs 2025 (128 questions). Age 65+ with 20 years as a permanent resident may qualify for the 65/20 starred set. Confirm before flashcards.",
    },
    {
      heading: "Path A — N-400 filing date (most applicants)",
      body: "Filed before October 20, 2025 → 2008 test (up to 10 asked, need 6). Filed on or after that date → 2025 test (up to 20 asked, need 12). Use our N-400 filing date guide, then practice the matching bank with audio and simulation.",
    },
    {
      heading: "Path B — 65/20 special consideration",
      body: "If you are 65 or older and have been a lawful permanent resident for 20+ years, USCIS may ask from a smaller starred bank (need 6 of up to 10). Language-of-choice rules can apply. See our 65/20 guide and senior practice list.",
    },
    {
      heading: "60-second check, then practice",
      body: "Run Find my test version (free, no account). Then open practice for 2008 or 2025 — or senior mode — and start in seconds. Pair civics with English reading and writing unless you are exempt.",
    },
  ],
};

const whichEs = {
  title: "¿Qué examen cívico me toca? 2008, 2025 o 65/20",
  description:
    "Una página para elegir el banco correcto de USCIS antes de estudiar — fecha de N-400 (2008 vs 2025), ruta 65/20, elegibilidad gratis, audio y simulación. Sin registro.",
  sections: [
    {
      heading: "Empezá acá — no adivines el banco",
      body: "Estudiar la lista equivocada es el error más caro. La fecha de presentación del N-400 decide 2008 (100) vs 2025 (128). Con 65+ y 20 años como residente permanente podés calificar para el set 65/20. Confirmá antes de las flashcards.",
    },
    {
      heading: "Ruta A — fecha de N-400 (mayoría)",
      body: "Presentaste antes del 20 oct 2025 → examen 2008 (hasta 10, necesitás 6). Ese día o después → 2025 (hasta 20, necesitás 12). Usá la guía de fecha de N-400 y practicá el banco que te corresponde con audio y simulación.",
    },
    {
      heading: "Ruta B — consideración 65/20",
      body: "Si tenés 65+ y 20+ años como residente permanente, USCIS puede preguntar de un banco marcado más chico (6 de hasta 10). Puede aplicar idioma de elección. Mirá la guía 65/20 y la práctica senior.",
    },
    {
      heading: "Chequeo de 60 segundos y a practicar",
      body: "Usá Encontrar mi versión (gratis, sin cuenta). Abrí práctica 2008 o 2025 — o modo senior — y empezá en segundos. Sumá reading/writing en inglés si no estás exento.",
    },
  ],
};

const whichTitles = {
  zh: {
    title: "我该考哪套公民测验？2008、2025 还是 65/20",
    description:
      "先选对 USCIS 题库再学习——N-400 递交日期（2008 vs 2025）、65/20 老年路径、免费资格检查、音频与面试模拟。无需注册。",
  },
  vi: {
    title: "Tôi thi bộ câu hỏi công dân nào? 2008, 2025 hay 65/20",
    description:
      "Một trang để chọn đúng ngân hàng USCIS trước khi học — ngày nộp N-400 (2008 vs 2025), lộ trình 65/20, kiểm tra đủ điều kiện miễn phí, audio và mô phỏng phỏng vấn. Không cần đăng ký.",
  },
  tl: {
    title: "Aling civics test ang kukunin ko? 2008, 2025, o 65/20",
    description:
      "Isang page para piliin ang tamang USCIS bank bago mag-aral — N-400 filing date (2008 vs 2025), 65/20 path, libreng eligibility, audio, at interview simulation. Walang sign-up.",
  },
  ar: {
    title: "أي اختبار مدني أقدّم؟ 2008 أو 2025 أو 65/20",
    description:
      "صفحة واحدة لاختيار بنك أسئلة USCIS الصحيح قبل الدراسة — تاريخ تقديم N-400 (2008 مقابل 2025) ومسار 65/20 وفحص أهلية مجاني وصوت ومحاكاة مقابلة. بدون تسجيل.",
  },
  ko: {
    title: "어떤 시민권 시험을 보나요? 2008, 2025, 또는 65/20",
    description:
      "공부 전에 올바른 USCIS 문제 은행을 고르는 한 페이지 — N-400 제출일(2008 vs 2025), 65/20 경로, 무료 적격 확인, 오디오, 면접 시뮬레이션. 가입 없음.",
  },
  hi: {
    title: "मुझे कौन-सा नागरिक परीक्षा देनी है? 2008, 2025 या 65/20",
    description:
      "पढ़ाई से पहले सही USCIS बैंक चुनें — N-400 फाइलिंग तारीख (2008 बनाम 2025), 65/20 मार्ग, मुफ़्त पात्रता जाँच, ऑडियो और इंटरव्यू सिमुलेशन। साइन-अप नहीं।",
  },
  ru: {
    title: "Какой civics-тест сдавать? 2008, 2025 или 65/20",
    description:
      "Одна страница, чтобы выбрать нужный банк USCIS до учёбы — дата подачи N-400 (2008 vs 2025), путь 65/20, бесплатная проверка, аудио и симуляция интервью. Без регистрации.",
  },
  ht: {
    title: "Ki tès sitwayèn mwen pran? 2008, 2025, oswa 65/20",
    description:
      "Yon paj pou chwazi bon bank USCIS anvan ou etidye — dat depo N-400 (2008 vs 2025), chemen 65/20, tcheke kalifikasyon gratis, odyo ak simulasyon entèvyou. Pa gen enskripsyon.",
  },
  fr: {
    title: "Quel test de civisme passer ? 2008, 2025 ou 65/20",
    description:
      "Une page pour choisir la bonne banque USCIS avant d’étudier — date de dépôt N-400 (2008 vs 2025), parcours 65/20, éligibilité gratuite, audio et simulation d’entretien. Sans inscription.",
  },
};

const reinforceEn = {
  "fail-citizenship-test": {
    title: "What Happens If You Fail the Citizenship Civics or English Test?",
    description:
      "Failed English or civics at the interview? What usually happens next, how to pick the right bank (2008 / 2025 / 65/20), and free retest prep with audio and simulation — no sign-up.",
    sections: [
      {
        heading: "You usually get another chance",
        body: "If you fail the English or civics portion, USCIS generally gives you another opportunity to take the failed portion. Exact timing follows current USCIS policy for your case — this site is not legal advice.",
      },
      {
        heading: "Confirm the bank before you restart",
        body: "Retest prep fails when you study the wrong list. Check N-400 filing date (2008 vs 2025) or 65/20 eligibility first, then practice only that bank.",
      },
      {
        heading: "Use the wait wisely",
        body: "Daily short sessions beat last-minute cramming. Focus on what you missed: civics, reading, writing, or speaking. Start free practice in seconds — no account.",
      },
      {
        heading: "Civics retest prep",
        body: "Drill weak questions and changing officials. Run interview simulations until you clear 6/10 or 12/20 with room to spare. Hear questions aloud in English.",
      },
      {
        heading: "English retest prep",
        body: "Use official reading and writing vocabulary with audio. For speaking, answer application questions clearly. Pair with our English practice pages.",
      },
    ],
  },
  "30-day-study-plan": {
    title: "30-Day Study Plan for the U.S. Citizenship Civics Test",
    description:
      "A 30-day civics plan that starts with the right bank (filing date or 65/20), then daily drills, oral practice, and interview simulation week — free, no sign-up, 10+ languages.",
    sections: [
      {
        heading: "Day 1–2: Confirm your version",
        body: "Use Find my test version or the which-test guide. Filing Form N-400 before vs on/after October 20, 2025 decides 2008 (100 Q) vs 2025 (128 Q). Wrong bank wastes the whole month.",
      },
      {
        heading: "Day 3–14: Cover the bank",
        body: "Study 15–25 minutes daily with flashcards and topic drills. Mark weak items. Hear English questions aloud even if you also study in another language — interview civics is oral in English unless an exception applies.",
      },
      {
        heading: "Day 15–24: Fix weak spots + changing answers",
        body: "Use smart review. Recheck President, senators, representative, governor, and capital with ZIP lookup. Drill dates and names if those trip you up.",
      },
      {
        heading: "Day 25–30: Simulate interview week",
        body: "Run full interview simulations daily until you consistently pass (6/10 or 12/20). Add English reading/writing sessions. Sleep well before the appointment.",
      },
    ],
  },
  "reading-writing-tips": {
    title: "USCIS English Reading and Writing Test — Free Practice Tips",
    description:
      "How naturalization English reading and writing work, official vocabulary practice, and free sentence drills with audio — plus how to pair them with the right civics bank. No sign-up.",
    sections: [
      {
        heading: "What you must show",
        body: "Unless exempt, you must demonstrate basic English: speaking during the interview, reading one sentence correctly, and writing one sentence correctly (from small sets of attempts).",
      },
      {
        heading: "Stick to official vocabulary",
        body: "Reading and writing use USCIS vocabulary lists. Random English apps help less than sentences built from those words — people, civics terms, places, holidays, and common verbs.",
      },
      {
        heading: "Practice method",
        body: "Hear the sentence, read it aloud, then write it from dictation. Check spelling. Repeat missed sentences the next day.",
      },
      {
        heading: "Same day as civics — right bank first",
        body: "English reading/writing did not change with the 2025 civics update, but your civics bank still depends on N-400 filing date or 65/20. Confirm the civics version, then open English practice here for free.",
      },
      {
        heading: "Practice here for free",
        body: "Open our English reading and writing pages. Combine with civics speak mode and interview simulation so the whole interview feels familiar — start in seconds, no account.",
      },
    ],
  },
};

const reinforceEs = {
  "fail-citizenship-test": {
    title: "¿Qué pasa si reprobás el examen cívico o de inglés?",
    description:
      "¿Reprobaste inglés o civismo en la entrevista? Qué suele pasar después, cómo elegir el banco correcto (2008 / 2025 / 65/20) y práctica gratis con audio y simulación — sin registro.",
    sections: [
      {
        heading: "Por lo general hay otra chance",
        body: "Si reprobás inglés o civismo, USCIS suele dar otra oportunidad para la parte fallida. Los plazos siguen la política vigente de tu caso — esto no es asesoría legal.",
      },
      {
        heading: "Confirmá el banco antes de reiniciar",
        body: "La preparación falla si estudiás la lista equivocada. Revisá fecha de N-400 (2008 vs 2025) o elegibilidad 65/20 primero, y practicá solo ese banco.",
      },
      {
        heading: "Usá la espera con inteligencia",
        body: "Sesiones cortas diarias ganan al estudio de último momento. Enfocate en lo que fallaste. Empezá práctica gratis en segundos — sin cuenta.",
      },
      {
        heading: "Prep civismo para el retest",
        body: "Repasí preguntas débiles y funcionarios que cambian. Corré simulaciones hasta superar 6/10 o 12/20 con margen. Escuchá las preguntas en inglés.",
      },
      {
        heading: "Prep inglés para el retest",
        body: "Usá vocabulario oficial de reading/writing con audio. Para speaking, respondé con claridad. Combiná con nuestras páginas de inglés.",
      },
    ],
  },
  "30-day-study-plan": {
    title: "Plan de estudio de 30 días para el examen cívico de EE.UU.",
    description:
      "Plan de 30 días que empieza por el banco correcto (fecha de filing o 65/20), luego drills diarios, práctica oral y semana de simulación — gratis, sin registro, 10+ idiomas.",
    sections: [
      {
        heading: "Día 1–2: Confirmá tu versión",
        body: "Usá Encontrar mi versión o la guía de qué examen te toca. La fecha del N-400 decide 2008 (100) vs 2025 (128). El banco equivocado desperdicia el mes.",
      },
      {
        heading: "Día 3–14: Cubrir el banco",
        body: "15–25 minutos diarios con flashcards y temas. Marcá lo débil. Escuchá las preguntas en inglés aunque también estudies en otro idioma.",
      },
      {
        heading: "Día 15–24: Debilidades + respuestas que cambian",
        body: "Usá repaso inteligente. Rechequeá Presidente, senadores, representante, gobernador y capital con ZIP. Drill de fechas y nombres si te traban.",
      },
      {
        heading: "Día 25–30: Semana de simulación",
        body: "Simulaciones diarias hasta aprobar de forma consistente (6/10 o 12/20). Sumá reading/writing. Dormí bien antes de la cita.",
      },
    ],
  },
  "reading-writing-tips": {
    title: "Examen de inglés USCIS (lectura y escritura) — tips gratis",
    description:
      "Cómo funcionan reading y writing en la naturalización, vocabulario oficial y oraciones gratis con audio — y cómo combinarlos con el banco cívico correcto. Sin registro.",
    sections: [
      {
        heading: "Qué tenés que demostrar",
        body: "Salvo exención, demostrás inglés básico: speaking en la entrevista, leer una oración bien y escribir una oración bien (con pocos intentos).",
      },
      {
        heading: "Quedate en el vocabulario oficial",
        body: "Reading y writing usan listas USCIS. Apps de inglés genéricas ayudan menos que oraciones con esas palabras.",
      },
      {
        heading: "Método de práctica",
        body: "Escuchá la oración, leela en voz alta, escribila al dictado. Revisá ortografía. Repetí al día siguiente las que fallaste.",
      },
      {
        heading: "Mismo día que civismo — primero el banco",
        body: "Reading/writing no cambiaron con el update 2025 del civismo, pero tu banco cívico sí depende del N-400 o 65/20. Confirmá la versión y practicá inglés acá gratis.",
      },
      {
        heading: "Practicá acá gratis",
        body: "Abrí reading y writing. Combiná con speak mode y simulación de entrevista — empezá en segundos, sin cuenta.",
      },
    ],
  },
};

const reinforceTitles = {
  zh: {
    "fail-citizenship-test": {
      title: "公民测验或英语未通过会怎样？",
      description:
        "面试英语或公民题未过？接下来通常怎样、如何选对题库（2008/2025/65/20），以及免费音频与模拟重考练习——无需注册。",
    },
    "30-day-study-plan": {
      title: "美国公民测验 30 天学习计划",
      description:
        "先确认正确题库（递交日或 65/20），再每日练习、口语与模拟周——免费、无需注册、10+ 语言。",
    },
    "reading-writing-tips": {
      title: "USCIS 英语读写测验 — 免费练习要点",
      description:
        "归化英语读写如何考、官方词汇练习，以及免费听写句子——并与正确公民题库搭配。无需注册。",
    },
  },
  vi: {
    "fail-citizenship-test": {
      title: "Trượt phần công dân hoặc tiếng Anh thì sao?",
      description:
        "Trượt tiếng Anh hoặc civics khi phỏng vấn? Thường xảy ra gì tiếp, cách chọn đúng ngân hàng (2008/2025/65/20) và luyện thi lại miễn phí với audio/mô phỏng — không đăng ký.",
    },
    "30-day-study-plan": {
      title: "Kế hoạch học 30 ngày cho bài thi công dân Mỹ",
      description:
        "Kế hoạch 30 ngày bắt đầu bằng đúng ngân hàng (ngày nộp hoặc 65/20), rồi luyện hàng ngày và tuần mô phỏng — miễn phí, không đăng ký, 10+ ngôn ngữ.",
    },
    "reading-writing-tips": {
      title: "Thi đọc-viết tiếng Anh USCIS — mẹo luyện miễn phí",
      description:
        "Cách hoạt động của reading/writing khi nhập tịch, luyện từ vựng chính thức và câu miễn phí có audio — kèm đúng ngân hàng civics. Không đăng ký.",
    },
  },
  tl: {
    "fail-citizenship-test": {
      title: "Ano ang mangyayari kung bagsak sa civics o English test?",
      description:
        "Bagsak sa English o civics sa interview? Ano ang sunod, paano piliin ang tamang bank (2008/2025/65/20), at libreng retest prep na may audio at simulation — walang sign-up.",
    },
    "30-day-study-plan": {
      title: "30-araw na study plan para sa US civics test",
      description:
        "30-araw na plano na nagsisimula sa tamang bank (filing date o 65/20), tapos daily drills at simulation week — libre, walang sign-up, 10+ languages.",
    },
    "reading-writing-tips": {
      title: "USCIS English reading at writing — libreng tips",
      description:
        "Paano gumagana ang reading/writing sa naturalization, official vocabulary, at libreng sentence drills with audio — kasama ang tamang civics bank. Walang sign-up.",
    },
  },
  ar: {
    "fail-citizenship-test": {
      title: "ماذا يحدث إذا رسبت في اختبار المدني أو الإنجليزية؟",
      description:
        "رسبت في الإنجليزية أو المدني بالمقابلة؟ ما الذي يحدث عادةً، وكيف تختار البنك الصحيح (2008/2025/65/20)، وتمارين إعادة مجانية بالصوت والمحاكاة — بدون تسجيل.",
    },
    "30-day-study-plan": {
      title: "خطة دراسة 30 يومًا لاختبار المدني الأمريكي",
      description:
        "خطة 30 يومًا تبدأ بالبنك الصحيح (تاريخ التقديم أو 65/20) ثم تمارين يومية وأسبوع محاكاة — مجانًا وبدون تسجيل وبأكثر من 10 لغات.",
    },
    "reading-writing-tips": {
      title: "اختبار الإنجليزية USCIS قراءة وكتابة — نصائح مجانية",
      description:
        "كيف تعمل القراءة والكتابة في التجنّس وتمارين المفردات الرسمية وجمل مجانية بالصوت — مع البنك المدني الصحيح. بدون تسجيل.",
    },
  },
  ko: {
    "fail-citizenship-test": {
      title: "시민권 시빅스 또는 영어 시험에 떨어지면?",
      description:
        "면접에서 영어/시빅스 불합격 시 보통 어떻게 되는지, 올바른 문제은행(2008/2025/65/20) 선택, 오디오·시뮬레이션 무료 재시험 대비 — 가입 없음.",
    },
    "30-day-study-plan": {
      title: "미국 시민권 시빅스 30일 학습 계획",
      description:
        "올바른 문제은행(제출일 또는 65/20)부터 시작하는 30일 계획, 매일 연습과 시뮬레이션 주간 — 무료, 가입 없음, 10+ 언어.",
    },
    "reading-writing-tips": {
      title: "USCIS 영어 읽기·쓰기 — 무료 연습 팁",
      description:
        "귀화 영어 읽기/쓰기 방식, 공식 어휘, 오디오 문장 연습 — 올바른 시빅스 은행과 함께. 가입 없음.",
    },
  },
  hi: {
    "fail-citizenship-test": {
      title: "नागरिक या अंग्रेज़ी परीक्षा में फेल होने पर क्या होता है?",
      description:
        "इंटरव्यू में अंग्रेज़ी/सिविक्स फेल? आगे क्या होता है, सही बैंक (2008/2025/65/20) कैसे चुनें, और ऑडियो/सिमुलेशन से मुफ़्त रीटेस्ट तैयारी — साइन-अप नहीं।",
    },
    "30-day-study-plan": {
      title: "अमेरिकी नागरिक परीक्षा के लिए 30-दिन का प्लान",
      description:
        "सही बैंक (फाइलिंग तारीख या 65/20) से शुरू 30-दिन का प्लान, रोज़ अभ्यास और सिमुलेशन सप्ताह — मुफ़्त, साइन-अप नहीं, 10+ भाषाएँ।",
    },
    "reading-writing-tips": {
      title: "USCIS अंग्रेज़ी रीडिंग-राइटिंग — मुफ़्त टिप्स",
      description:
        "नैचुरलाइज़ेशन रीडिंग/राइटिंग कैसे काम करती है, आधिकारिक शब्दावली और ऑडियो वाक्य — सही सिविक्स बैंक के साथ। साइन-अप नहीं।",
    },
  },
  ru: {
    "fail-citizenship-test": {
      title: "Что если не сдать civics или английский?",
      description:
        "Не сдали английский или civics на интервью? Что обычно дальше, как выбрать банк (2008/2025/65/20) и бесплатная подготовка к пересдаче с аудио и симуляцией — без регистрации.",
    },
    "30-day-study-plan": {
      title: "30-дневный план подготовки к civics-тесту США",
      description:
        "План на 30 дней с правильным банком (дата подачи или 65/20), ежедневными тренировками и неделей симуляции — бесплатно, без регистрации, 10+ языков.",
    },
    "reading-writing-tips": {
      title: "Английский USCIS: чтение и письмо — бесплатные советы",
      description:
        "Как устроены reading/writing при натурализации, официальная лексика и бесплатные предложения с аудио — вместе с нужным civics-банком. Без регистрации.",
    },
  },
  ht: {
    "fail-citizenship-test": {
      title: "Kisa ki rive si ou echwe tès sitwayèn oswa angle?",
      description:
        "Ou echwe angle oswa sitwayèn nan entèvyou? Sa k anjeneral rive apre, kijan pou chwazi bon bank (2008/2025/65/20), ak preparasyon retest gratis ak odyo/simulasyon — pa gen enskripsyon.",
    },
    "30-day-study-plan": {
      title: "Plan etid 30 jou pou tès sitwayèn Etazini",
      description:
        "Plan 30 jou ki kòmanse ak bon bank (dat depo oswa 65/20), egzèsis chak jou ak semèn simulasyon — gratis, pa gen enskripsyon, 10+ lang.",
    },
    "reading-writing-tips": {
      title: "Tès angle USCIS lekti ak ekriti — konsèy gratis",
      description:
        "Kijan lekti/ekriti fonksyone nan naturalizasyon, vokabilè ofisyèl, ak fraz gratis ak odyo — ansanm ak bon bank sitwayèn. Pa gen enskripsyon.",
    },
  },
  fr: {
    "fail-citizenship-test": {
      title: "Que se passe-t-il si vous échouez au civisme ou à l’anglais ?",
      description:
        "Échec à l’anglais ou au civisme à l’entretien ? Suite habituelle, comment choisir la bonne banque (2008/2025/65/20) et préparation gratuite au rattrapage avec audio et simulation — sans inscription.",
    },
    "30-day-study-plan": {
      title: "Plan d’étude 30 jours pour le test de civisme américain",
      description:
        "Plan de 30 jours qui commence par la bonne banque (date de dépôt ou 65/20), puis drills quotidiens et semaine de simulation — gratuit, sans inscription, 10+ langues.",
    },
    "reading-writing-tips": {
      title: "Anglais USCIS lecture et écriture — conseils gratuits",
      description:
        "Comment fonctionnent lecture/écriture à la naturalisation, vocabulaire officiel et phrases gratuites avec audio — avec la bonne banque de civisme. Sans inscription.",
    },
  },
};

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  const loc = file.replace(".json", "");
  const p = path.join(dir, file);
  const data = JSON.parse(fs.readFileSync(p, "utf8"));

  if (loc === "en") {
    data["which-civics-test"] = whichEn;
    Object.assign(data, reinforceEn);
  } else if (loc === "es") {
    data["which-civics-test"] = whichEs;
    Object.assign(data, reinforceEs);
  } else {
    const t = whichTitles[loc];
    data["which-civics-test"] = {
      title: t.title,
      description: t.description,
      sections: whichEn.sections,
    };
    const r = reinforceTitles[loc];
    for (const slug of Object.keys(r)) {
      data[slug] = {
        ...data[slug],
        title: r[slug].title,
        description: r[slug].description,
        sections: reinforceEn[slug].sections,
      };
    }
  }

  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
  console.log("patched", file);
}

// Dict link keys
const dictLinks = {
  en: {
    linkWhichCivicsTest: "Which civics test do I take?",
    linkFailTest: "If you fail the test",
    linkStudyPlan: "30-day study plan",
    linkReadingWriting: "English reading & writing",
  },
  es: {
    linkWhichCivicsTest: "¿Qué examen cívico me toca?",
    linkFailTest: "Si reprobás el examen",
    linkStudyPlan: "Plan de 30 días",
    linkReadingWriting: "Inglés: lectura y escritura",
  },
  zh: {
    linkWhichCivicsTest: "我该考哪套测验？",
    linkFailTest: "如果考试未通过",
    linkStudyPlan: "30 天学习计划",
    linkReadingWriting: "英语读写",
  },
  vi: {
    linkWhichCivicsTest: "Tôi thi bộ nào?",
    linkFailTest: "Nếu trượt bài thi",
    linkStudyPlan: "Kế hoạch 30 ngày",
    linkReadingWriting: "Đọc & viết tiếng Anh",
  },
  tl: {
    linkWhichCivicsTest: "Aling civics test?",
    linkFailTest: "Kung bagsak sa test",
    linkStudyPlan: "30-araw na plan",
    linkReadingWriting: "English reading at writing",
  },
  ar: {
    linkWhichCivicsTest: "أي اختبار مدني؟",
    linkFailTest: "إذا رسبت في الاختبار",
    linkStudyPlan: "خطة 30 يومًا",
    linkReadingWriting: "الإنجليزية قراءة وكتابة",
  },
  ko: {
    linkWhichCivicsTest: "어떤 시험을 보나요?",
    linkFailTest: "시험에 떨어지면",
    linkStudyPlan: "30일 학습 계획",
    linkReadingWriting: "영어 읽기·쓰기",
  },
  hi: {
    linkWhichCivicsTest: "कौन-सी परीक्षा?",
    linkFailTest: "अगर परीक्षा में फेल हों",
    linkStudyPlan: "30-दिन का प्लान",
    linkReadingWriting: "अंग्रेज़ी रीडिंग-राइटिंग",
  },
  ru: {
    linkWhichCivicsTest: "Какой civics-тест?",
    linkFailTest: "Если не сдать тест",
    linkStudyPlan: "План на 30 дней",
    linkReadingWriting: "Английский: чтение и письмо",
  },
  ht: {
    linkWhichCivicsTest: "Ki tès sitwayèn?",
    linkFailTest: "Si ou echwe tès la",
    linkStudyPlan: "Plan 30 jou",
    linkReadingWriting: "Angle: lekti ak ekriti",
  },
  fr: {
    linkWhichCivicsTest: "Quel test de civisme ?",
    linkFailTest: "Si vous échouez au test",
    linkStudyPlan: "Plan 30 jours",
    linkReadingWriting: "Anglais lecture et écriture",
  },
};

const dictDir = path.join(root, "src/lib/dict");
for (const [loc, links] of Object.entries(dictLinks)) {
  const p = path.join(dictDir, `${loc}.ts`);
  let src = fs.readFileSync(p, "utf8");
  if (src.includes("linkWhichCivicsTest")) {
    console.log("dict skip", loc);
    continue;
  }
  const block = Object.entries(links)
    .map(([k, v]) => `  ${k}: ${JSON.stringify(v)},`)
    .join("\n");
  src = src.replace(
    /  linkPractice2008Senior: ([^\n]+)\n/,
    `  linkPractice2008Senior: $1\n${block}\n`
  );
  fs.writeFileSync(p, src);
  console.log("dict", loc);
}

console.log("done");
