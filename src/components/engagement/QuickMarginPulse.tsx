"use client";

import React, { useMemo, useState } from "react";
import { CheckSquareOutlined, CopyOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { calcQuickMetrics, type QuickMetrics } from "@/lib/calcEngine/math";
import { fetchMarginAdvisor } from "@/lib/calcEngine/advisorApi";
import { copyToClipboard } from "@/lib/utils/clipboard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleBookmark } from "@/store/uiSlice";
import { AppCard } from "@/components/ui/AppCard";
import { AppSelect } from "@/components/ui/AppSelect";
import { AppSliderField } from "@/components/ui/AppSliderField";
import { AppButton } from "@/components/ui/AppButton";
import { AppBadge } from "@/components/ui/AppBadge";
import { ResultKpiStrip } from "@/components/calculator/ResultKpiStrip";
import { BreakdownBar } from "./BreakdownBar";

export function QuickMarginPulse() {
  const dispatch = useAppDispatch();
  const catalog = useAppSelector((s) => s.catalog.items);
  const bookmarks = useAppSelector((s) => s.ui.bookmarks);
  const initialTool = catalog[0];

  const [slug, setSlug] = useState(initialTool.slug);
  const [price, setPrice] = useState(initialTool.defaultPrice);
  const [cost, setCost] = useState(initialTool.defaultCost);
  const [feePct, setFeePct] = useState(initialTool.defaultFeePct);
  const [diagnosis, setDiagnosis] = useState("");
  const [checking, setChecking] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeTool = useMemo(() => catalog.find((c) => c.slug === slug) ?? catalog[0], [catalog, slug]);
  const metrics: QuickMetrics = useMemo(() => calcQuickMetrics(price, cost, feePct, activeTool.fixedFee), [price, cost, feePct, activeTool.fixedFee]);
  const isSaved = bookmarks.includes(slug);

  const handlePlatformSwitch = (nextSlug: string) => {
    const found = catalog.find((c) => c.slug === nextSlug);
    setSlug(nextSlug);
    setDiagnosis("");
    if (found) {
      setPrice(found.defaultPrice);
      setCost(found.defaultCost);
      setFeePct(found.defaultFeePct);
    }
  };

  const runMarginCheck = async () => {
    setChecking(true);
    try {
      const tip = await fetchMarginAdvisor({
        platform: activeTool.shortTitle,
        salePrice: price,
        productCost: cost,
        feePercent: feePct,
        fixedFee: activeTool.fixedFee,
      });
      setDiagnosis(tip);
    } finally {
      setChecking(false);
    }
  };

  const copyBreakdown = async () => {
    const summary = `${activeTool.shortTitle}: $${price.toFixed(2)} Sale − $${cost.toFixed(2)} Cost − $${metrics.feeAmount.toFixed(2)} Fees (${feePct}%) = $${metrics.netProfit.toFixed(2)} Net (${metrics.marginPct.toFixed(1)}%)`;
    const ok = await copyToClipboard(summary);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <AppCard padding="lg">
      <div className="calc-card-head">
        <AppBadge tone="emerald">Quick Profit Estimator</AppBadge>
        <AppButton variant="ghost" onClick={() => dispatch(toggleBookmark(slug))} leftIcon={isSaved ? <StarFilled style={{ color: "var(--color-amber)" }} /> : <StarOutlined />}>
          {isSaved ? "Saved" : "Save"}
        </AppButton>
      </div>

      <div className="calc-stack">
        <AppSelect label="Marketplace or Channel" value={slug} options={catalog.map((c) => ({ value: c.slug, label: c.title }))} onChange={handlePlatformSwitch} />
        <AppSliderField label="Selling Price / Invoice" value={price} min={5} max={500} step={1} unitPrefix="$" onChange={setPrice} />
        <AppSliderField label="Product Cost / Expense" value={cost} min={0} max={350} step={0.5} unitPrefix="$" onChange={setCost} />
        <AppSliderField label="Platform + Ad Fee %" value={feePct} min={1} max={55} step={0.5} unitSuffix="%" onChange={setFeePct} />

        <ResultKpiStrip netProfit={metrics.netProfit} marginPct={metrics.marginPct} secondaryLabel="Pre-Ad Break-Even ROAS" secondaryValue={metrics.breakEvenRoas} />
        <BreakdownBar salePrice={price} productCost={cost} feeAmount={metrics.feeAmount} netProfit={metrics.netProfit} healthScore={metrics.healthScore} />

        <div className="calc-actions">
          <AppButton variant="primary" loading={checking} onClick={runMarginCheck} leftIcon={<CheckSquareOutlined />}>
            Run Margin Check
          </AppButton>
          <AppButton variant="secondary" onClick={copyBreakdown} leftIcon={<CopyOutlined />}>
            {copied ? "Copied!" : "Copy Summary"}
          </AppButton>
          <AppButton variant="secondary" href={`/${slug}`}>
            Full Breakdown →
          </AppButton>
        </div>

        {diagnosis && (
          <div style={{ background: "var(--bg-amber-badge)", border: "1px solid var(--border-amber-soft)", borderRadius: 10, padding: "12px 14px", fontSize: "0.9rem", color: "var(--text-heading)" }}>
            <strong>Pricing Note:</strong> {diagnosis}
          </div>
        )}
      </div>
    </AppCard>
  );
}
