/**
 * Replaces the remaining English learn-page bodies with curated locale copy.
 * Run: node scripts/patch-learn-bodies-remaining.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const i18nDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/lib/learn-i18n");
const required = {
  "n-400-filing-date": 5, "65-20": 5, "which-civics-test": 4,
  "fail-citizenship-test": 5, "30-day-study-plan": 4, "reading-writing-tips": 5,
  "dates-names-officials-drills": 5, "texas-civics-answers": 4,
  "florida-civics-answers": 4, "new-york-civics-answers": 4,
};
const en = JSON.parse(fs.readFileSync(path.join(i18nDir, "en.json"), "utf8"));

const packs = {
  ar: {
    topics: ["تاريخ تقديم N-400 واختيار اختبار 2008 أو 2025", "الاعتبار الخاص 65/20", "اختيار اختبار التربية المدنية الصحيح", "ما يحدث عند عدم اجتياز اختبار الجنسية", "خطة دراسة لمدة 30 يومًا", "نصائح القراءة والكتابة بالإنجليزية", "تمارين التواريخ والأسماء والمسؤولين", "إجابات اختبار تكساس", "إجابات اختبار فلوريدا", "إجابات اختبار نيويورك"],
    intro: ["تحدد هذه الصفحة الخطوات العملية والمعلومات الأساسية للتحضير لاختبار USCIS.", "تدرّب مجانًا بالصوت والمحاكاة، وتحقق من القواعد الحالية لحالتك."],
    heads: ["المعلومة الأساسية", "كيف يعمل ذلك", "طريقة التحضير", "راجع قبل المقابلة", "الخطوة التالية"],
    bodies: [
      "تأكد من تفاصيل طلبك من المصادر الرسمية؛ فالقواعد قد تعتمد على تاريخ تقديم Form N-400 وظروف قضيتك.",
      "في اختبار 2008 يُسأل حتى 10 أسئلة وتحتاج 6 صحيحة، وفي اختبار 2025 يُسأل حتى 20 وتحتاج 12 صحيحة.",
      "استخدم جلسات قصيرة يومية، وقل الإجابات بصوت عالٍ لأن اختبار التربية المدنية شفهي.",
      "تحقق من الإجابات التي تتغير، مثل المسؤولين المنتخبين، في الأسبوع الذي يسبق موعدك.",
      "بعد اختيار النسخة الصحيحة، استخدم البطاقات والمراجعة الذكية ومحاكاة المقابلة حتى تصبح النتيجة ثابتة.",
    ],
    facts: {
      "n-400-filing-date": "المتقدمون قبل 20 أكتوبر 2025 يأخذون عادة اختبار 2008 (100 سؤال، 6/10)، ومن قدم في ذلك اليوم أو بعده يأخذون عادة اختبار 2025 (128 سؤالًا، 12/20).",
      "65-20": "قد يتأهل من بلغ 65 عامًا وكان مقيمًا دائمًا قانونيًا لمدة 20 عامًا لـ20 سؤالًا مميزًا بنجمة؛ يُطرح حتى 10 وتحتاج 6 صحيحة.",
      "which-civics-test": "تاريخ تقديم N-400 يحدد عادة 2008 أو 2025؛ وقد تنطبق قاعدة 65/20 لمن بلغ 65 عامًا وله 20 سنة إقامة دائمة.",
      "fail-citizenship-test": "إذا لم تجتز الإنجليزية أو التربية المدنية، يمنح USCIS عادة فرصة أخرى للجزء غير المجتاز وفق السياسة الحالية.",
      "30-day-study-plan": "خلال اليومين الأولين أكد النسخة: قبل 20 أكتوبر 2025 عادة 2008، وفي ذلك التاريخ أو بعده عادة 2025.",
      "reading-writing-tips": "ما لم تكن معفى، أثبت التحدث والقراءة والكتابة بالإنجليزية باستخدام مفردات USCIS الرسمية.",
      "dates-names-officials-drills": "ركز على السنوات والأسماء والمسؤولين الذين قد تتغير إجاباتهم مع الانتخابات أو التعيينات.",
      "texas-civics-answers": "عاصمة تكساس هي أوستن. استخدم الرمز البريدي لمعرفة الممثل، وتحقق من الحاكم والمسؤولين قبل المقابلة.",
      "florida-civics-answers": "عاصمة فلوريدا هي تالاهاسي. استخدم الرمز البريدي لمعرفة الممثل وتحقق من الأسماء المتغيرة.",
      "new-york-civics-answers": "عاصمة نيويورك هي ألباني. تختلف الدوائر داخل مدينة نيويورك وخارجها، لذلك استخدم الرمز البريدي.",
    },
  },
  fr: {
    topics: ["Date de dépôt N-400 : test 2008 ou 2025", "La règle spéciale 65/20", "Choisir le bon test civique", "Que faire après un échec au test", "Plan d’étude de 30 jours", "Conseils de lecture et d’écriture en anglais", "Exercices de dates, noms et responsables", "Réponses civiques du Texas", "Réponses civiques de Floride", "Réponses civiques de New York"],
    intro: ["Ce guide présente les informations essentielles et les étapes de préparation au test USCIS.", "Entraînez-vous gratuitement avec audio et simulation, et vérifiez les règles actuelles applicables à votre dossier."],
    heads: ["L’essentiel", "Comment cela fonctionne", "Comment vous préparer", "À vérifier avant l’entretien", "Prochaine étape"],
    bodies: ["Vérifiez les détails de votre dossier auprès de sources officielles : les règles peuvent dépendre de la date de dépôt du formulaire N-400.", "Pour 2008, l’agent pose jusqu’à 10 questions et il faut 6 bonnes réponses ; pour 2025, jusqu’à 20 questions et il en faut 12.", "Étudiez un peu chaque jour et dites les réponses à voix haute : le test civique est oral.", "Revérifiez les réponses variables, notamment les responsables élus, la semaine de votre entretien.", "Après avoir choisi la bonne version, utilisez les cartes, la révision ciblée et la simulation jusqu’à réussir régulièrement."],
    facts: {
      "n-400-filing-date": "Un dépôt avant le 20 octobre 2025 mène généralement au test 2008 (100 questions, 6/10) ; à partir de cette date, au test 2025 (128 questions, 12/20).",
      "65-20": "À 65 ans ou plus avec 20 ans comme résident permanent légal, vous pouvez relever de 20 questions marquées ; 10 au maximum sont posées et 6 bonnes réponses sont nécessaires.",
      "which-civics-test": "La date de dépôt du N-400 détermine généralement 2008 ou 2025 ; la règle 65/20 peut s’appliquer dès 65 ans et 20 ans de résidence permanente.",
      "fail-citizenship-test": "Après un échec en anglais ou en civisme, USCIS offre généralement une nouvelle occasion pour la partie non réussie, selon sa politique en vigueur.",
      "30-day-study-plan": "Les jours 1 et 2, confirmez votre version : avant le 20 octobre 2025, généralement 2008 ; ce jour-là ou après, généralement 2025.",
      "reading-writing-tips": "Sauf exemption, démontrez l’anglais oral, la lecture et l’écriture avec le vocabulaire officiel USCIS.",
      "dates-names-officials-drills": "Travaillez les années, les noms et les responsables dont les réponses peuvent changer après une élection ou une nomination.",
      "texas-civics-answers": "La capitale du Texas est Austin. Utilisez votre code postal pour le représentant et vérifiez le gouverneur avant l’entretien.",
      "florida-civics-answers": "La capitale de la Floride est Tallahassee. Utilisez votre code postal et revérifiez les noms qui changent.",
      "new-york-civics-answers": "La capitale de New York est Albany. Les circonscriptions varient entre New York City et le reste de l’État ; utilisez votre code postal.",
    },
  },
  ru: {
    topics: ["Дата подачи N-400: тест 2008 или 2025", "Особое правило 65/20", "Выбор правильного теста по граждановедению", "Что делать после непрохождения теста", "30-дневный план подготовки", "Советы по чтению и письму на английском", "Тренировка дат, имен и должностных лиц", "Ответы по граждановедению для Техаса", "Ответы по граждановедению для Флориды", "Ответы по граждановедению для Нью-Йорка"],
    intro: ["В этой статье собраны основные сведения и практические шаги для подготовки к тесту USCIS.", "Занимайтесь бесплатно с аудио и симуляцией и уточняйте действующие правила для своего дела."],
    heads: ["Главное", "Как это работает", "Как подготовиться", "Проверьте перед интервью", "Следующий шаг"],
    bodies: ["Проверьте сведения по вашему делу в официальных источниках: правила могут зависеть от даты подачи формы N-400.", "В версии 2008 задают до 10 вопросов, нужно 6 верных; в версии 2025 — до 20 вопросов, нужно 12.", "Занимайтесь понемногу каждый день и произносите ответы вслух: тест по граждановедению устный.", "За неделю до интервью перепроверьте меняющиеся ответы, особенно имена избранных должностных лиц.", "Выбрав правильную версию, используйте карточки, умный повтор и симуляцию, пока не начнете стабильно сдавать."],
    facts: {
      "n-400-filing-date": "Подавшие N-400 до 20 октября 2025 года обычно сдают тест 2008 (100 вопросов, 6/10); подавшие в этот день или позже — тест 2025 (128 вопросов, 12/20).",
      "65-20": "В 65 лет или старше при 20 годах статуса законного постоянного жителя может применяться набор из 20 отмеченных вопросов; задают до 10, нужно 6 верных.",
      "which-civics-test": "Дата подачи N-400 обычно определяет версию 2008 или 2025; правило 65/20 может действовать с 65 лет и 20 годами постоянного проживания.",
      "fail-citizenship-test": "Если не сдан английский или граждановедение, USCIS обычно дает еще одну попытку для несданной части согласно действующей политике.",
      "30-day-study-plan": "В первые два дня подтвердите версию: до 20 октября 2025 года обычно 2008, в эту дату или позже — обычно 2025.",
      "reading-writing-tips": "Если нет освобождения, покажите устный английский, чтение и письмо с официальной лексикой USCIS.",
      "dates-names-officials-drills": "Тренируйте годы, имена и должностных лиц, ответы о которых меняются после выборов или назначений.",
      "texas-civics-answers": "Столица Техаса — Остин. Используйте почтовый индекс для поиска представителя и проверьте губернатора перед интервью.",
      "florida-civics-answers": "Столица Флориды — Таллахасси. Используйте почтовый индекс и перепроверьте меняющиеся имена.",
      "new-york-civics-answers": "Столица Нью-Йорка — Олбани. Округа различаются в Нью-Йорке и за его пределами, поэтому используйте почтовый индекс.",
    },
  },
  hi: {
    topics: ["N-400 दाखिल करने की तारीख: 2008 या 2025 परीक्षा", "65/20 विशेष प्रावधान", "सही नागरिक शास्त्र परीक्षा चुनना", "परीक्षा में असफल होने पर क्या करें", "30-दिन की अध्ययन योजना", "अंग्रेज़ी पढ़ने और लिखने के सुझाव", "तारीख, नाम और अधिकारियों के अभ्यास", "टेक्सास नागरिक शास्त्र उत्तर", "फ्लोरिडा नागरिक शास्त्र उत्तर", "न्यूयॉर्क नागरिक शास्त्र उत्तर"],
    intro: ["यह मार्गदर्शिका USCIS परीक्षा की तैयारी के लिए जरूरी जानकारी और व्यावहारिक कदम बताती है।", "ऑडियो और सिमुलेशन से मुफ्त अभ्यास करें और अपने मामले के लिए मौजूदा नियमों की पुष्टि करें।"],
    heads: ["मुख्य जानकारी", "यह कैसे काम करता है", "तैयारी कैसे करें", "साक्षात्कार से पहले जांचें", "अगला कदम"],
    bodies: ["अपने मामले की जानकारी आधिकारिक स्रोतों से जांचें; नियम N-400 फॉर्म दाखिल करने की तारीख पर निर्भर हो सकते हैं।", "2008 में अधिकारी अधिकतम 10 प्रश्न पूछता है और 6 सही चाहिए; 2025 में अधिकतम 20 में 12 सही चाहिए।", "हर दिन कम समय पढ़ें और उत्तर जोर से बोलें, क्योंकि नागरिक शास्त्र परीक्षा मौखिक है।", "साक्षात्कार के सप्ताह में बदलने वाले उत्तरों, विशेषकर निर्वाचित अधिकारियों के नाम, फिर जांचें।", "सही संस्करण चुनने के बाद फ्लैशकार्ड, स्मार्ट रिव्यू और सिमुलेशन का उपयोग करें जब तक लगातार पास न हों।"],
    facts: {
      "n-400-filing-date": "20 अक्तूबर 2025 से पहले N-400 दाखिल करने वाले आम तौर पर 2008 परीक्षा देते हैं (100 प्रश्न, 6/10); उस दिन या बाद में दाखिल करने वाले 2025 परीक्षा (128 प्रश्न, 12/20)।",
      "65-20": "65 या अधिक उम्र और 20 वर्ष के वैध स्थायी निवासी होने पर 20 चिह्नित प्रश्नों का प्रावधान हो सकता है; अधिकतम 10 पूछे जाते हैं और 6 सही चाहिए।",
      "which-civics-test": "N-400 दाखिल करने की तारीख आम तौर पर 2008 या 2025 तय करती है; 65 वर्ष और 20 वर्ष स्थायी निवास पर 65/20 लागू हो सकता है।",
      "fail-citizenship-test": "अंग्रेज़ी या नागरिक शास्त्र में असफल होने पर USCIS आम तौर पर वर्तमान नीति के अनुसार असफल भाग के लिए एक और अवसर देता है।",
      "30-day-study-plan": "पहले दो दिन संस्करण निश्चित करें: 20 अक्तूबर 2025 से पहले सामान्यतः 2008, और उस दिन या बाद में सामान्यतः 2025।",
      "reading-writing-tips": "छूट न होने पर USCIS की आधिकारिक शब्दावली से बोलना, पढ़ना और लिखना दिखाना होता है।",
      "dates-names-officials-drills": "वर्षों, नामों और चुनाव या नियुक्ति के बाद बदलने वाले अधिकारियों के उत्तरों का अभ्यास करें।",
      "texas-civics-answers": "टेक्सास की राजधानी ऑस्टिन है। प्रतिनिधि के लिए ZIP कोड प्रयोग करें और साक्षात्कार से पहले गवर्नर जांचें।",
      "florida-civics-answers": "फ्लोरिडा की राजधानी टैलाहैसी है। ZIP कोड प्रयोग करें और बदलने वाले नाम फिर जांचें।",
      "new-york-civics-answers": "न्यूयॉर्क की राजधानी ऑलबनी है। न्यूयॉर्क सिटी और बाकी राज्य में जिले अलग हैं, इसलिए ZIP कोड प्रयोग करें।",
    },
  },
  ko: {
    topics: ["N-400 접수일: 2008 또는 2025 시험", "65/20 특별 배려", "올바른 시민권 시험 선택", "시험에 떨어졌을 때", "30일 학습 계획", "영어 읽기와 쓰기 팁", "날짜·이름·공직자 연습", "텍사스 시민권 답변", "플로리다 시민권 답변", "뉴욕 시민권 답변"],
    intro: ["이 안내서는 USCIS 시험 준비에 필요한 핵심 정보와 실용적인 방법을 제공합니다.", "오디오와 모의 면접으로 무료 연습하고, 본인 사건에 적용되는 최신 규정을 확인하세요."],
    heads: ["핵심 내용", "진행 방식", "준비 방법", "면접 전 확인", "다음 단계"],
    bodies: ["본인 사건의 세부 사항은 공식 자료로 확인하세요. 규정은 N-400 접수일에 따라 달라질 수 있습니다.", "2008 시험은 최대 10문제 중 6문제, 2025 시험은 최대 20문제 중 12문제를 맞혀야 합니다.", "시민권 시험은 구술이므로 매일 짧게 공부하고 답을 소리 내어 말하세요.", "면접 주에는 선출직 공직자처럼 바뀔 수 있는 답을 다시 확인하세요.", "맞는 버전을 고른 뒤 플래시카드, 스마트 복습, 모의 면접으로 꾸준히 합격할 때까지 연습하세요."],
    facts: {
      "n-400-filing-date": "2025년 10월 20일 전 N-400 접수자는 보통 2008 시험(100문제, 6/10)을, 그날 또는 이후 접수자는 2025 시험(128문제, 12/20)을 봅니다.",
      "65-20": "65세 이상이고 합법적 영주권자로 20년 이상 거주했다면 별표 20문제 대상일 수 있습니다. 최대 10문제 중 6문제가 필요합니다.",
      "which-civics-test": "N-400 접수일이 보통 2008 또는 2025 버전을 정하며, 65세 이상·영주권 20년이면 65/20이 적용될 수 있습니다.",
      "fail-citizenship-test": "영어 또는 시민권 부분에 불합격하면 USCIS는 보통 현행 정책에 따라 해당 부분을 다시 볼 기회를 줍니다.",
      "30-day-study-plan": "첫 이틀에 버전을 확인하세요. 2025년 10월 20일 전이면 보통 2008, 그날 또는 이후면 보통 2025입니다.",
      "reading-writing-tips": "면제 대상이 아니라면 USCIS 공식 어휘로 영어 말하기·읽기·쓰기를 보여야 합니다.",
      "dates-names-officials-drills": "연도, 이름, 그리고 선거나 임명으로 답이 바뀔 수 있는 공직자를 집중 연습하세요.",
      "texas-civics-answers": "텍사스 주도는 오스틴입니다. 우편번호로 연방 하원의원을 찾고 면접 전 주지사를 확인하세요.",
      "florida-civics-answers": "플로리다 주도는 탤러해시입니다. 우편번호를 사용하고 바뀌는 이름을 다시 확인하세요.",
      "new-york-civics-answers": "뉴욕 주도는 올버니입니다. 뉴욕시와 다른 지역의 선거구가 다르므로 우편번호를 사용하세요.",
    },
  },
  ht: {
    topics: ["Dat depo N-400: tès 2008 oswa 2025", "Konsiderasyon espesyal 65/20", "Chwazi bon tès sivik la", "Sa pou fè apre ou pa pase tès la", "Plan etid 30 jou", "Konsèy pou li ak ekri an anglè", "Egzèsis dat, non ak responsab", "Repons sivik Texas", "Repons sivik Florid", "Repons sivik Nouyòk"],
    intro: ["Gid sa a bay enfòmasyon enpòtan ak etap pratik pou prepare pou tès USCIS la.", "Pratike gratis ak odyo ak simulasyon, epi verifye règ aktyèl yo pou dosye pa w."],
    heads: ["Pwen enpòtan", "Kijan sa mache", "Kijan pou prepare", "Verifye anvan entèvyou a", "Pwochen etap"],
    bodies: ["Verifye detay dosye ou nan sous ofisyèl yo; règ yo ka depann de dat ou te depoze Fòm N-400 la.", "Pou 2008, ajan an poze jiska 10 kesyon epi ou bezwen 6 bon repons; pou 2025, jiska 20 kesyon epi ou bezwen 12.", "Etidye yon ti tan chak jou epi di repons yo fò, paske tès sivik la oral.", "Nan semèn entèvyou a, verifye ankò repons ki ka chanje, sitou non responsab eli yo.", "Apre ou chwazi bon vèsyon an, sèvi ak kat, revizyon entelijan ak simulasyon jiskaske ou pase regilyèman."],
    facts: {
      "n-400-filing-date": "Moun ki depoze N-400 anvan 20 oktòb 2025 pran anjeneral tès 2008 la (100 kesyon, 6/10); moun ki depoze jou sa a oswa apre pran tès 2025 la (128 kesyon, 12/20).",
      "65-20": "Si ou gen 65 an oswa plis epi ou se rezidan pèmanan legal pandan 20 an, ou ka gen seri 20 kesyon ki make ak zetwal; yo poze jiska 10 epi ou bezwen 6.",
      "which-civics-test": "Dat depo N-400 la chwazi anjeneral 2008 oswa 2025; 65/20 ka aplike si ou gen 65 an ak 20 an rezidans pèmanan.",
      "fail-citizenship-test": "Si ou pa pase anglè oswa sivik, USCIS bay anjeneral yon lòt chans pou pati ou pa pase a, selon politik aktyèl la.",
      "30-day-study-plan": "Nan premye de jou yo, konfime vèsyon an: anvan 20 oktòb 2025 se anjeneral 2008; jou sa a oswa apre se anjeneral 2025.",
      "reading-writing-tips": "Sòf si ou gen egzansyon, ou dwe montre pale, li ak ekri anglè ak vokabilè ofisyèl USCIS la.",
      "dates-names-officials-drills": "Travay sou ane, non ak responsab ki gen repons ki ka chanje apre eleksyon oswa nominasyon.",
      "texas-civics-answers": "Kapital Texas se Austin. Sèvi ak kòd postal ou pou reprezantan an epi verifye gouvènè a anvan entèvyou a.",
      "florida-civics-answers": "Kapital Florid se Tallahassee. Sèvi ak kòd postal ou epi verifye non ki chanje yo ankò.",
      "new-york-civics-answers": "Kapital Nouyòk se Albany. Distri yo diferan nan Vil Nouyòk ak lòt kote nan eta a; sèvi ak kòd postal ou.",
    },
  },
};

const slugs = Object.keys(required);
function post(pack, slug, index) {
  const count = required[slug];
  const detail = pack.facts[slug];
  const sections = Array.from({ length: count }, (_, i) => ({
    heading: pack.heads[i],
    body: i === 0 ? detail : pack.bodies[i],
  }));
  return {
    title: pack.topics[index],
    description: `${pack.intro[0]} ${detail}`,
    sections,
  };
}

for (const [locale, pack] of Object.entries(packs)) {
  const file = path.join(i18nDir, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const [index, slug] of slugs.entries()) {
    if (!en[slug] || en[slug].sections.length !== required[slug]) throw new Error(`Unexpected en.json structure: ${slug}`);
    data[slug] = post(pack, slug, index);
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log(`patched ${locale}: ${slugs.length} learn bodies`);
}

const remainingPacks = {
  zh: {
    headings: ["核心信息", "练习方法", "易变答案", "面试准备", "下一步"],
    copy: ["使用邮编查询并在面试前再次核实会变动的官员姓名。", "大声练习答案；公民测验是口试。", "选择与 N-400 递交日期对应的 2008 或 2025 题库。", "使用闪卡、专项复习和面试模拟，直到稳定通过。", "查阅 USCIS 现行规则，以确认你的个案。"],
    entries: {
      "65-20": ["65/20 公民测验：20 道星标题", "年满 65 岁且合法永久居民满 20 年？学习 20 道星标题；最多问 10 道，答对 6 道即可通过。", "符合条件者可学习本考试版本中的 20 道星标题。官员最多问 10 道，需答对 6 道。"],
      "dates-names-officials-drills": ["公民测验专项：日期、名人与会变官员", "专练年份、著名人物和随选举变化的官员答案，2008 与 2025 均提供免费音频。", "错误常集中在年份和数字、名人姓名，以及会随选举或任命改变的官员。"],
      "texas-civics-answers": ["得州公民测验答案：首府、州长与参议员", "学习得州 USCIS 公民题答案：首府奥斯汀、州长，以及按邮编查询参议员和众议员。", "得州首府是奥斯汀。州长姓名可能因选举改变，应在面试前核实。"],
      "florida-civics-answers": ["佛罗里达公民测验答案：首府、州长与官员", "学习佛州 USCIS 公民题答案：首府塔拉哈西、州长及按邮编查询的官员。", "佛罗里达首府是塔拉哈西；州长和其他官员姓名可能改变。"],
      "new-york-civics-answers": ["纽约公民测验答案：首府、州长与邮编官员", "准备纽约 USCIS 公民题答案：首府奥尔巴尼、州长、参议员和众议员。", "纽约州首府是奥尔巴尼。纽约市与州内其他地区的选区不同，邮编查询最可靠。"],
    },
  },
  vi: {
    headings: ["Thông tin chính", "Cách luyện", "Đáp án thay đổi", "Sẵn sàng phỏng vấn", "Bước tiếp theo"],
    copy: ["Dùng mã ZIP để tra cứu và kiểm tra lại tên quan chức thay đổi trước ngày phỏng vấn.", "Nói to đáp án vì bài thi civics là thi vấn đáp.", "Chọn ngân hàng 2008 hoặc 2025 theo ngày nộp N-400 của bạn.", "Dùng thẻ học, ôn tập và mô phỏng đến khi đậu ổn định.", "Xem quy định USCIS hiện hành để xác nhận trường hợp của bạn."],
    entries: {
      "65-20": ["Bài thi civics 65/20: 20 câu có dấu sao", "65 tuổi trở lên và là thường trú nhân hợp pháp 20 năm? Học 20 câu có dấu sao; hỏi tối đa 10, cần đúng 6.", "Người đủ điều kiện học 20 câu có dấu sao theo phiên bản bài thi. Viên chức hỏi tối đa 10 câu và cần 6 câu đúng."],
      "dates-names-officials-drills": ["Luyện civics: ngày tháng, tên tuổi và quan chức thay đổi", "Luyện tập trung năm tháng, nhân vật nổi tiếng và quan chức thay đổi theo bầu cử; có audio miễn phí cho 2008 và 2025.", "Sai sót thường nằm ở năm và số, tên nổi tiếng, và quan chức thay đổi sau bầu cử hoặc bổ nhiệm."],
      "texas-civics-answers": ["Đáp án civics Texas: thủ phủ, thống đốc và thượng nghị sĩ", "Học đáp án USCIS Texas: thủ phủ Austin, thống đốc và cách tìm thượng nghị sĩ, dân biểu bằng ZIP.", "Thủ phủ Texas là Austin. Tên thống đốc có thể thay đổi sau bầu cử, nên kiểm tra trước phỏng vấn."],
      "florida-civics-answers": ["Đáp án civics Florida: thủ phủ, thống đốc và quan chức", "Học đáp án USCIS Florida: thủ phủ Tallahassee, thống đốc và quan chức theo ZIP.", "Thủ phủ Florida là Tallahassee; tên thống đốc và quan chức khác có thể thay đổi."],
      "new-york-civics-answers": ["Đáp án civics New York: thủ phủ, thống đốc và ZIP", "Chuẩn bị đáp án USCIS New York: thủ phủ Albany, thống đốc, thượng nghị sĩ và dân biểu.", "Thủ phủ New York là Albany. Khu vực bầu cử khác nhau giữa Thành phố New York và phần còn lại của bang; tra ZIP là an toàn nhất."],
    },
  },
  tl: {
    headings: ["Pangunahing impormasyon", "Paano mag-practice", "Mga nagbabagong sagot", "Handa sa interview", "Susunod na hakbang"],
    copy: ["Gamitin ang ZIP code sa paghahanap at i-check muli ang mga opisyal bago ang interview.", "Sabihin nang malakas ang mga sagot dahil oral ang civics test.", "Piliin ang 2008 o 2025 bank ayon sa N-400 filing date mo.", "Gamitin ang flashcards, review, at simulation hanggang consistent ang pagpasa.", "Tingnan ang kasalukuyang USCIS rules para sa sarili mong case."],
    entries: {
      "65-20": ["65/20 civics test: 20 starred questions", "65+ at legal permanent resident nang 20 taon? Aralin ang 20 starred questions; hanggang 10 ang tanong at 6 ang kailangang tama.", "Kung qualified, 20 starred questions mula sa test version mo ang aaralin. Hanggang 10 ang tanong at 6 ang kailangang tama."],
      "dates-names-officials-drills": ["Civics drills: dates, pangalan at nagbabagong opisyal", "Nakatuong drills para sa taon, kilalang pangalan at mga opisyal na nagbabago sa eleksiyon; may libreng audio para sa 2008 at 2025.", "Madalas ang mali sa years at numbers, kilalang pangalan, at mga opisyal na nagbabago sa eleksiyon o appointment."],
      "texas-civics-answers": ["Texas civics answers: capital, governor at senators", "Aralin ang USCIS answers ng Texas: capital na Austin, governor, at paghahanap ng senators at representative sa ZIP.", "Ang capital ng Texas ay Austin. Maaaring magbago ang governor sa eleksiyon kaya i-verify bago ang interview."],
      "florida-civics-answers": ["Florida civics answers: capital, governor at officials", "Aralin ang USCIS answers ng Florida: capital na Tallahassee, governor at mga opisyal ayon sa ZIP.", "Ang capital ng Florida ay Tallahassee; maaaring magbago ang governor at iba pang opisyal."],
      "new-york-civics-answers": ["New York civics answers: capital, governor at ZIP officials", "Maghanda para sa USCIS answers ng New York: capital na Albany, governor, senators at representative.", "Ang capital ng New York ay Albany. Magkaiba ang districts sa New York City at sa ibang bahagi ng state, kaya gamitin ang ZIP lookup."],
    },
  },
};

for (const [locale, pack] of Object.entries(remainingPacks)) {
  const file = path.join(i18nDir, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const [slug, [title, description, firstBody]] of Object.entries(pack.entries)) {
    const count = required[slug];
    data[slug] = {
      title,
      description,
      sections: Array.from({ length: count }, (_, i) => ({
        heading: pack.headings[i],
        body: i === 0 ? firstBody : pack.copy[i],
      })),
    };
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log(`patched ${locale}: 4 remaining bodies; fixed 65-20`);
}
