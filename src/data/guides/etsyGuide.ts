import { ToolGuideContent } from "./types";

export const ETSY_GUIDE: ToolGuideContent = {
  slug: "etsy-fee-profit-calculator",
  updatedLabel: "Verified November 2026 · Etsy Seller Handbook",
  intro:
    "Etsy gives handmade makers, vintage curators, and digital print shops built-in buyer trust, yet its multi-layered fee ledger often surprises growing storefronts. Because Etsy applies transaction and payment fees to the combined item price plus shipping charged—and automatically attributes 12% to 15% Offsite Ads fees on external clicks—testing both organic and ad-attributed margins is critical.",
  sections: [
    {
      heading: "Every Layer of Etsy's 2026 Per-Order Deductions",
      paragraphs: [
        "Every physical listing incurs a flat $0.20 USD listing fee upon publication and again each time an item sells or auto-renews. Once a customer completes checkout, Etsy deducts a 6.5% transaction fee across the entire order total—meaning both your item retail price and any shipping or gift-wrap amount charged to the buyer.",
        "On top of the 6.5% transaction fee, Etsy Payments charges regional card processing (3.0% + $0.25 USD in the United States; slightly higher in the UK, EU, and Canada). Together, baseline organic Etsy fees start near 9.5% + $0.45 before postage or Offsite Ads ever enter the picture.",
      ],
    },
    {
      heading: "Mandatory 12% vs. Optional 15% Offsite Ads Explained",
      paragraphs: [
        "Etsy syndicates product listings across Google Shopping, Pinterest, Meta, and Bing at its own upfront expense. When a shopper clicks one of those external placements and buys from your shop within 30 days, Etsy levies an Offsite Ads attribution fee: 15% for shops under $10,000 in trailing 12-month revenue (who can opt out), and a discounted—but mandatory—12% rate once your shop crosses $10,000 USD in annual sales.",
        "Pricing products so they remain profitable even when a 12% or 15% Offsite Ad triggers prevents painful margin wipeouts as your shop scales past the $10,000 milestone.",
      ],
    },
  ],
  tableCaption: "2026 Etsy US Seller Fee Breakdown",
  tableHeaders: ["Etsy Fee Layer", "2026 US Rate", "Applies To"],
  tableRows: [
    ["Listing / Auto-Renewal Fee", "$0.20 flat", "Per listing quantity sold"],
    ["Marketplace Transaction Fee", "6.5%", "Item price + shipping + gift wrap"],
    ["Etsy Payments Processing", "3.0% + $0.25", "Total gross checkout amount"],
    ["Offsite Ads Attribution Fee", "15% (<$10k) or 12% (>=$10k)", "Attributed order total ($100 fee cap)"],
  ],
  workedExample: {
    title: "Worked Example: $36 Soy Candle Set With 12% Offsite Ad",
    steps: [
      "Buyer pays $36.00 total ($30 candle set + $6 shipping); maker's materials + label cost = $10.50.",
      "Base Etsy fees: $0.20 listing + $2.34 (6.5% tx) + $1.33 (3% + $0.25 processing) = $3.87.",
      "If triggered, 12% Offsite Ad adds $4.32, bringing total Etsy deductions to $8.19 (22.8% effective take-rate).",
      "Net Profit = $36.00 − $10.50 − $8.19 = $17.31 on Offsite Ad orders (vs. $21.63 on organic search orders).",
    ],
    takeaway:
      "Testing the 12% and 15% dropdown options ensures your handmade labor is fairly compensated even on ad-attributed checkouts.",
  },
  faqs: [
    {
      question: "Does Etsy charge the 6.5% transaction fee on shipping?",
      answer:
        "Yes. Etsy calculates the 6.5% transaction fee on the total amount paid by the buyer, including item price, shipping charges, and optional gift wrapping.",
    },
    {
      question: "Can I opt out of Etsy Offsite Ads once my shop passes $10,000?",
      answer:
        "No. Once a shop earns $10,000 USD or more within any trailing 365-day window, enrollment in Offsite Ads becomes permanent for the lifetime of the shop, though the fee drops from 15% to 12%.",
    },
    {
      question: "Is there a maximum dollar cap on a single Etsy Offsite Ads fee?",
      answer:
        "Yes. Etsy caps the Offsite Ads fee at $100 USD per attributed order, which protects sellers of high-ticket furniture, fine art, and engagement jewelry.",
    },
    {
      question: "Do digital download sellers pay the $0.20 renewal fee on every sale?",
      answer:
        "Yes. Multi-quantity digital listings still trigger a $0.20 auto-renewal deduction each time a customer purchases a download, though material and postage costs drop to zero.",
    },
  ],
};

