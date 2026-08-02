import type { TestVersion } from "./types";

export type DrillDef = {
  slug: string;
  version: TestVersion;
  /** English bank question IDs (stable across locales). */
  ids: number[];
  title: { en: string; es: string };
  description: { en: string; es: string };
  lead: { en: string; es: string };
};

/**
 * Deep SEO landings: dates, famous names, current officials —
 * patterned after competitor “special modes” but free + with audio.
 */
export const SEO_DRILLS: DrillDef[] = [
  {
    slug: "dates-2025",
    version: "2025",
    ids: [79, 82, 98, 102, 104, 115, 116, 125, 126, 127, 128],
    title: {
      en: "All Key Dates — 2025 Civics Test",
      es: "Todas las fechas clave — Examen cívico 2025",
    },
    description: {
      en: "Practice the USCIS 2025 civics questions about important dates in U.S. history and holidays — with free audio.",
      es: "Practicá las preguntas del examen cívico 2025 sobre fechas importantes de la historia de EE.UU. y feriados — con audio gratis.",
    },
    lead: {
      en: "Officers often ask when key events happened. Drill these date questions, hear them aloud, then open full interview practice.",
      es: "Los oficiales suelen preguntar cuándo ocurrieron hechos clave. Practicá estas fechas, escuchalas en voz alta y después abrí la simulación completa.",
    },
  },
  {
    slug: "names-2025",
    version: "2025",
    ids: [74, 78, 85, 86, 87, 88, 89, 94, 99, 105, 107, 108, 113],
    title: {
      en: "All Key Names — 2025 Civics Test",
      es: "Todos los nombres clave — Examen cívico 2025",
    },
    description: {
      en: "Memorize the people you must know for the 2025 USCIS civics test: founders, presidents, and civil rights leaders.",
      es: "Memorizá las personas que tenés que saber para el examen cívico 2025: fundadores, presidentes y líderes de derechos civiles.",
    },
    lead: {
      en: "Name questions are high-frequency in interviews. Study accepted answers, say them out loud, then simulate the full test.",
      es: "Las preguntas de nombres son frecuentes en la entrevista. Estudiá las respuestas aceptadas, decilas en voz alta y simulá el examen completo.",
    },
  },
  {
    slug: "officials-2025",
    version: "2025",
    ids: [23, 29, 30, 38, 39, 57, 61, 62],
    title: {
      en: "Current Officials — Answers That Change (2025)",
      es: "Oficiales actuales — Respuestas que cambian (2025)",
    },
    description: {
      en: "Practice 2025 civics questions about the President, Vice President, Speaker, Chief Justice, senators, representative, and governor.",
      es: "Practicá preguntas 2025 sobre el Presidente, Vicepresidente, Speaker, Chief Justice, senadores, representante y gobernador.",
    },
    lead: {
      en: "These answers change with elections. Review federal names in practice, use ZIP lookup for your state officials, and recheck before interview day.",
      es: "Estas respuestas cambian con las elecciones. Revisá nombres federales en la práctica, usá ZIP para tus oficiales estatales y verificá antes del día de la entrevista.",
    },
  },
  {
    slug: "dates-2008",
    version: "2008",
    ids: [56, 57, 63, 66, 86, 99, 100],
    title: {
      en: "All Key Dates — 2008 Civics Test",
      es: "Todas las fechas clave — Examen cívico 2008",
    },
    description: {
      en: "Practice date and holiday questions from the 2008 (100-question) USCIS civics test.",
      es: "Practicá preguntas de fechas y feriados del examen cívico USCIS 2008 (100 preguntas).",
    },
    lead: {
      en: "For applicants who filed Form N-400 before October 20, 2025. Drill dates, then practice the full 100-question bank.",
      es: "Para solicitantes que presentaron el N-400 antes del 20 de octubre de 2025. Practicá fechas y después el banco completo de 100.",
    },
  },
  {
    slug: "names-2008",
    version: "2008",
    ids: [58, 59, 61, 62, 68, 69, 70, 75, 77, 79, 80, 85],
    title: {
      en: "All Key Names — 2008 Civics Test",
      es: "Todos los nombres clave — Examen cívico 2008",
    },
    description: {
      en: "Practice famous-name questions from the 2008 USCIS civics test — founders, presidents, and leaders.",
      es: "Practicá preguntas de nombres famosos del examen cívico 2008 — fundadores, presidentes y líderes.",
    },
    lead: {
      en: "Focus on the people you must name on the 2008 test. Hear English audio, then run a full interview simulation.",
      es: "Enfocate en las personas que debés nombrar en el examen 2008. Escuchá el audio en inglés y después simulá la entrevista completa.",
    },
  },
  {
    slug: "officials-2008",
    version: "2008",
    ids: [20, 23, 28, 29, 40, 43, 44, 46, 47],
    title: {
      en: "Current Officials — Answers That Change (2008)",
      es: "Oficiales actuales — Respuestas que cambian (2008)",
    },
    description: {
      en: "Practice 2008 civics questions about current federal and state officials that change with elections.",
      es: "Practicá preguntas 2008 sobre oficiales federales y estatales actuales que cambian con las elecciones.",
    },
    lead: {
      en: "Verify who serves now before your interview. Use ZIP lookup in practice for senators and your representative.",
      es: "Verificá quién sirve ahora antes de la entrevista. Usá la búsqueda por ZIP en la práctica para senadores y tu representante.",
    },
  },
];

export function getDrillBySlug(slug: string): DrillDef | undefined {
  return SEO_DRILLS.find((d) => d.slug === slug);
}

export function drillCopy(drill: DrillDef, locale: string) {
  const lang = locale === "es" ? "es" : "en";
  return {
    title: drill.title[lang],
    description: drill.description[lang],
    lead: drill.lead[lang],
  };
}
