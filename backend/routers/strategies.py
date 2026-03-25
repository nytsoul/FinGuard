from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(prefix="/api/strategies", tags=["Strategies"])

class MitarionStrategyRequest(BaseModel):
    scenario: str = "current"  # "current", "pessimistic", "optimistic"

@router.get("/mitigation")
def get_mitigation_strategy(scenario: str = "current"):
    """Get AI-recommended mitigation strategy based on cash flow scenario"""
    
    strategies = {
        "current": {
            "risk_level": "moderate",
            "cash_position": "healthy",
            "days_to_critical": 142,
            "shortfall_probability": 0.124,
            "recommendations": [
                {
                    "priority": "high",
                    "action": "Accelerate Receivables",
                    "description": "Implement early payment discounts (2% for 10 days) to accelerate $45k expected receivable from Horizon Retail Group",
                    "impact": "Improve cash position by $44,100 within 10 days",
                    "effort": "Low",
                    "timeline": "Immediate"
                },
                {
                    "priority": "high",
                    "action": "Defer Non-Critical Expenses",
                    "description": "Postpone marketing and office supply spending ($2,400/month) to Q2",
                    "impact": "Free up $2,400 monthly, cumulative $7,200 by June",
                    "effort": "Medium",
                    "timeline": "2-3 days"
                },
                {
                    "priority": "medium",
                    "action": "Renegotiate Payment Terms",
                    "description": "Extend AWS and Google Workspace payment terms from NET30 to NET45",
                    "impact": "Improve working capital by ~$13,000",
                    "effort": "Medium",
                    "timeline": "1-2 weeks"
                },
                {
                    "priority": "medium",
                    "action": "Secure Credit Facility",
                    "description": "Establish $50k working capital credit line for emergency liquidity",
                    "impact": "Reduce shortfall risk from 12.4% to 2.1%",
                    "effort": "High",
                    "timeline": "2-4 weeks"
                },
                {
                    "priority": "low",
                    "action": "Optimize Payment Processing",
                    "description": "Batch payments by vendor to reduce transaction fees (~$120/month)",
                    "impact": "Save $1,440 annually",
                    "effort": "Low",
                    "timeline": "Immediate"
                }
            ],
            "projected_outcome": {
                "current_cash": 1254190,
                "worst_case_60d": 842000,
                "best_case_60d": 1680000,
                "avg_case_60d": 1250000,
                "with_strategy_60d": 1420000
            }
        },
        "pessimistic": {
            "risk_level": "critical",
            "cash_position": "at-risk",
            "days_to_critical": 45,
            "shortfall_probability": 0.65,
            "recommendations": [
                {
                    "priority": "critical",
                    "action": "Activate Emergency Credit Facility",
                    "description": "Draw full $50k working capital line immediately",
                    "impact": "Extend runway by 60+ days",
                    "effort": "Low",
                    "timeline": "Same day"
                },
                {
                    "priority": "critical",
                    "action": "Halt Non-Essential Spending",
                    "description": "Freeze all discretionary spending (marketing, office supplies, professional services)",
                    "impact": "Save $18,000 monthly",
                    "effort": "High (operational impact)",
                    "timeline": "Immediate"
                },
                {
                    "priority": "high",
                    "action": "Emergency Receivables Collection",
                    "description": "Contact all debtors; offer 3% discount for 48-hour payment",
                    "impact": "Recover $45k within 48 hours",
                    "effort": "High",
                    "timeline": "24 hours"
                }
            ]
        },
        "optimistic": {
            "risk_level": "low",
            "cash_position": "excellent",
            "days_to_critical": 240,
            "shortfall_probability": 0.02,
            "recommendations": [
                {
                    "priority": "low",
                    "action": "Increase Revenue Activities",
                    "description": "Pursue expansion opportunities; invest in growth initiatives",
                    "impact": "Potential 15-20% revenue growth",
                    "effort": "Medium",
                    "timeline": "Ongoing"
                },
                {
                    "priority": "low",
                    "action": "Optimize Debt Strategy",
                    "description": "Consider refinancing high-interest debt at lower rates",
                    "impact": "Save $3,600 annually in interest",
                    "effort": "Low",
                    "timeline": "30 days"
                }
            ]
        }
    }
    
    strategy = strategies.get(scenario, strategies["current"])
    
    return {
        "status": "success",
        "scenario": scenario,
        "generated_at": datetime.now().isoformat(),
        "strategy": strategy,
        "summary": f"Based on {scenario} scenario with {strategy['risk_level']} risk level. {len(strategy['recommendations'])} recommendations provided.",
        "next_review_date": "2026-04-26T10:30:00Z"
    }

@router.post("/scenario_analysis")
def scenario_analysis(scenario: MitarionStrategyRequest):
    """Analyze cash flow under different scenarios"""
    
    scenarios = {
        "current": {"sales_change": 0, "expense_change": 0},
        "pessimistic": {"sales_change": -20, "expense_change": 10},
        "optimistic": {"sales_change": 20, "expense_change": -5}
    }
    
    config = scenarios.get(scenario.scenario, scenarios["current"])
    
    return {
        "status": "success",
        "scenario": scenario.scenario,
        "sales_impact": f"{config['sales_change']:+d}%",
        "expense_impact": f"{config['expense_change']:+d}%",
        "cash_position_90d": 1250000,
        "variance": 180000,
        "confidence_score": 0.87,
        "analysis": f"Analysis for {scenario.scenario} scenario completed",
        "timestamp": datetime.now().isoformat()
    }
