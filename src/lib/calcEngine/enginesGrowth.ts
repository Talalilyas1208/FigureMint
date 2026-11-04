import type { PlatformEngineConfig } from "./types";
import { calcBreakEvenRoas, calcHealthScore, calcMarginPct, num } from "./math";

export const GROWTH_ENGINES: PlatformEngineConfig[] = [
  {
    slug: "break-even-roas-calculator",
    fields: [
      { key: "aov", kind: "slider", label: "Average Order Value (AOV)", min: 10, max: 600, step: 1, defaultValue: 68, unitPrefix: "$" },
      { key: "cogs", kind: "slider", label: "Landed COGS + Fulfillment", min: 0, max: 400, step: 0.5, defaultValue: 21, unitPrefix: "$" },
      { key: "procPct", kind: "slider", label: "Payment / Platform Fee %", min: 1, max: 20, step: 0.2, defaultValue: 3.4, unitSuffix: "%" },
      { key: "adCpa", kind: "slider", label: "Current Paid Ad CPA", min: 0, max: 250, step: 1, defaultValue: 22, unitPrefix: "$" },
    ],
    compute: (v) => {
      const aov = num(v.aov, 68);
      const cogs = num(v.cogs, 21);
      const procFee = (aov * num(v.procPct, 3.4)) / 100 + 0.3;
      const adCpa = num(v.adCpa, 22);
      const preAdMargin = aov - cogs - procFee;
      const feeAmount = procFee + adCpa;
      const netProfit = aov - cogs - feeAmount;
      const marginPct = calcMarginPct(aov, netProfit);
      const beRoas = calcBreakEvenRoas(aov, preAdMargin);
      return {
        grossAmount: aov,
        productCostTotal: cogs,
        feeAmount,
        effectiveFeePct: calcMarginPct(aov, feeAmount),
        netProfit,
        marginPct,
        healthScore: calcHealthScore(marginPct, 3.1),
        secondaryLabel: "Break-Even ROAS Floor",
        secondaryValue: beRoas,
        summaryText: `Ad ROAS Audit: $${aov.toFixed(2)} AOV | Break-Even ROAS ${beRoas} | At $${adCpa.toFixed(2)} CPA => $${netProfit.toFixed(2)} Net (${marginPct.toFixed(1)}%)`,
      };
    },
  },
  {
    slug: "stripe-vs-paypal-fee-calculator",
    fields: [
      { key: "invoice", kind: "slider", label: "Checkout / Invoice Amount", min: 10, max: 2500, step: 5, defaultValue: 120, unitPrefix: "$" },
      { key: "cogs", kind: "slider", label: "Fulfillment / Delivery Cost", min: 0, max: 1500, step: 5, defaultValue: 30, unitPrefix: "$" },
      {
        key: "region",
        kind: "select",
        label: "Buyer Card & Currency Corridor",
        defaultValue: "intl_fx",
        options: [
          { value: "domestic", label: "Domestic US Card (No FX)" },
          { value: "intl_same", label: "International Card · Same Currency (+1.5%)" },
          { value: "intl_fx", label: "International + Currency Conversion (FX)" },
        ],
      },
    ],
    compute: (v) => {
      const inv = num(v.invoice, 120);
      const cogs = num(v.cogs, 30);
      const stripePct = v.region === "intl_fx" ? 5.4 : v.region === "intl_same" ? 4.4 : 2.9;
      const paypalPct = v.region === "intl_fx" ? 7.99 : v.region === "intl_same" ? 4.99 : 3.49;
      const stripeFee = (inv * stripePct) / 100 + 0.3;
      const paypalFee = (inv * paypalPct) / 100 + 0.49;
      const netProfit = inv - cogs - stripeFee;
      const marginPct = calcMarginPct(inv, netProfit);
      const delta = paypalFee - stripeFee;
      return {
        grossAmount: inv,
        productCostTotal: cogs,
        feeAmount: stripeFee,
        effectiveFeePct: calcMarginPct(inv, stripeFee),
        netProfit,
        marginPct,
        healthScore: calcHealthScore(marginPct, 2.2),
        secondaryLabel: "Stripe Savings vs. PayPal",
        secondaryValue: `+$${delta.toFixed(2)} / tx`,
        summaryText: `Stripe ($${stripeFee.toFixed(2)} fee) saves $${delta.toFixed(2)} vs. PayPal ($${paypalFee.toFixed(2)} fee) on $${inv.toFixed(2)} => $${netProfit.toFixed(2)} Net`,
      };
    },
  },
  {
    slug: "upwork-freelance-fee-calculator",
    fields: [
      { key: "rate", kind: "slider", label: "Client Hourly Rate", min: 15, max: 350, step: 5, defaultValue: 95, unitPrefix: "$" },
      { key: "hours", kind: "slider", label: "Weekly Billable Hours", min: 5, max: 50, step: 1, defaultValue: 26, unitSuffix: "h" },
      { key: "taxPct", kind: "slider", label: "Self-Employment + Income Tax %", min: 10, max: 45, step: 1, defaultValue: 24, unitSuffix: "%" },
      {
        key: "channel",
        kind: "select",
        label: "Contract Billing Channel",
        defaultValue: "upwork10",
        options: [
          { value: "upwork10", label: "Upwork Marketplace (10% Service Fee)" },
          { value: "card", label: "Direct Stripe Card Invoice (2.9%)" },
          { value: "ach", label: "Direct Bank ACH / Wire (0% Fee)" },
        ],
      },
    ],
    compute: (v) => {
      const rate = num(v.rate, 95);
      const hours = num(v.hours, 26);
      const taxPct = num(v.taxPct, 24);
      const platPct = v.channel === "upwork10" ? 10 : v.channel === "card" ? 2.9 : 0;
      const platFee = (rate * platPct) / 100;
      const afterPlat = rate - platFee;
      const taxAmt = (afterPlat * taxPct) / 100;
      const netHourly = afterPlat - taxAmt;
      const monthlyNet = netHourly * hours * 4.33;
      const marginPct = calcMarginPct(rate, netHourly);
      return {
        grossAmount: rate,
        productCostTotal: taxAmt,
        feeAmount: platFee,
        effectiveFeePct: platPct + taxPct,
        netProfit: netHourly,
        marginPct,
        healthScore: calcHealthScore(marginPct, 1.45),
        secondaryLabel: "Est. Monthly Net Take-Home",
        secondaryValue: `$${Math.round(monthlyNet).toLocaleString()}`,
        summaryText: `Freelance Rate: $${rate}/hr (${hours}h/wk) => $${netHourly.toFixed(2)}/hr Net Keep (~$${Math.round(monthlyNet).toLocaleString()}/mo after fees & tax)`,
      };
    },
  },
];
