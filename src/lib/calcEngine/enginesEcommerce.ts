import type { PlatformEngineConfig } from "./types";
import { calcHealthScore, calcMarginPct, num } from "./math";

export const ECOMMERCE_ENGINES: PlatformEngineConfig[] = [
  {
    slug: "tiktok-shop-fee-calculator",
    fields: [
      { key: "price", kind: "slider", label: "Customer Sale Price", min: 5, max: 400, step: 1, defaultValue: 42, unitPrefix: "$" },
      { key: "cogs", kind: "slider", label: "Product Landed COGS", min: 0, max: 250, step: 0.5, defaultValue: 11, unitPrefix: "$" },
      { key: "ship", kind: "slider", label: "Seller Shipping Subsidy", min: 0, max: 35, step: 0.5, defaultValue: 4.5, unitPrefix: "$" },
      { key: "refPct", kind: "slider", label: "TikTok Referral Fee %", min: 2, max: 15, step: 0.5, defaultValue: 6, unitSuffix: "%" },
      { key: "affPct", kind: "slider", label: "Creator Affiliate Cut %", min: 0, max: 35, step: 1, defaultValue: 12, unitSuffix: "%" },
    ],
    compute: (v) => {
      const price = num(v.price, 42);
      const cogs = num(v.cogs, 11);
      const ship = num(v.ship, 4.5);
      const feeAmount = (price * (num(v.refPct, 6) + num(v.affPct, 12))) / 100 + 0.3;
      const costTotal = cogs + ship;
      const netProfit = price - costTotal - feeAmount;
      const marginPct = calcMarginPct(price, netProfit);
      return {
        grossAmount: price,
        productCostTotal: costTotal,
        feeAmount,
        effectiveFeePct: calcMarginPct(price, feeAmount),
        netProfit,
        marginPct,
        healthScore: calcHealthScore(marginPct, 2.8),
        secondaryLabel: "Max Ad CPA Before Loss",
        secondaryValue: `$${Math.max(0, netProfit).toFixed(2)}`,
        summaryText: `TikTok Shop: $${price.toFixed(2)} Sale − $${costTotal.toFixed(2)} COGS/Ship − $${feeAmount.toFixed(2)} Fees = $${netProfit.toFixed(2)} Net (${marginPct.toFixed(1)}%)`,
      };
    },
  },
  {
    slug: "etsy-fee-profit-calculator",
    fields: [
      { key: "price", kind: "slider", label: "Order Total (Item + Ship)", min: 5, max: 400, step: 1, defaultValue: 36, unitPrefix: "$" },
      { key: "cogs", kind: "slider", label: "Materials + Postage Cost", min: 0, max: 250, step: 0.5, defaultValue: 10.5, unitPrefix: "$" },
      {
        key: "offsite",
        kind: "select",
        label: "Etsy Offsite Ads Attribution",
        defaultValue: "none",
        options: [
          { value: "none", label: "Organic Etsy Search (0% Offsite Fee)" },
          { value: "12", label: "Mandatory >$10k Seller Tier (12% Offsite Fee)" },
          { value: "15", label: "Standard Offsite Ads Attribution (15% Fee)" },
        ],
      },
    ],
    compute: (v) => {
      const price = num(v.price, 36);
      const cogs = num(v.cogs, 10.5);
      const offsitePct = v.offsite === "12" ? 12 : v.offsite === "15" ? 15 : 0;
      const offsiteFee = Math.min(100, (price * offsitePct) / 100);
      const feeAmount = 0.45 + price * 0.095 + offsiteFee;
      const netProfit = price - cogs - feeAmount;
      const marginPct = calcMarginPct(price, netProfit);
      const takeRate = calcMarginPct(price, feeAmount);
      return {
        grossAmount: price,
        productCostTotal: cogs,
        feeAmount,
        effectiveFeePct: takeRate,
        netProfit,
        marginPct,
        healthScore: calcHealthScore(marginPct, 2.7),
        secondaryLabel: "Effective Etsy Take-Rate",
        secondaryValue: `${takeRate.toFixed(1)}%`,
        summaryText: `Etsy Order: $${price.toFixed(2)} Gross − $${cogs.toFixed(2)} Cost − $${feeAmount.toFixed(2)} Etsy Fees (${takeRate.toFixed(1)}%) = $${netProfit.toFixed(2)} Net`,
      };
    },
  },
  {
    slug: "shopify-print-on-demand-calculator",
    fields: [
      { key: "price", kind: "slider", label: "Retail Price + Shipping Charged", min: 12, max: 250, step: 1, defaultValue: 34, unitPrefix: "$" },
      { key: "blank", kind: "slider", label: "POD Blank + Print Cost", min: 3, max: 140, step: 0.5, defaultValue: 13.5, unitPrefix: "$" },
      { key: "podShip", kind: "slider", label: "POD Fulfillment Shipping", min: 0, max: 30, step: 0.25, defaultValue: 4.75, unitPrefix: "$" },
      {
        key: "plan",
        kind: "select",
        label: "Shopify Payments Plan Tier",
        defaultValue: "basic",
        options: [
          { value: "basic", label: "Shopify Basic (2.9% + $0.30)" },
          { value: "grow", label: "Shopify Grow (2.7% + $0.30)" },
          { value: "advanced", label: "Shopify Advanced (2.5% + $0.30)" },
        ],
      },
    ],
    compute: (v) => {
      const price = num(v.price, 34);
      const costTotal = num(v.blank, 13.5) + num(v.podShip, 4.75);
      const rate = v.plan === "advanced" ? 2.5 : v.plan === "grow" ? 2.7 : 2.9;
      const feeAmount = (price * rate) / 100 + 0.3;
      const netProfit = price - costTotal - feeAmount;
      const marginPct = calcMarginPct(price, netProfit);
      const unitsFor1k = netProfit > 0 ? Math.ceil(1000 / netProfit) : 0;
      return {
        grossAmount: price,
        productCostTotal: costTotal,
        feeAmount,
        effectiveFeePct: calcMarginPct(price, feeAmount),
        netProfit,
        marginPct,
        healthScore: calcHealthScore(marginPct, 2.9),
        secondaryLabel: "Orders Needed for $1,000 Net",
        secondaryValue: netProfit > 0 ? `${unitsFor1k} orders` : "Unprofitable",
        summaryText: `Shopify POD: $${price.toFixed(2)} Retail − $${costTotal.toFixed(2)} POD − $${feeAmount.toFixed(2)} Processing = $${netProfit.toFixed(2)} Net (${marginPct.toFixed(1)}%)`,
      };
    },
  },
];
