import React from "react";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";
import { CALCULATORS } from "@/data/calculators";
import { SEO_CATEGORY_HUBS, type SeoCategoryHub } from "@/data/seoCategories";
import { AppBadge } from "@/components/ui/AppBadge";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AdSlot } from "@/components/ads/AdSlot";

export function CategoryHubView({ hub }: { hub: SeoCategoryHub }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://figuremint.com";
  const matchingTools =
    hub.category === "all"
      ? CALCULATORS
      : CALCULATORS.filter((c) => c.category === hub.category);

  const hubJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: hub.title,
        description: hub.description,
        url: `${baseUrl}/${hub.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
          { "@type": "ListItem", position: 2, name: hub.navLabel, item: `${baseUrl}/${hub.slug}` },
        ],
      },
      {
        "@type": "ItemList",
        itemListElement: matchingTools.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t.title,
          url: `${baseUrl}/${t.slug}`,
        })),
      },
    ],
  };

  return (
    <section className="section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hubJsonLd) }} />
      <div className="container">
        <nav aria-label="Breadcrumb" style={{ marginBottom: 14, fontSize: "0.9rem" }}>
          <Link href="/">Home</Link>{" "}
          <span style={{ color: "var(--text-muted)" }}>/</span>{" "}
          <span style={{ color: "var(--text-muted)" }}>{hub.navLabel}</span>
        </nav>

        <div className="content-with-rail">
          <div>
            <AppBadge tone="emerald">2026 Verified Calculators</AppBadge>
            <h1 style={{ marginTop: 10 }}>{hub.h1}</h1>
            <p style={{ fontSize: "1.05rem", maxWidth: 680 }}>{hub.intro}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {SEO_CATEGORY_HUBS.map((item) => (
                <AppButton
                  key={item.slug}
                  href={`/${item.slug}`}
                  variant={item.slug === hub.slug ? "primary" : "secondary"}
                  style={{ minHeight: 42, padding: "6px 14px", fontSize: "0.88rem" }}
                >
                  {item.navLabel}
                </AppButton>
              ))}
            </div>

            <div className="tools-grid">
              {matchingTools.map((tool) => (
                <AppCard key={tool.slug} hoverable style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 14 }}>
                  <div>
                    <AppBadge tone="amber">{tool.badge}</AppBadge>
                    <h2 style={{ fontSize: "1.22rem", marginTop: 10, marginBottom: 6 }}>{tool.title}</h2>
                    <p style={{ fontSize: "0.94rem", marginBottom: 10 }}>{tool.summary}</p>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      {tool.formulaNote}
                    </div>
                  </div>
                  <AppButton href={`/${tool.slug}`} variant="primary" rightIcon={<ArrowRightOutlined />}>
                    Open {tool.shortTitle}
                  </AppButton>
                </AppCard>
              ))}
            </div>

            <AdSlot id={`${hub.slug}-banner`} variant="leaderboard" />
          </div>

          <div className="desktop-rail">
            <AdSlot id={`${hub.slug}-sidebar`} variant="sidebar" />
          </div>
        </div>
      </div>
    </section>
  );
}

