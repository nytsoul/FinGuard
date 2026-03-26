from fastapi import APIRouter

from finance_engine import build_full_pipeline

router = APIRouter(prefix="/api/forecast", tags=["Forecast"])

@router.get("/")
def get_forecast():
    pipeline = build_full_pipeline()
    return pipeline["forecast"]


@router.get("/state")
def get_financial_state():
    pipeline = build_full_pipeline()
    return {
        "status": "success",
        "data": pipeline["financial_state"],
    }
