import { CALCULATORS, type CalculatorItem } from "../../../src/data/calculators.ts";
import { getSupabaseAdmin, runSql } from "../config/db.ts";

const genRef = () => `FM-${Date.now().toString(36).slice(-6).toUpperCase()}`;

interface CatalogRow {
  slug: string;
  title: string;
  short_title: string;
  category: CalculatorItem["category"];
  badge: CalculatorItem["badge"];
  summary: string;
  default_price: number | string;
  default_cost: number | string;
  default_fee_pct: number | string;
  fixed_fee: number | string;
  formula_note: string;
  keywords: string[];
}

function mapCatalogRow(r: CatalogRow): CalculatorItem {
  return {
    slug: r.slug,
    title: r.title,
    shortTitle: r.short_title,
    category: r.category,
    badge: r.badge === "Popular" ? "Popular" : "Updated 2026",
    summary: r.summary,
    defaultPrice: Number(r.default_price),
    defaultCost: Number(r.default_cost),
    defaultFeePct: Number(r.default_fee_pct),
    fixedFee: Number(r.fixed_fee),
    formulaNote: r.formula_note,
    keywords: Array.isArray(r.keywords) ? r.keywords : [],
  };
}

export async function getCatalogService(): Promise<{ items: CalculatorItem[]; source: string }> {
  const sb = getSupabaseAdmin();
  if (sb) {
    const { data, error } = await sb.from("calculators_catalog").select("*").order("slug");
    if (!error && data && data.length > 0) {
      return { items: (data as CatalogRow[]).map(mapCatalogRow), source: "express-supabase" };
    }
  }

  const sql = await runSql<CatalogRow>("SELECT * FROM calculators_catalog ORDER BY slug");
  if (sql.persisted && sql.rows.length > 0) {
    return { items: sql.rows.map(mapCatalogRow), source: "express-postgres" };
  }

  return { items: CALCULATORS, source: "express-seed" };
}

export async function saveScenarioService(input: {
  slug: string;
  scenarioLabel: string;
  grossAmount: number;
  costAmount: number;
  feeAmount: number;
  netProfit: number;
  marginPct: number;
}): Promise<{ id: string; persisted: boolean }> {
  const sb = getSupabaseAdmin();
  if (sb) {
    const { data, error } = await sb
      .from("saved_scenarios")
      .insert({
        slug: input.slug,
        scenario_label: input.scenarioLabel,
        gross_amount: input.grossAmount,
        cost_amount: input.costAmount,
        fee_amount: input.feeAmount,
        net_profit: input.netProfit,
        margin_pct: input.marginPct,
      })
      .select("id")
      .single();
    if (!error && data?.id) return { id: String(data.id).slice(0, 8).toUpperCase(), persisted: true };
  }

  const pg = await runSql<{ id: string }>(
    `INSERT INTO saved_scenarios (slug, scenario_label, gross_amount, cost_amount, fee_amount, net_profit, margin_pct)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
    [input.slug, input.scenarioLabel, input.grossAmount, input.costAmount, input.feeAmount, input.netProfit, input.marginPct]
  );
  return {
    id: pg.rows[0]?.id ? pg.rows[0].id.slice(0, 8).toUpperCase() : genRef(),
    persisted: pg.persisted,
  };
}

export async function saveContactService(input: {
  name: string;
  email: string;
  topic: string;
  platformName: string;
  message: string;
}): Promise<{ ticketRef: string; persisted: boolean }> {
  const sb = getSupabaseAdmin();
  if (sb) {
    const { data, error } = await sb
      .from("contact_reports")
      .insert({ sender_name: input.name, sender_email: input.email, topic: input.topic, platform_name: input.platformName, message_body: input.message })
      .select("id")
      .single();
    if (!error && data?.id) return { ticketRef: String(data.id).slice(0, 8).toUpperCase(), persisted: true };
  }
  const pg = await runSql<{ id: string }>(
    `INSERT INTO contact_reports (sender_name, sender_email, topic, platform_name, message_body) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    [input.name, input.email, input.topic, input.platformName, input.message]
  );
  return {
    ticketRef: pg.rows[0]?.id ? pg.rows[0].id.slice(0, 8).toUpperCase() : genRef(),
    persisted: pg.persisted,
  };
}
