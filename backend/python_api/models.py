from decimal import Decimal
import re
from pydantic import BaseModel, Field, field_validator

CONTROL_CHARS = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f<>]")


def clean_str(val: str) -> str:
    return CONTROL_CHARS.sub("", val).strip()


class MarginAuditRequest(BaseModel):
    platform: str = Field(..., min_length=2, max_length=64)
    sale_price: Decimal = Field(..., gt=Decimal("0.49"), le=Decimal("100000"))
    product_cost: Decimal = Field(..., ge=Decimal("0"), le=Decimal("100000"))
    fee_percent: Decimal = Field(..., ge=Decimal("0"), le=Decimal("95"))
    fixed_fee: Decimal = Field(default=Decimal("0.30"), ge=Decimal("0"), le=Decimal("500"))

    @field_validator("platform")
    @classmethod
    def sanitize_platform(cls, v: str) -> str:
        cleaned = clean_str(v)
        if len(cleaned) < 2:
            raise ValueError("Platform name too short after sanitization.")
        return cleaned


class MarginAuditResponse(BaseModel):
    platform: str
    fee_amount: float
    net_profit: float
    margin_percent: float
    break_even_roas: float | None
    health_score: int
    logged_to_postgres: bool


class FeeScheduleItem(BaseModel):
    slug: str
    platform_name: str
    base_fee_pct: float
    fixed_fee_usd: float

