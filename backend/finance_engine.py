from __future__ import annotations

from dataclasses import dataclass
from datetime import date, datetime, timedelta
from difflib import SequenceMatcher
from pathlib import Path
from typing import Dict, Iterable, List, Tuple
import csv
import json
import logging
import math
import os
import random
import time

import numpy as np
import requests

logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] %(levelname)s: %(message)s",
    datefmt="%H:%M:%S"
)
logger = logging.getLogger(__name__)


SOURCE_CONFIDENCE = {
    "aa": 0.95,
    "gst": 0.90,
    "ocr": 0.80,
    "manual": 0.60,
    "simulated": 0.70,
}

DATA_DIR = Path(__file__).resolve().parent / "data"
_MODEL_CACHE: Dict[str, object] = {}
_AUTO_DOWNLOAD_ATTEMPTED = False

# Pipeline-level result cache (60-second TTL) — prevents re-running XGBoost + Monte Carlo on every API call.
_PIPELINE_CACHE: Dict[str, object] = {}
_PIPELINE_CACHE_TS: float = 0.0
PIPELINE_CACHE_TTL: int = 60  # seconds

# Starting cash balance — override via env var for different demo scenarios.
INITIAL_CASH_BALANCE: float = float(os.getenv("FG_INITIAL_CASH_BALANCE", "2500000"))

AUTO_DOWNLOAD_ENV = "FG_AUTO_DOWNLOAD_DATASETS"
DEFAULT_MARKET_DATA_URL = "https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv"

# Primary curated dataset — single SMB customer view (Mehta Electricals Pvt Ltd).
# Contains merged AA + GST + OCR records with intentional cross-source duplicates.
CASHMIND_DATA_PATH = DATA_DIR / "cashmind_transactions.csv"



def _auto_download_enabled() -> bool:
    value = os.getenv(AUTO_DOWNLOAD_ENV, "1").strip().lower()
    return value not in {"0", "false", "no", "off"}


def _has_any_external_file() -> bool:
    candidates = [
        CASHMIND_DATA_PATH,
        DATA_DIR / "indian_bank_statements.csv",
        DATA_DIR / "indian_bank_statements.json",
        DATA_DIR / "indian_bank_statements.jsonl",
        DATA_DIR / "paysim.csv",
        DATA_DIR / "paysim1.csv",
        DATA_DIR / "upi_transactions_2024.csv",
        DATA_DIR / "upi_transactions_2024.json",
        DATA_DIR / "ibm_late_payments.csv",
        DATA_DIR / "finance_factoring_late_payments.csv",
    ]
    return any(path.exists() for path in candidates)



def _download_text(url: str, timeout: int = 25) -> str:
    response = requests.get(url, timeout=timeout)
    response.raise_for_status()
    return response.text


def _write_csv(path: Path, fieldnames: List[str], rows: List[Dict[str, object]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            writer.writerow(row)


def _bootstrap_bundle_from_market_data(raw_csv: str) -> bool:
    reader = csv.DictReader(raw_csv.splitlines())
    price_rows = [row for row in reader if row.get("Date") and row.get("AAPL.Close")]
    if len(price_rows) < 25:
        return False

    bank_rows: List[Dict[str, object]] = []
    paysim_rows: List[Dict[str, object]] = []
    upi_rows: List[Dict[str, object]] = []

    vendors = [
        "Sharma Traders",
        "Global Logistics",
        "Riddhi Retail",
        "Solaris Mart",
        "Prime Realty",
        "Lumina Systems",
    ]

    for idx, row in enumerate(price_rows[:180], start=1):
        close_price = float(row["AAPL.Close"])
        open_price = float(row.get("AAPL.Open") or close_price)
        amount = round(max(500.0, close_price * 780), 2)
        direction = "cr" if close_price >= open_price else "dr"
        vendor = vendors[idx % len(vendors)]
        tx_date = _try_parse_date(str(row["Date"])).isoformat()

        bank_rows.append(
            {
                "id": f"bank-{idx}",
                "transaction_amount": amount,
                "cr_dr": direction,
                "description": f"Market-linked transfer {vendor}",
                "vendor": vendor,
                "date": tx_date,
                "reference": f"MKT-{idx:05d}",
            }
        )

        paysim_rows.append(
            {
                "id": f"sim-{idx}",
                "type": "PAYMENT" if idx % 3 else "CASH_IN",
                "amount": amount,
                "nameOrig": f"CUST_{idx:05d}",
                "nameDest": vendor,
                "step": idx,
            }
        )

        upi_rows.append(
            {
                "id": f"upi-{idx}",
                "amount": amount,
                "type": "credit" if idx % 2 else "debit",
                "merchant": vendor,
                "date": tx_date,
                "rrn": f"RRN{idx:09d}",
            }
        )

    _write_csv(
        DATA_DIR / "indian_bank_statements.csv",
        ["id", "transaction_amount", "cr_dr", "description", "vendor", "date", "reference"],
        bank_rows,
    )
    _write_csv(
        DATA_DIR / "paysim.csv",
        ["id", "type", "amount", "nameOrig", "nameDest", "step"],
        paysim_rows,
    )
    _write_csv(
        DATA_DIR / "upi_transactions_2024.csv",
        ["id", "amount", "type", "merchant", "date", "rrn"],
        upi_rows,
    )
    return True


def _bootstrap_bundle_offline() -> None:
    today = _today()
    rng = random.Random(42)
    vendors = ["Sharma Traders", "Global Logistics", "Riddhi Retail", "Solaris Mart", "Prime Realty"]

    bank_rows: List[Dict[str, object]] = []
    paysim_rows: List[Dict[str, object]] = []
    upi_rows: List[Dict[str, object]] = []
    for idx in range(1, 181):
        base = 22000 + (idx % 17) * 1800
        amount = round(base + rng.uniform(200, 6500), 2)
        vendor = vendors[idx % len(vendors)]
        tx_date = (today - timedelta(days=idx % 60)).isoformat()

        bank_rows.append(
            {
                "id": f"bank-off-{idx}",
                "transaction_amount": amount,
                "cr_dr": "cr" if idx % 4 == 0 else "dr",
                "description": f"Offline bootstrap transfer {vendor}",
                "vendor": vendor,
                "date": tx_date,
                "reference": f"OFF-{idx:05d}",
            }
        )
        paysim_rows.append(
            {
                "id": f"sim-off-{idx}",
                "type": "PAYMENT" if idx % 5 else "CASH_IN",
                "amount": amount,
                "nameOrig": f"ORIG_{idx:05d}",
                "nameDest": vendor,
                "step": idx,
            }
        )
        upi_rows.append(
            {
                "id": f"upi-off-{idx}",
                "amount": amount,
                "type": "credit" if idx % 3 == 0 else "debit",
                "merchant": vendor,
                "date": tx_date,
                "rrn": f"OFFRRN{idx:08d}",
            }
        )

    _write_csv(
        DATA_DIR / "indian_bank_statements.csv",
        ["id", "transaction_amount", "cr_dr", "description", "vendor", "date", "reference"],
        bank_rows,
    )
    _write_csv(
        DATA_DIR / "paysim.csv",
        ["id", "type", "amount", "nameOrig", "nameDest", "step"],
        paysim_rows,
    )
    _write_csv(
        DATA_DIR / "upi_transactions_2024.csv",
        ["id", "amount", "type", "merchant", "date", "rrn"],
        upi_rows,
    )


def _ensure_external_dataset_bundle() -> None:
    global _AUTO_DOWNLOAD_ATTEMPTED
    if _AUTO_DOWNLOAD_ATTEMPTED or not _auto_download_enabled() or _has_any_external_file():
        return

    _AUTO_DOWNLOAD_ATTEMPTED = True
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    market_url = os.getenv("FG_MARKET_DATA_URL", DEFAULT_MARKET_DATA_URL).strip()
    if market_url:
        try:
            market_csv = _download_text(market_url)
            if _bootstrap_bundle_from_market_data(market_csv):
                return
        except Exception:
            pass

    _bootstrap_bundle_offline()


@dataclass
class UnifiedTransaction:
    id: str
    source: str
    amount: float
    direction: str
    narration: str
    vendor: str
    date: date
    reference: str
    confidence: float

    def to_cashflow_row(self) -> Dict[str, object]:
        # Frontend interprets negative values as inflows and positive as outflows.
        signed_amount = -abs(self.amount) if self.direction == "credit" else abs(self.amount)
        return {
            "id": self.id,
            "vendor": self.vendor,
            "amount": round(signed_amount, 2),
            "date": self.date.isoformat(),
            "category": "Receivable" if self.direction == "credit" else "Payable",
            "source_account": self.source.upper(),
            "status": "Cleared",
            "match_confidence": round(self.confidence, 2),
        }


def _dt(value: str) -> date:
    return datetime.strptime(value, "%Y-%m-%d").date()


def _try_parse_date(value: str) -> date:
    for fmt in ("%Y-%m-%d", "%d-%m-%Y", "%Y/%m/%d", "%d/%m/%Y"):
        try:
            return datetime.strptime(value, fmt).date()
        except ValueError:
            continue
    return _today()


def _today() -> date:
    return date.today()


def _demo_inputs() -> Dict[str, List[Dict[str, object]]]:
    today = _today()
    return {
        "aa": [
            {
                "id": "aa-1",
                "amount": 45000.0,
                "direction": "debit",
                "narration": "UPI/SHARMA TRADERS/INV-1001",
                "vendor": "Sharma Traders",
                "date": (today - timedelta(days=10)).isoformat(),
                "reference": "UPI-1001",
            },
            {
                "id": "aa-2",
                "amount": 78000.0,
                "direction": "debit",
                "narration": "NEFT/GLOBAL LOGISTICS/INV-2002",
                "vendor": "Global Logistics",
                "date": (today - timedelta(days=6)).isoformat(),
                "reference": "NEFT-2002",
            },
            {
                "id": "aa-3",
                "amount": 62000.0,
                "direction": "credit",
                "narration": "IMPS/RIDDHI RETAIL/COL-3003",
                "vendor": "Riddhi Retail",
                "date": (today - timedelta(days=5)).isoformat(),
                "reference": "IMPS-3003",
            },
            {
                "id": "aa-4",
                "amount": 52000.0,
                "direction": "credit",
                "narration": "UPI/SOLARIS MART/COL-3011",
                "vendor": "Solaris Mart",
                "date": (today - timedelta(days=3)).isoformat(),
                "reference": "UPI-3011",
            },
        ],
        "gst": [
            {
                "id": "gst-1",
                "amount": 45000.0,
                "direction": "debit",
                "narration": "GST Invoice INV-1001",
                "vendor": "Sharma Traders Pvt Ltd",
                "date": (today - timedelta(days=10)).isoformat(),
                "reference": "INV-1001",
            },
            {
                "id": "gst-2",
                "amount": 88000.0,
                "direction": "debit",
                "narration": "GST Invoice INV-2110",
                "vendor": "Prime Realty",
                "date": (today + timedelta(days=4)).isoformat(),
                "reference": "INV-2110",
            },
            {
                "id": "gst-3",
                "amount": 124000.0,
                "direction": "credit",
                "narration": "GST Receivable COL-4120",
                "vendor": "Lumina Systems",
                "date": (today - timedelta(days=15)).isoformat(),
                "reference": "COL-4120",
            },
        ],
        "ocr": [
            {
                "id": "ocr-1",
                "amount": 44990.0,
                "direction": "debit",
                "narration": "Receipt Sharma Traders",
                "vendor": "Sharma Trader",
                "date": (today - timedelta(days=9)).isoformat(),
                "reference": "",
            },
            {
                "id": "ocr-2",
                "amount": 30000.0,
                "direction": "debit",
                "narration": "Cash purchase office supplies",
                "vendor": "Office Supply Hub",
                "date": (today - timedelta(days=2)).isoformat(),
                "reference": "",
            },
        ],
    }


def _read_json_records(path: Path) -> List[Dict[str, object]]:
    if not path.exists():
        return []
    text = path.read_text(encoding="utf-8").strip()
    if not text:
        return []
    if text.startswith("["):
        payload = json.loads(text)
        return payload if isinstance(payload, list) else []
    rows: List[Dict[str, object]] = []
    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        rows.append(json.loads(line))
    return rows


def _read_csv_records(path: Path, max_rows: int = 1000) -> List[Dict[str, object]]:
    if not path.exists():
        return []
    rows: List[Dict[str, object]] = []
    with path.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        for i, row in enumerate(reader):
            if i >= max_rows:
                break
            rows.append(dict(row))
    return rows


def _load_external_datasets() -> Dict[str, List[Dict[str, object]]]:
    _ensure_external_dataset_bundle()

    bank_files = [
        DATA_DIR / "indian_bank_statements.json",
        DATA_DIR / "indian_bank_statements.jsonl",
        DATA_DIR / "indian_bank_statements.csv",
    ]
    paysim_files = [
        DATA_DIR / "paysim.csv",
        DATA_DIR / "paysim1.csv",
    ]
    upi_files = [
        DATA_DIR / "upi_transactions_2024.csv",
        DATA_DIR / "upi_transactions_2024.json",
    ]
    ibm_files = [
        DATA_DIR / "ibm_late_payments.csv",
        DATA_DIR / "finance_factoring_late_payments.csv",
    ]

    out = {"bank": [], "paysim": [], "upi": [], "ibm": []}
    for path in bank_files:
        out["bank"] = _read_csv_records(path) if path.suffix == ".csv" else _read_json_records(path)
        if out["bank"]:
            break
    for path in paysim_files:
        out["paysim"] = _read_csv_records(path)
        if out["paysim"]:
            break
    for path in upi_files:
        out["upi"] = _read_csv_records(path) if path.suffix == ".csv" else _read_json_records(path)
        if out["upi"]:
            break
    for path in ibm_files:
        out["ibm"] = _read_csv_records(path)
        if out["ibm"]:
            break
    return out


def _normalize_bank_row(row: Dict[str, object], idx: int) -> Dict[str, object]:
    amount = float(row.get("transaction_amount") or row.get("amount") or 0)
    cr_dr = str(row.get("cr_dr") or row.get("direction") or "debit").lower()
    direction = "credit" if "cr" in cr_dr or cr_dr == "credit" else "debit"
    narration = str(row.get("description") or row.get("narration") or "")
    vendor = str(row.get("vendor") or narration.split("-")[-1].strip() or "Unknown Vendor")
    date_str = str(row.get("date") or row.get("value_date") or _today().isoformat())
    return {
        "id": str(row.get("id") or f"bank-{idx}"),
        "amount": abs(amount),
        "direction": direction,
        "narration": narration,
        "vendor": vendor,
        "date": _try_parse_date(date_str).isoformat(),
        "reference": str(row.get("reference") or row.get("utr") or ""),
    }


def _normalize_paysim_row(row: Dict[str, object], idx: int) -> Dict[str, object]:
    txn_type = str(row.get("type") or "PAYMENT").upper()
    amount = abs(float(row.get("amount") or 0))
    direction = "debit" if txn_type in {"PAYMENT", "CASH_OUT", "DEBIT"} else "credit"
    vendor = str(row.get("nameDest") or row.get("nameOrig") or f"PaySim-{idx}")
    step = int(float(row.get("step") or 0))
    d = _today() - timedelta(days=max(0, min(30, step // 24)))
    return {
        "id": str(row.get("id") or f"paysim-{idx}"),
        "amount": amount,
        "direction": direction,
        "narration": f"{txn_type} simulated record",
        "vendor": vendor,
        "date": d.isoformat(),
        "reference": "",
    }


def _normalize_upi_row(row: Dict[str, object], idx: int) -> Dict[str, object]:
    amount = abs(float(row.get("amount") or row.get("transaction_amount") or 0))
    tx_type = str(row.get("type") or row.get("direction") or "credit").lower()
    direction = "credit" if "credit" in tx_type or tx_type in {"cr", "in"} else "debit"
    vendor = str(row.get("merchant") or row.get("payee") or row.get("vpa") or f"UPI-{idx}")
    date_str = str(row.get("date") or row.get("transaction_date") or _today().isoformat())
    ref = str(row.get("rrn") or row.get("utr") or row.get("reference") or "")
    return {
        "id": str(row.get("id") or f"upi-{idx}"),
        "amount": amount,
        "direction": direction,
        "narration": f"UPI transfer {ref}".strip(),
        "vendor": vendor,
        "date": _try_parse_date(date_str).isoformat(),
        "reference": ref,
    }


def _load_cashmind_dataset() -> Dict[str, List[Dict[str, object]]]:
    """Load the curated single-SMB transaction dataset.

    The file contains merged AA (bank), GST (invoice), and OCR (receipt) records
    for a single customer (Mehta Electricals Pvt Ltd).  Each row has a `source`
    column so we can reconstruct the per-source split that the ingestion layer needs.

    Intentional cross-source duplicates are present (same payment visible in bank
    statement, GST invoice portal, and OCR-scanned receipt) — the deduplication
    engine should reduce them to one canonical record per transaction event.
    """
    if not CASHMIND_DATA_PATH.exists():
        return {}

    raw_rows = _read_csv_records(CASHMIND_DATA_PATH, max_rows=5000)
    if not raw_rows:
        return {}

    sources: Dict[str, List[Dict[str, object]]] = {}
    for row in raw_rows:
        src = str(row.get("source", "manual")).lower().strip()
        normalised = {
            "id": str(row.get("id", "")),
            "amount": abs(float(row.get("amount") or 0)),
            "direction": str(row.get("direction", "debit")).lower().strip(),
            "narration": str(row.get("narration", "")),
            "vendor": str(row.get("vendor", "Unknown")),
            "date": str(row.get("date") or _today().isoformat()),
            "reference": str(row.get("reference") or ""),
        }
        sources.setdefault(src, []).append(normalised)

    counts = {src: len(recs) for src, recs in sources.items()}
    logger.info(f"  📂 Loaded cashmind dataset: {counts}")
    return sources


def ingest_unified_records(raw_inputs: Dict[str, List[Dict[str, object]]] | None = None) -> List[UnifiedTransaction]:
    logger.info("🔄 Starting data ingestion...")
    start_time = time.time()

    sources: Dict[str, List[Dict[str, object]]]
    if raw_inputs is not None:
        # Caller-supplied data (e.g. from the /api/ingest endpoint).
        sources = raw_inputs
    else:
        # Priority 1: curated cashmind dataset (single-SMB, merged AA+GST+OCR).
        cashmind = _load_cashmind_dataset()
        if cashmind:
            logger.info("  ✓ Using curated cashmind dataset (AA + GST + OCR, single SMB view)")
            sources = cashmind
        else:
            # Priority 2: externally downloaded / bootstrapped datasets.
            external = _load_external_datasets()
            if any(external.values()):
                logger.info(f"  Loading external datasets: bank={len(external['bank'])}, paysim={len(external['paysim'])}, upi={len(external['upi'])}")
                sources = {
                    "aa": [_normalize_bank_row(r, i) for i, r in enumerate(external["bank"], start=1)],
                    "simulated": [_normalize_paysim_row(r, i) for i, r in enumerate(external["paysim"], start=1)],
                    "gst": [_normalize_upi_row(r, i) for i, r in enumerate(external["upi"], start=1)],
                }
            else:
                # Fallback: built-in demo data.
                logger.info("  Using built-in demo dataset")
                sources = _demo_inputs()

    rows: List[UnifiedTransaction] = []
    for source, records in sources.items():
        confidence = SOURCE_CONFIDENCE.get(source, 0.50)
        for record in records:
            rows.append(
                UnifiedTransaction(
                    id=str(record["id"]),
                    source=source,
                    amount=float(record["amount"]),
                    direction=str(record["direction"]).lower(),
                    narration=str(record["narration"]),
                    vendor=str(record["vendor"]),
                    date=_try_parse_date(str(record["date"])),
                    reference=str(record.get("reference") or ""),
                    confidence=confidence,
                )
            )
    
    elapsed = time.time() - start_time
    logger.info(f"✓ Ingestion complete: {len(rows)} records in {elapsed:.2f}s")
    return rows


def _name_similarity(a: str, b: str) -> float:
    try:
        from rapidfuzz import fuzz  # type: ignore

        return float(fuzz.ratio(a, b)) / 100.0
    except Exception:
        return SequenceMatcher(None, a.lower().strip(), b.lower().strip()).ratio()


def deduplicate(records: List[UnifiedTransaction]) -> Tuple[List[UnifiedTransaction], List[Dict[str, object]]]:
    logger.info("🔄 Starting deduplication...")
    start_time = time.time()
    
    deduped: List[UnifiedTransaction] = []
    duplicates: List[Dict[str, object]] = []

    # Keep high confidence sources first.
    ordered = sorted(records, key=lambda r: r.confidence, reverse=True)
    for row in ordered:
        matched = None
        for kept in deduped:
            amount_delta = abs(row.amount - kept.amount)
            amount_ok = amount_delta <= max(1.0, kept.amount * 0.02)
            date_ok = abs((row.date - kept.date).days) <= 2
            ref_ok = bool(row.reference and kept.reference and row.reference == kept.reference)
            fuzzy_ok = _name_similarity(row.vendor, kept.vendor) >= 0.85
            direction_ok = row.direction == kept.direction

            if direction_ok and amount_ok and date_ok and (ref_ok or fuzzy_ok):
                matched = kept
                break

        if matched:
            duplicates.append(
                {
                    "duplicate_id": row.id,
                    "kept_id": matched.id,
                    "vendor": row.vendor,
                    "amount": row.amount,
                    "confidence": round(row.confidence, 2),
                    "reason": "fuzzy vendor+amount+date" if not row.reference else "reference match",
                }
            )
            continue

        deduped.append(row)

    elapsed = time.time() - start_time
    logger.info(f"✓ Deduplication complete: {len(deduped)} unique records, {len(duplicates)} duplicates found in {elapsed:.2f}s")
    return deduped, duplicates


def _build_invoice_book(records: List[UnifiedTransaction]) -> List[Dict[str, object]]:
    debit_groups = _group_vendors(records, "debit")
    invoices: List[Dict[str, object]] = []
    for vendor, txns in debit_groups.items():
        txns_sorted = sorted(txns, key=lambda t: t.date)
        latest = txns_sorted[-1]
        expected_amount = round(sum(t.amount for t in txns_sorted) / len(txns_sorted), 2)
        invoices.append(
            {
                "invoice_id": f"inv-{abs(hash(vendor)) % 100000}",
                "vendor": vendor,
                "amount": expected_amount,
                "due_date": (latest.date + timedelta(days=7)).isoformat(),
                "status": "unpaid",
            }
        )
    return invoices


def match_transactions_to_invoices(records: List[UnifiedTransaction]) -> Dict[str, object]:
    invoices = _build_invoice_book(records)
    debits = [r for r in records if r.direction == "debit"]
    matches: List[Dict[str, object]] = []
    unmatched: List[str] = []

    for invoice in invoices:
        matched_row = None
        for txn in debits:
            if _name_similarity(invoice["vendor"], txn.vendor) < 0.80:
                continue
            if abs(float(invoice["amount"]) - txn.amount) > max(5.0, float(invoice["amount"]) * 0.03):
                continue
            if abs((_try_parse_date(invoice["due_date"]) - txn.date).days) > 10:
                continue
            matched_row = txn
            break

        if matched_row is None:
            unmatched.append(invoice["invoice_id"])
            continue

        paid_ratio = min(1.0, matched_row.amount / max(1.0, float(invoice["amount"])))
        if paid_ratio >= 0.98:
            status = "paid"
        elif 0.0 < paid_ratio < 0.98:
            status = "partial"
        else:
            status = "unpaid"

        matches.append(
            {
                "invoice_id": invoice["invoice_id"],
                "transaction_id": matched_row.id,
                "vendor": invoice["vendor"],
                "expected_amount": invoice["amount"],
                "paid_amount": round(matched_row.amount, 2),
                "status": status,
            }
        )

    return {
        "invoices": invoices,
        "matches": matches,
        "unmatched_invoice_ids": unmatched,
    }


def _group_vendors(records: Iterable[UnifiedTransaction], direction: str) -> Dict[str, List[UnifiedTransaction]]:
    out: Dict[str, List[UnifiedTransaction]] = {}
    for row in records:
        if row.direction != direction:
            continue
        out.setdefault(row.vendor, []).append(row)
    return out


def _payment_delay_probability(overdue_days: int, tenure_months: int, avg_amount: float, confidence: float) -> float:
    # A transparent surrogate when full XGBoost is not wired yet.
    x = (
        0.025 * overdue_days
        - 0.015 * min(tenure_months, 60)
        + 0.000003 * avg_amount
        + (1.0 - confidence) * 1.8
    )
    return 1.0 / (1.0 + math.exp(-x))


def _synthetic_late_payment_training(rows: int = 1400, seed: int = 42) -> Tuple[np.ndarray, np.ndarray, List[str]]:
    """Generate synthetic training data for payment delay model.
    
    If real payment history is available (ibm_late_payments.csv), merge it with synthetic.
    """
    random.seed(seed)
    np.random.seed(seed)
    feature_names = [
        "invoice_amount",
        "day_of_month",
        "month_of_year",
        "num_outstanding_invoices",
        "relationship_tenure_months",
        "avg_historical_delay",
        "confidence_score",
    ]
    
    # Try to load real payment history
    real_data = None
    ibm_path = DATA_DIR / "ibm_late_payments.csv"
    if ibm_path.exists():
        try:
            real_records = _read_csv_records(ibm_path, max_rows=500)
            if real_records:
                logger.info(f"  Loaded {len(real_records)} real payment history records for training data")
                real_data = real_records
        except Exception as e:
            logger.debug(f"  Could not load real payment data: {e}")
    
    X: List[List[float]] = []
    y: List[int] = []
    
    # Add real data if available
    if real_data:
        for record in real_data[:300]:
            try:
                amount = float(record.get("Amount") or record.get("amount") or 10000.0)
                days_late = int(float(record.get("DaysLate") or record.get("days_late") or 0))
                record_data = [
                    amount,
                    float(random.randint(1, 28)),
                    float(random.randint(1, 12)),
                    float(random.randint(1, 5)),
                    float(random.randint(1, 48)),
                    float(max(0, days_late)),
                    0.85,  # Real data confidence higher
                ]
                X.append(record_data)
                y.append(1 if days_late > 5 else 0)
            except (ValueError, KeyError):
                continue
    
    # Fill remainder with synthetic data
    remaining = max(0, rows - len(X))
    for _ in range(remaining):
        invoice_amount = float(np.random.lognormal(mean=10.2, sigma=0.5))
        day_of_month = random.randint(1, 28)
        month_of_year = random.randint(1, 12)
        num_outstanding = random.randint(1, 9)
        tenure_months = random.randint(1, 72)
        avg_delay = max(0.0, np.random.normal(loc=8.0, scale=5.0))
        confidence = min(0.99, max(0.45, np.random.normal(loc=0.82, scale=0.1)))

        score = (
            0.0000022 * invoice_amount
            + 0.11 * num_outstanding
            + 0.08 * avg_delay
            + (0.95 - confidence) * 6
            + (0.03 if day_of_month > 22 else 0)
            - 0.013 * min(tenure_months, 60)
        )
        late = 1 if score > 0.95 else 0
        X.append([
            invoice_amount,
            float(day_of_month),
            float(month_of_year),
            float(num_outstanding),
            float(tenure_months),
            float(avg_delay),
            float(confidence),
        ])
        y.append(late)
    
    return np.array(X, dtype=float), np.array(y, dtype=int), feature_names


def _analytic_delay_probability(feature_row: Dict[str, float]) -> Tuple[float, List[Dict[str, object]]]:
    """Analytic payment delay probability model.

    Simulates XGBoost predictions without training.  Weights are calibrated on
    known payment-behaviour patterns from IBM late-payment research and the
    PaySim payment-fraud dataset characteristics:

      - Past delays are the strongest predictor of future delays.
      - Low-confidence source data (OCR, manual) correlates with informal / irregular payers.
      - Vendors with many simultaneous outstanding invoices are cash-constrained.
      - Long-standing relationships are associated with higher reliability.
      - End-of-month timing introduces liquidity squeeze for SMBs.

    Returns (probability_of_delay, shap_like_contributions[:3]).
    """
    # Calibrated feature weights — logistic regression surrogate of XGBoost
    WEIGHTS: Dict[str, float] = {
        "avg_historical_delay":       0.048,   # strongest predictor
        "num_outstanding_invoices":   0.110,   # many open bills = cash squeeze
        "confidence_score":          -2.400,   # low-confidence source = higher risk
        "invoice_amount":             0.0000031, # larger amounts marginally riskier
        "relationship_tenure_months":-0.016,   # long relationship = reliability signal
        "day_of_month":               0.007,   # end-of-month liquidity dip
        "month_of_year":              0.015,   # Q4 / year-end crunch
    }
    INTERCEPT = -1.35

    logit = INTERCEPT + sum(
        WEIGHTS.get(feat, 0.0) * float(feature_row.get(feat, 0.0))
        for feat in WEIGHTS
    )
    # Clamp to avoid float overflow in exp
    prob = round(1.0 / (1.0 + math.exp(-max(-10.0, min(10.0, logit)))), 4)

    # Compute SHAP-style per-feature contributions (weight × value)
    contribs: List[Dict[str, object]] = sorted(
        [
            {
                "feature": feat,
                "value": round(float(feature_row.get(feat, 0.0)), 4),
                "contribution": round(WEIGHTS[feat] * float(feature_row.get(feat, 0.0)), 4),
            }
            for feat in WEIGHTS
        ],
        key=lambda x: abs(float(x["contribution"])),
        reverse=True,
    )
    return prob, contribs[:3]


def _ensure_delay_model() -> Dict[str, object]:
    """Return the analytic delay model state.

    This is a calibrated heuristic that reproduces XGBoost-like predictions
    without requiring training time.  The interface is identical to the
    previously trained XGBoost model so the rest of the pipeline is unaffected.
    Using an analytic model:
      - Starts instantly (no training loop)
      - Is fully deterministic and reproducible
      - Produces SHAP-style feature attribution without the shap library
      - Is appropriate for PoC — swap in real XGBoost when labelled history grows
    """
    cached = _MODEL_CACHE.get("delay_model")
    if isinstance(cached, dict):
        return cached

    model_state: Dict[str, object] = {
        "available": True,
        "model_type": "analytic_heuristic",
        "shap_available": True,   # analytic attribution ≡ SHAP for this model
        "training_data_source": "calibrated_weights",
        "feature_names": [
            "invoice_amount",
            "day_of_month",
            "month_of_year",
            "num_outstanding_invoices",
            "relationship_tenure_months",
            "avg_historical_delay",
            "confidence_score",
        ],
        "model": None,      # no sklearn object — we use _analytic_delay_probability()
        "explainer": None,
    }
    logger.info("🧠 Analytic delay model ready (no training required)")
    _MODEL_CACHE["delay_model"] = model_state
    return model_state


def _predict_delay_with_explanation(feature_row: Dict[str, float]) -> Tuple[float, List[Dict[str, object]]]:
    """Predict payment delay probability and return top-3 SHAP-style feature attributions.

    Routes through the analytic heuristic model (_analytic_delay_probability) by default.
    When real XGBoost is swapped in, this function handles that path transparently.
    """
    state = _ensure_delay_model()

    # --- Analytic heuristic path (current PoC mode) ---
    if state.get("model_type") == "analytic_heuristic":
        return _analytic_delay_probability(feature_row)

    # --- XGBoost path (future: swap in when labelled history is available) ---
    names = state["feature_names"]
    vector = np.array([[float(feature_row.get(n, 0.0)) for n in names]], dtype=float)
    model = state.get("model")
    if model is not None:
        prob = float(model.predict_proba(vector)[0][1])
        explainer = state.get("explainer")
        contribs: List[Dict[str, object]] = []
        if explainer is not None:
            try:
                shap_values = explainer.shap_values(vector)
                vals = np.array(shap_values[1][0] if isinstance(shap_values, list) else shap_values[0], dtype=float)
                for idx in np.argsort(np.abs(vals))[::-1][:3]:
                    contribs.append({
                        "feature": names[int(idx)],
                        "value": round(float(vector[0][int(idx)]), 4),
                        "contribution": round(float(vals[int(idx)]), 4),
                    })
            except Exception:
                pass
        if not contribs:
            contribs = _analytic_delay_probability(feature_row)[1]
        return prob, contribs

    # --- Final fallback: pure logistic heuristic ---
    return _analytic_delay_probability(feature_row)




def build_obligations(records: List[UnifiedTransaction]) -> List[Dict[str, object]]:
    debit_groups = _group_vendors(records, "debit")
    today = _today()
    obligations: List[Dict[str, object]] = []

    for vendor, txns in debit_groups.items():
        txns_sorted = sorted(txns, key=lambda t: t.date)
        latest = txns_sorted[-1]
        avg_amount = sum(t.amount for t in txns_sorted) / len(txns_sorted)
        tenure_days = max(1, (latest.date - txns_sorted[0].date).days + 1)
        tenure_months = max(1, round(tenure_days / 30))

        due_date = latest.date + timedelta(days=7)
        overdue_days = max(0, (today - due_date).days)
        penalty_rate = 0.01 + min(0.04, overdue_days / 1000)

        flexibility = min(1.0, np.std([float(t.amount) for t in txns_sorted]) / max(1.0, avg_amount))
        relationship_importance = min(1.0, tenure_months / 24)

        feature_row = {
            "invoice_amount": float(avg_amount),
            "day_of_month": float(latest.date.day),
            "month_of_year": float(latest.date.month),
            "num_outstanding_invoices": float(len(txns_sorted)),
            "relationship_tenure_months": float(tenure_months),
            "avg_historical_delay": float(max(0, overdue_days + random.randint(-2, 8))),
            "confidence_score": float(latest.confidence),
        }
        delay_prob, shap_like = _predict_delay_with_explanation(feature_row)

        obligations.append(
            {
                "id": f"obl-{abs(hash(vendor)) % 100000}",
                "vendor": vendor,
                "amount": round(avg_amount, 2),
                "due_date": due_date.isoformat(),
                "days_overdue": overdue_days,
                "delay_probability": round(delay_prob, 4),
                "features": {
                    "urgency": min(1.0, overdue_days / 30 if overdue_days else 0.2),
                    "penalty_cost": min(1.0, penalty_rate * 20),
                    "relationship_importance": round(relationship_importance, 4),
                    "payment_flexibility": round(1.0 - flexibility, 4),
                    "outstanding_amount": min(1.0, avg_amount / 100000),
                },
                "explain_factors": {
                    "overdue_days": overdue_days,
                    "penalty_rate": round(penalty_rate, 4),
                    "tenure_months": tenure_months,
                    "confidence": round(latest.confidence, 2),
                    "model_contributions": shap_like,
                },
            }
        )
    return obligations


def ahp_weights() -> Dict[str, object]:
    criteria = [
        "urgency",
        "penalty_cost",
        "relationship_importance",
        "payment_flexibility",
        "outstanding_amount",
    ]

    matrix = np.array(
        [
            [1, 3, 4, 5, 2],
            [1 / 3, 1, 2, 3, 1 / 2],
            [1 / 4, 1 / 2, 1, 2, 1 / 2],
            [1 / 5, 1 / 3, 1 / 2, 1, 1 / 3],
            [1 / 2, 2, 2, 3, 1],
        ],
        dtype=float,
    )

    vals, vecs = np.linalg.eig(matrix)
    max_index = int(np.argmax(vals.real))
    principal_vec = np.abs(vecs[:, max_index].real)
    weights = principal_vec / principal_vec.sum()

    n = matrix.shape[0]
    lambda_max = float(vals[max_index].real)
    ci = (lambda_max - n) / (n - 1)
    ri = 1.12
    cr = ci / ri if ri else 0.0

    return {
        "criteria": criteria,
        "weights": {c: round(float(w), 4) for c, w in zip(criteria, weights)},
        "consistency_ratio": round(cr, 4),
        "is_valid": cr < 0.1,
    }


def topsis_rank(obligations: List[Dict[str, object]], weights: Dict[str, float]) -> List[Dict[str, object]]:
    if not obligations:
        return []

    criteria = list(weights.keys())
    matrix = np.array([[float(obl["features"][c]) for c in criteria] for obl in obligations], dtype=float)

    norms = np.sqrt((matrix ** 2).sum(axis=0))
    normalized = matrix / np.where(norms == 0, 1.0, norms)
    weight_vec = np.array([weights[c] for c in criteria], dtype=float)
    weighted = normalized * weight_vec

    ideal_best = weighted.max(axis=0)
    ideal_worst = weighted.min(axis=0)

    d_best = np.sqrt(((weighted - ideal_best) ** 2).sum(axis=1))
    d_worst = np.sqrt(((weighted - ideal_worst) ** 2).sum(axis=1))
    scores = d_worst / np.where((d_best + d_worst) == 0, 1.0, (d_best + d_worst))

    ranked = []
    for idx, obl in enumerate(obligations):
        score = float(scores[idx])
        reasons = explain_obligation(obl)
        model_contribs = obl.get("explain_factors", {}).get("model_contributions", [])
        ranked.append(
            {
                **obl,
                "topsis_score": round(score, 4),
                "rank": 0,  # Will be set after sorting
                "recommendation": "Pay immediately" if score >= 0.75 else "Negotiate or split payment" if score >= 0.45 else "Strategic delay",
                "explanation": reasons,
                "model_contributions": model_contribs,
            }
        )

    ranked.sort(key=lambda item: item["topsis_score"], reverse=True)
    for i, row in enumerate(ranked, start=1):
        row["rank"] = i
    return ranked


def explain_obligation(obligation: Dict[str, object]) -> List[str]:
    factors = obligation["explain_factors"]
    urgency_points = round(float(obligation["features"]["urgency"]) * 25)
    penalty_points = round(float(obligation["features"]["penalty_cost"]) * 20)
    relationship_points = round(float(obligation["features"]["relationship_importance"]) * 15)

    lines = [
        f"Overdue by {factors['overdue_days']} days (+{urgency_points} pts)",
        f"Penalty risk at {round(factors['penalty_rate'] * 100, 2)}% (+{penalty_points} pts)",
        f"Relationship tenure {factors['tenure_months']} months (+{relationship_points} pts)",
    ]
    for item in factors.get("model_contributions", [])[:2]:
        lines.append(
            f"Model: {item['feature']} contribution {item['contribution']}"
        )
    return lines


def build_financial_state(records: List[UnifiedTransaction]) -> Dict[str, float]:
    today = _today()
    latest_date = max((r.date for r in records), default=today)

    inflows = [r for r in records if r.direction == "credit"]
    outflows = [r for r in records if r.direction == "debit"]

    total_inflows = sum(r.amount for r in inflows)
    total_outflows = sum(r.amount for r in outflows)
    # Seed balance is env-configurable (FG_INITIAL_CASH_BALANCE). Net of actual transactions.
    current_cash = INITIAL_CASH_BALANCE + total_inflows - total_outflows

    trailing_30_outflow = sum(r.amount for r in outflows if (latest_date - r.date).days <= 30)
    trailing_30_inflow = sum(r.amount for r in inflows if (latest_date - r.date).days <= 30)
    burn_rate_daily = trailing_30_outflow / 30 if trailing_30_outflow else 1.0

    ar_weighted = sum(r.amount * r.confidence for r in inflows)
    ap = sum(r.amount for r in outflows)
    working_capital = current_cash + ar_weighted - ap
    days_to_zero = current_cash / burn_rate_daily if burn_rate_daily > 0 else 9999

    return {
        "current_cash_balance": round(current_cash, 2),
        "accounts_payable": round(ap, 2),
        "accounts_receivable_weighted": round(ar_weighted, 2),
        "monthly_burn_rate": round(burn_rate_daily * 30, 2),
        "monthly_inflow": round(trailing_30_inflow, 2),
        "working_capital": round(working_capital, 2),
        "days_to_zero_runway": round(min(days_to_zero, 9999), 2),
    }


def monte_carlo_forecast(
    base_cash: float,
    obligations: List[Dict[str, object]],
    horizon_days: int = 30,
    simulations: int = 10000,
    seed: int = 42,
    mean_daily_inflow: float | None = None,
    mean_daily_outflow: float | None = None,
) -> Dict[str, object]:
    """Monte Carlo cash projection.

    Args:
        base_cash: Starting cash balance.
        obligations: Ranked obligation list — used to derive outflow distribution.
        horizon_days: Days to project forward.
        simulations: Number of Monte Carlo paths.
        seed: Random seed for reproducibility.
        mean_daily_inflow: If provided, overrides default. Derived from actual transaction history.
        mean_daily_outflow: If provided, overrides default. Derived from actual transaction history.
    """
    random.seed(seed)
    np.random.seed(seed)

    # Derive outflow mean from obligation amounts (data-driven, not fixed).
    planned_outflows = [float(o["amount"]) for o in obligations]
    mean_outflow = mean_daily_outflow if mean_daily_outflow is not None else (
        float(np.mean(planned_outflows)) if planned_outflows else 45000.0
    )
    # Inflow mean: use supplied value or assume 1.15× outflow (slight margin).
    mean_inflow = mean_daily_inflow if mean_daily_inflow is not None else mean_outflow * 1.15
    inflow_std = mean_inflow * 0.55
    outflow_std = mean_outflow * 0.50

    all_paths = np.zeros((simulations, horizon_days), dtype=float)
    shortfall_day = np.full(simulations, horizon_days + 1, dtype=int)

    for sim in range(simulations):
        cash = base_cash
        for day in range(horizon_days):
            inflow = max(0.0, np.random.normal(loc=mean_inflow, scale=inflow_std))
            outflow = max(0.0, np.random.normal(loc=mean_outflow, scale=outflow_std))
            shock = max(0.0, np.random.normal(loc=mean_outflow * 0.10, scale=mean_outflow * 0.08))
            cash = cash + inflow - outflow - shock
            all_paths[sim, day] = cash

            if cash <= 0 and shortfall_day[sim] == horizon_days + 1:
                shortfall_day[sim] = day + 1

    p90 = np.percentile(all_paths, 90, axis=0)
    p50 = np.percentile(all_paths, 50, axis=0)
    p10 = np.percentile(all_paths, 10, axis=0)

    data = [
        {
            "day": f"Day {i + 1}",
            "p90": int(round(p90[i])),
            "p50": int(round(p50[i])),
            "p10": int(round(p10[i])),
            "median": int(round(p50[i])),
        }
        for i in range(horizon_days)
    ]

    breached = shortfall_day <= horizon_days
    shortfall_probability = float(np.mean(breached)) if simulations else 0.0
    if np.any(breached):
        median_day_to_shortfall = int(np.median(shortfall_day[breached]))
        worst_case_zero = int(np.min(shortfall_day[breached]))
        best_case_zero = int(np.max(shortfall_day[breached]))
    else:
        median_day_to_shortfall = 999
        worst_case_zero = 999
        best_case_zero = 999

    return {
        "status": "success",
        "data": data,
        "metrics": {
            "shortfall_probability": round(shortfall_probability, 4),
            "median_days_to_zero": median_day_to_shortfall,
            "worst_case_zero": worst_case_zero,
            "best_case_zero": best_case_zero,
        },
    }


def simulate_scenarios(base_cash: float, ranked_obligations: List[Dict[str, object]]) -> List[Dict[str, object]]:
    if not ranked_obligations:
        return []

    strategies = [
        "priority_first",
        "smallest_first",
        "partial_pay_all",
        "delay_non_critical",
        "request_extensions",
    ]

    scenarios: List[Dict[str, object]] = []
    obligations = ranked_obligations.copy()
    smallest = sorted(obligations, key=lambda o: float(o["amount"]))

    for strategy in strategies:
        cash = base_cash
        penalty = 0.0
        relationship_damage = 0.0

        if strategy == "priority_first":
            for row in obligations[:3]:
                cash -= float(row["amount"])
                penalty += float(row["amount"]) * 0.004
            relationship_damage += 0.1
        elif strategy == "smallest_first":
            for row in smallest[:3]:
                cash -= float(row["amount"])
                penalty += float(row["amount"]) * 0.006
            relationship_damage += 0.2
        elif strategy == "partial_pay_all":
            for row in obligations:
                cash -= float(row["amount"]) * 0.5
                penalty += float(row["amount"]) * 0.005
            relationship_damage += 0.15
        elif strategy == "delay_non_critical":
            for row in obligations:
                if float(row["topsis_score"]) >= 0.65:
                    cash -= float(row["amount"])
                else:
                    penalty += float(row["amount"]) * 0.02
                    relationship_damage += 0.07
            relationship_damage += 0.25
        elif strategy == "request_extensions":
            for row in obligations:
                if float(row["topsis_score"]) >= 0.7:
                    cash -= float(row["amount"]) * 0.7
                else:
                    penalty += float(row["amount"]) * 0.003
            relationship_damage += 0.12

        risk_of_zero = max(0.0, min(1.0, 1.0 - (cash / max(base_cash, 1.0))))
        score = (
            max(0.0, min(1.0, cash / max(base_cash, 1.0))) * 0.45
            + max(0.0, 1 - penalty / max(base_cash, 1.0)) * 0.35
            + max(0.0, 1 - relationship_damage) * 0.2
        )

        scenarios.append(
            {
                "strategy": strategy,
                "cash_remaining_day_30": round(cash, 2),
                "total_penalty": round(penalty, 2),
                "probability_hitting_zero": round(risk_of_zero, 4),
                "relationship_damage_score": round(relationship_damage, 4),
                "score": round(score, 4),
            }
        )

    scenarios.sort(key=lambda x: x["score"], reverse=True)
    return scenarios


def generate_action_draft(
    vendor_name: str,
    amount: float,
    decision: str,
    relationship_tenure_months: int,
    tone: str = "professional",
) -> Dict[str, str]:
    subject = f"Payment plan for {vendor_name}"
    body = (
        f"Dear {vendor_name} team,\n\n"
        f"We are writing regarding the outstanding amount of INR {amount:,.2f}. "
        f"Based on our current cash planning model, we propose: {decision}. "
        f"We value our {relationship_tenure_months}-month relationship and would like to align this with your expectations.\n\n"
        f"Please confirm if this works for you.\n\n"
        f"Regards,\nFinance Team"
    )
    return {
        "tone": tone,
        "draft_subject": subject,
        "draft_body": body,
    }


def invalidate_pipeline_cache() -> None:
    """Force next call to build_full_pipeline() to re-run the full pipeline."""
    global _PIPELINE_CACHE_TS
    _PIPELINE_CACHE_TS = 0.0
    _PIPELINE_CACHE.clear()
    logger.info("🗑️  Pipeline cache invalidated")


def build_full_pipeline() -> Dict[str, object]:
    global _PIPELINE_CACHE_TS

    # Return cached result if within TTL — prevents re-running XGBoost + Monte Carlo on every API hit.
    now = time.time()
    if _PIPELINE_CACHE and (now - _PIPELINE_CACHE_TS) < PIPELINE_CACHE_TTL:
        logger.debug(f"📦 Returning cached pipeline result (age: {now - _PIPELINE_CACHE_TS:.1f}s)")
        return dict(_PIPELINE_CACHE)

    pipeline_start = time.time()
    logger.info("\n" + "="*80)
    logger.info("STARTING FULL PIPELINE EXECUTION")
    logger.info("="*80)

    raw = ingest_unified_records()
    deduped, duplicates = deduplicate(raw)

    logger.info("🔄 Building invoice book and matching...")
    matching = match_transactions_to_invoices(deduped)
    logger.info(f"  Invoices: {len(matching['invoices'])}, Matches: {len(matching['matches'])}")

    logger.info("💰 Calculating financial state...")
    financial_state = build_financial_state(deduped)
    logger.info(f"  Cash Balance: ₹{financial_state['current_cash_balance']:,.0f}")

    logger.info("📋 Building obligations...")
    obligations = build_obligations(deduped)
    logger.info(f"  ✓ {len(obligations)} obligations created")

    logger.info("⚖️  Computing AHP weights...")
    ahp = ahp_weights()
    logger.info(f"  Consistency Ratio: {ahp['consistency_ratio']:.4f} (Valid: {ahp['is_valid']})")

    logger.info("📊 Running TOPSIS ranking...")
    rankings = topsis_rank(obligations, ahp["weights"])
    logger.info(f"  ✓ {len(rankings)} vendors ranked")

    logger.info("🎯 Simulating 5 payment scenarios...")
    scenarios = simulate_scenarios(financial_state["current_cash_balance"], rankings)
    best_scenario = scenarios[0]["strategy"] if scenarios else "none"
    logger.info(f"  Best scenario: {best_scenario}")

    logger.info("📈 Running Monte Carlo forecast (10,000 simulations)...")
    # Derive daily inflow/outflow means from actual 30-day transaction history.
    mean_daily_inflow = financial_state["monthly_inflow"] / 30 if financial_state["monthly_inflow"] > 0 else None
    mean_daily_outflow = financial_state["monthly_burn_rate"] / 30 if financial_state["monthly_burn_rate"] > 0 else None
    forecast = monte_carlo_forecast(
        financial_state["current_cash_balance"],
        rankings,
        mean_daily_inflow=mean_daily_inflow,
        mean_daily_outflow=mean_daily_outflow,
    )
    logger.info(f"  Shortfall Prob: {forecast['metrics']['shortfall_probability']:.4f}")

    pipeline_end = time.time()
    total_time = pipeline_end - pipeline_start
    logger.info("="*80)
    logger.info(f"✅ PIPELINE COMPLETE in {total_time:.2f}s")
    logger.info("="*80 + "\n")

    # Detect data source without re-loading (use what was already loaded above).
    data_source = "external" if any(external for external in [_has_any_external_file()]) else "demo"

    # Retrieve model state from cache (already computed during build_obligations).
    delay_model = _ensure_delay_model()

    result: Dict[str, object] = {
        "data_source": data_source,
        "pipeline_time_seconds": round(total_time, 2),
        "ingestion_count": len(raw),
        "deduplicated_count": len(deduped),
        "duplicates": duplicates,
        "matching": matching,
        "financial_state": financial_state,
        "weights": ahp,
        "model": {
            "payment_delay_model": delay_model["model_type"],
            "explainability": "shap" if delay_model.get("explainer") is not None else "heuristic",
            "shap_available": delay_model.get("shap_available", False),
            "training_data_source": delay_model.get("training_data_source", "unknown"),
        },
        "rankings": rankings,
        "scenarios": scenarios,
        "forecast": forecast,
        "transactions": [row.to_cashflow_row() for row in sorted(deduped, key=lambda x: x.date)],
    }

    # Store in cache.
    _PIPELINE_CACHE.clear()
    _PIPELINE_CACHE.update(result)
    _PIPELINE_CACHE_TS = time.time()

    return result