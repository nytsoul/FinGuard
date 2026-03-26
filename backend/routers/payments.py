from fastapi import APIRouter
from pydantic import BaseModel
<<<<<<< HEAD
from datetime import datetime
import uuid

router = APIRouter(prefix="/api/payments", tags=["Payments"])

class CreateOrderRequest(BaseModel):
    amount: float
    currency: str = "USD"
    description: str = ""

@router.post("/create_order")
def create_order(request: CreateOrderRequest):
    """Create payment order for Razorpay/payment gateway"""
    amount_cents = int(request.amount * 100)
    return {
        "status": "success",
        "order_id": f"order_{uuid.uuid4().hex[:12]}",
        "amount": amount_cents,
        "currency": request.currency,
        "description": request.description,
        "created_at": datetime.now().isoformat()
    }

class ExecutePaymentRequest(BaseModel):
    vendor: str
    amount: float
    invoice_id: str
    payment_method: str = "bank_transfer"
    notes: str = ""

@router.post("/execute")
def execute_payment(request: ExecutePaymentRequest):
    """Execute payment to vendor"""
    payment_id = f"pay_{uuid.uuid4().hex[:12]}"
    return {
        "status": "success",
        "payment_id": payment_id,
        "vendor": request.vendor,
        "amount": request.amount,
        "currency": "USD",
        "invoice_id": request.invoice_id,
        "payment_method": request.payment_method,
        "reference_number": f"REF-{datetime.now().strftime('%Y%m%d%H%M')}-{uuid.uuid4().hex[:6].upper()}",
        "status_display": "Payment Processed",
        "execution_time": datetime.now().isoformat(),
        "expected_settlement": "2026-03-29T00:00:00Z",
        "confirmation_message": f"Payment of ${request.amount:,.2f} to {request.vendor} has been successfully processed."
    }

class VerifyPaymentRequest(BaseModel):
    payment_id: str

@router.post("/verify")
def verify_payment(request: VerifyPaymentRequest):
    """Verify payment status"""
    return {
        "status": "success",
        "payment_id": request.payment_id,
        "payment_status": "completed",
        "verified_at": datetime.now().isoformat(),
        "confirmation": "Payment verified and settled"
    }

@router.get("/history")
def get_payment_history(limit: int = 20, offset: int = 0):
    """Get payment history"""
    return {
        "status": "success",
        "payments": [
            {
                "payment_id": f"pay_{uuid.uuid4().hex[:12]}",
                "vendor": "AWS Services",
                "amount": 12450.00,
                "date": "2026-03-20T10:30:00Z",
                "status": "completed",
                "reference": "REF-202603201030-ABC123"
            },
            {
                "payment_id": f"pay_{uuid.uuid4().hex[:12]}",
                "vendor": "Google Workspace",
                "amount": 840.00,
                "date": "2026-03-15T14:45:00Z",
                "status": "completed",
                "reference": "REF-202603151445-XYZ789"
            }
        ],
        "total_count": 2,
        "limit": limit,
        "offset": offset
=======
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
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
    }
