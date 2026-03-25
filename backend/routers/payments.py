from fastapi import APIRouter

router = APIRouter(prefix="/api/payments", tags=["Payments"])

@router.post("/create_order")
def create_order():
    # Return mock Razorpay order info
    return {
        "status": "success",
        "order_id": "order_sandbox_123456",
        "amount": 100000, # $1,000 in cents
        "currency": "USD"
    }
