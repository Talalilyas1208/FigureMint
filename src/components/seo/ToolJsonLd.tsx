import React from "react";
import type { FaqItem } from "@/data/guides/types";

interface ToolJsonLdProps {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  categorySlug: string;
  categoryLabel: string;
  faqs: FaqItem[];
}

export function ToolJsonLd({
  slug,
  title,
  shortTitle,
  summary,
  categorySlug,
  categoryLabel,
  faqs,
}: ToolJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://figuremint.vercel.app";
  const pageUrl = `${baseUrl}/${slug}`;

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["SoftwareApplication", "WebApplication"],
        name: title,
        alternateName: shortTitle,
        description: summary,
        url: pageUrl,
        applicationCategory: "FinanceApplication",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        publisher: {
          "@type": "Organization",
          name: "FigureMint",
          url: `${baseUrl}/`,
          logo: `${baseUrl}/icon.svg`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: categoryLabel,
            item: `${baseUrl}/${categorySlug}`,
          },
          { "@type": "ListItem", position: 3, name: shortTitle, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
    />
  );
}
