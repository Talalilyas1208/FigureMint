import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, extractClientIp } from "@/lib/security/rateLimit";
import { SavedScenarioSchema } from "@/lib/security/sanitize";
import { saveScenarioRecord } from "@/lib/db/supabaseStore";

export async function POST(req: NextRequest) {
  const ip = extractClientIp(req.headers);
  const limit = checkRateLimit(`scenario:${ip}`, 20, 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many saved scenarios. Please wait a moment." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = SavedScenarioSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid scenario fields." },
      { status: 422 }
    );
  }

  const expressBase = process.env.EXPRESS_API_URL;
  if (expressBase) {
    try {
      const upstream = await fetch(`${expressBase.replace(/\/$/, "")}/api/v1/scenarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (upstream.ok) {
        return NextResponse.json(await upstream.json());
      }
    } catch {
      /* Fall back to direct Supabase / PostgreSQL repository */
    }
  }

  const saved = await saveScenarioRecord(parsed.data);
  return NextResponse.json({ ok: true, id: saved.id, persisted: saved.persisted });
}

