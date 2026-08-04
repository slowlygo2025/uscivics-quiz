import type { Locale } from "./types";

export type SitePageSection = { heading: string; body: string };

export type SitePage = {
  slug: "about" | "contact" | "privacy" | "terms";
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  sections: Record<Locale, SitePageSection[]>;
};

const CONTACT_EMAIL = "contact@uscivics-quiz.com";

export const SITE_PAGES: SitePage[] = [
  {
    slug: "about",
    title: {
      en: "About USCivics Quiz",
      es: "Acerca de USCivics Quiz",
      zh: "关于 USCivics Quiz",
      vi: "Giới thiệu về USCivics Quiz",
      tl: "Tungkol sa USCivics Quiz",
      ar: "حول USCivics Quiz",
      ko: "USCivics Quiz 소개",
      hi: "USCivics Quiz के बारे में",
      ru: "О USCivics Quiz",
      ht: "Konsènan USCivics Quiz",
      fr: "À propos de USCivics Quiz",
    },
    description: {
      en: "USCivics Quiz is an independent, free study tool for the USCIS naturalization civics and English tests.",
      es: "USCivics Quiz es una herramienta independiente y gratuita para estudiar el examen cívico e inglés de naturalización USCIS.",
      zh: "USCivics Quiz 是一个独立、免费的学习工具，帮助您准备 USCIS 入籍公民课与英语考试。",
      vi: "USCivics Quiz là công cụ học tập độc lập, miễn phí dành cho kỳ thi công dân học (civics) và tiếng Anh nhập tịch của USCIS.",
      tl: "Ang USCivics Quiz ay isang malaya at libreng gamit pang-aral para sa pagsusulit sa civics at Ingles para sa naturalization ng USCIS.",
      ar: "USCivics Quiz أداة دراسة مستقلة ومجانية لاختبار التربية المدنية واللغة الإنجليزية للتجنس لدى USCIS.",
      ko: "USCivics Quiz는 USCIS 귀화 시민교육 및 영어 시험을 위한 독립적이고 무료인 학습 도구입니다.",
      hi: "USCivics Quiz, USCIS नागरिकता (civics) और अंग्रेज़ी परीक्षा के लिए एक स्वतंत्र, मुफ़्त अध्ययन उपकरण है।",
      ru: "USCivics Quiz — независимый бесплатный инструмент для подготовки к экзамену USCIS по граждановедению и английскому языку при натурализации.",
      ht: "USCivics Quiz se yon zouti etid endepandan e gratis pou egzamen sivik ak angle pou naturalizasyon USCIS.",
      fr: "USCivics Quiz est un outil d'étude indépendant et gratuit pour l'examen de civisme et d'anglais de naturalisation de l'USCIS.",
    },
    sections: {
      en: [
        {
          heading: "Our mission",
          body: "We help immigrants prepare for the U.S. naturalization interview with free practice for the official civics questions (2008 and 2025 versions), English reading and writing vocabulary, oral practice, and interview simulation — without requiring an account.",
        },
        {
          heading: "Independent study tool",
          body: "USCivics Quiz is not affiliated with, endorsed by, or sponsored by U.S. Citizenship and Immigration Services (USCIS), the Department of Homeland Security, or any U.S. government agency. Official rules and materials are published by the U.S. government; we provide practice tools based on publicly available study content.",
        },
        {
          heading: "What we offer",
          body: "Practice hubs for the 100- and 128-question civics banks, 65/20 starred sets, topic and state landings, free audio (text-to-speech), English reading/writing drills, eligibility guidance for choosing a test version, and short study guides. Progress can be saved locally in your browser.",
        },
        {
          heading: "Not legal advice",
          body: "Nothing on this site is legal advice or a substitute for official government guidance or a qualified immigration attorney. Always confirm requirements for your own case before filing or attending an interview.",
        },
      ],
      es: [
        {
          heading: "Nuestra misión",
          body: "Ayudamos a inmigrantes a prepararse para la entrevista de naturalización con práctica gratis de las preguntas cívicas oficiales (versiones 2008 y 2025), vocabulario de reading y writing, práctica oral y simulación de entrevista — sin crear una cuenta.",
        },
        {
          heading: "Herramienta independiente",
          body: "USCivics Quiz no está afiliado, respaldado ni patrocinado por U.S. Citizenship and Immigration Services (USCIS), el Department of Homeland Security ni ninguna agencia del gobierno de EE.UU. Las reglas y materiales oficiales los publica el gobierno; nosotros ofrecemos herramientas de práctica basadas en contenido público de estudio.",
        },
        {
          heading: "Qué ofrecemos",
          body: "Hubs de práctica para los bancos de 100 y 128 preguntas, sets 65/20, landings por tema y estado, audio gratis (síntesis de voz), drills de inglés, guía de elegibilidad para elegir versión, y guías cortas. El progreso puede guardarse en el navegador.",
        },
        {
          heading: "No es asesoría legal",
          body: "Nada en este sitio es asesoría legal ni reemplaza la guía oficial del gobierno o a un abogado de inmigración calificado. Confirmá siempre los requisitos de tu caso antes de presentar papeles o ir a la entrevista.",
        },
      ],
      zh: [
        {
          heading: "我们的使命",
          body: "我们帮助移民准备美国入籍面谈，提供官方公民知识题（2008 版和 2025 版）的免费练习、英语阅读和写作词汇、口语练习以及模拟面谈——无需注册账户。",
        },
        {
          heading: "独立的学习工具",
          body: "USCivics Quiz 与美国公民及移民服务局（USCIS）、国土安全部（DHS）或任何美国政府机构没有任何关联，也未获得其认可或赞助。官方规则和材料由美国政府发布；我们仅根据公开的学习内容提供练习工具。",
        },
        {
          heading: "我们提供的内容",
          body: "包括 100 题和 128 题公民知识题库的练习中心、65/20 星号题集、按主题和州划分的页面、免费语音朗读（文字转语音）、英语阅读/写作练习、选择考试版本的资格指南，以及简短的学习指南。学习进度可保存在您浏览器的本地存储中。",
        },
        {
          heading: "并非法律建议",
          body: "本网站上的任何内容均不构成法律建议，也不能替代官方政府指导或合格的移民律师的建议。在提交申请或参加面谈之前，请务必确认适用于您自身情况的要求。",
        },
      ],
      vi: [
        {
          heading: "Sứ mệnh của chúng tôi",
          body: "Chúng tôi giúp người nhập cư chuẩn bị cho buổi phỏng vấn nhập tịch Hoa Kỳ bằng cách cung cấp miễn phí phần luyện tập các câu hỏi công dân học chính thức (phiên bản 2008 và 2025), từ vựng đọc và viết tiếng Anh, luyện nói và mô phỏng phỏng vấn — không cần tạo tài khoản.",
        },
        {
          heading: "Công cụ học tập độc lập",
          body: "USCivics Quiz không liên kết, không được chứng thực hay tài trợ bởi Sở Di trú và Nhập tịch Hoa Kỳ (USCIS), Bộ An ninh Nội địa (DHS), hay bất kỳ cơ quan chính phủ Hoa Kỳ nào. Các quy định và tài liệu chính thức do chính phủ Hoa Kỳ công bố; chúng tôi chỉ cung cấp công cụ luyện tập dựa trên nội dung học tập công khai.",
        },
        {
          heading: "Những gì chúng tôi cung cấp",
          body: "Các trung tâm luyện tập cho bộ 100 và 128 câu hỏi công dân học, bộ câu hỏi có dấu sao 65/20, các trang theo chủ đề và tiểu bang, âm thanh miễn phí (chuyển văn bản thành giọng nói), bài luyện đọc/viết tiếng Anh, hướng dẫn điều kiện để chọn phiên bản kỳ thi, và các hướng dẫn học ngắn gọn. Tiến trình học có thể được lưu cục bộ trong trình duyệt của bạn.",
        },
        {
          heading: "Không phải là tư vấn pháp lý",
          body: "Không có nội dung nào trên trang này là tư vấn pháp lý hay thay thế cho hướng dẫn chính thức của chính phủ hoặc luật sư di trú có chuyên môn. Hãy luôn xác nhận các yêu cầu cho trường hợp của riêng bạn trước khi nộp hồ sơ hoặc tham dự phỏng vấn.",
        },
      ],
      tl: [
        {
          heading: "Ang aming misyon",
          body: "Tinutulungan namin ang mga imigrante na maghanda para sa panayam sa naturalization sa Estados Unidos sa pamamagitan ng libreng pagsasanay para sa opisyal na mga tanong sa civics (bersyon 2008 at 2025), bokabularyo sa pagbabasa at pagsusulat ng Ingles, pagsasanay sa pagsasalita, at simulation ng panayam — nang hindi kailangan ng account.",
        },
        {
          heading: "Malayang kagamitan pang-aral",
          body: "Ang USCivics Quiz ay hindi kaugnay, sinang-ayunan, o itinataguyod ng U.S. Citizenship and Immigration Services (USCIS), ng Department of Homeland Security, o ng anumang ahensya ng gobyerno ng Estados Unidos. Ang opisyal na mga alituntunin at materyales ay inilalathala ng gobyerno ng Estados Unidos; nagbibigay kami ng mga kagamitang pansanay batay sa pampublikong nilalamang pang-aral.",
        },
        {
          heading: "Ang aming mga inaalok",
          body: "Mga sentro ng pagsasanay para sa 100- at 128-tanong na civics bank, 65/20 na set ng mga may bituing tanong, mga pahina ayon sa paksa at estado, libreng audio (text-to-speech), pagsasanay sa pagbabasa/pagsusulat ng Ingles, gabay sa pagiging kwalipikado para pumili ng bersyon ng pagsusulit, at maiikling gabay sa pag-aaral. Ang progreso ay maaaring i-save nang lokal sa iyong browser.",
        },
        {
          heading: "Hindi legal na payo",
          body: "Walang anuman sa site na ito ang legal na payo o kapalit ng opisyal na gabay ng gobyerno o kwalipikadong abogado sa imigrasyon. Laging kumpirmahin ang mga kinakailangan para sa iyong sariling kaso bago mag-file o dumalo sa panayam.",
        },
      ],
      ar: [
        {
          heading: "مهمتنا",
          body: "نساعد المهاجرين على الاستعداد لمقابلة التجنس الأمريكية من خلال تدريب مجاني على أسئلة التربية المدنية الرسمية (إصداري 2008 و2025)، ومفردات القراءة والكتابة بالإنجليزية، والتدريب الشفهي، ومحاكاة المقابلة — دون الحاجة إلى إنشاء حساب.",
        },
        {
          heading: "أداة دراسة مستقلة",
          body: "لا ترتبط USCivics Quiz بأي شكل من الأشكال بدائرة خدمات المواطنة والهجرة الأمريكية (USCIS)، أو وزارة الأمن الداخلي، أو أي جهة حكومية أمريكية أخرى، ولا تحظى بتأييدها أو رعايتها. تُنشر القواعد والمواد الرسمية من قبل الحكومة الأمريكية؛ ونحن نوفر أدوات تدريب استناداً إلى محتوى دراسي متاح للعموم.",
        },
        {
          heading: "ما الذي نقدمه",
          body: "مراكز تدريب لبنكي أسئلة 100 و128 سؤالاً في التربية المدنية، مجموعات الأسئلة المميزة بنجمة 65/20، صفحات حسب الموضوع والولاية، صوت مجاني (تحويل النص إلى كلام)، تمارين قراءة وكتابة بالإنجليزية، إرشادات الأهلية لاختيار إصدار الاختبار، وأدلة دراسية قصيرة. يمكن حفظ التقدم محلياً في متصفحك.",
        },
        {
          heading: "ليست استشارة قانونية",
          body: "لا شيء في هذا الموقع يُعد استشارة قانونية أو بديلاً عن الإرشاد الحكومي الرسمي أو محامي هجرة مؤهل. تأكد دائماً من المتطلبات الخاصة بحالتك قبل تقديم الطلب أو حضور المقابلة.",
        },
      ],
      ko: [
        {
          heading: "우리의 사명",
          body: "저희는 이민자들이 미국 귀화 인터뷰를 준비할 수 있도록 공식 시민교육 문제(2008년 및 2025년 버전)에 대한 무료 연습, 영어 읽기 및 쓰기 어휘, 말하기 연습, 인터뷰 모의 시험을 제공합니다 — 계정 없이도 이용할 수 있습니다.",
        },
        {
          heading: "독립적인 학습 도구",
          body: "USCivics Quiz는 미국 시민권 및 이민 서비스국(USCIS), 국토안보부(DHS) 또는 어떠한 미국 정부 기관과도 제휴, 승인, 후원 관계가 없습니다. 공식 규정과 자료는 미국 정부에서 발행하며, 저희는 공개적으로 이용 가능한 학습 자료를 바탕으로 연습 도구를 제공할 뿐입니다.",
        },
        {
          heading: "제공하는 서비스",
          body: "100문항 및 128문항 시민교육 문제 은행 연습 허브, 65/20 별표 문제 세트, 주제 및 주(state)별 페이지, 무료 오디오(텍스트 음성 변환), 영어 읽기/쓰기 연습, 시험 버전 선택을 위한 자격 안내, 짧은 학습 가이드를 제공합니다. 진행 상황은 브라우저에 로컬로 저장할 수 있습니다.",
        },
        {
          heading: "법률 자문이 아닙니다",
          body: "이 사이트의 어떠한 내용도 법률 자문이 아니며, 공식 정부 지침이나 자격을 갖춘 이민 변호사를 대체할 수 없습니다. 서류를 제출하거나 인터뷰에 참석하기 전에 항상 본인의 사례에 맞는 요건을 확인하십시오.",
        },
      ],
      hi: [
        {
          heading: "हमारा मिशन",
          body: "हम आप्रवासियों को अमेरिकी नागरिकता (naturalization) साक्षात्कार की तैयारी में मदद करते हैं — आधिकारिक सिविक्स प्रश्नों (2008 और 2025 संस्करण) के मुफ़्त अभ्यास, अंग्रेज़ी पठन और लेखन शब्दावली, मौखिक अभ्यास, और साक्षात्कार सिमुलेशन के साथ — बिना किसी खाते की आवश्यकता के।",
        },
        {
          heading: "स्वतंत्र अध्ययन उपकरण",
          body: "USCivics Quiz का यू.एस. सिटिज़नशिप एंड इमिग्रेशन सर्विसेज़ (USCIS), होमलैंड सिक्योरिटी विभाग, या किसी भी अमेरिकी सरकारी एजेंसी से कोई संबंध, समर्थन या प्रायोजन नहीं है। आधिकारिक नियम और सामग्री अमेरिकी सरकार द्वारा प्रकाशित की जाती है; हम सार्वजनिक रूप से उपलब्ध अध्ययन सामग्री के आधार पर अभ्यास उपकरण प्रदान करते हैं।",
        },
        {
          heading: "हम क्या प्रदान करते हैं",
          body: "100 और 128 प्रश्नों वाले सिविक्स बैंकों के लिए अभ्यास हब, 65/20 स्टार वाले सेट, विषय और राज्य आधारित पेज, मुफ़्त ऑडियो (टेक्स्ट-टू-स्पीच), अंग्रेज़ी पठन/लेखन अभ्यास, परीक्षा संस्करण चुनने के लिए पात्रता मार्गदर्शन, और संक्षिप्त अध्ययन गाइड। प्रगति को आपके ब्राउज़र में स्थानीय रूप से सहेजा जा सकता है।",
        },
        {
          heading: "यह कानूनी सलाह नहीं है",
          body: "इस साइट पर कुछ भी कानूनी सलाह नहीं है और न ही यह आधिकारिक सरकारी मार्गदर्शन या किसी योग्य आप्रवासन वकील का विकल्प है। आवेदन करने या साक्षात्कार में शामिल होने से पहले हमेशा अपने मामले की आवश्यकताओं की पुष्टि करें।",
        },
      ],
      ru: [
        {
          heading: "Наша миссия",
          body: "Мы помогаем иммигрантам готовиться к собеседованию на натурализацию в США: бесплатная практика официальных вопросов по граждановедению (версии 2008 и 2025 годов), словарный запас для чтения и письма на английском, устная практика и симуляция собеседования — без необходимости регистрации.",
        },
        {
          heading: "Независимый инструмент для подготовки",
          body: "USCivics Quiz не связан, не одобрен и не спонсируется Службой гражданства и иммиграции США (USCIS), Министерством внутренней безопасности (DHS) или какими-либо другими государственными органами США. Официальные правила и материалы публикуются правительством США; мы предоставляем инструменты для практики на основе общедоступных учебных материалов.",
        },
        {
          heading: "Что мы предлагаем",
          body: "Центры практики для банков из 100 и 128 вопросов по граждановедению, наборы 65/20 с отмеченными звёздочкой вопросами, страницы по темам и штатам, бесплатное аудио (синтез речи), упражнения по чтению/письму на английском, руководство по выбору версии экзамена и краткие учебные пособия. Прогресс можно сохранять локально в вашем браузере.",
        },
        {
          heading: "Это не юридическая консультация",
          body: "Ничто на этом сайте не является юридической консультацией и не заменяет официальные рекомендации правительства или квалифицированного иммиграционного адвоката. Всегда уточняйте требования для вашего конкретного случая перед подачей документов или собеседованием.",
        },
      ],
      ht: [
        {
          heading: "Misyon nou",
          body: "Nou ede imigran prepare pou entèvyou naturalizasyon Ozetazini avèk egzèsis gratis pou kesyon sivik ofisyèl yo (vèsyon 2008 ak 2025), vokabilè li ak ekri an angle, pratik oral, ak simulasyon entèvyou — san ou pa bezwen kreye yon kont.",
        },
        {
          heading: "Zouti etid endepandan",
          body: "USCivics Quiz pa gen okenn afilyasyon, li pa apwouve ni patwone pa U.S. Citizenship and Immigration Services (USCIS), Depatman Sekirite Enteryè (DHS), oswa nenpòt ajans gouvènman ameriken. Gouvènman ameriken an pibliye règ ak materyèl ofisyèl yo; nou ofri zouti pratik ki baze sou kontni etid ki disponib piblikman.",
        },
        {
          heading: "Sa nou ofri",
          body: "Sant pratik pou bank 100 ak 128 kesyon sivik yo, seri 65/20 kesyon ak zetwal, paj pa sijè ak pa eta, odyo gratis (tèks-a-vwa), egzèsis li/ekri an angle, gid elijibilite pou chwazi vèsyon egzamen an, ak ti gid etid kout. Ou ka anrejistre pwogrè ou lokalman nan navigatè ou.",
        },
        {
          heading: "Sa se pa konsèy legal",
          body: "Anyen sou sit sa a se pa konsèy legal ni yon ranplasan pou gid ofisyèl gouvènman an oswa yon avoka imigrasyon kalifye. Toujou konfime kondisyon pou pwòp ka pa w anvan ou ranpli papye oswa ale nan yon entèvyou.",
        },
      ],
      fr: [
        {
          heading: "Notre mission",
          body: "Nous aidons les immigrants à se préparer à l'entretien de naturalisation américain grâce à une pratique gratuite des questions officielles de civisme (versions 2008 et 2025), du vocabulaire de lecture et d'écriture en anglais, de la pratique orale et de simulations d'entretien — sans nécessiter de compte.",
        },
        {
          heading: "Outil d'étude indépendant",
          body: "USCivics Quiz n'est affilié, approuvé ni parrainé par les services de citoyenneté et d'immigration des États-Unis (USCIS), le département de la Sécurité intérieure (DHS), ni aucune agence gouvernementale américaine. Les règles et documents officiels sont publiés par le gouvernement américain ; nous fournissons des outils de pratique basés sur du contenu d'étude accessible au public.",
        },
        {
          heading: "Ce que nous proposons",
          body: "Des espaces de pratique pour les banques de 100 et 128 questions de civisme, des ensembles 65/20 avec questions marquées d'une étoile, des pages par thème et par État, de l'audio gratuit (synthèse vocale), des exercices de lecture/écriture en anglais, un guide d'admissibilité pour choisir la version de l'examen, et de courts guides d'étude. La progression peut être enregistrée localement dans votre navigateur.",
        },
        {
          heading: "Ce n'est pas un conseil juridique",
          body: "Rien sur ce site ne constitue un conseil juridique ni un substitut aux directives officielles du gouvernement ou à un avocat d'immigration qualifié. Confirmez toujours les exigences propres à votre cas avant de déposer une demande ou de vous présenter à un entretien.",
        },
      ],
    },
  },
  {
    slug: "contact",
    title: {
      en: "Contact",
      es: "Contacto",
      zh: "联系我们",
      vi: "Liên hệ",
      tl: "Makipag-ugnayan",
      ar: "اتصل بنا",
      ko: "문의하기",
      hi: "संपर्क करें",
      ru: "Контакты",
      ht: "Kontakte nou",
      fr: "Contact",
    },
    description: {
      en: "How to reach the USCivics Quiz team for feedback, corrections, or partnership questions.",
      es: "Cómo contactar al equipo de USCivics Quiz para comentarios, correcciones o consultas.",
      zh: "如需反馈、内容更正或合作咨询，请联系 USCivics Quiz 团队。",
      vi: "Cách liên hệ với đội ngũ USCivics Quiz để góp ý, chỉnh sửa nội dung, hoặc hỏi về hợp tác.",
      tl: "Paano makontak ang team ng USCivics Quiz para sa feedback, mga pagwawasto, o mga tanong tungkol sa partnership.",
      ar: "كيفية التواصل مع فريق USCivics Quiz لتقديم الملاحظات أو التصحيحات أو أسئلة الشراكة.",
      ko: "피드백, 내용 수정 또는 제휴 문의를 위해 USCivics Quiz 팀에 연락하는 방법입니다.",
      hi: "प्रतिक्रिया, सुधार, या साझेदारी संबंधी प्रश्नों के लिए USCivics Quiz टीम से कैसे संपर्क करें।",
      ru: "Как связаться с командой USCivics Quiz по вопросам обратной связи, исправлений или партнёрства.",
      ht: "Kijan pou kontakte ekip USCivics Quiz pou fè kòmantè, korije kontni, oswa poze kesyon sou patenarya.",
      fr: "Comment joindre l'équipe de USCivics Quiz pour des commentaires, des corrections ou des questions de partenariat.",
    },
    sections: {
      en: [
        {
          heading: "Email",
          body: `For feedback, content corrections, privacy requests, or partnership questions, email us at ${CONTACT_EMAIL}. We read every message and typically respond within a few business days.`,
        },
        {
          heading: "What to include",
          body: "Please include your browser/device if you are reporting a bug, the page URL, and a short description. For quiz content issues, note the test version (2008 or 2025) and question number when possible.",
        },
        {
          heading: "Case status and legal help",
          body: "We cannot check USCIS case status, file forms for you, or give legal advice. For official case tools and policy, use government channels or consult a licensed attorney or accredited representative.",
        },
      ],
      es: [
        {
          heading: "Email",
          body: `Para comentarios, correcciones de contenido, solicitudes de privacidad o consultas, escribinos a ${CONTACT_EMAIL}. Leemos todos los mensajes y solemos responder en unos días hábiles.`,
        },
        {
          heading: "Qué incluir",
          body: "Si reportás un error, incluí navegador/dispositivo, la URL de la página y una descripción breve. Para problemas de contenido, indicá la versión del examen (2008 o 2025) y el número de pregunta si podés.",
        },
        {
          heading: "Estado de caso y ayuda legal",
          body: "No podemos consultar el estado de tu caso USCIS, presentar formularios por vos ni dar asesoría legal. Para herramientas oficiales y política, usá canales del gobierno o consultá a un abogado o representante acreditado.",
        },
      ],
      zh: [
        {
          heading: "电子邮件",
          body: `如有反馈、内容更正、隐私请求或合作咨询，请发邮件至 ${CONTACT_EMAIL}。我们会阅读每一条信息，通常在几个工作日内回复。`,
        },
        {
          heading: "请附上的信息",
          body: "如果您在报告错误，请附上您的浏览器/设备信息、页面网址以及简短说明。对于题库内容问题，请尽量注明考试版本（2008 或 2025）和题号。",
        },
        {
          heading: "案件状态与法律帮助",
          body: "我们无法查询 USCIS 案件状态、代您提交表格或提供法律建议。如需官方案件工具和政策信息，请通过政府渠道，或咨询持牌律师或经认可的代表。",
        },
      ],
      vi: [
        {
          heading: "Email",
          body: `Để góp ý, chỉnh sửa nội dung, yêu cầu về quyền riêng tư hoặc hỏi về hợp tác, hãy gửi email cho chúng tôi tại ${CONTACT_EMAIL}. Chúng tôi đọc mọi tin nhắn và thường phản hồi trong vài ngày làm việc.`,
        },
        {
          heading: "Nội dung cần cung cấp",
          body: "Vui lòng cho biết trình duyệt/thiết bị nếu bạn đang báo lỗi, URL của trang, và mô tả ngắn gọn. Đối với vấn đề về nội dung câu hỏi, hãy nêu rõ phiên bản kỳ thi (2008 hoặc 2025) và số thứ tự câu hỏi nếu có thể.",
        },
        {
          heading: "Tình trạng hồ sơ và hỗ trợ pháp lý",
          body: "Chúng tôi không thể kiểm tra tình trạng hồ sơ USCIS, nộp đơn thay bạn, hoặc đưa ra tư vấn pháp lý. Để sử dụng công cụ và chính sách chính thức, hãy dùng các kênh của chính phủ hoặc tham khảo ý kiến luật sư có giấy phép hoặc đại diện được công nhận.",
        },
      ],
      tl: [
        {
          heading: "Email",
          body: `Para sa feedback, pagwawasto ng nilalaman, mga kahilingan tungkol sa privacy, o mga tanong sa partnership, mag-email sa amin sa ${CONTACT_EMAIL}. Binabasa namin ang bawat mensahe at karaniwang tumutugon kami sa loob ng ilang araw ng negosyo.`,
        },
        {
          heading: "Ano ang isasama",
          body: "Pakisama ang iyong browser/device kung nagre-report ka ng bug, ang URL ng pahina, at maikling paglalarawan. Para sa mga isyu sa nilalaman ng quiz, banggitin ang bersyon ng pagsusulit (2008 o 2025) at numero ng tanong kung maaari.",
        },
        {
          heading: "Status ng kaso at legal na tulong",
          body: "Hindi namin makikita ang status ng iyong kaso sa USCIS, hindi namin maisasampa ang mga porma para sa iyo, o magbibigay ng legal na payo. Para sa opisyal na kagamitan at patakaran ng kaso, gamitin ang mga kanal ng gobyerno o kumonsulta sa lisensyadong abogado o akreditadong kinatawan.",
        },
      ],
      ar: [
        {
          heading: "البريد الإلكتروني",
          body: `للملاحظات أو تصحيحات المحتوى أو طلبات الخصوصية أو أسئلة الشراكة، راسلنا عبر البريد الإلكتروني على ${CONTACT_EMAIL}. نقرأ كل رسالة ونرد عادةً خلال بضعة أيام عمل.`,
        },
        {
          heading: "ما الذي يجب تضمينه",
          body: "يرجى ذكر المتصفح/الجهاز الذي تستخدمه إذا كنت تبلّغ عن خطأ، وعنوان الصفحة، ووصف مختصر. بالنسبة لمشكلات محتوى الاختبار، يرجى ذكر إصدار الاختبار (2008 أو 2025) ورقم السؤال إن أمكن.",
        },
        {
          heading: "حالة الطلب والمساعدة القانونية",
          body: "لا يمكننا التحقق من حالة طلبك لدى USCIS، أو تقديم النماذج نيابة عنك، أو تقديم استشارة قانونية. للأدوات والسياسات الرسمية المتعلقة بحالتك، استخدم القنوات الحكومية أو استشر محامياً مرخصاً أو ممثلاً معتمداً.",
        },
      ],
      ko: [
        {
          heading: "이메일",
          body: `피드백, 콘텐츠 수정, 개인정보 관련 요청 또는 제휴 문의는 ${CONTACT_EMAIL}로 이메일을 보내주세요. 모든 메시지를 확인하며 보통 영업일 기준 며칠 내로 답변드립니다.`,
        },
        {
          heading: "포함해야 할 내용",
          body: "버그를 신고하는 경우 사용 중인 브라우저/기기, 페이지 URL, 간단한 설명을 함께 알려주세요. 퀴즈 콘텐츠 관련 문제의 경우 가능하면 시험 버전(2008년 또는 2025년)과 문제 번호를 알려주세요.",
        },
        {
          heading: "사건 상태 및 법률 지원",
          body: "저희는 USCIS 사건 상태를 확인하거나, 서류를 대신 제출하거나, 법률 자문을 제공할 수 없습니다. 공식 사건 처리 도구와 정책은 정부 채널을 이용하거나 면허를 소지한 변호사 또는 공인 대리인에게 문의하세요.",
        },
      ],
      hi: [
        {
          heading: "ईमेल",
          body: `प्रतिक्रिया, सामग्री सुधार, गोपनीयता संबंधी अनुरोध, या साझेदारी प्रश्नों के लिए हमें ${CONTACT_EMAIL} पर ईमेल करें। हम हर संदेश पढ़ते हैं और आमतौर पर कुछ कार्य दिवसों के भीतर जवाब देते हैं।`,
        },
        {
          heading: "क्या शामिल करें",
          body: "यदि आप किसी बग की रिपोर्ट कर रहे हैं, तो कृपया अपना ब्राउज़र/डिवाइस, पेज का URL, और संक्षिप्त विवरण शामिल करें। क्विज़ सामग्री की समस्याओं के लिए, यदि संभव हो तो परीक्षा संस्करण (2008 या 2025) और प्रश्न संख्या बताएं।",
        },
        {
          heading: "केस स्थिति और कानूनी सहायता",
          body: "हम USCIS केस की स्थिति की जांच नहीं कर सकते, आपके लिए फॉर्म दाखिल नहीं कर सकते, या कानूनी सलाह नहीं दे सकते। आधिकारिक केस उपकरणों और नीतियों के लिए, सरकारी माध्यमों का उपयोग करें या लाइसेंस प्राप्त वकील या मान्यता प्राप्त प्रतिनिधि से सलाह लें।",
        },
      ],
      ru: [
        {
          heading: "Электронная почта",
          body: `По вопросам обратной связи, исправления контента, запросов о конфиденциальности или партнёрства пишите нам на ${CONTACT_EMAIL}. Мы читаем каждое сообщение и обычно отвечаем в течение нескольких рабочих дней.`,
        },
        {
          heading: "Что указать в письме",
          body: "Если вы сообщаете об ошибке, пожалуйста, укажите ваш браузер/устройство, URL страницы и краткое описание. По вопросам содержания вопросов теста укажите, по возможности, версию экзамена (2008 или 2025) и номер вопроса.",
        },
        {
          heading: "Статус дела и юридическая помощь",
          body: "Мы не можем проверить статус вашего дела в USCIS, подать формы за вас или дать юридическую консультацию. Для официальных инструментов и информации о вашем деле используйте государственные каналы или обратитесь к лицензированному адвокату или аккредитованному представителю.",
        },
      ],
      ht: [
        {
          heading: "Imel",
          body: `Pou kòmantè, korije kontni, demann sou vi prive, oswa kesyon sou patenarya, voye yon imel ba nou nan ${CONTACT_EMAIL}. Nou li chak mesaj e nou konn reponn nan kèk jou ouvrab.`,
        },
        {
          heading: "Sa pou enkli",
          body: "Tanpri enkli navigatè/aparèy ou si w ap rapòte yon pwoblèm teknik, URL paj la, ak yon ti deskripsyon kout. Pou pwoblèm ak kontni egzamen an, note vèsyon egzamen an (2008 oswa 2025) ak nimewo kesyon an si posib.",
        },
        {
          heading: "Estati ka ak èd legal",
          body: "Nou pa ka verifye estati ka USCIS ou, ranpli fòm pou ou, oswa bay konsèy legal. Pou zouti ofisyèl ak règleman sou ka a, itilize kanal gouvènman an oswa konsilte yon avoka ki gen lisans oswa yon reprezantan akredite.",
        },
      ],
      fr: [
        {
          heading: "E-mail",
          body: `Pour des commentaires, des corrections de contenu, des demandes relatives à la confidentialité ou des questions de partenariat, écrivez-nous à ${CONTACT_EMAIL}. Nous lisons chaque message et répondons généralement sous quelques jours ouvrables.`,
        },
        {
          heading: "Informations à inclure",
          body: "Veuillez indiquer votre navigateur/appareil si vous signalez un bug, l'URL de la page, et une brève description. Pour les problèmes de contenu du quiz, précisez la version de l'examen (2008 ou 2025) et le numéro de la question si possible.",
        },
        {
          heading: "Statut de dossier et aide juridique",
          body: "Nous ne pouvons pas vérifier le statut de votre dossier USCIS, déposer des formulaires en votre nom, ni fournir de conseils juridiques. Pour les outils officiels et les politiques relatives à votre dossier, utilisez les canaux gouvernementaux ou consultez un avocat agréé ou un représentant accrédité.",
        },
      ],
    },
  },
  {
    slug: "privacy",
    title: {
      en: "Privacy Policy",
      es: "Política de privacidad",
      zh: "隐私政策",
      vi: "Chính sách quyền riêng tư",
      tl: "Patakaran sa Privacy",
      ar: "سياسة الخصوصية",
      ko: "개인정보 처리방침",
      hi: "गोपनीयता नीति",
      ru: "Политика конфиденциальности",
      ht: "Règleman sou vi prive",
      fr: "Politique de confidentialité",
    },
    description: {
      en: "How USCivics Quiz collects, uses, and shares information when you use uscivics-quiz.com.",
      es: "Cómo USCivics Quiz recopila, usa y comparte información cuando usás uscivics-quiz.com.",
      zh: "USCivics Quiz 在您使用 uscivics-quiz.com 时如何收集、使用和共享信息。",
      vi: "Cách USCivics Quiz thu thập, sử dụng và chia sẻ thông tin khi bạn sử dụng uscivics-quiz.com.",
      tl: "Paano kinokolekta, ginagamit, at ibinabahagi ng USCivics Quiz ang impormasyon kapag ginagamit mo ang uscivics-quiz.com.",
      ar: "كيف تجمع USCivics Quiz المعلومات وتستخدمها وتشاركها عند استخدامك لموقع uscivics-quiz.com.",
      ko: "USCivics Quiz가 uscivics-quiz.com 이용 시 정보를 수집, 사용, 공유하는 방식입니다.",
      hi: "जब आप uscivics-quiz.com का उपयोग करते हैं तो USCivics Quiz जानकारी कैसे एकत्र, उपयोग और साझा करती है।",
      ru: "Как USCivics Quiz собирает, использует и передаёт информацию при использовании вами сайта uscivics-quiz.com.",
      ht: "Kijan USCivics Quiz kolekte, itilize, ak pataje enfòmasyon lè w ap itilize uscivics-quiz.com.",
      fr: "Comment USCivics Quiz collecte, utilise et partage les informations lorsque vous utilisez uscivics-quiz.com.",
    },
    sections: {
      en: [
        {
          heading: "Overview",
          body: "USCivics Quiz (“we”, “us”) operates https://uscivics-quiz.com. This policy explains what information we process when you use the site. Last updated: August 4, 2026.",
        },
        {
          heading: "Information you provide",
          body: "You can use the site without creating an account. Optional cloud sync uses Firebase Authentication and stores study progress associated with your account in Firestore. If you email us or use the contact form (Resend), we receive the address and message content you send. Optional inputs such as a ZIP code used for officials lookup are processed to return study results and are not used to build a marketing profile.",
        },
        {
          heading: "Information stored on your device",
          body: "We may store preferences and study progress in your browser (for example localStorage for quiz progress, theme, language, or ZIP). This data stays on your device unless you clear site data. We do not require login to save local progress.",
        },
        {
          heading: "Automatically collected data",
          body: "Like most websites, servers and analytics may process technical data such as IP address, browser type, device type, pages viewed, approximate location derived from IP, and referring URLs. We use this to operate, secure, and improve the site.",
        },
        {
          heading: "Analytics",
          body: "We may use Firebase Analytics (Google) to understand aggregated usage (for example which pages are popular). Google may process data under its own terms and privacy policy. You can use browser controls or opt-out tools where available.",
        },
        {
          heading: "Error monitoring",
          body: "To keep the site reliable we use Sentry for error and performance monitoring. This may include technical details such as page URL, browser or device type, approximate location derived from IP, and stack traces. When an error occurs we may capture a masked session replay. Sentry processes data under its own terms. This reliability tooling is part of operating the service (not advertising).",
        },
        {
          heading: "Advertising",
          body: "Optional third-party display advertising (for example Monetag) is controlled by a site flag and is currently off while we prioritize Google Ads Search landing quality. If re-enabled, ads load only after Accept all on the cookie banner. Choosing Essential only never loads advertising scripts. Ad partners’ practices are governed by their own policies.",
        },
        {
          heading: "Cookies and similar technologies",
          body: "We use cookies or similar storage for essentials such as language preference, for analytics when you Accept all, and for advertising only if display ads are re-enabled as described above. On first visit we show a cookie banner so you can Accept all (analytics; ads only if advertising is enabled) or Essential only. You can reopen Cookie settings anytime from the floating control. You can also control cookies through your browser settings; disabling some cookies may affect features.",
        },
        {
          heading: "How we use information",
          body: "We use information to provide study tools, remember preferences, measure performance, prevent abuse, communicate when you contact us, and — if third-party display ads are re-enabled — to show advertising that helps keep the service free.",
        },
        {
          heading: "Sharing",
          body: "We share data with service providers who help us run the site (hosting such as Vercel; Firebase Authentication/Firestore and Analytics; email delivery such as Resend; advertising when enabled; and error monitoring such as Sentry). We do not sell your email as a standalone product. We may disclose information if required by law or to protect rights, safety, and security.",
        },
        {
          heading: "Children",
          body: "The site is intended for adults preparing for naturalization and similar learners. We do not knowingly collect personal information from children under 13. Contact us if you believe a child provided personal information.",
        },
        {
          heading: "International visitors",
          body: "The site may be hosted and processed in the United States or other countries. If you access it from elsewhere, you understand information may be transferred to and processed in those locations.",
        },
        {
          heading: "Your choices and requests",
          body: `You may clear local site data in your browser, block cookies, or email ${CONTACT_EMAIL} for privacy-related questions. If you created an optional account, you can reset your password or delete the account (and associated cloud progress) from the practice sync panel, or email us to request deletion. Local progress on a device remains until you clear site data.`,
        },
        {
          heading: "Changes",
          body: "We may update this policy from time to time. The “Last updated” date will change when we do. Continued use of the site after changes means you accept the updated policy.",
        },
      ],
      es: [
        {
          heading: "Resumen",
          body: "USCivics Quiz (“nosotros”) opera https://uscivics-quiz.com. Esta política explica qué información procesamos cuando usás el sitio. Última actualización: 4 de agosto de 2026.",
        },
        {
          heading: "Información que nos das",
          body: "Podés usar el sitio sin crear una cuenta. El sync opcional en la nube usa Firebase Authentication y guarda el progreso de estudio asociado a tu cuenta en Firestore. Si nos escribís por email o usás el formulario de contacto (Resend), recibimos la dirección y el contenido del mensaje. Datos opcionales como un ZIP para buscar oficiales se usan para devolver resultados de estudio y no para armar un perfil de marketing.",
        },
        {
          heading: "Información en tu dispositivo",
          body: "Podemos guardar preferencias y progreso en tu navegador (por ejemplo localStorage para progreso, tema, idioma o ZIP). Esos datos quedan en tu dispositivo salvo que borres los datos del sitio. No hace falta iniciar sesión para guardar progreso local.",
        },
        {
          heading: "Datos automáticos",
          body: "Como la mayoría de los sitios, servidores y analítica pueden procesar datos técnicos como IP, tipo de navegador, dispositivo, páginas vistas, ubicación aproximada por IP y URL de referencia. Los usamos para operar, asegurar y mejorar el sitio.",
        },
        {
          heading: "Analítica",
          body: "Podemos usar Firebase Analytics (Google) para entender el uso agregado. Google puede procesar datos bajo sus propios términos y política de privacidad. Podés usar controles del navegador u opt-outs cuando estén disponibles.",
        },
        {
          heading: "Monitoreo de errores",
          body: "Para mantener el sitio confiable usamos Sentry para monitoreo de errores y rendimiento. Puede incluir datos técnicos como URL, tipo de navegador/dispositivo, ubicación aproximada por IP y stack traces. Si ocurre un error, podemos capturar una sesión enmascarada (replay). Sentry procesa datos bajo sus propios términos. Esta herramienta de fiabilidad forma parte de operar el servicio (no es publicidad).",
        },
        {
          heading: "Publicidad",
          body: "La publicidad display de terceros (por ejemplo Monetag) está controlada por una bandera del sitio y actualmente está desactivada mientras priorizamos la calidad de landing de Google Ads Search. Si se reactiva, los anuncios se cargan solo tras Aceptar todo en el banner de cookies. Elegir Solo esenciales nunca carga scripts de publicidad. Las prácticas de los socios se rigen por sus propias políticas.",
        },
        {
          heading: "Cookies",
          body: "Usamos cookies o almacenamiento similar para lo esencial (por ejemplo idioma), para analítica cuando aceptás todo, y para publicidad solo si se reactiva como se describe arriba. En la primera visita mostramos un banner para Aceptar todo (analítica; anuncios solo si la publicidad está habilitada) o Solo esenciales. Podés reabrir Configurar cookies en cualquier momento. También podés controlar cookies en el navegador; desactivar algunas puede afectar funciones.",
        },
        {
          heading: "Cómo usamos la información",
          body: "Usamos la información para ofrecer herramientas de estudio, recordar preferencias, medir rendimiento, prevenir abuso, responder cuando nos contactás y — si se reactivan los anuncios display de terceros — mostrar publicidad que ayuda a mantener el servicio gratis.",
        },
        {
          heading: "Compartir",
          body: "Compartimos datos con proveedores que ayudan a operar el sitio (hosting como Vercel; Firebase Authentication/Firestore y Analytics; envío de email como Resend; publicidad si está habilitada; y monitoreo de errores como Sentry). No vendemos tu email como producto. Podemos divulgar información si la ley lo exige o para proteger derechos, seguridad e integridad.",
        },
        {
          heading: "Menores",
          body: "El sitio está pensado para adultos que se preparan para naturalización y aprendices similares. No recopilamos a sabiendas datos de menores de 13 años. Contactanos si creés que un menor envió información personal.",
        },
        {
          heading: "Visitantes internacionales",
          body: "El sitio puede alojarse y procesarse en Estados Unidos u otros países. Si accedés desde otro lugar, entendés que la información puede transferirse y procesarse allí.",
        },
        {
          heading: "Tus opciones",
          body: `Podés borrar datos del sitio en el navegador, bloquear cookies o escribir a ${CONTACT_EMAIL} por temas de privacidad. Si creaste una cuenta opcional, podés restablecer la contraseña o eliminar la cuenta (y el progreso en la nube) desde el panel de sync en práctica, o pedirnos el borrado por email. El progreso local en un dispositivo queda hasta que borres los datos del sitio.`,
        },
        {
          heading: "Cambios",
          body: "Podemos actualizar esta política. La fecha de “Última actualización” cambiará cuando lo hagamos. Seguir usando el sitio implica aceptar la política actualizada.",
        },
      ],
      zh: [
        {
          heading: "概述",
          body: "USCivics Quiz（“我们”）运营 https://uscivics-quiz.com。本政策说明您使用本网站时我们会处理哪些信息。最后更新日期：2026 年 8 月 4 日。",
        },
        {
          heading: "您提供的信息",
          body: "您无需创建账户即可使用本网站。可选的云同步使用 Firebase Authentication，并在 Firestore 中存储与您账户关联的学习进度。如果您给我们发邮件或使用联系表单（Resend），我们会收到您发送的邮箱地址和内容。诸如用于查询民选官员的邮政编码（ZIP）等可选输入信息，仅用于返回学习结果，不会用于构建营销画像。",
        },
        {
          heading: "存储在您设备上的信息",
          body: "我们可能会将偏好设置和学习进度存储在您的浏览器中（例如使用 localStorage 保存测验进度、主题、语言或邮政编码）。这些数据保留在您的设备上，除非您清除网站数据。保存本地进度无需登录。",
        },
        {
          heading: "自动收集的数据",
          body: "与大多数网站一样，服务器和分析工具可能会处理一些技术数据，例如 IP 地址、浏览器类型、设备类型、浏览页面、根据 IP 得出的大致位置以及来源网址。我们使用这些数据来运营、保护和改进网站。",
        },
        {
          heading: "分析",
          body: "我们可能使用 Firebase Analytics（Google）来了解汇总的使用情况（例如哪些页面较受欢迎）。Google 可能会根据其自身的条款和隐私政策处理数据。您可以使用浏览器控件或可用的退出工具。",
        },
        {
          heading: "错误监控",
          body: "为保障网站可靠运行，我们使用 Sentry 进行错误与性能监控。可能包括页面 URL、浏览器/设备类型、由 IP 推断的大致位置以及堆栈跟踪。发生错误时，我们可能捕获经遮罩的会话回放。Sentry 按其自身条款处理数据。该可靠性工具属于运营服务的一部分（不是广告）。",
        },
        {
          heading: "广告",
          body: "可选的第三方展示广告（例如 Monetag）由站点开关控制，目前已关闭，以便优先保证 Google Ads Search 落地页质量。若重新启用，广告仅在 Cookie 横幅中选择“全部接受”后加载。选择“仅必要”绝不会加载广告脚本。广告合作伙伴的做法受其自身政策约束。",
        },
        {
          heading: "Cookie 及类似技术",
          body: "我们使用 Cookie 或类似存储技术来实现必要功能（例如语言偏好），以及上文所述的分析/广告用途。首次访问时，我们会显示 Cookie 横幅，您可以选择“全部接受”（广告+分析）或“仅必要”。您可以随时通过悬浮控件重新打开 Cookie 设置。您也可以通过浏览器设置控制 Cookie；禁用某些 Cookie 可能会影响部分功能。",
        },
        {
          heading: "我们如何使用信息",
          body: "我们使用信息来提供学习工具、记住偏好设置、衡量性能、防止滥用、在您联系我们时进行沟通，并展示有助于保持服务免费的广告。",
        },
        {
          heading: "信息共享",
          body: "我们会与协助运营网站的服务提供商共享数据（例如 Vercel 托管；Firebase Authentication/Firestore 与 Analytics；Resend 邮件投递；启用时的广告；以及 Sentry 等错误监控）。我们不会将您的电子邮件作为独立产品出售。如果法律要求，或为了保护权利、安全和保障，我们可能会披露信息。",
        },
        {
          heading: "儿童",
          body: "本网站面向准备入籍的成年人及类似学习者。我们不会在明知情况下收集 13 岁以下儿童的个人信息。如果您认为有儿童提供了个人信息，请联系我们。",
        },
        {
          heading: "国际访客",
          body: "本网站可能在美国或其他国家/地区托管和处理数据。如果您从其他地方访问本网站，即表示您理解信息可能会被传输到并在这些地点处理。",
        },
        {
          heading: "您的选择与请求",
          body: `您可以清除浏览器中的本地网站数据、屏蔽 Cookie，或就隐私相关问题发邮件至 ${CONTACT_EMAIL}。如果您创建了可选账户，可在练习页的同步面板中重置密码或删除账户（及关联的云端进度），也可发邮件请求删除。设备上的本地进度会保留，直到您清除网站数据。`,
        },
        {
          heading: "变更",
          body: "我们可能会不时更新本政策。更新时，“最后更新”日期会相应变化。您在政策变更后继续使用本网站，即表示您接受更新后的政策。",
        },
      ],
      vi: [
        {
          heading: "Tổng quan",
          body: "USCivics Quiz (“chúng tôi”) vận hành https://uscivics-quiz.com. Chính sách này giải thích những thông tin chúng tôi xử lý khi bạn sử dụng trang web. Cập nhật lần cuối: ngày 4 tháng 8 năm 2026.",
        },
        {
          heading: "Thông tin bạn cung cấp",
          body: "Bạn có thể sử dụng trang web mà không cần tạo tài khoản. Đồng bộ đám mây tùy chọn dùng Firebase Authentication và lưu tiến trình học gắn với tài khoản trong Firestore. Nếu bạn gửi email hoặc dùng biểu mẫu liên hệ (Resend), chúng tôi nhận địa chỉ và nội dung tin nhắn. Các thông tin tùy chọn như mã ZIP để tra cứu quan chức chỉ dùng để trả kết quả học tập, không dùng để xây hồ sơ tiếp thị.",
        },
        {
          heading: "Thông tin lưu trên thiết bị của bạn",
          body: "Chúng tôi có thể lưu tùy chọn và tiến trình học tập trong trình duyệt của bạn (ví dụ localStorage cho tiến trình quiz, giao diện, ngôn ngữ, hoặc mã ZIP). Dữ liệu này ở lại trên thiết bị của bạn trừ khi bạn xóa dữ liệu trang web. Chúng tôi không yêu cầu đăng nhập để lưu tiến trình cục bộ.",
        },
        {
          heading: "Dữ liệu được thu thập tự động",
          body: "Giống như hầu hết các trang web, máy chủ và công cụ phân tích có thể xử lý dữ liệu kỹ thuật như địa chỉ IP, loại trình duyệt, loại thiết bị, các trang đã xem, vị trí gần đúng suy ra từ IP, và URL giới thiệu. Chúng tôi dùng dữ liệu này để vận hành, bảo mật và cải thiện trang web.",
        },
        {
          heading: "Phân tích",
          body: "Chúng tôi có thể sử dụng Firebase Analytics (Google) để hiểu mức sử dụng tổng hợp (ví dụ trang nào phổ biến). Google có thể xử lý dữ liệu theo các điều khoản và chính sách quyền riêng tư riêng của họ. Bạn có thể dùng cài đặt trình duyệt hoặc công cụ từ chối khi có sẵn.",
        },
        {
          heading: "Giám sát lỗi",
          body: "Để giữ trang web ổn định, chúng tôi dùng Sentry để giám sát lỗi và hiệu suất. Có thể gồm URL trang, loại trình duyệt/thiết bị, vị trí gần đúng từ IP và stack traces. Khi có lỗi, chúng tôi có thể ghi lại phiên đã che (replay). Sentry xử lý dữ liệu theo điều khoản riêng. Công cụ độ tin cậy này thuộc vận hành dịch vụ (không phải quảng cáo).",
        },
        {
          heading: "Quảng cáo",
          body: "Quảng cáo hiển thị bên thứ ba tùy chọn (ví dụ Monetag) được kiểm soát bằng cờ cấu hình và hiện đang tắt để ưu tiên chất lượng trang đích Google Ads Search. Nếu bật lại, quảng cáo chỉ tải sau khi chọn Chấp nhận tất cả trên banner cookie. Chọn Chỉ thiết yếu không bao giờ tải script quảng cáo. Thực tiễn của đối tác quảng cáo do chính sách của họ quy định.",
        },
        {
          heading: "Cookie và công nghệ tương tự",
          body: "Chúng tôi dùng cookie hoặc lưu trữ tương tự cho các chức năng thiết yếu như tùy chọn ngôn ngữ, và cho phân tích/quảng cáo như mô tả ở trên. Lần truy cập đầu tiên, chúng tôi hiển thị biểu ngữ cookie để bạn có thể Chấp nhận tất cả (quảng cáo + phân tích) hoặc Chỉ thiết yếu. Bạn có thể mở lại Cài đặt cookie bất cứ lúc nào từ nút điều khiển nổi. Bạn cũng có thể kiểm soát cookie qua cài đặt trình duyệt; tắt một số cookie có thể ảnh hưởng đến tính năng.",
        },
        {
          heading: "Cách chúng tôi sử dụng thông tin",
          body: "Chúng tôi sử dụng thông tin để cung cấp công cụ học tập, ghi nhớ tùy chọn, đo lường hiệu suất, ngăn chặn lạm dụng, liên lạc khi bạn liên hệ với chúng tôi, và hiển thị quảng cáo giúp duy trì dịch vụ miễn phí.",
        },
        {
          heading: "Chia sẻ thông tin",
          body: "Chúng tôi chia sẻ dữ liệu với các nhà cung cấp giúp vận hành trang (hosting như Vercel; Firebase Authentication/Firestore và Analytics; gửi email như Resend; quảng cáo khi bật; và giám sát lỗi như Sentry). Chúng tôi không bán email của bạn như một sản phẩm độc lập. Chúng tôi có thể tiết lộ thông tin nếu pháp luật yêu cầu hoặc để bảo vệ quyền, an toàn và bảo mật.",
        },
        {
          heading: "Trẻ em",
          body: "Trang web dành cho người trưởng thành chuẩn bị nhập tịch và những người học tương tự. Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em dưới 13 tuổi. Hãy liên hệ với chúng tôi nếu bạn tin rằng một trẻ em đã cung cấp thông tin cá nhân.",
        },
        {
          heading: "Khách truy cập quốc tế",
          body: "Trang web có thể được lưu trữ và xử lý tại Hoa Kỳ hoặc các quốc gia khác. Nếu bạn truy cập từ nơi khác, bạn hiểu rằng thông tin có thể được chuyển và xử lý tại các địa điểm đó.",
        },
        {
          heading: "Lựa chọn và yêu cầu của bạn",
          body: `Bạn có thể xóa dữ liệu trang cục bộ trong trình duyệt, chặn cookie, hoặc gửi email tới ${CONTACT_EMAIL} về quyền riêng tư. Nếu đã tạo tài khoản tùy chọn, bạn có thể đặt lại mật khẩu hoặc xóa tài khoản (và tiến trình đám mây) từ bảng đồng bộ trên trang luyện tập, hoặc email để yêu cầu xóa. Tiến trình cục bộ trên thiết bị vẫn còn cho đến khi bạn xóa dữ liệu trang.`,
        },
        {
          heading: "Thay đổi",
          body: "Chúng tôi có thể cập nhật chính sách này theo thời gian. Ngày “Cập nhật lần cuối” sẽ thay đổi khi chúng tôi làm vậy. Việc tiếp tục sử dụng trang web sau khi thay đổi đồng nghĩa với việc bạn chấp nhận chính sách đã cập nhật.",
        },
      ],
      tl: [
        {
          heading: "Pangkalahatang-ideya",
          body: "Ang USCivics Quiz (“kami”) ay nagpapatakbo ng https://uscivics-quiz.com. Ipinapaliwanag ng patakarang ito kung anong impormasyon ang pinoproseso namin kapag ginagamit mo ang site. Huling na-update: Agosto 4, 2026.",
        },
        {
          heading: "Impormasyong ibinibigay mo",
          body: "Magagamit mo ang site nang hindi gumagawa ng account. Ang optional cloud sync ay gumagamit ng Firebase Authentication at nag-iimbak ng study progress na naka-link sa iyong account sa Firestore. Kung mag-e-email ka o gagamit ng contact form (Resend), matatanggap namin ang address at nilalaman ng mensahe. Ang mga opsyonal na input tulad ng ZIP code para sa officials lookup ay pinoproseso para sa study results at hindi para sa marketing profile.",
        },
        {
          heading: "Impormasyong naka-imbak sa iyong device",
          body: "Maaari naming i-imbak ang mga kagustuhan at progreso ng pag-aaral sa iyong browser (halimbawa localStorage para sa progreso ng quiz, tema, wika, o ZIP). Nananatili ang datos na ito sa iyong device maliban kung i-clear mo ang data ng site. Hindi namin kailangan ng pag-login para i-save ang lokal na progreso.",
        },
        {
          heading: "Awtomatikong nakokolektang datos",
          body: "Tulad ng karamihan ng mga website, ang mga server at analytics ay maaaring magproseso ng teknikal na datos tulad ng IP address, uri ng browser, uri ng device, mga pahinang tiningnan, tinatayang lokasyon mula sa IP, at mga referring URL. Ginagamit namin ito para patakbuhin, protektahan, at pahusayin ang site.",
        },
        {
          heading: "Analytics",
          body: "Maaari naming gamitin ang Firebase Analytics (Google) para maunawaan ang pinagsamang paggamit (halimbawa kung aling mga pahina ang popular). Maaaring iproseso ng Google ang data ayon sa sarili nitong mga tuntunin at patakaran sa privacy. Maaari kang gumamit ng mga kontrol sa browser o opt-out na kagamitan kung available.",
        },
        {
          heading: "Error monitoring",
          body: "Upang panatilihing maaasahan ang site, gumagamit kami ng Sentry para sa error at performance monitoring. Maaaring kasama ang URL, uri ng browser/device, tinatayang lokasyon mula sa IP, at stack traces. Kapag may error, maaaring kumuha ng masked session replay. Pinoproseso ng Sentry ang data ayon sa sarili nitong terms. Bahagi ito ng pagpapatakbo ng serbisyo (hindi advertising).",
        },
        {
          heading: "Advertising",
          body: "Opsyonal na third-party display advertising (hal. Monetag) ay kontrolado ng site flag at kasalukuyang naka-off habang inuuna namin ang kalidad ng Google Ads Search landing. Kung i-enable ulit, maglo-load lang ang ads pagkatapos ng Tanggapin lahat sa cookie banner. Ang Mahahalaga lamang ay hindi kailanman maglo-load ng advertising scripts. Ang mga gawi ng ad partners ay nasa ilalim ng sarili nilang patakaran.",
        },
        {
          heading: "Cookies at katulad na teknolohiya",
          body: "Gumagamit kami ng cookies o katulad na imbakan para sa mahahalagang bagay tulad ng kagustuhan sa wika, at para sa analytics/advertising gaya ng inilarawan sa itaas. Sa unang pagbisita, nagpapakita kami ng cookie banner para mapili mo ang Tanggapin lahat (ads + analytics) o Mahahalaga lamang. Maaari mong buksan muli ang Cookie settings anumang oras mula sa lumulutang na kontrol. Maaari mo ring kontrolin ang cookies sa pamamagitan ng iyong browser settings; ang pag-disable ng ilang cookies ay maaaring makaapekto sa mga feature.",
        },
        {
          heading: "Paano namin ginagamit ang impormasyon",
          body: "Ginagamit namin ang impormasyon para magbigay ng study tools, tandaan ang mga kagustuhan, sukatin ang performance, pigilan ang abuso, makipag-usap kapag kinokontak mo kami, at magpakita ng mga ad na tumutulong panatilihing libre ang serbisyo.",
        },
        {
          heading: "Pagbabahagi",
          body: "Ibinabahagi namin ang datos sa mga service provider (hosting tulad ng Vercel; Firebase Authentication/Firestore at Analytics; email tulad ng Resend; advertising kung naka-enable; at error monitoring tulad ng Sentry). Hindi namin ibinebenta ang iyong email bilang hiwalay na produkto. Maaari kaming maglantad ng impormasyon kung hinihingi ng batas o para protektahan ang karapatan, kaligtasan, at seguridad.",
        },
        {
          heading: "Mga bata",
          body: "Ang site ay para sa mga matatandang naghahanda para sa naturalization at katulad na mga nag-aaral. Hindi namin sinasadyang kinokolekta ang personal na impormasyon mula sa mga batang wala pang 13 taong gulang. Kontakin kami kung sa tingin mo ay may batang nagbigay ng personal na impormasyon.",
        },
        {
          heading: "Mga internasyonal na bisita",
          body: "Maaaring i-host at iproseso ang site sa Estados Unidos o ibang bansa. Kung ina-access mo ito mula sa ibang lugar, nauunawaan mong maaaring ilipat at iproseso ang impormasyon sa mga lokasyong iyon.",
        },
        {
          heading: "Iyong mga pagpipilian at kahilingan",
          body: `Maaari mong i-clear ang lokal na site data sa browser, harangan ang cookies, o mag-email sa ${CONTACT_EMAIL} para sa privacy. Kung may optional account ka, maaari mong i-reset ang password o burahin ang account (at cloud progress) mula sa sync panel sa practice, o mag-email para humiling ng pagbura. Ang local progress sa device ay nananatili hanggang i-clear mo ang site data.`,
        },
        {
          heading: "Mga pagbabago",
          body: "Maaari naming i-update ang patakarang ito paminsan-minsan. Magbabago ang petsa ng “Huling na-update” kapag ginawa namin ito. Ang patuloy na paggamit ng site pagkatapos ng mga pagbabago ay nangangahulugang tinatanggap mo ang na-update na patakaran.",
        },
      ],
      ar: [
        {
          heading: "نظرة عامة",
          body: "تدير USCivics Quiz (“نحن”) الموقع https://uscivics-quiz.com. توضح هذه السياسة المعلومات التي نعالجها عند استخدامك للموقع. آخر تحديث: 4 أغسطس 2026.",
        },
        {
          heading: "المعلومات التي تقدمها",
          body: "يمكنك استخدام الموقع دون إنشاء حساب. تستخدم المزامنة السحابية الاختيارية Firebase Authentication وتخزّن تقدّم الدراسة المرتبط بحسابك في Firestore. إذا راسلتنا أو استخدمت نموذج الاتصال (Resend)، نستلم عنوانك ومحتوى الرسالة. المدخلات الاختيارية مثل الرمز البريدي للبحث عن المسؤولين تُعالج لإرجاع نتائج الدراسة فقط ولا تُستخدم لإنشاء ملف تسويقي.",
        },
        {
          heading: "المعلومات المخزنة على جهازك",
          body: "قد نخزّن التفضيلات وتقدم الدراسة في متصفحك (مثل استخدام localStorage لتقدم الاختبار، والسمة، واللغة، أو الرمز البريدي). تبقى هذه البيانات على جهازك ما لم تقم بمسح بيانات الموقع. لا نطلب تسجيل الدخول لحفظ التقدم المحلي.",
        },
        {
          heading: "البيانات التي تُجمع تلقائياً",
          body: "كمعظم المواقع الإلكترونية، قد تعالج الخوادم وأدوات التحليل بيانات تقنية مثل عنوان IP، ونوع المتصفح، ونوع الجهاز، والصفحات التي تمت زيارتها، والموقع التقريبي المستنتج من عنوان IP، وعناوين URL المُحيلة. نستخدم هذه البيانات لتشغيل الموقع وتأمينه وتحسينه.",
        },
        {
          heading: "التحليلات",
          body: "قد نستخدم Firebase Analytics (من Google) لفهم الاستخدام الإجمالي (مثل الصفحات الأكثر شعبية). قد تعالج Google البيانات وفقاً لشروطها وسياسة الخصوصية الخاصة بها. يمكنك استخدام إعدادات المتصفح أو أدوات إلغاء الاشتراك المتاحة.",
        },
        {
          heading: "مراقبة الأخطاء",
          body: "للحفاظ على موثوقية الموقع نستخدم Sentry لمراقبة الأخطاء والأداء. قد يشمل ذلك عنوان URL ونوع المتصفح/الجهاز والموقع التقريبي من عنوان IP وتتبعات المكدس. عند حدوث خطأ قد نلتقط إعادة تشغيل جلسة مقنّعة. تعالج Sentry البيانات وفق شروطها. هذه أداة موثوقية لتشغيل الخدمة (وليست إعلانات).",
        },
        {
          heading: "الإعلانات",
          body: "الإعلانات العرضية الاختيارية من أطراف ثالثة (مثل Monetag) تُتحكم بعلامة في الموقع وهي متوقفة حالياً بينما نعطي الأولوية لجودة صفحات هبوط Google Ads Search. إذا أُعيد تفعيلها، تُحمَّل الإعلانات فقط بعد اختيار «قبول الكل» في شريط ملفات تعريف الارتباط. اختيار «الأساسيات فقط» لا يحمّل أبداً نصوص الإعلانات. تخضع ممارسات الشركاء لسياساتهم الخاصة.",
        },
        {
          heading: "ملفات تعريف الارتباط والتقنيات المشابهة",
          body: "نستخدم ملفات تعريف الارتباط أو تخزيناً مشابهاً للأساسيات مثل تفضيل اللغة، وللتحليلات/الإعلانات كما هو موضح أعلاه. عند الزيارة الأولى، نعرض شريط ملفات تعريف الارتباط حتى تتمكن من اختيار “قبول الكل” (إعلانات + تحليلات) أو “الأساسيات فقط”. يمكنك إعادة فتح إعدادات ملفات تعريف الارتباط في أي وقت من عنصر التحكم العائم. يمكنك أيضاً التحكم في ملفات تعريف الارتباط من خلال إعدادات متصفحك؛ قد يؤثر تعطيل بعضها على بعض الميزات.",
        },
        {
          heading: "كيف نستخدم المعلومات",
          body: "نستخدم المعلومات لتوفير أدوات الدراسة، وتذكر التفضيلات، وقياس الأداء، ومنع إساءة الاستخدام، والتواصل معك عندما تتصل بنا، وعرض الإعلانات التي تساعد في إبقاء الخدمة مجانية.",
        },
        {
          heading: "مشاركة البيانات",
          body: "نشارك البيانات مع مزودي الخدمات الذين يساعدوننا في تشغيل الموقع (الاستضافة مثل Vercel؛ وFirebase Authentication/Firestore وAnalytics؛ وتسليم البريد مثل Resend؛ والإعلانات عند التفعيل؛ ومراقبة الأخطاء مثل Sentry). لا نبيع بريدك الإلكتروني كمنتج مستقل. قد نكشف عن المعلومات إذا اقتضى القانون ذلك أو لحماية الحقوق والسلامة والأمن.",
        },
        {
          heading: "الأطفال",
          body: "الموقع مخصص للبالغين الذين يستعدون للتجنس ومتعلمين مشابهين. لا نقوم عن علم بجمع معلومات شخصية من الأطفال دون سن 13 عاماً. تواصل معنا إذا كنت تعتقد أن طفلاً قدم معلومات شخصية.",
        },
        {
          heading: "الزوار الدوليون",
          body: "قد يتم استضافة الموقع ومعالجته في الولايات المتحدة أو دول أخرى. إذا وصلت إليه من مكان آخر، فأنت تدرك أن المعلومات قد تُنقل وتُعالج في تلك المواقع.",
        },
        {
          heading: "خياراتك وطلباتك",
          body: `يمكنك مسح بيانات الموقع المحلية في متصفحك، أو حظر ملفات تعريف الارتباط، أو مراسلتنا عبر ${CONTACT_EMAIL} لأسئلة الخصوصية. إذا أنشأت حساباً اختيارياً، يمكنك إعادة تعيين كلمة المرور أو حذف الحساب (وتقدّم السحابة المرتبط) من لوحة المزامنة في صفحة التمرين، أو مراسلتنا لطلب الحذف. يبقى التقدّم المحلي على الجهاز حتى تمسح بيانات الموقع.`,
        },
        {
          heading: "التغييرات",
          body: "قد نُحدّث هذه السياسة من وقت لآخر. سيتغير تاريخ “آخر تحديث” عندما نقوم بذلك. استمرارك في استخدام الموقع بعد إجراء التغييرات يعني أنك تقبل السياسة المحدثة.",
        },
      ],
      ko: [
        {
          heading: "개요",
          body: "USCivics Quiz(“저희”)는 https://uscivics-quiz.com을 운영합니다. 이 정책은 귀하가 사이트를 이용할 때 저희가 처리하는 정보에 대해 설명합니다. 최종 업데이트: 2026년 8월 4일.",
        },
        {
          heading: "귀하가 제공하는 정보",
          body: "계정을 만들지 않고도 사이트를 이용할 수 있습니다. 선택적 클라우드 동기화는 Firebase Authentication을 사용하며 Firestore에 계정과 연결된 학습 진도를 저장합니다. 이메일을 보내거나 문의 양식(Resend)을 사용하면 주소와 메시지 내용을 수신합니다. 선출직 조회용 우편번호 같은 선택 입력은 학습 결과 제공용이며 마케팅 프로필 작성에는 쓰이지 않습니다.",
        },
        {
          heading: "귀하의 기기에 저장되는 정보",
          body: "저희는 브라우저에 환경설정과 학습 진행 상황을 저장할 수 있습니다(예: 퀴즈 진행 상황, 테마, 언어, 우편번호를 위한 localStorage). 이 데이터는 사이트 데이터를 삭제하지 않는 한 귀하의 기기에 남아 있습니다. 로컬 진행 상황을 저장하는 데 로그인이 필요하지 않습니다.",
        },
        {
          heading: "자동으로 수집되는 데이터",
          body: "대부분의 웹사이트와 마찬가지로 서버와 분석 도구는 IP 주소, 브라우저 유형, 기기 유형, 조회한 페이지, IP에서 유추한 대략적인 위치, 참조 URL과 같은 기술 데이터를 처리할 수 있습니다. 저희는 이를 사이트 운영, 보안, 개선에 사용합니다.",
        },
        {
          heading: "분석",
          body: "저희는 Firebase Analytics(Google)를 사용하여 집계된 사용 현황(예: 인기 있는 페이지)을 파악할 수 있습니다. Google은 자체 약관 및 개인정보 처리방침에 따라 데이터를 처리할 수 있습니다. 이용 가능한 경우 브라우저 설정이나 옵트아웃 도구를 사용할 수 있습니다.",
        },
        {
          heading: "오류 모니터링",
          body: "사이트 안정성을 위해 Sentry로 오류 및 성능 모니터링을 합니다. 페이지 URL, 브라우저/기기 유형, IP 기반 대략적 위치, 스택 트레이스가 포함될 수 있습니다. 오류 발생 시 마스킹된 세션 리플레이를 수집할 수 있습니다. Sentry는 자체 약관에 따라 데이터를 처리합니다. 이는 서비스 운영용 안정성 도구이며 광고가 아닙니다.",
        },
        {
          heading: "광고",
          body: "선택적 제3자 디스플레이 광고(예: Monetag)는 사이트 플래그로 제어되며, Google Ads Search 랜딩 품질을 우선하기 위해 현재 꺼져 있습니다. 다시 켜면 쿠키 배너에서 ‘전체 동의’ 이후에만 광고가 로드됩니다. ‘필수만 허용’은 광고 스크립트를 절대 로드하지 않습니다. 광고 파트너의 관행은 자체 정책을 따릅니다.",
        },
        {
          heading: "쿠키 및 유사 기술",
          body: "저희는 언어 설정과 같은 필수 기능, 그리고 위에서 설명한 분석/광고 목적으로 쿠키 또는 유사한 저장 기술을 사용합니다. 처음 방문 시 쿠키 배너를 표시하여 ‘전체 동의’(광고 + 분석) 또는 ‘필수만 허용’을 선택할 수 있도록 합니다. 떠 있는 컨트롤을 통해 언제든지 쿠키 설정을 다시 열 수 있습니다. 브라우저 설정을 통해서도 쿠키를 제어할 수 있으며, 일부 쿠키를 비활성화하면 기능에 영향을 줄 수 있습니다.",
        },
        {
          heading: "정보 사용 방법",
          body: "저희는 학습 도구를 제공하고, 환경설정을 기억하고, 성능을 측정하고, 남용을 방지하고, 귀하가 저희에게 연락할 때 소통하며, 서비스를 무료로 유지하는 데 도움이 되는 광고를 표시하기 위해 정보를 사용합니다.",
        },
        {
          heading: "정보 공유",
          body: "저희는 사이트 운영을 돕는 서비스 제공업체와 데이터를 공유합니다(Vercel 호스팅; Firebase Authentication/Firestore 및 Analytics; Resend 이메일; 활성화 시 광고; Sentry 오류 모니터링). 귀하의 이메일을 독립 상품으로 판매하지 않습니다. 법률상 요구되거나 권리, 안전, 보안을 보호하기 위해 정보를 공개할 수 있습니다.",
        },
        {
          heading: "아동",
          body: "본 사이트는 귀화를 준비하는 성인 및 유사한 학습자를 대상으로 합니다. 저희는 13세 미만 아동의 개인정보를 알면서 수집하지 않습니다. 아동이 개인정보를 제공했다고 생각되면 저희에게 연락해 주세요.",
        },
        {
          heading: "해외 방문자",
          body: "본 사이트는 미국 또는 다른 국가에서 호스팅 및 처리될 수 있습니다. 다른 지역에서 접속하는 경우, 정보가 해당 위치로 전송되어 처리될 수 있음을 이해하는 것으로 간주됩니다.",
        },
        {
          heading: "귀하의 선택 및 요청",
          body: `브라우저에서 로컬 사이트 데이터를 지우거나, 쿠키를 차단하거나, 개인정보 문의는 ${CONTACT_EMAIL}로 이메일을 보낼 수 있습니다. 선택 계정을 만들었다면 연습 페이지의 동기화 패널에서 비밀번호를 재설정하거나 계정(및 클라우드 진도)을 삭제할 수 있으며, 이메일로 삭제를 요청할 수도 있습니다. 기기의 로컬 진도는 사이트 데이터를 지울 때까지 남습니다.`,
        },
        {
          heading: "변경사항",
          body: "저희는 이 정책을 수시로 업데이트할 수 있습니다. 업데이트 시 ‘최종 업데이트’ 날짜가 변경됩니다. 변경 후에도 사이트를 계속 이용하는 것은 업데이트된 정책에 동의하는 것을 의미합니다.",
        },
      ],
      hi: [
        {
          heading: "अवलोकन",
          body: "USCivics Quiz (“हम”) https://uscivics-quiz.com का संचालन करता है। यह नीति बताती है कि जब आप साइट का उपयोग करते हैं तो हम कौन सी जानकारी संसाधित करते हैं। अंतिम अपडेट: 4 अगस्त, 2026।",
        },
        {
          heading: "आपके द्वारा दी गई जानकारी",
          body: "आप बिना खाता बनाए साइट का उपयोग कर सकते हैं। वैकल्पिक क्लाउड सिंक Firebase Authentication का उपयोग करता है और Firestore में आपके खाते से जुड़ी अध्ययन प्रगति संग्रहीत करता है। यदि आप हमें ईमेल करते हैं या संपर्क फ़ॉर्म (Resend) उपयोग करते हैं, तो हमें पता और संदेश सामग्री प्राप्त होती है। ZIP जैसे वैकल्पिक इनपुट अध्ययन परिणाम के लिए संसाधित होते हैं, मार्केटिंग प्रोफ़ाइल के लिए नहीं।",
        },
        {
          heading: "आपके डिवाइस पर संग्रहीत जानकारी",
          body: "हम आपके ब्राउज़र में प्राथमिकताएं और अध्ययन प्रगति संग्रहीत कर सकते हैं (उदाहरण के लिए क्विज़ प्रगति, थीम, भाषा, या ZIP के लिए localStorage)। यह डेटा आपके डिवाइस पर तब तक रहता है जब तक आप साइट डेटा साफ़ नहीं करते। स्थानीय प्रगति सहेजने के लिए हमें लॉगिन की आवश्यकता नहीं है।",
        },
        {
          heading: "स्वचालित रूप से एकत्रित डेटा",
          body: "अधिकांश वेबसाइटों की तरह, सर्वर और एनालिटिक्स तकनीकी डेटा जैसे IP पता, ब्राउज़र प्रकार, डिवाइस प्रकार, देखे गए पेज, IP से प्राप्त अनुमानित स्थान, और संदर्भित URL को संसाधित कर सकते हैं। हम इसका उपयोग साइट को संचालित करने, सुरक्षित रखने और बेहतर बनाने के लिए करते हैं।",
        },
        {
          heading: "एनालिटिक्स",
          body: "हम समग्र उपयोग को समझने के लिए Firebase Analytics (Google) का उपयोग कर सकते हैं (उदाहरण के लिए कौन से पेज लोकप्रिय हैं)। Google अपनी शर्तों और गोपनीयता नीति के तहत डेटा संसाधित कर सकता है। आप उपलब्ध होने पर ब्राउज़र नियंत्रण या ऑप्ट-आउट टूल का उपयोग कर सकते हैं।",
        },
        {
          heading: "त्रुटि निगरानी",
          body: "साइट विश्वसनीय रखने के लिए हम Sentry से त्रुटि और प्रदर्शन निगरानी करते हैं। इसमें पेज URL, ब्राउज़र/डिवाइस प्रकार, IP से अनुमानित स्थान और स्टैक ट्रेस शामिल हो सकते हैं। त्रुटि होने पर मास्क्ड सेशन रीप्ले लिया जा सकता है। Sentry अपने नियमों के तहत डेटा संसाधित करता है। यह विज्ञापन नहीं, सेवा संचालन का हिस्सा है।",
        },
        {
          heading: "विज्ञापन",
          body: "वैकल्पिक तृतीय-पक्ष डिस्प्ले विज्ञापन (जैसे Monetag) साइट फ़्लैग से नियंत्रित हैं और Google Ads Search लैंडिंग गुणवत्ता को प्राथमिकता देते हुए वर्तमान में बंद हैं। फिर से चालू होने पर विज्ञापन कुकी बैनर पर सभी स्वीकार करें के बाद ही लोड होते हैं। केवल आवश्यक चुनने पर विज्ञापन स्क्रिप्ट कभी लोड नहीं होतीं। साझेदारों की प्रथाएँ उनकी अपनी नीतियों के अधीन हैं।",
        },
        {
          heading: "कुकीज़ और समान तकनीकें",
          body: "हम भाषा प्राथमिकता जैसी आवश्यक चीज़ों के लिए, और ऊपर वर्णित एनालिटिक्स/विज्ञापन के लिए कुकीज़ या समान भंडारण का उपयोग करते हैं। पहली बार आने पर हम एक कुकी बैनर दिखाते हैं ताकि आप सभी स्वीकार करें (विज्ञापन + एनालिटिक्स) या केवल आवश्यक चुन सकें। आप किसी भी समय फ्लोटिंग नियंत्रण से कुकी सेटिंग्स फिर से खोल सकते हैं। आप अपनी ब्राउज़र सेटिंग्स के माध्यम से भी कुकीज़ को नियंत्रित कर सकते हैं; कुछ कुकीज़ को अक्षम करने से सुविधाएं प्रभावित हो सकती हैं।",
        },
        {
          heading: "हम जानकारी का उपयोग कैसे करते हैं",
          body: "हम जानकारी का उपयोग अध्ययन उपकरण प्रदान करने, प्राथमिकताएं याद रखने, प्रदर्शन मापने, दुरुपयोग रोकने, जब आप हमसे संपर्क करते हैं तब संवाद करने, और सेवा को मुफ़्त रखने में मदद करने वाले विज्ञापन दिखाने के लिए करते हैं।",
        },
        {
          heading: "साझाकरण",
          body: "हम उन सेवा प्रदाताओं के साथ डेटा साझा करते हैं जो साइट चलाते हैं (Vercel होस्टिंग; Firebase Authentication/Firestore और Analytics; Resend ईमेल; सक्षम होने पर विज्ञापन; और Sentry त्रुटि निगरानी)। हम आपके ईमेल को एक स्टैंडअलोन उत्पाद के रूप में नहीं बेचते। कानून द्वारा आवश्यक होने पर या अधिकारों, सुरक्षा की रक्षा के लिए हम जानकारी प्रकट कर सकते हैं।",
        },
        {
          heading: "बच्चे",
          body: "यह साइट नागरिकता की तैयारी करने वाले वयस्कों और समान शिक्षार्थियों के लिए है। हम जानबूझकर 13 वर्ष से कम उम्र के बच्चों से व्यक्तिगत जानकारी एकत्र नहीं करते। यदि आपको लगता है कि किसी बच्चे ने व्यक्तिगत जानकारी दी है तो हमसे संपर्क करें।",
        },
        {
          heading: "अंतरराष्ट्रीय आगंतुक",
          body: "साइट को संयुक्त राज्य अमेरिका या अन्य देशों में होस्ट और संसाधित किया जा सकता है। यदि आप इसे कहीं और से एक्सेस करते हैं, तो आप समझते हैं कि जानकारी उन स्थानों पर स्थानांतरित और संसाधित की जा सकती है।",
        },
        {
          heading: "आपकी पसंद और अनुरोध",
          body: `आप ब्राउज़र में स्थानीय साइट डेटा साफ़ कर सकते हैं, कुकीज़ ब्लॉक कर सकते हैं, या गोपनीयता प्रश्नों के लिए ${CONTACT_EMAIL} पर ईमेल कर सकते हैं। यदि आपने वैकल्पिक खाता बनाया है, तो अभ्यास सिंक पैनल से पासवर्ड रीसेट या खाता (और क्लाउड प्रगति) हटा सकते हैं, या हटाने का अनुरोध ईमेल कर सकते हैं। डिवाइस पर स्थानीय प्रगति साइट डेटा साफ़ करने तक रहती है।`,
        },
        {
          heading: "परिवर्तन",
          body: "हम समय-समय पर इस नीति को अपडेट कर सकते हैं। जब हम ऐसा करेंगे तो “अंतिम अपडेट” तिथि बदल जाएगी। परिवर्तनों के बाद साइट का निरंतर उपयोग करने का अर्थ है कि आप अपडेट की गई नीति स्वीकार करते हैं।",
        },
      ],
      ru: [
        {
          heading: "Обзор",
          body: "USCivics Quiz («мы») управляет сайтом https://uscivics-quiz.com. Эта политика объясняет, какую информацию мы обрабатываем при использовании вами сайта. Последнее обновление: 4 августа 2026 г.",
        },
        {
          heading: "Информация, которую вы предоставляете",
          body: "Вы можете пользоваться сайтом без учётной записи. Опциональная облачная синхронизация использует Firebase Authentication и хранит учебный прогресс, связанный с аккаунтом, в Firestore. Если вы пишете нам или используете форму контакта (Resend), мы получаем адрес и текст сообщения. Необязательные данные вроде ZIP для поиска должностных лиц обрабатываются для учебных результатов и не используются для маркетингового профиля.",
        },
        {
          heading: "Информация, хранящаяся на вашем устройстве",
          body: "Мы можем сохранять настройки и прогресс обучения в вашем браузере (например, localStorage для прогресса викторины, темы, языка или индекса). Эти данные остаются на вашем устройстве, пока вы не очистите данные сайта. Для сохранения локального прогресса вход в систему не требуется.",
        },
        {
          heading: "Автоматически собираемые данные",
          body: "Как и большинство веб-сайтов, серверы и аналитические системы могут обрабатывать технические данные, такие как IP-адрес, тип браузера, тип устройства, просмотренные страницы, примерное местоположение по IP и URL перехода. Мы используем это для работы, защиты и улучшения сайта.",
        },
        {
          heading: "Аналитика",
          body: "Мы можем использовать Firebase Analytics (Google) для понимания совокупного использования (например, какие страницы популярны). Google может обрабатывать данные в соответствии со своими собственными условиями и политикой конфиденциальности. Вы можете использовать настройки браузера или инструменты отказа, если они доступны.",
        },
        {
          heading: "Мониторинг ошибок",
          body: "Для надёжности сайта мы используем Sentry для мониторинга ошибок и производительности. Могут включаться URL страницы, тип браузера/устройства, приблизительное местоположение по IP и стеки вызовов. При ошибке можем сохранить маскированный session replay. Sentry обрабатывает данные по своим условиям. Это инструмент надёжности для работы сервиса (не реклама).",
        },
        {
          heading: "Реклама",
          body: "Опциональная сторонняя display-реклама (например Monetag) управляется флагом сайта и сейчас выключена, пока мы приоритезируем качество посадочных страниц Google Ads Search. Если снова включить, реклама загружается только после «Принять все» в баннере cookie. Выбор «Только необходимое» никогда не загружает рекламные скрипты. Практика партнёров регулируется их собственными политиками.",
        },
        {
          heading: "Файлы cookie и аналогичные технологии",
          body: "Мы используем файлы cookie или аналогичное хранилище для необходимых функций, таких как языковые настройки, а также для аналитики/рекламы, как описано выше. При первом посещении мы показываем баннер о файлах cookie, чтобы вы могли выбрать «Принять все» (реклама + аналитика) или «Только необходимое». Вы можете снова открыть настройки cookie в любое время с помощью плавающего элемента управления. Вы также можете управлять файлами cookie через настройки браузера; отключение некоторых файлов cookie может повлиять на функции.",
        },
        {
          heading: "Как мы используем информацию",
          body: "Мы используем информацию для предоставления учебных инструментов, запоминания настроек, измерения производительности, предотвращения злоупотреблений, общения при обращении к нам и показа рекламы, которая помогает поддерживать бесплатность сервиса.",
        },
        {
          heading: "Передача данных",
          body: "Мы передаём данные поставщикам, которые помогают управлять сайтом (хостинг Vercel; Firebase Authentication/Firestore и Analytics; доставка почты Resend; реклама при включении; мониторинг ошибок Sentry). Мы не продаём вашу электронную почту как отдельный продукт. Мы можем раскрывать информацию, если этого требует закон, или для защиты прав, безопасности.",
        },
        {
          heading: "Дети",
          body: "Сайт предназначен для взрослых, готовящихся к натурализации, и подобных учащихся. Мы сознательно не собираем личную информацию от детей младше 13 лет. Свяжитесь с нами, если считаете, что ребёнок предоставил личную информацию.",
        },
        {
          heading: "Международные посетители",
          body: "Сайт может размещаться и обрабатываться в Соединённых Штатах или других странах. Если вы обращаетесь к нему из другого места, вы понимаете, что информация может передаваться и обрабатываться в этих местах.",
        },
        {
          heading: "Ваш выбор и запросы",
          body: `Вы можете очистить локальные данные сайта в браузере, заблокировать cookie или написать на ${CONTACT_EMAIL} по вопросам конфиденциальности. Если вы создали опциональный аккаунт, можно сбросить пароль или удалить аккаунт (и облачный прогресс) в панели синхронизации на странице практики, либо запросить удаление по email. Локальный прогресс на устройстве остаётся, пока вы не очистите данные сайта.`,
        },
        {
          heading: "Изменения",
          body: "Мы можем время от времени обновлять эту политику. Дата «Последнее обновление» изменится, когда мы это сделаем. Продолжение использования сайта после изменений означает, что вы принимаете обновлённую политику.",
        },
      ],
      ht: [
        {
          heading: "Apèsi jeneral",
          body: "USCivics Quiz (“nou”) opere https://uscivics-quiz.com. Règleman sa a eksplike ki enfòmasyon nou trete lè w itilize sit la. Dènye mizajou: 4 out 2026.",
        },
        {
          heading: "Enfòmasyon ou bay",
          body: "Ou ka itilize sit la san w pa kreye yon kont. Sync nwaj opsyonèl la itilize Firebase Authentication epi li estoke pwogrè etid ki asosye ak kont ou nan Firestore. Si w voye imel oswa itilize fòm kontak (Resend), nou resevwa adrès ak kontni mesaj la. Enfòmasyon opsyonèl tankou ZIP pou chèche ofisyèl yo trete pou rezilta etid, pa pou pwofil maketing.",
        },
        {
          heading: "Enfòmasyon ki estoke sou aparèy ou",
          body: "Nou ka estoke preferans ak pwogrè etid nan navigatè ou (pa egzanp localStorage pou pwogrè quiz, tèm, lang, oswa ZIP). Done sa yo rete sou aparèy ou sof si w efase done sit la. Nou pa mande w konekte pou sove pwogrè lokal.",
        },
        {
          heading: "Done ki kolekte otomatikman",
          body: "Menm jan ak pifò sit entènèt, sèvè ak zouti analiz ka trete done teknik tankou adrès IP, kalite navigatè, kalite aparèy, paj ou vizite, pozisyon apwoksimatif ki sòti nan IP, ak URL referans. Nou itilize sa a pou opere, sekirize, ak amelyore sit la.",
        },
        {
          heading: "Analiz",
          body: "Nou ka itilize Firebase Analytics (Google) pou konprann itilizasyon global la (pa egzanp ki paj ki popilè). Google ka trete done selon pwòp tèm ak règleman vi prive pa yo. Ou ka itilize kontwòl navigatè oswa zouti opt-out kote yo disponib.",
        },
        {
          heading: "Siveyans erè",
          body: "Pou kenbe sit la serye, nou itilize Sentry pou siveyans erè ak pèfòmans. Sa ka gen URL paj, tip navigatè/aparèy, kote apwoksimatif soti nan IP, ak stack traces. Lè gen erè, nou ka pran yon session replay maske. Sentry trete done selon pwòp tèm li. Sa se zouti fyab pou opere sèvis la (se pa piblisite).",
        },
        {
          heading: "Piblisite",
          body: "Piblisite display opsyonèl twazyèm pati (pa egzanp Monetag) kontwole pa yon drapo sit epi li koupe kounye a pandan n ap priyorize kalite landing Google Ads Search. Si yo reactive li, piblisite yo chaje sèlman apre Aksepte tout sou bannyè cookie. Chwazi Sèlman esansyèl pa janm chaje script piblisite. Pratik patnè yo gouvène pa pwòp règleman pa yo.",
        },
        {
          heading: "Cookies ak teknoloji similè",
          body: "Nou itilize cookies oswa depo similè pou bagay esansyèl tankou preferans lang, ak pou analiz/piblisite jan sa dekri anwo a. Nan premye vizit la, nou montre yon bannyè cookie pou w ka Aksepte tout (piblisite + analiz) oswa Sèlman esansyèl. Ou ka louvri Paramèt cookie ankò nenpòt lè nan kontwòl k ap flote a. Ou ka kontwole cookies tou nan paramèt navigatè ou; dezaktive kèk cookies ka afekte fonksyonalite.",
        },
        {
          heading: "Kijan nou itilize enfòmasyon",
          body: "Nou itilize enfòmasyon pou bay zouti etid, sonje preferans, mezire pèfòmans, anpeche abi, kominike lè w kontakte nou, ak montre piblisite ki ede kenbe sèvis la gratis.",
        },
        {
          heading: "Pataje",
          body: "Nou pataje done ak founisè sèvis ki ede sit la (ebèjman Vercel; Firebase Authentication/Firestore ak Analytics; imel Resend; piblisite lè aktif; ak siveyans erè Sentry). Nou pa vann imel ou kòm yon pwodwi endepandan. Nou ka divilge enfòmasyon si lalwa egzije sa oswa pou pwoteje dwa, sekirite.",
        },
        {
          heading: "Timoun",
          body: "Sit la fèt pou adilt k ap prepare pou naturalizasyon ak lòt aprenan similè. Nou pa kolekte konsyaman enfòmasyon pèsonèl nan men timoun ki gen mwens pase 13 an. Kontakte nou si w kwè yon timoun bay enfòmasyon pèsonèl.",
        },
        {
          heading: "Vizitè entènasyonal",
          body: "Sit la ka ebèje ak trete Ozetazini oswa nan lòt peyi. Si w aksede l soti yon lòt kote, ou konprann enfòmasyon ka transfere ak trete nan kote sa yo.",
        },
        {
          heading: "Chwa ak demann ou",
          body: `Ou ka efase done lokal sit la nan navigatè ou, bloke cookies, oswa voye imel bay ${CONTACT_EMAIL} pou kesyon vi prive. Si w te kreye yon kont opsyonèl, ou ka reyajiste modpas oswa efase kont la (ak pwogrè nwaj) nan panèl sync nan paj pratik la, oswa voye imel pou mande efasman. Pwogrè lokal sou aparèy la rete jiskaske w efase done sit la.`,
        },
        {
          heading: "Chanjman",
          body: "Nou ka mete règleman sa a ajou detanzantan. Dat “Dènye mizajou” a ap chanje lè nou fè sa. Kontinye itilize sit la apre chanjman yo vle di ou aksepte règleman ki mete ajou a.",
        },
      ],
      fr: [
        {
          heading: "Aperçu",
          body: "USCivics Quiz (« nous ») exploite https://uscivics-quiz.com. Cette politique explique quelles informations nous traitons lorsque vous utilisez le site. Dernière mise à jour : 4 août 2026.",
        },
        {
          heading: "Informations que vous fournissez",
          body: "Vous pouvez utiliser le site sans créer de compte. La synchronisation cloud optionnelle utilise Firebase Authentication et stocke la progression d'étude associée à votre compte dans Firestore. Si vous nous écrivez ou utilisez le formulaire de contact (Resend), nous recevons l'adresse et le contenu du message. Les saisies facultatives comme un code postal pour rechercher des élus servent aux résultats d'étude et non à un profil marketing.",
        },
        {
          heading: "Informations stockées sur votre appareil",
          body: "Nous pouvons stocker des préférences et la progression d'étude dans votre navigateur (par exemple localStorage pour la progression du quiz, le thème, la langue ou le code postal). Ces données restent sur votre appareil sauf si vous effacez les données du site. Nous n'exigeons pas de connexion pour enregistrer la progression locale.",
        },
        {
          heading: "Données collectées automatiquement",
          body: "Comme la plupart des sites web, les serveurs et les outils d'analyse peuvent traiter des données techniques telles que l'adresse IP, le type de navigateur, le type d'appareil, les pages consultées, la localisation approximative dérivée de l'IP, et les URL de référence. Nous utilisons ces données pour exploiter, sécuriser et améliorer le site.",
        },
        {
          heading: "Analytique",
          body: "Nous pouvons utiliser Firebase Analytics (Google) pour comprendre l'utilisation agrégée (par exemple quelles pages sont populaires). Google peut traiter les données selon ses propres conditions et sa politique de confidentialité. Vous pouvez utiliser les contrôles du navigateur ou des outils de désactivation lorsqu'ils sont disponibles.",
        },
        {
          heading: "Surveillance des erreurs",
          body: "Pour assurer la fiabilité du site, nous utilisons Sentry pour la surveillance des erreurs et des performances. Cela peut inclure l'URL de la page, le type de navigateur/appareil, une localisation approximative dérivée de l'IP et des traces d'exécution. En cas d'erreur, nous pouvons capturer une session replay masquée. Sentry traite les données selon ses propres conditions. Cet outil de fiabilité fait partie de l'exploitation du service (ce n'est pas de la publicité).",
        },
        {
          heading: "Publicité",
          body: "La publicité display tierce optionnelle (par exemple Monetag) est contrôlée par un indicateur du site et est actuellement désactivée pendant que nous priorisons la qualité des pages d’atterrissage Google Ads Search. Si elle est réactivée, les publicités ne se chargent qu’après Tout accepter sur la bannière de cookies. Choisir Essentiels uniquement ne charge jamais les scripts publicitaires. Les pratiques des partenaires sont régies par leurs propres politiques.",
        },
        {
          heading: "Cookies et technologies similaires",
          body: "Nous utilisons des cookies ou un stockage similaire pour les fonctions essentielles telles que la préférence de langue, et pour l'analytique/publicité comme décrit ci-dessus. Lors de votre première visite, nous affichons une bannière de cookies afin que vous puissiez choisir Tout accepter (publicités + analytique) ou Essentiels uniquement. Vous pouvez rouvrir les paramètres des cookies à tout moment depuis le contrôle flottant. Vous pouvez également contrôler les cookies via les paramètres de votre navigateur ; désactiver certains cookies peut affecter certaines fonctionnalités.",
        },
        {
          heading: "Comment nous utilisons les informations",
          body: "Nous utilisons les informations pour fournir des outils d'étude, mémoriser les préférences, mesurer les performances, prévenir les abus, communiquer lorsque vous nous contactez, et afficher des publicités qui aident à maintenir le service gratuit.",
        },
        {
          heading: "Partage",
          body: "Nous partageons des données avec des prestataires qui aident à exploiter le site (hébergement Vercel ; Firebase Authentication/Firestore et Analytics ; envoi d'e-mails Resend ; publicité si activée ; surveillance d'erreurs Sentry). Nous ne vendons pas votre e-mail en tant que produit autonome. Nous pouvons divulguer des informations si la loi l'exige ou pour protéger les droits, la sécurité.",
        },
        {
          heading: "Enfants",
          body: "Le site est destiné aux adultes se préparant à la naturalisation et aux apprenants similaires. Nous ne collectons pas sciemment d'informations personnelles auprès d'enfants de moins de 13 ans. Contactez-nous si vous pensez qu'un enfant a fourni des informations personnelles.",
        },
        {
          heading: "Visiteurs internationaux",
          body: "Le site peut être hébergé et traité aux États-Unis ou dans d'autres pays. Si vous y accédez depuis ailleurs, vous comprenez que les informations peuvent être transférées et traitées dans ces lieux.",
        },
        {
          heading: "Vos choix et demandes",
          body: `Vous pouvez effacer les données locales du site dans votre navigateur, bloquer les cookies, ou envoyer un e-mail à ${CONTACT_EMAIL} pour des questions de confidentialité. Si vous avez créé un compte optionnel, vous pouvez réinitialiser le mot de passe ou supprimer le compte (et la progression cloud) depuis le panneau de sync sur la page d'entraînement, ou nous écrire pour demander la suppression. La progression locale sur un appareil reste jusqu'à ce que vous effaciez les données du site.`,
        },
        {
          heading: "Modifications",
          body: "Nous pouvons mettre à jour cette politique de temps à autre. La date de « Dernière mise à jour » changera lorsque nous le ferons. La poursuite de l'utilisation du site après des modifications signifie que vous acceptez la politique mise à jour.",
        },
      ],
    },
  },
  {
    slug: "terms",
    title: {
      en: "Terms of Service",
      es: "Términos de servicio",
      zh: "服务条款",
      vi: "Điều khoản dịch vụ",
      tl: "Mga Tuntunin ng Serbisyo",
      ar: "شروط الخدمة",
      ko: "서비스 약관",
      hi: "सेवा की शर्तें",
      ru: "Условия использования",
      ht: "Kondisyon Sèvis",
      fr: "Conditions d'utilisation",
    },
    description: {
      en: "Terms that govern your use of USCivics Quiz and uscivics-quiz.com.",
      es: "Términos que rigen el uso de USCivics Quiz y uscivics-quiz.com.",
      zh: "适用于您使用 USCivics Quiz 和 uscivics-quiz.com 的条款。",
      vi: "Các điều khoản chi phối việc bạn sử dụng USCivics Quiz và uscivics-quiz.com.",
      tl: "Mga tuntuning namamahala sa paggamit mo ng USCivics Quiz at uscivics-quiz.com.",
      ar: "الشروط التي تحكم استخدامك لـ USCivics Quiz وموقع uscivics-quiz.com.",
      ko: "USCivics Quiz 및 uscivics-quiz.com 이용을 규율하는 약관입니다.",
      hi: "वे शर्तें जो USCivics Quiz और uscivics-quiz.com के आपके उपयोग को नियंत्रित करती हैं।",
      ru: "Условия, регулирующие использование вами USCivics Quiz и uscivics-quiz.com.",
      ht: "Kondisyon ki gouvène itilizasyon ou fè USCivics Quiz ak uscivics-quiz.com.",
      fr: "Conditions régissant votre utilisation de USCivics Quiz et uscivics-quiz.com.",
    },
    sections: {
      en: [
        {
          heading: "Agreement",
          body: "By using https://uscivics-quiz.com (the “Site”), you agree to these Terms of Service. If you do not agree, do not use the Site. Last updated: August 4, 2026.",
        },
        {
          heading: "What the Site is",
          body: "USCivics Quiz provides educational practice tools related to the U.S. naturalization civics and English tests. It is an independent study aid, not a government website and not a law firm.",
        },
        {
          heading: "No affiliation",
          body: "The Site is not affiliated with, endorsed by, or sponsored by USCIS, DHS, or any U.S. government agency. Names and trademarks of third parties are referenced only for identification and study purposes.",
        },
        {
          heading: "No legal advice",
          body: "Content on the Site is for general educational purposes only and is not legal advice. Immigration outcomes depend on your facts and current law/policy. Consult official sources or a qualified attorney for advice about your case.",
        },
        {
          heading: "Accuracy of study content",
          body: "We aim to keep practice questions and officials information current, including automated updates where available. Government materials and elections can change. You are responsible for verifying answers and rules before your interview.",
        },
        {
          heading: "Acceptable use",
          body: "You agree not to misuse the Site: no attempting to break security, scrape in a way that harms service availability, reverse engineer beyond what the law allows, spam, or use the Site for unlawful purposes.",
        },
        {
          heading: "Accounts and local data",
          body: "An account is not required. Local progress stored in your browser may be lost if you clear data or switch devices. We are not responsible for lost local progress.",
        },
        {
          heading: "Advertising and third parties",
          body: "The Site may display third-party advertisements when that feature is enabled, and may link to third-party services. Display ads are currently off by default. We are not responsible for third-party content, privacy practices, or availability.",
        },
        {
          heading: "Intellectual property",
          body: "Site design, branding, and original materials are owned by us or our licensors. Official USCIS question text is used for educational practice based on publicly available study materials. You may not copy the Site wholesale for commercial redistribution without permission.",
        },
        {
          heading: "Disclaimer of warranties",
          body: "THE SITE IS PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. We do not warrant that practice will guarantee a passing interview score.",
        },
        {
          heading: "Limitation of liability",
          body: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF DATA, PROFITS, OR OPPORTUNITY ARISING FROM YOUR USE OF THE SITE. OUR TOTAL LIABILITY FOR ANY CLAIM RELATED TO THE SITE IS LIMITED TO FIFTY U.S. DOLLARS (US $50).",
        },
        {
          heading: "Indemnity",
          body: "You agree to indemnify and hold us harmless from claims arising out of your misuse of the Site or violation of these Terms.",
        },
        {
          heading: "Changes",
          body: "We may update the Site and these Terms. Continued use after changes constitutes acceptance. We may suspend or discontinue the Site at any time.",
        },
        {
          heading: "Contact",
          body: `Questions about these Terms: ${CONTACT_EMAIL}.`,
        },
      ],
      es: [
        {
          heading: "Acuerdo",
          body: "Al usar https://uscivics-quiz.com (el “Sitio”), aceptás estos Términos de servicio. Si no estás de acuerdo, no uses el Sitio. Última actualización: 4 de agosto de 2026.",
        },
        {
          heading: "Qué es el Sitio",
          body: "USCivics Quiz ofrece herramientas educativas de práctica relacionadas con los exámenes de civismo e inglés de naturalización de EE.UU. Es una ayuda de estudio independiente, no un sitio gubernamental ni un estudio jurídico.",
        },
        {
          heading: "Sin afiliación",
          body: "El Sitio no está afiliado, respaldado ni patrocinado por USCIS, DHS ni ninguna agencia del gobierno de EE.UU. Nombres y marcas de terceros se mencionan solo para identificación y estudio.",
        },
        {
          heading: "Sin asesoría legal",
          body: "El contenido es solo educativo y general; no es asesoría legal. Los resultados migratorios dependen de tus hechos y de la ley/política vigente. Consultá fuentes oficiales o un abogado calificado para tu caso.",
        },
        {
          heading: "Exactitud del contenido",
          body: "Buscamos mantener actualizadas las preguntas y la información de oficiales, incluso con actualizaciones automáticas cuando sea posible. Los materiales del gobierno y las elecciones pueden cambiar. Vos sos responsable de verificar respuestas y reglas antes de la entrevista.",
        },
        {
          heading: "Uso aceptable",
          body: "Te comprometés a no abusar del Sitio: no intentar romper la seguridad, no hacer scraping que dañe la disponibilidad, no usar el Sitio con fines ilegales ni enviar spam.",
        },
        {
          heading: "Cuentas y datos locales",
          body: "No se requiere cuenta. El progreso local en el navegador puede perderse si borrás datos o cambiás de dispositivo. No somos responsables por progreso local perdido.",
        },
        {
          heading: "Publicidad y terceros",
          body: "El Sitio puede mostrar anuncios de terceros cuando esa función esté habilitada, y puede enlazar servicios de terceros. Los anuncios display están desactivados por defecto. No somos responsables del contenido, privacidad o disponibilidad de terceros.",
        },
        {
          heading: "Propiedad intelectual",
          body: "El diseño, marca y materiales originales del Sitio nos pertenecen o a nuestros licenciantes. El texto de preguntas oficiales USCIS se usa con fines educativos a partir de materiales públicos. No podés copiar el Sitio completo para redistribución comercial sin permiso.",
        },
        {
          heading: "Descargo de garantías",
          body: "EL SITIO SE OFRECE “TAL CUAL” Y “SEGÚN DISPONIBILIDAD”, SIN GARANTÍAS DE NINGÚN TIPO. No garantizamos que la práctica asegure aprobar la entrevista.",
        },
        {
          heading: "Límite de responsabilidad",
          body: "EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY, NO SOMOS RESPONSABLES POR DAÑOS INDIRECTOS, INCIDENTALES, ESPECIALES O CONSECUENTES, NI POR PÉRDIDA DE DATOS O OPORTUNIDADES DERIVADAS DEL USO DEL SITIO. NUESTRA RESPONSABILIDAD TOTAL POR CUALQUIER RECLAMO RELACIONADO CON EL SITIO SE LIMITA A CINCUENTA DÓLARES ESTADOUNIDENSES (US $50).",
        },
        {
          heading: "Indemnidad",
          body: "Aceptás indemnizarnos frente a reclamos derivados de tu mal uso del Sitio o de violar estos Términos.",
        },
        {
          heading: "Cambios",
          body: "Podemos actualizar el Sitio y estos Términos. El uso continuado implica aceptación. Podemos suspender o discontinuar el Sitio en cualquier momento.",
        },
        {
          heading: "Contacto",
          body: `Consultas sobre estos Términos: ${CONTACT_EMAIL}.`,
        },
      ],
      zh: [
        {
          heading: "协议",
          body: "使用 https://uscivics-quiz.com（“本网站”）即表示您同意本服务条款。如果您不同意，请勿使用本网站。最后更新日期：2026 年 8 月 4 日。",
        },
        {
          heading: "本网站是什么",
          body: "USCivics Quiz 提供与美国入籍公民与英语考试相关的教育性练习工具。它是一个独立的学习辅助工具，不是政府网站，也不是律师事务所。",
        },
        {
          heading: "无关联性",
          body: "本网站与 USCIS、DHS 或任何美国政府机构没有关联，也未获得其认可或赞助。第三方的名称和商标仅用于识别和学习目的。",
        },
        {
          heading: "并非法律建议",
          body: "本网站的内容仅供一般教育用途，不构成法律建议。移民结果取决于您的具体情况及现行法律/政策。请咨询官方渠道或合格律师以获取有关您案件的建议。",
        },
        {
          heading: "学习内容的准确性",
          body: "我们力求让练习题和官员信息保持最新，包括在可行的情况下进行自动更新。政府材料和选举结果可能会发生变化。您有责任在面谈前核实答案和规则。",
        },
        {
          heading: "可接受的使用方式",
          body: "您同意不滥用本网站：不得试图破坏安全性，不得以损害服务可用性的方式进行抓取，不得超出法律允许范围进行逆向工程，不得发送垃圾信息，也不得将本网站用于非法目的。",
        },
        {
          heading: "账户与本地数据",
          body: "无需账户。如果您清除数据或更换设备，浏览器中存储的本地进度可能会丢失。我们不对丢失的本地进度负责。",
        },
        {
          heading: "广告与第三方",
          body: "本网站可能展示第三方广告并链接到第三方服务。我们不对第三方的内容、隐私做法或可用性负责。",
        },
        {
          heading: "知识产权",
          body: "网站设计、品牌和原创材料归我们或我们的许可方所有。官方 USCIS 题目文本基于公开的学习材料用于教育性练习。未经许可，您不得整体复制本网站用于商业性再分发。",
        },
        {
          heading: "免责声明",
          body: "本网站按“现状”和“现有”提供，不作任何明示或暗示的保证，包括适销性、特定用途适用性和不侵权保证。我们不保证练习能确保您在面谈中通过。",
        },
        {
          heading: "责任限制",
          body: "在法律允许的最大范围内，我们对因您使用本网站而产生的间接、附带、特殊、后果性或惩罚性损害，或任何数据、利润或机会损失概不负责。我们对与本网站相关的任何索赔的总责任上限为五十美元（US $50）。",
        },
        {
          heading: "赔偿",
          body: "您同意就因您滥用本网站或违反本条款而产生的索赔对我们进行赔偿并使我们免受损害。",
        },
        {
          heading: "变更",
          body: "我们可能会更新本网站和本条款。变更后继续使用即表示接受。我们可能随时暂停或终止本网站。",
        },
        {
          heading: "联系方式",
          body: `有关本条款的问题：${CONTACT_EMAIL}。`,
        },
      ],
      vi: [
        {
          heading: "Thỏa thuận",
          body: "Bằng việc sử dụng https://uscivics-quiz.com (“Trang web”), bạn đồng ý với các Điều khoản Dịch vụ này. Nếu bạn không đồng ý, vui lòng không sử dụng Trang web. Cập nhật lần cuối: ngày 4 tháng 8 năm 2026.",
        },
        {
          heading: "Trang web này là gì",
          body: "USCivics Quiz cung cấp các công cụ luyện tập mang tính giáo dục liên quan đến kỳ thi công dân học và tiếng Anh nhập tịch Hoa Kỳ. Đây là công cụ hỗ trợ học tập độc lập, không phải trang web của chính phủ và không phải công ty luật.",
        },
        {
          heading: "Không liên kết",
          body: "Trang web không liên kết, không được chứng thực hay tài trợ bởi USCIS, DHS, hoặc bất kỳ cơ quan chính phủ Hoa Kỳ nào. Tên và nhãn hiệu của bên thứ ba chỉ được đề cập nhằm mục đích nhận diện và học tập.",
        },
        {
          heading: "Không phải tư vấn pháp lý",
          body: "Nội dung trên Trang web chỉ nhằm mục đích giáo dục chung và không phải là tư vấn pháp lý. Kết quả nhập cư phụ thuộc vào tình huống cụ thể của bạn và luật/chính sách hiện hành. Hãy tham khảo các nguồn chính thức hoặc luật sư có chuyên môn để được tư vấn về trường hợp của bạn.",
        },
        {
          heading: "Độ chính xác của nội dung học tập",
          body: "Chúng tôi cố gắng cập nhật các câu hỏi luyện tập và thông tin quan chức, bao gồm cập nhật tự động khi có thể. Tài liệu của chính phủ và các cuộc bầu cử có thể thay đổi. Bạn có trách nhiệm xác minh câu trả lời và quy định trước khi phỏng vấn.",
        },
        {
          heading: "Sử dụng hợp lệ",
          body: "Bạn đồng ý không lạm dụng Trang web: không cố gắng phá vỡ bảo mật, không thu thập dữ liệu (scrape) theo cách gây hại đến tính khả dụng của dịch vụ, không thực hiện kỹ thuật đảo ngược vượt quá mức pháp luật cho phép, không gửi thư rác, hoặc không sử dụng Trang web cho các mục đích bất hợp pháp.",
        },
        {
          heading: "Tài khoản và dữ liệu cục bộ",
          body: "Không yêu cầu tài khoản. Tiến trình cục bộ được lưu trong trình duyệt của bạn có thể bị mất nếu bạn xóa dữ liệu hoặc chuyển thiết bị. Chúng tôi không chịu trách nhiệm về việc mất tiến trình cục bộ.",
        },
        {
          heading: "Quảng cáo và bên thứ ba",
          body: "Trang web có thể hiển thị quảng cáo của bên thứ ba và liên kết đến các dịch vụ của bên thứ ba. Chúng tôi không chịu trách nhiệm về nội dung, thực tiễn quyền riêng tư, hoặc tính khả dụng của bên thứ ba.",
        },
        {
          heading: "Sở hữu trí tuệ",
          body: "Thiết kế trang web, thương hiệu, và tài liệu gốc thuộc sở hữu của chúng tôi hoặc bên cấp phép. Văn bản câu hỏi chính thức của USCIS được sử dụng cho mục đích luyện tập giáo dục dựa trên tài liệu học tập công khai. Bạn không được sao chép toàn bộ Trang web để phân phối lại thương mại mà không có sự cho phép.",
        },
        {
          heading: "Từ chối bảo đảm",
          body: "TRANG WEB ĐƯỢC CUNG CẤP “NGUYÊN TRẠNG” VÀ “TÙY THEO TÌNH TRẠNG SẴN CÓ” MÀ KHÔNG CÓ BẤT KỲ BẢO ĐẢM NÀO, RÕ RÀNG HAY NGỤ Ý, BAO GỒM KHẢ NĂNG BÁN ĐƯỢC, SỰ PHÙ HỢP CHO MỘT MỤC ĐÍCH CỤ THỂ, VÀ KHÔNG VI PHẠM. Chúng tôi không đảm bảo rằng việc luyện tập sẽ đảm bảo đạt điểm đậu trong buổi phỏng vấn.",
        },
        {
          heading: "Giới hạn trách nhiệm",
          body: "TRONG PHẠM VI TỐI ĐA ĐƯỢC PHÁP LUẬT CHO PHÉP, CHÚNG TÔI KHÔNG CHỊU TRÁCH NHIỆM VỀ CÁC THIỆT HẠI GIÁN TIẾP, NGẪU NHIÊN, ĐẶC BIỆT, DO HẬU QUẢ, HOẶC MANG TÍNH TRỪNG PHẠT, HOẶC BẤT KỲ TỔN THẤT DỮ LIỆU, LỢI NHUẬN, HOẶC CƠ HỘI NÀO PHÁT SINH TỪ VIỆC BẠN SỬ DỤNG TRANG WEB. TỔNG TRÁCH NHIỆM CỦA CHÚNG TÔI ĐỐI VỚI BẤT KỲ KHIẾU NẠI NÀO LIÊN QUAN ĐẾN TRANG WEB ĐƯỢC GIỚI HẠN Ở NĂM MƯƠI ĐÔ LA MỸ (US $50).",
        },
        {
          heading: "Bồi thường",
          body: "Bạn đồng ý bồi thường và giữ cho chúng tôi không bị tổn hại từ các khiếu nại phát sinh từ việc bạn lạm dụng Trang web hoặc vi phạm các Điều khoản này.",
        },
        {
          heading: "Thay đổi",
          body: "Chúng tôi có thể cập nhật Trang web và các Điều khoản này. Việc tiếp tục sử dụng sau khi thay đổi đồng nghĩa với việc chấp nhận. Chúng tôi có thể tạm ngừng hoặc ngừng cung cấp Trang web bất cứ lúc nào.",
        },
        {
          heading: "Liên hệ",
          body: `Câu hỏi về các Điều khoản này: ${CONTACT_EMAIL}.`,
        },
      ],
      tl: [
        {
          heading: "Kasunduan",
          body: "Sa paggamit ng https://uscivics-quiz.com (ang “Site”), sumasang-ayon ka sa mga Tuntunin ng Serbisyong ito. Kung hindi ka sumasang-ayon, huwag gamitin ang Site. Huling na-update: Agosto 4, 2026.",
        },
        {
          heading: "Ano ang Site",
          body: "Nagbibigay ang USCivics Quiz ng mga edukasyonal na kagamitang pansanay na may kaugnayan sa mga pagsusulit sa civics at Ingles para sa naturalization sa Estados Unidos. Ito ay isang malayang tulong pang-aral, hindi isang website ng gobyerno at hindi isang law firm.",
        },
        {
          heading: "Walang afiliasyon",
          body: "Ang Site ay hindi kaugnay, sinang-ayunan, o itinataguyod ng USCIS, DHS, o anumang ahensya ng gobyerno ng Estados Unidos. Ang mga pangalan at trademark ng ibang partido ay binabanggit lamang para sa pagkakakilanlan at layuning pang-aral.",
        },
        {
          heading: "Hindi legal na payo",
          body: "Ang nilalaman sa Site ay para lamang sa pangkalahatang layuning edukasyonal at hindi legal na payo. Ang mga resulta sa imigrasyon ay nakadepende sa iyong mga pangyayari at kasalukuyang batas/patakaran. Kumonsulta sa opisyal na mga mapagkukunan o kwalipikadong abogado para sa payo tungkol sa iyong kaso.",
        },
        {
          heading: "Kawastuhan ng nilalamang pang-aral",
          body: "Layunin naming panatilihing napapanahon ang mga tanong sa pagsasanay at impormasyon ng mga opisyal, kasama ang mga awtomatikong update kung available. Maaaring magbago ang mga materyales ng gobyerno at eleksyon. Ikaw ang responsable sa pagbe-verify ng mga sagot at alituntunin bago ang iyong panayam.",
        },
        {
          heading: "Katanggap-tanggap na paggamit",
          body: "Sumasang-ayon kang hindi aabusuhin ang Site: hindi susubukang sirain ang seguridad, mag-scrape sa paraang nakakasama sa availability ng serbisyo, mag-reverse engineer nang lampas sa pinapayagan ng batas, mag-spam, o gamitin ang Site para sa mga ilegal na layunin.",
        },
        {
          heading: "Mga account at lokal na datos",
          body: "Hindi kailangan ng account. Ang lokal na progreso na naka-imbak sa iyong browser ay maaaring mawala kung i-clear mo ang data o magpalit ng device. Hindi kami responsable sa nawalang lokal na progreso.",
        },
        {
          heading: "Advertising at ikatlong partido",
          body: "Maaaring magpakita ang Site ng mga advertisement ng ikatlong partido at mag-link sa mga serbisyo ng ikatlong partido. Hindi kami responsable sa nilalaman, gawi sa privacy, o availability ng ikatlong partido.",
        },
        {
          heading: "Intelektwal na ari-arian",
          body: "Ang disenyo ng Site, branding, at mga orihinal na materyales ay pag-aari namin o ng aming mga lisensyado. Ginagamit ang opisyal na teksto ng tanong ng USCIS para sa edukasyonal na pagsasanay batay sa pampublikong materyales pang-aral. Hindi mo maaaring kopyahin ang buong Site para sa komersyal na muling pamamahagi nang walang pahintulot.",
        },
        {
          heading: "Pagtanggi sa mga warranty",
          body: "IBINIBIGAY ANG SITE NANG “AS IS” AT “AS AVAILABLE” NANG WALANG ANUMANG WARRANTY, TAHASAN MAN O IPINAHIHIWATIG, KABILANG ANG MERCHANTABILITY, KAANGKUPAN PARA SA ISANG PARTIKULAR NA LAYUNIN, AT NON-INFRINGEMENT. Hindi namin ginagarantiya na ang pagsasanay ay makakasiguro ng pagpasa sa panayam.",
        },
        {
          heading: "Limitasyon sa pananagutan",
          body: "SA PINAKAMATAAS NA ANTAS NA PINAPAYAGAN NG BATAS, HINDI KAMI MANANAGOT SA HINDI DIREKTA, INCIDENTAL, ESPESYAL, KONSEKWENSYAL, O PARUSANG PINSALA, O ANUMANG PAGKAWALA NG DATA, KITA, O PAGKAKATAON NA NAGMUMULA SA PAGGAMIT MO NG SITE. ANG KABUUANG PANANAGUTAN NAMIN PARA SA ANUMANG KLEYM NA KAUGNAY SA SITE AY LIMITADO SA LIMANGPUNG DOLLAR NG ESTADOS UNIDOS (US $50).",
        },
        {
          heading: "Indemnity",
          body: "Sumasang-ayon kang mag-indemnify at hindi panagutin kami sa mga kleym na nagmumula sa iyong maling paggamit ng Site o paglabag sa mga Tuntuning ito.",
        },
        {
          heading: "Mga pagbabago",
          body: "Maaari naming i-update ang Site at ang mga Tuntuning ito. Ang patuloy na paggamit pagkatapos ng mga pagbabago ay itinuturing na pagtanggap. Maaari naming i-suspinde o ihinto ang Site anumang oras.",
        },
        {
          heading: "Makipag-ugnayan",
          body: `Mga tanong tungkol sa mga Tuntuning ito: ${CONTACT_EMAIL}.`,
        },
      ],
      ar: [
        {
          heading: "الموافقة",
          body: "باستخدامك لموقع https://uscivics-quiz.com (“الموقع”)، فإنك توافق على شروط الخدمة هذه. إذا كنت لا توافق، فلا تستخدم الموقع. آخر تحديث: 4 أغسطس 2026.",
        },
        {
          heading: "ما هو الموقع",
          body: "توفر USCivics Quiz أدوات تدريب تعليمية متعلقة باختبار التربية المدنية واللغة الإنجليزية للتجنس الأمريكي. إنها أداة مساعدة دراسية مستقلة، وليست موقعاً حكومياً ولا مكتب محاماة.",
        },
        {
          heading: "لا انتماء",
          body: "لا يرتبط الموقع بـ USCIS أو DHS أو أي جهة حكومية أمريكية، ولا يحظى بتأييدها أو رعايتها. تُذكر أسماء وعلامات الجهات الأخرى فقط لأغراض التعريف والدراسة.",
        },
        {
          heading: "ليست استشارة قانونية",
          body: "المحتوى الموجود على الموقع مخصص لأغراض تعليمية عامة فقط وليس استشارة قانونية. تعتمد نتائج الهجرة على وقائع حالتك والقانون/السياسة الحالية. استشر مصادر رسمية أو محامياً مؤهلاً للحصول على استشارة بخصوص حالتك.",
        },
        {
          heading: "دقة محتوى الدراسة",
          body: "نسعى للحفاظ على تحديث أسئلة التدريب ومعلومات المسؤولين، بما في ذلك التحديثات الآلية حيثما أمكن. يمكن أن تتغير المواد الحكومية والانتخابات. أنت مسؤول عن التحقق من الإجابات والقواعد قبل مقابلتك.",
        },
        {
          heading: "الاستخدام المقبول",
          body: "أنت توافق على عدم إساءة استخدام الموقع: عدم محاولة اختراق الأمان، أو الاستخلاص الآلي (scraping) بطريقة تضر بتوفر الخدمة، أو الهندسة العكسية بما يتجاوز ما يسمح به القانون، أو إرسال رسائل مزعجة، أو استخدام الموقع لأغراض غير قانونية.",
        },
        {
          heading: "الحسابات والبيانات المحلية",
          body: "لا حاجة لحساب. قد يُفقد التقدم المحلي المخزن في متصفحك إذا قمت بمسح البيانات أو تغيير الأجهزة. نحن لسنا مسؤولين عن فقدان التقدم المحلي.",
        },
        {
          heading: "الإعلانات والأطراف الثالثة",
          body: "قد يعرض الموقع إعلانات من أطراف ثالثة ويرتبط بخدمات أطراف ثالثة. نحن لسنا مسؤولين عن محتوى الأطراف الثالثة أو ممارساتها المتعلقة بالخصوصية أو توفرها.",
        },
        {
          heading: "الملكية الفكرية",
          body: "تصميم الموقع وعلامته التجارية والمواد الأصلية مملوكة لنا أو للجهات المرخِّصة لنا. يُستخدم نص أسئلة USCIS الرسمية للتدريب التعليمي استناداً إلى مواد دراسية متاحة للعموم. لا يجوز لك نسخ الموقع بالكامل لإعادة التوزيع التجاري دون إذن.",
        },
        {
          heading: "إخلاء المسؤولية عن الضمانات",
          body: "يُقدَّم الموقع “كما هو” و“حسب التوفر” دون أي ضمانات من أي نوع، صريحة أو ضمنية، بما في ذلك القابلية للتسويق والملاءمة لغرض معين وعدم الانتهاك. نحن لا نضمن أن التدريب سيضمن اجتياز المقابلة بنجاح.",
        },
        {
          heading: "تحديد المسؤولية",
          body: "إلى أقصى حد يسمح به القانون، لسنا مسؤولين عن الأضرار غير المباشرة أو العرضية أو الخاصة أو التبعية أو العقابية، أو أي خسارة في البيانات أو الأرباح أو الفرص الناشئة عن استخدامك للموقع. تقتصر مسؤوليتنا الإجمالية عن أي مطالبة تتعلق بالموقع على خمسين دولاراً أمريكياً (US $50).",
        },
        {
          heading: "التعويض",
          body: "أنت توافق على تعويضنا وإبرائنا من أي مطالبات ناشئة عن إساءة استخدامك للموقع أو انتهاكك لهذه الشروط.",
        },
        {
          heading: "التغييرات",
          body: "قد نقوم بتحديث الموقع وهذه الشروط. استمرار الاستخدام بعد التغييرات يشكل قبولاً لها. يجوز لنا تعليق الموقع أو إيقافه في أي وقت.",
        },
        {
          heading: "التواصل",
          body: `للأسئلة حول هذه الشروط: ${CONTACT_EMAIL}.`,
        },
      ],
      ko: [
        {
          heading: "동의",
          body: "https://uscivics-quiz.com(“사이트”)를 이용함으로써 귀하는 본 서비스 약관에 동의하는 것입니다. 동의하지 않으시면 사이트를 이용하지 마십시오. 최종 업데이트: 2026년 8월 4일.",
        },
        {
          heading: "사이트란",
          body: "USCivics Quiz는 미국 귀화 시민교육 및 영어 시험과 관련된 교육용 연습 도구를 제공합니다. 이는 독립적인 학습 보조 도구이며, 정부 웹사이트도 법률 사무소도 아닙니다.",
        },
        {
          heading: "제휴 없음",
          body: "본 사이트는 USCIS, DHS 또는 어떠한 미국 정부 기관과도 제휴, 승인, 후원 관계가 없습니다. 제3자의 이름과 상표는 식별 및 학습 목적으로만 언급됩니다.",
        },
        {
          heading: "법률 자문 아님",
          body: "사이트의 콘텐츠는 일반적인 교육 목적으로만 제공되며 법률 자문이 아닙니다. 이민 결과는 귀하의 사실관계와 현행 법률/정책에 따라 달라집니다. 귀하의 사건에 대한 자문은 공식 출처 또는 자격을 갖춘 변호사에게 문의하십시오.",
        },
        {
          heading: "학습 콘텐츠의 정확성",
          body: "저희는 가능한 경우 자동 업데이트를 포함하여 연습 문제와 공무원 정보를 최신 상태로 유지하고자 노력합니다. 정부 자료와 선거는 변경될 수 있습니다. 인터뷰 전 답변과 규정을 확인할 책임은 귀하에게 있습니다.",
        },
        {
          heading: "허용되는 사용",
          body: "귀하는 사이트를 오용하지 않기로 동의합니다: 보안을 뚫으려는 시도, 서비스 가용성에 해를 끼치는 방식의 스크래핑, 법이 허용하는 범위를 넘어서는 역엔지니어링, 스팸 발송, 또는 불법적인 목적으로 사이트를 사용하는 행위를 하지 않습니다.",
        },
        {
          heading: "계정 및 로컬 데이터",
          body: "계정은 필요하지 않습니다. 브라우저에 저장된 로컬 진행 상황은 데이터를 삭제하거나 기기를 변경하면 손실될 수 있습니다. 저희는 손실된 로컬 진행 상황에 대해 책임지지 않습니다.",
        },
        {
          heading: "광고 및 제3자",
          body: "사이트는 제3자 광고를 표시하고 제3자 서비스에 연결될 수 있습니다. 저희는 제3자의 콘텐츠, 개인정보 처리방식 또는 가용성에 대해 책임지지 않습니다.",
        },
        {
          heading: "지적 재산권",
          body: "사이트 디자인, 브랜딩 및 원본 자료는 저희 또는 라이선스 제공자의 소유입니다. 공식 USCIS 문제 텍스트는 공개적으로 이용 가능한 학습 자료를 바탕으로 교육용 연습에 사용됩니다. 허가 없이 사이트 전체를 상업적으로 재배포하기 위해 복제할 수 없습니다.",
        },
        {
          heading: "보증 부인",
          body: "사이트는 상품성, 특정 목적에의 적합성, 비침해를 포함하여 명시적이든 묵시적이든 어떠한 종류의 보증 없이 “있는 그대로” 및 “이용 가능한 대로” 제공됩니다. 저희는 연습이 인터뷰 합격 점수를 보장한다고 보증하지 않습니다.",
        },
        {
          heading: "책임의 제한",
          body: "법이 허용하는 최대 범위 내에서, 저희는 귀하의 사이트 사용으로 인해 발생하는 간접적, 부수적, 특별, 결과적 또는 징벌적 손해, 또는 데이터, 이익, 기회의 손실에 대해 책임지지 않습니다. 사이트와 관련된 모든 청구에 대한 저희의 총 책임은 미화 50달러(US $50)로 제한됩니다.",
        },
        {
          heading: "면책",
          body: "귀하는 귀하의 사이트 오용 또는 본 약관 위반으로 인해 발생하는 청구로부터 저희에게 손해를 끼치지 않도록 면책할 것에 동의합니다.",
        },
        {
          heading: "변경사항",
          body: "저희는 사이트와 본 약관을 업데이트할 수 있습니다. 변경 후 계속 사용하는 것은 동의로 간주됩니다. 저희는 언제든지 사이트를 중단하거나 종료할 수 있습니다.",
        },
        {
          heading: "문의",
          body: `본 약관에 대한 문의: ${CONTACT_EMAIL}.`,
        },
      ],
      hi: [
        {
          heading: "समझौता",
          body: "https://uscivics-quiz.com (“साइट”) का उपयोग करके, आप इन सेवा शर्तों से सहमत होते हैं। यदि आप सहमत नहीं हैं, तो साइट का उपयोग न करें। अंतिम अपडेट: 4 अगस्त, 2026।",
        },
        {
          heading: "साइट क्या है",
          body: "USCivics Quiz अमेरिकी नागरिकता (naturalization) सिविक्स और अंग्रेज़ी परीक्षा से संबंधित शैक्षिक अभ्यास उपकरण प्रदान करता है। यह एक स्वतंत्र अध्ययन सहायता है, न कि कोई सरकारी वेबसाइट या लॉ फर्म।",
        },
        {
          heading: "कोई संबद्धता नहीं",
          body: "साइट का USCIS, DHS, या किसी भी अमेरिकी सरकारी एजेंसी से कोई संबंध, समर्थन या प्रायोजन नहीं है। तीसरे पक्ष के नाम और ट्रेडमार्क केवल पहचान और अध्ययन उद्देश्यों के लिए संदर्भित हैं।",
        },
        {
          heading: "कानूनी सलाह नहीं",
          body: "साइट पर सामग्री केवल सामान्य शैक्षिक उद्देश्यों के लिए है और कानूनी सलाह नहीं है। आप्रवासन परिणाम आपके तथ्यों और वर्तमान कानून/नीति पर निर्भर करते हैं। अपने मामले के बारे में सलाह के लिए आधिकारिक स्रोतों या किसी योग्य वकील से परामर्श करें।",
        },
        {
          heading: "अध्ययन सामग्री की सटीकता",
          body: "हम अभ्यास प्रश्नों और अधिकारियों की जानकारी को अद्यतन रखने का प्रयास करते हैं, जिसमें उपलब्ध होने पर स्वचालित अपडेट भी शामिल हैं। सरकारी सामग्री और चुनाव बदल सकते हैं। साक्षात्कार से पहले उत्तरों और नियमों को सत्यापित करने की जिम्मेदारी आपकी है।",
        },
        {
          heading: "स्वीकार्य उपयोग",
          body: "आप साइट का दुरुपयोग न करने के लिए सहमत हैं: सुरक्षा तोड़ने का प्रयास न करना, सेवा उपलब्धता को नुकसान पहुंचाने वाले तरीके से स्क्रैप न करना, कानून द्वारा अनुमत सीमा से अधिक रिवर्स इंजीनियर न करना, स्पैम न करना, या साइट का उपयोग गैरकानूनी उद्देश्यों के लिए न करना।",
        },
        {
          heading: "खाते और स्थानीय डेटा",
          body: "खाते की आवश्यकता नहीं है। यदि आप डेटा साफ़ करते हैं या डिवाइस बदलते हैं तो आपके ब्राउज़र में संग्रहीत स्थानीय प्रगति खो सकती है। हम खोई हुई स्थानीय प्रगति के लिए जिम्मेदार नहीं हैं।",
        },
        {
          heading: "विज्ञापन और तृतीय पक्ष",
          body: "साइट तृतीय-पक्ष विज्ञापन प्रदर्शित कर सकती है और तृतीय-पक्ष सेवाओं से लिंक कर सकती है। हम तृतीय-पक्ष सामग्री, गोपनीयता प्रथाओं, या उपलब्धता के लिए जिम्मेदार नहीं हैं।",
        },
        {
          heading: "बौद्धिक संपदा",
          body: "साइट का डिज़ाइन, ब्रांडिंग, और मूल सामग्री हमारे या हमारे लाइसेंसदाताओं के स्वामित्व में है। आधिकारिक USCIS प्रश्न पाठ का उपयोग सार्वजनिक रूप से उपलब्ध अध्ययन सामग्री के आधार पर शैक्षिक अभ्यास के लिए किया जाता है। आप अनुमति के बिना वाणिज्यिक पुनर्वितरण के लिए साइट को पूर्ण रूप से कॉपी नहीं कर सकते।",
        },
        {
          heading: "वारंटी अस्वीकरण",
          body: "साइट को “जैसा है” और “जैसा उपलब्ध है” आधार पर बिना किसी स्पष्ट या निहित वारंटी के प्रदान किया जाता है, जिसमें व्यापारिकता, किसी विशेष उद्देश्य के लिए उपयुक्तता, और गैर-उल्लंघन शामिल है। हम इस बात की गारंटी नहीं देते कि अभ्यास साक्षात्कार में पास होने की गारंटी देगा।",
        },
        {
          heading: "देयता की सीमा",
          body: "कानून द्वारा अनुमत अधिकतम सीमा तक, हम आपके साइट के उपयोग से उत्पन्न होने वाले अप्रत्यक्ष, आकस्मिक, विशेष, परिणामी, या दंडात्मक नुकसान, या डेटा, लाभ, या अवसर की किसी भी हानि के लिए उत्तरदायी नहीं हैं। साइट से संबंधित किसी भी दावे के लिए हमारी कुल देयता पचास अमेरिकी डॉलर (US $50) तक सीमित है।",
        },
        {
          heading: "क्षतिपूर्ति",
          body: "आप साइट के अपने दुरुपयोग या इन शर्तों के उल्लंघन से उत्पन्न होने वाले दावों से हमें क्षतिपूर्ति देने और हानिरहित रखने के लिए सहमत हैं।",
        },
        {
          heading: "परिवर्तन",
          body: "हम साइट और इन शर्तों को अपडेट कर सकते हैं। परिवर्तनों के बाद निरंतर उपयोग स्वीकृति का गठन करता है। हम किसी भी समय साइट को निलंबित या बंद कर सकते हैं।",
        },
        {
          heading: "संपर्क करें",
          body: `इन शर्तों के बारे में प्रश्न: ${CONTACT_EMAIL}।`,
        },
      ],
      ru: [
        {
          heading: "Соглашение",
          body: "Используя https://uscivics-quiz.com («Сайт»), вы соглашаетесь с настоящими Условиями использования. Если вы не согласны, не используйте Сайт. Последнее обновление: 4 августа 2026 г.",
        },
        {
          heading: "Что такое Сайт",
          body: "USCivics Quiz предоставляет образовательные инструменты для практики, связанные с экзаменом по граждановедению и английскому языку при натурализации в США. Это независимое учебное пособие, а не государственный сайт и не юридическая фирма.",
        },
        {
          heading: "Отсутствие связи",
          body: "Сайт не связан, не одобрен и не спонсируется USCIS, DHS или какими-либо государственными органами США. Названия и товарные знаки третьих сторон упоминаются только в целях идентификации и обучения.",
        },
        {
          heading: "Не юридическая консультация",
          body: "Контент на Сайте предназначен только для общих образовательных целей и не является юридической консультацией. Результаты по иммиграционным делам зависят от ваших фактических обстоятельств и действующего законодательства/политики. Обращайтесь к официальным источникам или квалифицированному адвокату за консультацией по вашему делу.",
        },
        {
          heading: "Точность учебного контента",
          body: "Мы стремимся поддерживать актуальность практических вопросов и информации о должностных лицах, включая автоматические обновления, где это возможно. Государственные материалы и результаты выборов могут меняться. Вы несёте ответственность за проверку ответов и правил перед собеседованием.",
        },
        {
          heading: "Допустимое использование",
          body: "Вы соглашаетесь не злоупотреблять Сайтом: не пытаться взломать защиту, не использовать скрапинг способом, наносящим вред доступности сервиса, не заниматься обратной разработкой сверх дозволенного законом, не рассылать спам и не использовать Сайт в незаконных целях.",
        },
        {
          heading: "Учётные записи и локальные данные",
          body: "Учётная запись не требуется. Локальный прогресс, хранящийся в вашем браузере, может быть утерян, если вы очистите данные или смените устройство. Мы не несём ответственности за утрату локального прогресса.",
        },
        {
          heading: "Реклама и третьи стороны",
          body: "Сайт может показывать рекламу третьих сторон и ссылаться на сервисы третьих сторон. Мы не несём ответственности за контент, практики конфиденциальности или доступность сторонних сервисов.",
        },
        {
          heading: "Интеллектуальная собственность",
          body: "Дизайн Сайта, брендинг и оригинальные материалы принадлежат нам или нашим лицензиарам. Официальный текст вопросов USCIS используется для образовательной практики на основе общедоступных учебных материалов. Вы не можете копировать Сайт целиком для коммерческого распространения без разрешения.",
        },
        {
          heading: "Отказ от гарантий",
          body: "САЙТ ПРЕДОСТАВЛЯЕТСЯ «КАК ЕСТЬ» И «ПО МЕРЕ ДОСТУПНОСТИ» БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ, ЯВНЫХ ИЛИ ПОДРАЗУМЕВАЕМЫХ, ВКЛЮЧАЯ ТОВАРНУЮ ПРИГОДНОСТЬ, ПРИГОДНОСТЬ ДЛЯ ОПРЕДЕЛЁННОЙ ЦЕЛИ И ОТСУТСТВИЕ НАРУШЕНИЙ. Мы не гарантируем, что практика обеспечит прохождение собеседования.",
        },
        {
          heading: "Ограничение ответственности",
          body: "В МАКСИМАЛЬНОЙ СТЕПЕНИ, РАЗРЕШЁННОЙ ЗАКОНОМ, МЫ НЕ НЕСЁМ ОТВЕТСТВЕННОСТИ ЗА КОСВЕННЫЕ, СЛУЧАЙНЫЕ, ОСОБЫЕ, КОСВЕННЫЕ ИЛИ ШТРАФНЫЕ УБЫТКИ, А ТАКЖЕ ЗА ЛЮБУЮ ПОТЕРЮ ДАННЫХ, ПРИБЫЛИ ИЛИ ВОЗМОЖНОСТЕЙ, ВОЗНИКАЮЩИЕ В РЕЗУЛЬТАТЕ ИСПОЛЬЗОВАНИЯ ВАМИ САЙТА. НАША ОБЩАЯ ОТВЕТСТВЕННОСТЬ ПО ЛЮБОЙ ПРЕТЕНЗИИ, СВЯЗАННОЙ С САЙТОМ, ОГРАНИЧЕНА ПЯТЬЮДЕСЯТЬЮ ДОЛЛАРАМИ США (US $50).",
        },
        {
          heading: "Возмещение убытков",
          body: "Вы соглашаетесь возместить нам ущерб и оградить нас от претензий, возникающих в результате неправомерного использования вами Сайта или нарушения настоящих Условий.",
        },
        {
          heading: "Изменения",
          body: "Мы можем обновлять Сайт и настоящие Условия. Продолжение использования после внесения изменений означает принятие. Мы можем приостановить или прекратить работу Сайта в любое время.",
        },
        {
          heading: "Контакты",
          body: `Вопросы об этих Условиях: ${CONTACT_EMAIL}.`,
        },
      ],
      ht: [
        {
          heading: "Akò",
          body: "Lè w itilize https://uscivics-quiz.com (“Sit la”), ou dakò ak Kondisyon Sèvis sa yo. Si w pa dakò, pa itilize Sit la. Dènye mizajou: 4 out 2026.",
        },
        {
          heading: "Kisa Sit la ye",
          body: "USCivics Quiz bay zouti pratik edikatif ki gen rapò ak egzamen sivik ak angle pou naturalizasyon Ozetazini. Se yon zouti asistans etid endepandan, se pa yon sit gouvènman ni yon biwo avoka.",
        },
        {
          heading: "Pa gen afilyasyon",
          body: "Sit la pa gen okenn afilyasyon, li pa apwouve ni patwone pa USCIS, DHS, oswa nenpòt ajans gouvènman ameriken. Non ak mak komèsyal twazyèm pati yo mansyone sèlman pou idantifikasyon ak rezon pou etid.",
        },
        {
          heading: "Se pa konsèy legal",
          body: "Kontni sou Sit la se sèlman pou rezon edikatif jeneral e li pa konsèy legal. Rezilta imigrasyon depann sou fè w yo ak lwa/politik aktyèl la. Konsilte sous ofisyèl oswa yon avoka kalifye pou konsèy sou ka pa w.",
        },
        {
          heading: "Egzatitid kontni etid la",
          body: "Nou vize kenbe kesyon pratik yo ak enfòmasyon ofisyèl yo ajou, ki gen ladan mizajou otomatik kote sa disponib. Materyèl gouvènman an ak eleksyon yo ka chanje. Se responsablite w pou verifye repons ak règ anvan entèvyou ou.",
        },
        {
          heading: "Itilizasyon akseptab",
          body: "Ou dakò pou w pa abize Sit la: pa eseye kraze sekirite, pa fè scraping nan yon fason ki fè mal a disponiblite sèvis la, pa fè reverse engineering pi lwen pase sa lalwa pèmèt, pa voye spam, oswa pa itilize Sit la pou rezon ilegal.",
        },
        {
          heading: "Kont ak done lokal",
          body: "Pa gen bezwen kont. Pwogrè lokal ki estoke nan navigatè ou ka pèdi si w efase done oswa chanje aparèy. Nou pa responsab pou pwogrè lokal ki pèdi.",
        },
        {
          heading: "Piblisite ak twazyèm pati",
          body: "Sit la ka montre piblisite twazyèm pati e li ka lye ak sèvis twazyèm pati. Nou pa responsab pou kontni, pratik sou vi prive, oswa disponiblite twazyèm pati.",
        },
        {
          heading: "Pwopriyete entelektyèl",
          body: "Konsepsyon Sit la, mak, ak materyèl orijinal yo se pwopriyete pa nou oswa lisansye nou yo. Tèks kesyon ofisyèl USCIS yo itilize pou pratik edikatif ki baze sou materyèl etid piblik ki disponib. Ou pa gen dwa kopye Sit la an antye pou redistribisyon komèsyal san pèmisyon.",
        },
        {
          heading: "Egzansyon garanti",
          body: "SIT LA BAY “JAN LI YE A” AK “JAN LI DISPONIB LA” SAN OKENN GARANTI, KLÈ OSWA ENPLISIT, KI GEN LADAN GARANTI KOMÈSYALIZASYON, ADEKASYON POU YON ITILIZASYON PATIKILYE, AK NON-VIYOLASYON. Nou pa garanti pratik la ap asire yon nòt k ap fè w pase entèvyou a.",
        },
        {
          heading: "Limit responsablite",
          body: "NAN LIMIT MAKSIMÒM LALWA PÈMÈT, NOU PA RESPONSAB POU DOMAJ ENDIRÈK, ENSIDANTÈL, ESPESYAL, KONSEKANS, OSWA PINITIF, OSWA NENPÒT PÈT DONE, PWOFI, OSWA OPÒTINITE KI SÒTI NAN ITILIZASYON OU FÈ SIT LA. RESPONSABLITE TOTAL NOU POU NENPÒT RECLAMASYON KI GEN RAPÒ AK SIT LA LIMITE A SENKANT DOLA AMERIKEN (US $50).",
        },
        {
          heading: "Endamnizasyon",
          body: "Ou dakò pou endamnize nou e kenbe nou alabri de reklamasyon ki soti nan move itilizasyon ou fè Sit la oswa vyolasyon Kondisyon sa yo.",
        },
        {
          heading: "Chanjman",
          body: "Nou ka mete Sit la ak Kondisyon sa yo ajou. Kontinye itilize apre chanjman yo vle di aksepte yo. Nou ka sispann oswa sispann Sit la nenpòt lè.",
        },
        {
          heading: "Kontak",
          body: `Kesyon sou Kondisyon sa yo: ${CONTACT_EMAIL}.`,
        },
      ],
      fr: [
        {
          heading: "Accord",
          body: "En utilisant https://uscivics-quiz.com (le « Site »), vous acceptez les présentes Conditions d'utilisation. Si vous n'êtes pas d'accord, n'utilisez pas le Site. Dernière mise à jour : 4 août 2026.",
        },
        {
          heading: "Ce qu'est le Site",
          body: "USCivics Quiz fournit des outils de pratique éducatifs liés à l'examen de civisme et d'anglais pour la naturalisation américaine. Il s'agit d'une aide à l'étude indépendante, ni un site gouvernemental ni un cabinet d'avocats.",
        },
        {
          heading: "Aucune affiliation",
          body: "Le Site n'est affilié, approuvé ni parrainé par l'USCIS, le DHS, ni aucune agence gouvernementale américaine. Les noms et marques de tiers ne sont mentionnés qu'à des fins d'identification et d'étude.",
        },
        {
          heading: "Ce n'est pas un conseil juridique",
          body: "Le contenu du Site est fourni uniquement à des fins éducatives générales et ne constitue pas un conseil juridique. Les résultats en matière d'immigration dépendent de votre situation et du droit/de la politique en vigueur. Consultez des sources officielles ou un avocat qualifié pour un conseil concernant votre dossier.",
        },
        {
          heading: "Exactitude du contenu d'étude",
          body: "Nous nous efforçons de maintenir à jour les questions de pratique et les informations sur les élus, y compris via des mises à jour automatisées lorsque possible. Les documents gouvernementaux et les élections peuvent changer. Il vous incombe de vérifier les réponses et les règles avant votre entretien.",
        },
        {
          heading: "Utilisation acceptable",
          body: "Vous acceptez de ne pas faire un usage abusif du Site : ne pas tenter de compromettre la sécurité, ne pas effectuer d'extraction de données (scraping) nuisant à la disponibilité du service, ne pas procéder à de l'ingénierie inverse au-delà de ce que la loi autorise, ne pas envoyer de spam, ni utiliser le Site à des fins illégales.",
        },
        {
          heading: "Comptes et données locales",
          body: "Aucun compte n'est requis. La progression locale stockée dans votre navigateur peut être perdue si vous effacez les données ou changez d'appareil. Nous ne sommes pas responsables de la perte de progression locale.",
        },
        {
          heading: "Publicité et tiers",
          body: "Le Site peut afficher des publicités tierces et créer des liens vers des services tiers. Nous ne sommes pas responsables du contenu, des pratiques de confidentialité ou de la disponibilité des tiers.",
        },
        {
          heading: "Propriété intellectuelle",
          body: "La conception du Site, l'image de marque et les documents originaux nous appartiennent ou appartiennent à nos concédants de licence. Le texte officiel des questions de l'USCIS est utilisé à des fins de pratique éducative sur la base de documents d'étude accessibles au public. Vous ne pouvez pas copier le Site dans son intégralité à des fins de redistribution commerciale sans autorisation.",
        },
        {
          heading: "Exclusion de garanties",
          body: "LE SITE EST FOURNI « EN L'ÉTAT » ET « SELON DISPONIBILITÉ » SANS GARANTIE D'AUCUNE SORTE, EXPRESSE OU IMPLICITE, Y COMPRIS LES GARANTIES DE QUALITÉ MARCHANDE, D'ADÉQUATION À UN USAGE PARTICULIER ET D'ABSENCE DE CONTREFAÇON. Nous ne garantissons pas que la pratique garantira la réussite de l'entretien.",
        },
        {
          heading: "Limitation de responsabilité",
          body: "DANS TOUTE LA MESURE PERMISE PAR LA LOI, NOUS NE SOMMES PAS RESPONSABLES DES DOMMAGES INDIRECTS, ACCESSOIRES, SPÉCIAUX, CONSÉCUTIFS OU PUNITIFS, NI DE TOUTE PERTE DE DONNÉES, DE PROFITS OU D'OPPORTUNITÉS DÉCOULANT DE VOTRE UTILISATION DU SITE. NOTRE RESPONSABILITÉ TOTALE POUR TOUTE RÉCLAMATION LIÉE AU SITE EST LIMITÉE À CINQUANTE DOLLARS AMÉRICAINS (US $50).",
        },
        {
          heading: "Indemnisation",
          body: "Vous acceptez de nous indemniser et de nous tenir indemnes de toute réclamation découlant de votre usage abusif du Site ou de votre violation des présentes Conditions.",
        },
        {
          heading: "Modifications",
          body: "Nous pouvons mettre à jour le Site et les présentes Conditions. La poursuite de l'utilisation après modification vaut acceptation. Nous pouvons suspendre ou interrompre le Site à tout moment.",
        },
        {
          heading: "Contact",
          body: `Questions concernant les présentes Conditions : ${CONTACT_EMAIL}.`,
        },
      ],
    },
  },
];

export const CONTACT_EMAIL_EXPORT = CONTACT_EMAIL;

export function getSitePage(slug: string): SitePage | undefined {
  return SITE_PAGES.find((p) => p.slug === slug);
}

export function pageCopy(page: SitePage, locale: Locale) {
  return {
    title: page.title[locale] ?? page.title.en,
    description: page.description[locale] ?? page.description.en,
    sections: page.sections[locale] ?? page.sections.en,
  };
}
