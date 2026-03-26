"""
Backend Mock Data Generator
Provides realistic simulated financial data for fallback/demo scenarios
"""

from datetime import datetime, timedelta
from typing import List, Dict, Any
import random

VENDORS = [
    "Acme Corp",
    "Global Supplies Ltd",
    "Tech Partners Inc",
    "First Choice Vendors",
    "Premium Services",
    "Quality Materials Co",
    "Innovation Systems",
    "Trusted Partners LLC",
]

PAYMENT_SOURCES = ["UPI", "Bank Transfer", "Card", "Cheque", "Cash"]

def generate_mock_financial_state() -> Dict[str, Any]:
    """Generate realistic financial state mock data"""
    base_cash = 2500000 + random.random() * 500000
    monthly_burn = 250000 + random.random() * 100000
    monthly_inflow = 350000 + random.random() * 150000
    
    return {
        "current_cash_balance": int(base_cash),
        "accounts_payable": int(450000 + random.random() * 200000),
        "accounts_receivable_weighted": int(600000 + random.random() * 300000),
        "monthly_burn_rate": int(monthly_burn),
        "monthly_inflow": int(monthly_inflow),
        "working_capital": int(base_cash - 450000),
        "days_to_zero_runway": int(45 + random.random() * 30),
    }

def generate_mock_forecast_data() -> Dict[str, Any]:
    """Generate 30-day Monte Carlo forecast simulation"""
    today = datetime.now()
    days = []
    balance = 2500000
    
    for i in range(30):
        date = today + timedelta(days=i)
        
        # Simulate daily cash movements
        inflow = random.random() * 100000 if random.random() > 0.6 else 0
        outflow = random.random() * 80000 if random.random() > 0.7 else 0
        balance = balance + inflow - outflow
        
        days.append({
            "day": date.strftime("%Y-%m-%d"),
            "p90": int(balance * 1.05),
            "p50": int(balance),
            "p10": int(balance * 0.95),
            "median": int(balance),
        })
    
    return {
        "status": "limited",
        "data": days,
        "metrics": {
            "shortfall_probability": round(random.random() * 0.2, 3),
            "median_days_to_zero": int(30 + random.random() * 20),
            "worst_case_zero": int(8 + random.random() * 12),
            "best_case_zero": int(45 + random.random() * 30),
        }
    }

def generate_mock_transactions(count: int = 50) -> Dict[str, Any]:
    """Generate mock transaction history"""
    transactions = []
    today = datetime.now()
    
    for i in range(count):
        days_ago = int(random.random() * 90)
        date = today - timedelta(days=days_ago)
        
        transactions.append({
            "id": f"TXN-{str(i + 1).zfill(6)}",
            "vendor": random.choice(VENDORS),
            "amount": int((random.random() * 500000 + 10000) / 100) * 100,
            "direction": "outflow" if random.random() > 0.5 else "inflow",
            "narration": f"Transaction {i + 1}",
            "date": date.strftime("%Y-%m-%d"),
            "source": random.choice(PAYMENT_SOURCES),
            "confidence": int(random.random() * 0.3 + 0.7) * 100,
            "reference": f"REF-{i + 1}",
        })
    
    return {
        "status": "limited",
        "data": sorted(transactions, key=lambda x: x["date"], reverse=True),
        "total": count,
    }

def generate_mock_invoices(count: int = 20) -> Dict[str, Any]:
    """Generate mock invoice data"""
    invoices = []
    today = datetime.now()
    
    for i in range(count):
        days_ago = int(random.random() * 60)
        issue_date = today - timedelta(days=days_ago)
        due_date = issue_date + timedelta(days=30)
        
        is_paid = random.random() > 0.4
        paid_date = None
        if is_paid:
            paid_date = issue_date + timedelta(days=int(random.random() * 45))
        
        invoices.append({
            "invoice_id": f"INV-{str(i + 1).zfill(6)}",
            "vendor": random.choice(VENDORS),
            "amount": int((random.random() * 800000 + 50000) / 100) * 100,
            "due_date": due_date.strftime("%Y-%m-%d"),
            "status": "paid" if is_paid else "pending",
            "match_confidence": int(random.random() * 0.3 + 0.65),
            "source": "simulated",
        })
    
    return {
        "status": "limited",
        "data": invoices,
        "total": count,
    }

def generate_mock_decisions(count: int = 10) -> Dict[str, Any]:
    """Generate mock payment decision ranking"""
    today = datetime.now()
    data = []
    
    for i in range(count):
        due_date = today + timedelta(days=int(random.random() * 30))
        
        data.append({
            "id": f"DEC-{str(i + 1).zfill(6)}",
            "vendor": random.choice(VENDORS),
            "amount": int((random.random() * 500000 + 50000) / 100) * 100,
            "due_date": due_date.strftime("%Y-%m-%d"),
            "days_overdue": int(random.random() * 10 - 5),
            "delay_probability": int(random.random() * 0.4 * 100),
            "topsis_score": round(random.random() * 100),
            "rank": i + 1,
            "recommendation": ["pay_now", "pay_early", "pay_on_time"][i % 3],
            "explanation": [
                f"Vendor {random.choice(VENDORS)} has been prioritized",
                f"Amount {int((random.random() * 500000 + 50000) / 100) * 100} is significant",
                f"Payment due in {int(random.random() * 30)} days",
            ],
            "features": {
                "vendor_tenure_months": int(random.random() * 60),
                "average_payment_delay_days": int(random.random() * 30),
                "amount": int((random.random() * 500000 + 50000) / 100) * 100,
            },
            "model_contributions": [
                {
                    "feature": "vendor_tenure_months",
                    "value": int(random.random() * 60),
                    "contribution": round(random.random() * 0.5, 3),
                }
            ],
        })
    
    return {
        "status": "limited",
        "weights": {
            "criteria": ["urgency", "relationship", "amount"],
            "weights": [0.4, 0.35, 0.25],
        },
        "data": data,
    }

def generate_mock_action_draft(vendor: str, amount: float, tone: str = "formal") -> Dict[str, Any]:
    """Generate mock AI action draft"""
    tones = {
        "formal": [
            f"We would like to arrange payment of {amount} for your invoice. Please confirm preferred payment method.",
            f"This confirms our intention to settle the outstanding amount of {amount} with {vendor}.",
            f"We acknowledge our obligation to {vendor} and wish to schedule payment of {amount}.",
        ],
        "friendly": [
            f"Hi {vendor}! We're ready to send over the {amount} payment. What works best for you?",
            f"Hey! Just wanted to touch base about the {amount} invoice – we're good to go whenever you are.",
            f"We're happy to get the {amount} payment sent your way soon. Let us know your preferred method!",
        ],
        "strict": [
            f"This is to notify {vendor} that payment of {amount} is due immediately.",
            f"We must insist on immediate settlement of the {amount} outstanding balance with {vendor}.",
            f"Final notice: {amount} payment to {vendor} is now overdue and requires immediate attention.",
        ],
    }
    
    body = random.choice(tones.get(tone, tones["formal"]))
    
    return {
        "status": "limited",
        "vendor": vendor,
        "draft_subject": f"Payment Communication - {vendor}",
        "draft_body": body,
        "tone": tone,
        "llm_available": False,
    }
