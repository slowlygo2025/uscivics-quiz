import { readFileSync, writeFileSync } from "node:fs";

const p = "src/lib/site-pages.ts";
let s = readFileSync(p, "utf8");

const reps = [
  [
    "Compartimos datos con proveedores que ayudan a operar el sitio (hosting como Vercel, analítica, publicidad y monitoreo de errores como Sentry).",
    "Compartimos datos con proveedores que ayudan a operar el sitio (hosting como Vercel; Firebase Authentication/Firestore y Analytics; envío de email como Resend; publicidad si está habilitada; y monitoreo de errores como Sentry).",
  ],
  [
    "我们会与协助我们运营网站的服务提供商（例如 Vercel 等托管服务、分析和广告服务）共享数据。",
    "我们会与协助运营网站的服务提供商共享数据（例如 Vercel 托管；Firebase Authentication/Firestore 与 Analytics；Resend 邮件投递；启用时的广告；以及 Sentry 等错误监控）。",
  ],
  [
    "Chúng tôi chia sẻ dữ liệu với các nhà cung cấp dịch vụ giúp vận hành trang web (lưu trữ như Vercel, phân tích, quảng cáo).",
    "Chúng tôi chia sẻ dữ liệu với các nhà cung cấp giúp vận hành trang (hosting như Vercel; Firebase Authentication/Firestore và Analytics; gửi email như Resend; quảng cáo khi bật; và giám sát lỗi như Sentry).",
  ],
  [
    "Ibinabahagi namin ang datos sa mga service provider na tumutulong magpatakbo ng site (hosting tulad ng Vercel, analytics, advertising).",
    "Ibinabahagi namin ang datos sa mga service provider (hosting tulad ng Vercel; Firebase Authentication/Firestore at Analytics; email tulad ng Resend; advertising kung naka-enable; at error monitoring tulad ng Sentry).",
  ],
  [
    "نشارك البيانات مع مزودي الخدمات الذين يساعدوننا في تشغيل الموقع (الاستضافة مثل Vercel، والتحليلات، والإعلانات).",
    "نشارك البيانات مع مزودي الخدمات الذين يساعدوننا في تشغيل الموقع (الاستضافة مثل Vercel؛ وFirebase Authentication/Firestore وAnalytics؛ وتسليم البريد مثل Resend؛ والإعلانات عند التفعيل؛ ومراقبة الأخطاء مثل Sentry).",
  ],
  [
    "저희는 사이트 운영을 돕는 서비스 제공업체(Vercel과 같은 호스팅, 분석, 광고)와 데이터를 공유합니다.",
    "저희는 사이트 운영을 돕는 서비스 제공업체와 데이터를 공유합니다(Vercel 호스팅; Firebase Authentication/Firestore 및 Analytics; Resend 이메일; 활성화 시 광고; Sentry 오류 모니터링).",
  ],
  [
    "हम उन सेवा प्रदाताओं के साथ डेटा साझा करते हैं जो साइट चलाने में हमारी मदद करते हैं (Vercel जैसी होस्टिंग, एनालिटिक्स, विज्ञापन)।",
    "हम उन सेवा प्रदाताओं के साथ डेटा साझा करते हैं जो साइट चलाते हैं (Vercel होस्टिंग; Firebase Authentication/Firestore और Analytics; Resend ईमेल; सक्षम होने पर विज्ञापन; और Sentry त्रुटि निगरानी)।",
  ],
  [
    "Мы передаём данные поставщикам услуг, которые помогают нам управлять сайтом (хостинг, например Vercel, аналитика, реклама).",
    "Мы передаём данные поставщикам, которые помогают управлять сайтом (хостинг Vercel; Firebase Authentication/Firestore и Analytics; доставка почты Resend; реклама при включении; мониторинг ошибок Sentry).",
  ],
  [
    "Nou pataje done ak founisè sèvis ki ede nou fè sit la fonksyone (ebèjman tankou Vercel, analiz, piblisite).",
    "Nou pataje done ak founisè sèvis ki ede sit la (ebèjman Vercel; Firebase Authentication/Firestore ak Analytics; imel Resend; piblisite lè aktif; ak siveyans erè Sentry).",
  ],
  [
    "Nous partageons des données avec des prestataires de services qui nous aident à exploiter le site (hébergement comme Vercel, analytique, publicité).",
    "Nous partageons des données avec des prestataires qui aident à exploiter le site (hébergement Vercel ; Firebase Authentication/Firestore et Analytics ; envoi d'e-mails Resend ; publicité si activée ; surveillance d'erreurs Sentry).",
  ],
];

let n = 0;
for (const [a, b] of reps) {
  if (!s.includes(a)) {
    console.log("MISS", a.slice(0, 70));
    continue;
  }
  s = s.replace(a, b);
  n++;
}
writeFileSync(p, s);
console.log("replaced", n);
