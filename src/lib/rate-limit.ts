/**
 * Rate limit for serverless routes.
 *
 * Priority:
 * 1. Upstash Redis REST (durable across instances) when env is set
 * 2. Process-global memory Map (warm instances) as fallback
 *
 * Env (optional):
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 */

export type LimitResult = { ok: boolean; remaining: number; backend: "upstash" | "memory" };

type MemoryStore = Map<string, { count: number; reset: number }>;

declare global {
  // eslint-disable-next-line no-var
  var __uscivicsRateLimitStore: MemoryStore | undefined;
}

function memoryStore(): MemoryStore {
  if (!globalThis.__uscivicsRateLimitStore) {
    globalThis.__uscivicsRateLimitStore = new Map();
  }
  return globalThis.__uscivicsRateLimitStore;
}

/** Pure in-memory limiter (exported for unit tests). */
export function memoryLimit(
  store: MemoryStore,
  key: string,
  max: number,
  windowMs: number,
  now = Date.now()
): LimitResult {
  const row = store.get(key);
  if (!row || now > row.reset) {
    store.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: max - 1, backend: "memory" };
  }
  if (row.count >= max) return { ok: false, remaining: 0, backend: "memory" };
  row.count += 1;
  return { ok: true, remaining: max - row.count, backend: "memory" };
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
      backend: "upstash",
    };
  } catch {
    return null;
  }
}

/**
 * Apply several limit keys; fails if ANY bucket is exhausted.
 * Use for IP + email (or other dimensions) on the same request.
 */
export async function rateLimitAll(
  keys: string[],
  opts: { max: number; windowMs: number }
): Promise<LimitResult> {
  let worst: LimitResult = {
    ok: true,
    remaining: opts.max,
    backend: "memory",
  };
  for (const key of keys) {
    const r = await rateLimit({ key, ...opts });
    if (r.remaining < worst.remaining || !r.ok) worst = r;
    if (!r.ok) return r;
  }
  return worst;
}

export async function rateLimit(opts: {
  key: string;
  max: number;
  windowMs: number;
}): Promise<LimitResult> {
  const windowSec = Math.max(1, Math.ceil(opts.windowMs / 1000));
  const remote = await upstashLimit(opts.key, opts.max, windowSec);
  if (remote) return remote;
  return memoryLimit(memoryStore(), opts.key, opts.max, opts.windowMs);
}

export function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/** Stable fingerprint for email rate buckets (not a hash secret). */
export function emailBucket(email: string): string {
  return email.trim().toLowerCase().slice(0, 160);
}
