"""Ingest router — allows pushing transaction data via API without server restart.

Useful for PoC demo: POST a batch of synthetic/real transactions, pipeline cache
is invalidated, and the next GET to any endpoint re-runs the full pipeline with
the new data.
"""
from __future__ import annotations

from typing import List
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from finance_engine import invalidate_pipeline_cache

router = APIRouter(prefix="/api/ingest", tags=["Ingest"])

# In-memory store. Keyed by source (aa/gst/ocr/manual).
_INJECTED_SOURCES: dict[str, list] = {}


class TransactionRecord(BaseModel):
    id: str
    amount: float
    direction: str  # "credit" | "debit"
    narration: str = ""
    vendor: str
    date: str  # ISO format: YYYY-MM-DD
    reference: str = ""


class IngestRequest(BaseModel):
    source: str = "manual"  # aa | gst | ocr | manual
    transactions: List[TransactionRecord]
    replace: bool = False  # If True, replace existing records for this source


class IngestResponse(BaseModel):
    status: str
    source: str
    records_received: int
    total_injected: int
    cache_invalidated: bool


@router.post("/", response_model=IngestResponse)
def ingest_transactions(request: IngestRequest):
    """Push a batch of transaction records into the in-memory ingestion layer.
    
    The pipeline cache is invalidated so the next API call re-runs the full 
    pipeline (ingestion → dedup → match → XGBoost → AHP+TOPSIS → Monte Carlo)
    with the newly injected data included.
    """
    valid_sources = {"aa", "gst", "ocr", "manual", "simulated"}
    if request.source not in valid_sources:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid source '{request.source}'. Must be one of: {sorted(valid_sources)}"
        )

    records = [txn.model_dump() for txn in request.transactions]

    if request.replace:
        _INJECTED_SOURCES[request.source] = records
    else:
        existing = _INJECTED_SOURCES.get(request.source, [])
        _INJECTED_SOURCES[request.source] = existing + records

    invalidate_pipeline_cache()

    return IngestResponse(
        status="success",
        source=request.source,
        records_received=len(records),
        total_injected=sum(len(v) for v in _INJECTED_SOURCES.values()),
        cache_invalidated=True,
    )


@router.delete("/")
def clear_injected_data():
    """Clear all injected in-memory transactions and reset to default dataset."""
    _INJECTED_SOURCES.clear()
    invalidate_pipeline_cache()
    return {"status": "success", "message": "All injected data cleared. Pipeline will reload default dataset."}


@router.get("/status")
def ingest_status():
    """Return count of injected records per source."""
    return {
        "status": "success",
        "sources": {src: len(recs) for src, recs in _INJECTED_SOURCES.items()},
        "total": sum(len(v) for v in _INJECTED_SOURCES.values()),
    }


def get_injected_sources() -> dict[str, list]:
    """Called by finance_engine to merge injected records into the ingestion pipeline."""
    return dict(_INJECTED_SOURCES)
