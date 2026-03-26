from fastapi import APIRouter, HTTPException
<<<<<<< HEAD
from database import get_supabase

router = APIRouter(prefix="/api/invoices", tags=["Invoices"])

@router.get("/")
def get_invoices():
    supabase = get_supabase()
    response = supabase.table("invoices").select("*").execute()
    return response.data

@router.get("/{invoice_id}")
def get_invoice(invoice_id: str):
    supabase = get_supabase()
    response = supabase.table("invoices").select("*").eq("id", invoice_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return response.data[0]
=======

from finance_engine import build_full_pipeline

router = APIRouter(prefix="/api/invoices", tags=["Invoices"])


@router.get("/")
def get_invoices():
    """Return all invoices derived from the pipeline matching layer."""
    pipeline = build_full_pipeline()
    return {
        "status": "success",
        "data": pipeline["matching"]["invoices"],
    }


@router.get("/{invoice_id}")
def get_invoice(invoice_id: str):
    """Return a single invoice by ID."""
    pipeline = build_full_pipeline()
    invoices = pipeline["matching"]["invoices"]
    match = next((inv for inv in invoices if str(inv.get("invoice_id")) == invoice_id), None)
    if not match:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return {
        "status": "success",
        "data": match,
    }


@router.get("/match/summary")
def get_invoice_match_summary():
    """Return matching summary: paid, unpaid, partial counts."""
    pipeline = build_full_pipeline()
    matches = pipeline["matching"]["matches"]
    summary = {"paid": 0, "unpaid": 0, "partial": 0}
    for m in matches:
        status = m.get("status", "unpaid")
        summary[status] = summary.get(status, 0) + 1
    return {
        "status": "success",
        "total_invoices": len(pipeline["matching"]["invoices"]),
        "matched": len(matches),
        "unmatched": len(pipeline["matching"]["unmatched_invoice_ids"]),
        "breakdown": summary,
    }
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
