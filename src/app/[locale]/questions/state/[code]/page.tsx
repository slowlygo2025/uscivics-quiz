import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import { LOCALES, isLocale } from "@/lib/locales";
import { SEO_STATE_CODES, isSeoStateCode } from "@/lib/seo-topics";
import { getStateInfo, STATES } from "@/lib/states";
import JsonLd from "@/components/JsonLd";
import { RelatedStudyLinksForPath } from "@/components/RelatedStudyLinks";
import { buildPageMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { absoluteImageUrl, ogForQuestionsLanding } from "@/lib/site-images";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SEO_STATE_CODES.map((code) => ({
      locale,
      code: code.toLowerCase(),
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; code: string }>;
}): Promise<Metadata> {
  const { locale, code } = await params;
  if (!isLocale(locale) || !isSeoStateCode(code.toUpperCase())) return {};
  const st = getStateInfo(code.toUpperCase())!;
  const title =
    locale === "es"
      ? `${st.name}: capital y gobernador para el examen cívico USCIS`
      : `${st.name} Civics Test Answers: Capital ${st.capital}, Governor & ZIP Officials`;
  const description =
    locale === "es"
      ? `Estudiá respuestas USCIS para ${st.name}: capital ${st.capital}, gobernador ${st.governor}, senadores y representante por ZIP. Práctica gratis para la entrevista de naturalización.`
      : `Study USCIS civics answers for ${st.name} — capital ${st.capital}, governor ${st.governor}, senators, and your House representative by ZIP. Free naturalization interview practice.`;
  const og = ogForQuestionsLanding({
    kind: "state",
    stateCode: code,
  });
  return buildPageMetadata({
    locale: locale as Locale,
    path: `/questions/state/${code.toLowerCase()}`,
    title,
    description,
    image: absoluteImageUrl(og.src),
    imageAlt: og.alt,
  });
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ locale: string; code: string }>;
}) {
  const { locale: raw, code: rawCode } = await params;
  if (!isLocale(raw)) notFound();
  const code = rawCode.toUpperCase();
  if (!isSeoStateCode(code)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const st = getStateInfo(code)!;
  const es = locale === "es";

  return (
    <div className="space-y-8">
      <JsonLd
        data={[
          faqJsonLd([
            {
              question: es
                ? `¿Cuál es la capital de ${st.name}?`
                : `What is the capital of ${st.name}?`,
              answer: st.capital,
            },
            {
              question: es
                ? `¿Quién es el gobernador de ${st.name}?`
                : `Who is the governor of ${st.name}?`,
              answer: st.governor,
            },
          ]),
          breadcrumbJsonLd(locale, [
            { name: dict.navQuestions, path: "/questions" },
            {
              name: st.name,
              path: `/questions/state/${code.toLowerCase()}`,
            },
          ]),
        ]}
      />

      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-signal">
          {code}
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {st.name} — {dict.seoStatesHeading}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
          {dict.seoStateLead}
        </p>
      </header>

      <dl className="grid gap-3 sm:grid-cols-2">
        <div className="border border-line bg-surface px-4 py-4">
          <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
            {dict.seoStateCapital}
          </dt>
          <dd className="mt-1 text-lg font-bold text-ink">{st.capital}</dd>
        </div>
        <div className="border border-line bg-surface px-4 py-4">
          <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
            {dict.seoStateGovernor}
          </dt>
          <dd className="mt-1 text-lg font-bold text-ink">{st.governor}</dd>
        </div>
      </dl>

      <section className="max-w-3xl space-y-3 text-base leading-relaxed text-ink-soft">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink">
          {es ? "Respuestas que cambian en tu estado" : "Answers that change in your state"}
        </h2>
        <p>
          {es
            ? `En la entrevista, el oficial puede preguntar la capital (${st.capital}) y el gobernador (${st.governor}) de ${st.name}. También preguntará por tus senadores y tu representante en el Congreso — usá la búsqueda por ZIP en la práctica para estudiar los nombres correctos.`
            : `At the interview, the officer may ask for the capital (${st.capital}) and governor (${st.governor}) of ${st.name}. They will also ask for your U.S. senators and House representative — use ZIP lookup in practice to study the correct names.`}
        </p>
        <p>
          {es
            ? "Los nombres federales (Presidente, Vicepresidente, Speaker, Chief Justice) también pueden cambiar. Revisalos en el hub de práctica cerca de la fecha de tu entrevista."
            : "Federal names (President, Vice President, Speaker, Chief Justice) can also change. Recheck them in the practice hub close to your interview date."}
        </p>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/${locale}/practice/2025`}
          className="gw-btn gw-btn-primary"
        >
          {dict.seoStatePractice}
          <span aria-hidden>→</span>
        </Link>
        <Link
          href={`/${locale}/questions/drill/officials-2025`}
          className="gw-btn gw-btn-ghost"
        >
          {es ? "Drill de oficiales" : "Officials drill"}
        </Link>
        <Link
          href={`/${locale}/questions/all-128`}
          className="gw-btn gw-btn-ghost"
        >
          {dict.seoAll128Title}
        </Link>
      </div>

      <section>
        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink">
          {dict.seoStatesHeading}
        </h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {Object.keys(STATES)
            .sort()
            .map((c) => {
              const info = STATES[c];
              return (
                <li key={c}>
                  <Link
                    href={`/${locale}/questions/state/${c.toLowerCase()}`}
                    className={`block border px-3 py-2.5 text-sm font-semibold underline-offset-2 hover:underline ${
                      c === code
                        ? "border-signal bg-mist text-ink"
                        : "border-line bg-surface text-signal hover:border-signal"
                    }`}
                  >
                    {info.name} ({c})
                  </Link>
                </li>
              );
            })}
        </ul>
      </section>

      <RelatedStudyLinksForPath
        path={`/questions/state/${code.toLowerCase()}`}
        locale={locale}
        dict={dict}
      />
    </div>
  );
}
