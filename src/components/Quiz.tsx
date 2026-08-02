"use client";

import { useMemo, useState } from "react";
import type { CivicsQuestion, Locale, TestVersion } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import { getRandomQuestions } from "@/lib/questions";
import { SENIOR_EXEMPTION, TEST_CONFIG } from "@/lib/quiz-config";

export default function Quiz({
  locale,
  version,
  senior = false,
}: {
  locale: Locale;
  version: TestVersion;
  senior?: boolean;
}) {
  const dict = getDictionary(locale);
  const config = senior
    ? { asked: SENIOR_EXEMPTION.totalQuestions, passThreshold: SENIOR_EXEMPTION.passThreshold }
    : TEST_CONFIG[version];

  const [questions, setQuestions] = useState<CivicsQuestion[]>(() =>
    getRandomQuestions(version, locale, config.asked, { seniorOnly: senior })
  );
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCorrect, setAnsweredCorrect] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  const current = questions[index];
  const isLast = index === questions.length - 1;

  function markAnswer(wasCorrect: boolean) {
    setAnsweredCorrect((prev) => [...prev, wasCorrect]);
    if (wasCorrect) setCorrectCount((c) => c + 1);
    if (isLast) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
      setRevealed(false);
    }
  }

  function restart() {
    setQuestions(
      getRandomQuestions(version, locale, config.asked, { seniorOnly: senior })
    );
    setIndex(0);
    setRevealed(false);
    setCorrectCount(0);
    setAnsweredCorrect([]);
    setDone(false);
  }

  const passed = useMemo(
    () => correctCount >= config.passThreshold,
    [correctCount, config.passThreshold]
  );

  if (done) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{dict.yourScore}</h2>
        <p className="text-lg">
          {correctCount} / {questions.length}
        </p>
        <p className={passed ? "text-green-600" : "text-amber-600"}>
          {passed ? dict.passed : dict.notPassed}
        </p>
        <button
          onClick={restart}
          className="inline-block w-fit rounded-md bg-black text-white dark:bg-white dark:text-black px-5 py-2.5 font-medium"
        >
          {dict.tryAgain}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm opacity-60">
        {dict.question} {index + 1} {dict.of} {questions.length}
      </p>
      <h2 className="text-xl font-semibold">{current.question}</h2>

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="w-fit rounded-md border border-black/15 dark:border-white/20 px-4 py-2 hover:bg-black/[.04] dark:hover:bg-white/[.08]"
        >
          {dict.showAnswer}
        </button>
      ) : (
        <div className="flex flex-col gap-4">
          <ul className="list-disc pl-5">
            {current.answers.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <div className="flex gap-3">
            <button
              onClick={() => markAnswer(true)}
              className="rounded-md bg-green-600 text-white px-4 py-2"
            >
              {dict.yes}
            </button>
            <button
              onClick={() => markAnswer(false)}
              className="rounded-md bg-red-600 text-white px-4 py-2"
            >
              {dict.no}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
