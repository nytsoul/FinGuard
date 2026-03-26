from fastapi import APIRouter, HTTPException

from finance_engine import build_full_pipeline

router = APIRouter(prefix="/api/transactions", tags=["Transactions"])

@router.get("/")
def get_transactions():
    pipeline = build_full_pipeline()
    return pipeline["transactions"]

@router.get("/{transaction_id}")
def get_transaction(transaction_id: str):
    pipeline = build_full_pipeline()
    rows = pipeline["transactions"]
    match = next((row for row in rows if str(row.get("id")) == transaction_id), None)
    if not match:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return match


@router.get("/reconcile/summary")
def get_reconciliation_summary():
    pipeline = build_full_pipeline()
    return {
        "status": "success",
        "ingestion_count": pipeline["ingestion_count"],
        "deduplicated_count": pipeline["deduplicated_count"],
        "duplicate_clusters": pipeline["duplicates"],
    }


@router.get("/reconcile/matches")
def get_reconciliation_matches():
    pipeline = build_full_pipeline()
    return {
        "status": "success",
        "data": pipeline["matching"],
    }
