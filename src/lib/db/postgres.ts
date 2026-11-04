import { Pool, type QueryResultRow } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __figureMintPgPool: Pool | undefined;
}

function getPool(): Pool | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;

  if (!global.__figureMintPgPool) {
    global.__figureMintPgPool = new Pool({
      connectionString,
      max: 8,
      idleTimeoutMillis: 20_000,
      connectionTimeoutMillis: 4_000,
      statement_timeout: 5_000,
      ssl: connectionString.includes("supabase") || process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : undefined,
    });
  }
  return global.__figureMintPgPool;
}

interface SafeQueryResult<T> {
  persisted: boolean;
  rows: T[];
}

export async function queryParameterized<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params: ReadonlyArray<string | number | boolean | null> = []
): Promise<SafeQueryResult<T>> {
  const pool = getPool();
  if (!pool) return { persisted: false, rows: [] };

  try {
    const result = await pool.query<T>(sql, [...params]);
    return { persisted: true, rows: result.rows };
  } catch {
    return { persisted: false, rows: [] };
  }
}
