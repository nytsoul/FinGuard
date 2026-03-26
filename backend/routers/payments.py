from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime, timezone

from payment_gateway import create_razorpay_order, get_razorpay_config, verify_payment_signature


class CreateOrderRequest(BaseModel):
    vendor: str
    amount: float
    currency: str = "INR"
    scenario: str = "priority_first"
    attempt_live: bool = True


class VerifySignatureRequest(BaseModel):
    order_id: str
    payment_id: str
    signature: str
    signature_secret: str | None = None

router = APIRouter(prefix="/api/payments", tags=["Payments"])

@router.post("/create_order")
def create_order(request: CreateOrderRequest):
    now = datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S")
    amount_paise = int(round(request.amount * 100))

    if request.attempt_live and get_razorpay_config() is not None:
        try:
            live_order = create_razorpay_order(
                amount_paise=amount_paise,
                currency=request.currency,
                receipt=f"cashmind-{now}",
                notes={"vendor": request.vendor, "scenario": request.scenario},
            )
            return {
                "status": "success",
                "mode": "live-sandbox-compatible",
                "provider": "razorpay",
                "order": live_order,
                "vendor": request.vendor,
                "amount": amount_paise,
                "currency": request.currency,
                "scenario": request.scenario,
                "message": "Razorpay order created successfully.",
            }
        except Exception as exc:
            # Keep demo flow alive even if external gateway call fails.
            fallback_reason = str(exc)
        else:
            fallback_reason = ""
    else:
        fallback_reason = "Credentials missing or live attempt disabled."

    return {
        "status": "success",
        "mode": "sandbox",
        "provider": "razorpay",
        "order_id": f"order_sandbox_{now}",
        "payment_id": f"pay_sandbox_{now}",
        "vendor": request.vendor,
        "amount": amount_paise,
        "currency": request.currency,
        "scenario": request.scenario,
        "message": "Sandbox payment simulated successfully.",
        "fallback_reason": fallback_reason,
    }


@router.post("/verify_signature")
def verify_signature(request: VerifySignatureRequest):
    cfg = get_razorpay_config()
    secret = request.signature_secret or (cfg.key_secret if cfg else "")
    if not secret:
        return {
            "status": "error",
            "verified": False,
            "message": "Signature secret is missing.",
        }

    verified = verify_payment_signature(
        order_id=request.order_id,
        payment_id=request.payment_id,
        signature=request.signature,
        secret=secret,
    )
    return {
        "status": "success",
        "verified": verified,
    }
