/**
 * Mock Data Generator - Realistic Financial Data Fallback
 * 
 * Generates plausible financial data when API endpoints fail.
 * All data is randomized within realistic business parameters.
 */

import type { FinancialState, Forecast, Transaction, Invoice, Decision, ActionDraft } from './api';

// ─── Realistic Financial Data Generators ─────────────────────────────────────

export function generateMockFinancialState(): FinancialState {
  const baseCash = 2500000 + Math.random() * 500000;
  const monthlyBurn = 250000 + Math.random() * 100000;
  const monthlyInflow = 350000 + Math.random() * 150000;
  
  return {
    current_cash_balance: Math.round(baseCash),
    accounts_payable: Math.round(450000 + Math.random() * 200000),
    accounts_receivable_weighted: Math.round(600000 + Math.random() * 300000),
    monthly_burn_rate: Math.round(monthlyBurn),
    monthly_inflow: Math.round(monthlyInflow),
    working_capital: Math.round(baseCash - 450000),
    days_to_zero_runway: Math.round(45 + Math.random() * 30),
  };
}

export function generateMockForecast(): Forecast {
  const today = new Date();
  const days = [];
  let balance = 2500000;
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    // Simulate daily cash movements
    const inflow = Math.random() > 0.6 ? Math.random() * 100000 : 0;
    const outflow = Math.random() > 0.7 ? Math.random() * 80000 : 0;
    balance = balance + inflow - outflow;
    
    days.push({
      date: date.toISOString().split('T')[0],
      balance: Math.round(balance),
      p10: Math.round(balance * 0.95),
      p50: Math.round(balance),
      p90: Math.round(balance * 1.05),
    });
  }

  return {
    data: days,
    summary: {
      min_cash: Math.min(...days.map((d) => d.p10)),
      max_cash: Math.max(...days.map((d) => d.p90)),
      avg_cash: Math.round(days.reduce((sum, d) => sum + d.balance, 0) / days.length),
      volatility: Math.round(Math.random() * 5 + 2), // 2-7% daily volatility
    },
  };
}

const VENDORS = [
  'Acme Corp',
  'Global Supplies Ltd',
  'Tech Partners Inc',
  'First Choice Vendors',
  'Premium Services',
  'Quality Materials Co',
  'Innovation Systems',
  'Trusted Partners LLC',
];

const PAYMENT_SOURCES = ['UPI', 'Bank Transfer', 'Card', 'Cheque', 'Cash'];

export function generateMockTransactions(count: number = 50): Transaction[] {
  const transactions: Transaction[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - Math.floor(Math.random() * 90));

    transactions.push({
      id: `TXN-${String(i + 1).padStart(6, '0')}`,
      date: date.toISOString().split('T')[0],
      vendor: VENDORS[Math.floor(Math.random() * VENDORS.length)],
      amount: Math.round((Math.random() * 500000 + 10000) / 100) * 100,
      source: PAYMENT_SOURCES[Math.floor(Math.random() * PAYMENT_SOURCES.length)],
      type: Math.random() > 0.5 ? 'outflow' : 'inflow',
      confidence: Math.round((Math.random() * 0.3 + 0.7) * 100),
      note: `Simulated transaction ${i + 1}`,
      matched: Math.random() > 0.3,
    });
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function generateMockInvoices(count: number = 20): Invoice[] {
  const invoices: Invoice[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const issueDate = new Date(today);
    issueDate.setDate(issueDate.getDate() - Math.floor(Math.random() * 60));
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + 30);

    const isPaid = Math.random() > 0.4;
    const paidDate = isPaid
      ? new Date(issueDate)
      : null;
    if (paidDate) {
      paidDate.setDate(paidDate.getDate() + Math.floor(Math.random() * 45));
    }

    invoices.push({
      id: `INV-${String(i + 1).padStart(6, '0')}`,
      vendor: VENDORS[Math.floor(Math.random() * VENDORS.length)],
      amount: Math.round((Math.random() * 800000 + 50000) / 100) * 100,
      issue_date: issueDate.toISOString().split('T')[0],
      due_date: dueDate.toISOString().split('T')[0],
      paid_date: paidDate ? paidDate.toISOString().split('T')[0] : null,
      status: isPaid ? 'paid' : 'pending',
      match_confidence: Math.round(Math.random() * 0.3 + 0.65),
    });
  }

  return invoices;
}

export function generateMockDecisions(count: number = 10): Decision[] {
  const decisions: Decision[] = [];

  for (let i = 0; i < count; i++) {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 30));

    decisions.push({
      id: `DEC-${String(i + 1).padStart(6, '0')}`,
      vendor: VENDORS[Math.floor(Math.random() * VENDORS.length)],
      amount: Math.round((Math.random() * 500000 + 50000) / 100) * 100,
      due_date: dueDate.toISOString().split('T')[0],
      priority_rank: i + 1,
      delay_probability: Math.round(Math.random() * 0.4 * 100),
      relationship_damage_score: Math.round(Math.random() * 50),
      financial_impact: Math.round(Math.random() * 100),
      recommendation: i % 3 === 0 ? 'pay_now' : i % 3 === 1 ? 'pay_early' : 'pay_on_time',
    });
  }

  return decisions;
}

export function generateMockActionDraft(vendor: string, amount: number, tone: string = 'formal'): ActionDraft {
  const tones: Record<string, string[]> = {
    formal: [
      `We would like to arrange payment of ${amount} for your invoice. Please confirm preferred payment method.`,
      `This confirms our intention to settle the outstanding amount of ${amount} with ${vendor}. Kindly provide payment instructions.`,
      `We acknowledge our obligation to ${vendor} and wish to schedule payment of ${amount}.`,
    ],
    friendly: [
      `Hi ${vendor}! We're ready to send over the ${amount} payment. What works best for you?`,
      `Hey! Just wanted to touch base about the ${amount} invoice – we're good to go whenever you are.`,
      `We're happy to get the ${amount} payment sent your way soon. Let us know your preferred method!`,
    ],
    strict: [
      `This is to notify ${vendor} that payment of ${amount} is due immediately.`,
      `We must insist on immediate settlement of the ${amount} outstanding balance with ${vendor}.`,
      `Final notice: ${amount} payment to ${vendor} is now overdue and requires immediate attention.`,
    ],
  };

  const selectedTones = tones[tone] || tones.formal;

  return {
    id: `ACT-${Date.now()}`,
    vendor,
    amount,
    tone,
    subject: `Payment Communication - ${vendor}`,
    body: selectedTones[Math.floor(Math.random() * selectedTones.length)],
    created_at: new Date().toISOString(),
  };
}

// ─── Complete Response Objects ───────────────────────────────────────────────

export function generateMockHealthResponse() {
  return {
    status: 'healthy',
    version: '2.4.0',
    mode: 'fallback_mode',
    model: {
      type: 'XGBoost Payment Delay Predictor',
      available: false,
      shap_available: false,
      training_data_source: 'simulated',
    },
    pipeline: {
      cached: true,
      cache_age_seconds: 5,
      last_run_time_seconds: 0.2,
    },
    data: {
      has_external_datasets: false,
      source: 'simulated_fallback',
    },
    architecture: {
      layers: ['data_ingestion', 'forecast_engine', 'decision_ranker', 'action_composer'],
    },
  };
}

export function generateMockForecastState() {
  return {
    status: 'limited',
    message: 'Using simulated data (API unavailable)',
    data: generateMockFinancialState(),
  };
}

export function generateMockForecastResponse() {
  return {
    status: 'limited',
    message: 'Using simulated forecast data',
    data: generateMockForecast(),
  };
}

export function generateMockTransactionsResponse(count: number = 50) {
  return {
    status: 'limited',
    message: 'Using simulated transaction data',
    data: generateMockTransactions(count),
    total: count,
  };
}

export function generateMockReconcileResponse() {
  return {
    status: 'limited',
    message: 'Using simulated reconciliation data',
    data: {
      summary: {
        total_transactions: 50,
        matched: 35,
        unmatched: 15,
        match_rate: 0.7,
      },
      unmatched_transactions: generateMockTransactions(15).filter((t) => !t.matched),
    },
  };
}

export function generateMockInvoicesResponse(count: number = 20) {
  return {
    status: 'limited',
    message: 'Using simulated invoice data',
    data: generateMockInvoices(count),
    total: count,
  };
}

export function generateMockInvoiceMatchResponse() {
  return {
    status: 'limited',
    message: 'Using simulated match data',
    data: {
      summary: {
        total_invoices: 20,
        matched: 15,
        unmatched: 5,
        match_rate: 0.75,
      },
      unmatched_invoices: generateMockInvoices(5),
    },
  };
}

export function generateMockDecisionsResponse() {
  return {
    status: 'limited',
    message: 'Using simulated decision data',
    data: {
      ranking: generateMockDecisions(10),
      summary: {
        total_obligations: 10,
        critical_priority: 3,
        high_risk: 5,
        recommended_daily_spend: 150000,
      },
    },
  };
}

export function generateMockActionResponse(vendor: string, amount: number, tone: string) {
  return {
    status: 'limited',
    message: 'Using simulated action draft',
    data: generateMockActionDraft(vendor, amount, tone),
  };
}
