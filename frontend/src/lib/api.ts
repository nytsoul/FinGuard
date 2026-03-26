// ─── Base ────────────────────────────────────────────────────────────────────

const DEFAULT_API_BASE_URL = 'http://localhost:8001';

export function getApiBaseUrl(): string {
  return (import.meta as any).env?.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = getApiBaseUrl().replace(/\/$/, '');
  const url = `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  const response = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
  });
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`API ${response.status}: ${text || response.statusText}`);
  }
  return response.json() as Promise<T>;
}

// ─── Health ──────────────────────────────────────────────────────────────────

export type HealthResponse = {
  status: string;
  version: string;
  model: { type: string; available: boolean; shap_available: boolean; training_data_source: string };
  pipeline: { cached: boolean; cache_age_seconds: number | null; last_run_time_seconds: number | null };
  data: { has_external_datasets: boolean; source: string };
  architecture: { layers: string[] };
};

export async function getHealth(): Promise<HealthResponse> {
  return fetchJson<HealthResponse>('/api/health');
}

// ─── Financial State ─────────────────────────────────────────────────────────

export type FinancialState = {
  current_cash_balance: number;
  accounts_payable: number;
  accounts_receivable_weighted: number;
  monthly_burn_rate: number;
  monthly_inflow: number;
  working_capital: number;
  days_to_zero_runway: number;
};

export async function getFinancialState(): Promise<{ status: string; data: FinancialState }> {
  return fetchJson('/api/forecast/state');
}

// ─── Forecast ────────────────────────────────────────────────────────────────

export type ForecastDay = { day: string; p90: number; p50: number; p10: number; median: number };

export type ForecastMetrics = {
  shortfall_probability: number;
  median_days_to_zero: number;
  worst_case_zero: number;
  best_case_zero: number;
};

export type ForecastResponse = {
  status: string;
  data: ForecastDay[];
  metrics: ForecastMetrics;
};

export async function getForecast(): Promise<ForecastResponse> {
  return fetchJson<ForecastResponse>('/api/forecast/');
}

// ─── Transactions ────────────────────────────────────────────────────────────

export type Transaction = {
  id: string;
  vendor: string;
  amount: number;
  direction: string;
  narration: string;
  date: string;
  source: string;
  confidence: number;
  reference?: string;
};

export type ReconcileSummary = {
  status: string;
  ingestion_count: number;
  deduplicated_count: number;
  duplicate_clusters: Array<{
    duplicate_id: string;
    kept_id: string;
    vendor: string;
    amount: number;
    confidence: number;
    reason: string;
  }>;
};

export async function getTransactions(): Promise<{ status: string; data: Transaction[] }> {
  return fetchJson('/api/transactions/');
}

export async function getReconcileSummary(): Promise<ReconcileSummary> {
  return fetchJson('/api/transactions/reconcile/summary');
}

// ─── Invoices ────────────────────────────────────────────────────────────────

export type Invoice = {
  invoice_id: string;
  vendor: string;
  amount: number;
  due_date: string;
  status: string;
  match_confidence: number;
  source: string;
};

export type InvoiceSummary = {
  status: string;
  total_invoices: number;
  matched: number;
  unmatched: number;
  breakdown: { paid: number; unpaid: number; partial: number };
};

export async function getInvoices(): Promise<{ status: string; data: Invoice[] }> {
  return fetchJson('/api/invoices/');
}

export async function getInvoiceSummary(): Promise<InvoiceSummary> {
  return fetchJson('/api/invoices/match/summary');
}

// ─── Decisions ───────────────────────────────────────────────────────────────

export type ModelContribution = { feature: string; value: number; contribution: number };

export type Obligation = {
  id: string;
  vendor: string;
  amount: number;
  due_date: string;
  days_overdue: number;
  delay_probability: number;
  topsis_score: number;
  rank: number;
  recommendation: string;
  explanation: string[];
  features: Record<string, number>;
  model_contributions: ModelContribution[];
};

export type DecisionRankingResponse = {
  status: string;
  weights: { criteria: string[]; weights: number[] };
  data: Obligation[];
};

export type ScenarioResult = {
  strategy: string;
  cash_remaining_day_30: number;
  total_penalty: number;
  probability_hitting_zero: number;
  relationship_damage_score: number;
  score: number;
};

export type ScenariosResponse = {
  status: string;
  data: ScenarioResult[];
  recommended: ScenarioResult;
};

export async function getDecisionRanking(): Promise<DecisionRankingResponse> {
  return fetchJson('/api/decisions/ranking');
}

export async function getScenarios(): Promise<ScenariosResponse> {
  return fetchJson('/api/decisions/scenarios');
}

// ─── Actions ─────────────────────────────────────────────────────────────────

export type ActionDraftRequest = {
  vendor_name: string;
  amount: number;
  context: string;
  relationship_tenure_months?: number;
  tone?: string;
};

export type ActionDraftResponse = {
  status: string;
  vendor: string;
  draft_subject: string;
  draft_body: string;
  tone: string;
  llm_available: boolean;
};

export type LLMStatus = { llm_available: boolean; model?: string };

export async function generateActionDraft(req: ActionDraftRequest): Promise<ActionDraftResponse> {
  return fetchJson('/api/actions/generate_draft', {
    method: 'POST',
    body: JSON.stringify(req),
  });
}

export async function getLLMStatus(): Promise<LLMStatus> {
  return fetchJson('/api/actions/llm_status');
}
