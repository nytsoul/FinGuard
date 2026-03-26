from fastapi import APIRouter

<<<<<<< HEAD
=======
from finance_engine import build_full_pipeline

>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
router = APIRouter(prefix="/api/decisions", tags=["Decisions"])

@router.get("/ranking")
def get_topsis_ranking():
<<<<<<< HEAD
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
=======
    pipeline = build_full_pipeline()
    return {
        "status": "success",
        "weights": pipeline["weights"],
        "data": pipeline["rankings"],
    }


@router.get("/scenarios")
def get_scenarios():
    pipeline = build_full_pipeline()
    return {
        "status": "success",
        "data": pipeline["scenarios"],
        "recommended": pipeline["scenarios"][0] if pipeline["scenarios"] else None,
    }


@router.get("/explanations")
def get_explanations():
    pipeline = build_full_pipeline()
    explanations = [
        {
            "vendor": row["vendor"],
            "rank": row["rank"],
            "topsis_score": row["topsis_score"],
            "explanation": row["explanation"],
        }
        for row in pipeline["rankings"]
    ]
    return {
        "status": "success",
        "data": explanations,
    }


@router.get("/model")
def get_model_info():
    pipeline = build_full_pipeline()
    return {
        "status": "success",
        "data": pipeline["model"],
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
    }
