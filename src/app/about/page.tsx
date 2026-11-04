import React from "react";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AppCard } from "@/components/ui/AppCard";

export const metadata: Metadata = {
  title: "About FigureMint & 2026 Fee Verification Methodology",
  description:
    "How FigureMint researches and verifies 2026 marketplace, payment processing, and advertising fee formulas.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container prose-shell">
        <SectionHeading
          as="h1"
          badge="Editorial Standards"
          title="About FigureMint & Our Fee Methodology"
          subtitle="Plain-English profit and fee calculators built for independent e-commerce merchants, creators, and freelancers."
        />

        <p>
          FigureMint started with a simple observation: storefront dashboards highlight
          <strong> gross sales</strong>, while category referral fees, affiliate splits,
          offsite ad attributions, and international currency conversion quietly absorb
          18% to 35% of an order&apos;s value. We build focused calculators that show what
          actually lands in your bank account.
        </p>

        <h2 id="methodology">How We Verify 2026 Platform Fee Schedules</h2>
        <p>
          Each calculator formula is cross-checked monthly against official merchant
          documentation and real settlement statements before publication.
        </p>

        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Platform</th>
                <th>Baseline Variable Fee</th>
                <th>Fixed Processing</th>
                <th>Last Reviewed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>TikTok Shop (US Standard + Affiliate)</td>
                <td>6%–8% referral + affiliate %</td>
                <td>$0.30</td>
                <td>Nov 2026</td>
              </tr>
              <tr>
                <td>Etsy Marketplace (+ Offsite Ads)</td>
                <td>6.5% tx + 3% processing (+12–15%)</td>
                <td>$0.20 + $0.25</td>
                <td>Nov 2026</td>
              </tr>
              <tr>
                <td>Stripe / PayPal Cross-Border</td>
                <td>2.9%–3.49% + 1.5% intl + FX</td>
                <td>$0.30–$0.49</td>
                <td>Nov 2026</td>
              </tr>
              <tr>
                <td>Upwork Freelancer Service Fee</td>
                <td>10% contract fee + tax reserve</td>
                <td>$0.00</td>
                <td>Nov 2026</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Privacy-First Design</h2>
        <AppCard style={{ backgroundColor: "var(--bg-section)" }}>
          <p style={{ marginBottom: 0 }}>
            All slider and pricing inputs run directly in your browser—we never require
            account registration or store connection to calculate your margins.
          </p>
        </AppCard>
      </div>
    </section>
  );
}
