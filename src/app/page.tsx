import React from "react";
import type { Metadata } from "next";
import { ArrowRightOutlined, CheckCircleOutlined, LockOutlined } from "@ant-design/icons";
import { AppBadge } from "@/components/ui/AppBadge";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AdSlot } from "@/components/ads/AdSlot";
import { QuickMarginPulse } from "@/components/engagement/QuickMarginPulse";
import { ToolGridSection } from "@/components/engagement/ToolGridSection";
import { HomeJsonLd } from "@/components/seo/HomeJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <section className="section">
      <HomeJsonLd />
      <div className="container">
        <div className="content-with-rail">
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
              <AppBadge tone="emerald" icon={<CheckCircleOutlined />}>
                2026 Fee Schedules
              </AppBadge>
              <AppBadge tone="amber" icon={<LockOutlined />}>
                No Sign-Up Required
              </AppBadge>
            </div>

            <h1>Know Your True Net Profit Before You Price or Scale.</h1>
            <p style={{ fontSize: "1.05rem", maxWidth: 640 }}>
              Marketplace referral fees, creator affiliate commissions, offsite ad charges,
              and cross-border FX spreads routinely take 18% to 35% of gross sales. Run
              real numbers in seconds before committing inventory or ad budget.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
              <AppButton href="/profit-margin-calculators" variant="primary" rightIcon={<ArrowRightOutlined />}>
                Browse All 6 Calculators
              </AppButton>
              <AppButton href="/about#methodology" variant="secondary">
                How We Verify Fees
              </AppButton>
            </div>

            <QuickMarginPulse />

            <AdSlot id="home-results-banner" variant="leaderboard" />

            <ToolGridSection />

            <AdSlot id="home-in-article" variant="in-article" />

            <AppCard style={{ backgroundColor: "var(--bg-section)" }}>
              <h2 style={{ fontSize: "1.28rem" }}>Built for Independent Sellers &amp; Freelancers</h2>
              <p style={{ marginBottom: 0 }}>
                Every calculator combines current 2026 merchant rate cards with worked
                dollar examples and shareable scenario links—so you can audit SKUs with
                co-founders, suppliers, or clients without spreadsheets.
              </p>
            </AppCard>
          </div>

          <div className="desktop-rail">
            <AdSlot id="home-desktop-rail" variant="sidebar" />
            <AppCard padding="sm" style={{ marginTop: 20 }}>
              <div style={{ fontWeight: 700, color: "var(--text-heading)", marginBottom: 6 }}>
                Quick Tip
              </div>
              <p style={{ fontSize: "0.88rem", marginBottom: 0 }}>
                Star your favorite calculators to save them locally, or press{" "}
                <strong>⌘K</strong> on desktop to switch tools instantly.
              </p>
            </AppCard>
          </div>
        </div>
      </div>
    </section>
  );
}
