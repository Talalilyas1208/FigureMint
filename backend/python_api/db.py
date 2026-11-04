import os
from typing import Any
import asyncpg

_pool: asyncpg.Pool | None = None

FALLBACK_FEES = [
    {"slug": "tiktok-shop-fee-calculator", "platform_name": "TikTok Shop US", "base_fee_pct": 18.0, "fixed_fee_usd": 0.30},
    {"slug": "etsy-fee-profit-calculator", "platform_name": "Etsy Marketplace", "base_fee_pct": 14.5, "fixed_fee_usd": 0.45},
    {"slug": "stripe-vs-paypal-fee-calculator", "platform_name": "Stripe / PayPal", "base_fee_pct": 4.4, "fixed_fee_usd": 0.30},
    {"slug": "shopify-print-on-demand-calculator", "platform_name": "Shopify + POD", "base_fee_pct": 8.9, "fixed_fee_usd": 0.30},
    {"slug": "upwork-freelance-fee-calculator", "platform_name": "Upwork Freelance", "base_fee_pct": 28.0, "fixed_fee_usd": 0.00},
]


async def get_db_pool() -> asyncpg.Pool | None:
    global _pool
    dsn = os.getenv("DATABASE_URL")
    if not dsn:
        return None
    if _pool is None:
        try:
            _pool = await asyncpg.create_pool(
                dsn=dsn, min_size=1, max_size=6, command_timeout=5.0
            )
        except Exception:
            return None
    return _pool


async def fetch_fee_schedules() -> list[dict[str, Any]]:
    pool = await get_db_pool()
    if not pool:
        return FALLBACK_FEES
    try:
        async with pool.acquire() as conn:
            rows = await conn.fetch(
                "SELECT slug, platform_name, base_fee_pct, fixed_fee_usd FROM platform_fee_schedules ORDER BY slug"
            )
            return [dict(r) for r in rows] if rows else FALLBACK_FEES
    except Exception:
        return FALLBACK_FEES


async def insert_audit_log(
    platform: str, sale_price: float, product_cost: float, fee_pct: float, net_profit: float
) -> bool:
    pool = await get_db_pool()
    if not pool:
        return False
    try:
        async with pool.acquire() as conn:
            await conn.execute(
                """INSERT INTO margin_audit_logs
                   (platform, sale_price, product_cost, fee_percent, net_profit)
                   VALUES ($1, $2, $3, $4, $5)""",
                platform,
                sale_price,
                product_cost,
                fee_pct,
                net_profit,
            )
            return True
    except Exception:
        return False

