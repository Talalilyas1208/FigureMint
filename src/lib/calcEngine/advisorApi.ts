interface AdvisorRequest {
  platform: string;
  salePrice: number;
  productCost: number;
  feePercent: number;
  fixedFee?: number;
}

// In-memory client cache to prevent duplicate AI calls
const clientAdvisorCache = new Map<string, string>();

function getAdvisorKey(p: AdvisorRequest): string {
  return `${p.platform}_${p.salePrice.toFixed(2)}_${p.productCost.toFixed(2)}_${p.feePercent.toFixed(2)}_${p.fixedFee ?? 0}`;
}

export async function fetchMarginAdvisor(payload: AdvisorRequest): Promise<string> {
  const fallback = "Test a 5%–10% higher offer price or 2-unit bundle to compare net margin.";
  const key = getAdvisorKey(payload);
  const cached = clientAdvisorCache.get(key);
  if (cached) {
    return cached;
  }

  try {
    const res = await fetch("/api/ai-advisor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        platform: payload.platform,
        salePrice: Math.max(1, payload.salePrice),
        productCost: Math.max(0, payload.productCost),
        feePercent: Math.min(94, Math.max(0, Number(payload.feePercent.toFixed(2)))),
        fixedFee: payload.fixedFee ?? 0,
      }),
    });
    if (!res.ok) return fallback;
    const data = await res.json();
    const result = data.advice ?? data.error ?? fallback;

    if (clientAdvisorCache.size > 200) {
      const first = clientAdvisorCache.keys().next().value;
      if (first) clientAdvisorCache.delete(first);
    }
    clientAdvisorCache.set(key, result);
    return result;
  } catch {
    return fallback;
  }
}
