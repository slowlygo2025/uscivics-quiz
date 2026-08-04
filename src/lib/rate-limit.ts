/**
 * Rate limit for serverless routes.
 * Uses Upstash Redis REST when configured; otherwise in-memory (per instance).
 *
 * Env (optional):
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 */

type LimitResult = { ok: boolean; remaining: number };

const memory = new Map<string, { count: number; reset: number }>();

function memoryLimit(
  key: string,
  max: number,
  windowMs: number
): LimitResult {
  const now = Date.now();
  const row = memory.get(key);
  if (!row || now > row.reset) {
    memory.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: max - 1 };
  }
  if (row.count >= max) return { ok: false, remaining: 0 };
  row.count += 1;
  return { ok: true, remaining: max - row.count };
}

async function upstashLimit(
  key: string,
  max: number,
  windowSec: number
): Promise<LimitResult | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;

  const redisKey = `rl:${key}`;
  try {
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", redisKey],
        ["EXPIRE", redisKey, windowSec, "NX"],
      ]),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Array<{ result: number | string | null }>;
    const count = Number(data[0]?.result ?? 0);
    if (!Number.isFinite(count) || count <= 0) return null;
    return {
      ok: count <= max,
      remaining: Math.max(0, max - count),
    };
  } catch {
    return null;
  }
}

export async function rateLimit(opts: {
  key: string;
  max: number;
  windowMs: number;
}): Promise<LimitResult> {
  const windowSec = Math.max(1, Math.ceil(opts.windowMs / 1000));
  const remote = await upstashLimit(opts.key, opts.max, windowSec);
  if (remote) return remote;
  return memoryLimit(opts.key, opts.max, opts.windowMs);
}

export function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
