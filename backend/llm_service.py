"""LLM service layer for action generation (final layer only)."""

from __future__ import annotations

import os
from typing import Dict

import requests


class LLMService:
    """Wrapper for Claude API (final layer: converts structured decision to message)."""

    def __init__(self):
        self.api_key = os.getenv("ANTHROPIC_API_KEY", "").strip()
        self.api_base = "https://api.anthropic.com/v1"
        self.model = "claude-3-5-sonnet-20241022"
        self.available = bool(self.api_key)

    def generate_payment_message(
        self,
        vendor_name: str,
        amount: float,
        decision: str,
        relationship_tenure_months: int,
        tone: str = "professional",
    ) -> Dict[str, str]:
        """Generate payment request message using Claude LLM.

        Args:
            vendor_name: Name of vendor to contact
            amount: Amount owed in INR
            decision: Decision from pipeline (e.g., "Request 15-day extension", "Pay 70% now")
            relationship_tenure_months: Months of relationship history
            tone: Tone of message (professional, respectful, formal, friendly)

        Returns:
            Dict with keys:
            - draft_subject: Email subject line
            - draft_body: Email body (multi-line)
            - tone: Confirmed tone
            - llm_available: Whether real LLM was used (vs fallback)
        """
        if not self.available:
            return self._fallback_message(vendor_name, amount, decision, relationship_tenure_months, tone)

        try:
            prompt = f"""You are a finance professional helping an Indian SMB (small business) compose a professional payment request email.

Context:
- Vendor: {vendor_name}
- Amount Owed: ₹{amount:,.2f}
- Business Relationship Duration: {relationship_tenure_months} months
- Proposed Action: {decision}
- Desired Tone: {tone}

Generate a professional {tone} email with:
1. A brief, clear subject line
2. A 3-4 sentence body that:
   - Acknowledges the relationship
   - Proposes the financial decision (e.g., extension, split payment)
   - Requests confirmation
   - Maintains professionalism

Format output as:
SUBJECT: [subject line here]
BODY:
[body text here, exactly 3-4 sentences]

Do not include salutation ("Dear...") or signature ("Regards..."), just deliver subject and body."""

            response = requests.post(
                f"{self.api_base}/messages",
                headers={
                    "x-api-key": self.api_key,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json",
                },
                json={
                    "model": self.model,
                    "max_tokens": 300,
                    "messages": [{"role": "user", "content": prompt}],
                },
                timeout=30,
            )
            response.raise_for_status()

            content = response.json()["content"][0]["text"]
            lines = content.strip().split("\n")
            subject_line = ""
            body_lines = []
            in_body = False

            for line in lines:
                if line.startswith("SUBJECT:"):
                    subject_line = line.replace("SUBJECT:", "").strip()
                elif line.startswith("BODY:"):
                    in_body = True
                elif in_body and line.strip():
                    body_lines.append(line.strip())

            return {
                "draft_subject": subject_line or f"Payment plan for {vendor_name}",
                "draft_body": "\n".join(body_lines) if body_lines else self._fallback_message(vendor_name, amount, decision, relationship_tenure_months, tone)["draft_body"],
                "tone": tone,
                "llm_available": True,
            }
        except Exception as exc:
            return self._fallback_message(vendor_name, amount, decision, relationship_tenure_months, tone, error=str(exc))

    def _fallback_message(
        self,
        vendor_name: str,
        amount: float,
        decision: str,
        relationship_tenure_months: int,
        tone: str = "professional",
        error: str | None = None,
    ) -> Dict[str, str]:
        """Fallback template-based message when LLM is unavailable."""
        subject = f"Payment plan for {vendor_name}"
        body = (
            f"Dear {vendor_name} team,\n\n"
            f"We are writing regarding the outstanding amount of ₹{amount:,.2f}. "
            f"Based on our current financial planning, we propose the following: {decision}. "
            f"We value our {relationship_tenure_months}-month business relationship and would like to align this with your expectations.\n\n"
            f"Please confirm if this arrangement works for you.\n\n"
            f"Regards,\nFinance Team"
        )
        return {
            "draft_subject": subject,
            "draft_body": body,
            "tone": tone,
            "llm_available": False,
            "fallback_reason": error or "API key not configured",
        }


# Singleton instance
_llm_service = None


def get_llm_service() -> LLMService:
    """Get or create LLM service singleton."""
    global _llm_service
    if _llm_service is None:
        _llm_service = LLMService()
    return _llm_service
