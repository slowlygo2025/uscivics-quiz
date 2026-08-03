/**
 * Merge CTR-optimized + new learn posts into all learn-i18n locale JSON files.
 * Run: node scripts/sync-learn-content.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "src/lib/learn-i18n");
const LOCALES = ["en", "es", "zh", "vi", "tl", "ar", "ko", "hi", "ru", "ht", "fr"];

/** @typedef {{ title: string, description: string, sections: {heading:string,body:string}[] }} Post */

/** @type {Record<string, Record<string, Post>>} */
const PACK = {
  en: {
    "65-20": {
      title:
        "65/20 Civics Test Explained: 20 Starred Questions (Age 65 + 20 Years LPR)",
      description:
        "Qualify for 65/20? Study only 20 starred USCIS civics questions — 10 asked, 6 to pass — in your language of choice. Free senior practice for 2008 and 2025.",
      sections: [
        {
          heading: "Who qualifies for 65/20",
          body: "You may qualify if you are 65 or older and have been a lawful permanent resident for at least 20 years when you file. USCIS still decides based on your case — this guide explains the study path, not case approval.",
        },
        {
          heading: "How the 65/20 civics interview works",
          body: "Instead of the full bank, you study a starred set of 20 questions from your test version (2008 or 2025, based on N-400 filing date). The officer asks up to 10; you need 6 correct to pass.",
        },
        {
          heading: "Language of choice for civics",
          body: "Under this special consideration, you may take the civics test in your preferred language. Confirm interpreter rules for your interview. English reading and writing exemptions may also apply separately — check USCIS guidance.",
        },
        {
          heading: "Practice only the starred set",
          body: "Open our senior (65/20) question list and practice mode so you do not waste time on questions you will not be asked. Still say answers out loud — the interview is oral.",
        },
        {
          heading: "Confirm 2008 vs 2025 first",
          body: "65/20 uses starred questions from whichever civics version your filing date requires. Use the N-400 filing date guide and eligibility flow before you memorize.",
        },
      ],
    },
    "n-400-filing-date": {
      title:
        "N-400 Filing Date: Which Civics Test Do You Take — 2008 or 2025?",
      description:
        "Your Form N-400 filing date decides 2008 (100 questions) vs 2025 (128 questions). Learn the October 20, 2025 cutoff and practice the correct free bank.",
      sections: [
        {
          heading: "The October 20, 2025 cutoff",
          body: "Applicants who filed Form N-400 before October 20, 2025 generally take the 2008 civics test (100 questions, 10 asked, 6 to pass). Applicants who filed on or after that date generally take the 2025 test (128 questions, 20 asked, 12 to pass). Always verify with current USCIS rules for your case.",
        },
        {
          heading: "Filing date beats “today’s date”",
          body: "Many people start the newest 128-question list by default. If your receipt date puts you on 2008, practice the 100-question bank and the 6-of-10 pass rule instead — or you will study the wrong set.",
        },
        {
          heading: "How to check and practice",
          body: "Find your filing evidence, run our free eligibility flow, then open all-100 or all-128. Add 65/20 senior practice only if that consideration applies.",
        },
        {
          heading: "Interview simulation matches the version",
          body: "Use practice for 2008 or 2025 so early-stop pass/fail rules match your interview. Pair with English reading and writing if you are not exempt.",
        },
        {
          heading: "When paperwork is unclear",
          body: "This site cannot check USCIS case status. Ask your attorney or accredited representative which civics version applies, then practice that bank here for free.",
        },
      ],
    },
    "dates-names-officials-drills": {
      title:
        "Civics Drills: Dates, Famous Names, and Changing Officials (Free)",
      description:
        "Focused USCIS civics drills for the hardest clusters — key dates, famous names, and officials whose answers change. Free audio on every question for 2008 and 2025.",
      sections: [
        {
          heading: "Why drills beat random review",
          body: "Most misses cluster in three places: years and numbers, famous names, and officials who change with elections. Short drills fix those faster than rereading the full list.",
        },
        {
          heading: "Dates drill",
          body: "Practice Constitution years, wars, amendments, and “when” facts out loud. Open the 2025 or 2008 dates drill landing, then return to interview simulation.",
        },
        {
          heading: "Names drill",
          body: "Founders, presidents, and civil rights leaders show up often. Use the names drill until you can answer without peeking — then hear the English wording with free audio.",
        },
        {
          heading: "Officials drill",
          body: "President, Vice President, Speaker, Chief Justice, senators, representative, governor, and capital can change. Drill the officials set and recheck the week of your interview.",
        },
        {
          heading: "Next step",
          body: "Pick your test version with the N-400 filing date guide, run the matching drills, then practice a full simulation.",
        },
      ],
    },
    "texas-civics-answers": {
      title: "Texas Civics Test Answers: Capital, Governor, Senators (USCIS)",
      description:
        "Study Texas answers for the U.S. citizenship civics test — capital Austin, current governor, and how to find your senators and representative by ZIP. Free practice.",
      sections: [
        {
          heading: "Texas capital and governor",
          body: "For USCIS civics, Texas’s capital is Austin. The governor’s name can change with elections — use our Texas state study page and verify again before interview day.",
        },
        {
          heading: "Senators and your representative",
          body: "Texas has two U.S. senators for the whole state. Your House representative depends on your district. Enter your ZIP in practice to study the right names.",
        },
        {
          heading: "Pair with the officials drill",
          body: "Federal names (President, Vice President, Speaker, Chief Justice) matter too. Use the officials drill plus your Texas state page so changing answers stay fresh.",
        },
        {
          heading: "Practice the full interview",
          body: "Confirm 2008 vs 2025 with your N-400 filing date, then run interview simulation. Local officials are only part of the oral test.",
        },
      ],
    },
    "florida-civics-answers": {
      title: "Florida Civics Test Answers: Capital, Governor, Local Officials",
      description:
        "USCIS civics answers for Florida — capital Tallahassee, governor, senators, and House representative by ZIP. Free naturalization practice.",
      sections: [
        {
          heading: "Florida capital and governor",
          body: "Florida’s capital is Tallahassee. Study the current governor on our Florida state page and recheck close to your interview — elections can change the name.",
        },
        {
          heading: "Senators and representative",
          body: "Use ZIP lookup in practice for your U.S. senators and representative. Do not memorize a random online list that might be outdated for your district.",
        },
        {
          heading: "Changing federal answers",
          body: "Combine Florida local study with the officials drill for President, Vice President, Speaker, and Chief Justice.",
        },
        {
          heading: "Full civics practice",
          body: "After local names, practice the full bank for your filing-date version (2008 or 2025) with free audio and simulation.",
        },
      ],
    },
    "new-york-civics-answers": {
      title: "New York Civics Test Answers: Capital, Governor, and ZIP Officials",
      description:
        "Prepare New York USCIS civics answers — capital Albany, governor, senators, and your representative. Free citizenship interview practice.",
      sections: [
        {
          heading: "New York capital and governor",
          body: "New York’s capital is Albany. Confirm the current governor on our New York state study page before interview day.",
        },
        {
          heading: "NYC vs upstate districts",
          body: "House districts differ across New York City and the rest of the state. ZIP lookup is the safest way to study the correct representative.",
        },
        {
          heading: "Officials who change",
          body: "Use the officials drill for federal names and the New York state page for capital and governor. Recheck the week of your appointment.",
        },
        {
          heading: "Interview-ready practice",
          body: "Match 2008 or 2025 to your N-400 filing date, then practice oral answers out loud — not only silent reading.",
        },
      ],
    },
  },
  es: {
    "65-20": {
      title:
        "Examen cívico 65/20 explicado: 20 preguntas con estrella (65 años + 20 de LPR)",
      description:
        "¿Calificás para 65/20? Estudiá solo 20 preguntas USCIS con estrella — 10 en la entrevista, 6 para aprobar — en el idioma que elijas. Práctica senior gratis 2008 y 2025.",
      sections: [
        {
          heading: "Quién califica para 65/20",
          body: "Podés calificar si tenés 65 años o más y sos residente permanente legal desde hace al menos 20 años al presentar. USCIS decide según tu caso; esta guía explica el estudio, no la aprobación.",
        },
        {
          heading: "Cómo es la entrevista 65/20",
          body: "En lugar del banco completo, estudiás 20 preguntas con estrella de tu versión (2008 o 2025 según la fecha de N-400). El oficial pregunta hasta 10; necesitás 6 correctas.",
        },
        {
          heading: "Idioma de elección",
          body: "Con esta consideración especial, podés hacer el examen cívico en tu idioma preferido. Confirmá reglas de intérprete. Las exenciones de inglés pueden aplicar por separado.",
        },
        {
          heading: "Practicá solo el set con estrella",
          body: "Abrí nuestra lista senior (65/20) y el modo de práctica para no perder tiempo en preguntas que no te van a hacer. Decí las respuestas en voz alta.",
        },
        {
          heading: "Confirmá 2008 vs 2025 primero",
          body: "65/20 usa preguntas con estrella de la versión que marca tu fecha de presentación. Usá la guía N-400 y el flujo de elegibilidad antes de memorizar.",
        },
      ],
    },
    "n-400-filing-date": {
      title:
        "Fecha de N-400: ¿qué examen cívico te toca — 2008 o 2025?",
      description:
        "La fecha de presentación del Formulario N-400 decide entre 2008 (100 preguntas) y 2025 (128). Conocé el corte del 20 de octubre de 2025 y practicá el banco correcto gratis.",
      sections: [
        {
          heading: "El corte del 20 de octubre de 2025",
          body: "Quienes presentaron el N-400 antes del 20 de octubre de 2025 suelen rendir el examen 2008 (100 preguntas, 10, 6 para aprobar). Quienes presentaron ese día o después suelen rendir el 2025 (128, 20, 12). Verificá siempre con USCIS.",
        },
        {
          heading: "La fecha de filing importa más que “hoy”",
          body: "Mucha gente empieza la lista de 128 por defecto. Si tu recibo indica 2008, practicá el banco de 100 y la regla 6 de 10.",
        },
        {
          heading: "Cómo verificar y practicar",
          body: "Buscá tu evidencia de presentación, usá el flujo de elegibilidad gratis y abrí all-100 o all-128. Sumá 65/20 solo si aplica.",
        },
        {
          heading: "La simulación debe coincidir con tu versión",
          body: "Usá práctica 2008 o 2025 para que las reglas de aprobar/reprobar coincidan. Sumá inglés lectura y escritura si no estás exento.",
        },
        {
          heading: "Si el papeleo no es claro",
          body: "Este sitio no consulta el estatus USCIS. Preguntá a tu abogado o representante acreditado y practicá ese banco aquí gratis.",
        },
      ],
    },
    "dates-names-officials-drills": {
      title:
        "Drills cívicos: fechas, nombres famosos y funcionarios que cambian",
      description:
        "Drills enfocados USCIS para lo más difícil — fechas clave, nombres famosos y funcionarios que cambian. Audio gratis en cada pregunta para 2008 y 2025.",
      sections: [
        {
          heading: "Por qué los drills ayudan más",
          body: "La mayoría de errores se agrupan en años/números, nombres famosos y funcionarios electos. Drills cortos corrigen eso más rápido que releer toda la lista.",
        },
        {
          heading: "Drill de fechas",
          body: "Practicá años de la Constitución, guerras, enmiendas y “cuándo” en voz alta. Abrí el drill de fechas 2025 o 2008 y después simulá la entrevista.",
        },
        {
          heading: "Drill de nombres",
          body: "Fundadores, presidentes y líderes de derechos civiles aparecen seguido. Usá el drill de nombres hasta responder sin mirar.",
        },
        {
          heading: "Drill de funcionarios",
          body: "Presidente, Vicepresidente, Speaker, Chief Justice, senadores, representante, gobernador y capital pueden cambiar. Repasá la semana de la entrevista.",
        },
        {
          heading: "Siguiente paso",
          body: "Elegí tu versión con la guía N-400, hacé los drills y después una simulación completa.",
        },
      ],
    },
    "texas-civics-answers": {
      title: "Respuestas cívicas de Texas: capital, gobernador y senadores",
      description:
        "Estudiá respuestas de Texas para el examen de ciudadanía — capital Austin, gobernador actual y cómo hallar senadores y representante por ZIP. Práctica gratis.",
      sections: [
        {
          heading: "Capital y gobernador de Texas",
          body: "La capital de Texas es Austin. El gobernador puede cambiar; usá la página estatal de Texas y verificá antes de la entrevista.",
        },
        {
          heading: "Senadores y representante",
          body: "Texas tiene dos senadores. Tu representante depende del distrito. Ingresá tu ZIP en la práctica.",
        },
        {
          heading: "Combiná con el drill de funcionarios",
          body: "También importan los nombres federales. Usá el drill de funcionarios más la página de Texas.",
        },
        {
          heading: "Practicá la entrevista completa",
          body: "Confirmá 2008 vs 2025 con tu N-400 y simulá la entrevista oral.",
        },
      ],
    },
    "florida-civics-answers": {
      title: "Respuestas cívicas de Florida: capital, gobernador y oficiales",
      description:
        "Respuestas USCIS para Florida — capital Tallahassee, gobernador, senadores y representante por ZIP. Práctica gratis de naturalización.",
      sections: [
        {
          heading: "Capital y gobernador de Florida",
          body: "La capital es Tallahassee. Confirmá el gobernador en la página estatal de Florida cerca de la entrevista.",
        },
        {
          heading: "Senadores y representante",
          body: "Usá la búsqueda por ZIP en la práctica. No memorices listas aleatorias que pueden estar desactualizadas.",
        },
        {
          heading: "Respuestas federales que cambian",
          body: "Combiná el estudio local de Florida con el drill de funcionarios federales.",
        },
        {
          heading: "Práctica cívica completa",
          body: "Después de los nombres locales, practicá el banco completo de tu versión (2008 o 2025).",
        },
      ],
    },
    "new-york-civics-answers": {
      title: "Respuestas cívicas de Nueva York: capital, gobernador y ZIP",
      description:
        "Preparate para respuestas USCIS de Nueva York — capital Albany, gobernador, senadores y representante. Práctica gratis para la entrevista.",
      sections: [
        {
          heading: "Capital y gobernador de Nueva York",
          body: "La capital es Albany. Confirmá el gobernador actual en la página estatal de Nueva York.",
        },
        {
          heading: "Distritos NYC vs resto del estado",
          body: "Los distritos de la Cámara cambian entre NYC y el resto del estado. El ZIP es la forma más segura de estudiar al representante correcto.",
        },
        {
          heading: "Funcionarios que cambian",
          body: "Usá el drill de funcionarios para nombres federales y la página de Nueva York para capital y gobernador.",
        },
        {
          heading: "Práctica lista para la entrevista",
          body: "Emparejá 2008 o 2025 con tu fecha N-400 y practicá respuestas en voz alta.",
        },
      ],
    },
  },
};

/** Fill non-en/es locales from EN (titles stay EN for SEO; body EN until translated). */
function localizedOrEn(locale, slug, enPost) {
  if (PACK[locale]?.[slug]) return PACK[locale][slug];
  return enPost;
}

for (const locale of LOCALES) {
  const file = join(dir, `${locale}.json`);
  const data = JSON.parse(readFileSync(file, "utf8"));
  for (const slug of Object.keys(PACK.en)) {
    data[slug] = localizedOrEn(locale, slug, PACK.en[slug]);
  }
  // Also refresh california title slightly for CTR if present
  if (data["california-civics-answers"] && locale === "en") {
    data["california-civics-answers"].title =
      "California Civics Test Answers: Capital Sacramento, Governor & ZIP Officials";
    data["california-civics-answers"].description =
      "USCIS civics answers for California — capital Sacramento, current governor, senators, and your House representative by ZIP. Free naturalization practice.";
  }
  writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log("updated", locale, Object.keys(PACK.en).length, "posts");
}

console.log("done");
