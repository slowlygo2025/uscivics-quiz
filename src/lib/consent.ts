import type { Locale } from "@/lib/types";

export const CONSENT_KEY = "uscivics-cookie-consent";
export type ConsentChoice = "all" | "essential";

/** Multitag zone that bundles Push / Vignette / In-Page Push / Popunder (Excited MULTI). */
export const MONETAG_MULTITAG_ZONE = "266272";

/**
 * Monetag Multitag is OFF unless explicitly enabled.
 * Keep disabled while Google Ads Search + trust/CPA are the priority —
 * the Multitag fires popunder/push/vignette which hurt landing experience.
 *
 * Enable later: Vercel env `NEXT_PUBLIC_MONETAG_ENABLED=true` + redeploy.
 * Verification meta in root layout stays (does not load ads).
 */
export function isMonetagEnabled(): boolean {
  const v = process.env.NEXT_PUBLIC_MONETAG_ENABLED?.trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

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
    "data-zone": MONETAG_MULTITAG_ZONE,
    async: true,
    "data-cfasync": "false",
  } as const;
}

/**
 * Inject Monetag Multitag once after marketing consent — only when enabled.
 * Returns whether a script was injected.
 */
export function loadMonetagIfNeeded(): boolean {
  if (typeof document === "undefined") return false;
  if (!isMonetagEnabled()) return false;
  if (document.getElementById("monetag-multitag")) return false;
  const s = document.createElement("script");
  s.id = "monetag-multitag";
  s.src = "https://quge5.com/88/tag.min.js";
  s.async = true;
  s.setAttribute("data-zone", MONETAG_MULTITAG_ZONE);
  s.setAttribute("data-cfasync", "false");
  document.head.appendChild(s);
  return true;
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
    body: "We use essential cookies to run the site, and optional analytics cookies (Firebase) when you Accept all. Third-party display ads stay off unless we explicitly re-enable them. See Privacy for details.",
    accept: "Accept all",
    reject: "Essential only",
    privacy: "Privacy Policy",
    manage: "Cookie settings",
  },
  es: {
    title: "Cookies y anuncios",
    body: "Usamos cookies esenciales para el sitio y, si aceptás, cookies de analítica (Firebase). Los anuncios display de terceros están desactivados salvo que los reactivemos. Ver Privacidad.",
    accept: "Aceptar todo",
    reject: "Solo esenciales",
    privacy: "Privacidad",
    manage: "Configurar cookies",
  },
  zh: {
    title: "Cookie 与广告",
    body: "我们使用必要 Cookie 运行网站；若您同意，将使用分析 Cookie（Firebase）。第三方展示广告默认关闭，除非我们明确重新启用。详见隐私政策。",
    accept: "全部接受",
    reject: "仅必要",
    privacy: "隐私政策",
    manage: "Cookie 设置",
  },
  vi: {
    title: "Cookie & quảng cáo",
    body: "Chúng tôi dùng cookie thiết yếu để chạy trang; nếu bạn đồng ý, cookie phân tích (Firebase). Quảng cáo display bên thứ ba đang tắt trừ khi chúng tôi bật lại. Xem Chính sách quyền riêng tư.",
    accept: "Chấp nhận tất cả",
    reject: "Chỉ thiết yếu",
    privacy: "Quyền riêng tư",
    manage: "Cài đặt cookie",
  },
  tl: {
    title: "Cookies at ads",
    body: "Gumagamit kami ng essential cookies para sa site; kung papayag ka, analytics cookies (Firebase). Naka-off ang third-party display ads maliban kung muling i-enable. Tingnan ang Privacy.",
    accept: "Accept all",
    reject: "Essential only",
    privacy: "Privacy",
    manage: "Cookie settings",
  },
  ar: {
    title: "ملفات تعريف الارتباط والإعلانات",
    body: "نستخدم ملفات أساسية لتشغيل الموقع، واختياريًا ملفات التحليلات (Firebase) عند قبول الكل. إعلانات العرض من جهات خارجية متوقفة ما لم نُعد تفعيلها. راجع سياسة الخصوصية.",
    accept: "قبول الكل",
    reject: "الأساسية فقط",
    privacy: "الخصوصية",
    manage: "إعدادات ملفات تعريف الارتباط",
  },
  ko: {
    title: "쿠키 및 광고",
    body: "사이트 운영에 필수 쿠키를 사용하며, 동의 시 분석 쿠키(Firebase)를 사용합니다. 제3자 디스플레이 광고는 명시적으로 다시 켜기 전까지 꺼져 있습니다. 개인정보 처리방침을 확인하세요.",
    accept: "모두 허용",
    reject: "필수만",
    privacy: "개인정보",
    manage: "쿠키 설정",
  },
  hi: {
    title: "कुकीज़ और विज्ञापन",
    body: "हम साइट चलाने के लिए आवश्यक कुकीज़ उपयोग करते हैं; सहमति पर विश्लेषण कुकीज़ (Firebase)। तृतीय-पक्ष डिस्प्ले विज्ञापन तब तक बंद हैं जब तक हम उन्हें फिर से सक्षम न करें। गोपनीयता देखें।",
    accept: "सभी स्वीकार करें",
    reject: "केवल आवश्यक",
    privacy: "गोपनीयता",
    manage: "कुकी सेटिंग्स",
  },
  ru: {
    title: "Файлы cookie и реклама",
    body: "Мы используем необходимые cookie для работы сайта и, при согласии, аналитику (Firebase). Сторонние display-объявления отключены, пока мы их явно не включим. См. Политику конфиденциальности.",
    accept: "Принять все",
    reject: "Только необходимые",
    privacy: "Конфиденциальность",
    manage: "Настройки cookie",
  },
  ht: {
    title: "Cookie ak piblisite",
    body: "Nou itilize cookie esansyèl pou sit la; si ou dakò, cookie analiz (Firebase). Piblisite display twazyèm pati yo etenn sof si nou aktive yo ankò. Gade Konfidansyalite.",
    accept: "Aksepte tout",
    reject: "Esansyèl sèlman",
    privacy: "Konfidansyalite",
    manage: "Paramèt cookie",
  },
  fr: {
    title: "Cookies et publicité",
    body: "Nous utilisons des cookies essentiels pour le site et, avec votre accord, des cookies d’analyse (Firebase). Les publicités display tierces restent désactivées sauf réactivation explicite. Voir la Confidentialité.",
    accept: "Tout accepter",
    reject: "Essentiels seulement",
    privacy: "Confidentialité",
    manage: "Paramètres cookies",
  },
};
