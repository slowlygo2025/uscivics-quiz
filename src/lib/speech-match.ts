/** Fuzzy match spoken English against accepted civics answers. */

export function normalizeSpeech(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function speechMatchesAnswer(
  heard: string,
  accepted: string[]
): { ok: boolean; matched?: string; score: number } {
  const h = normalizeSpeech(heard);
  if (!h) return { ok: false, score: 0 };

  let best = { ok: false, matched: undefined as string | undefined, score: 0 };

  for (const raw of accepted) {
    const a = normalizeSpeech(raw);
    if (!a) continue;

    if (h === a || h.includes(a) || a.includes(h)) {
      return { ok: true, matched: raw, score: 1 };
    }

    const hTokens = new Set(h.split(" ").filter(Boolean));
    const aTokens = a.split(" ").filter(Boolean);
    if (aTokens.length === 0) continue;
    const hit = aTokens.filter((t) => hTokens.has(t) || [...hTokens].some((x) => x.includes(t) || t.includes(x))).length;
    const score = hit / aTokens.length;
    if (score > best.score) {
      best = { ok: score >= 0.6, matched: raw, score };
    }
  }

  return best;
}
