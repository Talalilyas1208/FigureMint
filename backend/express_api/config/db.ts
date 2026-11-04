import { Pool, type QueryResultRow } from "pg";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let pgPool: Pool | null = null;
let supabaseClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!supabaseClient) {
    supabaseClient = createClient(url, key, { auth: { persistSession: false } });
  }
  return supabaseClient;
}

export async function runSql<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params: ReadonlyArray<string | number | boolean | null> = []
): Promise<{ persisted: boolean; rows: T[] }> {
  const conn = process.env.DATABASE_URL;
  if (!conn) return { persisted: false, rows: [] };

  if (!pgPool) {
    pgPool = new Pool({
      connectionString: conn,
      max: 8,
      idleTimeoutMillis: 20_000,
      connectionTimeoutMillis: 4_000,
      statement_timeout: 5_000,
      ssl: conn.includes("supabase") || process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : undefined,
    });
  }

  try {
    const res = await pgPool.query<T>(sql, [...params]);
    return { persisted: true, rows: res.rows };
  } catch {
    return { persisted: false, rows: [] };
  }
}

export async function closeExpressPool(): Promise<void> {
  if (pgPool) {
    await pgPool.end();
    pgPool = null;
  }
}

