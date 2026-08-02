import type { Locale } from "@/lib/types";

export const CONSENT_KEY = "uscivics-cookie-consent";
export type ConsentChoice = "all" | "essential";

export function readConsent(): ConsentChoice | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    if (v === "all" || v === "essential") return v;
  } catch {
    // ignore
  }
  return null;
}

export function writeConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // ignore
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("uscivics-consent", { detail: choice })
    );
  }
}

export function monetagScriptAttrs() {
  return {
    src: "https://quge5.com/88/tag.min.js",
    "data-zone": "266272",
    async: true,
    "data-cfasync": "false",
  } as const;
}

/** Inject Monetag Multitag once after marketing consent. */
export function loadMonetagIfNeeded() {
  if (typeof document === "undefined") return;
  if (document.getElementById("monetag-multitag")) return;
  const s = document.createElement("script");
  s.id = "monetag-multitag";
  s.src = "https://quge5.com/88/tag.min.js";
  s.async = true;
  s.setAttribute("data-zone", "266272");
  s.setAttribute("data-cfasync", "false");
  document.head.appendChild(s);
}

export type ConsentCopy = {
  title: string;
  body: string;
  accept: string;
  reject: string;
  privacy: string;
  manage: string;
};

export const CONSENT_COPY: Record<Locale, ConsentCopy> = {
  en: {
    title: "Cookies & ads",
    body: "We use essential cookies to run the site, and optional analytics/advertising cookies (including Monetag and Firebase) to keep practice free. Choose Accept all or Essential only. See Privacy for details.",
    accept: "Accept all",
    reject: "Essential only",
    privacy: "Privacy Policy",
    manage: "Cookie settings",
  },
  es: {
    title: "Cookies y anuncios",
    body: "Usamos cookies esenciales para el sitio y, si aceptás, cookies de analítica/publicidad (Monetag y Firebase) para mantener la práctica gratis. Elegí Aceptar todo o Solo esenciales. Ver Privacidad.",
    accept: "Aceptar todo",
    reject: "Solo esenciales",
    privacy: "Privacidad",
    manage: "Configurar cookies",
  },
  zh: {
    title: "Cookie 与广告",
    body: "我们使用必要 Cookie 运行网站；若您同意，还将使用分析/广告 Cookie（含 Monetag 与 Firebase）以保持免费练习。请选择全部接受或仅必要。详见隐私政策。",
    accept: "全部接受",
    reject: "仅必要",
    privacy: "隐私政策",
    manage: "Cookie 设置",
  },
  vi: {
    title: "Cookie & quảng cáo",
    body: "Chúng tôi dùng cookie thiết yếu để chạy trang; nếu bạn đồng ý, cookie phân tích/quảng cáo (Monetag, Firebase) giúp giữ luyện tập miễn phí. Chọn Chấp nhận tất cả hoặc Chỉ thiết yếu. Xem Chính sách quyền riêng tư.",
    accept: "Chấp nhận tất cả",
    reject: "Chỉ thiết yếu",
    privacy: "Quyền riêng tư",
    manage: "Cài đặt cookie",
  },
  tl: {
    title: "Cookies at ads",
    body: "Gumagamit kami ng essential cookies para sa site; kung papayag ka, analytics/advertising cookies (Monetag, Firebase) para manatiling libre ang practice. Piliin ang Accept all o Essential only. Tingnan ang Privacy.",
    accept: "Accept all",
    reject: "Essential only",
    privacy: "Privacy",
    manage: "Cookie settings",
  },
  ar: {
    title: "ملفات تعريف الارتباط والإعلانات",
    body: "نستخدم ملفات أساسية لتشغيل الموقع، واختياريًا ملفات تحليلات/إعلانات (بما فيها Monetag وFirebase) لإبقاء التمرين مجانيًا. اختر قبول الكل أو الأساسية فقط. راجع سياسة الخصوصية.",
    accept: "قبول الكل",
    reject: "الأساسية فقط",
    privacy: "الخصوصية",
    manage: "إعدادات ملفات الارتباط",
  },
  ko: {
    title: "쿠키 및 광고",
    body: "사이트 운영에 필수 쿠키를 사용하며, 동의 시 분석/광고 쿠키(Monetag, Firebase)로 무료 연습을 유지합니다. 모두 허용 또는 필수만 선택하세요. 개인정보 처리방침을 확인하세요.",
    accept: "모두 허용",
    reject: "필수만",
    privacy: "개인정보",
    manage: "쿠키 설정",
  },
  hi: {
    title: "कुकीज़ और विज्ञापन",
    body: "हम साइट चलाने के लिए आवश्यक कुकीज़ उपयोग करते हैं; सहमति पर विश्लेषण/विज्ञापन कुकीज़ (Monetag, Firebase) मुफ़्त अभ्यास बनाए रखने में मदद करती हैं। सभी स्वीकार करें या केवल आवश्यक चुनें। गोपनीयता देखें।",
    accept: "सभी स्वीकार करें",
    reject: "केवल आवश्यक",
    privacy: "गोपनीयता",
    manage: "कुकी सेटिंग्स",
  },
  ru: {
    title: "Файлы cookie и реклама",
    body: "Мы используем необходимые cookie для работы сайта и, при согласии, аналитику/рекламу (Monetag, Firebase), чтобы практика оставалась бесплатной. Выберите «Принять все» или «Только необходимые». См. Политику конфиденциальности.",
    accept: "Принять все",
    reject: "Только необходимые",
    privacy: "Конфиденциальность",
    manage: "Настройки cookie",
  },
  ht: {
    title: "Cookie ak piblisite",
    body: "Nou itilize cookie esansyèl pou sit la; si ou dakò, cookie analiz/piblisite (Monetag, Firebase) ede kenbe pratik gratis. Chwazi Aksepte tout oswa Esansyèl sèlman. Gade Konfidansyalite.",
    accept: "Aksepte tout",
    reject: "Esansyèl sèlman",
    privacy: "Konfidansyalite",
    manage: "Paramèt cookie",
  },
  fr: {
    title: "Cookies et publicité",
    body: "Nous utilisons des cookies essentiels pour le site et, avec votre accord, des cookies d’analyse/publicité (Monetag, Firebase) pour garder la pratique gratuite. Choisissez Tout accepter ou Essentiels seulement. Voir la Confidentialité.",
    accept: "Tout accepter",
    reject: "Essentiels seulement",
    privacy: "Confidentialité",
    manage: "Paramètres cookies",
  },
};
