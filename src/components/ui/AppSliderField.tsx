"use client";

import React, { useId } from "react";
import { Slider } from "antd";

interface AppSliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unitPrefix?: string;
  unitSuffix?: string;
  onChange: (next: number) => void;
}

export function AppSliderField({
  label,
  value,
  min,
  max,
  step = 1,
  unitPrefix,
  unitSuffix,
  onChange,
}: AppSliderFieldProps) {
  const inputId = useId();

  const handleNumeric = (raw: string) => {
    const parsed = Number(raw);
    if (Number.isNaN(parsed)) return;
    onChange(Math.min(max, Math.max(min, parsed)));
  };

  return (
    <div className="ui-field" style={{ gap: 4 }}>
      <div className="slider-head">
        <label htmlFor={inputId}>{label}</label>
        <div className="ui-input-wrap slider-value">
          {unitPrefix && (
            <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              {unitPrefix}
            </span>
          )}
          <input
            id={inputId}
            type="number"
            inputMode="decimal"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => handleNumeric(e.target.value)}
            className="ui-input-el"
            style={{ minHeight: 38, fontWeight: 700, textAlign: "right" }}
          />
          {unitSuffix && (
            <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              {unitSuffix}
            </span>
          )}
        </div>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(val) => onChange(typeof val === "number" ? val : min)}
        tooltip={{ open: false }}
      />
    </div>
  );
}
