// ─── Base ────────────────────────────────────────────────────────────────────

const DEFAULT_API_BASE_URL = 'http://localhost:8001';

export function getApiBaseUrl(): string {
  return (import.meta as any).env?.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
}

// Track if we're in fallback mode (API unavailable)
let apiFallbackMode = false;
let lastApiError: string | null = null;

export function isApiInFallback(): boolean {
  return apiFallbackMode;
}

export function getLastApiError(): string | null {
  return lastApiError;
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = getApiBaseUrl().replace(/\/$/, '');
  const url = `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  
  try {
    const response = await fetch(url, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    });
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`API ${response.status}: ${text || response.statusText}`);
    }
    
    // Success - clear fallback mode
    apiFallbackMode = false;
    lastApiError = null;
    return response.json() as Promise<T>;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.warn(`⚠️ API Request Failed [${path}]: ${errorMsg}. Using fallback data.`);
    
    apiFallbackMode = true;
    lastApiError = errorMsg;
    
    // Re-throw to let individual handlers use fallback
    throw error;
  }
}

export async function fetchJsonWithFallback<T>(
  path: string,
  fallbackFn: () => T,
  init?: RequestInit
): Promise<T> {
  try {
    return await fetchJson<T>(path, init);
  } catch (error) {
    console.log(`📊 Using simulated data for: ${path}`);
    apiFallbackMode = true;
    return fallbackFn();
  }
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
  const { generateMockHealthResponse } = await import('./mockData');
  return fetchJsonWithFallback(
    '/api/health',
    () => generateMockHealthResponse()
  );
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
  const { generateMockForecastState } = await import('./mockData');
  return fetchJsonWithFallback(
    '/api/forecast/state',
    () => generateMockForecastState()
  );
}

// ─── Forecast ────────────────────────────────────────────────────────────────

export type Forecast = {
  data: Array<{ date: string; balance: number; p10: number; p50: number; p90: number }>;
  summary: { min_cash: number; max_cash: number; avg_cash: number; volatility: number };
};

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
  const { generateMockForecastResponse } = await import('./mockData');
  return fetchJsonWithFallback(
    '/api/forecast/',
    () => {
      const mock = generateMockForecastResponse();
      const data: ForecastDay[] = mock.data.data.map((d) => ({
        day: d.date,
        p90: d.p90,
        p50: d.p50,
        p10: d.p10,
        median: d.p50,
      }));

      return {
        status: mock.status,
        data,
        metrics: {
          shortfall_probability: 0.15,
          median_days_to_zero: 999,
          worst_case_zero: 45,
          best_case_zero: 999,
        },
      };
    }
  );
}

// ─── Transactions ────────────────────────────────────────────────────────────

export type Transaction = {
  id: string;
  vendor: string;
  amount: number;
  direction?: string;
  type?: string;
  narration?: string;
  note?: string;
  date: string;
  source: string;
  confidence: number;
  matched?: boolean;
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
  const { generateMockTransactionsResponse } = await import('./mockData');
  return fetchJsonWithFallback(
    '/api/transactions/',
    () => generateMockTransactionsResponse()
  );
}

export async function getReconcileSummary(): Promise<ReconcileSummary> {
  const { generateMockReconcileResponse } = await import('./mockData');
  return fetchJsonWithFallback(
    '/api/transactions/reconcile/summary',
    () => {
      const mock = generateMockReconcileResponse();
      return {
        status: mock.status,
        ingestion_count: mock.data.summary.total_transactions,
        deduplicated_count: mock.data.summary.matched + mock.data.summary.unmatched,
        duplicate_clusters: [],
      };
    }
  );
}

// ─── Invoices ────────────────────────────────────────────────────────────────

export type Invoice = {
  id?: string;
  invoice_id?: string;
  vendor: string;
  amount: number;
  issue_date?: string;
  due_date: string;
  paid_date?: string | null;
  status: string;
  match_confidence: number;
  source?: string;
};

export type InvoiceSummary = {
  status: string;
  total_invoices: number;
  matched: number;
  unmatched: number;
  breakdown: { paid: number; unpaid: number; partial: number };
};

export async function getInvoices(): Promise<{ status: string; data: Invoice[] }> {
  const { generateMockInvoicesResponse } = await import('./mockData');
  return fetchJsonWithFallback(
    '/api/invoices/',
    () => generateMockInvoicesResponse()
  );
}

export async function getInvoiceSummary(): Promise<InvoiceSummary> {
  const { generateMockInvoiceMatchResponse } = await import('./mockData');
  return fetchJsonWithFallback(
    '/api/invoices/match/summary',
    () => {
      const mock = generateMockInvoiceMatchResponse();
      return {
        status: mock.status,
        total_invoices: mock.data.summary.total_invoices,
        matched: mock.data.summary.matched,
        unmatched: mock.data.summary.unmatched,
        breakdown: {
          paid: mock.data.summary.matched,
          unpaid: mock.data.summary.unmatched,
          partial: 0,
        },
      };
    }
  );
}

// ─── Decisions ───────────────────────────────────────────────────────────────

export type ModelContribution = { feature: string; value: number; contribution: number };

export type Decision = {
  id: string;
  vendor: string;
  amount: number;
  due_date: string;
  priority_rank: number;
  delay_probability: number;
  relationship_damage_score: number;
  financial_impact: number;
  recommendation: string;
  days_overdue?: number;
  topsis_score?: number;
  rank?: number;
  explanation?: string[];
  features?: Record<string, number>;
  model_contributions?: ModelContribution[];
};

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
  const { generateMockDecisionsResponse } = await import('./mockData');
  return fetchJsonWithFallback(
    '/api/decisions/ranking',
    () => {
      const mock = generateMockDecisionsResponse();
      const obligations: Obligation[] = mock.data.ranking.map((d) => ({
        id: d.id,
        vendor: d.vendor,
        amount: d.amount,
        due_date: d.due_date,
        days_overdue: d.days_overdue ?? 0,
        delay_probability: d.delay_probability,
        topsis_score: d.topsis_score ?? 0,
        rank: d.rank ?? d.priority_rank,
        recommendation: d.recommendation,
        explanation: d.explanation ?? [],
        features: d.features ?? {},
        model_contributions: d.model_contributions ?? [],
      }));

      return {
        status: mock.status,
        weights: {
          criteria: ['urgency', 'amount', 'relationship'],
          weights: [0.5, 0.3, 0.2],
        },
        data: obligations,
      };
    }
  );
}

export async function getScenarios(): Promise<ScenariosResponse> {
  const { generateMockDecisionsResponse } = await import('./mockData');
  return fetchJsonWithFallback(
    '/api/decisions/scenarios',
    () => {
      generateMockDecisionsResponse();
      return {
        status: 'limited',
        data: [{ strategy: 'auto', cash_remaining_day_30: 2000000, total_penalty: 5000, probability_hitting_zero: 0.1, relationship_damage_score: 20, score: 85 }],
        recommended: { strategy: 'auto', cash_remaining_day_30: 2000000, total_penalty: 5000, probability_hitting_zero: 0.1, relationship_damage_score: 20, score: 85 },
      };
    }
  );
}

// ─── Actions ─────────────────────────────────────────────────────────────────

export type ActionDraftRequest = {
  vendor_name: string;
  amount: number;
  context: string;
  relationship_tenure_months?: number;
  tone?: string;
};

export type ActionDraft = {
  id: string;
  vendor: string;
  amount: number;
  tone: string;
  subject: string;
  body: string;
  created_at: string;
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
  const { generateMockActionResponse } = await import('./mockData');
  return fetchJsonWithFallback(
    '/api/actions/generate_draft',
    () => {
      const draft = generateMockActionResponse(req.vendor_name, req.amount, req.tone || 'formal');
      return {
        status: draft.status,
        vendor: draft.data.vendor,
        draft_subject: draft.data.subject,
        draft_body: draft.data.body,
        tone: draft.data.tone,
        llm_available: false,
      };
    },
    { method: 'POST', body: JSON.stringify(req) }
  );
}

export async function getLLMStatus(): Promise<LLMStatus> {
  return fetchJsonWithFallback(
    '/api/actions/llm_status',
    () => ({ llm_available: false })
  );
}
