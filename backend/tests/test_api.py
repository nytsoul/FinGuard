from fastapi.testclient import TestClient

from main import app


client = TestClient(app)


def test_forecast_contract():
    res = client.get("/api/forecast/")
    assert res.status_code == 200
    payload = res.json()
    assert payload["status"] == "success"
    assert isinstance(payload["data"], list)
    assert len(payload["data"]) == 30
    assert {"shortfall_probability", "median_days_to_zero", "worst_case_zero", "best_case_zero"}.issubset(
        payload["metrics"].keys()
    )


def test_transactions_feed_shape():
    res = client.get("/api/transactions/")
    assert res.status_code == 200
    rows = res.json()
    assert isinstance(rows, list)
    assert len(rows) > 0
    sample = rows[0]
    assert {"id", "vendor", "amount", "date", "category", "source_account", "status", "match_confidence"}.issubset(
        sample.keys()
    )


def test_reconciliation_summary():
    res = client.get("/api/transactions/reconcile/summary")
    assert res.status_code == 200
    payload = res.json()
    assert payload["status"] == "success"
    assert payload["ingestion_count"] >= payload["deduplicated_count"]

    matches_res = client.get("/api/transactions/reconcile/matches")
    assert matches_res.status_code == 200
    matches_payload = matches_res.json()
    assert matches_payload["status"] == "success"
    assert "matches" in matches_payload["data"]


def test_decision_ranking_and_scenarios():
    rank_res = client.get("/api/decisions/ranking")
    assert rank_res.status_code == 200
    rank_payload = rank_res.json()
    assert rank_payload["status"] == "success"
    assert rank_payload["weights"]["is_valid"] is True
    assert len(rank_payload["data"]) > 0

    scenario_res = client.get("/api/decisions/scenarios")
    assert scenario_res.status_code == 200
    scenario_payload = scenario_res.json()
    assert scenario_payload["status"] == "success"
    assert len(scenario_payload["data"]) >= 3
    assert scenario_payload["recommended"] is not None

    model_res = client.get("/api/decisions/model")
    assert model_res.status_code == 200
    model_payload = model_res.json()
    assert model_payload["status"] == "success"
    assert "payment_delay_model" in model_payload["data"]


def test_actions_and_payments():
    draft_res = client.post(
        "/api/actions/generate_draft",
        json={
            "vendor_name": "Sharma Traders",
            "amount": 45000,
            "context": "Request extension",
            "relationship_tenure_months": 30,
            "tone": "respectful",
        },
    )
    assert draft_res.status_code == 200
    draft_payload = draft_res.json()
    assert draft_payload["status"] == "success"
    assert "draft_subject" in draft_payload
    assert "draft_body" in draft_payload

    payment_res = client.post(
        "/api/payments/create_order",
        json={"vendor": "Global Logistics", "amount": 42300, "currency": "INR", "scenario": "priority_first"},
    )
    assert payment_res.status_code == 200
    payment_payload = payment_res.json()
    assert payment_payload["status"] == "success"
    assert payment_payload["mode"] == "sandbox"
    assert payment_payload["provider"] == "razorpay"
    assert payment_payload["amount"] == 4230000

    verification_res = client.post(
        "/api/payments/verify_signature",
        json={
            "order_id": "order_123",
            "payment_id": "pay_123",
            "signature": "bad_signature",
            "signature_secret": "test_secret",
        },
    )
    assert verification_res.status_code == 200
    verification_payload = verification_res.json()
    assert verification_payload["status"] == "success"
    assert verification_payload["verified"] is False


def test_health_endpoint():
    """Health endpoint must return model info, pipeline cache info, and architecture."""
    res = client.get("/api/health")
    assert res.status_code == 200
    payload = res.json()
    assert payload["status"] == "ok"
    assert "model" in payload
    assert "type" in payload["model"]
    assert "shap_available" in payload["model"]
    assert "pipeline" in payload
    assert "data" in payload
    assert "architecture" in payload
    assert len(payload["architecture"]["layers"]) == 10


def test_invoices_endpoint():
    """Invoices endpoint must return list (previously crashed due to Supabase dependency)."""
    res = client.get("/api/invoices/")
    assert res.status_code == 200
    payload = res.json()
    assert payload["status"] == "success"
    assert isinstance(payload["data"], list)
    assert len(payload["data"]) > 0
    sample = payload["data"][0]
    assert "invoice_id" in sample
    assert "vendor" in sample
    assert "amount" in sample

    # Also check match summary
    summary_res = client.get("/api/invoices/match/summary")
    assert summary_res.status_code == 200
    summary = summary_res.json()
    assert summary["status"] == "success"
    assert "total_invoices" in summary
    assert "breakdown" in summary


def test_llm_action_has_llm_flag():
    """Action draft must include llm_available flag so frontend can show badge."""
    res = client.post(
        "/api/actions/generate_draft",
        json={
            "vendor_name": "Prime Realty",
            "amount": 88000,
            "context": "Request 15-day extension",
            "relationship_tenure_months": 18,
            "tone": "respectful",
        },
    )
    assert res.status_code == 200
    payload = res.json()
    assert payload["status"] == "success"
    assert "draft_subject" in payload
    assert "draft_body" in payload
    # This key must be present so the frontend can show "Claude-powered" vs "template"
    assert "llm_available" in payload

    # LLM status endpoint
    status_res = client.get("/api/actions/llm_status")
    assert status_res.status_code == 200
    status = status_res.json()
    assert "llm_available" in status


def test_ingest_endpoint():
    """Ingest endpoint must accept transactions and report cache invalidation."""
    res = client.post(
        "/api/ingest/",
        json={
            "source": "manual",
            "transactions": [
                {
                    "id": "test-manual-001",
                    "amount": 25000.0,
                    "direction": "debit",
                    "narration": "Test purchase",
                    "vendor": "Test Vendor Ltd",
                    "date": "2026-03-20",
                    "reference": "TEST-001",
                }
            ],
            "replace": True,
        },
    )
    assert res.status_code == 200
    payload = res.json()
    assert payload["status"] == "success"
    assert payload["records_received"] == 1
    assert payload["cache_invalidated"] is True

    # Status check
    status_res = client.get("/api/ingest/status")
    assert status_res.status_code == 200
    status = status_res.json()
    assert status["total"] >= 1

    # Cleanup
    clear_res = client.delete("/api/ingest/")
    assert clear_res.status_code == 200

