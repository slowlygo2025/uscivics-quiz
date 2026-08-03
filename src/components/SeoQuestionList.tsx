"use client";

import Link from "next/link";
import type { CivicsQuestion } from "@/lib/types";
import type { Dictionary } from "@/lib/dictionary";
import SpeakButton from "@/components/SpeakButton";
import { TTS_LANG } from "@/lib/locales";

export default function SeoQuestionList({
  questions,
  englishById,
  dict,
  practiceHref,
  locale,
}: {
  questions: CivicsQuestion[];
  /** English text for TTS (interview language). */
  englishById: Record<number, { question: string; answers: string[] }>;
  dict: Dictionary;
  practiceHref: string;
  locale: string;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <Link
          href={practiceHref}
          className="gw-btn gw-btn-primary"
        >
          {dict.seoStartPractice}
          <span aria-hidden>→</span>
        </Link>
        <Link
          href={`/${locale}/eligibility`}
          className="gw-btn gw-btn-ghost"
        >
          {dict.startEligibility}
        </Link>
        <Link
          href={`/${locale}/questions`}
          className="gw-btn gw-btn-ghost"
        >
          {dict.seoAllLandings}
        </Link>
      </div>
      <p className="max-w-2xl text-xs leading-relaxed text-muted">
        {dict.disclaimer}
      </p>

      <ol className="divide-y divide-line border border-line bg-surface">
        {questions.map((q) => {
          const en = englishById[q.id];
          const speakQ = en?.question ?? q.question;
          const speakA = en?.answers ?? q.answers;
          return (
            <li key={q.id} className="px-4 py-4 sm:px-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    {dict.question} {q.id}
                    {q.senior ? (
                      <span className="ms-2 text-amber">★ 65/20</span>
                    ) : null}
                  </p>
                  <p className="mt-1.5 text-base font-semibold leading-snug text-ink">
                    {q.question}
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-muted">
                    {q.answers.map((a) => (
                      <li key={a}>• {a}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                  <SpeakButton
                    label={dict.speakQuestion}
                    text={speakQ}
                    lang={TTS_LANG}
                  />
                  <SpeakButton
                    label={dict.speakAnswers}
                    texts={speakA}
                    lang={TTS_LANG}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
