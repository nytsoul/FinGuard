from __future__ import annotations

from dataclasses import dataclass
import hashlib
import hmac
import os
from typing import Dict

import requests


@dataclass
class RazorpayConfig:
    key_id: str
    key_secret: str


def get_razorpay_config() -> RazorpayConfig | None:
    key_id = os.environ.get("RAZORPAY_KEY_ID", "").strip()
    key_secret = os.environ.get("RAZORPAY_KEY_SECRET", "").strip()
    if not key_id or not key_secret:
        return None
    return RazorpayConfig(key_id=key_id, key_secret=key_secret)


def create_razorpay_order(
    amount_paise: int,
    currency: str,
    receipt: str,
    notes: Dict[str, str] | None = None,
) -> Dict[str, object]:
    cfg = get_razorpay_config()
    if cfg is None:
        raise ValueError("Razorpay credentials are not configured.")

    payload = {
        "amount": int(amount_paise),
        "currency": currency,
        "receipt": receipt,
        "payment_capture": 1,
        "notes": notes or {},
    }

    response = requests.post(
        "https://api.razorpay.com/v1/orders",
        auth=(cfg.key_id, cfg.key_secret),
        json=payload,
        timeout=20,
    )
    response.raise_for_status()
    return response.json()


def verify_payment_signature(order_id: str, payment_id: str, signature: str, secret: str) -> bool:
    message = f"{order_id}|{payment_id}".encode("utf-8")
    digest = hmac.new(secret.encode("utf-8"), message, hashlib.sha256).hexdigest()  # type: ignore[attr-defined]
    return hmac.compare_digest(digest, signature)
