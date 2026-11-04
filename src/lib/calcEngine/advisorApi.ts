interface AdvisorRequest {
  platform: string;
  salePrice: number;
  productCost: number;
  feePercent: number;
  fixedFee?: number;
}

export async function fetchMarginAdvisor(payload: AdvisorRequest): Promise<string> {
  const fallback = "Test a 5%–10% higher offer price or 2-unit bundle to compare net margin.";
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
    return data.advice ?? data.error ?? fallback;
  } catch {
    return fallback;
  }
}
