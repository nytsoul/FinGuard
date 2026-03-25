from fastapi import APIRouter, HTTPException
from database import get_supabase

router = APIRouter(prefix="/api/transactions", tags=["Transactions"])

@router.get("/")
def get_transactions():
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
