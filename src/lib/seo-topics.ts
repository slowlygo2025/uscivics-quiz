import { STATES } from "./states";
import type { Locale, TestVersion } from "./types";

export type TopicDef = {
  slug: string;
  /** Exact category string in EN question banks */
  categoryEn: string;
  version: TestVersion;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

/** SEO topic landings aligned with official USCIS category names. */
export const SEO_TOPICS: TopicDef[] = [
  {
    slug: "american-government",
    categoryEn: "American Government",
    version: "2025",
    title: {
      en: "American Government — 2025 Civics Questions",
      es: "Gobierno de Estados Unidos — Preguntas cívicas 2025",
      zh: "美国政府 — 2025年公民考试题",
      vi: "Chính phủ Hoa Kỳ — Câu hỏi công dân 2025",
      tl: "Pamahalaan ng Amerika — Mga Tanong sa Civics 2025",
      ar: "الحكومة الأمريكية — أسئلة اختبار الجنسية 2025",
      ko: "미국 정부 — 2025 시민권 시험 질문",
      hi: "अमेरिकी सरकार — 2025 नागरिकता परीक्षा प्रश्न",
      ru: "Правительство США — гражданский экзамен 2025",
      ht: "Gouvènman Ameriken — Kesyon Sivik 2025",
      fr: "Gouvernement américain — Questions civiques 2025",
    },
    description: {
      en: "Practice USCIS American Government questions from the 2025 (128-question) civics test.",
      es: "Practicá las preguntas de Gobierno de USCIS del examen cívico 2025 (128 preguntas).",
      zh: "练习2025年（128题）公民考试中美国政府相关的USCIS题目。",
      vi: "Luyện tập các câu hỏi về Chính phủ Hoa Kỳ của USCIS trong bài thi công dân 2025 (128 câu).",
      tl: "Mag-ensayo ng mga tanong tungkol sa Pamahalaan ng Amerika mula sa USCIS civics test 2025 (128 tanong).",
      ar: "تدرّب على أسئلة الحكومة الأمريكية من اختبار الجنسية USCIS لعام 2025 (128 سؤالاً).",
      ko: "2025년(128문항) 시민권 시험의 미국 정부 관련 USCIS 문제를 연습하세요.",
      hi: "2025 (128-प्रश्न) नागरिकता परीक्षा के अमेरिकी सरकार से जुड़े USCIS प्रश्नों का अभ्यास करें।",
      ru: "Практикуйте вопросы USCIS о правительстве США из гражданского экзамена 2025 года (128 вопросов).",
      ht: "Pratike kesyon USCIS sou Gouvènman Ameriken nan tès sivik 2025 la (128 kesyon).",
      fr: "Entraînez-vous sur les questions USCIS sur le gouvernement américain de l'examen civique 2025 (128 questions).",
    },
  },
  {
    slug: "american-history",
    categoryEn: "American History",
    version: "2025",
    title: {
      en: "American History — 2025 Civics Questions",
      es: "Historia de Estados Unidos — Preguntas cívicas 2025",
      zh: "美国历史 — 2025年公民考试题",
      vi: "Lịch sử Hoa Kỳ — Câu hỏi công dân 2025",
      tl: "Kasaysayan ng Amerika — Mga Tanong sa Civics 2025",
      ar: "التاريخ الأمريكي — أسئلة اختبار الجنسية 2025",
      ko: "미국 역사 — 2025 시민권 시험 질문",
      hi: "अमेरिकी इतिहास — 2025 नागरिकता परीक्षा प्रश्न",
      ru: "История США — гражданский экзамен 2025",
      ht: "Istwa Ameriken — Kesyon Sivik 2025",
      fr: "Histoire américaine — Questions civiques 2025",
    },
    description: {
      en: "Practice USCIS American History questions from the 2025 (128-question) civics test.",
      es: "Practicá las preguntas de Historia de EE. UU. de USCIS del examen cívico 2025 (128 preguntas).",
      zh: "练习2025年（128题）公民考试中美国历史相关的USCIS题目。",
      vi: "Luyện tập các câu hỏi về Lịch sử Hoa Kỳ của USCIS trong bài thi công dân 2025 (128 câu).",
      tl: "Mag-ensayo ng mga tanong tungkol sa Kasaysayan ng Amerika mula sa USCIS civics test 2025 (128 tanong).",
      ar: "تدرّب على أسئلة التاريخ الأمريكي من اختبار الجنسية USCIS لعام 2025 (128 سؤالاً).",
      ko: "2025년(128문항) 시민권 시험의 미국 역사 관련 USCIS 문제를 연습하세요.",
      hi: "2025 (128-प्रश्न) नागरिकता परीक्षा के अमेरिकी इतिहास से जुड़े USCIS प्रश्नों का अभ्यास करें।",
      ru: "Практикуйте вопросы USCIS об истории США из гражданского экзамена 2025 года (128 вопросов).",
      ht: "Pratike kesyon USCIS sou Istwa Ameriken nan tès sivik 2025 la (128 kesyon).",
      fr: "Entraînez-vous sur les questions USCIS sur l'histoire américaine de l'examen civique 2025 (128 questions).",
    },
  },
  {
    slug: "symbols-and-holidays",
    categoryEn: "Symbols and Holidays",
    version: "2025",
    title: {
      en: "Symbols and Holidays — 2025 Civics Questions",
      es: "Símbolos y feriados — Preguntas cívicas 2025",
      zh: "象征与节日 — 2025年公民考试题",
      vi: "Biểu tượng và Ngày lễ — Câu hỏi công dân 2025",
      tl: "Mga Simbolo at Pista Opisyal — Mga Tanong sa Civics 2025",
      ar: "الرموز والأعياد — أسئلة اختبار الجنسية 2025",
      ko: "상징과 공휴일 — 2025 시민권 시험 질문",
      hi: "प्रतीक और छुट्टियाँ — 2025 नागरिकता परीक्षा प्रश्न",
      ru: "Символы и праздники — гражданский экзамен 2025",
      ht: "Senbòl ak Jou Ferye — Kesyon Sivik 2025",
      fr: "Symboles et jours fériés — Questions civiques 2025",
    },
    description: {
      en: "Practice USCIS Symbols and Holidays questions from the 2025 civics test.",
      es: "Practicá las preguntas de Símbolos y feriados de USCIS del examen cívico 2025.",
      zh: "练习2025年公民考试中象征与节日相关的USCIS题目。",
      vi: "Luyện tập các câu hỏi về Biểu tượng và Ngày lễ của USCIS trong bài thi công dân 2025.",
      tl: "Mag-ensayo ng mga tanong tungkol sa Mga Simbolo at Pista Opisyal mula sa USCIS civics test 2025.",
      ar: "تدرّب على أسئلة الرموز والأعياد من اختبار الجنسية USCIS لعام 2025.",
      ko: "2025년 시민권 시험의 상징과 공휴일 관련 USCIS 문제를 연습하세요.",
      hi: "2025 नागरिकता परीक्षा के प्रतीकों और छुट्टियों से जुड़े USCIS प्रश्नों का अभ्यास करें।",
      ru: "Практикуйте вопросы USCIS о символах и праздниках из гражданского экзамена 2025 года.",
      ht: "Pratike kesyon USCIS sou Senbòl ak Jou Ferye nan tès sivik 2025 la.",
      fr: "Entraînez-vous sur les questions USCIS sur les symboles et les jours fériés de l'examen civique 2025.",
    },
  },
  {
    slug: "american-government-2008",
    categoryEn: "American Government",
    version: "2008",
    title: {
      en: "American Government — 2008 Civics Questions",
      es: "Gobierno de Estados Unidos — Preguntas cívicas 2008",
      zh: "美国政府 — 2008年公民考试题",
      vi: "Chính phủ Hoa Kỳ — Câu hỏi công dân 2008",
      tl: "Pamahalaan ng Amerika — Mga Tanong sa Civics 2008",
      ar: "الحكومة الأمريكية — أسئلة اختبار الجنسية 2008",
      ko: "미국 정부 — 2008 시민권 시험 질문",
      hi: "अमेरिकी सरकार — 2008 नागरिकता परीक्षा प्रश्न",
      ru: "Правительство США — гражданский экзамен 2008",
      ht: "Gouvènman Ameriken — Kesyon Sivik 2008",
      fr: "Gouvernement américain — Questions civiques 2008",
    },
    description: {
      en: "Practice American Government questions from the 2008 (100-question) civics test.",
      es: "Practicá preguntas de Gobierno de EE. UU. del examen cívico 2008 (100 preguntas).",
      zh: "练习2008年（100题）公民考试中的美国政府题目。",
      vi: "Luyện tập các câu hỏi về Chính phủ Hoa Kỳ trong bài thi công dân 2008 (100 câu).",
      tl: "Mag-ensayo ng mga tanong tungkol sa Pamahalaan ng Amerika mula sa civics test 2008 (100 tanong).",
      ar: "تدرّب على أسئلة الحكومة الأمريكية من اختبار الجنسية لعام 2008 (100 سؤال).",
      ko: "2008년(100문항) 시민권 시험의 미국 정부 문제를 연습하세요.",
      hi: "2008 (100-प्रश्न) नागरिकता परीक्षा के अमेरिकी सरकार प्रश्नों का अभ्यास करें।",
      ru: "Практикуйте вопросы о правительстве США из гражданского экзамена 2008 года (100 вопросов).",
      ht: "Pratike kesyon sou Gouvènman Ameriken nan tès sivik 2008 la (100 kesyon).",
      fr: "Entraînez-vous sur les questions sur le gouvernement américain de l'examen civique 2008 (100 questions).",
    },
  },
  {
    slug: "american-history-2008",
    categoryEn: "American History",
    version: "2008",
    title: {
      en: "American History — 2008 Civics Questions",
      es: "Historia de Estados Unidos — Preguntas cívicas 2008",
      zh: "美国历史 — 2008年公民考试题",
      vi: "Lịch sử Hoa Kỳ — Câu hỏi công dân 2008",
      tl: "Kasaysayan ng Amerika — Mga Tanong sa Civics 2008",
      ar: "التاريخ الأمريكي — أسئلة اختبار الجنسية 2008",
      ko: "미국 역사 — 2008 시민권 시험 질문",
      hi: "अमेरिकी इतिहास — 2008 नागरिकता परीक्षा प्रश्न",
      ru: "История США — гражданский экзамен 2008",
      ht: "Istwa Ameriken — Kesyon Sivik 2008",
      fr: "Histoire américaine — Questions civiques 2008",
    },
    description: {
      en: "Practice American History questions from the 2008 (100-question) civics test.",
      es: "Practicá preguntas de Historia de EE. UU. del examen cívico 2008 (100 preguntas).",
      zh: "练习2008年（100题）公民考试中的美国历史题目。",
      vi: "Luyện tập các câu hỏi về Lịch sử Hoa Kỳ trong bài thi công dân 2008 (100 câu).",
      tl: "Mag-ensayo ng mga tanong tungkol sa Kasaysayan ng Amerika mula sa civics test 2008 (100 tanong).",
      ar: "تدرّب على أسئلة التاريخ الأمريكي من اختبار الجنسية لعام 2008 (100 سؤال).",
      ko: "2008년(100문항) 시민권 시험의 미국 역사 문제를 연습하세요.",
      hi: "2008 (100-प्रश्न) नागरिकता परीक्षा के अमेरिकी इतिहास प्रश्नों का अभ्यास करें।",
      ru: "Практикуйте вопросы об истории США из гражданского экзамена 2008 года (100 вопросов).",
      ht: "Pratike kesyon sou Istwa Ameriken nan tès sivik 2008 la (100 kesyon).",
      fr: "Entraînez-vous sur les questions sur l'histoire américaine de l'examen civique 2008 (100 questions).",
    },
  },
  {
    slug: "integrated-civics-2008",
    categoryEn: "Integrated Civics",
    version: "2008",
    title: {
      en: "Integrated Civics — 2008 Civics Questions",
      es: "Civismo integrado — Preguntas cívicas 2008",
      zh: "综合公民常识 — 2008年公民考试题",
      vi: "Công dân tổng hợp — Câu hỏi công dân 2008",
      tl: "Integrated Civics — Mga Tanong sa Civics 2008",
      ar: "المدنيات المتكاملة — أسئلة اختبار الجنسية 2008",
      ko: "통합 시민학 — 2008 시민권 시험 질문",
      hi: "एकीकृत नागरिकशास्त्र — 2008 नागरिकता परीक्षा प्रश्न",
      ru: "Интегрированное обществознание — гражданский экзамен 2008",
      ht: "Sivik Entegre — Kesyon Sivik 2008",
      fr: "Civisme intégré — Questions civiques 2008",
    },
    description: {
      en: "Practice Integrated Civics questions from the 2008 (100-question) civics test.",
      es: "Practicá preguntas de Civismo integrado del examen cívico 2008 (100 preguntas).",
      zh: "练习2008年（100题）公民考试中的综合公民常识题目。",
      vi: "Luyện tập các câu hỏi Công dân tổng hợp trong bài thi công dân 2008 (100 câu).",
      tl: "Mag-ensayo ng mga tanong sa Integrated Civics mula sa civics test 2008 (100 tanong).",
      ar: "تدرّب على أسئلة المدنيات المتكاملة من اختبار الجنسية لعام 2008 (100 سؤال).",
      ko: "2008년(100문항) 시민권 시험의 통합 시민학 문제를 연습하세요.",
      hi: "2008 (100-प्रश्न) नागरिकता परीक्षा के एकीकृत नागरिकशास्त्र प्रश्नों का अभ्यास करें।",
      ru: "Практикуйте вопросы по интегрированному обществознанию из гражданского экзамена 2008 года (100 вопросов).",
      ht: "Pratike kesyon Sivik Entegre nan tès sivik 2008 la (100 kesyon).",
      fr: "Entraînez-vous sur les questions de civisme intégré de l'examen civique 2008 (100 questions).",
    },
  },
];

/** All U.S. states + DC for SEO state landings. */
export const SEO_STATE_CODES = Object.keys(STATES).sort() as string[];

export type SeoStateCode = string;

export function getTopicBySlug(slug: string): TopicDef | undefined {
  return SEO_TOPICS.find((t) => t.slug === slug);
}

export function isSeoStateCode(code: string): boolean {
  return Object.prototype.hasOwnProperty.call(STATES, code.toUpperCase());
}

export function topicCopy(topic: TopicDef, locale: string) {
  const lang = (locale in topic.title ? locale : "en") as Locale;
  return {
    title: topic.title[lang] ?? topic.title.en,
    description: topic.description[lang] ?? topic.description.en,
  };
}
