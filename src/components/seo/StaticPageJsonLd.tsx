import React from "react";

interface StaticPageJsonLdProps {
  pageType: "AboutPage" | "ContactPage" | "WebPage";
  title: string;
  description: string;
  path: string;
  breadcrumbLabel: string;
}

export function StaticPageJsonLd({
  pageType,
  title,
  description,
  path,
  breadcrumbLabel,
}: StaticPageJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://figuremint.vercel.app";
  const pageUrl = `${baseUrl}${path}`;

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": pageType,
        name: title,
        description,
        url: pageUrl,
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
          { "@type": "ListItem", position: 2, name: breadcrumbLabel, item: pageUrl },
        ],
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
