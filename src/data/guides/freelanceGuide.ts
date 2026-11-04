import { ToolGuideContent } from "./types";

export const FREELANCE_GUIDE: ToolGuideContent = {
  slug: "upwork-freelance-fee-calculator",
  updatedLabel: "Verified November 2026 · Freelance & Contractor Tax Model",
  intro:
    "Charging $95 per hour on Upwork or independent consulting retainers sounds lucrative on paper—until marketplace service commissions, self-employment Medicare and Social Security taxes, income tax brackets, and unbilled admin hours reduce real take-home pay by more than a third. Modeling your true net hourly keep ensures your freelance rate supports sustainable income, software overhead, and paid time off.",
  sections: [
    {
      heading: "Platform Commissions vs. Direct Client Billing",
      paragraphs: [
        "Under Upwork's flat freelancer fee model, standard marketplace contracts deduct a 10% service fee across hourly, milestone, and fixed-price billings. While 10% buys escrow payment protection and warm client discovery, moving long-term repeat clients (within platform terms) or closing direct inbound retainers via ACH wire drops payment friction to 0%—instantly returning $9.50 per hour on a $95 rate.",
        "When billing direct clients by credit card via Stripe Invoicing or QuickBooks, budget roughly 2.9% for card processing, or enable bank transfer (ACH / SEPA) options to preserve nearly 100% of gross billings before tax.",
      ],
    },
    {
      heading: "Self-Employment Tax Buffers & Realistic Billable Utilization",
      paragraphs: [
        "Independent contractors cover both the employer and employee halves of payroll taxes (15.3% US self-employment tax prior to qualified deductions) alongside federal and state income taxes. Setting aside 22% to 30% of post-fee earnings into a dedicated tax reserve prevents quarterly estimated-tax surprises.",
        "Just as importantly, very few solo freelancers bill 40 hours every week: proposals, client calls, bookkeeping, and portfolio updates typically cap billable utilization between 24 and 30 hours per week. Always anchor monthly income goals to realistic billable hours.",
      ],
    },
  ],
  tableCaption: "2026 Freelance Billing Channel & Deduction Benchmarks",
  tableHeaders: ["Billing / Tax Factor", "Typical Rate", "Impact on $100/hr Rate"],
  tableRows: [
    ["Upwork Freelancer Service Fee", "10.0%", "−$10.00/hr ($90.00 post-platform)"],
    ["Direct Card Invoice (Stripe)", "2.9% + $0.30", "−$2.90/hr (~$97.10 post-fee)"],
    ["Direct Bank ACH / Wire Transfer", "0.0% – $1.00 cap", "Keep ~$100.00/hr pre-tax"],
    ["Combined SE + Income Tax Reserve", "22% – 30% of net", "−$19.80 to −$27.00/hr set-aside"],
  ],
  workedExample: {
    title: "Worked Example: $95/hr Upwork Consultant Billing 26 Hours/Week",
    steps: [
      "Gross hourly rate = $95.00 across 26 billable hours/week ($2,470/wk gross).",
      "Upwork 10% service fee deducts $9.50/hr, leaving $85.50/hr net of platform fees.",
      "Setting aside a 24% tax reserve ($20.52/hr) leaves $64.98/hr in true spendable take-home pay.",
      "Monthly Net Take-Home = $64.98 × 26 hrs × 4.33 weeks = ~$7,315/month after fees and tax buffer.",
    ],
    takeaway:
      "Comparing Upwork (10%) against Direct ACH (0%) shows that winning direct retainers lifts monthly net take-home from $7,315 to $8,128 at the exact same $95/hr rate.",
  },
  faqs: [
    {
      question: "Are Upwork's 10% service fees tax-deductible for freelancers?",
      answer:
        "Yes. Marketplace commissions, payment processing fees, and business software subscriptions count as ordinary business expenses, meaning you owe income and self-employment taxes only on net earnings after fees.",
    },
    {
      question: "How many billable hours per week should a full-time freelancer assume?",
      answer:
        "Most seasoned solo consultants average 24 to 30 billable hours out of a 40-hour workweek, spending the remaining 10 to 16 hours on discovery calls, scoping, admin, and skill development.",
    },
    {
      question: "How much should a US freelancer set aside for quarterly taxes?",
      answer:
        "A 24% to 30% reserve of post-expense net profit safely covers self-employment and federal taxes for most solo earners, though state tax brackets and retirement deductions vary—always confirm with a CPA.",
    },
    {
      question: "How do I convert a desired annual salary into a freelance hourly rate?",
      answer:
        "Divide your target post-tax income by (1 − Tax %) and (1 − Platform Fee %), then divide by ~1,250 annual billable hours (26 hrs/wk × 48 working weeks allowing 4 weeks of unpaid vacation).",
    },
  ],
};

