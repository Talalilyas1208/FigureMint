"use client";

import React, { useId } from "react";
import { Select } from "antd";

interface SelectOption {
  value: string;
  label: string;
}

interface AppSelectProps {
  label?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export function AppSelect({ label, value, options, onChange }: AppSelectProps) {
  const fieldId = useId();

  return (
    <div className="ui-field">
      {label && (
        <label htmlFor={fieldId} className="ui-label">
          <span>{label}</span>
        </label>
      )}
      <Select
        id={fieldId}
        aria-label={label}
        value={value}
        options={options}
        onChange={onChange}
        size="large"
        style={{ width: "100%", minHeight: 48 }}
        optionRender={(opt) => (
          <span style={{ whiteSpace: "normal", lineHeight: 1.35 }}>{opt.label}</span>
        )}
      />
    </div>
  );
}
