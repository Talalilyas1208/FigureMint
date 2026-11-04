import os
import time
from collections import defaultdict
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from db import fetch_fee_schedules, insert_audit_log
from models import FeeScheduleItem, MarginAuditRequest, MarginAuditResponse

app = FastAPI(
    title="FigureMint Precision Fee Engine",
    version="1.1.0",
    docs_url="/docs" if os.getenv("ENV") != "production" else None,
    redoc_url=None,
)

ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

_hits: dict[str, list[float]] = defaultdict(list)


@app.middleware("http")
async def security_and_rate_limit(request: Request, call_next):
    client_ip = (request.client.host if request.client else "local")[:64]
    now = time.monotonic()
    recent = [t for t in _hits[client_ip] if now - t < 60.0]
    if len(recent) >= 30:
        raise HTTPException(status_code=429, detail="Rate limit exceeded.")
    recent.append(now)
    _hits[client_ip] = recent

    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains"
    return response


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "figuremint-fastapi"}


@app.get("/v1/fees", response_model=list[FeeScheduleItem])
async def list_fees() -> list[dict]:
    return await fetch_fee_schedules()


@app.post("/v1/audit", response_model=MarginAuditResponse)
async def calculate_margin_audit(payload: MarginAuditRequest) -> MarginAuditResponse:
    sale = float(payload.sale_price)
    cost = float(payload.product_cost)
    pct = float(payload.fee_percent)
    fixed = float(payload.fixed_fee)

    fee_amt = round((sale * pct / 100.0) + fixed, 2)
    net = round(sale - cost - fee_amt, 2)
    margin = round((net / sale) * 100.0, 2) if sale > 0 else 0.0
    be_roas = round(sale / (sale - cost), 2) if sale > cost else None
    health = max(0, min(100, int(round(margin * 2.8))))

    logged = await insert_audit_log(payload.platform, sale, cost, pct, net)
    return MarginAuditResponse(
        platform=payload.platform,
        fee_amount=fee_amt,
        net_profit=net,
        margin_percent=margin,
        break_even_roas=be_roas,
        health_score=health,
        logged_to_postgres=logged,
    )

