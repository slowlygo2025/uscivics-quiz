"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import {
  trackEligibilityComplete,
  trackEligibilityStart,
} from "@/lib/analytics";
import TrustDiffStrip from "@/components/TrustDiffStrip";

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
    const next: ResultKind = value
      ? "senior"
      : filedBefore
        ? "2008"
        : "2025";
    setResult(next);
    setStep("result");
    void trackEligibilityComplete(next);
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

  const stepIndex = step === "q1" ? 1 : step === "q2" ? 2 : 3;

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-sm font-medium text-signal">
        {dict.stepOf} {stepIndex} / 3
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {dict.eligibilityTitle}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
        {dict.eligibilityLead}
      </p>
      <TrustDiffStrip dict={dict} variant="compact" />

      <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-mist">
        <div
          className="h-full origin-left rounded-full bg-signal transition-[width] duration-500 ease-out"
          style={{ width: `${(stepIndex / 3) * 100}%` }}
        />
      </div>

      <div key={step} className="gw-fade mt-10">
        {step === "q1" && (
          <fieldset className="flex flex-col gap-5">
            <legend className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              {dict.q1}
            </legend>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button onClick={() => answerQ1(true)} className="gw-btn gw-btn-secondary flex-1">
                {dict.yes}
              </button>
              <button onClick={() => answerQ1(false)} className="gw-btn gw-btn-secondary flex-1">
                {dict.no}
              </button>
            </div>
          </fieldset>
        )}

        {step === "q2" && (
          <fieldset className="flex flex-col gap-5">
            <legend className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              {dict.q2}
            </legend>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button onClick={() => answerQ2(true)} className="gw-btn gw-btn-secondary flex-1">
                {dict.yes}
              </button>
              <button onClick={() => answerQ2(false)} className="gw-btn gw-btn-secondary flex-1">
                {dict.no}
              </button>
            </div>
          </fieldset>
        )}

        {step === "result" && result && (
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface/90 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-signal">
              {result === "senior" ? "65/20" : result}
            </p>
            <p className="text-lg leading-relaxed text-ink sm:text-xl">
              {resultCopy[result]}
            </p>
            <Link
              href={
                result === "senior"
                  ? `/${locale}/practice/${resultVersion[result]}?senior=1`
                  : `/${locale}/practice/${resultVersion[result]}`
              }
              className="gw-btn gw-btn-primary w-full sm:w-fit"
              onClick={() => void trackEligibilityStart(result)}
            >
              {dict.startInSecondsCta}
              <span aria-hidden>→</span>
            </Link>
            <p className="text-xs leading-relaxed text-muted">{dict.disclaimer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
