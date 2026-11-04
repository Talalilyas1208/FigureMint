"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { buildDefaultValues } from "@/lib/calcEngine";
import type { CalcFieldDef, CalcValues } from "@/lib/calcEngine/types";

function toKebabKey(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function buildCleanRelativeUrl(pathname: string, fields: CalcFieldDef[], values: CalcValues): string {
  const params = new URLSearchParams();
  for (const field of fields) {
    const val = values[field.key];
    if (val !== undefined && String(val) !== String(field.defaultValue)) {
      params.set(toKebabKey(field.key), String(val));
    }
  }
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export function useUrlScenario(fields: CalcFieldDef[]) {
  const [values, setValues] = useState<CalcValues>(() => buildDefaultValues(fields));
  const hydratedRef = useRef(false);

  useEffect(() => {
    const defaults = buildDefaultValues(fields);
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const hydrated: CalcValues = { ...defaults };

    for (const field of fields) {
      const raw = params.get(toKebabKey(field.key)) ?? params.get(field.key);
      if (raw === null) continue;

      if (field.kind === "slider") {
        const parsed = Number(raw);
        if (Number.isFinite(parsed)) {
          hydrated[field.key] = Math.min(field.max, Math.max(field.min, parsed));
        }
      } else if (field.options.some((opt) => opt.value === raw)) {
        hydrated[field.key] = raw;
      }
    }
    setValues(hydrated);
    hydratedRef.current = true;
  }, [fields]);

  useEffect(() => {
    if (!hydratedRef.current || typeof window === "undefined") return;
    const timer = window.setTimeout(() => {
      const nextUrl = buildCleanRelativeUrl(window.location.pathname, fields, values);
      const current = `${window.location.pathname}${window.location.search}`;
      if (nextUrl !== current) {
        window.history.replaceState(null, "", nextUrl);
      }
    }, 260);
    return () => window.clearTimeout(timer);
  }, [fields, values]);

  const setField = useCallback((key: string, nextValue: number | string) => {
    setValues((prev) => ({ ...prev, [key]: nextValue }));
  }, []);

  const buildShareUrl = useCallback((): string => {
    if (typeof window === "undefined") return "";
    const nextUrl = buildCleanRelativeUrl(window.location.pathname, fields, values);
    window.history.replaceState(null, "", nextUrl);
    return `${window.location.origin}${nextUrl}`;
  }, [fields, values]);

  return { values, setField, buildShareUrl };
}
