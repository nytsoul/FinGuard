from fastapi import APIRouter

from finance_engine import build_full_pipeline

router = APIRouter(prefix="/api/decisions", tags=["Decisions"])

@router.get("/ranking")
def get_topsis_ranking():
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
    }
