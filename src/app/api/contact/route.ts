import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, extractClientIp } from "@/lib/security/rateLimit";
import { ContactReportSchema } from "@/lib/security/sanitize";
import { insertContactRecord } from "@/lib/db/supabaseStore";

export async function POST(req: NextRequest) {
  const ip = extractClientIp(req.headers);
  const limit = checkRateLimit(`contact:${ip}`, 8, 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Rate limit reached. Please wait a minute before sending again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const parsed = ContactReportSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Validation failed.";
    return NextResponse.json({ error: firstIssue }, { status: 422 });
  }

  const result = await insertContactRecord(parsed.data);

  return NextResponse.json({
    ok: true,
    ticketRef: result.ticketRef,
    persistedToPostgres: result.persisted,
  });
}
