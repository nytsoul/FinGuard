from fastapi import APIRouter, HTTPException
<<<<<<< HEAD
from database import get_supabase
=======

from finance_engine import build_full_pipeline
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23

router = APIRouter(prefix="/api/transactions", tags=["Transactions"])

@router.get("/")
def get_transactions():
<<<<<<< HEAD
    supabase = get_supabase()
    response = supabase.table("transactions").select("*").execute()
    return response.data

@router.get("/{transaction_id}")
def get_transaction(transaction_id: str):
    supabase = get_supabase()
    response = supabase.table("transactions").select("*").eq("id", transaction_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return response.data[0]
=======
    pipeline = build_full_pipeline()
    return {
        "status": "success",
        "data": pipeline["transactions"],
    }

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
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
