import React from "react";

interface ResultKpiStripProps {
  netProfit: number;
  marginPct: number;
  secondaryLabel: string;
  secondaryValue: string;
}

export function ResultKpiStrip({
  netProfit,
  marginPct,
  secondaryLabel,
  secondaryValue,
}: ResultKpiStripProps) {
  return (
    <div className="kpi-grid">
      <div className="kpi-card kpi-card-primary">
        <div className="kpi-caption">Net Profit</div>
        <div
          className="kpi-value"
          style={{ color: netProfit >= 0 ? "var(--color-primary)" : "#A94520" }}
        >
          ${netProfit.toFixed(2)}
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-caption">Net Margin</div>
        <div className="kpi-value">{marginPct.toFixed(1)}%</div>
      </div>

      <div className="kpi-card kpi-card-accent">
        <div className="kpi-caption" style={{ color: "var(--text-amber-badge)" }}>
          {secondaryLabel}
        </div>
        <div className="kpi-value">{secondaryValue}</div>
      </div>
    </div>
  );
}
