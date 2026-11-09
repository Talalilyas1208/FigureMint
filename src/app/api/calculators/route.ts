import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, extractClientIp } from "@/lib/security/rateLimit";
import { fetchDynamicCalculators } from "@/lib/db/supabaseStore";

// Server-side in-memory cache for catalog
let cachedCatalogData: object | null = null;
let lastCatalogFetchTime = 0;
const CATALOG_CACHE_TTL = 30 * 60 * 1000; // 30 minutes

export async function GET(req: NextRequest) {
  const ip = extractClientIp(req.headers);
  const limit = checkRateLimit(`catalog:${ip}`, 60, 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
    );
  }

  // Return from in-memory cache if fresh
  if (cachedCatalogData && Date.now() - lastCatalogFetchTime < CATALOG_CACHE_TTL) {
    return NextResponse.json(cachedCatalogData, {
      headers: {
        "X-Cache": "HIT",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  }

  const expressBase = process.env.EXPRESS_API_URL;
  if (expressBase) {
    try {
      const upstream = await fetch(`${expressBase.replace(/\/$/, "")}/api/v1/calculators`, {
        cache: "no-store",
      });
      if (upstream.ok) {
        const json = await upstream.json();
        cachedCatalogData = json;
        lastCatalogFetchTime = Date.now();
        return NextResponse.json(json, {
          headers: {
            "X-Cache": "MISS",
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        });
      }
    } catch {
      /* Fall back to direct Supabase / PostgreSQL repository */
    }
  }

  const catalog = await fetchDynamicCalculators();
  cachedCatalogData = catalog;
  lastCatalogFetchTime = Date.now();

  return NextResponse.json(catalog, {
    headers: {
      "X-Cache": "MISS",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
