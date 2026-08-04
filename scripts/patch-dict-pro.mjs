/**
 * Remove premiumWaitlist*; add account reset/delete keys to all dict locales.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LOCALES = ["en", "es", "zh", "vi", "tl", "ar", "ko", "hi", "ru", "ht", "fr"];
const root = join(process.cwd(), "src/lib/dict");

const EXTRA = {
  en: {
    accountResetPassword: "Reset password",
    accountResetSent: "Password reset email sent — check your inbox.",
    accountDelete: "Delete account",
    accountDeleteConfirm:
      "Delete your account and cloud progress? Local progress on this device stays until you clear site data.",
    accountDeleted: "Account deleted.",
  },
  es: {
    accountResetPassword: "Restablecer contraseña",
    accountResetSent: "Email de restablecimiento enviado — revisá tu bandeja.",
    accountDelete: "Eliminar cuenta",
    accountDeleteConfirm:
      "¿Eliminar tu cuenta y el progreso en la nube? El progreso local en este dispositivo queda hasta que borres los datos del sitio.",
    accountDeleted: "Cuenta eliminada.",
  },
  zh: {
    accountResetPassword: "重置密码",
    accountResetSent: "已发送重置邮件 — 请查收收件箱。",
    accountDelete: "删除账户",
    accountDeleteConfirm:
      "删除账户和云端进度？本设备上的本地进度会保留，直到您清除网站数据。",
    accountDeleted: "账户已删除。",
  },
  vi: {
    accountResetPassword: "Đặt lại mật khẩu",
    accountResetSent: "Đã gửi email đặt lại — kiểm tra hộp thư.",
    accountDelete: "Xóa tài khoản",
    accountDeleteConfirm:
      "Xóa tài khoản và tiến trình đám mây? Tiến trình cục bộ trên thiết bị này vẫn còn cho đến khi bạn xóa dữ liệu trang.",
    accountDeleted: "Đã xóa tài khoản.",
  },
  tl: {
    accountResetPassword: "I-reset ang password",
    accountResetSent: "Naipadala ang reset email — tingnan ang inbox.",
    accountDelete: "Burahin ang account",
    accountDeleteConfirm:
      "Burahin ang account at cloud progress? Mananatili ang local progress sa device na ito hanggang i-clear mo ang site data.",
    accountDeleted: "Nabura ang account.",
  },
  ar: {
    accountResetPassword: "إعادة تعيين كلمة المرور",
    accountResetSent: "تم إرسال بريد إعادة التعيين — تحقق من صندوق الوارد.",
    accountDelete: "حذف الحساب",
    accountDeleteConfirm:
      "حذف حسابك وتقدّم السحابة؟ يبقى التقدّم المحلي على هذا الجهاز حتى تمسح بيانات الموقع.",
    accountDeleted: "تم حذف الحساب.",
  },
  ko: {
    accountResetPassword: "비밀번호 재설정",
    accountResetSent: "재설정 이메일을 보냈습니다 — 받은편지함을 확인하세요.",
    accountDelete: "계정 삭제",
    accountDeleteConfirm:
      "계정과 클라우드 진도를 삭제할까요? 이 기기의 로컬 진도는 사이트 데이터를 지울 때까지 남습니다.",
    accountDeleted: "계정이 삭제되었습니다.",
  },
  hi: {
    accountResetPassword: "पासवर्ड रीसेट",
    accountResetSent: "रीसेट ईमेल भेजा गया — इनबॉक्स देखें।",
    accountDelete: "खाता हटाएँ",
    accountDeleteConfirm:
      "अपना खाता और क्लाउड प्रगति हटाएँ? इस डिवाइस की स्थानीय प्रगति साइट डेटा साफ़ करने तक रहेगी।",
    accountDeleted: "खाता हटा दिया गया।",
  },
  ru: {
    accountResetPassword: "Сбросить пароль",
    accountResetSent: "Письмо для сброса отправлено — проверьте почту.",
    accountDelete: "Удалить аккаунт",
    accountDeleteConfirm:
      "Удалить аккаунт и облачный прогресс? Локальный прогресс на этом устройстве останется, пока вы не очистите данные сайта.",
    accountDeleted: "Аккаунт удалён.",
  },
  ht: {
    accountResetPassword: "Reyajiste modpas",
    accountResetSent: "Imel reyajisman voye — tcheke bwat resepsyon ou.",
    accountDelete: "Efase kont",
    accountDeleteConfirm:
      "Efase kont ou ak pwogrè nwaj la? Pwogrè lokal sou aparèy sa a rete jiskaske w efase done sit la.",
    accountDeleted: "Kont efase.",
  },
  fr: {
    accountResetPassword: "Réinitialiser le mot de passe",
    accountResetSent: "E-mail de réinitialisation envoyé — vérifiez votre boîte.",
    accountDelete: "Supprimer le compte",
    accountDeleteConfirm:
      "Supprimer votre compte et la progression cloud ? La progression locale sur cet appareil reste jusqu’à ce que vous effaciez les données du site.",
    accountDeleted: "Compte supprimé.",
  },
};

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

for (const locale of LOCALES) {
  const path = join(root, `${locale}.ts`);
  let src = readFileSync(path, "utf8");

  // Drop waitlist block (single-line values)
  src = src.replace(/^\s*premiumWaitlistTitle:.*\n/gm, "");
  src = src.replace(/^\s*premiumWaitlistLead:.*\n/gm, "");
  src = src.replace(/^\s*premiumWaitlistCta:.*\n/gm, "");
  src = src.replace(/^\s*premiumWaitlistDone:.*\n/gm, "");

  const extra = EXTRA[locale];
  for (const [key, value] of Object.entries(extra)) {
    const line = `  ${key}: "${esc(value)}",\n`;
    if (new RegExp(`^\\s*${key}:`, "m").test(src)) {
      src = src.replace(new RegExp(`^\\s*${key}:.*\\n`, "m"), line);
    } else {
      // Insert after accountUnavailable (may be multi-line)
      if (/accountUnavailable:\s*"/.test(src)) {
        src = src.replace(
          /(accountUnavailable:\s*"[^"]*",\n)/,
          `$1${line}`
        );
      } else if (/accountUnavailable:\s*\n/.test(src)) {
        src = src.replace(
          /(accountUnavailable:\s*\n\s*"[^"]*",\n)/,
          `$1${line}`
        );
      } else {
        console.error("cannot find accountUnavailable in", locale);
        process.exit(1);
      }
    }
  }

  writeFileSync(path, src);
  console.log("ok", locale);
}
