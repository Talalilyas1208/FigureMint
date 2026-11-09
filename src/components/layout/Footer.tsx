import React from "react";
import Link from "next/link";
import { LockOutlined } from "@ant-design/icons";
import { AppBadge } from "@/components/ui/AppBadge";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.15rem", color: "var(--text-heading)", marginBottom: 8 }}>
              FigureMint
            </div>
            <p style={{ fontSize: "0.92rem", color: "var(--text-body)" }}>
              Independent fee, ROAS, and net profit calculators for online sellers,
              creators, and freelancers. All calculations run locally in your browser.
            </p>
            <AppBadge tone="emerald" icon={<LockOutlined />}>
              100% Free · Browser-Local Privacy
            </AppBadge>
          </div>

          <div>
            <div className="footer-col-title" style={{ fontWeight: 700, fontSize: "0.96rem", marginBottom: 10, color: "var(--text-heading)" }}>
              Calculators
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
              <li><Link href="/tiktok-shop-fee-calculator">TikTok Shop Fee Calculator</Link></li>
              <li><Link href="/etsy-fee-profit-calculator">Etsy Fee &amp; Profit Calculator</Link></li>
              <li><Link href="/break-even-roas-calculator">Break-Even ROAS Calculator</Link></li>
              <li><Link href="/stripe-vs-paypal-fee-calculator">Stripe vs. PayPal Fee Calculator</Link></li>
              <li><Link href="/shopify-print-on-demand-calculator">Shopify Print-on-Demand Calculator</Link></li>
              <li><Link href="/upwork-freelance-fee-calculator">Upwork &amp; Freelance Fee Calculator</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title" style={{ fontWeight: 700, fontSize: "0.96rem", marginBottom: 10, color: "var(--text-heading)" }}>
              Editorial &amp; Help
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
              <li><Link href="/profit-margin-calculators">All Profit Margin Calculators</Link></li>
              <li><Link href="/about">About &amp; Fee Methodology</Link></li>
              <li><Link href="/contact">Contact &amp; Report Fee Change</Link></li>
              <li><Link href="/sitemap.xml">XML Sitemap</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title" style={{ fontWeight: 700, fontSize: "0.96rem", marginBottom: 10, color: "var(--text-heading)" }}>
              Legal &amp; Disclosures
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
              <li><Link href="/privacy-policy">Privacy &amp; Cookie Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/disclaimer">Financial Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div
          style={{
            marginTop: 28,
            paddingTop: 18,
            borderTop: "1px solid var(--border-warm)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 10,
            fontSize: "0.84rem",
            color: "var(--text-muted)",
          }}
        >
          <span>© 2026 FigureMint. Independent seller tools &amp; financial estimations.</span>
          <span>Fee schedules verified November 2026</span>
        </div>
      </div>
    </footer>
  );
}
