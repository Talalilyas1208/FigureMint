import React from "react";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service governing access to FigureMint calculators and guides.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="section">
      <div className="container prose-shell">
        <SectionHeading
          as="h1"
          badge="Last Updated Nov 2026"
          badgeTone="stone"
          title="Terms of Service"
          subtitle="Please review these terms before using FigureMint calculators, APIs, and editorial guides."
        />

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using FigureMint, you agree to be bound by these Terms of
          Service and all applicable laws. If you do not agree, please discontinue use of
          the website.
        </p>

        <h2>2. Educational &amp; Estimation Purpose</h2>
        <p>
          All profit, ROAS, payment fee, and freelance take-home figures generated on
          FigureMint are mathematical estimates based on user-supplied assumptions and
          publicly documented fee schedules. Marketplaces may modify rates, promotional
          rebates, or regional taxes without prior notice.
        </p>

        <h2>3. Acceptable Use &amp; Automated Access</h2>
        <p>
          You may freely use, bookmark, and share FigureMint calculation summaries for
          personal or commercial store planning. Automated scraping, denial-of-service
          probing, or bypassing API rate limits is strictly prohibited.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
          Original calculator interfaces, written methodology guides, and FigureMint brand
          assets remain the property of FigureMint. Third-party trademarks (such as TikTok
          Shop, Etsy, Shopify, Stripe, PayPal, and Upwork) belong to their respective
          owners and are referenced strictly for nominative fee-comparison purposes.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          FigureMint is provided &ldquo;as is&rdquo; without warranties of any kind and
          shall not be liable for pricing, ad-spend, or tax decisions made using these
          tools.
        </p>
      </div>
    </section>
  );
}

