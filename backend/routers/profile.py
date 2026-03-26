from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from database import get_supabase

router = APIRouter(prefix="/api/profile", tags=["Profile"])


class ProfileUpdate(BaseModel):
    email: str | None = None
    full_name: str | None = None
    company_name: str | None = None
    industry: str | None = None
    role: str | None = None
    avatar_url: str | None = None
    phone: str | None = None
    bank_name: str | None = None
    bank_account_number: str | None = None
    account_holder_name: str | None = None
    pan: str | None = None
    aadhar: str | None = None


@router.get("/{user_id}")
def get_profile(user_id: str):
    try:
        supabase = get_supabase()
        response = supabase.table("users").select("*").eq("id", user_id).limit(1).execute()

        data = response.data or []
        if not data:
            raise HTTPException(status_code=404, detail="Profile not found")

        return data[0]
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to fetch profile: {exc}")


@router.put("/{user_id}")
def upsert_profile(user_id: str, payload: ProfileUpdate):
    try:
        supabase = get_supabase()

        update_data = {k: v for k, v in payload.model_dump().items() if v is not None}
        update_data["id"] = user_id
        update_data["updated_at"] = datetime.now(timezone.utc).isoformat()

        response = (
            supabase.table("users")
            .upsert(update_data)
            .select("*")
            .limit(1)
            .execute()
        )

        data = response.data or []
        if not data:
            raise HTTPException(status_code=500, detail="Profile update returned no data")

        return data[0]
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to update profile: {exc}")
