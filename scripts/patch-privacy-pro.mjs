/**
 * Align privacy copy for Firebase Auth/Firestore, contact Resend, account deletion.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const sitePath = join(process.cwd(), "src/lib/site-pages.ts");
let site = readFileSync(sitePath, "utf8");

const provide = {
  en: [
    "You can use the site without creating an account. Optional cloud sync (when enabled on the deployment) uses Firebase Authentication and stores study progress associated with your account. If you email us or use the contact form, we receive the address and message content you send. Optional inputs such as a ZIP code used for officials lookup are processed to return study results and are not used to build a marketing profile.",
    "You can use the site without creating an account. Optional cloud sync uses Firebase Authentication and stores study progress associated with your account in Firestore. If you email us or use the contact form (Resend), we receive the address and message content you send. Optional inputs such as a ZIP code used for officials lookup are processed to return study results and are not used to build a marketing profile.",
  ],
  es: [
    "Podés usar el sitio sin crear una cuenta. Si nos escribís por email, recibimos la dirección y el contenido del mensaje. Datos opcionales como un ZIP para buscar oficiales se usan para devolver resultados de estudio y no para armar un perfil de marketing.",
    "Podés usar el sitio sin crear una cuenta. El sync opcional en la nube usa Firebase Authentication y guarda el progreso de estudio asociado a tu cuenta en Firestore. Si nos escribís por email o usás el formulario de contacto (Resend), recibimos la dirección y el contenido del mensaje. Datos opcionales como un ZIP para buscar oficiales se usan para devolver resultados de estudio y no para armar un perfil de marketing.",
  ],
  zh: [
    "您无需创建账户即可使用本网站。如果您给我们发邮件，我们会收到您发送的邮箱地址和邮件内容。诸如用于查询民选官员的邮政编码（ZIP）等可选输入信息，仅用于返回学习结果，不会用于构建营销画像。",
    "您无需创建账户即可使用本网站。可选的云同步使用 Firebase Authentication，并在 Firestore 中存储与您账户关联的学习进度。如果您给我们发邮件或使用联系表单（Resend），我们会收到您发送的邮箱地址和内容。诸如用于查询民选官员的邮政编码（ZIP）等可选输入信息，仅用于返回学习结果，不会用于构建营销画像。",
  ],
  vi: [
    "Bạn có thể sử dụng trang web mà không cần tạo tài khoản. Nếu bạn gửi email cho chúng tôi, chúng tôi sẽ nhận được địa chỉ và nội dung tin nhắn bạn gửi. Các thông tin tùy chọn như mã ZIP dùng để tra cứu quan chức được xử lý để trả về kết quả học tập và không được dùng để xây dựng hồ sơ tiếp thị.",
    "Bạn có thể sử dụng trang web mà không cần tạo tài khoản. Đồng bộ đám mây tùy chọn dùng Firebase Authentication và lưu tiến trình học gắn với tài khoản trong Firestore. Nếu bạn gửi email hoặc dùng biểu mẫu liên hệ (Resend), chúng tôi nhận địa chỉ và nội dung tin nhắn. Các thông tin tùy chọn như mã ZIP để tra cứu quan chức chỉ dùng để trả kết quả học tập, không dùng để xây hồ sơ tiếp thị.",
  ],
  tl: [
    "Magagamit mo ang site nang hindi gumagawa ng account. Kung mag-e-email ka sa amin, matatanggap namin ang address at nilalaman ng mensaheng ipinadala mo. Ang mga opsyonal na input tulad ng ZIP code na ginagamit para sa paghahanap ng mga opisyal ay pinoproseso para magbalik ng resulta ng pag-aaral at hindi ginagamit para bumuo ng marketing profile.",
    "Magagamit mo ang site nang hindi gumagawa ng account. Ang optional cloud sync ay gumagamit ng Firebase Authentication at nag-iimbak ng study progress na naka-link sa iyong account sa Firestore. Kung mag-e-email ka o gagamit ng contact form (Resend), matatanggap namin ang address at nilalaman ng mensahe. Ang mga opsyonal na input tulad ng ZIP code para sa officials lookup ay pinoproseso para sa study results at hindi para sa marketing profile.",
  ],
  ar: [
    "يمكنك استخدام الموقع دون إنشاء حساب. إذا راسلتنا عبر البريد الإلكتروني، فسنستلم عنوانك ومحتوى الرسالة التي ترسلها. تتم معالجة المدخلات الاختيارية مثل الرمز البريدي المستخدم للبحث عن المسؤولين المنتخبين لإرجاع نتائج الدراسة فقط، ولا تُستخدم لإنشاء ملف تسويقي.",
    "يمكنك استخدام الموقع دون إنشاء حساب. تستخدم المزامنة السحابية الاختيارية Firebase Authentication وتخزّن تقدّم الدراسة المرتبط بحسابك في Firestore. إذا راسلتنا أو استخدمت نموذج الاتصال (Resend)، نستلم عنوانك ومحتوى الرسالة. المدخلات الاختيارية مثل الرمز البريدي للبحث عن المسؤولين تُعالج لإرجاع نتائج الدراسة فقط ولا تُستخدم لإنشاء ملف تسويقي.",
  ],
  ko: [
    "계정을 만들지 않고도 사이트를 이용할 수 있습니다. 이메일을 보내주시면 발신 주소와 메시지 내용을 수신하게 됩니다. 선출직 공무원 조회에 사용되는 우편번호와 같은 선택적 입력 정보는 학습 결과를 제공하기 위해 처리되며 마케팅 프로필 작성에는 사용되지 않습니다.",
    "계정을 만들지 않고도 사이트를 이용할 수 있습니다. 선택적 클라우드 동기화는 Firebase Authentication을 사용하며 Firestore에 계정과 연결된 학습 진도를 저장합니다. 이메일을 보내거나 문의 양식(Resend)을 사용하면 주소와 메시지 내용을 수신합니다. 선출직 조회용 우편번호 같은 선택 입력은 학습 결과 제공용이며 마케팅 프로필 작성에는 쓰이지 않습니다.",
  ],
  hi: [
    "आप बिना खाता बनाए साइट का उपयोग कर सकते हैं। यदि आप हमें ईमेल करते हैं, तो हमें आपका भेजा गया पता और संदेश की सामग्री प्राप्त होती है। निर्वाचित अधिकारियों की खोज के लिए उपयोग किए जाने वाले ZIP कोड जैसे वैकल्पिक इनपुट को अध्ययन परिणाम लौटाने के लिए संसाधित किया जाता है और इनका उपयोग मार्केटिंग प्रोफ़ाइल बनाने के लिए नहीं किया जाता।",
    "आप बिना खाता बनाए साइट का उपयोग कर सकते हैं। वैकल्पिक क्लाउड सिंक Firebase Authentication का उपयोग करता है और Firestore में आपके खाते से जुड़ी अध्ययन प्रगति संग्रहीत करता है। यदि आप हमें ईमेल करते हैं या संपर्क फ़ॉर्म (Resend) उपयोग करते हैं, तो हमें पता और संदेश सामग्री प्राप्त होती है। ZIP जैसे वैकल्पिक इनपुट अध्ययन परिणाम के लिए संसाधित होते हैं, मार्केटिंग प्रोफ़ाइल के लिए नहीं।",
  ],
  ru: [
    "Вы можете пользоваться сайтом без создания учётной записи. Если вы пишете нам по электронной почте, мы получаем адрес и содержание вашего сообщения. Необязательные данные, такие как почтовый индекс для поиска выборных должностных лиц, обрабатываются для возврата результатов обучения и не используются для создания маркетингового профиля.",
    "Вы можете пользоваться сайтом без учётной записи. Опциональная облачная синхронизация использует Firebase Authentication и хранит учебный прогресс, связанный с аккаунтом, в Firestore. Если вы пишете нам или используете форму контакта (Resend), мы получаем адрес и текст сообщения. Необязательные данные вроде ZIP для поиска должностных лиц обрабатываются для учебных результатов и не используются для маркетингового профиля.",
  ],
  ht: [
    "Ou ka itilize sit la san w pa kreye yon kont. Si w voye yon imel ba nou, nou resevwa adrès ak kontni mesaj ou voye a. Enfòmasyon opsyonèl tankou yon kòd postal (ZIP) ki itilize pou chèche ofisyèl eli yo trete pou retounen rezilta etid; nou pa itilize yo pou konstwi yon pwofil maketing.",
    "Ou ka itilize sit la san w pa kreye yon kont. Sync nwaj opsyonèl la itilize Firebase Authentication epi li estoke pwogrè etid ki asosye ak kont ou nan Firestore. Si w voye imel oswa itilize fòm kontak (Resend), nou resevwa adrès ak kontni mesaj la. Enfòmasyon opsyonèl tankou ZIP pou chèche ofisyèl yo trete pou rezilta etid, pa pou pwofil maketing.",
  ],
  fr: [
    "Vous pouvez utiliser le site sans créer de compte. Si vous nous envoyez un e-mail, nous recevons l'adresse et le contenu du message envoyé. Les saisies facultatives telles qu'un code postal utilisé pour rechercher des élus sont traitées pour renvoyer des résultats d'étude et ne sont pas utilisées pour créer un profil marketing.",
    "Vous pouvez utiliser le site sans créer de compte. La synchronisation cloud optionnelle utilise Firebase Authentication et stocke la progression d'étude associée à votre compte dans Firestore. Si vous nous écrivez ou utilisez le formulaire de contact (Resend), nous recevons l'adresse et le contenu du message. Les saisies facultatives comme un code postal pour rechercher des élus servent aux résultats d'étude et non à un profil marketing.",
  ],
};

const choices = {
  en: [
    "You may clear local site data in your browser, block cookies, or email ${CONTACT_EMAIL} for privacy-related questions. Because we do not require accounts, we may have limited personal data beyond what you email us or what providers store in logs/analytics.",
    "You may clear local site data in your browser, block cookies, or email ${CONTACT_EMAIL} for privacy-related questions. If you created an optional account, you can reset your password or delete the account (and associated cloud progress) from the practice sync panel, or email us to request deletion. Local progress on a device remains until you clear site data.",
  ],
  es: [
    "Podés borrar datos del sitio en el navegador, bloquear cookies o escribir a ${CONTACT_EMAIL} por temas de privacidad. Como no exigimos cuentas, podemos tener pocos datos personales más allá de lo que nos envíes por email o lo que guarden logs/analítica de proveedores.",
    "Podés borrar datos del sitio en el navegador, bloquear cookies o escribir a ${CONTACT_EMAIL} por temas de privacidad. Si creaste una cuenta opcional, podés restablecer la contraseña o eliminar la cuenta (y el progreso en la nube) desde el panel de sync en práctica, o pedirnos el borrado por email. El progreso local en un dispositivo queda hasta que borres los datos del sitio.",
  ],
  zh: [
    "您可以清除浏览器中的本地网站数据、屏蔽 Cookie，或就隐私相关问题发邮件至 ${CONTACT_EMAIL}。由于我们不要求注册账户，除了您通过邮件发送给我们的信息，或服务提供商在日志/分析中存储的信息外，我们掌握的个人数据可能非常有限。",
    "您可以清除浏览器中的本地网站数据、屏蔽 Cookie，或就隐私相关问题发邮件至 ${CONTACT_EMAIL}。如果您创建了可选账户，可在练习页的同步面板中重置密码或删除账户（及关联的云端进度），也可发邮件请求删除。设备上的本地进度会保留，直到您清除网站数据。",
  ],
  vi: [
    "Bạn có thể xóa dữ liệu trang web cục bộ trong trình duyệt, chặn cookie, hoặc gửi email đến ${CONTACT_EMAIL} cho các câu hỏi liên quan đến quyền riêng tư. Vì chúng tôi không yêu cầu tài khoản, chúng tôi có thể có rất ít dữ liệu cá nhân ngoài những gì bạn gửi qua email hoặc những gì nhà cung cấp lưu trong nhật ký/phân tích.",
    "Bạn có thể xóa dữ liệu trang cục bộ trong trình duyệt, chặn cookie, hoặc gửi email tới ${CONTACT_EMAIL} về quyền riêng tư. Nếu đã tạo tài khoản tùy chọn, bạn có thể đặt lại mật khẩu hoặc xóa tài khoản (và tiến trình đám mây) từ bảng đồng bộ trên trang luyện tập, hoặc email để yêu cầu xóa. Tiến trình cục bộ trên thiết bị vẫn còn cho đến khi bạn xóa dữ liệu trang.",
  ],
  tl: [
    "Maaari mong i-clear ang lokal na data ng site sa iyong browser, harangan ang cookies, o mag-email sa ${CONTACT_EMAIL} para sa mga tanong tungkol sa privacy. Dahil hindi kami humihingi ng account, maaaring limitado ang aming personal na data maliban sa ipinadala mo sa amin sa email o iniimbak ng mga provider sa logs/analytics.",
    "Maaari mong i-clear ang lokal na site data sa browser, harangan ang cookies, o mag-email sa ${CONTACT_EMAIL} para sa privacy. Kung may optional account ka, maaari mong i-reset ang password o burahin ang account (at cloud progress) mula sa sync panel sa practice, o mag-email para humiling ng pagbura. Ang local progress sa device ay nananatili hanggang i-clear mo ang site data.",
  ],
  ar: [
    "يمكنك مسح بيانات الموقع المحلية في متصفحك، أو حظر ملفات تعريف الارتباط، أو مراسلتنا عبر ${CONTACT_EMAIL} للأسئلة المتعلقة بالخصوصية. نظراً لأننا لا نطلب حسابات، فقد تكون لدينا بيانات شخصية محدودة بخلاف ما ترسله إلينا عبر البريد الإلكتروني أو ما يخزنه مزودو الخدمة في السجلات/التحليلات.",
    "يمكنك مسح بيانات الموقع المحلية في متصفحك، أو حظر ملفات تعريف الارتباط، أو مراسلتنا عبر ${CONTACT_EMAIL} لأسئلة الخصوصية. إذا أنشأت حساباً اختيارياً، يمكنك إعادة تعيين كلمة المرور أو حذف الحساب (وتقدّم السحابة المرتبط) من لوحة المزامنة في صفحة التمرين، أو مراسلتنا لطلب الحذف. يبقى التقدّم المحلي على الجهاز حتى تمسح بيانات الموقع.",
  ],
  ko: [
    "귀하는 브라우저에서 로컬 사이트 데이터를 지우거나, 쿠키를 차단하거나, 개인정보 관련 문의를 위해 ${CONTACT_EMAIL}로 이메일을 보낼 수 있습니다. 저희는 계정을 요구하지 않으므로, 귀하가 이메일로 보낸 정보나 제공업체가 로그/분석에 저장하는 정보 외에는 보유하는 개인정보가 제한적일 수 있습니다.",
    "브라우저에서 로컬 사이트 데이터를 지우거나, 쿠키를 차단하거나, 개인정보 문의는 ${CONTACT_EMAIL}로 이메일을 보낼 수 있습니다. 선택 계정을 만들었다면 연습 페이지의 동기화 패널에서 비밀번호를 재설정하거나 계정(및 클라우드 진도)을 삭제할 수 있으며, 이메일로 삭제를 요청할 수도 있습니다. 기기의 로컬 진도는 사이트 데이터를 지울 때까지 남습니다.",
  ],
  hi: [
    "आप अपने ब्राउज़र में स्थानीय साइट डेटा साफ़ कर सकते हैं, कुकीज़ को ब्लॉक कर सकते हैं, या गोपनीयता संबंधी प्रश्नों के लिए ${CONTACT_EMAIL} पर ईमेल कर सकते हैं। चूंकि हमें खातों की आवश्यकता नहीं है, इसलिए आपके द्वारा हमें ईमेल की गई जानकारी या प्रदाताओं द्वारा लॉग/एनालिटिक्स में संग्रहीत जानकारी से परे हमारे पास सीमित व्यक्तिगत डेटा हो सकता है।",
    "आप ब्राउज़र में स्थानीय साइट डेटा साफ़ कर सकते हैं, कुकीज़ ब्लॉक कर सकते हैं, या गोपनीयता प्रश्नों के लिए ${CONTACT_EMAIL} पर ईमेल कर सकते हैं। यदि आपने वैकल्पिक खाता बनाया है, तो अभ्यास सिंक पैनल से पासवर्ड रीसेट या खाता (और क्लाउड प्रगति) हटा सकते हैं, या हटाने का अनुरोध ईमेल कर सकते हैं। डिवाइस पर स्थानीय प्रगति साइट डेटा साफ़ करने तक रहती है।",
  ],
  ru: [
    "Вы можете очистить локальные данные сайта в браузере, заблокировать файлы cookie или написать на ${CONTACT_EMAIL} по вопросам конфиденциальности. Поскольку мы не требуем учётных записей, у нас может быть ограниченный объём личных данных, помимо того, что вы отправляете нам по электронной почте или что поставщики хранят в журналах/аналитике.",
    "Вы можете очистить локальные данные сайта в браузере, заблокировать cookie или написать на ${CONTACT_EMAIL} по вопросам конфиденциальности. Если вы создали опциональный аккаунт, можно сбросить пароль или удалить аккаунт (и облачный прогресс) в панели синхронизации на странице практики, либо запросить удаление по email. Локальный прогресс на устройстве остаётся, пока вы не очистите данные сайта.",
  ],
  ht: [
    "Ou ka efase done lokal sit la nan navigatè ou, bloke cookies, oswa voye yon imel bay ${CONTACT_EMAIL} pou kesyon sou vi prive. Piske nou pa egzije kont, nou ka gen done pèsonèl limite apa de sa w voye ba nou pa imel oswa sa founisè yo estoke nan jounal/analiz.",
    "Ou ka efase done lokal sit la nan navigatè ou, bloke cookies, oswa voye imel bay ${CONTACT_EMAIL} pou kesyon vi prive. Si w te kreye yon kont opsyonèl, ou ka reyajiste modpas oswa efase kont la (ak pwogrè nwaj) nan panèl sync nan paj pratik la, oswa voye imel pou mande efasman. Pwogrè lokal sou aparèy la rete jiskaske w efase done sit la.",
  ],
  fr: [
    "Vous pouvez effacer les données locales du site dans votre navigateur, bloquer les cookies, ou envoyer un e-mail à ${CONTACT_EMAIL} pour des questions relatives à la confidentialité. Comme nous n'exigeons pas de comptes, nous pouvons disposer de données personnelles limitées au-delà de ce que vous nous envoyez par e-mail ou de ce que les prestataires stockent dans les journaux/l'analytique.",
    "Vous pouvez effacer les données locales du site dans votre navigateur, bloquer les cookies, ou envoyer un e-mail à ${CONTACT_EMAIL} pour des questions de confidentialité. Si vous avez créé un compte optionnel, vous pouvez réinitialiser le mot de passe ou supprimer le compte (et la progression cloud) depuis le panneau de sync sur la page d'entraînement, ou nous écrire pour demander la suppression. La progression locale sur un appareil reste jusqu'à ce que vous effaciez les données du site.",
  ],
};

let ok = 0;
for (const [loc, [from, to]] of Object.entries(provide)) {
  if (!site.includes(from)) {
    console.warn("provide miss", loc);
  } else {
    site = site.replace(from, to);
    ok++;
  }
}
for (const [loc, [from, to]] of Object.entries(choices)) {
  if (!site.includes(from)) {
    console.warn("choices miss", loc);
  } else {
    site = site.replace(from, to);
    ok++;
  }
}

site = site.replace(/Last updated: August 2, 2026\./g, "Last updated: August 4, 2026.");
site = site.replace(/Última actualización: 2 de agosto de 2026\./g, "Última actualización: 4 de agosto de 2026.");
site = site.replace(/最后更新日期：2026 年 8 月 2 日。/g, "最后更新日期：2026 年 8 月 4 日。");
site = site.replace(/Cập nhật lần cuối: ngày 2 tháng 8 năm 2026\./g, "Cập nhật lần cuối: ngày 4 tháng 8 năm 2026.");
site = site.replace(/Huling na-update: Agosto 2, 2026\./g, "Huling na-update: Agosto 4, 2026.");
site = site.replace(/آخر تحديث: 2 أغسطس 2026\./g, "آخر تحديث: 4 أغسطس 2026.");
site = site.replace(/최종 업데이트: 2026년 8월 2일\./g, "최종 업데이트: 2026년 8월 4일.");
site = site.replace(/अंतिम अपडेट: 2 अगस्त, 2026।/g, "अंतिम अपडेट: 4 अगस्त, 2026।");
site = site.replace(/Последнее обновление: 2 августа 2026 г\./g, "Последнее обновление: 4 августа 2026 г.");
site = site.replace(/Dènye mizajou: 2 out 2026\./g, "Dènye mizajou: 4 out 2026.");
site = site.replace(/Dernière mise à jour : 2 août 2026\./g, "Dernière mise à jour : 4 août 2026.");

site = site.replace(
  "We share data with service providers who help us run the site (hosting such as Vercel, analytics, advertising, and error monitoring such as Sentry).",
  "We share data with service providers who help us run the site (hosting such as Vercel; Firebase Authentication/Firestore and Analytics; email delivery such as Resend; advertising when enabled; and error monitoring such as Sentry)."
);

writeFileSync(sitePath, site);
console.log("replacements", ok);
console.log("has Firestore", site.includes("Firestore"));
console.log("has August 4 EN", site.includes("August 4, 2026"));
