import type { CalcResult, CalcValues } from "./types";

export interface DynamicCalcResponse {
  ok: boolean;
  slug: string;
  calculatedAt: string;
  engineVersion: string;
  result: CalcResult;
  error?: string;
}

export async function calculateViaApi(
  slug: string,
  values: CalcValues
): Promise<DynamicCalcResponse | null> {
  try {
    const res = await fetch("/api/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, values }),
    });

    if (!res.ok) return null;
    const data: DynamicCalcResponse = await res.json();
    return data.ok ? data : null;
  } catch {
    return null;
  }
}
