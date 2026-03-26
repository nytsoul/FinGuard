from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
<<<<<<< HEAD
from routers import transactions, invoices, forecast, decisions, actions, payments, reports, imports, strategies, preferences, profile

app = FastAPI(title="CashMind Open API", version="1.0.0")
=======
from routers import transactions, invoices, forecast, decisions, actions, payments, ingest
import time

from finance_engine import _ensure_delay_model, _has_any_external_file, _PIPELINE_CACHE, _PIPELINE_CACHE_TS

app = FastAPI(
    title="CashMind Open API",
    version="2.0.0",
    description=(
        "FinGuard/CashMind backend: multi-source ingestion → deduplication → "
        "transaction-invoice matching → XGBoost payment delay prediction → "
        "AHP+TOPSIS obligation ranking → Monte Carlo 30-day forecast → LLM action drafts."
    ),
)
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(transactions.router)
app.include_router(invoices.router)
app.include_router(forecast.router)
app.include_router(decisions.router)
app.include_router(actions.router)
app.include_router(payments.router)
<<<<<<< HEAD
app.include_router(reports.router)
app.include_router(imports.router)
app.include_router(strategies.router)
app.include_router(preferences.router)
app.include_router(profile.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to CashMind API"}
=======
app.include_router(ingest.router)


@app.get("/")
def read_root():
    return {"message": "Welcome to CashMind API v2.0", "docs": "/docs"}


@app.get("/api/health")
def health_check():
    """
    System health and model status endpoint.
    Returns model type, SHAP availability, data source, pipeline cache age.
    """
    model_state = _ensure_delay_model()
    cache_age = round(time.time() - _PIPELINE_CACHE_TS, 1) if _PIPELINE_CACHE else None
    pipeline_time = _PIPELINE_CACHE.get("pipeline_time_seconds") if _PIPELINE_CACHE else None

    return {
        "status": "ok",
        "version": "2.0.0",
        "model": {
            "type": model_state.get("model_type", "not_trained"),
            "available": model_state.get("available", False),
            "shap_available": model_state.get("shap_available", False),
            "training_data_source": model_state.get("training_data_source", "none"),
        },
        "pipeline": {
            "cached": bool(_PIPELINE_CACHE),
            "cache_age_seconds": cache_age,
            "last_run_time_seconds": pipeline_time,
        },
        "data": {
            "has_external_datasets": _has_any_external_file(),
            "source": "external" if _has_any_external_file() else "demo",
        },
        "architecture": {
            "layers": [
                "1. Multi-source ingestion (AA + GST + OCR)",
                "2. Fuzzy deduplication (rapidfuzz)",
                "3. Transaction-invoice matching (rule cascade)",
                "4. Financial state modeling (deterministic)",
                "5. XGBoost payment delay prediction (ML)",
                "6. AHP weight calculation (eigenvector method)",
                "7. TOPSIS obligation ranking (MCDM)",
                "8. Scenario simulation (5 strategies)",
                "9. Monte Carlo 30-day forecast (10,000 paths)",
                "10. LLM action generation (language only, Claude API)",
            ]
        },
    }
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
