import type { MetadataRoute } from "next";
import { CALCULATORS } from "@/data/calculators";
import { SEO_CATEGORY_HUBS } from "@/data/seoCategories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://figuremint.vercel.app";
  const now = new Date();

  // Core authority & trust pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Category index hubs
  const categoryPages: MetadataRoute.Sitemap = SEO_CATEGORY_HUBS.map((hub) => ({
    url: `${baseUrl}/${hub.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Individual calculator landing pages
  const calculatorPages: MetadataRoute.Sitemap = CALCULATORS.map((calc) => ({
    url: `${baseUrl}/${calc.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.95,
  }));

  return [...corePages, ...categoryPages, ...calculatorPages];
}
