"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { CivicsQuestion, Locale, TestVersion } from "@/lib/types";
import { getDictionary, type Dictionary } from "@/lib/dictionary";
import {
  getCategories,
  getEnglishQuestion,
  getQuestionBank,
  getRandomQuestions,
  getSmartQuestions,
} from "@/lib/questions";
import { getInterviewConfig } from "@/lib/quiz-config";
import {
  isChangingAnswer,
  USCIS_TEST_UPDATES_URL,
} from "@/lib/changing-answers";
import {
  loadProgress,
  saveProgress,
  resetProgress,
  recordGrade,
  recordSimulation,
  summarizeProgress,
  type Grade,
  type VersionProgress,
} from "@/lib/progress";
import ZipOfficials from "@/components/ZipOfficials";
import FederalOfficials from "@/components/FederalOfficials";
import SpeakButton from "@/components/SpeakButton";
import SpeakPracticeMode from "@/components/SpeakPracticeMode";
import { TTS_LANG } from "@/lib/locales";
import { getFederalAnswersForQuestion } from "@/lib/federal-officials";

type StudyMode =
  | "flashcards"
  | "random"
  | "smart"
  | "simulate"
  | "browse"
  | "speak";

type SimState = {
  questions: CivicsQuestion[];
  index: number;
  correct: number;
  wrong: number;
  revealed: boolean;
  done: boolean;
  outcome: "pass" | "fail" | "complete" | null;
};

function subscribeNoop() {
  return () => {};
}

function useClientReady() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
}

function categoryAccuracy(
  progress: VersionProgress,
  bank: CivicsQuestion[],
  category: string
) {
  const ids = bank.filter((q) => q.category === category).map((q) => q.id);
  let correct = 0;
  let wrong = 0;
  for (const id of ids) {
    const s = progress.questions[String(id)];
    if (!s) continue;
    correct += s.correct;
    wrong += s.wrong;
  }
  const attempts = correct + wrong;
  return {
    attempts,
    pct: attempts === 0 ? null : Math.round((correct / attempts) * 100),
  };
}

export default function StudyHub({
  locale,
  version,
  senior = false,
}: {
  locale: Locale;
  version: TestVersion;
  senior?: boolean;
}) {
  const dict = getDictionary(locale);
  const ready = useClientReady();
  const config = getInterviewConfig(version, senior);
  const categories = useMemo(
    () => getCategories(version, locale, { seniorOnly: senior }),
    [version, locale, senior]
  );

  const [mode, setMode] = useState<StudyMode>("flashcards");
  const [category, setCategory] = useState<string | null>(null);
  const [flashStartId, setFlashStartId] = useState<number | null>(null);
  const [progress, setProgress] = useState<VersionProgress>(() =>
    emptyLocal()
  );
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!ready) return;
    setProgress(loadProgress(version));
  }, [ready, version]);

  const bankOptions = useMemo(
    () => ({ seniorOnly: senior, category }),
    [senior, category]
  );

  const bank = useMemo(
    () => getQuestionBank(version, locale, bankOptions),
    [version, locale, bankOptions]
  );

  const fullBank = useMemo(
    () => getQuestionBank(version, locale, { seniorOnly: senior }),
    [version, locale, senior]
  );

  const summary = useMemo(
    () => summarizeProgress(progress, fullBank.length),
    [progress, fullBank.length]
  );

  const persistGrade = useCallback(
    (id: number, grade: Grade) => {
      setProgress((prev) => {
        const next = recordGrade(prev, id, grade);
        saveProgress(version, next);
        return next;
      });
    },
    [version]
  );

  const persistSim = useCallback(
    (passed: boolean) => {
      setProgress((prev) => {
        const next = recordSimulation(prev, passed);
        saveProgress(version, next);
        return next;
      });
    },
    [version]
  );

  function handleReset() {
    if (!window.confirm(dict.resetConfirm)) return;
    resetProgress(version);
    setProgress(loadProgress(version));
    setTick((t) => t + 1);
  }

  return (
    <div className="space-y-8">
      <header className="gw-rise flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-signal">
            {senior ? dict.seniorBadge : version}
            <span className="mx-2 text-muted/40">·</span>
            {dict.poolSize} {fullBank.length}
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {version === "2025" ? dict.practice2025 : dict.practice2008}
          </h1>
        </div>
      </header>

      <ProgressPanel
        dict={dict}
        summary={summary}
        progress={progress}
        bank={fullBank}
        categories={categories}
        onReset={handleReset}
      />

      <ChangingAnswersBanner dict={dict} />

      <div className="grid gap-4 md:grid-cols-2">
        <FederalOfficials dict={dict} />
        <ZipOfficials dict={dict} />
      </div>

      <ModeTabs dict={dict} mode={mode} onChange={setMode} />

      {mode !== "simulate" && (
        <CategoryFilters
          dict={dict}
          categories={categories}
          active={category}
          onChange={setCategory}
        />
      )}

      {mode === "flashcards" && (
        <FlashcardMode
          key={`fc-${category}-${tick}-${flashStartId ?? "start"}`}
          dict={dict}
          version={version}
          bank={bank}
          startId={flashStartId}
          onGrade={persistGrade}
        />
      )}
      {mode === "random" && (
        <DrillMode
          key={`rand-${category}-${tick}`}
          dict={dict}
          version={version}
          locale={locale}
          bankOptions={bankOptions}
          smart={false}
          progress={progress}
          onGrade={persistGrade}
        />
      )}
      {mode === "smart" && (
        <DrillMode
          key={`smart-${category}-${tick}`}
          dict={dict}
          version={version}
          locale={locale}
          bankOptions={bankOptions}
          smart
          progress={progress}
          onGrade={persistGrade}
        />
      )}
      {mode === "simulate" && (
        <SimulateMode
          key={`sim-${tick}`}
          dict={dict}
          version={version}
          locale={locale}
          senior={senior}
          config={config}
          onGrade={persistGrade}
          onSimEnd={persistSim}
        />
      )}
      {mode === "browse" && (
        <BrowseMode
          dict={dict}
          version={version}
          bank={bank}
          progress={progress}
          onGrade={persistGrade}
          onStudy={(id) => {
            setFlashStartId(id);
            setMode("flashcards");
          }}
        />
      )}
      {mode === "speak" && (
        <SpeakPracticeMode
          key={`speak-${tick}`}
          dict={dict}
          version={version}
          locale={locale}
          progress={progress}
          onGrade={persistGrade}
        />
      )}
    </div>
  );
}

function emptyLocal(): VersionProgress {
  return {
    questions: {},
    streak: 0,
    bestStreak: 0,
    simulationsPassed: 0,
    simulationsTaken: 0,
    updatedAt: 0,
  };
}

function ProgressPanel({
  dict,
  summary,
  progress,
  bank,
  categories,
  onReset,
}: {
  dict: Dictionary;
  summary: ReturnType<typeof summarizeProgress>;
  progress: VersionProgress;
  bank: CivicsQuestion[];
  categories: string[];
  onReset: () => void;
}) {
  const seenPct =
    summary.total === 0
      ? 0
      : Math.round((summary.seen / summary.total) * 100);

  return (
    <section className="gw-rise gw-rise-delay-1 rounded-2xl border border-line bg-surface/90 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
          {dict.progressTitle}
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-muted underline-offset-2 hover:text-ink hover:underline"
        >
          {dict.resetProgress}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <Stat label={dict.seen} value={`${summary.seen}/${summary.total}`} />
        <Stat label={dict.accuracy} value={`${summary.accuracy}%`} />
        <Stat label={dict.streak} value={String(summary.streak)} />
        <Stat label={dict.bestStreak} value={String(summary.bestStreak)} />
        <Stat label={dict.weak} value={String(summary.weak)} />
        <Stat
          label={dict.sims}
          value={`${summary.simulationsPassed}/${summary.simulationsTaken}`}
        />
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-mist">
        <div
          className="h-full rounded-full bg-signal transition-[width] duration-500"
          style={{ width: `${seenPct}%` }}
        />
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          {dict.categoryMastery}
        </p>
        <ul className="mt-3 space-y-2">
          {categories.map((cat) => {
            const { pct, attempts } = categoryAccuracy(progress, bank, cat);
            return (
              <li key={cat} className="flex items-center gap-3 text-sm">
                <span className="w-28 shrink-0 truncate text-ink-soft sm:w-40 md:w-52">
                  {cat}
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-mist">
                  <div
                    className="h-full rounded-full bg-pass/80 transition-[width] duration-500"
                    style={{ width: `${pct ?? 0}%` }}
                  />
                </div>
                <span className="w-14 text-right tabular-nums text-muted">
                  {attempts === 0 ? "—" : `${pct}%`}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-mist/60 px-3 py-2.5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
        {label}
      </p>
      <p className="mt-0.5 font-[family-name:var(--font-display)] text-xl font-semibold tabular-nums text-ink">
        {value}
      </p>
    </div>
  );
}

function ChangingAnswersBanner({ dict }: { dict: Dictionary }) {
  return (
    <aside className="rounded-2xl border border-amber/25 bg-amber-soft/80 px-5 py-4 sm:px-6">
      <p className="text-sm font-semibold text-amber">{dict.changingBannerTitle}</p>
      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
        {dict.changingBannerBody}{" "}
        <a
          href={USCIS_TEST_UPDATES_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-signal underline-offset-2 hover:underline"
        >
          {dict.changingBannerLink}
        </a>
      </p>
    </aside>
  );
}

function ModeTabs({
  dict,
  mode,
  onChange,
}: {
  dict: Dictionary;
  mode: StudyMode;
  onChange: (m: StudyMode) => void;
}) {
  const tabs: { id: StudyMode; label: string; hint: string }[] = [
    {
      id: "flashcards",
      label: dict.modeFlashcards,
      hint: dict.modeFlashcardsHint,
    },
    { id: "random", label: dict.modeRandom, hint: dict.modeRandomHint },
    { id: "smart", label: dict.modeSmart, hint: dict.modeSmartHint },
    {
      id: "simulate",
      label: dict.modeSimulate,
      hint: dict.modeSimulateHint,
    },
    { id: "speak", label: dict.modeSpeak, hint: dict.modeSpeakHint },
    { id: "browse", label: dict.modeBrowse, hint: dict.modeBrowseHint },
  ];

  return (
    <div>
      <div className="gw-touch-scroll sm:flex-wrap sm:overflow-visible">
        {tabs.map((t) => {
          const active = mode === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold touch-manipulation transition-colors min-h-11 ${
                active
                  ? "bg-ink text-white shadow-[0_8px_24px_rgba(11,28,44,0.18)]"
                  : "border border-line bg-surface/80 text-ink-soft hover:border-signal/35 hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-sm text-muted">
        {tabs.find((t) => t.id === mode)?.hint}
      </p>
    </div>
  );
}

function CategoryFilters({
  dict,
  categories,
  active,
  onChange,
}: {
  dict: Dictionary;
  categories: string[];
  active: string | null;
  onChange: (c: string | null) => void;
}) {
  return (
    <div className="gw-touch-scroll sm:flex-wrap sm:overflow-visible">
      <FilterChip
        label={dict.filterAll}
        active={active === null}
        onClick={() => onChange(null)}
      />
      {categories.map((c) => (
        <FilterChip
          key={c}
          label={c}
          active={active === c}
          onClick={() => onChange(c)}
        />
      ))}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-semibold tracking-wide touch-manipulation transition-colors min-h-10 ${
        active
          ? "bg-signal text-white"
          : "border border-line bg-surface text-muted hover:border-signal/40 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

function QuestionCard({
  dict,
  version,
  question,
  indexLabel,
  revealed,
  onReveal,
  onGrade,
  footer,
}: {
  dict: Dictionary;
  version: TestVersion;
  question: CivicsQuestion;
  indexLabel: string;
  revealed: boolean;
  onReveal: () => void;
  onGrade: (g: Grade) => void;
  footer?: ReactNode;
}) {
  const changing = isChangingAnswer(version, question.id);
  const english = getEnglishQuestion(version, question.id);
  const federalAnswers = getFederalAnswersForQuestion(version, question.id);
  const displayAnswers = federalAnswers ?? question.answers;
  const englishAnswers = federalAnswers ?? english?.answers ?? question.answers;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.code === "Space") {
        e.preventDefault();
        if (!revealed) onReveal();
      }
      if (!revealed) return;
      if (e.key === "y" || e.key === "Y") onGrade("correct");
      if (e.key === "n" || e.key === "N") onGrade("wrong");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [revealed, onReveal, onGrade]);

  return (
    <div key={question.id} className="gw-rise">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted">
        <span>{indexLabel}</span>
        {question.senior && (
          <span className="rounded-full bg-amber-soft px-2 py-0.5 text-xs font-semibold text-amber">
            ★ {dict.seniorBadge}
          </span>
        )}
        <span className="rounded-full bg-mist px-2 py-0.5 text-xs font-medium text-ink-soft">
          {question.category}
        </span>
      </div>

      <p className="mb-3 text-sm text-muted">{dict.speakPractice}</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {english && (
          <SpeakButton
            label={dict.speakQuestion}
            text={english.question}
            lang={TTS_LANG}
          />
        )}
        {revealed && english && (
          <SpeakButton
            label={dict.speakAnswers}
            texts={englishAnswers}
            lang={TTS_LANG}
          />
        )}
      </div>

      <button
        type="button"
        onClick={() => !revealed && onReveal()}
        className="w-full rounded-[1.35rem] border border-line bg-surface px-5 py-8 text-left shadow-[0_16px_40px_rgba(11,28,44,0.06)] transition-shadow hover:shadow-[0_20px_48px_rgba(11,28,44,0.1)] sm:px-8 sm:py-10"
      >
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl">
          {question.question}
        </h2>
        {english && english.question !== question.question && (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {english.question}
          </p>
        )}

        {!revealed ? (
          <p className="mt-8 text-sm font-medium text-signal">
            {dict.showAnswer}
          </p>
        ) : (
          <div className="gw-fade mt-8 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              {dict.answersLabel}
            </p>
            <ul className="space-y-2">
              {displayAnswers.map((a) => (
                <li
                  key={a}
                  className="flex gap-2 text-base leading-relaxed text-ink"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
            {english &&
              english.question !== question.question &&
              !federalAnswers &&
              english.answers.length > 0 && (
                <div className="rounded-xl bg-mist/60 px-3 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                    English
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-ink-soft">
                    {english.answers.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}
            {changing && (
              <p className="rounded-xl border border-amber/20 bg-amber-soft/70 px-3 py-2 text-sm text-amber">
                {dict.changingCardNote}
              </p>
            )}
          </div>
        )}
      </button>

      {revealed && (
        <div className="gw-fade mt-6">
          <p className="mb-3 text-sm font-medium text-muted">{dict.didYouKnow}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => onGrade("correct")}
              className="gw-btn flex-1 border border-pass/25 bg-pass-soft text-pass hover:bg-pass hover:text-white"
            >
              {dict.saidCorrectly}
            </button>
            <button
              type="button"
              onClick={() => onGrade("wrong")}
              className="gw-btn flex-1 border border-miss/25 bg-miss-soft text-miss hover:bg-miss hover:text-white"
            >
              {dict.gotWrong}
            </button>
          </div>
        </div>
      )}

      {footer && <div className="mt-6">{footer}</div>}
      <p className="gw-keyboard-hint mt-4 text-center text-xs text-muted">
        {dict.keyboardHint}
      </p>
    </div>
  );
}

function FlashcardMode({
  dict,
  version,
  bank,
  startId,
  onGrade,
}: {
  dict: Dictionary;
  version: TestVersion;
  bank: CivicsQuestion[];
  startId?: number | null;
  onGrade: (id: number, g: Grade) => void;
}) {
  const initialIndex = Math.max(
    0,
    startId != null ? bank.findIndex((q) => q.id === startId) : 0
  );
  const [index, setIndex] = useState(initialIndex === -1 ? 0 : initialIndex);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const next =
      startId != null ? bank.findIndex((q) => q.id === startId) : 0;
    setIndex(next === -1 ? 0 : next);
    setRevealed(false);
  }, [bank, startId]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex((i) => Math.max(0, i - 1));
        setRevealed(false);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setIndex((i) => Math.min(bank.length - 1, i + 1));
        setRevealed(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [bank.length]);

  if (bank.length === 0) {
    return <p className="text-muted">{dict.noQuestions}</p>;
  }

  const current = bank[Math.min(index, bank.length - 1)];

  function handleGrade(g: Grade) {
    onGrade(current.id, g);
    if (index < bank.length - 1) {
      setIndex((i) => i + 1);
      setRevealed(false);
    }
  }

  return (
    <QuestionCard
      dict={dict}
      version={version}
      question={current}
      indexLabel={`${dict.question} ${index + 1} ${dict.of} ${bank.length}`}
      revealed={revealed}
      onReveal={() => setRevealed(true)}
      onGrade={handleGrade}
      footer={
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="gw-btn gw-btn-ghost"
            disabled={index === 0}
            onClick={() => {
              setIndex((i) => Math.max(0, i - 1));
              setRevealed(false);
            }}
          >
            {dict.prev}
          </button>
          <button
            type="button"
            className="gw-btn gw-btn-ghost"
            onClick={() => setRevealed((r) => !r)}
          >
            {dict.flip}
          </button>
          <button
            type="button"
            className="gw-btn gw-btn-secondary"
            disabled={index >= bank.length - 1}
            onClick={() => {
              setIndex((i) => Math.min(bank.length - 1, i + 1));
              setRevealed(false);
            }}
          >
            {dict.nextCard}
          </button>
        </div>
      }
    />
  );
}

function DrillMode({
  dict,
  version,
  locale,
  bankOptions,
  smart,
  progress,
  onGrade,
}: {
  dict: Dictionary;
  version: TestVersion;
  locale: Locale;
  bankOptions: { seniorOnly?: boolean; category?: string | null };
  smart: boolean;
  progress: VersionProgress;
  onGrade: (id: number, g: Grade) => void;
}) {
  const progressRef = useRef(progress);
  progressRef.current = progress;

  const pick = useCallback(() => {
    if (smart) {
      return (
        getSmartQuestions(version, locale, 1, progressRef.current, bankOptions)[0] ??
        null
      );
    }
    return getRandomQuestions(version, locale, 1, bankOptions)[0] ?? null;
  }, [smart, version, locale, bankOptions]);

  const [current, setCurrent] = useState<CivicsQuestion | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setCurrent(pick());
    setRevealed(false);
  }, [pick]);

  if (!current) {
    return <p className="text-muted">{dict.noQuestions}</p>;
  }

  function handleGrade(g: Grade) {
    const q = current;
    if (!q) return;
    onGrade(q.id, g);
    setCurrent(pick());
    setRevealed(false);
  }

  return (
    <QuestionCard
      dict={dict}
      version={version}
      question={current}
      indexLabel={smart ? dict.modeSmart : dict.modeRandom}
      revealed={revealed}
      onReveal={() => setRevealed(true)}
      onGrade={handleGrade}
      footer={
        <button
          type="button"
          className="gw-btn gw-btn-secondary"
          onClick={() => {
            setCurrent(pick());
            setRevealed(false);
          }}
        >
          {dict.nextRandom}
        </button>
      }
    />
  );
}

function SimulateMode({
  dict,
  version,
  locale,
  senior,
  config,
  onGrade,
  onSimEnd,
}: {
  dict: Dictionary;
  version: TestVersion;
  locale: Locale;
  senior: boolean;
  config: ReturnType<typeof getInterviewConfig>;
  onGrade: (id: number, g: Grade) => void;
  onSimEnd: (passed: boolean) => void;
}) {
  const [sim, setSim] = useState<SimState | null>(null);
  const recordedRef = useRef(false);

  function start() {
    recordedRef.current = false;
    setSim({
      questions: getRandomQuestions(version, locale, config.asked, {
        seniorOnly: senior,
      }),
      index: 0,
      correct: 0,
      wrong: 0,
      revealed: false,
      done: false,
      outcome: null,
    });
  }

  function finish(
    state: SimState,
    nextCorrect: number,
    nextWrong: number,
    outcome: SimState["outcome"]
  ) {
    const passed = outcome === "pass" || nextCorrect >= config.passThreshold;
    if (!recordedRef.current) {
      recordedRef.current = true;
      onSimEnd(passed);
    }
    setSim({
      ...state,
      correct: nextCorrect,
      wrong: nextWrong,
      done: true,
      outcome,
      revealed: false,
    });
  }

  function handleGrade(g: Grade) {
    if (!sim || sim.done) return;
    const q = sim.questions[sim.index];
    onGrade(q.id, g);
    const nextCorrect = sim.correct + (g === "correct" ? 1 : 0);
    const nextWrong = sim.wrong + (g === "wrong" ? 1 : 0);

    if (nextCorrect >= config.passThreshold) {
      finish(sim, nextCorrect, nextWrong, "pass");
      return;
    }
    if (nextWrong >= config.failThreshold) {
      finish(sim, nextCorrect, nextWrong, "fail");
      return;
    }
    if (sim.index >= sim.questions.length - 1) {
      finish(
        sim,
        nextCorrect,
        nextWrong,
        nextCorrect >= config.passThreshold ? "pass" : "fail"
      );
      return;
    }

    setSim({
      ...sim,
      correct: nextCorrect,
      wrong: nextWrong,
      index: sim.index + 1,
      revealed: false,
    });
  }

  if (!sim) {
    return (
      <div className="rounded-[1.35rem] border border-line bg-surface p-6 sm:p-8">
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
          {dict.interviewHowTitle}
        </h3>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink-soft sm:text-base">
          <li>{dict.interviewHow1}</li>
          <li>{dict.interviewHow2}</li>
          <li>{dict.interviewHow3}</li>
        </ol>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted">
          <span>
            {dict.passAt} {config.passThreshold}
          </span>
          <span>
            {dict.failAt} {config.failThreshold}
          </span>
          <span>
            {dict.question} {config.asked}
          </span>
        </div>
        <button type="button" onClick={start} className="gw-btn gw-btn-primary mt-8">
          {dict.startSim}
        </button>
      </div>
    );
  }

  if (sim.done) {
    const passed = sim.outcome === "pass";
    return (
      <div className="gw-rise overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-[0_20px_50px_rgba(11,28,44,0.08)]">
        <div
          className={`px-6 py-8 sm:px-10 sm:py-10 ${
            passed ? "bg-pass-soft" : "bg-amber-soft"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
            {dict.yourScore}
          </p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-6xl font-semibold tracking-tight text-ink">
            {sim.correct}
            <span className="text-3xl text-muted">
              {" "}
              / {sim.correct + sim.wrong}
            </span>
          </p>
          <p
            className={`mt-4 text-lg font-medium ${
              passed ? "text-pass" : "text-amber"
            }`}
          >
            {passed ? dict.stoppedPass : dict.stoppedFail}
          </p>
          <p className="mt-2 text-sm text-muted">
            {dict.passNeed} {config.passThreshold} {dict.correct} · {dict.failAt}{" "}
            {config.failThreshold}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 px-6 py-6 sm:px-10">
          <button type="button" onClick={start} className="gw-btn gw-btn-primary">
            {dict.tryAgain}
          </button>
          <button
            type="button"
            onClick={() => setSim(null)}
            className="gw-btn gw-btn-ghost"
          >
            {dict.endTest}
          </button>
        </div>
      </div>
    );
  }

  const current = sim.questions[sim.index];
  const askedSoFar = sim.index + 1;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted">
            {dict.question} {askedSoFar} {dict.of} {config.asked}
          </p>
          <div className="mt-2 flex gap-4 text-sm font-medium">
            <span className="text-pass">
              {dict.correctCount} {sim.correct}/{config.passThreshold}
            </span>
            <span className="text-miss">
              {dict.wrongCount} {sim.wrong}/{config.failThreshold}
            </span>
          </div>
        </div>
        <button
          type="button"
          className="text-sm font-medium text-muted underline-offset-2 hover:text-ink hover:underline"
          onClick={() => setSim(null)}
        >
          {dict.endTest}
        </button>
      </div>

      <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-mist">
        <div
          className="h-full rounded-full bg-signal transition-[width] duration-500"
          style={{
            width: `${(askedSoFar / config.asked) * 100}%`,
          }}
        />
      </div>

      <QuestionCard
        dict={dict}
        version={version}
        question={current}
        indexLabel={`${dict.modeSimulate} · Q ${askedSoFar}`}
        revealed={sim.revealed}
        onReveal={() => setSim({ ...sim, revealed: true })}
        onGrade={handleGrade}
      />
    </div>
  );
}

function browseStatus(
  progress: VersionProgress,
  id: number
): "new" | "weak" | "strong" | "seen" {
  const s = progress.questions[String(id)];
  if (!s) return "new";
  if (s.wrong > s.correct) return "weak";
  if (s.correct > 0 && s.lastResult === "correct") return "strong";
  return "seen";
}

function BrowseMode({
  dict,
  version,
  bank,
  progress,
  onGrade,
  onStudy,
}: {
  dict: Dictionary;
  version: TestVersion;
  bank: CivicsQuestion[];
  progress: VersionProgress;
  onGrade: (id: number, g: Grade) => void;
  onStudy: (id: number) => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return bank;
    return bank.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        String(item.id).includes(q) ||
        item.answers.some((a) => a.toLowerCase().includes(q))
    );
  }, [bank, query]);

  const selected =
    selectedId != null ? bank.find((q) => q.id === selectedId) ?? null : null;

  useEffect(() => {
    setSelectedId(null);
    setRevealed(false);
  }, [bank]);

  const statusLabel = {
    new: dict.browseNew,
    weak: dict.browseWeak,
    strong: dict.browseStrong,
    seen: dict.browseSeen,
  } as const;

  return (
    <div className="space-y-6">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={dict.browseSearch}
        className="w-full rounded-full border border-line bg-surface px-4 py-3 text-base outline-none transition-colors placeholder:text-muted focus:border-signal sm:text-sm"
      />

      {selected && (
        <div className="space-y-4">
          <QuestionCard
            dict={dict}
            version={version}
            question={selected}
            indexLabel={`Q ${selected.id}`}
            revealed={revealed}
            onReveal={() => setRevealed(true)}
            onGrade={(g) => {
              onGrade(selected.id, g);
              setRevealed(false);
            }}
            footer={
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="gw-btn gw-btn-secondary"
                  onClick={() => onStudy(selected.id)}
                >
                  {dict.browseStudy}
                </button>
                <button
                  type="button"
                  className="gw-btn gw-btn-ghost"
                  onClick={() => {
                    setSelectedId(null);
                    setRevealed(false);
                  }}
                >
                  {dict.endTest}
                </button>
              </div>
            }
          />
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-sm text-muted">{dict.browseEmpty}</p>
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {filtered.map((q) => {
            const status = browseStatus(progress, q.id);
            const changing = isChangingAnswer(version, q.id);
            return (
              <li key={q.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(q.id);
                    setRevealed(false);
                  }}
                  className={`flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-mist/70 ${
                    selectedId === q.id ? "bg-mist/80" : ""
                  }`}
                >
                  <span className="mt-0.5 w-8 shrink-0 text-xs font-semibold tabular-nums text-muted">
                    {q.id}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium leading-snug text-ink">
                      {q.question}
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                      <span>{q.category}</span>
                      {q.senior && <span>★ {dict.seniorBadge}</span>}
                      {changing && <span className="text-amber">{dict.changingBannerTitle}</span>}
                      <span
                        className={
                          status === "weak"
                            ? "text-miss"
                            : status === "strong"
                              ? "text-pass"
                              : ""
                        }
                      >
                        {statusLabel[status]}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
