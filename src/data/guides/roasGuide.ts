import { ToolGuideContent } from "./types";

export const ROAS_GUIDE: ToolGuideContent = {
  slug: "break-even-roas-calculator",
  updatedLabel: "Verified November 2026 · Paid Social & Search Benchmarks",
  intro:
    "Ad platform dashboards celebrate high Return on Ad Spend (ROAS), yet a 2.5x ROAS campaign can silently drain your bank account if landed product costs, fulfillment pick-and-pack fees, and card processing leave only a 35% pre-ad contribution margin. Calculating your exact Break-Even ROAS floor gives media buyers an objective guardrail before scaling Meta, Google Shopping, or TikTok Ads budgets.",
  sections: [
    {
      heading: "How Break-Even ROAS & Maximum CPA Are Derived",
      paragraphs: [
        "Break-Even ROAS represents the exact ad multiplier where net profit equals $0.00—meaning every dollar left after COGS, shipping, and payment processing is spent acquiring the customer. Mathematically, Break-Even ROAS equals Average Order Value (AOV) divided by Pre-Ad Contribution Profit ($AOV ÷ [AOV − COGS − Processing]).",
        "Equivalently, if your pre-ad contribution margin is 65.3%, your Break-Even ROAS is 1 ÷ 0.653 = 1.53x. Any campaign running above 1.53x generates positive net contribution, while any ad set below 1.53x loses cash on first-order checkout unless repeat Customer Lifetime Value (LTV) recoups the gap.",
      ],
    },
    {
      heading: "Setting Profitable Scaling Targets in 2026",
      paragraphs: [
        "Smart e-commerce operators never bid right up to their break-even ceiling because ad attribution overlap, post-purchase refunds, and damaged returns erode real-world MER (Marketing Efficiency Ratio). Building a 15% to 20% net profit cushion above break-even ensures ad spend compounds free cash flow.",
        "If rising auction CPMs push your CPA too close to break-even, lifting Average Order Value with 2-pack bundles, post-purchase one-click upsells, or free-shipping cart thresholds lowers your Break-Even ROAS floor immediately—often unlocking profitable scale without changing ad creative.",
      ],
    },
  ],
  tableCaption: "Pre-Ad Margin % vs. Required Break-Even ROAS Floor",
  tableHeaders: ["Pre-Ad Contribution Margin", "Break-Even ROAS Floor", "Target ROAS (for 15% Net)"],
  tableRows: [
    ["75% (Digital / High-Markup)", "1.33x", "1.67x"],
    ["65% (DTC Skincare / Supplements)", "1.54x", "2.00x"],
    ["50% (Apparel / Home Goods)", "2.00x", "2.86x"],
    ["35% (Electronics / Resellers)", "2.86x", "5.00x"],
  ],
  workedExample: {
    title: "Worked Example: $68 DTC Order Running Paid Social Ads",
    steps: [
      "Store Average Order Value (AOV) = $68.00; Landed COGS + fulfillment = $21.00.",
      "Payment processing at 3.4% + $0.30 = $2.61, leaving $44.39 pre-ad contribution margin (65.3%).",
      "Break-Even ROAS Floor = $68.00 ÷ $44.39 = 1.53x (Max break-even CPA = $44.39).",
      "At an actual $22.00 Meta Ads CPA (3.09x ROAS), Net Profit = $44.39 − $22.00 = $22.39 per order (32.9% net margin).",
    ],
    takeaway:
      "Knowing your 1.53x floor lets you confidently scale ad sets running at 2.4x–3.1x while pausing underperformers before they burn margin.",
  },
  faqs: [
    {
      question: "What is a good ROAS for e-commerce in 2026?",
      answer:
        "There is no universal 'good' ROAS without knowing gross margin: a 75%-margin skincare brand thrives at 1.9x ROAS, whereas a 30%-margin electronics store loses money at 3.0x ROAS.",
    },
    {
      question: "Should shipping and payment gateway fees be included in Break-Even ROAS?",
      answer:
        "Yes. Excluding 2.9%–3.5% card fees and outbound fulfillment labels artificially inflates your pre-ad margin and makes your Break-Even ROAS appear lower than reality.",
    },
    {
      question: "What is the difference between Platform ROAS and MER?",
      answer:
        "Platform ROAS measures attributed revenue inside Meta or Google Ads Manager, whereas MER (Total Store Revenue ÷ Total Ad Spend across all channels) reflects true blended cash efficiency.",
    },
    {
      question: "How do I lower my Break-Even ROAS without raising single-item prices?",
      answer:
        "Introduce tiered quantity bundles (Buy 2 Save 10%), checkout order bumps, or lower unit packaging/3PL weight tiers so AOV rises faster than fulfillment cost.",
    },
  ],
};

