import React from "react";
import { CALCULATORS } from "@/data/calculators";

export function HomeJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://figuremint.vercel.app";

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "FigureMint",
        alternateName: "FigureMint Net Profit & Fee Calculators",
        url: `${baseUrl}/`,
        description: "Free 2026 fee, ROAS, and net profit calculators for online sellers, creators, and freelancers.",
        publisher: {
          "@type": "Organization",
          name: "FigureMint",
          url: `${baseUrl}/`,
          logo: `${baseUrl}/icon.svg`,
        },
      },
      {
        "@type": "Organization",
        name: "FigureMint",
        url: `${baseUrl}/`,
        logo: `${baseUrl}/icon.svg`,
        sameAs: [
          "https://figuremint.vercel.app",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: "editorial@figuremint.com",
          contactType: "editorial support",
        },
      },
      {
        "@type": "ItemList",
        name: "2026 Online Seller, ROAS & Freelance Fee Calculators",
        description: "Complete catalog of verified 2026 unit economics and fee calculators.",
        itemListElement: CALCULATORS.map((calc, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: calc.title,
          description: calc.summary,
          url: `${baseUrl}/${calc.slug}`,
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
