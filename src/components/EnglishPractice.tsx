"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/dictionary";
import {
  READING_SENTENCES,
  READING_VOCAB,
  WRITING_SENTENCES,
  WRITING_VOCAB,
} from "@/lib/english-vocab";
import SpeakButton from "@/components/SpeakButton";
import { TTS_LANG } from "@/lib/locales";
import { normalizeSpeech } from "@/lib/speech-match";

export default function EnglishPractice({
  dict,
  locale = "en",
  initialTab = "reading",
}: {
  dict: Dictionary;
  locale?: string;
  initialTab?: "reading" | "writing";
}) {
  const [tab, setTab] = useState<"reading" | "writing">(initialTab);
  const [rIndex, setRIndex] = useState(0);
  const [wIndex, setWIndex] = useState(0);
  const [written, setWritten] = useState("");
  const [wResult, setWResult] = useState<"ok" | "bad" | null>(null);

  const reading = READING_SENTENCES[rIndex % READING_SENTENCES.length];
  const writing = WRITING_SENTENCES[wIndex % WRITING_SENTENCES.length];

  const readingGroups = useMemo(
    () =>
      Object.entries(READING_VOCAB).map(([key, words]) => ({
        key,
        words: [...words],
      })),
    []
  );
  const writingGroups = useMemo(
    () =>
      Object.entries(WRITING_VOCAB).map(([key, words]) => ({
        key,
        words: [...words],
      })),
    []
  );

  function checkWriting() {
    const ok =
      normalizeSpeech(written) === normalizeSpeech(writing) ||
      normalizeSpeech(written).includes(normalizeSpeech(writing));
    setWResult(ok ? "ok" : "bad");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {dict.englishTitle}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          {dict.englishLead}
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        <Link
          href={`/${locale}/english/reading`}
          className="text-sm font-semibold text-signal underline-offset-2 hover:underline"
        >
          {dict.seoReadingTitle}
        </Link>
        <span className="text-muted">·</span>
        <Link
          href={`/${locale}/english/writing`}
          className="text-sm font-semibold text-signal underline-offset-2 hover:underline"
        >
          {dict.seoWritingTitle}
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTab("reading")}
          className={`min-h-11 rounded-full px-4 py-2.5 text-sm font-semibold touch-manipulation ${
            tab === "reading"
              ? "bg-ink text-paper"
              : "border border-line bg-surface text-ink-soft"
          }`}
        >
          {dict.readingTitle}
        </button>
        <button
          type="button"
          onClick={() => setTab("writing")}
          className={`min-h-11 rounded-full px-4 py-2.5 text-sm font-semibold touch-manipulation ${
            tab === "writing"
              ? "bg-ink text-paper"
              : "border border-line bg-surface text-ink-soft"
          }`}
        >
          {dict.writingTitle}
        </button>
      </div>

      {tab === "reading" ? (
        <section className="space-y-5">
          <p className="text-sm text-muted">{dict.readingHint}</p>
          <div className="rounded-[1.35rem] border border-line bg-surface px-6 py-10 text-center">
            <p className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-snug text-ink sm:text-3xl">
              {reading}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <SpeakButton label={dict.speakQuestion} text={reading} lang={TTS_LANG} />
              <button
                type="button"
                className="gw-btn gw-btn-secondary"
                onClick={() => setRIndex((i) => i + 1)}
              >
                {dict.nextSentence}
              </button>
            </div>
          </div>
          <VocabGroups title={dict.readingTitle} groups={readingGroups} />
        </section>
      ) : (
        <section className="space-y-5">
          <p className="text-sm text-muted">{dict.writingHint}</p>
          <div className="rounded-[1.35rem] border border-line bg-surface px-6 py-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              {dict.writingPrompt}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <SpeakButton label={dict.speakQuestion} text={writing} lang={TTS_LANG} />
            </div>
            <label className="mt-6 block">
              <span className="sr-only">{dict.writingTitle}</span>
              <input
                value={written}
                onChange={(e) => {
                  setWritten(e.target.value);
                  setWResult(null);
                }}
                className="w-full rounded-2xl border border-line bg-paper px-4 py-3 text-base outline-none focus:border-signal"
                placeholder="…"
                autoComplete="off"
                spellCheck={false}
              />
            </label>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className="gw-btn gw-btn-primary" onClick={checkWriting}>
                {dict.writingCheck}
              </button>
              <button
                type="button"
                className="gw-btn gw-btn-ghost"
                onClick={() => {
                  setWIndex((i) => i + 1);
                  setWritten("");
                  setWResult(null);
                }}
              >
                {dict.nextSentence}
              </button>
            </div>
            {wResult === "ok" && (
              <p className="mt-3 text-sm font-semibold text-pass">{dict.writingCorrect}</p>
            )}
            {wResult === "bad" && (
              <p className="mt-3 text-sm font-semibold text-miss">
                {dict.writingTryAgain}: <span className="font-normal text-ink">{writing}</span>
              </p>
            )}
          </div>
          <VocabGroups title={dict.writingTitle} groups={writingGroups} />
        </section>
      )}
    </div>
  );
}

function VocabGroups({
  title,
  groups,
}: {
  title: string;
  groups: { key: string; words: string[] }[];
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
        {title} vocabulary
      </h2>
      <div className="mt-3 space-y-3">
        {groups.map((g) => (
          <div key={g.key} className="rounded-xl border border-line bg-surface/80 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-signal">
              {g.key}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {g.words.join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
