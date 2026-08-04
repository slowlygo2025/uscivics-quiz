import fs from "fs";
import path from "path";

/** Fill new Dictionary keys for all non-en locales (ES careful; others EN-based where needed). */
const extras = {
  contactFormLead: {
    es: "Enviá un mensaje — leemos cada email. No incluyas números de caso sensibles que no pondrías en un correo.",
    en: "Send a message — we read every email. Do not include sensitive immigration case numbers you would not put in email.",
  },
  contactFormName: { es: "Tu nombre", en: "Your name" },
  contactFormEmail: { es: "Tu email", en: "Your email" },
  contactFormMessage: { es: "Mensaje", en: "Message" },
  contactFormSubmit: { es: "Enviar mensaje", en: "Send message" },
  contactFormSending: { es: "Enviando…", en: "Sending…" },
  contactFormSuccess: {
    es: "Gracias — tu mensaje se envió. Te responderemos por email.",
    en: "Thanks — your message was sent. We will reply by email.",
  },
  contactFormError: {
    es: "No se pudo enviar por el formulario.",
    en: "Could not send through the form.",
  },
  contactFormFallback: {
    es: "Abrí tu app de email",
    en: "Open your email app instead",
  },
  q1Hint: {
    es: "Tu fecha de presentación decide 2008 vs 2025. Si no estás seguro, revisá el recibo N-400 o uscis.gov — igual podés practicar cualquiera de los dos bancos.",
    en: "Your filing date decides 2008 vs 2025. If you are not sure, check your N-400 receipt or uscis.gov — you can still practice either bank.",
  },
  q2Age: { es: "¿Tenés 65 años o más?", en: "Are you 65 or older?" },
  q2Years: {
    es: "¿Sos residente permanente legal (green card) hace 20 años o más?",
    en: "Have you been a lawful permanent resident (green card) for 20 years or more?",
  },
  resultUnsure: {
    es: "No podemos elegir con seguridad 2008 vs 2025 sin tu fecha de N-400. Practicá cualquiera de los bancos, o confirmá en uscis.gov antes de la entrevista.",
    en: "We can’t safely pick 2008 vs 2025 without your N-400 filing date. Practice either bank, or confirm on uscis.gov before your interview.",
  },
  eligibilityEnglishExemptNote: {
    es: "Las exenciones de inglés (por ejemplo 50/20 o 55/15) no cambian qué banco de civismo estudiás — solo lectura/escritura. Ver nuestra práctica de inglés y uscis.gov.",
    en: "Separate English exemptions (for example 50/20 or 55/15) do not change which civics bank you study — only the English reading/writing parts. See our English practice and uscis.gov.",
  },
  eligibilityOfficialNote: {
    es: "Este asistente es solo educativo. USCIS decide tu versión del examen — verificá en uscis.gov antes del día de la entrevista.",
    en: "This helper is educational only. USCIS decides your test version — verify at uscis.gov before interview day.",
  },
  accountSyncTitle: {
    es: "Sync opcional en la nube",
    en: "Optional cloud sync",
  },
  accountSyncLead: {
    es: "La práctica sigue gratis sin cuenta. Iniciá sesión para respaldar el progreso entre dispositivos. Nunca ponemos el banco de preguntas detrás de un paywall.",
    en: "Practice stays free without an account. Sign in to back up progress across devices. We never put the question bank behind a paywall.",
  },
  accountEmail: { es: "Email", en: "Email" },
  accountPassword: {
    es: "Contraseña (mín. 8 caracteres)",
    en: "Password (min 8 characters)",
  },
  accountSignIn: { es: "Iniciar sesión", en: "Sign in" },
  accountCreate: { es: "Crear cuenta", en: "Create account" },
  accountSignOut: { es: "Cerrar sesión", en: "Sign out" },
  accountSyncNow: { es: "Sincronizar ahora", en: "Sync progress now" },
  accountSynced: { es: "Progreso sincronizado.", en: "Progress synced." },
  accountSyncError: {
    es: "No se pudo sincronizar. Revisá la conexión e intentá de nuevo.",
    en: "Could not sync. Check your connection and try again.",
  },
  accountSignedInAs: { es: "Sesión iniciada como", en: "Signed in as" },
  accountUnavailable: {
    es: "El sync en la nube no está configurado en este deploy. Exportar/importar sigue funcionando sin conexión.",
    en: "Cloud sync is not configured on this deployment yet. Export/import still works offline.",
  },
};

const locales = ["es", "zh", "vi", "tl", "ar", "ko", "hi", "ru", "ht", "fr"];
const dir = "src/lib/dict";

for (const locale of locales) {
  const file = path.join(dir, `${locale}.ts`);
  let src = fs.readFileSync(file, "utf8");
  if (src.includes("contactFormLead:")) {
    console.log("skip", locale);
    continue;
  }
  const pick = (key) =>
    locale === "es" ? extras[key].es : extras[key].en;
  const block =
    "\n" +
    Object.keys(extras)
      .map((k) => `  ${k}: ${JSON.stringify(pick(k))},`)
      .join("\n") +
    "\n";
  // Insert before closing `} satisfies` or final `};` / `} as const` — these files end with `};` after Dictionary cast
  const anchor = src.lastIndexOf("\n};");
  if (anchor < 0) throw new Error("no end " + locale);
  // Better: after notFoundHome line
  const nf = src.indexOf("notFoundHome:");
  const lineEnd = src.indexOf("\n", nf);
  src = src.slice(0, lineEnd + 1) + block + src.slice(lineEnd + 1);
  fs.writeFileSync(file, src);
  console.log("patched", locale);
}

// Also update eligibilityLead / resultSenior in es if present with old short copy — optional
console.log("done");
