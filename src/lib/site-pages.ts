import type { Locale } from "./types";

export type SitePageSection = { heading: string; body: string };

export type SitePage = {
  slug: "about" | "contact" | "privacy" | "terms";
  title: Record<"en" | "es", string>;
  description: Record<"en" | "es", string>;
  sections: Record<"en" | "es", SitePageSection[]>;
};

const CONTACT_EMAIL = "contact@uscivics-quiz.com";

export const SITE_PAGES: SitePage[] = [
  {
    slug: "about",
    title: {
      en: "About USCivics Quiz",
      es: "Acerca de USCivics Quiz",
    },
    description: {
      en: "USCivics Quiz is an independent, free study tool for the USCIS naturalization civics and English tests.",
      es: "USCivics Quiz es una herramienta independiente y gratuita para estudiar el examen cívico e inglés de naturalización USCIS.",
    },
    sections: {
      en: [
        {
          heading: "Our mission",
          body: "We help immigrants prepare for the U.S. naturalization interview with free practice for the official civics questions (2008 and 2025 versions), English reading and writing vocabulary, oral practice, and interview simulation — without requiring an account.",
        },
        {
          heading: "Independent study tool",
          body: "USCivics Quiz is not affiliated with, endorsed by, or sponsored by U.S. Citizenship and Immigration Services (USCIS), the Department of Homeland Security, or any U.S. government agency. Official rules and materials are published by the U.S. government; we provide practice tools based on publicly available study content.",
        },
        {
          heading: "What we offer",
          body: "Practice hubs for the 100- and 128-question civics banks, 65/20 starred sets, topic and state landings, free audio (text-to-speech), English reading/writing drills, eligibility guidance for choosing a test version, and short study guides. Progress can be saved locally in your browser.",
        },
        {
          heading: "Not legal advice",
          body: "Nothing on this site is legal advice or a substitute for official government guidance or a qualified immigration attorney. Always confirm requirements for your own case before filing or attending an interview.",
        },
      ],
      es: [
        {
          heading: "Nuestra misión",
          body: "Ayudamos a inmigrantes a prepararse para la entrevista de naturalización con práctica gratis de las preguntas cívicas oficiales (versiones 2008 y 2025), vocabulario de reading y writing, práctica oral y simulación de entrevista — sin crear una cuenta.",
        },
        {
          heading: "Herramienta independiente",
          body: "USCivics Quiz no está afiliado, respaldado ni patrocinado por U.S. Citizenship and Immigration Services (USCIS), el Department of Homeland Security ni ninguna agencia del gobierno de EE.UU. Las reglas y materiales oficiales los publica el gobierno; nosotros ofrecemos herramientas de práctica basadas en contenido público de estudio.",
        },
        {
          heading: "Qué ofrecemos",
          body: "Hubs de práctica para los bancos de 100 y 128 preguntas, sets 65/20, landings por tema y estado, audio gratis (síntesis de voz), drills de inglés, guía de elegibilidad para elegir versión, y guías cortas. El progreso puede guardarse en el navegador.",
        },
        {
          heading: "No es asesoría legal",
          body: "Nada en este sitio es asesoría legal ni reemplaza la guía oficial del gobierno o a un abogado de inmigración calificado. Confirmá siempre los requisitos de tu caso antes de presentar papeles o ir a la entrevista.",
        },
      ],
    },
  },
  {
    slug: "contact",
    title: {
      en: "Contact",
      es: "Contacto",
    },
    description: {
      en: "How to reach the USCivics Quiz team for feedback, corrections, or partnership questions.",
      es: "Cómo contactar al equipo de USCivics Quiz para comentarios, correcciones o consultas.",
    },
    sections: {
      en: [
        {
          heading: "Email",
          body: `For feedback, content corrections, privacy requests, or partnership questions, email us at ${CONTACT_EMAIL}. We read every message and typically respond within a few business days.`,
        },
        {
          heading: "What to include",
          body: "Please include your browser/device if you are reporting a bug, the page URL, and a short description. For quiz content issues, note the test version (2008 or 2025) and question number when possible.",
        },
        {
          heading: "Case status and legal help",
          body: "We cannot check USCIS case status, file forms for you, or give legal advice. For official case tools and policy, use government channels or consult a licensed attorney or accredited representative.",
        },
      ],
      es: [
        {
          heading: "Email",
          body: `Para comentarios, correcciones de contenido, solicitudes de privacidad o consultas, escribinos a ${CONTACT_EMAIL}. Leemos todos los mensajes y solemos responder en unos días hábiles.`,
        },
        {
          heading: "Qué incluir",
          body: "Si reportás un error, incluí navegador/dispositivo, la URL de la página y una descripción breve. Para problemas de contenido, indicá la versión del examen (2008 o 2025) y el número de pregunta si podés.",
        },
        {
          heading: "Estado de caso y ayuda legal",
          body: "No podemos consultar el estado de tu caso USCIS, presentar formularios por vos ni dar asesoría legal. Para herramientas oficiales y política, usá canales del gobierno o consultá a un abogado o representante acreditado.",
        },
      ],
    },
  },
  {
    slug: "privacy",
    title: {
      en: "Privacy Policy",
      es: "Política de privacidad",
    },
    description: {
      en: "How USCivics Quiz collects, uses, and shares information when you use uscivics-quiz.com.",
      es: "Cómo USCivics Quiz recopila, usa y comparte información cuando usás uscivics-quiz.com.",
    },
    sections: {
      en: [
        {
          heading: "Overview",
          body: "USCivics Quiz (“we”, “us”) operates https://uscivics-quiz.com. This policy explains what information we process when you use the site. Last updated: August 2, 2026.",
        },
        {
          heading: "Information you provide",
          body: "You can use the site without creating an account. If you email us, we receive the address and message content you send. Optional inputs such as a ZIP code used for officials lookup are processed to return study results and are not used to build a marketing profile.",
        },
        {
          heading: "Information stored on your device",
          body: "We may store preferences and study progress in your browser (for example localStorage for quiz progress, theme, language, or ZIP). This data stays on your device unless you clear site data. We do not require login to save local progress.",
        },
        {
          heading: "Automatically collected data",
          body: "Like most websites, servers and analytics may process technical data such as IP address, browser type, device type, pages viewed, approximate location derived from IP, and referring URLs. We use this to operate, secure, and improve the site.",
        },
        {
          heading: "Analytics",
          body: "We may use Firebase Analytics (Google) to understand aggregated usage (for example which pages are popular). Google may process data under its own terms and privacy policy. You can use browser controls or opt-out tools where available.",
        },
        {
          heading: "Advertising",
          body: "If you choose Accept all on our cookie banner, we may show third-party ads (including Monetag / related ad networks). Ad partners may use cookies, pixels, or similar technologies to deliver and measure ads. Their practices are governed by their own policies. Choosing Essential only keeps the study tools working without loading our advertising scripts.",
        },
        {
          heading: "Cookies and similar technologies",
          body: "We use cookies or similar storage for essentials such as language preference, and for analytics/advertising as described above. On first visit we show a cookie banner so you can Accept all (ads + analytics) or Essential only. You can reopen Cookie settings anytime from the floating control. You can also control cookies through your browser settings; disabling some cookies may affect features.",
        },
        {
          heading: "How we use information",
          body: "We use information to provide study tools, remember preferences, measure performance, prevent abuse, communicate when you contact us, and show ads that help keep the service free.",
        },
        {
          heading: "Sharing",
          body: "We share data with service providers who help us run the site (hosting such as Vercel, analytics, advertising). We do not sell your email as a standalone product. We may disclose information if required by law or to protect rights, safety, and security.",
        },
        {
          heading: "Children",
          body: "The site is intended for adults preparing for naturalization and similar learners. We do not knowingly collect personal information from children under 13. Contact us if you believe a child provided personal information.",
        },
        {
          heading: "International visitors",
          body: "The site may be hosted and processed in the United States or other countries. If you access it from elsewhere, you understand information may be transferred to and processed in those locations.",
        },
        {
          heading: "Your choices and requests",
          body: `You may clear local site data in your browser, block cookies, or email ${CONTACT_EMAIL} for privacy-related questions. Because we do not require accounts, we may have limited personal data beyond what you email us or what providers store in logs/analytics.`,
        },
        {
          heading: "Changes",
          body: "We may update this policy from time to time. The “Last updated” date will change when we do. Continued use of the site after changes means you accept the updated policy.",
        },
      ],
      es: [
        {
          heading: "Resumen",
          body: "USCivics Quiz (“nosotros”) opera https://uscivics-quiz.com. Esta política explica qué información procesamos cuando usás el sitio. Última actualización: 2 de agosto de 2026.",
        },
        {
          heading: "Información que nos das",
          body: "Podés usar el sitio sin crear una cuenta. Si nos escribís por email, recibimos la dirección y el contenido del mensaje. Datos opcionales como un ZIP para buscar oficiales se usan para devolver resultados de estudio y no para armar un perfil de marketing.",
        },
        {
          heading: "Información en tu dispositivo",
          body: "Podemos guardar preferencias y progreso en tu navegador (por ejemplo localStorage para progreso, tema, idioma o ZIP). Esos datos quedan en tu dispositivo salvo que borres los datos del sitio. No hace falta iniciar sesión para guardar progreso local.",
        },
        {
          heading: "Datos automáticos",
          body: "Como la mayoría de los sitios, servidores y analítica pueden procesar datos técnicos como IP, tipo de navegador, dispositivo, páginas vistas, ubicación aproximada por IP y URL de referencia. Los usamos para operar, asegurar y mejorar el sitio.",
        },
        {
          heading: "Analítica",
          body: "Podemos usar Firebase Analytics (Google) para entender el uso agregado. Google puede procesar datos bajo sus propios términos y política de privacidad. Podés usar controles del navegador u opt-outs cuando estén disponibles.",
        },
        {
          heading: "Publicidad",
          body: "Si elegís Aceptar todo en el banner de cookies, podemos mostrar anuncios de terceros (incluido Monetag / redes relacionadas). Los socios publicitarios pueden usar cookies, píxeles o tecnologías similares. Sus prácticas se rigen por sus políticas. Si elegís Solo esenciales, las herramientas de estudio siguen funcionando sin cargar nuestros scripts de publicidad.",
        },
        {
          heading: "Cookies",
          body: "Usamos cookies o almacenamiento similar para lo esencial (por ejemplo idioma) y para analítica/publicidad como se describe arriba. En la primera visita mostramos un banner para Aceptar todo (anuncios + analítica) o Solo esenciales. Podés reabrir Configurar cookies en cualquier momento. También podés controlar cookies en el navegador; desactivar algunas puede afectar funciones.",
        },
        {
          heading: "Cómo usamos la información",
          body: "Usamos la información para ofrecer herramientas de estudio, recordar preferencias, medir rendimiento, prevenir abuso, responder cuando nos contactás y mostrar anuncios que ayudan a mantener el servicio gratis.",
        },
        {
          heading: "Compartir",
          body: "Compartimos datos con proveedores que ayudan a operar el sitio (hosting como Vercel, analítica, publicidad). No vendemos tu email como producto. Podemos divulgar información si la ley lo exige o para proteger derechos, seguridad e integridad.",
        },
        {
          heading: "Menores",
          body: "El sitio está pensado para adultos que se preparan para naturalización y aprendices similares. No recopilamos a sabiendas datos de menores de 13 años. Contactanos si creés que un menor envió información personal.",
        },
        {
          heading: "Visitantes internacionales",
          body: "El sitio puede alojarse y procesarse en Estados Unidos u otros países. Si accedés desde otro lugar, entendés que la información puede transferirse y procesarse allí.",
        },
        {
          heading: "Tus opciones",
          body: `Podés borrar datos del sitio en el navegador, bloquear cookies o escribir a ${CONTACT_EMAIL} por temas de privacidad. Como no exigimos cuentas, podemos tener pocos datos personales más allá de lo que nos envíes por email o lo que guarden logs/analítica de proveedores.`,
        },
        {
          heading: "Cambios",
          body: "Podemos actualizar esta política. La fecha de “Última actualización” cambiará cuando lo hagamos. Seguir usando el sitio implica aceptar la política actualizada.",
        },
      ],
    },
  },
  {
    slug: "terms",
    title: {
      en: "Terms of Service",
      es: "Términos de servicio",
    },
    description: {
      en: "Terms that govern your use of USCivics Quiz and uscivics-quiz.com.",
      es: "Términos que rigen el uso de USCivics Quiz y uscivics-quiz.com.",
    },
    sections: {
      en: [
        {
          heading: "Agreement",
          body: "By using https://uscivics-quiz.com (the “Site”), you agree to these Terms of Service. If you do not agree, do not use the Site. Last updated: August 2, 2026.",
        },
        {
          heading: "What the Site is",
          body: "USCivics Quiz provides educational practice tools related to the U.S. naturalization civics and English tests. It is an independent study aid, not a government website and not a law firm.",
        },
        {
          heading: "No affiliation",
          body: "The Site is not affiliated with, endorsed by, or sponsored by USCIS, DHS, or any U.S. government agency. Names and trademarks of third parties are referenced only for identification and study purposes.",
        },
        {
          heading: "No legal advice",
          body: "Content on the Site is for general educational purposes only and is not legal advice. Immigration outcomes depend on your facts and current law/policy. Consult official sources or a qualified attorney for advice about your case.",
        },
        {
          heading: "Accuracy of study content",
          body: "We aim to keep practice questions and officials information current, including automated updates where available. Government materials and elections can change. You are responsible for verifying answers and rules before your interview.",
        },
        {
          heading: "Acceptable use",
          body: "You agree not to misuse the Site: no attempting to break security, scrape in a way that harms service availability, reverse engineer beyond what the law allows, spam, or use the Site for unlawful purposes.",
        },
        {
          heading: "Accounts and local data",
          body: "An account is not required. Local progress stored in your browser may be lost if you clear data or switch devices. We are not responsible for lost local progress.",
        },
        {
          heading: "Advertising and third parties",
          body: "The Site may display third-party advertisements and link to third-party services. We are not responsible for third-party content, privacy practices, or availability.",
        },
        {
          heading: "Intellectual property",
          body: "Site design, branding, and original materials are owned by us or our licensors. Official USCIS question text is used for educational practice based on publicly available study materials. You may not copy the Site wholesale for commercial redistribution without permission.",
        },
        {
          heading: "Disclaimer of warranties",
          body: "THE SITE IS PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. We do not warrant that practice will guarantee a passing interview score.",
        },
        {
          heading: "Limitation of liability",
          body: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF DATA, PROFITS, OR OPPORTUNITY ARISING FROM YOUR USE OF THE SITE. OUR TOTAL LIABILITY FOR ANY CLAIM RELATED TO THE SITE IS LIMITED TO FIFTY U.S. DOLLARS (US $50).",
        },
        {
          heading: "Indemnity",
          body: "You agree to indemnify and hold us harmless from claims arising out of your misuse of the Site or violation of these Terms.",
        },
        {
          heading: "Changes",
          body: "We may update the Site and these Terms. Continued use after changes constitutes acceptance. We may suspend or discontinue the Site at any time.",
        },
        {
          heading: "Contact",
          body: `Questions about these Terms: ${CONTACT_EMAIL}.`,
        },
      ],
      es: [
        {
          heading: "Acuerdo",
          body: "Al usar https://uscivics-quiz.com (el “Sitio”), aceptás estos Términos de servicio. Si no estás de acuerdo, no uses el Sitio. Última actualización: 2 de agosto de 2026.",
        },
        {
          heading: "Qué es el Sitio",
          body: "USCivics Quiz ofrece herramientas educativas de práctica relacionadas con los exámenes de civismo e inglés de naturalización de EE.UU. Es una ayuda de estudio independiente, no un sitio gubernamental ni un estudio jurídico.",
        },
        {
          heading: "Sin afiliación",
          body: "El Sitio no está afiliado, respaldado ni patrocinado por USCIS, DHS ni ninguna agencia del gobierno de EE.UU. Nombres y marcas de terceros se mencionan solo para identificación y estudio.",
        },
        {
          heading: "Sin asesoría legal",
          body: "El contenido es solo educativo y general; no es asesoría legal. Los resultados migratorios dependen de tus hechos y de la ley/política vigente. Consultá fuentes oficiales o un abogado calificado para tu caso.",
        },
        {
          heading: "Exactitud del contenido",
          body: "Buscamos mantener actualizadas las preguntas y la información de oficiales, incluso con actualizaciones automáticas cuando sea posible. Los materiales del gobierno y las elecciones pueden cambiar. Vos sos responsable de verificar respuestas y reglas antes de la entrevista.",
        },
        {
          heading: "Uso aceptable",
          body: "Te comprometés a no abusar del Sitio: no intentar romper la seguridad, no hacer scraping que dañe la disponibilidad, no usar el Sitio con fines ilegales ni enviar spam.",
        },
        {
          heading: "Cuentas y datos locales",
          body: "No se requiere cuenta. El progreso local en el navegador puede perderse si borrás datos o cambiás de dispositivo. No somos responsables por progreso local perdido.",
        },
        {
          heading: "Publicidad y terceros",
          body: "El Sitio puede mostrar anuncios de terceros y enlazar servicios de terceros. No somos responsables del contenido, privacidad o disponibilidad de terceros.",
        },
        {
          heading: "Propiedad intelectual",
          body: "El diseño, marca y materiales originales del Sitio nos pertenecen o a nuestros licenciantes. El texto de preguntas oficiales USCIS se usa con fines educativos a partir de materiales públicos. No podés copiar el Sitio completo para redistribución comercial sin permiso.",
        },
        {
          heading: "Descargo de garantías",
          body: "EL SITIO SE OFRECE “TAL CUAL” Y “SEGÚN DISPONIBILIDAD”, SIN GARANTÍAS DE NINGÚN TIPO. No garantizamos que la práctica asegure aprobar la entrevista.",
        },
        {
          heading: "Límite de responsabilidad",
          body: "EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY, NO SOMOS RESPONSABLES POR DAÑOS INDIRECTOS, INCIDENTALES, ESPECIALES O CONSECUENTES, NI POR PÉRDIDA DE DATOS O OPORTUNIDADES DERIVADAS DEL USO DEL SITIO. NUESTRA RESPONSABILIDAD TOTAL POR CUALQUIER RECLAMO RELACIONADO CON EL SITIO SE LIMITA A CINCUENTA DÓLARES ESTADOUNIDENSES (US $50).",
        },
        {
          heading: "Indemnidad",
          body: "Aceptás indemnizarnos frente a reclamos derivados de tu mal uso del Sitio o de violar estos Términos.",
        },
        {
          heading: "Cambios",
          body: "Podemos actualizar el Sitio y estos Términos. El uso continuado implica aceptación. Podemos suspender o discontinuar el Sitio en cualquier momento.",
        },
        {
          heading: "Contacto",
          body: `Consultas sobre estos Términos: ${CONTACT_EMAIL}.`,
        },
      ],
    },
  },
];

export const CONTACT_EMAIL_EXPORT = CONTACT_EMAIL;

export function getSitePage(slug: string): SitePage | undefined {
  return SITE_PAGES.find((p) => p.slug === slug);
}

export function pageCopy(page: SitePage, locale: Locale) {
  const lang = locale === "es" ? "es" : "en";
  return {
    title: page.title[lang],
    description: page.description[lang],
    sections: page.sections[lang],
  };
}
