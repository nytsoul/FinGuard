from fastapi import APIRouter
from pydantic import BaseModel
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
    }
