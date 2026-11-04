export interface BotDealMetrics {
  channel: string;
  gross: number;
  cost: number;
  fees: number;
  netProfit: number;
  marginPct: number;
  breakEvenRoas: string;
}

interface ParsedDealOutcome {
  metrics: BotDealMetrics;
  localReply: string;
}

function detectChannel(lower: string): { name: string; feePct: number; fixed: number } {
  if (lower.includes("etsy")) {
    const offsite = lower.includes("15%") ? 15 : lower.includes("offsite") || lower.includes("12%") ? 12 : 0;
    return { name: "Etsy", feePct: 9.5 + offsite, fixed: 0.45 };
  }
  if (lower.includes("paypal")) return { name: "PayPal Intl", feePct: 7.99, fixed: 0.49 };
  if (lower.includes("stripe")) return { name: "Stripe", feePct: lower.includes("intl") || lower.includes("international") ? 5.4 : 2.9, fixed: 0.3 };
  if (lower.includes("shopify") || lower.includes("pod") || lower.includes("print")) return { name: "Shopify POD", feePct: 2.9, fixed: 0.3 };
  if (lower.includes("upwork") || lower.includes("freelance") || lower.includes("/hr")) return { name: "Upwork / Freelance", feePct: 34, fixed: 0 };
  if (lower.includes("roas") || lower.includes("meta") || lower.includes("ad")) return { name: "Paid Ads / ROAS", feePct: 3.4, fixed: 0.3 };
  return { name: "TikTok Shop", feePct: 18, fixed: 0.3 };
}

export function parseDealMessage(text: string): ParsedDealOutcome {
  const lower = text.toLowerCase();
  const base = detectChannel(lower);

  // Extract explicit percentage if provided (e.g. "16% fee")
  const pctMatch = text.match(/(\d+(?:\.\d+)?)\s*%/);
  const feePct = pctMatch ? Math.min(90, Number(pctMatch[1])) : base.feePct;

  // Extract all non-percentage numbers (dollar figures)
  const strippedPcts = text.replace(/\d+(?:\.\d+)?\s*%/g, " ");
  const nums = [...strippedPcts.matchAll(/\$?\s*(\d+(?:\.\d+)?)/g)]
    .map((m) => Number(m[1]))
    .filter((n) => Number.isFinite(n) && n > 0 && n <= 100_000);

  const gross = nums[0] ?? 42;
  const baseCost = nums[1] ?? Number((gross * 0.28).toFixed(2));
  const extraShip = nums[2] ?? 0;
  const cost = Number((baseCost + extraShip).toFixed(2));

  const fees = Number(((gross * feePct) / 100 + base.fixed).toFixed(2));
  const netProfit = Number((gross - cost - fees).toFixed(2));
  const marginPct = gross > 0 ? Number(((netProfit / gross) * 100).toFixed(1)) : 0;
  const preAd = gross - cost;
  const breakEvenRoas = preAd > 0 ? `${(gross / preAd).toFixed(2)}x` : "N/A";

  const verdict =
    marginPct < 10
      ? `Tight margin (${marginPct}%): raising price to ~$${((cost + base.fixed) / Math.max(0.15, 0.78 - feePct / 100)).toFixed(2)} restores a safer 22%+ buffer.`
      : marginPct < 25
      ? `Healthy baseline (${marginPct}%): your pre-ad Break-Even ROAS is ${breakEvenRoas}; bundling 2 units can add ~$${(gross * 0.08).toFixed(2)} extra keep.`
      : `Strong unit economics (${marginPct}%): you keep $${netProfit.toFixed(2)} per sale and can spend up to $${(netProfit * 0.45).toFixed(2)} CPA while staying profitable.`;

  return {
    metrics: { channel: base.name, gross, cost, fees, netProfit, marginPct, breakEvenRoas },
    localReply: `${base.name} Breakdown: $${gross.toFixed(2)} gross − $${cost.toFixed(2)} cost − $${fees.toFixed(2)} fees (${feePct}%) = $${netProfit.toFixed(2)} net profit. ${verdict}`,
  };
}
