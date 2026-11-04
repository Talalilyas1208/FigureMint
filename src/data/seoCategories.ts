import type { ToolCategory } from "./calculators";

export interface SeoCategoryHub {
  slug: string;
  navLabel: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  category: ToolCategory | "all";
}

export const SEO_CATEGORY_HUBS: SeoCategoryHub[] = [
  {
    slug: "ecommerce-fee-calculators",
    navLabel: "E-Commerce Fees",
    title: "E-Commerce Marketplace Fee & Net Profit Calculators (2026)",
    h1: "E-Commerce Marketplace Fee & Profit Calculators",
    description:
      "Free 2026 e-commerce seller fee calculators for TikTok Shop, Etsy Offsite Ads, and Shopify Print-on-Demand net margins.",
    intro:
      "Compare real 2026 referral fees, creator affiliate splits, Offsite Ads attributions, and print-on-demand fulfillment costs before pricing your catalog.",
    category: "ecommerce",
  },
  {
    slug: "roas-ad-profit-calculators",
    navLabel: "Ads & ROAS",
    title: "Break-Even ROAS, Target CPA & Ad Spend Profit Calculators",
    h1: "ROAS, Target CPA & Paid Ad Profit Calculators",
    description:
      "Calculate your exact break-even ROAS floor, maximum affordable CPA, and post-ad net profit across Meta, Google, and TikTok Ads.",
    intro:
      "Media-buying dashboards report gross return on ad spend without subtracting COGS or payment processing. Use these tools to lock in profitable CPA caps.",
    category: "ads-roas",
  },
  {
    slug: "payment-processing-fee-calculators",
    navLabel: "Payment Fees",
    title: "Payment Processing & Cross-Border FX Fee Calculators (2026)",
    h1: "Payment Processing & International FX Fee Calculators",
    description:
      "Compare Stripe vs. PayPal domestic, international card, and currency conversion (FX) payout deductions side-by-side.",
    intro:
      "Cross-border card surcharges and 3%–4% currency conversion spreads quietly erode international invoice margins. Audit net payouts before billing.",
    category: "payments",
  },
  {
    slug: "freelance-rate-tax-calculators",
    navLabel: "Freelance Rates",
    title: "Freelance Hourly Rate, Upwork Fee & Self-Employment Tax Calculators",
    h1: "Freelance Net Rate, Upwork Fee & Tax Calculators",
    description:
      "Calculate net freelance take-home pay after 10% Upwork service fees, Stripe invoice costs, and self-employment tax reserves.",
    intro:
      "Turn gross hourly or fixed-bid freelance rates into realistic monthly take-home pay after marketplace commissions and quarterly tax buffers.",
    category: "freelance",
  },
  {
    slug: "profit-margin-calculators",
    navLabel: "All Calculators",
    title: "All 2026 Online Seller, ROAS & Freelance Profit Margin Calculators",
    h1: "All 2026 Fee, ROAS & Net Profit Margin Calculators",
    description:
      "Browse FigureMint's complete directory of verified 2026 e-commerce, paid social ROAS, payment processing, and freelance net profit calculators.",
    intro:
      "Every calculator runs instant browser-local unit economics verified against November 2026 merchant rate schedules, with clean shareable scenario URLs.",
    category: "all",
  },
];

export function getCategoryHubByCategory(cat: ToolCategory): SeoCategoryHub {
  return SEO_CATEGORY_HUBS.find((h) => h.category === cat) ?? SEO_CATEGORY_HUBS[4];
}

