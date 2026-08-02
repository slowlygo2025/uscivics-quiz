"use client";

import { useEffect, useRef, useState } from "react";
import type { CivicsQuestion, Locale, TestVersion } from "@/lib/types";
import type { Dictionary } from "@/lib/dictionary";
import { getEnglishQuestion, getSmartQuestions } from "@/lib/questions";
import { getFederalAnswersForQuestion } from "@/lib/federal-officials";
import { speechMatchesAnswer } from "@/lib/speech-match";
import type { VersionProgress } from "@/lib/progress";
import SpeakButton from "@/components/SpeakButton";
import { TTS_LANG } from "@/lib/locales";

type SR = SpeechRecognition;

function getSpeechRecognition(): (new () => SR) | null {
  if (typeof window === "undefined") return null;
  const w = window as Window &
    typeof globalThis & {
      SpeechRecognition?: new () => SR;
      webkitSpeechRecognition?: new () => SR;
    };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export default function SpeakPracticeMode({
  dict,
  version,
  locale,
  progress,
  onGrade,
}: {
  dict: Dictionary;
  version: TestVersion;
  locale: Locale;
  progress: VersionProgress;
  onGrade: (id: number, g: "correct" | "wrong") => void;
}) {
  const [current, setCurrent] = useState<CivicsQuestion | null>(null);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState("");
  const [result, setResult] = useState<"match" | "nomatch" | null>(null);
  const [supported, setSupported] = useState(true);
  const recogRef = useRef<SR | null>(null);

  function pick() {
    const q =
      getSmartQuestions(version, locale, 1, progress)[0] ??
      getEnglishQuestion(version, 1) ??
      null;
    setCurrent(q);
    setHeard("");
    setResult(null);
  }

  useEffect(() => {
    setSupported(Boolean(getSpeechRecognition()));
    pick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, locale]);

  useEffect(() => {
    return () => {
      try {
        recogRef.current?.stop();
      } catch {
        // ignore
      }
    };
  }, []);

  if (!current) return null;

  const english = getEnglishQuestion(version, current.id) ?? current;
  const federal = getFederalAnswersForQuestion(version, current.id);
  const accepted = federal ?? english.answers;

  function stopListen() {
    try {
      recogRef.current?.stop();
    } catch {
      // ignore
    }
    setListening(false);
  }

  function startListen() {
    const Ctor = getSpeechRecognition();
    if (!Ctor) {
      setSupported(false);
      return;
    }
    setHeard("");
    setResult(null);
    const recog = new Ctor();
    recogRef.current = recog;
    recog.lang = "en-US";
    recog.interimResults = true;
    recog.continuous = false;
    recog.onresult = (event: SpeechRecognitionEvent) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0]?.transcript ?? "";
      }
      setHeard(text.trim());
      const last = event.results[event.results.length - 1];
      if (last?.isFinal) {
        const match = speechMatchesAnswer(text, accepted);
        setResult(match.ok ? "match" : "nomatch");
        setListening(false);
      }
    };
    recog.onerror = () => setListening(false);
    recog.onend = () => setListening(false);
    setListening(true);
    recog.start();
  }

  function mark(ok: boolean) {
    const q = current;
    if (!q) return;
    onGrade(q.id, ok ? "correct" : "wrong");
    pick();
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted">{dict.modeSpeakHint}</p>

      {!supported && (
        <p className="rounded-xl border border-amber/25 bg-amber-soft/80 px-4 py-3 text-sm text-amber">
          {dict.speakUnsupported}
        </p>
      )}

      <div className="rounded-[1.35rem] border border-line bg-surface px-5 py-8 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          {dict.modeSpeak} · Q {english.id}
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold leading-snug text-ink sm:text-3xl">
          {english.question}
        </h2>
        {current.question !== english.question && (
          <p className="mt-2 text-sm text-muted">{current.question}</p>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          <SpeakButton
            label={dict.speakQuestion}
            text={english.question}
            lang={TTS_LANG}
          />
          <button
            type="button"
            disabled={!supported}
            onClick={() => (listening ? stopListen() : startListen())}
            className={`gw-btn ${
              listening ? "gw-btn-primary" : "gw-btn-secondary"
            } disabled:opacity-50`}
          >
            {listening ? dict.speakStop : dict.speakStart}
          </button>
        </div>

        {heard && (
          <p className="mt-5 rounded-xl bg-mist/60 px-4 py-3 text-sm text-ink">
            <span className="font-semibold text-muted">{dict.speakHeard}: </span>
            {heard}
          </p>
        )}

        {result === "match" && (
          <p className="mt-3 text-sm font-semibold text-pass">{dict.speakMatch}</p>
        )}
        {result === "nomatch" && (
          <div className="mt-3 space-y-2">
            <p className="text-sm font-semibold text-miss">{dict.speakNoMatch}</p>
            <ul className="text-sm text-ink-soft">
              {accepted.map((a) => (
                <li key={a}>• {a}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => mark(true)}
          className="gw-btn flex-1 border border-pass/25 bg-pass-soft text-pass hover:bg-pass hover:text-white"
        >
          {dict.saidCorrectly}
        </button>
        <button
          type="button"
          onClick={() => mark(false)}
          className="gw-btn flex-1 border border-miss/25 bg-miss-soft text-miss hover:bg-miss hover:text-white"
        >
          {dict.gotWrong}
        </button>
        <button type="button" onClick={pick} className="gw-btn gw-btn-ghost">
          {dict.nextRandom}
        </button>
      </div>
    </div>
  );
}
