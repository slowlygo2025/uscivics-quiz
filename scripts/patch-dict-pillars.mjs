import fs from "fs";
import path from "path";

const root = "src/lib/dict";

/** @type {Record<string, Record<string, string>>} */
const patches = {
  fr: {
    tagline:
      "Pratique civique USCIS gratuite — connaissez votre date de dépôt N-400 (2008 vs 2025) et commencez en quelques secondes. Sans inscription.",
    heroSupport:
      "Banque officielle avec audio, flashcards et simulation d'entretien — en plus de 10 langues.",
    practice2008: "Pratique civique 2008 — questions officielles",
    practice2025: "Pratique civique 2025 — questions officielles",
    practiceHubLead:
      "Sans inscription. Banque USCIS officielle avec audio et simulation d'entretien — commencez en quelques secondes.",
    practiceMetaTitleSuffix: "Simulation d'entretien USCIS gratuite",
    freeBadge: "Gratuit · Sans inscription · Secondes",
    bilingualBadge: "Plus de 10 langues",
    diffNoSignup: "Gratuit · Sans inscription · Commencez en quelques secondes",
    diffRightBank:
      "Sachez quelle banque étudier : date N-400 (2008 vs 2025) ou 65/20 senior",
    diffOfficialPractice:
      "Questions USCIS officielles · Audio · Simulation d'entretien",
    diffLanguages: "Pratiquez en plus de 10 langues — pas seulement en anglais",
    diffStripAria: "Pourquoi s'entraîner ici",
    startInSecondsCta: "Commencer en quelques secondes",
    linkN400Filing: "Date de dépôt N-400 (2008 vs 2025)",
    link6520: "Considération spéciale 65/20",
    linkHowMany: "Combien de questions sont posées",
    linkPassScore: "Quel score pour réussir",
    link2025Changes: "Changements civiques 2025",
    linkPractice2025Senior: "2025 · pratique 65/20",
    linkPractice2008Senior: "2008 · pratique 65/20",
    eligibilityLead:
      "Deux questions rapides. Nous vous orientons vers la bonne banque avant d'étudier — 2008, 2025 ou 65/20.",
    seoAll128Lead:
      "Les 128 questions officielles USCIS 2025 avec audio gratuit — sans inscription, en quelques secondes. Puis simulez l'entretien. Plus de 10 langues.",
    seoAll100Lead:
      "Banque 2008 complète si vous avez déposé le N-400 avant le 20 octobre 2025. Audio gratuit, sans compte — simulez l'entretien quand vous voulez.",
    seoSeniorLead:
      "65 ans+ et 20 ans LPR ? Étudiez seulement 20 questions étoilées (10 posées, 6 pour réussir). Audio gratuit, sans inscription — en quelques secondes. Plus de 10 langues.",
  },
  zh: {
    tagline:
      "免费 USCIS 公民测验练习 — 先确认 N-400 递交日期（2008 或 2025），几秒即可开始。无需注册。",
    heroSupport: "官方题库含音频、闪卡与真实面试模拟 — 支持 10+ 种语言。",
    practice2008: "2008 公民测验练习 — 官方题目",
    practice2025: "2025 公民测验练习 — 官方题目",
    practiceHubLead:
      "无需注册。官方 USCIS 题库含音频与面试模拟 — 几秒即可开始。",
    practiceMetaTitleSuffix: "免费 USCIS 面试模拟",
    freeBadge: "免费 · 无需注册 · 即刻开始",
    bilingualBadge: "10+ 种语言",
    diffNoSignup: "免费 · 无需注册 · 几秒开始",
    diffRightBank:
      "先确认题库：N-400 递交日期（2008 或 2025）或 65/20 老年路径",
    diffOfficialPractice: "官方 USCIS 题目 · 音频 · 面试模拟",
    diffLanguages: "支持 10+ 种语言 — 不止英语",
    diffStripAria: "为何在此练习",
    startInSecondsCta: "几秒开始练习",
    linkN400Filing: "N-400 递交日期（2008 与 2025）",
    link6520: "65/20 特别考量",
    linkHowMany: "会问多少题",
    linkPassScore: "及格分数",
    link2025Changes: "2025 公民测验变化",
    linkPractice2025Senior: "2025 · 65/20 练习",
    linkPractice2008Senior: "2008 · 65/20 练习",
    eligibilityLead:
      "两个简短问题。先帮你找到正确题库再学习 — 2008、2025 或 65/20。",
    seoAll128Lead:
      "全部 128 道 2025 官方 USCIS 题目，免费音频 — 无需注册，几秒开始。再进行面试模拟。支持 10+ 语言。",
    seoAll100Lead:
      "完整 2008 题库，适用于 2025 年 10 月 20 日前递交 N-400 的申请人。免费音频，无需账号 — 随时模拟面试。",
    seoSeniorLead:
      "年满 65 且 LPR 满 20 年？只需学习 20 道星标题（问 10 题，需对 6 题）。免费音频，无需注册 — 几秒开始。10+ 语言。",
  },
  vi: {
    tagline:
      "Luyện thi công dân USCIS miễn phí — biết ngày nộp N-400 (2008 vs 2025), bắt đầu trong vài giây. Không đăng ký.",
    heroSupport:
      "Ngân hàng câu hỏi chính thức với audio, flashcard và mô phỏng phỏng vấn — hơn 10 ngôn ngữ.",
    practice2008: "Luyện thi công dân 2008 — câu hỏi chính thức",
    practice2025: "Luyện thi công dân 2025 — câu hỏi chính thức",
    practiceHubLead:
      "Không đăng ký. Ngân hàng USCIS chính thức với audio và mô phỏng phỏng vấn — bắt đầu trong vài giây.",
    practiceMetaTitleSuffix: "Mô phỏng phỏng vấn USCIS miễn phí",
    freeBadge: "Miễn phí · Không đăng ký · Vài giây",
    bilingualBadge: "Hơn 10 ngôn ngữ",
    diffNoSignup: "Miễn phí · Không đăng ký · Bắt đầu trong vài giây",
    diffRightBank:
      "Biết ngân hàng nào cần học: ngày nộp N-400 (2008 vs 2025) hoặc 65/20",
    diffOfficialPractice:
      "Câu hỏi USCIS chính thức · Audio · Mô phỏng phỏng vấn",
    diffLanguages: "Luyện hơn 10 ngôn ngữ — không chỉ tiếng Anh",
    diffStripAria: "Vì sao luyện ở đây",
    startInSecondsCta: "Bắt đầu luyện trong vài giây",
    linkN400Filing: "Ngày nộp N-400 (2008 vs 2025)",
    link6520: "Xét đặc biệt 65/20",
    linkHowMany: "Hỏi bao nhiêu câu",
    linkPassScore: "Điểm để đậu",
    link2025Changes: "Thay đổi công dân 2025",
    linkPractice2025Senior: "2025 · luyện 65/20",
    linkPractice2008Senior: "2008 · luyện 65/20",
    eligibilityLead:
      "Hai câu hỏi nhanh. Chúng tôi chỉ đúng ngân hàng trước khi bạn học — 2008, 2025 hoặc 65/20.",
    seoAll128Lead:
      "Đủ 128 câu USCIS 2025 chính thức với audio miễn phí — không đăng ký, vài giây. Rồi mô phỏng phỏng vấn. Hơn 10 ngôn ngữ.",
    seoAll100Lead:
      "Ngân hàng 2008 đầy đủ nếu nộp N-400 trước 20/10/2025. Audio miễn phí, không tài khoản — mô phỏng khi sẵn sàng.",
    seoSeniorLead:
      "65+ và 20 năm LPR? Chỉ học 20 câu gắn sao (hỏi 10, cần 6 đúng). Audio miễn phí, không đăng ký — vài giây. Hơn 10 ngôn ngữ.",
  },
  tl: {
    tagline:
      "Libreng USCIS civics practice — alamin ang N-400 filing date (2008 vs 2025), magsimula sa ilang segundo. Walang sign-up.",
    heroSupport:
      "Opisyal na question bank na may audio, flashcards, at interview simulation — sa 10+ wika.",
    practice2008: "2008 civics practice — opisyal na tanong",
    practice2025: "2025 civics practice — opisyal na tanong",
    practiceHubLead:
      "Walang sign-up. Opisyal na USCIS bank na may audio at interview simulation — magsimula sa ilang segundo.",
    practiceMetaTitleSuffix: "Libreng USCIS Interview Simulation",
    freeBadge: "Libre · Walang sign-up · Segundo",
    bilingualBadge: "10+ wika",
    diffNoSignup: "Libre · Walang sign-up · Magsimula sa ilang segundo",
    diffRightBank:
      "Alamin kung aling bank ang aaralin: N-400 filing date (2008 vs 2025) o 65/20",
    diffOfficialPractice:
      "Opisyal na USCIS questions · Audio · Interview simulation",
    diffLanguages: "Mag-practice sa 10+ wika — hindi English-only",
    diffStripAria: "Bakit mag-practice dito",
    startInSecondsCta: "Magsimula ng practice sa ilang segundo",
    linkN400Filing: "N-400 filing date (2008 vs 2025)",
    link6520: "65/20 special consideration",
    linkHowMany: "Ilang tanong ang tinatanong",
    linkPassScore: "Anong score para pumasa",
    link2025Changes: "2025 civics changes",
    linkPractice2025Senior: "2025 · 65/20 practice",
    linkPractice2008Senior: "2008 · 65/20 practice",
    eligibilityLead:
      "Dalawang mabilis na tanong. Ituturo ka namin sa tamang question bank bago mag-aral — 2008, 2025, o 65/20.",
    seoAll128Lead:
      "Lahat ng 128 opisyal na 2025 USCIS question na may libreng audio — walang sign-up, ilang segundo. Pagkatapos ay interview simulation. 10+ wika.",
    seoAll100Lead:
      "Buong 2008 bank kung nag-file ng N-400 bago ang Oktubre 20, 2025. Libreng audio, walang account — mag-simulate kapag handa.",
    seoSeniorLead:
      "65+ at 20 taon LPR? 20 starred questions lang (10 tinatanong, 6 para pumasa). Libreng audio, walang sign-up — ilang segundo. 10+ wika.",
  },
  ar: {
    tagline:
      "تمرين مدني USCIS مجاني — اعرف تاريخ تقديم N-400 (2008 مقابل 2025) وابدأ في ثوانٍ. بدون تسجيل.",
    heroSupport:
      "بنك أسئلة رسمي مع صوت وبطاقات ومحاكاة مقابلة — بأكثر من 10 لغات.",
    practice2008: "تمرين مدني 2008 — أسئلة رسمية",
    practice2025: "تمرين مدني 2025 — أسئلة رسمية",
    practiceHubLead:
      "بدون تسجيل. بنك USCIS رسمي مع صوت ومحاكاة مقابلة — ابدأ في ثوانٍ.",
    practiceMetaTitleSuffix: "محاكاة مقابلة USCIS مجانية",
    freeBadge: "مجاني · بدون تسجيل · ثوانٍ",
    bilingualBadge: "أكثر من 10 لغات",
    diffNoSignup: "مجاني · بدون تسجيل · ابدأ في ثوانٍ",
    diffRightBank:
      "اعرف أي بنك تدرس: تاريخ N-400 (2008 مقابل 2025) أو 65/20",
    diffOfficialPractice: "أسئلة USCIS رسمية · صوت · محاكاة مقابلة",
    diffLanguages: "تمرّن بأكثر من 10 لغات — ليس الإنجليزية فقط",
    diffStripAria: "لماذا التمرن هنا",
    startInSecondsCta: "ابدأ التمرين في ثوانٍ",
    linkN400Filing: "تاريخ تقديم N-400 (2008 مقابل 2025)",
    link6520: "اعتبار خاص 65/20",
    linkHowMany: "كم سؤالاً يُطرح",
    linkPassScore: "درجة النجاح",
    link2025Changes: "تغييرات المدني 2025",
    linkPractice2025Senior: "2025 · تمرين 65/20",
    linkPractice2008Senior: "2008 · تمرين 65/20",
    eligibilityLead:
      "سؤالان سريعان. نوجّهك للبنك الصحيح قبل الدراسة — 2008 أو 2025 أو 65/20.",
    seoAll128Lead:
      "كل أسئلة USCIS الرسمية لعام 2025 مع صوت مجاني — بدون تسجيل، في ثوانٍ. ثم محاكاة المقابلة. أكثر من 10 لغات.",
    seoAll100Lead:
      "بنك 2008 الكامل إن قدّمت N-400 قبل 20 أكتوبر 2025. صوت مجاني، بدون حساب — حاكي المقابلة متى شئت.",
    seoSeniorLead:
      "65+ و20 سنة إقامة دائمة؟ ادرس فقط 20 سؤالاً بنجمة (يُطرح 10 وتحتاج 6). صوت مجاني، بدون تسجيل — في ثوانٍ. أكثر من 10 لغات.",
  },
  ko: {
    tagline:
      "무료 USCIS 시민권 연습 — N-400 제출일(2008 vs 2025)을 확인한 뒤 몇 초 만에 시작. 가입 불필요.",
    heroSupport:
      "공식 문제은행 + 오디오, 플래시카드, 면접 시뮬레이션 — 10개 이상 언어.",
    practice2008: "2008 시민권 연습 — 공식 문제",
    practice2025: "2025 시민권 연습 — 공식 문제",
    practiceHubLead:
      "가입 불필요. 공식 USCIS 은행 + 오디오·면접 시뮬레이션 — 몇 초 만에 시작.",
    practiceMetaTitleSuffix: "무료 USCIS 면접 시뮬레이션",
    freeBadge: "무료 · 가입 없음 · 즉시",
    bilingualBadge: "10개 이상 언어",
    diffNoSignup: "무료 · 가입 없음 · 몇 초 만에 시작",
    diffRightBank:
      "어떤 은행을 공부할지: N-400 제출일(2008 vs 2025) 또는 65/20",
    diffOfficialPractice: "공식 USCIS 문제 · 오디오 · 면접 시뮬레이션",
    diffLanguages: "10개 이상 언어로 연습 — 영어만이 아님",
    diffStripAria: "여기서 연습하는 이유",
    startInSecondsCta: "몇 초 만에 연습 시작",
    linkN400Filing: "N-400 제출일 (2008 vs 2025)",
    link6520: "65/20 특별 고려",
    linkHowMany: "몇 문항을 묻는지",
    linkPassScore: "합격 점수",
    link2025Changes: "2025 시민권 변경",
    linkPractice2025Senior: "2025 · 65/20 연습",
    linkPractice2008Senior: "2008 · 65/20 연습",
    eligibilityLead:
      "빠른 질문 두 개. 공부 전에 맞는 문제은행으로 안내합니다 — 2008, 2025 또는 65/20.",
    seoAll128Lead:
      "2025 공식 USCIS 128문항 + 무료 오디오 — 가입 없이 몇 초. 이어서 면접 시뮬레이션. 10개 이상 언어.",
    seoAll100Lead:
      "2025년 10월 20일 이전 N-400 제출자용 2008 전체 은행. 무료 오디오, 계정 없음 — 준비되면 시뮬레이션.",
    seoSeniorLead:
      "65세+ 및 LPR 20년? 별표 20문항만 (10문항, 6개 정답). 무료 오디오, 가입 없음 — 몇 초. 10개 이상 언어.",
  },
  hi: {
    tagline:
      "मुफ़्त USCIS नागरिक अभ्यास — अपना N-400 फाइलिंग दिनांक जानें (2008 बनाम 2025), सेकंडों में शुरू करें। साइन-अप नहीं।",
    heroSupport:
      "आधिकारिक प्रश्न बैंक ऑडियो, फ्लैशकार्ड और इंटरव्यू सिमुलेशन के साथ — 10+ भाषाएँ।",
    practice2008: "2008 नागरिक अभ्यास — आधिकारिक प्रश्न",
    practice2025: "2025 नागरिक अभ्यास — आधिकारिक प्रश्न",
    practiceHubLead:
      "साइन-अप नहीं। आधिकारिक USCIS बैंक ऑडियो और इंटरव्यू सिमुलेशन के साथ — सेकंडों में शुरू।",
    practiceMetaTitleSuffix: "मुफ़्त USCIS इंटरव्यू सिमुलेशन",
    freeBadge: "मुफ़्त · बिना साइन-अप · सेकंड",
    bilingualBadge: "10+ भाषाएँ",
    diffNoSignup: "मुफ़्त · बिना साइन-अप · सेकंडों में शुरू",
    diffRightBank:
      "कौन सा बैंक पढ़ें: N-400 फाइलिंग दिनांक (2008 बनाम 2025) या 65/20",
    diffOfficialPractice:
      "आधिकारिक USCIS प्रश्न · ऑडियो · इंटरव्यू सिमुलेशन",
    diffLanguages: "10+ भाषाओं में अभ्यास — केवल अंग्रेज़ी नहीं",
    diffStripAria: "यहाँ अभ्यास क्यों",
    startInSecondsCta: "सेकंडों में अभ्यास शुरू करें",
    linkN400Filing: "N-400 फाइलिंग दिनांक (2008 बनाम 2025)",
    link6520: "65/20 विशेष विचार",
    linkHowMany: "कितने प्रश्न पूछे जाते हैं",
    linkPassScore: "पास स्कोर",
    link2025Changes: "2025 नागरिक बदलाव",
    linkPractice2025Senior: "2025 · 65/20 अभ्यास",
    linkPractice2008Senior: "2008 · 65/20 अभ्यास",
    eligibilityLead:
      "दो त्वरित प्रश्न। पढ़ाई से पहले सही बैंक दिखाएँगे — 2008, 2025 या 65/20।",
    seoAll128Lead:
      "सभी 128 आधिकारिक 2025 USCIS प्रश्न मुफ़्त ऑडियो के साथ — बिना साइन-अप, सेकंडों में। फिर इंटरव्यू सिमुलेशन। 10+ भाषाएँ।",
    seoAll100Lead:
      "पूरा 2008 बैंक यदि N-400 20 अक्टूबर 2025 से पहले दाखिल किया। मुफ़्त ऑडियो, बिना खाता — तैयार होने पर सिमुलेट करें।",
    seoSeniorLead:
      "65+ और 20 वर्ष LPR? केवल 20 स्टार प्रश्न (10 पूछे, 6 सही)। मुफ़्त ऑडियो, बिना साइन-अप — सेकंडों में। 10+ भाषाएँ।",
  },
  ru: {
    tagline:
      "Бесплатная практика USCIS — узнайте дату подачи N-400 (2008 vs 2025) и начните за секунды. Без регистрации.",
    heroSupport:
      "Официальный банк вопросов с аудио, карточками и симуляцией собеседования — на 10+ языках.",
    practice2008: "Практика civics 2008 — официальные вопросы",
    practice2025: "Практика civics 2025 — официальные вопросы",
    practiceHubLead:
      "Без регистрации. Официальный банк USCIS с аудио и симуляцией — старт за секунды.",
    practiceMetaTitleSuffix: "Бесплатная симуляция собеседования USCIS",
    freeBadge: "Бесплатно · Без регистрации · Секунды",
    bilingualBadge: "10+ языков",
    diffNoSignup: "Бесплатно · Без регистрации · Старт за секунды",
    diffRightBank:
      "Какой банк учить: дата N-400 (2008 vs 2025) или 65/20",
    diffOfficialPractice:
      "Официальные вопросы USCIS · Аудио · Симуляция собеседования",
    diffLanguages: "Практика на 10+ языках — не только английский",
    diffStripAria: "Почему практиковаться здесь",
    startInSecondsCta: "Начать практику за секунды",
    linkN400Filing: "Дата подачи N-400 (2008 vs 2025)",
    link6520: "Особый учёт 65/20",
    linkHowMany: "Сколько вопросов задают",
    linkPassScore: "Какой балл для сдачи",
    link2025Changes: "Изменения civics 2025",
    linkPractice2025Senior: "2025 · практика 65/20",
    linkPractice2008Senior: "2008 · практика 65/20",
    eligibilityLead:
      "Два быстрых вопроса. Направим к нужному банку до учёбы — 2008, 2025 или 65/20.",
    seoAll128Lead:
      "Все 128 официальных вопросов USCIS 2025 с бесплатным аудио — без регистрации, за секунды. Затем симуляция. 10+ языков.",
    seoAll100Lead:
      "Полный банк 2008, если N-400 подан до 20 октября 2025. Бесплатное аудио, без аккаунта — симулируйте, когда готовы.",
    seoSeniorLead:
      "65+ и 20 лет LPR? Только 20 вопросов со звёздочкой (10 спрашивают, нужно 6). Бесплатное аудио, без регистрации — за секунды. 10+ языков.",
  },
  ht: {
    tagline:
      "Pratik sitwayèn USCIS gratis — konnen dat depo N-400 ou (2008 vs 2025), kòmanse an kèk segonn. Pa gen enskripsyon.",
    heroSupport:
      "Bank kesyon ofisyèl ak odyo, flashcards, ak simulasyon entèvyou — nan plis pase 10 lang.",
    practice2008: "Pratik sitwayèn 2008 — kesyon ofisyèl",
    practice2025: "Pratik sitwayèn 2025 — kesyon ofisyèl",
    practiceHubLead:
      "Pa gen enskripsyon. Bank USCIS ofisyèl ak odyo ak simulasyon entèvyou — kòmanse an kèk segonn.",
    practiceMetaTitleSuffix: "Simulasyon entèvyou USCIS gratis",
    freeBadge: "Gratis · Pa enskripsyon · Segonn",
    bilingualBadge: "Plis pase 10 lang",
    diffNoSignup: "Gratis · Pa enskripsyon · Kòmanse an kèk segonn",
    diffRightBank:
      "Konnen ki bank pou etidye: dat N-400 (2008 vs 2025) oswa 65/20",
    diffOfficialPractice:
      "Kesyon USCIS ofisyèl · Odyo · Simulasyon entèvyou",
    diffLanguages: "Pratike nan plis pase 10 lang — pa sèlman angle",
    diffStripAria: "Poukisa pratike isit la",
    startInSecondsCta: "Kòmanse pratike an kèk segonn",
    linkN400Filing: "Dat depo N-400 (2008 vs 2025)",
    link6520: "Konsiderasyon espesyal 65/20",
    linkHowMany: "Konbyen kesyon yo poze",
    linkPassScore: "Ki nòt pou pase",
    link2025Changes: "Chanjman sitwayèn 2025",
    linkPractice2025Senior: "2025 · pratik 65/20",
    linkPractice2008Senior: "2008 · pratik 65/20",
    eligibilityLead:
      "De kesyon rapid. N ap mennen ou nan bon bank anvan ou etidye — 2008, 2025 oswa 65/20.",
    seoAll128Lead:
      "Tout 128 kesyon ofisyèl USCIS 2025 ak odyo gratis — pa enskripsyon, kèk segonn. Apre sa simulasyon. Plis pase 10 lang.",
    seoAll100Lead:
      "Bank 2008 konplè si ou te depoze N-400 anvan 20 oktòb 2025. Odyo gratis, pa kont — simule lè ou pare.",
    seoSeniorLead:
      "65+ ak 20 ane LPR? Etidye sèlman 20 kesyon zetwal (yo poze 10, ou bezwen 6). Odyo gratis, pa enskripsyon — kèk segonn. Plis pase 10 lang.",
  },
};

function replaceKey(src, key, value) {
  const re = new RegExp(
    `${key}:\\s*(?:"(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*')\\s*,`,
    "m"
  );
  if (!re.test(src)) {
    // multiline string
    const re2 = new RegExp(
      `${key}:\\s*\\n?\\s*"(?:\\\\.|[^"\\\\])*"(?:\\s*\\+\\s*\\n\\s*"(?:\\\\.|[^"\\\\])*")*\\s*,`,
      "m"
    );
    if (!re2.test(src)) return { src, ok: false };
    return {
      src: src.replace(re2, `${key}: ${JSON.stringify(value)},`),
      ok: true,
    };
  }
  return {
    src: src.replace(re, `${key}: ${JSON.stringify(value)},`),
    ok: true,
  };
}

for (const [locale, vals] of Object.entries(patches)) {
  const file = path.join(root, `${locale}.ts`);
  let src = fs.readFileSync(file, "utf8");

  const replaceKeys = [
    "tagline",
    "heroSupport",
    "practice2008",
    "practice2025",
    "freeBadge",
    "bilingualBadge",
    "eligibilityLead",
    "seoAll128Lead",
    "seoAll100Lead",
    "seoSeniorLead",
  ];

  for (const key of replaceKeys) {
    const r = replaceKey(src, key, vals[key]);
    if (!r.ok) console.error("MISS", locale, key);
    else src = r.src;
  }

  if (!src.includes("diffNoSignup:")) {
    const insert = `  practiceHubLead: ${JSON.stringify(vals.practiceHubLead)},
  practiceMetaTitleSuffix: ${JSON.stringify(vals.practiceMetaTitleSuffix)},
  diffNoSignup: ${JSON.stringify(vals.diffNoSignup)},
  diffRightBank: ${JSON.stringify(vals.diffRightBank)},
  diffOfficialPractice: ${JSON.stringify(vals.diffOfficialPractice)},
  diffLanguages: ${JSON.stringify(vals.diffLanguages)},
  diffStripAria: ${JSON.stringify(vals.diffStripAria)},
  startInSecondsCta: ${JSON.stringify(vals.startInSecondsCta)},
  linkN400Filing: ${JSON.stringify(vals.linkN400Filing)},
  link6520: ${JSON.stringify(vals.link6520)},
  linkHowMany: ${JSON.stringify(vals.linkHowMany)},
  linkPassScore: ${JSON.stringify(vals.linkPassScore)},
  link2025Changes: ${JSON.stringify(vals.link2025Changes)},
  linkPractice2025Senior: ${JSON.stringify(vals.linkPractice2025Senior)},
  linkPractice2008Senior: ${JSON.stringify(vals.linkPractice2008Senior)},
`;
    if (!src.includes("eligibilityTitle:")) {
      console.error("no eligibilityTitle", locale);
    } else {
      src = src.replace(
        /(\n\s*)eligibilityTitle:/,
        `\n${insert}  eligibilityTitle:`
      );
    }
  }

  fs.writeFileSync(file, src);
  console.log("patched", locale);
}
