import type { VersionProgress } from "./progress";

/** Merge local + remote progress (last-seen wins per question). */
export function mergeProgress(
  local: VersionProgress,
  remote: VersionProgress
): VersionProgress {
  const questions = { ...remote.questions };
  for (const [id, stats] of Object.entries(local.questions)) {
    const prev = questions[id];
    if (!prev || stats.lastSeenAt >= prev.lastSeenAt) {
      questions[id] = stats;
    }
  }
  return {
    questions,
    streak: Math.max(local.streak, remote.streak),
    bestStreak: Math.max(local.bestStreak, remote.bestStreak),
    simulationsPassed: Math.max(
      local.simulationsPassed,
      remote.simulationsPassed
    ),
    simulationsTaken: Math.max(local.simulationsTaken, remote.simulationsTaken),
    updatedAt: Math.max(local.updatedAt, remote.updatedAt),
  };
}
