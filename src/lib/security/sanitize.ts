import { z } from "zod";

function sanitizePlainText(input: string, maxLen = 500): string {
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLen);
}

export const MarginAdvisorSchema = z.object({
  platform: z
    .string()
    .min(2)
    .max(60)
    .transform((v) => sanitizePlainText(v, 60)),
  salePrice: z.number().finite().min(0.5).max(100_000),
  productCost: z.number().finite().min(0).max(100_000),
  feePercent: z.number().finite().min(0).max(95),
  fixedFee: z.number().finite().min(0).max(500).default(0.3),
});

export const ProfitBotSchema = z.object({
  message: z
    .string()
    .min(2, "Type a price, cost, or margin question.")
    .max(400)
    .transform((v) => sanitizePlainText(v, 400)),
});

export const SavedScenarioSchema = z.object({
  slug: z
    .string()
    .min(2)
    .max(64)
    .transform((v) => sanitizePlainText(v, 64)),
  scenarioLabel: z
    .string()
    .min(2)
    .max(100)
    .transform((v) => sanitizePlainText(v, 100)),
  grossAmount: z.number().finite().min(0).max(1_000_000),
  costAmount: z.number().finite().min(0).max(1_000_000),
  feeAmount: z.number().finite().min(0).max(1_000_000),
  netProfit: z.number().finite().min(-1_000_000).max(1_000_000),
  marginPct: z.number().finite().min(-1000).max(100),
});

export const ContactReportSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter at least 2 characters.")
    .max(80)
    .transform((v) => sanitizePlainText(v, 80)),
  email: z.string().email("Enter a valid email address.").max(120),
  topic: z.enum(["fee-update", "calculator-request", "bug-report", "partnership"]),
  platformName: z
    .string()
    .max(80)
    .optional()
    .default("")
    .transform((v) => sanitizePlainText(v, 80)),
  message: z
    .string()
    .min(12, "Please provide at least 12 characters of detail.")
    .max(1200)
    .transform((v) => sanitizePlainText(v, 1200)),
});
