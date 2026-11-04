import { ToolGuideContent } from "./types";

export const SHOPIFY_POD_GUIDE: ToolGuideContent = {
  slug: "shopify-print-on-demand-calculator",
  updatedLabel: "Verified November 2026 · Printful, Printify & Shopify Tiers",
  intro:
    "Print-on-Demand (POD) eliminates inventory risk by manufacturing apparel, drinkware, and wall art only after a customer orders on Shopify. Because on-demand garment blanks, direct-to-garment (DTG) print passes, and individual parcel fulfillment cost significantly more than bulk screen printing, precision retail pricing is the difference between a thriving creator merch store and razor-thin margins.",
  sections: [
    {
      heading: "Anatomy of a Shopify Print-on-Demand Order",
      paragraphs: [
        "Every Shopify POD checkout splits into two distinct cash flows: your customer pays your storefront retail price plus any shipping fee you charge at checkout, while your linked fulfillment provider (such as Printful, Printify, or Gelato) automatically bills your card for the blank item, print placement fees, and actual carrier postage.",
        "Meanwhile, Shopify Payments deducts card processing across the entire gross checkout amount—2.9% + $0.30 on Shopify Basic, 2.7% + $0.30 on Grow, or 2.5% + $0.30 on Advanced. Using a third-party gateway outside Shopify Payments adds an extra 0.6% to 2.0% transaction surcharge, making native Shopify Payments the clear margin winner.",
      ],
    },
    {
      heading: "How Top POD Brands Protect 35%–45% Gross Margins",
      paragraphs: [
        "Adding back-print, sleeve-print, or custom inside neck labels looks appealing during design mockup, yet each extra print placement adds $2.50 to $5.95 to base production cost. Passing a transparent $4.99 flat shipping charge—or baking shipping into a $34+ retail price with a 'Buy 2, Ship Free' cart bar—prevents fulfillment labels from halving single-unit profit.",
        "Subscribing to supplier discount tiers (such as Printify Premium) once your store exceeds 25 to 40 monthly orders typically lowers blank costs by 15% to 20%, immediately expanding net profit per unit.",
      ],
    },
  ],
  tableCaption: "2026 Shopify Payments & POD Benchmark Costs",
  tableHeaders: ["Cost / Plan Tier", "2026 Benchmark Rate", "Margin Impact Note"],
  tableRows: [
    ["Shopify Basic Processing", "2.9% + $0.30", "Best up to ~$12,000/mo gross volume"],
    ["Shopify Grow Processing", "2.7% + $0.30", "Saves 0.2% across high-volume checkouts"],
    ["Standard Tee Blank + Front Print", "$10.50 – $14.50", "Varies by heavyweight cotton & supplier"],
    ["Single-Unit US POD Shipping", "$4.25 – $5.50", "Additional items in cart ship for ~$2.00"],
  ],
  workedExample: {
    title: "Worked Example: $34 Heavyweight Graphic Tee on Shopify Basic",
    steps: [
      "Customer pays $34.00 total ($29.00 tee + $5.00 flat shipping).",
      "POD provider bills $13.50 blank/print + $4.75 US shipping = $18.25 fulfillment cost.",
      "Shopify Basic processing (2.9% of $34.00 + $0.30) = $0.99 + $0.30 = $1.29.",
      "Net Profit = $34.00 − $18.25 − $1.29 = $14.46 per order (42.5% net margin; 70 orders = $1,012 net).",
    ],
    takeaway:
      "Charging $5 shipping instead of offering unconditional free shipping on 1-item carts boosts net profit from $9.60 to $14.46—a 50% profit jump per order.",
  },
  faqs: [
    {
      question: "Should I offer free shipping on Shopify Print-on-Demand products?",
      answer:
        "Unconditional free shipping on single $25 items hurts POD margins. Instead, charge $4.95 flat shipping on 1 item and unlock free shipping at $60+ so customers add a second item, where incremental POD shipping drops near $2.",
    },
    {
      question: "When does upgrading from Shopify Basic to Shopify Grow pay for itself?",
      answer:
        "The 0.2% card processing savings alone offsets the monthly plan price difference once store card volume surpasses roughly $30,000/month, unless you need Grow's staff accounts earlier.",
    },
    {
      question: "Do Printful and Printify charge sales tax to me as the merchant?",
      answer:
        "Until you submit valid state resale certificates for states where you hold nexus, POD suppliers may collect tax on production charges; filing resale exemptions eliminates double taxation.",
    },
    {
      question: "Why do front-and-back prints reduce POD margin so sharply?",
      answer:
        "A second print location requires re-platen setup and extra DTG ink, adding $4–$6 per shirt—meaning you must price two-sided garments $8–$10 higher to preserve margin.",
    },
  ],
};

