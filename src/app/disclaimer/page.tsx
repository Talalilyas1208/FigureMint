import React from "react";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AppCard } from "@/components/ui/AppCard";
import { StaticPageJsonLd } from "@/components/seo/StaticPageJsonLd";

export const metadata: Metadata = {
  title: "Financial, Tax & Marketplace Estimation Disclaimer",
  description:
    "Important financial, accounting, and marketplace fee estimation disclosures for FigureMint users.",
  alternates: { canonical: "/disclaimer" },
  openGraph: {
    title: "Financial & Estimation Disclaimer — FigureMint",
    description: "Educational unit-economics modeling disclosures and independent publisher notices.",
    url: "/disclaimer",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "FigureMint Disclaimer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial & Estimation Disclaimer — FigureMint",
    description: "Educational unit-economics modeling disclosures and independent publisher notices.",
    images: [{ url: "/og-image.png", alt: "FigureMint Disclaimer" }],
  },
};

export default function DisclaimerPage() {
  return (
    <section className="section">
      <StaticPageJsonLd
        pageType="WebPage"
        title="Financial, Tax & Estimation Disclaimer"
        description="FigureMint provides educational unit-economics modeling—not certified accounting, tax, or legal advice."
        path="/disclaimer"
        breadcrumbLabel="Disclaimer"
      />
      <div className="container prose-shell">
        <SectionHeading
          as="h1"
          badge="Important Disclosure"
          badgeTone="amber"
          title="Financial, Tax & Estimation Disclaimer"
          subtitle="FigureMint provides educational unit-economics modeling—not certified accounting, tax, or legal advice."
        />

        <AppCard style={{ backgroundColor: "var(--bg-amber-badge)", marginBottom: 22 }}>
          <p style={{ marginBottom: 0, color: "var(--text-heading)", fontWeight: 600 }}>
            Always verify final payout rates, VAT/GST obligations, and self-employment tax
            rules against your live merchant dashboard and a licensed CPA or tax advisor.
          </p>
        </AppCard>

        <h2>1. No Fiduciary or CPA Relationship</h2>
        <p>
          Calculations, margin scores, and pricing notes on FigureMint are provided
          strictly for informational and scenario-planning purposes. Nothing on this
          website constitutes certified public accounting, tax filing guidance, or
          investment advice.
        </p>

        <h2>2. Marketplace &amp; Processor Fee Variability</h2>
        <p>
          Actual per-order deductions vary by seller country, product category, chargeback
          tier, currency conversion spread, and mandatory Offsite Ads enrollment.
        </p>

        <h2>3. Independent Publisher Statement</h2>
        <p>
          FigureMint is an independent publication and is not endorsed by, sponsored by, or
          affiliated with TikTok Inc., Etsy Inc., Shopify Inc., Stripe Inc., PayPal
          Holdings Inc., or Upwork Inc.
        </p>
      </div>
    </section>
  );
}
