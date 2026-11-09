import React from "react";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { AppCard } from "@/components/ui/AppCard";
import { StaticPageJsonLd } from "@/components/seo/StaticPageJsonLd";

export const metadata: Metadata = {
  title: "Contact Editorial & Report a 2026 Fee Update",
  description:
    "Reach the FigureMint editorial team to report marketplace fee changes, request new calculators, or ask advertising questions.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact FigureMint Editorial",
    description: "Reach FigureMint editors to report fee changes or submit feedback.",
    url: "/contact",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact FigureMint" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact FigureMint Editorial",
    description: "Reach FigureMint editors to report fee changes or submit feedback.",
    images: [{ url: "/og-image.png", alt: "Contact FigureMint" }],
  },
};

export default function ContactPage() {
  return (
    <section className="section">
      <StaticPageJsonLd
        pageType="ContactPage"
        title="Contact Us & Report Fee Changes"
        description="Spotted a newly announced marketplace rate change or want a custom calculator added? Send a note directly to our team."
        path="/contact"
        breadcrumbLabel="Contact"
      />
      <div className="container prose-shell">
        <SectionHeading
          as="h1"
          badge="Editorial Desk"
          title="Contact Us & Report Fee Changes"
          subtitle="Spotted a newly announced marketplace rate change or want a custom calculator added? Send a note directly to our team."
        />

        <ContactForm />

        <AppCard style={{ marginTop: 24, backgroundColor: "var(--bg-section)" }}>
          <h2 style={{ marginTop: 0, paddingTop: 0, borderTop: "none", fontSize: "1.15rem" }}>
            Direct Editorial Contact
          </h2>
          <p style={{ marginBottom: 6 }}>
            <strong>Editorial &amp; Corrections:</strong> editorial@figuremint.com
          </p>
          <p style={{ marginBottom: 0, color: "var(--text-muted)", fontSize: "0.92rem" }}>
            Typical response window: 24–48 business hours (Monday–Friday).
          </p>
        </AppCard>
      </div>
    </section>
  );
}
