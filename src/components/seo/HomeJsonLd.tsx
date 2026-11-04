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
        alternateName: "FigureMint Profit & Fee Calculators",
        url: `${baseUrl}/`,
      },
      {
        "@type": "Organization",
        name: "FigureMint",
        url: `${baseUrl}/`,
        logo: `${baseUrl}/icon.svg`,
        contactPoint: {
          "@type": "ContactPoint",
          email: "editorial@figuremint.com",
          contactType: "editorial support",
        },
      },
      {
        "@type": "ItemList",
        name: "2026 Online Seller, ROAS & Freelance Fee Calculators",
        itemListElement: CALCULATORS.map((calc, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: calc.title,
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
