"use client";

import React, { useRef, useState } from "react";
import { CalculatorOutlined, CloseOutlined, SendOutlined } from "@ant-design/icons";
import type { BotDealMetrics } from "@/lib/bot/parseDealMessage";
import { AppButton } from "@/components/ui/AppButton";

interface ChatTurn {
  role: "user" | "bot";
  text: string;
  metrics?: BotDealMetrics;
}

const QUICK_PROMPTS = [
  "TikTok $45 sale, $12 cost, 18% fee",
  "Etsy $36 item, $10 cost, 12% offsite",
  "Stripe $150 intl vs $35 cost",
  "ROAS on $68 AOV, $21 cost",
];

const INITIAL_TURN: ChatTurn = {
  role: "bot",
  text: "Type any price, cost, or marketplace (e.g. 'TikTok $42 sale, $11 cost, 18% fee') and I'll calculate your exact net profit, margin %, and break-even ROAS.",
};

async function postBotMessage(message: string): Promise<{ reply: string; metrics?: BotDealMetrics }> {
  try {
    const res = await fetch("/api/profit-bot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    return {
      reply: data.reply ?? data.error ?? "Please enter a valid sale price and cost.",
      metrics: data.metrics,
    };
  } catch {
    return { reply: "Connection interrupted. Please try sending your numbers again." };
  }
}

export function ProfitBotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [turns, setTurns] = useState<ChatTurn[]>([INITIAL_TURN]);
  const streamRef = useRef<HTMLDivElement>(null);

  const sendPrompt = async (rawText: string) => {
    const clean = rawText.trim();
    if (!clean || loading) return;
    setInput("");
    setTurns((prev) => [...prev, { role: "user", text: clean }]);
    setLoading(true);

    const result = await postBotMessage(clean);
    setTurns((prev) => [...prev, { role: "bot", text: result.reply, metrics: result.metrics }]);
    setLoading(false);
    setTimeout(() => streamRef.current?.scrollTo({ top: 99999, behavior: "smooth" }), 40);
  };

  return (
    <>
      {open && (
        <section className="bot-window" aria-label="Profit and Margin Assistant">
          <div className="bot-header">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 9, height: 9, borderRadius: 99, backgroundColor: "var(--color-primary)" }} />
              <strong style={{ color: "var(--text-heading)", fontSize: "0.95rem" }}>Margin &amp; Profit Bot</strong>
            </div>
            <AppButton variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close Profit Bot" style={{ minHeight: 36, width: 36 }}>
              <CloseOutlined />
            </AppButton>
          </div>

          <div ref={streamRef} className="bot-stream">
            {turns.map((t, i) => (
              <div key={i} className={t.role === "user" ? "bot-bubble-user" : "bot-bubble-ai"}>
                {t.metrics && (
                  <div className="bot-metric-strip">
                    <div><strong>Net:</strong> ${t.metrics.netProfit.toFixed(2)}</div>
                    <div><strong>Margin:</strong> {t.metrics.marginPct}%</div>
                    <div><strong>Fees:</strong> ${t.metrics.fees.toFixed(2)}</div>
                    <div><strong>BE ROAS:</strong> {t.metrics.breakEvenRoas}</div>
                  </div>
                )}
                <div>{t.text}</div>
              </div>
            ))}
          </div>

          <div className="bot-chips">
            {QUICK_PROMPTS.map((q) => (
              <button key={q} type="button" onClick={() => sendPrompt(q)} className="ui-badge ui-badge-amber" style={{ cursor: "pointer" }}>
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendPrompt(input);
            }}
            style={{ display: "flex", gap: 8, padding: 10, borderTop: "1px solid var(--border-warm)", backgroundColor: "var(--bg-card)" }}
          >
            <input
              type="text"
              value={input}
              maxLength={400}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. $48 sale, $14 cost, 15% fee..."
              className="ui-input-el"
              style={{ border: "1px solid var(--border-warm-strong)", borderRadius: 10, paddingInline: 12 }}
              aria-label="Ask profit or margin question"
            />
            <AppButton type="submit" variant="primary" size="icon" loading={loading} aria-label="Calculate margin">
              <SendOutlined />
            </AppButton>
          </form>
        </section>
      )}

      <button type="button" className="bot-fab" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <CalculatorOutlined />
        <span>{open ? "Hide Bot" : "Profit Bot"}</span>
      </button>
    </>
  );
}
