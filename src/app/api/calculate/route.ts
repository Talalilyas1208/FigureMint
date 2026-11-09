import { NextRequest, NextResponse } from "next/server";
import { getEngineBySlug } from "@/lib/calcEngine";
import { checkRateLimit, extractClientIp } from "@/lib/security/rateLimit";
import type { CalcResult, CalcValues } from "@/lib/calcEngine/types";

// In-memory server-side calculation cache
interface CachedEntry {
  result: CalcResult;
  calculatedAt: string;
  cachedAt: number;
}
const calcMemoryCache = new Map<string, CachedEntry>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function buildCacheKey(slug: string, values: CalcValues): string {
  const sortedPairs = Object.entries(values)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join("|");
  return `${slug}__${sortedPairs}`;
}

export async function POST(req: NextRequest) {
  const ip = extractClientIp(req.headers);
  const limit = checkRateLimit(`calc:${ip}`, 120, 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Rate limit exceeded. Try again in a moment." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
    );
  }

  try {
    const body = await req.json();
    const { slug, values } = body as { slug?: string; values?: CalcValues };

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ ok: false, error: "Missing or invalid calculator slug." }, { status: 400 });
    }

    const safeValues: CalcValues = typeof values === "object" && values !== null ? values : {};
    const cacheKey = buildCacheKey(slug, safeValues);
    const cached = calcMemoryCache.get(cacheKey);

    if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
      return NextResponse.json(
        {
          ok: true,
          slug,
          calculatedAt: cached.calculatedAt,
          engineVersion: "2026.2-dynamic",
          result: cached.result,
        },
        {
          headers: {
            "X-Cache": "HIT",
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        }
      );
    }

    const engine = getEngineBySlug(slug);
    if (!engine) {
      return NextResponse.json({ ok: false, error: `Calculator '${slug}' not found.` }, { status: 404 });
    }

    const result = engine.compute(safeValues);
    const calculatedAt = new Date().toISOString();

    // Store in LRU/Map cache (trim if large)
    if (calcMemoryCache.size > 1000) {
      const oldest = calcMemoryCache.keys().next().value;
      if (oldest) calcMemoryCache.delete(oldest);
    }
    calcMemoryCache.set(cacheKey, { result, calculatedAt, cachedAt: Date.now() });

    return NextResponse.json(
      {
        ok: true,
        slug,
        calculatedAt,
        engineVersion: "2026.2-dynamic",
        result,
      },
      {
        headers: {
          "X-Cache": "MISS",
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed calculation payload." }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ ok: false, error: "Missing required ?slug= parameter." }, { status: 400 });
  }

  const values: CalcValues = {};
  searchParams.forEach((val, key) => {
    if (key !== "slug") {
      values[key] = isNaN(Number(val)) ? val : Number(val);
    }
  });

  const cacheKey = buildCacheKey(slug, values);
  const cached = calcMemoryCache.get(cacheKey);

  if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
    return NextResponse.json(
      {
        ok: true,
        slug,
        calculatedAt: cached.calculatedAt,
        engineVersion: "2026.2-dynamic",
        result: cached.result,
      },
      {
        headers: {
          "X-Cache": "HIT",
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  }

  const engine = getEngineBySlug(slug);
  if (!engine) {
    return NextResponse.json({ ok: false, error: `Calculator '${slug}' not found.` }, { status: 404 });
  }

  const result = engine.compute(values);
  const calculatedAt = new Date().toISOString();

  calcMemoryCache.set(cacheKey, { result, calculatedAt, cachedAt: Date.now() });

  return NextResponse.json(
    {
      ok: true,
      slug,
      calculatedAt,
      engineVersion: "2026.2-dynamic",
      result,
    },
    {
      headers: {
        "X-Cache": "MISS",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
