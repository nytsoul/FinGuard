from fastapi import APIRouter
from pydantic import BaseModel

<<<<<<< HEAD
router = APIRouter(prefix="/api/actions", tags=["Actions"])

class DraftRequest(BaseModel):
    vendor_name: str
    amount: float
    context: str

@router.post("/generate_draft")
def generate_draft(request: DraftRequest):
    # Mock LLM generation
    return {
        "status": "success",
        "draft_subject": f"Regarding payment schedule for {request.vendor_name}",
        "draft_body": f"Dear {request.vendor_name} team,\n\nWe are reaching out regarding the upcoming invoice of ${request.amount:,.2f}. Given our long-standing relationship, we'd like to propose a 15-day extension to align with our current structural liquidity cycle.\n\nPlease let us know if this is acceptable.\n\nBest,\nTreasurer, Horizon Retail"
    }

class SendEmailRequest(BaseModel):
    recipient: str
    subject: str
    body: str

@router.post("/send_email")
def send_email(request: SendEmailRequest):
    """Send email via integrated email service (mock implementation)"""
    return {
        "status": "success",
        "message": f"Email sent to {request.recipient}",
        "subject": request.subject,
        "timestamp": "2026-03-26T10:30:00Z",
        "delivery_id": "email_1234567890"
    }

class SendWhatsAppRequest(BaseModel):
    phone_number: str
    message: str

@router.post("/send_whatsapp")
def send_whatsapp(request: SendWhatsAppRequest):
    """Send WhatsApp message via WhatsApp Business API (mock implementation)"""
    return {
        "status": "success",
        "message": f"WhatsApp message sent to {request.phone_number}",
        "timestamp": "2026-03-26T10:30:00Z",
        "message_id": "wa_9876543210"
    }

class SmartDraftTransactionRequest(BaseModel):
    transaction_type: str  # "expense", "income", "transfer"
    amount: float
    category: str
    context: str

@router.post("/ai_draft_transaction")
def ai_draft_transaction(request: SmartDraftTransactionRequest):
    """AI-powered smart drafting for transaction entry (mock LLM)"""
    type_label = request.transaction_type.capitalize()
    return {
        "status": "success",
        "vendor_suggestion": f"Smart {type_label} - {request.category}",
        "description": f"AI-detected: {request.category.title()} transaction for ${request.amount:,.2f}. {request.context}",
        "category_confidence": 0.92,
        "suggested_account": "HDFC Current",
        "ai_insights": f"This {request.transaction_type} aligns with your {request.category} spending pattern. Confidence: 92%"
=======
from llm_service import get_llm_service

router = APIRouter(prefix="/api/actions", tags=["Actions"])


class DraftRequest(BaseModel):
    vendor_name: str
    amount: float
    context: str = "Request 15-day extension"
    relationship_tenure_months: int = 12
    tone: str = "professional"


@router.post("/generate_draft")
def generate_draft(request: DraftRequest):
    """
    Generate a payment communication draft using LLM (Claude API).
    Falls back to a professional template if the API key is not configured.
    The LLM does zero financial reasoning — it only converts a structured
    decision into contextually appropriate language.
    """
    llm = get_llm_service()
    result = llm.generate_payment_message(
        vendor_name=request.vendor_name,
        amount=request.amount,
        decision=request.context,
        relationship_tenure_months=request.relationship_tenure_months,
        tone=request.tone,
    )
    return {
        "status": "success",
        **result,
    }


@router.get("/llm_status")
def get_llm_status():
    """Check whether the LLM (Claude) is configured and available."""
    llm = get_llm_service()
    return {
        "status": "success",
        "llm_available": llm.available,
        "model": llm.model if llm.available else None,
        "note": "LLM handles language only — all financial decisions are made by deterministic/ML pipeline.",
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
    }
