"use client";

import React, { useId } from "react";
import clsx from "clsx";

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function AppInput({
  label,
  error,
  className,
  id,
  ...rest
}: AppInputProps) {
  const reactId = useId();
  const fieldId = id ?? reactId;

  return (
    <div className={clsx("ui-field", className)}>
      {label && (
        <label htmlFor={fieldId} className="ui-label">
          <span>{label}</span>
        </label>
      )}
      <div
        className="ui-input-wrap"
        style={error ? { borderColor: "#C85A32" } : undefined}
      >
        <input id={fieldId} className="ui-input-el" {...rest} />
      </div>
      {error && (
        <span role="alert" style={{ fontSize: "0.82rem", color: "#A94520", fontWeight: 600 }}>
          {error}
        </span>
      )}
    </div>
  );
}
