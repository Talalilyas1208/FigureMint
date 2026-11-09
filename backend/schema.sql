-- FigureMint Dynamic Supabase PostgreSQL Schema & Performance Indexes (2026)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Calculators Catalog
CREATE TABLE IF NOT EXISTS calculators_catalog (
  slug VARCHAR(64) PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  short_title VARCHAR(64) NOT NULL,
  category VARCHAR(32) NOT NULL CHECK (category IN ('ecommerce', 'ads-roas', 'payments', 'freelance')),
  badge VARCHAR(32) NOT NULL DEFAULT 'Updated 2026',
  summary VARCHAR(300) NOT NULL,
  default_price NUMERIC(10, 2) NOT NULL,
  default_cost NUMERIC(10, 2) NOT NULL,
  default_fee_pct NUMERIC(5, 2) NOT NULL,
  fixed_fee NUMERIC(6, 2) NOT NULL DEFAULT 0.30,
  formula_note VARCHAR(180) NOT NULL,
  keywords TEXT[] NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance Indexes for Calculators Catalog
CREATE INDEX IF NOT EXISTS idx_calculators_category ON calculators_catalog(category);
CREATE INDEX IF NOT EXISTS idx_calculators_updated_at ON calculators_catalog(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_calculators_keywords ON calculators_catalog USING GIN (keywords);

-- 2. Saved Scenarios
CREATE TABLE IF NOT EXISTS saved_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(64) NOT NULL,
  scenario_label VARCHAR(100) NOT NULL,
  gross_amount NUMERIC(10, 2) NOT NULL CHECK (gross_amount >= 0),
  cost_amount NUMERIC(10, 2) NOT NULL CHECK (cost_amount >= 0),
  fee_amount NUMERIC(10, 2) NOT NULL CHECK (fee_amount >= 0),
  net_profit NUMERIC(10, 2) NOT NULL,
  margin_pct NUMERIC(6, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance Indexes for Saved Scenarios
CREATE INDEX IF NOT EXISTS idx_saved_scenarios_slug ON saved_scenarios(slug);
CREATE INDEX IF NOT EXISTS idx_saved_scenarios_created_at ON saved_scenarios(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_saved_scenarios_slug_created ON saved_scenarios(slug, created_at DESC);

-- 3. Margin Audit Logs
CREATE TABLE IF NOT EXISTS margin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform VARCHAR(64) NOT NULL,
  sale_price NUMERIC(10, 2) NOT NULL CHECK (sale_price >= 0 AND sale_price <= 100000),
  product_cost NUMERIC(10, 2) NOT NULL CHECK (product_cost >= 0 AND product_cost <= 100000),
  fee_percent NUMERIC(5, 2) NOT NULL CHECK (fee_percent >= 0 AND fee_percent <= 95),
  net_profit NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance Indexes for Audit Logs
CREATE INDEX IF NOT EXISTS idx_margin_audit_platform ON margin_audit_logs(platform);
CREATE INDEX IF NOT EXISTS idx_margin_audit_created_at ON margin_audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_margin_audit_platform_created ON margin_audit_logs(platform, created_at DESC);

-- 4. Contact Reports
CREATE TABLE IF NOT EXISTS contact_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name VARCHAR(80) NOT NULL,
  sender_email VARCHAR(120) NOT NULL,
  topic VARCHAR(32) NOT NULL CHECK (topic IN ('fee-update', 'calculator-request', 'bug-report', 'partnership')),
  platform_name VARCHAR(80) NOT NULL DEFAULT '',
  message_body VARCHAR(1200) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance Indexes for Contact Reports
CREATE INDEX IF NOT EXISTS idx_contact_reports_topic ON contact_reports(topic);
CREATE INDEX IF NOT EXISTS idx_contact_reports_created_at ON contact_reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_reports_sender_email ON contact_reports(sender_email);

-- Row-Level Security Policies
ALTER TABLE calculators_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE margin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read calculators" ON calculators_catalog;
CREATE POLICY "Public read calculators" ON calculators_catalog FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert scenarios" ON saved_scenarios;
CREATE POLICY "Public insert scenarios" ON saved_scenarios FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public read recent scenarios" ON saved_scenarios;
CREATE POLICY "Public read recent scenarios" ON saved_scenarios FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert audits" ON margin_audit_logs;
CREATE POLICY "Public insert audits" ON margin_audit_logs FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert contact" ON contact_reports;
CREATE POLICY "Public insert contact" ON contact_reports FOR INSERT WITH CHECK (true);

-- Seed Initial Verified 2026 Rate Schedules
INSERT INTO calculators_catalog (slug, title, short_title, category, badge, summary, default_price, default_cost, default_fee_pct, fixed_fee, formula_note, keywords)
VALUES
  ('tiktok-shop-fee-calculator', 'TikTok Shop Fee & Net Profit Calculator', 'TikTok Shop Fee Calculator', 'ecommerce', 'Popular', 'Audit 2026 TikTok Shop referral fees, creator affiliate commissions, shipping subsidies & net profit per order.', 42, 12, 18, 0.30, 'Net = Sale Price − COGS − (Referral % + Affiliate %) − Shipping', ARRAY['tiktok shop fee calculator','tiktok profit','affiliate commission','referral fee','margin']),
  ('etsy-fee-profit-calculator', 'Etsy Fee & Offsite Ads Profit Calculator', 'Etsy Fee & Profit Calculator', 'ecommerce', 'Updated 2026', 'Calculate $0.20 listing, 6.5% transaction, payment processing & 12–15% Etsy Offsite Ads fees.', 36, 9, 14.5, 0.45, 'Net = Revenue − $0.20 Listing − 6.5% Tx − Processing − Offsite Ad Cut', ARRAY['etsy fee calculator','etsy profit calculator','offsite ads','listing fee']),
  ('break-even-roas-calculator', 'Break-Even ROAS & Ad Profit Margin Calculator', 'Break-Even ROAS Calculator', 'ads-roas', 'Popular', 'Find your exact minimum ROAS floor & max CPA across Meta, Google & TikTok ad campaigns.', 68, 22, 24, 0.30, 'Break-Even ROAS = 1 ÷ Gross Margin % before Ad Spend', ARRAY['break even roas calculator','target cpa','meta ads','google ads','tiktok ads']),
  ('stripe-vs-paypal-fee-calculator', 'Stripe vs. PayPal International Fee & Payout Calculator', 'Stripe vs. PayPal Fee Calculator', 'payments', 'Updated 2026', 'Compare 2.9% + $0.30 domestic vs. cross-border card & FX currency conversion fees side-by-side.', 120, 35, 4.4, 0.30, 'Net Payout = Invoice − (Base Rate % + Cross-Border % + FX Spread + Fixed Fee)', ARRAY['stripe vs paypal fee calculator','international payout','fx conversion','processing']),
  ('shopify-print-on-demand-calculator', 'Shopify Print-on-Demand Profit Margin Calculator', 'Shopify Print-on-Demand Calculator', 'ecommerce', 'Updated 2026', 'Model Printful & Printify base blanks, fulfillment shipping & Shopify Payments processing fees.', 34, 14.5, 8.9, 0.30, 'Net = Retail + Shipping Charged − POD Blank & Print − Shopify Fee', ARRAY['shopify print on demand calculator','pod margin','printful','printify']),
  ('upwork-freelance-fee-calculator', 'Upwork Fee & Freelance Net Hourly Rate Calculator', 'Upwork & Freelance Fee Calculator', 'freelance', 'Popular', 'Factor 10% Upwork service fees, self-employment tax reserves & true net hourly take-home pay.', 95, 10, 28, 0.00, 'True Hourly = (Gross Rate − Platform Cut − Tax Buffer) × Billable Ratio', ARRAY['upwork fee calculator','freelance hourly rate calculator','self employment tax','contractor'])
ON CONFLICT (slug) DO UPDATE SET updated_at = NOW();
