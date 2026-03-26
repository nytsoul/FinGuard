<<<<<<< HEAD
const DEFAULT_API_BASE_URL = 'http://localhost:8000';
=======
// ─── Base ────────────────────────────────────────────────────────────────────

const DEFAULT_API_BASE_URL = 'http://localhost:8001';
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23

export function getApiBaseUrl(): string {
  return (import.meta as any).env?.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
}

<<<<<<< HEAD
export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = getApiBaseUrl().replace(/\/$/, '');
  const url = `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;

  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    }
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`API ${response.status}: ${text || response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export type Transaction = {
  id?: string;
  vendor: string;
  amount: number;
  date: string; // YYYY-MM-DD
  category?: string;
  source_account?: string;
  status?: string;
  match_confidence?: number;
};

export async function getTransactions(): Promise<Transaction[]> {
  return fetchJson<Transaction[]>('/api/transactions/');
}

export type ForecastApiResponse = {
  status: string;
  data: Array<{
    day: string;
    p90: number;
    p50: number;
    p10: number;
    median: number;
  }>;
  metrics: {
    shortfall_probability: number;
    median_days_to_zero: number;
    worst_case_zero: number;
    best_case_zero: number;
  };
};

export async function getForecast(): Promise<ForecastApiResponse> {
  return fetchJson<ForecastApiResponse>('/api/forecast/');
}

// Reports API
export async function generateReport(reportType: string, dateRange: string = '30d') {
  return fetchJson('/api/reports/generate', {
    method: 'POST',
    body: JSON.stringify({ report_type: reportType, date_range: dateRange, include_recommendations: true })
  });
}

export async function exportReportPdf() {
  return fetchJson('/api/reports/export/pdf');
}

// Imports API
export async function importCsv(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  const baseUrl = getApiBaseUrl().replace(/\/$/, '');
  const response = await fetch(`${baseUrl}/api/imports/csv`, {
    method: 'POST',
    body: formData
  });
  
  if (!response.ok) {
    throw new Error(`Import failed: ${response.statusText}`);
  }
  
  return response.json();
}

// Strategies API
export async function getMitigationStrategy(scenario: string = 'current') {
  return fetchJson(`/api/strategies/mitigation?scenario=${scenario}`);
}

// Payments API
export async function executePayment(vendor: string, amount: number, invoiceId: string, paymentMethod: string = 'bank_transfer') {
  return fetchJson('/api/payments/execute', {
    method: 'POST',
    body: JSON.stringify({ vendor, amount, invoice_id: invoiceId, payment_method: paymentMethod })
  });
}

export async function getPaymentHistory(limit: number = 20, offset: number = 0) {
  return fetchJson(`/api/payments/history?limit=${limit}&offset=${offset}`);
}

// Actions API
export async function sendEmail(recipient: string, subject: string, body: string) {
  return fetchJson('/api/actions/send_email', {
    method: 'POST',
    body: JSON.stringify({ recipient, subject, body })
  });
}

export async function sendWhatsApp(phoneNumber: string, message: string) {
  return fetchJson('/api/actions/send_whatsapp', {
    method: 'POST',
    body: JSON.stringify({ phone_number: phoneNumber, message })
  });
}

export async function generateAiTransactionDraft(transactionType: string, amount: number, category: string, context: string) {
  return fetchJson('/api/actions/ai_draft_transaction', {
    method: 'POST',
    body: JSON.stringify({ transaction_type: transactionType, amount, category, context })
  });
}

export type BackendPreferences = {
  user_id: string;
  notifications: {
    email_notifications: boolean;
    sms_notifications: boolean;
    push_notifications: boolean;
    email_frequency: 'immediate' | 'daily' | 'weekly';
    invoice_alerts: boolean;
    payment_reminders: boolean;
    cash_flow_alerts: boolean;
    vendor_alerts: boolean;
  };
  display: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    date_format: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
    currency_format: string;
    items_per_page: number;
  };
  financial: {
    default_payment_term: number;
    budget_warning_threshold: number;
    auto_payment_enabled: boolean;
    auto_payment_threshold: number;
    reconciliation_method: 'manual' | 'auto' | 'semi-auto';
    tax_calculation: 'GST' | 'VAT' | 'NONE';
  };
};

export async function getUserPreferences(userId: string): Promise<BackendPreferences> {
  return fetchJson<BackendPreferences>(`/api/preferences/user/${userId}`);
}

export async function saveUserPreferences(userId: string, payload: BackendPreferences): Promise<BackendPreferences> {
  return fetchJson<BackendPreferences>(`/api/preferences/user/${userId}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
=======
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
    () => generateMockForecastResponse()
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
    () => generateMockReconcileResponse()
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
    () => generateMockInvoiceMatchResponse()
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
    () => generateMockDecisionsResponse()
  );
}

export async function getScenarios(): Promise<ScenariosResponse> {
  const { generateMockDecisionsResponse } = await import('./mockData');
  return fetchJsonWithFallback(
    '/api/decisions/scenarios',
    () => {
      const decisions = generateMockDecisionsResponse();
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
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
}
