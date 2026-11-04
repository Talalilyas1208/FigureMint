interface CalcSelectOption {
  value: string;
  label: string;
}

export type CalcFieldDef =
  | {
      key: string;
      kind: "slider";
      label: string;
      min: number;
      max: number;
      step: number;
      defaultValue: number;
      unitPrefix?: string;
      unitSuffix?: string;
    }
  | {
      key: string;
      kind: "select";
      label: string;
      defaultValue: string;
      options: CalcSelectOption[];
    };

export type CalcValues = Record<string, number | string>;

export interface CalcComputedResult {
  grossAmount: number;
  productCostTotal: number;
  feeAmount: number;
  effectiveFeePct: number;
  netProfit: number;
  marginPct: number;
  healthScore: number;
  secondaryLabel: string;
  secondaryValue: string;
  summaryText: string;
}

export type CalcResult = CalcComputedResult;

export interface PlatformEngineConfig {
  slug: string;
  fields: CalcFieldDef[];
  compute: (values: CalcValues) => CalcComputedResult;
}

