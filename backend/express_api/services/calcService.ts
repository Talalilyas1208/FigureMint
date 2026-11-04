import { getEngineBySlug } from "../../../src/lib/calcEngine";
import type { CalcResult, CalcValues } from "../../../src/lib/calcEngine/types";

export async function calculateService(
  slug: string,
  values: CalcValues
): Promise<CalcResult | null> {
  const engine = getEngineBySlug(slug);
  if (!engine) return null;
  return engine.compute(values);
}
