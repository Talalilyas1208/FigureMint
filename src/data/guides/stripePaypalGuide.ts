import { ToolGuideContent } from "./types";

export const STRIPE_PAYPAL_GUIDE: ToolGuideContent = {
  slug: "stripe-vs-paypal-fee-calculator",
  updatedLabel: "Verified November 2026 · US Merchant Rate Cards",
  intro:
    "Choosing between Stripe and PayPal looks trivial when comparing headline domestic rates, yet cross-border card surcharges, fixed per-transaction cents, and foreign currency conversion spreads create dramatic payout gaps on international B2B invoices, SaaS subscriptions, and global e-commerce checkouts. Auditing both processors side-by-side reveals exactly how much stays in your bank account.",
  sections: [
    {
      heading: "Domestic vs. Cross-Border Card Processing Compared",
      paragraphs: [
        "For standard US online card checkouts in 2026, Stripe charges 2.9% + $0.30 per successful charge, whereas PayPal's standard commercial checkout (PayPal Wallet and Venmo) starts at 3.49% + $0.49. On a $120 domestic order, that seemingly small 0.59% + $0.19 gap saves $0.90 per order—or $900 per thousand transactions—in Stripe's favor.",
        "When an international customer pays in your home currency (for example, a Canadian or UK cardholder paying a US merchant in USD), both Stripe and PayPal append a 1.50% cross-border card fee, bringing effective rates to 4.40% + $0.30 on Stripe versus 4.99% + $0.49 on PayPal.",
      ],
    },
    {
      heading: "The Hidden Cost of Currency Conversion (FX Spreads)",
      paragraphs: [
        "The steepest divergence occurs whenever currency conversion enters the flow. Stripe typically adds a 1.0% FX conversion fee above mid-market interbank rates (5.4% + $0.30 total), whereas PayPal's currency conversion spread generally ranges from 3.0% to 4.0% above base exchange rates—pushing total international FX deductions near 8% of invoice value.",
        "Many high-converting stores still offer PayPal Express alongside Stripe because PayPal lifts mobile checkout conversion by 8% to 15% for buyers who prefer wallet login, while routing B2B invoices through Stripe or ACH to protect net payout.",
      ],
    },
  ],
  tableCaption: "2026 Stripe vs. PayPal US Online Merchant Rates",
  tableHeaders: ["Transaction Scenario", "Stripe Standard", "PayPal Checkout"],
  tableRows: [
    ["Domestic US Online Payment", "2.90% + $0.30", "3.49% + $0.49"],
    ["International Buyer (Same Currency)", "4.40% + $0.30", "4.99% + $0.49"],
    ["International + Currency Conversion", "5.40% + $0.30", "~7.99% + $0.49"],
    ["Chargeback / Dispute Handling", "$15.00 (refunded if won)", "$20.00 standard"],
  ],
  workedExample: {
    title: "Worked Example: $120 Cross-Border Order With Currency Conversion",
    steps: [
      "Customer checks out for $120.00 equivalent; merchant service/fulfillment cost = $30.00.",
      "Stripe international + FX fee (5.4% + $0.30) = $6.48 + $0.30 = $6.78 total deduction.",
      "PayPal international + FX spread (~7.99% + $0.49) = $9.59 + $0.49 = $10.08 total deduction.",
      "Net Payout on Stripe = $83.22 (saving +$3.30 per order compared to $79.92 on PayPal).",
    ],
    takeaway:
      "Holding multi-currency settlement balances (USD, EUR, GBP) avoids automatic per-order FX conversion spreads altogether.",
  },
  faqs: [
    {
      question: "Does Stripe or PayPal refund processing fees when I issue a customer refund?",
      answer:
        "No. Neither Stripe nor PayPal refunds the original processing percentage or fixed cent fee when you return funds to a customer, so high-return categories should budget accordingly.",
    },
    {
      question: "Why keep PayPal at checkout if its fee is higher than Stripe?",
      answer:
        "Offering PayPal alongside Stripe captures incremental buyers who avoid typing 16-digit card numbers on mobile—often adding more net orders than the extra 0.59% fee costs.",
    },
    {
      question: "How can I avoid PayPal's 3%–4% currency conversion spread?",
      answer:
        "Configure multi-currency balances inside your business account and withdraw directly in matching currency corridors, or bill international B2B clients in USD via ACH/Wire.",
    },
    {
      question: "Does Stripe charge extra for Apple Pay or Google Pay?",
      answer:
        "No. Stripe processes Apple Pay and Google Pay digital wallets at the exact same 2.9% + $0.30 base card rate with zero additional wallet surcharge.",
    },
  ],
};

