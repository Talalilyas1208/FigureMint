import React from "react";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AppCard } from "@/components/ui/AppCard";
import { StaticPageJsonLd } from "@/components/seo/StaticPageJsonLd";

export const metadata: Metadata = {
  title: "About FigureMint & 2026 Fee Verification Methodology",
  description:
    "How FigureMint researches and verifies 2026 marketplace, payment processing, and advertising fee formulas.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About FigureMint & 2026 Fee Verification Methodology",
    description: "How FigureMint researches and verifies 2026 marketplace and processing fee formulas.",
    url: "/about",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About FigureMint",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About FigureMint",
    description: "Methodology and verification standards behind FigureMint fee calculators.",
    images: [{ url: "/og-image.png", alt: "About FigureMint" }],
  },
};

export default function AboutPage() {
  return (
    <section className="section">
      <StaticPageJsonLd
        pageType="AboutPage"
        title="About FigureMint & Our Fee Methodology"
        description="Plain-English profit and fee calculators built for independent e-commerce merchants, creators, and freelancers."
        path="/about"
        breadcrumbLabel="About"
      />
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
                <th>Platform / Channel</th>
                <th>Verified Fee Baseline (2026)</th>
                <th>Last Audit Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>TikTok Shop US</strong></td>
                <td>Up to 6% referral + 10%–20% creator affiliate splits + processing</td>
                <td>Nov 2026</td>
              </tr>
              <tr>
                <td><strong>Etsy Marketplace</strong></td>
                <td>$0.20 listing + 6.5% transaction + 3%–4% processing + 12%–15% Offsite Ads</td>
                <td>Nov 2026</td>
              </tr>
              <tr>
                <td><strong>Stripe Payments</strong></td>
                <td>2.9% + $0.30 domestic; +1.5% international card; +1% FX conversion spread</td>
                <td>Nov 2026</td>
              </tr>
              <tr>
                <td><strong>Shopify POD</strong></td>
                <td>Base garment blank + decoration print costs + 2.4%–2.9% + 30¢ Shopify Payments</td>
                <td>Nov 2026</td>
              </tr>
              <tr>
                <td><strong>Upwork Freelance</strong></td>
                <td>Flat 10% freelancer service fee + ACH/wire withdrawal fees + self-employment tax</td>
                <td>Nov 2026</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Editorial Independence &amp; Merchant Privacy</h2>
        <p>
          FigureMint does not sell user inputs. All slider calculations, break-even ROAS
          thresholds, and invoice margins run client-side in your browser. We are supported
          by contextual display advertising so all tools remain free to use without account
          creation or email gates.
        </p>

        <AppCard style={{ backgroundColor: "var(--bg-section)", marginTop: 24 }}>
          <h2 style={{ fontSize: "1.15rem", marginTop: 0 }}>Contacting the FigureMint Team</h2>
          <p style={{ marginBottom: 0 }}>
            Have a rate card revision or spotted an unannounced fee change? Reach our
            editorial team at <a href="mailto:editorial@figuremint.com">editorial@figuremint.com</a>{" "}
            or use our <a href="/contact">feedback form</a>.
          </p>
        </AppCard>
      </div>
    </section>
  );
}
