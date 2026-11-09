import type { CalcResult, CalcValues } from "./types";

export interface DynamicCalcResponse {
  ok: boolean;
  slug: string;
  calculatedAt: string;
  engineVersion: string;
  result: CalcResult;
  error?: string;
}

// Client-side in-memory Map cache to eliminate duplicate network calls on slider movements
const clientCalculationCache = new Map<string, DynamicCalcResponse>();

function getClientCacheKey(slug: string, values: CalcValues): string {
  const sorted = Object.entries(values)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
  return `${slug}#${sorted}`;
}

export async function calculateViaApi(
  slug: string,
  values: CalcValues
): Promise<DynamicCalcResponse | null> {
  const cacheKey = getClientCacheKey(slug, values);
  const cached = clientCalculationCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const res = await fetch("/api/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, values }),
    });

    if (!res.ok) return null;
    const data: DynamicCalcResponse = await res.json();
    if (data.ok) {
      if (clientCalculationCache.size > 500) {
        const firstKey = clientCalculationCache.keys().next().value;
        if (firstKey) clientCalculationCache.delete(firstKey);
      }
      clientCalculationCache.set(cacheKey, data);
      return data;
    }
    return null;
  } catch {
    return null;
  }
}
