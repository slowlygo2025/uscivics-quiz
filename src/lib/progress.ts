import type { TestVersion } from "./types";

export type Grade = "correct" | "wrong";

export interface QuestionStats {
  correct: number;
  wrong: number;
  lastResult?: Grade;
  lastSeenAt: number;
}

export interface VersionProgress {
  questions: Record<string, QuestionStats>;
  streak: number;
  bestStreak: number;
  simulationsPassed: number;
  simulationsTaken: number;
  updatedAt: number;
}

const STORAGE_KEY = "uscivics-progress-v1";

function emptyProgress(): VersionProgress {
  return {
    questions: {},
    streak: 0,
    bestStreak: 0,
    simulationsPassed: 0,
    simulationsTaken: 0,
    updatedAt: Date.now(),
  };
}

function readAll(): Partial<Record<TestVersion, VersionProgress>> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<Record<TestVersion, VersionProgress>>;
  } catch {
    return {};
  }
}

function writeAll(data: Partial<Record<TestVersion, VersionProgress>>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore quota / private mode
  }
}

export function loadProgress(version: TestVersion): VersionProgress {
  const all = readAll();
  return all[version] ?? emptyProgress();
}

export function saveProgress(version: TestVersion, progress: VersionProgress) {
  const all = readAll();
  all[version] = { ...progress, updatedAt: Date.now() };
  writeAll(all);
}

export function resetProgress(version: TestVersion) {
  const all = readAll();
  all[version] = emptyProgress();
  writeAll(all);
}

export function recordGrade(
  progress: VersionProgress,
  questionId: number,
  grade: Grade
): VersionProgress {
  const key = String(questionId);
  const prev = progress.questions[key] ?? {
    correct: 0,
    wrong: 0,
    lastSeenAt: 0,
  };
  const nextStats: QuestionStats = {
    correct: prev.correct + (grade === "correct" ? 1 : 0),
    wrong: prev.wrong + (grade === "wrong" ? 1 : 0),
    lastResult: grade,
    lastSeenAt: Date.now(),
  };
  const streak = grade === "correct" ? progress.streak + 1 : 0;
  return {
    ...progress,
    questions: { ...progress.questions, [key]: nextStats },
    streak,
    bestStreak: Math.max(progress.bestStreak, streak),
    updatedAt: Date.now(),
  };
}

export function recordSimulation(
  progress: VersionProgress,
  passed: boolean
): VersionProgress {
  return {
    ...progress,
    simulationsTaken: progress.simulationsTaken + 1,
    simulationsPassed:
      progress.simulationsPassed + (passed ? 1 : 0),
    updatedAt: Date.now(),
  };
}

export function summarizeProgress(
  progress: VersionProgress,
  totalQuestions: number
) {
  const entries = Object.values(progress.questions);
  const seen = entries.length;
  const mastered = entries.filter(
    (q) => q.correct > 0 && q.correct >= q.wrong && q.lastResult === "correct"
  ).length;
  const weak = entries.filter((q) => q.wrong > q.correct).length;
  const totalCorrect = entries.reduce((s, q) => s + q.correct, 0);
  const totalWrong = entries.reduce((s, q) => s + q.wrong, 0);
  const attempts = totalCorrect + totalWrong;
  const accuracy = attempts === 0 ? 0 : Math.round((totalCorrect / attempts) * 100);

  return {
    seen,
    total: totalQuestions,
    mastered,
    weak,
    streak: progress.streak,
    bestStreak: progress.bestStreak,
    accuracy,
    totalCorrect,
    totalWrong,
    simulationsPassed: progress.simulationsPassed,
    simulationsTaken: progress.simulationsTaken,
  };
}

/** Higher score = should appear sooner in smart practice. */
export function smartPriority(
  questionId: number,
  progress: VersionProgress
): number {
  const stats = progress.questions[String(questionId)];
  if (!stats) return 1000; // unseen first
  const wrongBias = stats.wrong * 40;
  const correctBias = stats.correct * -12;
  const recency =
    (Date.now() - (stats.lastSeenAt || 0)) / (1000 * 60 * 60 * 24); // days
  const lastWrong = stats.lastResult === "wrong" ? 80 : 0;
  return wrongBias + correctBias + Math.min(recency * 8, 60) + lastWrong;
}
