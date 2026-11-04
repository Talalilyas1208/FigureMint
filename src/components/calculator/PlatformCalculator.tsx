"use client";

import React, { useMemo, useState } from "react";
import { CheckSquareOutlined, CloudUploadOutlined, CopyOutlined, ShareAltOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { getEngineBySlug } from "@/lib/calcEngine";
import { fetchMarginAdvisor } from "@/lib/calcEngine/advisorApi";
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

export function PlatformCalculator({ slug, title }: { slug: string; title: string }) {
  const dispatch = useAppDispatch();
  const { bookmarks, savingScenario, lastSavedRef } = useAppSelector((s) => s.ui);
  const engine = useMemo(() => getEngineBySlug(slug), [slug]);
  const { values, setField, buildShareUrl } = useUrlScenario(engine?.fields ?? []);
  const [statusMsg, setStatusMsg] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [checking, setChecking] = useState(false);

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
        <AppBadge tone="emerald">{lastSavedRef ? `Cloud Ref #${lastSavedRef}` : "Interactive Calculator"}</AppBadge>
        <AppButton variant="ghost" onClick={() => dispatch(toggleBookmark(slug))} leftIcon={isSaved ? <StarFilled style={{ color: "var(--color-amber)" }} /> : <StarOutlined />}>
          {isSaved ? "Saved" : "Save"}
        </AppButton>
      </div>

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
