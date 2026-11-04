import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { checkRateLimit, extractClientIp } from "@/lib/security/rateLimit";
import { MarginAdvisorSchema } from "@/lib/security/sanitize";
import { insertAuditRecord } from "@/lib/db/supabaseStore";

function buildDeterministicTip(
  platform: string,
  salePrice: number,
  productCost: number,
  feePercent: number,
  netProfit: number,
  marginPct: number
): string {
  const breakEvenRoas =
    salePrice - productCost > 0
      ? (salePrice / (salePrice - productCost)).toFixed(2)
      : "N/A";
  if (marginPct < 10) {
    const neededPrice = ((productCost + 0.3) / Math.max(0.15, 0.78 - feePercent / 100)).toFixed(2);
    return `Margin Alert (${marginPct.toFixed(1)}%): Fees (${feePercent}%) + COGS leave only $${netProfit.toFixed(2)}/unit on ${platform}. Lifting price toward $${neededPrice} or bundling 2 units restores a healthy 22%+ buffer.`;
  }
  if (marginPct < 24) {
    return `Solid Baseline (${marginPct.toFixed(1)}% net, $${netProfit.toFixed(2)}/order): Your pre-ad Break-Even ROAS is ${breakEvenRoas}x. Negotiating 8% lower unit COGS or raising AOV with an order bump adds ~$${(salePrice * 0.09).toFixed(2)} pure profit.`;
  }
  return `High-Margin Winner (${marginPct.toFixed(1)}% net, $${netProfit.toFixed(2)}/order): Strong unit economics on ${platform} (Break-Even ROAS ${breakEvenRoas}x). You can safely allocate up to $${(netProfit * 0.45).toFixed(2)} CPA to scale volume while keeping ~15%+ net.`;
}

export async function POST(req: NextRequest) {
  const ip = extractClientIp(req.headers);
  const limit = checkRateLimit(`ai:${ip}`, 15, 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many AI audits. Please wait a moment." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = MarginAdvisorSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid calculation inputs." }, { status: 422 });
  }

  const { platform, salePrice, productCost, feePercent, fixedFee } = parsed.data;
  const feeAmount = (salePrice * feePercent) / 100 + fixedFee;
  const netProfit = salePrice - productCost - feeAmount;
  const marginPct = salePrice > 0 ? (netProfit / salePrice) * 100 : 0;

  await insertAuditRecord(
    platform,
    salePrice,
    productCost,
    feePercent,
    Number(netProfit.toFixed(2))
  );

  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    try {
      const { text } = await generateText({
        model: google("gemini-2.0-flash"),
        maxTokens: 130,
        system:
          "You are FigureMint's concise e-commerce & freelance unit-economics advisor. Give 2 crisp, actionable sentences with exact dollar/percentage math. No markdown bullets.",
        prompt: `Platform: ${platform}. Sale Price: $${salePrice}. COGS: $${productCost}. Platform/Ad Fee: ${feePercent}% + $${fixedFee}. Net Profit: $${netProfit.toFixed(2)} (${marginPct.toFixed(1)}%). How should the seller improve net profit?`,
      });
      if (text?.trim()) {
        return NextResponse.json({ advice: text.trim(), source: "vercel-ai-sdk" });
      }
    } catch {
      /* Fall back cleanly to deterministic unit-economics engine */
    }
  }

  return NextResponse.json({
    advice: buildDeterministicTip(
      platform,
      salePrice,
      productCost,
      feePercent,
      netProfit,
      marginPct
    ),
    source: "unit-economics-engine",
  });
}

