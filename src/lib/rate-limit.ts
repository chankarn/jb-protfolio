// Minimal in-memory sliding-window rate limiter (docs/SA_BLUEPRINT.md §4).
// Sized for a portfolio's traffic; on serverless it's best-effort per instance,
// which is enough to blunt naive spam scripts without external infrastructure.
const hits = new Map<string, number[]>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 5;

export function rateLimit(key: string): { allowed: boolean } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((ts) => now - ts < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return { allowed: false };
  }

  recent.push(now);
  hits.set(key, recent);
  return { allowed: true };
}
