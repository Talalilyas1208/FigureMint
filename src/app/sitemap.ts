import type { MetadataRoute } from "next";
import { CALCULATORS } from "@/data/calculators";
import { SEO_CATEGORY_HUBS } from "@/data/seoCategories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://figuremint.vercel.app";
  const lastModified = new Date("2026-11-03");

  const corePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/disclaimer`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];

  const categoryPages: MetadataRoute.Sitemap = SEO_CATEGORY_HUBS.map((hub) => ({
    url: `${baseUrl}/${hub.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const calculatorPages: MetadataRoute.Sitemap = CALCULATORS.map((calc) => ({
    url: `${baseUrl}/${calc.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.95,
  }));

  return [...corePages, ...categoryPages, ...calculatorPages];
}
