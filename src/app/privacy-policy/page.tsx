import React from "react";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AppCard } from "@/components/ui/AppCard";

export const metadata: Metadata = {
  title: "Privacy Policy & Advertising Cookie Disclosure",
  description:
    "FigureMint Privacy Policy including Google AdSense, DoubleClick DART cookie disclosures, GDPR/CCPA rights, and user opt-out controls.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section">
      <div className="container prose-shell">
        <SectionHeading
          as="h1"
          badge="Effective Nov 3, 2026"
          badgeTone="stone"
          title="Privacy Policy & Cookie Disclosure"
          subtitle="How FigureMint handles browser-local calculations, advertising cookies, and your data privacy rights."
        />

        <h2>1. Browser-Local Calculator Inputs &amp; Storage</h2>
        <p>
          Standard slider and numeric inputs entered into FigureMint calculators are
          evaluated directly inside your web browser. Bookmarked tools and reading comfort
          preferences are saved locally on your device via <code>localStorage</code> and
          can be cleared anytime through your browser settings.
        </p>

        <h2>2. Google AdSense &amp; DoubleClick DART Cookies</h2>
        <AppCard style={{ backgroundColor: "var(--bg-section)", marginBottom: 18 }}>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>
              Third-party vendors, including <strong>Google</strong>, use cookies to serve
              ads based on a user&apos;s prior visits to FigureMint or other websites.
            </li>
            <li>
              Google&apos;s use of advertising cookies (including the{" "}
              <strong>DoubleClick DART cookie</strong>) enables Google and its partners to
              serve ads to users based on their visit to this site and/or other sites on
              the Internet.
            </li>
            <li>
              Users may opt out of personalized advertising at any time by visiting{" "}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
                Google Ads Settings
              </a>{" "}
              or{" "}
              <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
                www.aboutads.info/choices
              </a>
              .
            </li>
          </ul>
        </AppCard>

        <h2>3. Server Logs, Margin Diagnostics &amp; Contact Submissions</h2>
        <p>
          When you voluntarily submit our Contact form or run an on-demand Margin Check,
          minimal sanitized inputs and rate-limiting metadata are processed solely to
          fulfill your request and protect service reliability. We never sell personal data.
        </p>

        <h2>4. EEA/UK (GDPR) &amp; California (CCPA/CPRA) Privacy Rights</h2>
        <p>
          Visitors in the European Economic Area, United Kingdom, and California have the
          right to request access to, correction of, or deletion of personal correspondence
          submitted via our Contact Desk by emailing{" "}
          <strong>editorial@figuremint.com</strong>.
        </p>
      </div>
    </section>
  );
}

