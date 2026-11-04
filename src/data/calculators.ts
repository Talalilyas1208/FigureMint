export type ToolCategory = "ecommerce" | "ads-roas" | "payments" | "freelance";

export interface CalculatorItem {
  slug: string;
  title: string;
  shortTitle: string;
  category: ToolCategory;
  badge: "Popular" | "Updated 2026";
  summary: string;
  defaultPrice: number;
  defaultCost: number;
  defaultFeePct: number;
  fixedFee: number;
  formulaNote: string;
  keywords: string[];
}

export const TOP_NAV_ITEMS = [
  { label: "E-Commerce", href: "/ecommerce-fee-calculators", category: "ecommerce" },
  { label: "Ads & ROAS", href: "/roas-ad-profit-calculators", category: "ads-roas" },
  { label: "Payments", href: "/payment-processing-fee-calculators", category: "payments" },
  { label: "Freelance", href: "/freelance-rate-tax-calculators", category: "freelance" },
  { label: "All Tools", href: "/profit-margin-calculators", category: "all" },
] as const;

export const CALCULATORS: CalculatorItem[] = [
  {
    slug: "tiktok-shop-fee-calculator",
    title: "TikTok Shop Fee & Net Profit Calculator",
    shortTitle: "TikTok Shop Fee Calculator",
    category: "ecommerce",
    badge: "Popular",
    summary: "Audit 2026 TikTok Shop referral fees, creator affiliate commissions, shipping subsidies & net profit per order.",
    defaultPrice: 42,
    defaultCost: 12,
    defaultFeePct: 18,
    fixedFee: 0.3,
    formulaNote: "Net = Sale Price − COGS − (Referral % + Affiliate %) − Shipping",
    keywords: ["tiktok shop fee calculator", "tiktok profit", "affiliate commission", "referral fee", "margin"],
  },
  {
    slug: "etsy-fee-profit-calculator",
    title: "Etsy Fee & Offsite Ads Profit Calculator",
    shortTitle: "Etsy Fee & Profit Calculator",
    category: "ecommerce",
    badge: "Updated 2026",
    summary: "Calculate $0.20 listing, 6.5% transaction, payment processing & 12–15% Etsy Offsite Ads fees.",
    defaultPrice: 36,
    defaultCost: 9,
    defaultFeePct: 14.5,
    fixedFee: 0.45,
    formulaNote: "Net = Revenue − $0.20 Listing − 6.5% Tx − Processing − Offsite Ad Cut",
    keywords: ["etsy fee calculator", "etsy profit calculator", "offsite ads", "listing fee", "handmade"],
  },
  {
    slug: "break-even-roas-calculator",
    title: "Break-Even ROAS & Ad Profit Margin Calculator",
    shortTitle: "Break-Even ROAS Calculator",
    category: "ads-roas",
    badge: "Popular",
    summary: "Find your exact minimum ROAS floor & max CPA across Meta, Google & TikTok ad campaigns.",
    defaultPrice: 68,
    defaultCost: 22,
    defaultFeePct: 24,
    fixedFee: 0.3,
    formulaNote: "Break-Even ROAS = 1 ÷ Gross Margin % before Ad Spend",
    keywords: ["break even roas calculator", "target cpa", "meta ads", "google ads", "tiktok ads", "roas"],
  },
  {
    slug: "stripe-vs-paypal-fee-calculator",
    title: "Stripe vs. PayPal International Fee & Payout Calculator",
    shortTitle: "Stripe vs. PayPal Fee Calculator",
    category: "payments",
    badge: "Updated 2026",
    summary: "Compare 2.9% + $0.30 domestic vs. cross-border card & FX currency conversion fees side-by-side.",
    defaultPrice: 120,
    defaultCost: 35,
    defaultFeePct: 4.4,
    fixedFee: 0.3,
    formulaNote: "Net Payout = Invoice − (Base Rate % + Cross-Border % + FX Spread + Fixed Fee)",
    keywords: ["stripe vs paypal fee calculator", "international payout", "fx conversion", "processing fees"],
  },
  {
    slug: "shopify-print-on-demand-calculator",
    title: "Shopify Print-on-Demand Profit Margin Calculator",
    shortTitle: "Shopify Print-on-Demand Calculator",
    category: "ecommerce",
    badge: "Updated 2026",
    summary: "Model Printful & Printify base blanks, fulfillment shipping & Shopify Payments processing fees.",
    defaultPrice: 34,
    defaultCost: 14.5,
    defaultFeePct: 8.9,
    fixedFee: 0.3,
    formulaNote: "Net = Retail + Shipping Charged − POD Blank & Print − Shopify Fee",
    keywords: ["shopify print on demand calculator", "pod margin", "printful", "printify", "dropshipping"],
  },
  {
    slug: "upwork-freelance-fee-calculator",
    title: "Upwork Fee & Freelance Net Hourly Rate Calculator",
    shortTitle: "Upwork & Freelance Fee Calculator",
    category: "freelance",
    badge: "Popular",
    summary: "Factor 10% Upwork service fees, self-employment tax reserves & true net hourly take-home pay.",
    defaultPrice: 95,
    defaultCost: 10,
    defaultFeePct: 28,
    fixedFee: 0,
    formulaNote: "True Hourly = (Gross Rate − Platform Cut − Tax Buffer) × Billable Ratio",
    keywords: ["upwork fee calculator", "freelance hourly rate calculator", "self employment tax", "contractor"],
  },
];
