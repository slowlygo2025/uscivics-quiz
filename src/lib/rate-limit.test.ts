import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { emailBucket, memoryLimit } from "./rate-limit";

describe("memoryLimit", () => {
  it("allows up to max then blocks", () => {
    const store = new Map();
    const now = 1_000_000;
    assert.equal(memoryLimit(store, "k", 2, 60_000, now).ok, true);
    assert.equal(memoryLimit(store, "k", 2, 60_000, now + 1).ok, true);
    assert.equal(memoryLimit(store, "k", 2, 60_000, now + 2).ok, false);
  });

  it("resets after the window", () => {
    const store = new Map();
    const now = 1_000_000;
    memoryLimit(store, "k", 1, 1000, now);
    assert.equal(memoryLimit(store, "k", 1, 1000, now + 10).ok, false);
    assert.equal(memoryLimit(store, "k", 1, 1000, now + 1001).ok, true);
  });
});

describe("emailBucket", () => {
  it("normalizes case and trims", () => {
    assert.equal(emailBucket("  A@B.com "), "a@b.com");
  });
});
