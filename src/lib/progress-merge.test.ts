import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { mergeProgress } from "./progress-merge";
import type { VersionProgress } from "./progress";

function base(partial: Partial<VersionProgress> = {}): VersionProgress {
  return {
    questions: {},
    streak: 0,
    bestStreak: 0,
    simulationsPassed: 0,
    simulationsTaken: 0,
    updatedAt: 0,
    ...partial,
  };
}

describe("mergeProgress", () => {
  it("keeps newer question stats by lastSeenAt", () => {
    const local = base({
      questions: {
        q1: { correct: 1, wrong: 0, lastSeenAt: 200 },
      },
      updatedAt: 200,
    });
    const remote = base({
      questions: {
        q1: { correct: 0, wrong: 2, lastSeenAt: 100 },
        q2: { correct: 1, wrong: 0, lastSeenAt: 50 },
      },
      updatedAt: 100,
    });
    const merged = mergeProgress(local, remote);
    assert.equal(merged.questions.q1?.correct, 1);
    assert.equal(merged.questions.q2?.correct, 1);
    assert.equal(merged.updatedAt, 200);
  });

  it("takes max streaks and simulation counters", () => {
    const merged = mergeProgress(
      base({ streak: 3, bestStreak: 5, simulationsPassed: 1, simulationsTaken: 2 }),
      base({ streak: 1, bestStreak: 9, simulationsPassed: 4, simulationsTaken: 4 })
    );
    assert.equal(merged.streak, 3);
    assert.equal(merged.bestStreak, 9);
    assert.equal(merged.simulationsPassed, 4);
    assert.equal(merged.simulationsTaken, 4);
  });
});
