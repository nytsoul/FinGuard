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
