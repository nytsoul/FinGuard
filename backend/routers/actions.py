from fastapi import APIRouter
from pydantic import BaseModel

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
    }
