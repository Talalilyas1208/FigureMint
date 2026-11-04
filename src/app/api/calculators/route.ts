import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, extractClientIp } from "@/lib/security/rateLimit";
import { fetchDynamicCalculators } from "@/lib/db/supabaseStore";

export async function GET(req: NextRequest) {
  const ip = extractClientIp(req.headers);
  const limit = checkRateLimit(`catalog:${ip}`, 60, 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
    );
  }

  const expressBase = process.env.EXPRESS_API_URL;
  if (expressBase) {
    try {
      const upstream = await fetch(`${expressBase.replace(/\/$/, "")}/api/v1/calculators`, {
        cache: "no-store",
      });
      if (upstream.ok) {
        const json = await upstream.json();
        return NextResponse.json(json);
      }
    } catch {
      /* Fall back to direct Supabase / PostgreSQL repository */
    }
  }

  const catalog = await fetchDynamicCalculators();
  return NextResponse.json(catalog);
}

