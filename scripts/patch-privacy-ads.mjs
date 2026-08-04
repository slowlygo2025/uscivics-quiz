import fs from "fs";

const path = "src/lib/site-pages.ts";
let s = fs.readFileSync(path, "utf8");

const adsBodies = {
  es: "La publicidad display de terceros (por ejemplo Monetag) está controlada por una bandera del sitio y actualmente está desactivada mientras priorizamos la calidad de landing de Google Ads Search. Si se reactiva, los anuncios se cargan solo tras Aceptar todo en el banner de cookies. Elegir Solo esenciales nunca carga scripts de publicidad. Las prácticas de los socios se rigen por sus propias políticas.",
  zh: "可选的第三方展示广告（例如 Monetag）由站点开关控制，目前已关闭，以便优先保证 Google Ads Search 落地页质量。若重新启用，广告仅在 Cookie 横幅中选择“全部接受”后加载。选择“仅必要”绝不会加载广告脚本。广告合作伙伴的做法受其自身政策约束。",
  vi: "Quảng cáo hiển thị bên thứ ba tùy chọn (ví dụ Monetag) được kiểm soát bằng cờ cấu hình và hiện đang tắt để ưu tiên chất lượng trang đích Google Ads Search. Nếu bật lại, quảng cáo chỉ tải sau khi chọn Chấp nhận tất cả trên banner cookie. Chọn Chỉ thiết yếu không bao giờ tải script quảng cáo. Thực tiễn của đối tác quảng cáo do chính sách của họ quy định.",
  tl: "Opsyonal na third-party display advertising (hal. Monetag) ay kontrolado ng site flag at kasalukuyang naka-off habang inuuna namin ang kalidad ng Google Ads Search landing. Kung i-enable ulit, maglo-load lang ang ads pagkatapos ng Tanggapin lahat sa cookie banner. Ang Mahahalaga lamang ay hindi kailanman maglo-load ng advertising scripts. Ang mga gawi ng ad partners ay nasa ilalim ng sarili nilang patakaran.",
  ar: "الإعلانات العرضية الاختيارية من أطراف ثالثة (مثل Monetag) تُتحكم بعلامة في الموقع وهي متوقفة حالياً بينما نعطي الأولوية لجودة صفحات هبوط Google Ads Search. إذا أُعيد تفعيلها، تُحمَّل الإعلانات فقط بعد اختيار «قبول الكل» في شريط ملفات تعريف الارتباط. اختيار «الأساسيات فقط» لا يحمّل أبداً نصوص الإعلانات. تخضع ممارسات الشركاء لسياساتهم الخاصة.",
  ko: "선택적 제3자 디스플레이 광고(예: Monetag)는 사이트 플래그로 제어되며, Google Ads Search 랜딩 품질을 우선하기 위해 현재 꺼져 있습니다. 다시 켜면 쿠키 배너에서 ‘전체 동의’ 이후에만 광고가 로드됩니다. ‘필수만 허용’은 광고 스크립트를 절대 로드하지 않습니다. 광고 파트너의 관행은 자체 정책을 따릅니다.",
  hi: "वैकल्पिक तृतीय-पक्ष डिस्प्ले विज्ञापन (जैसे Monetag) साइट फ़्लैग से नियंत्रित हैं और Google Ads Search लैंडिंग गुणवत्ता को प्राथमिकता देते हुए वर्तमान में बंद हैं। फिर से चालू होने पर विज्ञापन कुकी बैनर पर सभी स्वीकार करें के बाद ही लोड होते हैं। केवल आवश्यक चुनने पर विज्ञापन स्क्रिप्ट कभी लोड नहीं होतीं। साझेदारों की प्रथाएँ उनकी अपनी नीतियों के अधीन हैं।",
  ru: "Опциональная сторонняя display-реклама (например Monetag) управляется флагом сайта и сейчас выключена, пока мы приоритезируем качество посадочных страниц Google Ads Search. Если снова включить, реклама загружается только после «Принять все» в баннере cookie. Выбор «Только необходимое» никогда не загружает рекламные скрипты. Практика партнёров регулируется их собственными политиками.",
  ht: "Piblisite display opsyonèl twazyèm pati (pa egzanp Monetag) kontwole pa yon drapo sit epi li koupe kounye a pandan n ap priyorize kalite landing Google Ads Search. Si yo reactive li, piblisite yo chaje sèlman apre Aksepte tout sou bannyè cookie. Chwazi Sèlman esansyèl pa janm chaje script piblisite. Pratik patnè yo gouvène pa pwòp règleman pa yo.",
  fr: "La publicité display tierce optionnelle (par exemple Monetag) est contrôlée par un indicateur du site et est actuellement désactivée pendant que nous priorisons la qualité des pages d’atterrissage Google Ads Search. Si elle est réactivée, les publicités ne se chargent qu’après Tout accepter sur la bannière de cookies. Choisir Essentiels uniquement ne charge jamais les scripts publicitaires. Les pratiques des partenaires sont régies par leurs propres politiques.",
};

const cookiesEs =
  "Usamos cookies o almacenamiento similar para lo esencial (por ejemplo idioma), para analítica cuando aceptás todo, y para publicidad solo si se reactiva como se describe arriba. En la primera visita mostramos un banner para Aceptar todo (analítica; anuncios solo si la publicidad está habilitada) o Solo esenciales. Podés reabrir Configurar cookies en cualquier momento. También podés controlar cookies en el navegador; desactivar algunas puede afectar funciones.";

/** Replace body that follows a given advertising heading (next `body:` string). */
function replaceBodyAfterHeading(source, heading, newBody) {
  const needle = `heading: "${heading}"`;
  const idx = source.indexOf(needle);
  if (idx < 0) {
    console.log("heading missing:", heading);
    return source;
  }
  const bodyKey = 'body: "';
  const bodyStart = source.indexOf(bodyKey, idx);
  if (bodyStart < 0) {
    console.log("body missing after", heading);
    return source;
  }
  const contentStart = bodyStart + bodyKey.length;
  let i = contentStart;
  while (i < source.length) {
    if (source[i] === "\\" ) {
      i += 2;
      continue;
    }
    if (source[i] === '"') break;
    i++;
  }
  const oldBody = source.slice(contentStart, i);
  console.log("ok", heading, "→", newBody.slice(0, 40) + "…");
  return source.slice(0, contentStart) + newBody + source.slice(i);
}

const headingMap = [
  ["Publicidad", adsBodies.es],
  ["广告", adsBodies.zh],
  ["Quảng cáo", adsBodies.vi],
  // tl reuses English heading "Advertising" — handle carefully (second privacy Advertising after EN)
];

// Privacy page locale order in file: en, es, zh, vi, tl, ar, ko, hi, ru, ht, fr
// For tl heading is "Advertising" — first Advertising is EN privacy, then later ones...
// Safer approach: walk privacy sections by locale keys.

const privacyAdsHeadingsInOrder = [
  ["Advertising", null], // en — already correct; skip first
  ["Publicidad", adsBodies.es],
  ["广告", adsBodies.zh],
  ["Quảng cáo", adsBodies.vi],
  ["Advertising", adsBodies.tl], // tl
  ["الإعلانات", adsBodies.ar],
  ["광고", adsBodies.ko],
  ["विज्ञापन", adsBodies.hi],
  ["Реклама", adsBodies.ru],
  ["Piblisite", adsBodies.ht],
  ["Publicité", adsBodies.fr],
];

let from = 0;
let skipFirstAdvertising = true;
for (const [heading, body] of privacyAdsHeadingsInOrder) {
  const needle = `heading: "${heading}"`;
  let idx = s.indexOf(needle, from);
  if (heading === "Advertising" && skipFirstAdvertising) {
    // EN advertising — leave body, advance past it
    skipFirstAdvertising = false;
    from = idx + needle.length;
    continue;
  }
  if (idx < 0) {
    console.log("FAIL find", heading, "from", from);
    continue;
  }
  if (!body) {
    from = idx + needle.length;
    continue;
  }
  const before = s.slice(0, idx);
  const afterStart = s.slice(idx);
  const patchedAfter = replaceBodyAfterHeading(afterStart, heading, body);
  // replaceBodyAfterHeading searches from start of afterStart — heading at 0
  s = before + patchedAfter;
  from = idx + 20;
}

// EN how-we-use + cookies
s = s.replace(
  "We use information to provide study tools, remember preferences, measure performance, prevent abuse, communicate when you contact us, and show ads that help keep the service free.",
  "We use information to provide study tools, remember preferences, measure performance, prevent abuse, communicate when you contact us, and — if third-party display ads are re-enabled — to show advertising that helps keep the service free."
);
s = s.replace(
  "We use cookies or similar storage for essentials such as language preference, and for analytics/advertising as described above. On first visit we show a cookie banner so you can Accept all (ads + analytics) or Essential only. You can reopen Cookie settings anytime from the floating control. You can also control cookies through your browser settings; disabling some cookies may affect features.",
  "We use cookies or similar storage for essentials such as language preference, for analytics when you Accept all, and for advertising only if display ads are re-enabled as described above. On first visit we show a cookie banner so you can Accept all (analytics; ads only if advertising is enabled) or Essential only. You can reopen Cookie settings anytime from the floating control. You can also control cookies through your browser settings; disabling some cookies may affect features."
);
s = s.replace(
  "Usamos la información para ofrecer herramientas de estudio, recordar preferencias, medir rendimiento, prevenir abuso, responder cuando nos contactás y mostrar anuncios que ayudan a mantener el servicio gratis.",
  "Usamos la información para ofrecer herramientas de estudio, recordar preferencias, medir rendimiento, prevenir abuso, responder cuando nos contactás y — si se reactivan los anuncios display de terceros — mostrar publicidad que ayuda a mantener el servicio gratis."
);
s = s.replace(
  "Usamos cookies o almacenamiento similar para lo esencial (por ejemplo idioma) y para analítica/publicidad como se describe arriba. En la primera visita mostramos un banner para Aceptar todo (anuncios + analítica) o Solo esenciales. Podés reabrir Configurar cookies en cualquier momento. También podés controlar cookies en el navegador; desactivar algunas puede afectar funciones.",
  cookiesEs
);

fs.writeFileSync(path, s);
console.log("done");
