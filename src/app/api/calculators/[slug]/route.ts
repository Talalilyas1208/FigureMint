import { NextRequest, NextResponse } from "next/server";
import { CALCULATORS } from "@/data/calculators";
import { getEngineBySlug } from "@/lib/calcEngine";
import { checkRateLimit, extractClientIp } from "@/lib/security/rateLimit";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const ip = extractClientIp(req.headers);
  const limit = checkRateLimit(`calc-info:${ip}`, 100, 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Rate limit exceeded." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
    );
  }

  const { slug } = await params;
  const calc = CALCULATORS.find((c) => c.slug === slug);
  const engine = getEngineBySlug(slug);

  if (!calc || !engine) {
    return NextResponse.json({ ok: false, error: `Calculator '${slug}' not found.` }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    calculator: calc,
    schema: engine.fields,
    version: "2026.2",
    apiEndpoint: `/api/calculate`,
  });
}

