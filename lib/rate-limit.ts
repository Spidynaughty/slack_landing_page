/**
 * Small in-memory rate limits, kept per server process. Enough to slow down
 * password guessing and form spam on one server; a deployment that runs many
 * servers side by side would need a shared store (such as Redis) instead.
 */
import "server-only";

type Window = { count: number; resetAt: number };
type Limiter = {
  /** True once `key` has used up its limit for the current window. */
  limited: (key: string) => boolean;
  /** Counts one use of `key`. */
  count: (key: string) => void;
  clear: (key: string) => void;
};

const MAX_KEYS = 5000;
const store = globalThis as typeof globalThis & { __ktLimits?: Map<string, Map<string, Window>> };

/** A named limit: at most `limit` uses per key within `windowMs`. */
export function rateLimiter(name: string, limit: number, windowMs: number): Limiter {
  store.__ktLimits ??= new Map();
  let windows = store.__ktLimits.get(name);
  if (!windows) store.__ktLimits.set(name, (windows = new Map()));
  const hits = windows;

  const current = (key: string, now: number) => {
    const w = hits.get(key);
    if (w && w.resetAt > now) return w;
    if (w) hits.delete(key);
    return null;
  };

  return {
    limited: (key) => (current(key, Date.now())?.count ?? 0) >= limit,
    count: (key) => {
      const now = Date.now();
      const w = current(key, now);
      if (w) {
        w.count += 1;
        return;
      }
      if (hits.size >= MAX_KEYS) {
        for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
        // Still full: a flood of made-up addresses. Forget the oldest ones.
        for (const k of hits.keys()) {
          if (hits.size < MAX_KEYS / 2) break;
          hits.delete(k);
        }
      }
      hits.set(key, { count: 1, resetAt: now + windowMs });
    },
    clear: (key) => {
      hits.delete(key);
    },
  };
}

/**
 * The visitor's address as reported by the proxy in front of the server.
 * It can be made up when the server is reached directly, which is why every
 * limit that uses it is paired with a limit on all visitors together.
 */
export function clientAddress(h: Headers) {
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip")?.trim() || "local";
}
