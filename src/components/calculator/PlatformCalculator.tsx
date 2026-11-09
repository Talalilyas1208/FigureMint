"use client";

import React, { useEffect, useMemo, useState } from "react";
import { CheckSquareOutlined, CloudUploadOutlined, CopyOutlined, ShareAltOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { getEngineBySlug } from "@/lib/calcEngine";
import { fetchMarginAdvisor } from "@/lib/calcEngine/advisorApi";
import { calculateViaApi } from "@/lib/calcEngine/calculateApi";
import { copyToClipboard } from "@/lib/utils/clipboard";
import { useUrlScenario } from "@/hooks/useUrlScenario";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { postScenarioAsync, toggleBookmark } from "@/store/uiSlice";
import { AppCard } from "@/components/ui/AppCard";
import { AppSliderField } from "@/components/ui/AppSliderField";
import { AppSelect } from "@/components/ui/AppSelect";
import { AppButton } from "@/components/ui/AppButton";
import { AppBadge } from "@/components/ui/AppBadge";
import { BreakdownBar } from "@/components/engagement/BreakdownBar";
import { ResultKpiStrip } from "./ResultKpiStrip";

const SCENARIO_PRESETS: Record<string, Array<{ label: string; values: Record<string, number | string> }>> = {
  "tiktok-shop-fee-calculator": [
    { label: "Viral Beauty ($22)", values: { salePrice: 22, productCost: 4.5, referralFeePct: 6, affiliatePct: 15, shippingCost: 3.8 } },
    { label: "Apparel Bundle ($48)", values: { salePrice: 48, productCost: 14, referralFeePct: 6, affiliatePct: 12, shippingCost: 4.8 } },
    { label: "High-AOV Set ($95)", values: { salePrice: 95, productCost: 26, referralFeePct: 6, affiliatePct: 10, shippingCost: 6.5 } },
  ],
  "etsy-fee-profit-calculator": [
    { label: "Digital Download ($14)", values: { salePrice: 14, productCost: 0, offsiteAdsPct: 0, paymentProcessingPct: 3, shippingCharged: 0, shippingCost: 0 } },
    { label: "Handmade Decor ($42)", values: { salePrice: 42, productCost: 11, offsiteAdsPct: 15, paymentProcessingPct: 3, shippingCharged: 5, shippingCost: 5 } },
    { label: "Custom Jewelry ($88)", values: { salePrice: 88, productCost: 19, offsiteAdsPct: 12, paymentProcessingPct: 3, shippingCharged: 0, shippingCost: 4.5 } },
  ],
  "break-even-roas-calculator": [
    { label: "Dropship Low Margin (30%)", values: { productPrice: 35, cogs: 22, processingFeePct: 2.9 } },
    { label: "D2C Brand (65% Margin)", values: { productPrice: 75, cogs: 24, processingFeePct: 2.9 } },
    { label: "Digital Product (90% Margin)", values: { productPrice: 99, cogs: 8, processingFeePct: 2.9 } },
  ],
  "stripe-vs-paypal-fee-calculator": [
    { label: "Domestic Store ($35)", values: { invoiceAmount: 35, domesticOrIntl: "domestic", fxConversion: "none" } },
    { label: "Cross-Border Sale ($120)", values: { invoiceAmount: 120, domesticOrIntl: "intl", fxConversion: "none" } },
    { label: "Global FX Invoice ($450)", values: { invoiceAmount: 450, domesticOrIntl: "intl", fxConversion: "fx3" } },
  ],
  "shopify-print-on-demand-calculator": [
    { label: "T-Shirt POD ($28)", values: { retailPrice: 28, shippingCharged: 4.99, blankCost: 9.5, printCost: 4.5, podShippingCost: 4.99, shopifyPlanFeePct: 2.9 } },
    { label: "Heavy Hoodie ($55)", values: { retailPrice: 55, shippingCharged: 7.99, blankCost: 19, printCost: 6.5, podShippingCost: 7.99, shopifyPlanFeePct: 2.9 } },
    { label: "Mug / Accessory ($19)", values: { retailPrice: 19, shippingCharged: 5.99, blankCost: 5.2, printCost: 2.8, podShippingCost: 5.99, shopifyPlanFeePct: 2.9 } },
  ],
  "upwork-freelance-fee-calculator": [
    { label: "Standard Hourly ($45/hr)", values: { grossHourlyRate: 45, billableHoursPerWeek: 30, taxBufferPct: 25, nonBillableHours: 5 } },
    { label: "Senior Consultant ($95/hr)", values: { grossHourlyRate: 95, billableHoursPerWeek: 25, taxBufferPct: 30, nonBillableHours: 5 } },
    { label: "Agency Specialist ($150/hr)", values: { grossHourlyRate: 150, billableHoursPerWeek: 20, taxBufferPct: 35, nonBillableHours: 8 } },
  ],
};

export function PlatformCalculator({ slug, title }: { slug: string; title: string }) {
  const dispatch = useAppDispatch();
  const { bookmarks, savingScenario, lastSavedRef } = useAppSelector((s) => s.ui);
  const engine = useMemo(() => getEngineBySlug(slug), [slug]);
  const { values, setField, setMultipleFields, buildShareUrl } = useUrlScenario(engine?.fields ?? []);
  const [statusMsg, setStatusMsg] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [checking, setChecking] = useState(false);
  const [apiSynced, setApiSynced] = useState(true);

  const presets = SCENARIO_PRESETS[slug] ?? [];

  useEffect(() => {
    let active = true;
    const t = setTimeout(async () => {
      const resp = await calculateViaApi(slug, values);
      if (active && resp?.ok) setApiSynced(true);
    }, 250);
    return () => {
      active = false;
      clearTimeout(t);
    };
  }, [slug, values]);

  if (!engine) return null;
  const result = engine.compute(values);
  const isSaved = bookmarks.includes(slug);

  const flash = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 2500);
  };

  const handleCopy = async (text: string, label: string) => {
    const ok = await copyToClipboard(text);
    if (ok) flash(label);
  };

  const saveScenarioToCloud = async () => {
    const action = await dispatch(
      postScenarioAsync({
        slug,
        scenarioLabel: title,
        grossAmount: Number(result.grossAmount.toFixed(2)),
        costAmount: Number(result.productCostTotal.toFixed(2)),
        feeAmount: Number(result.feeAmount.toFixed(2)),
        netProfit: Number(result.netProfit.toFixed(2)),
        marginPct: Number(result.marginPct.toFixed(2)),
      })
    );
    if (postScenarioAsync.fulfilled.match(action)) {
      flash(`Scenario saved · Ref #${action.payload.id}`);
    }
  };

  const runMarginCheck = async () => {
    setChecking(true);
    try {
      const tip = await fetchMarginAdvisor({
        platform: title,
        salePrice: result.grossAmount,
        productCost: result.productCostTotal,
        feePercent: result.effectiveFeePct,
      });
      setDiagnosis(tip);
    } finally {
      setChecking(false);
    }
  };

  return (
    <AppCard padding="lg">
      <div className="calc-card-head">
        <AppBadge tone="emerald">{lastSavedRef ? `Cloud Ref #${lastSavedRef}` : apiSynced ? "Dynamic API • 2026 Engine" : "Interactive Calculator"}</AppBadge>
        <AppButton variant="ghost" onClick={() => dispatch(toggleBookmark(slug))} leftIcon={isSaved ? <StarFilled style={{ color: "var(--color-amber)" }} /> : <StarOutlined />}>
          {isSaved ? "Saved" : "Save"}
        </AppButton>
      </div>

      {presets.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBlock: "10px 14px" }}>
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Try Scenario:</span>
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setMultipleFields(p.values);
                flash(`Applied preset: ${p.label}`);
              }}
              style={{
                border: "1px solid var(--border-warm)",
                backgroundColor: "var(--bg-section)",
                borderRadius: "var(--radius-pill)",
                padding: "4px 10px",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "var(--text-heading)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      <div className="calc-stack">
        {engine.fields.map((f) =>
          f.kind === "slider" ? (
            <AppSliderField key={f.key} label={f.label} value={Number(values[f.key] ?? f.defaultValue)} min={f.min} max={f.max} step={f.step} unitPrefix={f.unitPrefix} unitSuffix={f.unitSuffix} onChange={(val) => setField(f.key, val)} />
          ) : (
            <AppSelect key={f.key} label={f.label} value={String(values[f.key] ?? f.defaultValue)} options={f.options} onChange={(val) => setField(f.key, val)} />
          )
        )}

        <ResultKpiStrip netProfit={result.netProfit} marginPct={result.marginPct} secondaryLabel={result.secondaryLabel} secondaryValue={result.secondaryValue} />
        <BreakdownBar salePrice={result.grossAmount} productCost={result.productCostTotal} feeAmount={result.feeAmount} netProfit={result.netProfit} healthScore={result.healthScore} />

        <div className="calc-actions">
          <AppButton variant="primary" onClick={() => handleCopy(buildShareUrl(), "Shareable scenario link copied!")} leftIcon={<ShareAltOutlined />}>
            Share Link
          </AppButton>
          <AppButton variant="secondary" loading={savingScenario} onClick={saveScenarioToCloud} leftIcon={<CloudUploadOutlined />}>
            Save Scenario
          </AppButton>
          <AppButton variant="secondary" onClick={() => handleCopy(result.summaryText, "Summary copied!")} leftIcon={<CopyOutlined />}>
            Copy Summary
          </AppButton>
          <AppButton variant="secondary" loading={checking} onClick={runMarginCheck} leftIcon={<CheckSquareOutlined />}>
            Margin Check
          </AppButton>
        </div>

        {statusMsg && <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--color-primary)" }}>{statusMsg}</div>}
        {diagnosis && (
          <div style={{ background: "var(--bg-amber-badge)", border: "1px solid var(--border-amber-soft)", borderRadius: 10, padding: "12px 14px", fontSize: "0.9rem", color: "var(--text-heading)" }}>
            <strong>Pricing Note:</strong> {diagnosis}
          </div>
        )}
      </div>
    </AppCard>
  );
}
