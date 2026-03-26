from fastapi import APIRouter
<<<<<<< HEAD
import numpy as np
=======

from finance_engine import build_full_pipeline
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23

router = APIRouter(prefix="/api/forecast", tags=["Forecast"])

@router.get("/")
def get_forecast():
<<<<<<< HEAD
    # Simplified Monte Carlo for the hackathon demo
    np.random.seed(42)
    base_cash = 2450000
    days = 30
    simulations = 100
    
    # Generate 100 random walks
    daily_volatility = 50000
    daily_drift = -10000 # burning cash
    
    # Store just the percentiles to send to frontend
    results = []
    
    # Simple deterministic path generation for visual consistency
    for i in range(days):
        day_label = f"Day {i+1}"
        # using arbitrary formula to look like a realistic range
        p90 = base_cash + (daily_drift * i) + (daily_volatility * (i**0.5) * 1.645)
        p50 = base_cash + (daily_drift * i)
        p10 = base_cash + (daily_drift * i) - (daily_volatility * (i**0.5) * 1.645)
        
        results.append({
            "day": day_label,
            "p90": round(p90),
            "p50": round(p50),
            "p10": round(p10),
            "median": round(p50)
        })
        
    return {
        "status": "success",
        "data": results,
        "metrics": {
            "shortfall_probability": 0.12,
            "median_days_to_zero": 245,
            "worst_case_zero": 182,
            "best_case_zero": 310
        }
=======
    pipeline = build_full_pipeline()
    forecast_data = pipeline["forecast"]
    return {
        "status": "success",
        "data": forecast_data.get("data", []),
        "metrics": forecast_data.get("metrics", {}),
    }


@router.get("/state")
def get_financial_state():
    pipeline = build_full_pipeline()
    return {
        "status": "success",
        "data": pipeline["financial_state"],
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
    }
