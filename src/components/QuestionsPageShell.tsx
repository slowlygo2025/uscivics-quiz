import Link from "next/link";
import type { Locale, TestVersion, CivicsQuestion } from "@/lib/types";
import type { Dictionary } from "@/lib/dictionary";
import { getQuestionBank, getEnglishQuestion } from "@/lib/questions";
import SeoQuestionList from "@/components/SeoQuestionList";
import JsonLd from "@/components/JsonLd";
import { RelatedStudyLinksForPath } from "@/components/RelatedStudyLinks";
import TrustDiffStrip from "@/components/TrustDiffStrip";
import { faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export function buildEnglishMap(
  version: TestVersion,
  ids: number[]
): Record<number, { question: string; answers: string[] }> {
  const map: Record<number, { question: string; answers: string[] }> = {};
  for (const id of ids) {
    const en = getEnglishQuestion(version, id);
    if (en) map[id] = { question: en.question, answers: en.answers };
  }
  return map;
}

/** Filter localized bank using English category names (stable across locales). */
export function getLocalizedByEnglishCategory(
  version: TestVersion,
  locale: Locale,
  categoryEn: string,
  seniorOnly?: boolean
) {
  const enIds = new Set(
    getQuestionBank(version, "en", {
      category: categoryEn,
      seniorOnly,
    }).map((q) => q.id)
  );
  return getQuestionBank(version, locale, { seniorOnly }).filter((q) =>
    enIds.has(q.id)
  );
}

export function getLocalizedByIds(
  version: TestVersion,
  locale: Locale,
  ids: number[]
): CivicsQuestion[] {
  const want = new Set(ids);
  const order = new Map(ids.map((id, i) => [id, i]));
  return getQuestionBank(version, locale)
    .filter((q) => want.has(q.id))
    .sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
}

export function QuestionsPageShell({
  dict,
  locale,
  title,
  lead,
  version,
  seniorOnly,
  categoryEn,
  questionIds,
  practiceHref,
  path,
}: {
  dict: Dictionary;
  locale: Locale;
  title: string;
  lead: string;
  version: TestVersion;
  seniorOnly?: boolean;
  categoryEn?: string;
  questionIds?: number[];
  practiceHref: string;
  /** Locale-relative path for JSON-LD breadcrumbs */
  path?: string;
}) {
  const questions = questionIds
    ? getLocalizedByIds(version, locale, questionIds)
    : categoryEn
      ? getLocalizedByEnglishCategory(version, locale, categoryEn, seniorOnly)
      : getQuestionBank(version, locale, { seniorOnly });
  const englishById = buildEnglishMap(
    version,
    questions.map((q) => q.id)
  );

  const faqItems = questions.slice(0, 24).map((q) => {
    const en = englishById[q.id];
    return {
      question: en?.question ?? q.question,
      answer: (en?.answers ?? q.answers).join("; "),
    };
  });

  return (
    <div className="space-y-8">
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          ...(path
            ? [
                breadcrumbJsonLd(locale, [
                  { name: dict.navQuestions, path: "/questions" },
                  { name: title, path },
                ]),
              ]
            : []),
        ]}
      />
      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-signal">
          {version === "2025" ? dict.seoBadge2025 : dict.seoBadge2008}
          {seniorOnly ? " · 65/20" : ""}
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
          {lead}
        </p>
        <p className="mt-2 text-sm text-muted">
          {questions.length} {dict.seoQuestionsCount}
        </p>
        <TrustDiffStrip dict={dict} variant="compact" />
        <p className="mt-4">
          <Link
            href={practiceHref}
            className="gw-btn inline-flex"
          >
            {dict.startInSecondsCta}
            <span aria-hidden>→</span>
          </Link>
        </p>
      </header>

      <SeoQuestionList
        questions={questions}
        englishById={englishById}
        dict={dict}
        practiceHref={practiceHref}
        locale={locale}
      />

      <p className="text-sm text-muted">
        <Link
          href={practiceHref}
          className="font-semibold text-signal underline-offset-2 hover:underline"
        >
          {dict.seoStartPractice}
        </Link>
        {" · "}
        <Link
          href={`/${locale}/eligibility`}
          className="font-semibold text-signal underline-offset-2 hover:underline"
        >
          {dict.startEligibility}
        </Link>
        {" · "}
        <Link
          href={`/${locale}/updates`}
          className="font-semibold text-signal underline-offset-2 hover:underline"
        >
          {dict.navUpdates}
        </Link>
        {" · "}
        <Link
          href={`/${locale}/questions`}
          className="font-semibold text-signal underline-offset-2 hover:underline"
        >
          {dict.seoAllLandings}
        </Link>
        {" · "}
        <Link
          href={`/${locale}/learn`}
          className="font-semibold text-signal underline-offset-2 hover:underline"
        >
          {dict.navLearn}
        </Link>
      </p>
      {path ? (
        <RelatedStudyLinksForPath path={path} locale={locale} dict={dict} />
      ) : null}
    </div>
  );
}
