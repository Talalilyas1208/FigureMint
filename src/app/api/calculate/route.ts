import { NextRequest, NextResponse } from "next/server";
import { getEngineBySlug } from "@/lib/calcEngine";
import { checkRateLimit, extractClientIp } from "@/lib/security/rateLimit";
import type { CalcValues } from "@/lib/calcEngine/types";

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

    const engine = getEngineBySlug(slug);
    if (!engine) {
      return NextResponse.json({ ok: false, error: `Calculator '${slug}' not found.` }, { status: 404 });
    }

    const safeValues: CalcValues = typeof values === "object" && values !== null ? values : {};
    const result = engine.compute(safeValues);

    return NextResponse.json({
      ok: true,
      slug,
      calculatedAt: new Date().toISOString(),
      engineVersion: "2026.2-dynamic",
      result,
    });
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

  const engine = getEngineBySlug(slug);
  if (!engine) {
    return NextResponse.json({ ok: false, error: `Calculator '${slug}' not found.` }, { status: 404 });
  }

  const values: CalcValues = {};
  searchParams.forEach((val, key) => {
    if (key !== "slug") {
      values[key] = isNaN(Number(val)) ? val : Number(val);
    }
  });

  const result = engine.compute(values);

  return NextResponse.json({
    ok: true,
    slug,
    calculatedAt: new Date().toISOString(),
    engineVersion: "2026.2-dynamic",
    result,
  });
}

