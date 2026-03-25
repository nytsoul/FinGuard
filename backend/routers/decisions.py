from fastapi import APIRouter

router = APIRouter(prefix="/api/decisions", tags=["Decisions"])

@router.get("/ranking")
def get_topsis_ranking():
    # Deterministic TOPSIS ranking for obligations
    return {
        "status": "success",
        "data": [
            {
                "id": "obl-1",
                "vendor": "Amazon Web Services",
                "amount": 12450.00,
                "due_date": "2023-10-12",
                "topsis_score": 0.94,
                "rank": 1,
                "recommendation": "Pay immediately to preserve Tier 1 discount"
            },
            {
                "id": "obl-2",
                "vendor": "Global Freight Inc.",
                "amount": 38920.50,
                "due_date": "2023-11-04",
                "topsis_score": 0.88,
                "rank": 2,
                "recommendation": "Strategic delay (Net 45)"
            },
            {
                "id": "obl-3",
                "vendor": "Slack Technologies",
                "amount": 4200.00,
                "due_date": "2023-10-28",
                "topsis_score": 0.72,
                "rank": 3,
                "recommendation": "Schedule auto-pay"
            }
        ]
    }
