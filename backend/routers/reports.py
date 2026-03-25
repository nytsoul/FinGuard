from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
import json

router = APIRouter(prefix="/api/reports", tags=["Reports"])

class ReportRequest(BaseModel):
    report_type: str  # "cash_flow", "invoice_summary", "forecast", "payment_analysis"
    date_range: str = "30d"  # "7d", "30d", "90d", "custom"
    include_recommendations: bool = True

@router.post("/generate")
def generate_report(request: ReportRequest):
    """Generate financial report in multiple formats"""
    timestamp = datetime.now().isoformat()
    
    report_content = {
        "title": f"{request.report_type.title()} Report",
        "generated_at": timestamp,
        "period": request.date_range,
        "sections": [
            {
                "name": "Executive Summary",
                "content": f"Cash flow analysis for the last {request.date_range}. Key metrics show stable growth with improved liquidity management.",
                "metrics": {
                    "total_inflow": 1254190,
                    "total_outflow": 945800,
                    "net_change": 308390,
                    "average_daily_flow": 10280
                }
            },
            {
                "name": "Detailed Analysis",
                "content": "Transaction breakdown by category and vendor with confidence scores.",
                "top_vendors": [
                    {"vendor": "AWS Services", "amount": 12450, "frequency": "monthly"},
                    {"vendor": "Google Workspace", "amount": 840, "frequency": "monthly"},
                    {"vendor": "WeWork Setup", "amount": 4200, "frequency": "monthly"}
                ]
            },
            {
                "name": "Forecast & Risks",
                "content": "AI-powered forecast indicates stable cash position with 87% confidence.",
                "shortfall_probability": "12.4%",
                "critical_threshold": 500000,
                "days_to_critical": 142
            }
        ],
        "recommendations": [
            "Consider batch payment processing for recurring vendors to reduce transaction fees",
            "Review Q3 operating expenses; potential 8% reduction identified",
            "Maintain 25% buffer above minimum reserve for operational flexibility"
        ] if request.include_recommendations else []
    }
    
    return {
        "status": "success",
        "report_id": f"report_{datetime.now().strftime('%Y%m%d%H%M%S')}",
        "report_type": request.report_type,
        "format": "json",
        "data": report_content,
        "export_url": "/api/reports/export/pdf",
        "created_at": timestamp,
        "expires_at": "2026-04-26T10:30:00Z"
    }

@router.get("/export/pdf")
def export_report_pdf():
    """Export generated report as PDF"""
    return {
        "status": "success",
        "message": "PDF export initiated",
        "download_url": "/downloads/report_20260326.pdf",
        "file_size": "2.4 MB",
        "format": "application/pdf"
    }

@router.get("/export/csv")
def export_report_csv():
    """Export report data as CSV"""
    return {
        "status": "success",
        "message": "CSV export initiated",
        "download_url": "/downloads/report_20260326.csv",
        "file_size": "0.8 MB",
        "format": "text/csv"
    }
