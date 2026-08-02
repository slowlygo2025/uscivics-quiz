import Link from "next/link";
import type { Locale, TestVersion } from "@/lib/types";
import type { Dictionary } from "@/lib/dictionary";
import { getQuestionBank, getEnglishQuestion } from "@/lib/questions";
import SeoQuestionList from "@/components/SeoQuestionList";

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

export function QuestionsPageShell({
  dict,
  locale,
  title,
  lead,
  version,
  seniorOnly,
  categoryEn,
  practiceHref,
}: {
  dict: Dictionary;
  locale: Locale;
  title: string;
  lead: string;
  version: TestVersion;
  seniorOnly?: boolean;
  categoryEn?: string;
  practiceHref: string;
}) {
  const questions = categoryEn
    ? getLocalizedByEnglishCategory(version, locale, categoryEn, seniorOnly)
    : getQuestionBank(version, locale, { seniorOnly });
  const englishById = buildEnglishMap(
    version,
    questions.map((q) => q.id)
  );

  return (
    <div className="space-y-8">
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
          href={`/${locale}/eligibility`}
          className="font-semibold text-signal underline-offset-2 hover:underline"
        >
          {dict.startEligibility}
        </Link>
        {" · "}
        <Link
          href={`/${locale}/learn`}
          className="font-semibold text-signal underline-offset-2 hover:underline"
        >
          {dict.navLearn}
        </Link>
      </p>
    </div>
  );
}
