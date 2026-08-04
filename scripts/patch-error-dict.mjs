import fs from "fs";
import path from "path";

const root = "src/lib/dict";
const extras = {
  es: {
    errorPageTitle: "Algo salió mal",
    errorPageLead:
      "Registramos el error para poder corregirlo. Podés reintentar o volver al inicio.",
    errorPageRetry: "Reintentar",
    errorPageHome: "Volver al inicio",
    notFoundTitle: "Página no encontrada",
    notFoundLead:
      "Ese enlace no coincide con una página de USCivics Quiz. Revisá la URL o seguí estudiando desde el inicio.",
    notFoundHome: "Volver al inicio",
  },
  zh: {
    errorPageTitle: "出错了",
    errorPageLead: "我们已记录该错误以便修复。您可以重试或返回首页。",
    errorPageRetry: "重试",
    errorPageHome: "返回首页",
    notFoundTitle: "页面未找到",
    notFoundLead: "该链接在 USCivics Quiz 上不存在。请检查网址，或从首页继续学习。",
    notFoundHome: "返回首页",
  },
  vi: {
    errorPageTitle: "Đã xảy ra lỗi",
    errorPageLead:
      "Chúng tôi đã ghi nhận lỗi để sửa. Bạn có thể thử lại hoặc về trang chủ.",
    errorPageRetry: "Thử lại",
    errorPageHome: "Về trang chủ",
    notFoundTitle: "Không tìm thấy trang",
    notFoundLead:
      "Liên kết này không khớp trang nào trên USCivics Quiz. Kiểm tra URL hoặc tiếp tục học từ trang chủ.",
    notFoundHome: "Về trang chủ",
  },
  tl: {
    errorPageTitle: "May nangyaring mali",
    errorPageLead:
      "Naitala namin ang error para maayos. Maaari mong subukan ulit o bumalik sa home.",
    errorPageRetry: "Subukan ulit",
    errorPageHome: "Bumalik sa home",
    notFoundTitle: "Hindi nahanap ang page",
    notFoundLead:
      "Hindi tumutugma ang link na iyon sa page sa USCivics Quiz. Suriin ang URL o magpatuloy sa home.",
    notFoundHome: "Bumalik sa home",
  },
  ar: {
    errorPageTitle: "حدث خطأ ما",
    errorPageLead:
      "سجّلنا الخطأ لإصلاحه. يمكنك المحاولة مجدداً أو العودة إلى الصفحة الرئيسية.",
    errorPageRetry: "حاول مجدداً",
    errorPageHome: "العودة للرئيسية",
    notFoundTitle: "الصفحة غير موجودة",
    notFoundLead:
      "هذا الرابط لا يطابق صفحة على USCivics Quiz. تحقق من العنوان أو تابع الدراسة من الصفحة الرئيسية.",
    notFoundHome: "العودة للرئيسية",
  },
  ko: {
    errorPageTitle: "문제가 발생했습니다",
    errorPageLead:
      "수정을 위해 오류를 기록했습니다. 다시 시도하거나 홈으로 돌아갈 수 있습니다.",
    errorPageRetry: "다시 시도",
    errorPageHome: "홈으로",
    notFoundTitle: "페이지를 찾을 수 없습니다",
    notFoundLead:
      "해당 링크는 USCivics Quiz의 페이지와 일치하지 않습니다. URL을 확인하거나 홈에서 학습을 이어가세요.",
    notFoundHome: "홈으로",
  },
  hi: {
    errorPageTitle: "कुछ गलत हो गया",
    errorPageLead:
      "हमने सुधार के लिए त्रुटि दर्ज की। आप फिर कोशिश कर सकते हैं या होम पर जा सकते हैं।",
    errorPageRetry: "फिर कोशिश करें",
    errorPageHome: "होम पर जाएँ",
    notFoundTitle: "पृष्ठ नहीं मिला",
    notFoundLead:
      "वह लिंक USCivics Quiz के किसी पृष्ठ से मेल नहीं खाता। URL जाँचें या होम से पढ़ाई जारी रखें।",
    notFoundHome: "होम पर जाएँ",
  },
  ru: {
    errorPageTitle: "Что-то пошло не так",
    errorPageLead:
      "Мы зафиксировали ошибку, чтобы исправить её. Можно повторить попытку или вернуться на главную.",
    errorPageRetry: "Повторить",
    errorPageHome: "На главную",
    notFoundTitle: "Страница не найдена",
    notFoundLead:
      "Эта ссылка не соответствует странице USCivics Quiz. Проверьте URL или продолжите учёбу с главной.",
    notFoundHome: "На главную",
  },
  ht: {
    errorPageTitle: "Yon bagay mal pase",
    errorPageLead:
      "Nou anrejistre erè a pou nou ka korije li. Ou ka eseye ankò oswa tounen lakay.",
    errorPageRetry: "Eseye ankò",
    errorPageHome: "Tounen lakay",
    notFoundTitle: "Paj pa jwenn",
    notFoundLead:
      "Lyen sa a pa matche ak yon paj sou USCivics Quiz. Verifye URL la oswa kontinye etidye depi lakay.",
    notFoundHome: "Tounen lakay",
  },
  fr: {
    errorPageTitle: "Une erreur s’est produite",
    errorPageLead:
      "Nous avons enregistré l’erreur pour la corriger. Vous pouvez réessayer ou revenir à l’accueil.",
    errorPageRetry: "Réessayer",
    errorPageHome: "Retour à l’accueil",
    notFoundTitle: "Page introuvable",
    notFoundLead:
      "Ce lien ne correspond à aucune page sur USCivics Quiz. Vérifiez l’URL ou continuez depuis l’accueil.",
    notFoundHome: "Retour à l’accueil",
  },
};

for (const [locale, strings] of Object.entries(extras)) {
  const file = path.join(root, `${locale}.ts`);
  let src = fs.readFileSync(file, "utf8");
  if (src.includes("errorPageTitle:")) {
    console.log("skip", locale);
    continue;
  }
  const anchor = "premiumWaitlistDone:";
  const a = src.indexOf(anchor);
  if (a < 0) throw new Error("no waitlist in " + locale);
  const lineEnd = src.indexOf("\n", a);
  const insert =
    "\n" +
    Object.entries(strings)
      .map(([k, v]) => `  ${k}: ${JSON.stringify(v)},`)
      .join("\n");
  src = src.slice(0, lineEnd + 1) + insert + src.slice(lineEnd + 1);
  fs.writeFileSync(file, src);
  console.log("patched", locale);
}
