"use client";

import React from "react";
import { Progress } from "antd";

interface BreakdownBarProps {
  salePrice: number;
  productCost: number;
  feeAmount: number;
  netProfit: number;
  healthScore: number;
}

export function BreakdownBar({
  salePrice,
  productCost,
  feeAmount,
  netProfit,
  healthScore,
}: BreakdownBarProps) {
  const safeTotal = Math.max(salePrice, productCost + feeAmount, 1);
  const costPct = Math.min(100, Math.max(0, (productCost / safeTotal) * 100));
  const feePct = Math.min(100 - costPct, Math.max(0, (feeAmount / safeTotal) * 100));
  const profitPct = Math.max(0, 100 - costPct - feePct);

  return (
    <div className="breakdown-box">
      <div>
        <div className="breakdown-track" aria-label="Revenue breakdown bar">
          <div style={{ width: `${profitPct}%`, backgroundColor: "var(--color-primary)" }} title="Net Profit" />
          <div style={{ width: `${feePct}%`, backgroundColor: "var(--color-amber)" }} title="Platform & Ad Fees" />
          <div style={{ width: `${costPct}%`, backgroundColor: "#B7B7AC" }} title="Product Cost" />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 14px", fontSize: "0.82rem" }}>
          <span style={{ color: "var(--text-primary-deep)", fontWeight: 700 }}>
            ● Keep: ${netProfit.toFixed(2)}
          </span>
          <span style={{ color: "var(--text-amber-badge)", fontWeight: 700 }}>
            ● Fees: ${feeAmount.toFixed(2)}
          </span>
          <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>
            ● Cost: ${productCost.toFixed(2)}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Progress
          type="circle"
          size={58}
          percent={healthScore}
          strokeColor={healthScore >= 55 ? "#10A37F" : "#F5A524"}
          trailColor="#E4E4DC"
          format={(pct) => (
            <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--text-heading)" }}>
              {pct}/100
            </span>
          )}
        />
      </div>
    </div>
  );
}
