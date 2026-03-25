from fastapi import APIRouter, HTTPException
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
