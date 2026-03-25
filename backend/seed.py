import os
from database import get_supabase
from dotenv import load_dotenv

load_dotenv()

def seed_database():
    print("Seeding database...")
    supabase = get_supabase()
    
    # 1. Transactions
    transactions = [
        {"vendor": "AWS Services", "amount": 12450.00, "date": "2023-10-12", "category": "Infrastructure", "source_account": "HDFC Current", "status": "Pending", "match_confidence": 0.98},
        {"vendor": "Google Workspace", "amount": 840.00, "date": "2023-10-13", "category": "Software", "source_account": "ICICI Credit", "status": "Cleared", "match_confidence": 0.99},
        {"vendor": "WeWork Setup", "amount": 4200.00, "date": "2023-10-15", "category": "Real Estate", "source_account": "HDFC Current", "status": "Review", "match_confidence": 0.65},
    ]
    print("Inserting transactions...")
    supabase.table("transactions").insert(transactions).execute()
    
    # 2. Invoices
    invoices = [
        {"vendor": "Amazon Web Services", "amount": 12450.00, "due_date": "2023-10-12", "type": "payable", "status": "Pending Approval", "topsis_rank": 1, "confidence_score": 0.94},
        {"vendor": "Slack Technologies", "amount": 4200.00, "due_date": "2023-10-28", "type": "payable", "status": "Scheduled", "topsis_rank": 4, "confidence_score": 0.72},
        {"vendor": "Horizon Retail Group", "amount": 45000.00, "due_date": "2023-11-12", "type": "receivable", "status": "Expected", "topsis_rank": 0, "confidence_score": 0.95},
    ]
    print("Inserting invoices...")
    supabase.table("invoices").insert(invoices).execute()
    
    print("Database seeded successfully!")

if __name__ == "__main__":
    try:
        seed_database()
    except Exception as e:
        print(f"Error seeding database: {e}")
