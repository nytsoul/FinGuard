from __future__ import annotations

import csv
import os
from pathlib import Path
from typing import Dict, List

import requests

DATASET_API = "https://huggingface.co/api/datasets/shashankshingare/Indian-Bank-Statements"
RESOLVE_BASE = "https://huggingface.co/datasets/shashankshingare/Indian-Bank-Statements/resolve/main/"
OUT_PATH = Path(__file__).resolve().parent / "data" / "indian_bank_statements.csv"


def _extract_vendor(description: str, bank_name: str) -> str:
    text = (description or "").strip()
    if not text:
        return bank_name or "Unknown Vendor"
    # Heuristic: most descriptions are tokenized by '-' or '/'.
    for sep in ("-", "/"):
        parts = [p.strip() for p in text.split(sep) if p.strip()]
        if len(parts) >= 2:
            candidate = parts[-1]
            if len(candidate) >= 3:
                return candidate.title()
    return (text[:48] or bank_name or "Unknown Vendor").title()


def _to_float(value: object) -> float:
    if value in (None, ""):
        return 0.0
    try:
        return float(value)
    except Exception:
        return 0.0


def _choose_json_files(siblings: List[Dict[str, object]]) -> List[str]:
    files = [
        str(item.get("rfilename", ""))
        for item in siblings
        if str(item.get("rfilename", "")).endswith(".json")
        and str(item.get("rfilename", "")).startswith("train/")
    ]
    files.sort()
    return files


def build_csv(max_json_files: int = 60) -> int:
    meta = requests.get(DATASET_API, timeout=60)
    meta.raise_for_status()
    payload = meta.json()

    json_files = _choose_json_files(payload.get("siblings", []))[:max_json_files]
    rows: List[Dict[str, object]] = []
    counter = 1

    for rel_path in json_files:
        url = RESOLVE_BASE + rel_path
        res = requests.get(url, timeout=60)
        res.raise_for_status()
        statement = res.json()

        bank_name = str(statement.get("bank_name") or "Unknown Bank")
        txns = statement.get("transactions", [])
        if not isinstance(txns, list):
            continue

        for txn in txns:
            if not isinstance(txn, dict):
                continue
            debit = _to_float(txn.get("debit"))
            credit = _to_float(txn.get("credit"))
            if debit <= 0 and credit <= 0:
                continue

            amount = debit if debit > 0 else credit
            direction = "dr" if debit > 0 else "cr"
            desc = str(txn.get("description") or "")
            date_value = str(txn.get("value_date") or txn.get("date") or "")[:10]
            if not date_value:
                continue

            rows.append(
                {
                    "id": f"hf-bank-{counter}",
                    "transaction_amount": round(amount, 2),
                    "cr_dr": direction,
                    "description": desc,
                    "vendor": _extract_vendor(desc, bank_name),
                    "date": date_value,
                    "reference": str(txn.get("cheque_no") or ""),
                }
            )
            counter += 1

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with OUT_PATH.open("w", encoding="utf-8", newline="") as handle:
        fieldnames = ["id", "transaction_amount", "cr_dr", "description", "vendor", "date", "reference"]
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    return len(rows)


if __name__ == "__main__":
    max_files = int(os.getenv("FG_INDIAN_JSON_LIMIT", "60"))
    count = build_csv(max_json_files=max_files)
    print(f"Wrote {count} transactions to {OUT_PATH}")
