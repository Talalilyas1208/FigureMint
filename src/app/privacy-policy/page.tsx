import React from "react";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AppCard } from "@/components/ui/AppCard";
import { StaticPageJsonLd } from "@/components/seo/StaticPageJsonLd";

export const metadata: Metadata = {
  title: "Privacy Policy & Advertising Cookie Disclosure",
  description:
    "FigureMint Privacy Policy including Google AdSense, DoubleClick DART cookie disclosures, GDPR/CCPA rights, and user opt-out controls.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy & Cookie Disclosures — FigureMint",
    description: "How FigureMint respects browser-local privacy and handles display advertising cookies.",
    url: "/privacy-policy",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "FigureMint Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — FigureMint",
    description: "How FigureMint respects browser-local privacy and handles display advertising cookies.",
    images: [{ url: "/og-image.png", alt: "FigureMint Privacy Policy" }],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section">
      <StaticPageJsonLd
        pageType="WebPage"
        title="Privacy Policy & Cookie Disclosure"
        description="How FigureMint handles browser-local calculations, advertising cookies, and your data privacy rights."
        path="/privacy-policy"
        breadcrumbLabel="Privacy Policy"
      />
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
          When you submit the contact form or use the optional margin advisor assistant,
          requests pass through our stateless backend to validate payloads and protect
          against automated spam. We do not store credit card credentials, bank logins, or
          merchant API tokens.
        </p>

        <h2>4. GDPR &amp; CCPA Privacy Rights</h2>
        <p>
          Under the General Data Protection Regulation (GDPR) and California Consumer
          Privacy Act (CCPA), you retain the right to request deletion of any contact
          correspondence sent to FigureMint. Because calculator operations run locally in
          your browser without requiring an account, FigureMint does not maintain consumer
          behavior profiles.
        </p>

        <h2>5. Policy Updates &amp; Contact</h2>
        <p>
          Revisions to this policy will be posted here with an updated effective date.
          Questions regarding privacy may be directed to{" "}
          <a href="mailto:editorial@figuremint.com">editorial@figuremint.com</a>.
        </p>
      </div>
    </section>
  );
}
