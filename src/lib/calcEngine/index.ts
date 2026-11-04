import { ECOMMERCE_ENGINES } from "./enginesEcommerce";
import { GROWTH_ENGINES } from "./enginesGrowth";
import type { CalcFieldDef, CalcValues, PlatformEngineConfig } from "./types";

const ALL_ENGINES: PlatformEngineConfig[] = [
  ...ECOMMERCE_ENGINES,
  ...GROWTH_ENGINES,
];

export function getEngineBySlug(slug: string): PlatformEngineConfig | undefined {
  return ALL_ENGINES.find((engine) => engine.slug === slug);
}

export function buildDefaultValues(fields: CalcFieldDef[]): CalcValues {
  const initial: CalcValues = {};
  for (const field of fields) {
    initial[field.key] = field.defaultValue;
  }
  return initial;
}
