import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CALCULATORS } from "@/data/calculators";
import { SEO_CATEGORY_HUBS, getCategoryHubByCategory } from "@/data/seoCategories";
import { TOOL_GUIDES } from "@/data/guides";
import { AppBadge } from "@/components/ui/AppBadge";
import { AppCard } from "@/components/ui/AppCard";
import { AdSlot } from "@/components/ads/AdSlot";
import { PlatformCalculator } from "@/components/calculator/PlatformCalculator";
import { ToolGuideArticle } from "@/components/seo/ToolGuideArticle";
import { FaqAccordion } from "@/components/seo/FaqAccordion";
import { ToolJsonLd } from "@/components/seo/ToolJsonLd";
import { CategoryHubView } from "@/components/seo/CategoryHubView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    ...CALCULATORS.map((c) => ({ slug: c.slug })),
    ...SEO_CATEGORY_HUBS.map((h) => ({ slug: h.slug })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const hub = SEO_CATEGORY_HUBS.find((h) => h.slug === slug);
  if (hub) {
    return {
      title: hub.title,
      description: hub.description,
      alternates: { canonical: `/${hub.slug}` },
      openGraph: {
        title: hub.title,
        description: hub.description,
        url: `/${hub.slug}`,
        type: "website",
        images: [
          {
            url: "/og-image.png",
            width: 1200,
            height: 630,
            alt: `${hub.title} — FigureMint`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: hub.title,
        description: hub.description,
        images: [
          {
            url: "/og-image.png",
            alt: `${hub.title} — FigureMint`,
          },
        ],
      },
    };
  }

  const calc = CALCULATORS.find((c) => c.slug === slug);
  if (!calc) return { title: "Calculator Not Found" };
  return {
    title: `${calc.title} (2026)`,
    description: calc.summary,
    keywords: calc.keywords,
    alternates: { canonical: `/${calc.slug}` },
    openGraph: {
      title: `${calc.title} — 2026 Fee & Profit Calculator`,
      description: calc.summary,
      url: `/${calc.slug}`,
      type: "article",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${calc.title} — FigureMint`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${calc.title} (2026)`,
      description: calc.summary,
      images: [
        {
          url: "/og-image.png",
          alt: `${calc.title} — FigureMint`,
        },
      ],
    },
  };
}

export default async function SeoSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const matchedHub = SEO_CATEGORY_HUBS.find((h) => h.slug === slug);
  if (matchedHub) {
    return <CategoryHubView hub={matchedHub} />;
  }

  const calc = CALCULATORS.find((c) => c.slug === slug);
  const guide = TOOL_GUIDES[slug];
  if (!calc || !guide) notFound();

  const parentHub = getCategoryHubByCategory(calc.category);
  const related = CALCULATORS.filter((c) => c.slug !== calc.slug).slice(0, 2);

  return (
    <section className="section">
      <ToolJsonLd
        slug={calc.slug}
        title={calc.title}
        shortTitle={calc.shortTitle}
        summary={calc.summary}
        categorySlug={parentHub.slug}
        categoryLabel={parentHub.navLabel}
        faqs={guide.faqs}
      />
      <div className="container">
        <nav aria-label="Breadcrumb" style={{ marginBottom: 14, fontSize: "0.9rem" }}>
          <Link href="/">Home</Link>{" "}
          <span style={{ color: "var(--text-muted)" }}>/</span>{" "}
          <Link href={`/${parentHub.slug}`}>{parentHub.navLabel}</Link>{" "}
          <span style={{ color: "var(--text-muted)" }}>/</span>{" "}
          <span style={{ color: "var(--text-muted)" }}>{calc.shortTitle}</span>
        </nav>

        <div className="content-with-rail">
          <div>
            <div style={{ marginBottom: 10 }}>
              <AppBadge tone="amber">{calc.badge}</AppBadge>
            </div>
            <h1>{calc.title}</h1>
            <p style={{ fontSize: "1.05rem" }}>{calc.summary}</p>

            <PlatformCalculator slug={calc.slug} title={calc.shortTitle} />
            <AdSlot id={`${calc.slug}-results-banner`} variant="leaderboard" />
            <ToolGuideArticle guide={guide} formulaNote={calc.formulaNote} />
            <AdSlot id={`${calc.slug}-in-article`} variant="in-article" />
            <FaqAccordion faqs={guide.faqs} shortTitle={calc.shortTitle} />

            <h2>Related Profit &amp; Fee Calculators</h2>
            <div className="tools-grid">
              {related.map((r) => (
                <Link key={r.slug} href={`/${r.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <AppCard hoverable>
                    <AppBadge tone="emerald">{r.shortTitle}</AppBadge>
                    <h3 style={{ marginTop: 10 }}>{r.title}</h3>
                    <p style={{ marginBottom: 0, fontSize: "0.92rem" }}>{r.summary}</p>
                  </AppCard>
                </Link>
              ))}
            </div>
          </div>

          <div className="desktop-rail">
            <AdSlot id={`${calc.slug}-sidebar`} variant="sidebar" />
            <AppCard padding="sm" style={{ marginTop: 20 }}>
              <div style={{ fontWeight: 700, color: "var(--text-heading)", marginBottom: 6 }}>2026 Accuracy Promise</div>
              <p style={{ fontSize: "0.86rem", marginBottom: 0 }}>
                Formulas verified against Nov 2026 merchant rate cards. Spotted a rate update?{" "}
                <Link href="/contact">Let our editors know</Link>.
              </p>
            </AppCard>
          </div>
        </div>
      </div>
    </section>
  );
}
