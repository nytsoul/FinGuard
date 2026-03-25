from fastapi import APIRouter
from pydantic import BaseModel

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
