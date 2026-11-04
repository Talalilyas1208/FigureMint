interface SearchableDoc {
  title: string;
  href: string;
  kind: "Guide" | "Trust & Legal";
  readingTime: string;
  summary: string;
  keywords: string[];
}

export const GUIDES_AND_TRUST: SearchableDoc[] = [
  {
    title: "How 2026 Marketplace Referral & Hidden Ad Fees Work",
    href: "/about#methodology",
    kind: "Guide",
    readingTime: "4 min read",
    summary: "Why stacking platform referral cuts with affiliate commissions erodes net margin.",
    keywords: ["methodology", "referral", "hidden fees", "formula", "guide"],
  },
  {
    title: "Understanding Break-Even ROAS Before Scaling Paid Social",
    href: "/break-even-roas-calculator",
    kind: "Guide",
    readingTime: "5 min read",
    summary: "Step-by-step math for setting target CPA caps on Meta, Google, and TikTok.",
    keywords: ["roas", "scaling", "paid social", "cpa", "margin"],
  },
  {
    title: "About FigureMint & Fee Verification Methodology",
    href: "/about",
    kind: "Trust & Legal",
    readingTime: "3 min read",
    summary: "Our privacy-first methodology, audit dates, and official 2026 fee schedule sources.",
    keywords: ["about", "methodology", "trust", "accuracy", "sources", "figuremint"],
  },
  {
    title: "Contact Editorial & Report a 2026 Fee Update",
    href: "/contact",
    kind: "Trust & Legal",
    readingTime: "2 min read",
    summary: "Submit marketplace rate updates, bug reports, or partnership questions.",
    keywords: ["contact", "support", "email", "report", "feedback"],
  },
  {
    title: "Privacy Policy, Google AdSense & Cookie Settings",
    href: "/privacy-policy",
    kind: "Trust & Legal",
    readingTime: "5 min read",
    summary: "Full disclosure on Google AdSense, DoubleClick DART cookies, GDPR/CCPA & opt-outs.",
    keywords: ["privacy", "cookies", "adsense", "dart", "gdpr", "opt out"],
  },
  {
    title: "Terms of Service",
    href: "/terms",
    kind: "Trust & Legal",
    readingTime: "4 min read",
    summary: "Acceptable use, intellectual property, and service terms for FigureMint.",
    keywords: ["terms", "conditions", "legal"],
  },
  {
    title: "Financial, Tax & Marketplace Estimation Disclaimer",
    href: "/disclaimer",
    kind: "Trust & Legal",
    readingTime: "3 min read",
    summary: "Educational estimation scope, regional fee variability, and non-affiliation notice.",
    keywords: ["disclaimer", "tax", "financial advice", "estimates"],
  },
];

