const DEFAULT_API_BASE_URL = 'http://localhost:8000';

export function getApiBaseUrl(): string {
  return (import.meta as any).env?.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
}

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
}
