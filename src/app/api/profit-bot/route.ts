import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { checkRateLimit, extractClientIp } from "@/lib/security/rateLimit";
import { ProfitBotSchema } from "@/lib/security/sanitize";
import { parseDealMessage } from "@/lib/bot/parseDealMessage";
import { insertAuditRecord } from "@/lib/db/supabaseStore";

export async function POST(req: NextRequest) {
  const ip = extractClientIp(req.headers);
  const limit = checkRateLimit(`bot:${ip}`, 20, 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many messages. Please wait a few seconds." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request JSON." }, { status: 400 });
  }

  const parsed = ProfitBotSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please type a valid question." },
      { status: 422 }
    );
  }

  const { metrics, localReply } = parseDealMessage(parsed.data.message);

  await insertAuditRecord(metrics.channel, metrics.gross, metrics.cost, 0, metrics.netProfit);

  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    try {
      const { text } = await generateText({
        model: google("gemini-2.0-flash"),
        maxTokens: 130,
        system:
          "You are FigureMint's Profit Bot. Explain the user's exact profit, margin %, and break-even ROAS in 2 crisp sentences using the verified numbers provided. No markdown bullet lists.",
        prompt: `User asked: "${parsed.data.message}". Verified math -> Channel: ${metrics.channel}, Gross: $${metrics.gross}, Cost: $${metrics.cost}, Fees: $${metrics.fees}, Net Profit: $${metrics.netProfit} (${metrics.marginPct}%), Break-Even ROAS: ${metrics.breakEvenRoas}.`,
      });
      if (text?.trim()) {
        return NextResponse.json({ reply: text.trim(), metrics });
      }
    } catch {
      /* Fall back cleanly to deterministic reply */
    }
  }

  return NextResponse.json({ reply: localReply, metrics });
}

