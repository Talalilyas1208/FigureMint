import { ToolGuideContent } from "./types";

export const TIKTOK_GUIDE: ToolGuideContent = {
  slug: "tiktok-shop-fee-calculator",
  updatedLabel: "Verified November 2026 · US & UK Merchant Schedules",
  intro:
    "TikTok Shop rewards high-velocity short-form video discovery, yet many brands scale viral SKUs before realizing stacked deductions—marketplace referral commissions, open or targeted creator affiliate splits, shipping subsidies, and sample seeding—consume a full third of gross checkout revenue. Modeling exact unit economics before approving creator commission tiers protects your cash flow as order volume surges.",
  sections: [
    {
      heading: "How TikTok Shop Referral & Creator Affiliate Fees Stack",
      paragraphs: [
        "Under the 2026 US TikTok Shop fee schedule, most mainstream consumer categories carry a 6% to 8% platform referral fee calculated on the customer payment amount after merchant-funded discounts, plus a small $0.30 settlement handling charge per order. Certain jewelry and pre-owned luxury verticals carry adjusted referral rates, while new-seller promotional rebates apply only for a capped introductory window.",
        "Unlike traditional marketplaces where organic search drives most orders, TikTok Shop relies heavily on Open Plan and Targeted Plan creator affiliates. When a creator sells your product through a shoppable video or livestream, their 10% to 20% commission is deducted alongside TikTok's referral cut. Treating affiliate commission as part of variable fee load—rather than an afterthought—is essential for accurate SKU pricing.",
      ],
    },
    {
      heading: "Shipping Subsidies, FBT & Refund Buffer Planning",
      paragraphs: [
        "Free-shipping thresholds dramatically lift video conversion rates, but whenever your store absorbs label costs—either via Seller Shipping or Fulfilled by TikTok (FBT) pick-and-pack rates—that subsidy comes straight out of contribution margin. On sub-$25 items, a $4.50 postage subsidy alone equals 18% of gross revenue.",
        "Experienced TikTok Shop operators also hold a 3% to 6% return and sample-seeding allowance when evaluating net profitability, ensuring flash-sale spikes translate into real bank payouts rather than inventory churn.",
      ],
    },
  ],
  tableCaption: "2026 TikTok Shop Fee Components Overview",
  tableHeaders: ["Fee Component", "Typical 2026 Rate", "Calculation Basis"],
  tableRows: [
    ["Standard Category Referral Fee", "6.0% – 8.0%", "Item price post seller coupon + tax handling"],
    ["Settlement / Transaction Handling", "$0.30 per order", "Flat per settled checkout"],
    ["Creator Affiliate Commission", "10.0% – 20.0%", "Net item price before shipping"],
    ["FBT / Seller Shipping Subsidy", "$3.80 – $6.50+", "Package weight & zone tier"],
  ],
  workedExample: {
    title: "Worked Example: $42 Beauty Bundle Sold via Creator Video",
    steps: [
      "Customer pays $42.00 with seller-funded free shipping.",
      "Landed product COGS ($11.00) + Seller shipping label ($4.50) = $15.50 direct cost.",
      "TikTok 6% referral ($2.52) + 12% creator affiliate ($5.04) + $0.30 settlement = $7.86 total fees.",
      "Net Profit = $42.00 − $15.50 − $7.86 = $18.64 per order (44.4% net margin before paid Shop Ads).",
    ],
    takeaway:
      "With $18.64 in pre-ad contribution profit, your absolute maximum Shop Ads CPA before losing money is $18.64—aim for a $9–$11 CPA to retain healthy 20%+ net profit.",
  },
  faqs: [
    {
      question: "Does TikTok Shop charge both referral fees and payment processing fees?",
      answer:
        "TikTok Shop bundles standard card processing inside its category referral fee (typically 6%–8% in the US), plus a small per-order settlement fee modeled at $0.30 in our calculator.",
    },
    {
      question: "Are creator affiliate commissions paid on customer shipping charges?",
      answer:
        "No. Affiliate commissions are calculated strictly on the discounted product price paid by the buyer, excluding shipping fees and sales tax.",
    },
    {
      question: "What creator affiliate percentage converts best without crushing margin?",
      answer:
        "Most profitable beauty, home, and apparel brands set Open Plan commissions between 10% and 15%, reserving 18%–22% VIP tiers exclusively for high-AOV multi-packs.",
    },
    {
      question: "How do seller coupons vs. TikTok-funded vouchers affect fees?",
      answer:
        "Seller-funded coupons reduce your gross revenue and lower the base on which commissions apply, whereas TikTok-funded platform vouchers discount the buyer's cart while paying you on your full offer price.",
    },
  ],
};

