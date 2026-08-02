"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";

type Step = "q1" | "q2" | "result";
type ResultKind = "senior" | "2025" | "2008";

export default function EligibilityFlow({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [step, setStep] = useState<Step>("q1");
  const [filedBefore, setFiledBefore] = useState<boolean | null>(null);
  const [result, setResult] = useState<ResultKind | null>(null);

  function answerQ1(value: boolean) {
    setFiledBefore(value);
    setStep("q2");
  }

  function answerQ2(value: boolean) {
    if (value) {
      setResult("senior");
    } else {
      setResult(filedBefore ? "2008" : "2025");
    }
    setStep("result");
  }

  const resultCopy: Record<ResultKind, string> = {
    senior: dict.resultSenior,
    "2008": dict.result2008,
    "2025": dict.result2025,
  };

  const resultVersion: Record<ResultKind, "2008" | "2025"> = {
    senior: filedBefore ? "2008" : "2025",
    "2008": "2008",
    "2025": "2025",
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{dict.eligibilityTitle}</h1>

      {step === "q1" && (
        <fieldset className="flex flex-col gap-3">
          <legend className="font-medium mb-1">{dict.q1}</legend>
          <div className="flex gap-3">
            <button
              onClick={() => answerQ1(true)}
              className="rounded-md border border-black/15 dark:border-white/20 px-4 py-2 hover:bg-black/[.04] dark:hover:bg-white/[.08]"
            >
              {dict.yes}
            </button>
            <button
              onClick={() => answerQ1(false)}
              className="rounded-md border border-black/15 dark:border-white/20 px-4 py-2 hover:bg-black/[.04] dark:hover:bg-white/[.08]"
            >
              {dict.no}
            </button>
          </div>
        </fieldset>
      )}

      {step === "q2" && (
        <fieldset className="flex flex-col gap-3">
          <legend className="font-medium mb-1">{dict.q2}</legend>
          <div className="flex gap-3">
            <button
              onClick={() => answerQ2(true)}
              className="rounded-md border border-black/15 dark:border-white/20 px-4 py-2 hover:bg-black/[.04] dark:hover:bg-white/[.08]"
            >
              {dict.yes}
            </button>
            <button
              onClick={() => answerQ2(false)}
              className="rounded-md border border-black/15 dark:border-white/20 px-4 py-2 hover:bg-black/[.04] dark:hover:bg-white/[.08]"
            >
              {dict.no}
            </button>
          </div>
        </fieldset>
      )}

      {step === "result" && result && (
        <div className="flex flex-col gap-4">
          <p className="text-lg">{resultCopy[result]}</p>
          <Link
            href={
              result === "senior"
                ? `/${locale}/practice/${resultVersion[result]}?senior=1`
                : `/${locale}/practice/${resultVersion[result]}`
            }
            className="inline-block w-fit rounded-md bg-black text-white dark:bg-white dark:text-black px-5 py-2.5 font-medium"
          >
            {dict.startPractice}
          </Link>
        </div>
      )}
    </div>
  );
}
