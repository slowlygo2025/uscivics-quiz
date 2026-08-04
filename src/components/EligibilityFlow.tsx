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

type Step = "q1" | "q2age" | "q2years" | "result";
type ResultKind = "senior" | "2025" | "2008" | "unsure";

const TOTAL_STEPS = 4;

export default function EligibilityFlow({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [step, setStep] = useState<Step>("q1");
  const [filedBefore, setFiledBefore] = useState<boolean | null>(null);
  const [age65, setAge65] = useState<boolean | null>(null);
  const [result, setResult] = useState<ResultKind | null>(null);

  function finish(next: ResultKind) {
    setResult(next);
    setStep("result");
    void trackEligibilityComplete(next);
  }

  function answerQ1(value: boolean | "unsure") {
    if (value === "unsure") {
      setFiledBefore(null);
      finish("unsure");
      return;
    }
    setFiledBefore(value);
    setStep("q2age");
  }

  function answerAge(value: boolean) {
    setAge65(value);
    if (!value) {
      finish(filedBefore ? "2008" : "2025");
      return;
    }
    setStep("q2years");
  }

  function answerYears(value: boolean) {
    if (value && age65) {
      finish("senior");
      return;
    }
    finish(filedBefore ? "2008" : "2025");
  }

  const resultCopy: Record<ResultKind, string> = {
    senior: dict.resultSenior,
    "2008": dict.result2008,
    "2025": dict.result2025,
    unsure: dict.resultUnsure,
  };

  const resultVersion: Record<Exclude<ResultKind, "unsure">, "2008" | "2025"> = {
    senior: filedBefore ? "2008" : "2025",
    "2008": "2008",
    "2025": "2025",
  };

  const stepIndex =
    step === "q1" ? 1 : step === "q2age" ? 2 : step === "q2years" ? 3 : 4;

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-sm font-medium text-signal">
        {dict.stepOf} {stepIndex} / {TOTAL_STEPS}
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
          style={{ width: `${(stepIndex / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      <div key={step} className="gw-fade mt-10">
        {step === "q1" && (
          <fieldset className="flex flex-col gap-5">
            <legend className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              {dict.q1}
            </legend>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => answerQ1(true)}
                className="gw-btn gw-btn-secondary flex-1"
              >
                {dict.yes}
              </button>
              <button
                type="button"
                onClick={() => answerQ1(false)}
                className="gw-btn gw-btn-secondary flex-1"
              >
                {dict.no}
              </button>
              <button
                type="button"
                onClick={() => answerQ1("unsure")}
                className="gw-btn gw-btn-ghost flex-1"
              >
                {dict.notSure}
              </button>
            </div>
            <p className="text-sm leading-relaxed text-muted">{dict.q1Hint}</p>
          </fieldset>
        )}

        {step === "q2age" && (
          <fieldset className="flex flex-col gap-5">
            <legend className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              {dict.q2Age}
            </legend>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => answerAge(true)}
                className="gw-btn gw-btn-secondary flex-1"
              >
                {dict.yes}
              </button>
              <button
                type="button"
                onClick={() => answerAge(false)}
                className="gw-btn gw-btn-secondary flex-1"
              >
                {dict.no}
              </button>
            </div>
          </fieldset>
        )}

        {step === "q2years" && (
          <fieldset className="flex flex-col gap-5">
            <legend className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              {dict.q2Years}
            </legend>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => answerYears(true)}
                className="gw-btn gw-btn-secondary flex-1"
              >
                {dict.yes}
              </button>
              <button
                type="button"
                onClick={() => answerYears(false)}
                className="gw-btn gw-btn-secondary flex-1"
              >
                {dict.no}
              </button>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              {dict.eligibilityEnglishExemptNote}
            </p>
          </fieldset>
        )}

        {step === "result" && result && (
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface/90 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-signal">
              {result === "senior"
                ? "65/20"
                : result === "unsure"
                  ? dict.notSure
                  : result}
            </p>
            <p className="text-lg leading-relaxed text-ink sm:text-xl">
              {resultCopy[result]}
            </p>
            {result === "unsure" ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={`/${locale}/practice/2025`}
                  className="gw-btn gw-btn-primary"
                  onClick={() => void trackEligibilityStart("2025")}
                >
                  {dict.navTest2025}
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href={`/${locale}/practice/2008`}
                  className="gw-btn gw-btn-secondary"
                  onClick={() => void trackEligibilityStart("2008")}
                >
                  {dict.navTest2008}
                  <span aria-hidden>→</span>
                </Link>
                <a
                  href="https://www.uscis.gov/citizenship"
                  className="gw-btn gw-btn-ghost"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  uscis.gov
                </a>
              </div>
            ) : (
              <Link
                href={
                  result === "senior"
                    ? `/${locale}/practice/${resultVersion.senior}?senior=1`
                    : `/${locale}/practice/${resultVersion[result]}`
                }
                className="gw-btn gw-btn-primary w-full sm:w-fit"
                onClick={() =>
                  void trackEligibilityStart(
                    result === "senior" ? "senior" : result
                  )
                }
              >
                {dict.startInSecondsCta}
                <span aria-hidden>→</span>
              </Link>
            )}
            <p className="text-xs leading-relaxed text-muted">
              {dict.eligibilityOfficialNote}
            </p>
            <p className="text-xs leading-relaxed text-muted">{dict.disclaimer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
