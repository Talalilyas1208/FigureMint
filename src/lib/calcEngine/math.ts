export function num(v: number | string | undefined, fb: number): number {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  const parsed = Number(v);
  return Number.isFinite(parsed) ? parsed : fb;
}

export function calcMarginPct(gross: number, net: number): number {
  return gross > 0 ? (net / gross) * 100 : 0;
}

export function calcHealthScore(marginPct: number, multiplier = 2.8): number {
  return Math.max(0, Math.min(100, Math.round(marginPct * multiplier)));
}

export function calcBreakEvenRoas(gross: number, preAdMargin: number): string {
  return preAdMargin > 0 ? `${(gross / preAdMargin).toFixed(2)}x` : "N/A";
}

export interface QuickMetrics {
  feeAmount: number;
  netProfit: number;
  marginPct: number;
  breakEvenRoas: string;
  healthScore: number;
}

export function calcQuickMetrics(
  price: number,
  cost: number,
  feePct: number,
  fixedFee: number
): QuickMetrics {
  const feeAmount = (price * feePct) / 100 + fixedFee;
  const netProfit = price - cost - feeAmount;
  const marginPct = calcMarginPct(price, netProfit);
  const preAd = price - cost;
  return {
    feeAmount,
    netProfit,
    marginPct,
    breakEvenRoas: calcBreakEvenRoas(price, preAd),
    healthScore: calcHealthScore(marginPct),
  };
}

