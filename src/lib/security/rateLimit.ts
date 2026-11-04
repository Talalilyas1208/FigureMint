interface Bucket {
  timestamps: number[];
}

const buckets = new Map<string, Bucket>();
const MAX_TRACKED_KEYS = 2000;

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSec: number;
}

export function checkRateLimit(
  key: string,
  limit = 20,
  windowMs = 60_000
): RateLimitResult {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (buckets.size > MAX_TRACKED_KEYS) {
    for (const [k, v] of buckets.entries()) {
      if (v.timestamps.every((t) => t <= windowStart)) {
        buckets.delete(k);
      }
      if (buckets.size <= MAX_TRACKED_KEYS / 2) break;
    }
  }

  const existing = buckets.get(key) ?? { timestamps: [] };
  const active = existing.timestamps.filter((t) => t > windowStart);

  if (active.length >= limit) {
    const oldest = active[0] ?? now;
    const retryAfterSec = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    buckets.set(key, { timestamps: active });
    return { allowed: false, remaining: 0, retryAfterSec };
  }

  active.push(now);
  buckets.set(key, { timestamps: active });
  return {
    allowed: true,
    remaining: Math.max(0, limit - active.length),
    retryAfterSec: 0,
  };
}

export function extractClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim().slice(0, 64) || "unknown";
  }
  return headers.get("x-real-ip")?.trim().slice(0, 64) || "local";
}

