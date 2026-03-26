from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from database import get_supabase

router = APIRouter(prefix="/api/preferences", tags=["Preferences"])


class NotificationPreferences(BaseModel):
    email_notifications: bool = True
    sms_notifications: bool = True
    push_notifications: bool = True
    email_frequency: str = "daily"  # immediate, daily, weekly
    invoice_alerts: bool = True
    payment_reminders: bool = True
    cash_flow_alerts: bool = True
    vendor_alerts: bool = True


class DisplayPreferences(BaseModel):
    theme: str = "auto"  # light, dark, auto
    language: str = "English"
    date_format: str = "MM/DD/YYYY"
    currency_format: str = "USD"
    items_per_page: int = 10


class FinancialPreferences(BaseModel):
    default_payment_term: int = 30
    budget_warning_threshold: int = 80
    auto_payment_enabled: bool = False
    auto_payment_threshold: float = 100000
    reconciliation_method: str = "manual"  # manual, semi-auto, auto
    tax_calculation: str = "NONE"  # NONE, GST, VAT


class PreferencesData(BaseModel):
    user_id: str
    notifications: NotificationPreferences
    display: DisplayPreferences
    financial: FinancialPreferences


class PreferencesPatch(BaseModel):
    notifications: NotificationPreferences | None = None
    display: DisplayPreferences | None = None
    financial: FinancialPreferences | None = None


def _default_preferences(user_id: str) -> dict:
    return {
        "user_id": user_id,
        "notifications": NotificationPreferences().model_dump(),
        "display": DisplayPreferences().model_dump(),
        "financial": FinancialPreferences().model_dump(),
    }


@router.get("/user/{user_id}")
async def get_user_preferences(user_id: str):
    """Get all preferences for a user. Returns defaults if none exist yet."""
    try:
        supabase = get_supabase()
        response = (
            supabase.table("user_preferences")
            .select("*")
            .eq("user_id", user_id)
            .limit(1)
            .execute()
        )

        data = response.data or []
        if not data:
            return _default_preferences(user_id)

        return data[0]
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to fetch preferences: {exc}")


@router.post("/user/{user_id}")
async def save_user_preferences(user_id: str, preferences: PreferencesData):
    """Create or replace all user preferences."""
    try:
        supabase = get_supabase()
        payload = {
            "user_id": user_id,
            "notifications": preferences.notifications.model_dump(),
            "display": preferences.display.model_dump(),
            "financial": preferences.financial.model_dump(),
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }

        response = (
            supabase.table("user_preferences")
            .upsert(payload)
            .select("*")
            .limit(1)
            .execute()
        )

        data = response.data or []
        if not data:
            return {"status": "success", "user_id": user_id}

        return data[0]
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to save preferences: {exc}")


@router.patch("/user/{user_id}")
async def patch_user_preferences(user_id: str, patch: PreferencesPatch):
    """Patch only selected preference groups."""
    try:
        supabase = get_supabase()

        existing = (
            supabase.table("user_preferences")
            .select("*")
            .eq("user_id", user_id)
            .limit(1)
            .execute()
        )

        existing_data = existing.data or []
        if not existing_data:
            # If record does not exist, start from defaults and apply patch.
            current = _default_preferences(user_id)
        else:
            current = existing_data[0]

        if patch.notifications is not None:
            current["notifications"] = patch.notifications.model_dump()
        if patch.display is not None:
            current["display"] = patch.display.model_dump()
        if patch.financial is not None:
            current["financial"] = patch.financial.model_dump()

        current["updated_at"] = datetime.now(timezone.utc).isoformat()

        response = (
            supabase.table("user_preferences")
            .upsert(current)
            .select("*")
            .limit(1)
            .execute()
        )

        data = response.data or []
        if not data:
            return {"status": "success", "user_id": user_id}

        return data[0]
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to patch preferences: {exc}")


@router.delete("/user/{user_id}")
async def reset_preferences(user_id: str):
    """Reset all preferences for a user to defaults."""
    try:
        supabase = get_supabase()
        payload = _default_preferences(user_id)
        payload["updated_at"] = datetime.now(timezone.utc).isoformat()

        supabase.table("user_preferences").upsert(payload).execute()
        return {"status": "success", "message": "Preferences reset to defaults"}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to reset preferences: {exc}")
