import { useEffect, useState } from 'react';
import ForecastChart from '../components/ForecastChart';
import { getForecast, getFinancialState, type ForecastDay, type FinancialState } from '../lib/api';

function fmt(n: number) {
  return '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-slate-200 rounded ${className}`} />;
}

export default function Forecast() {
  const [forecastData, setForecastData] = useState<ForecastDay[]>([]);
  const [state, setState] = useState<FinancialState | null>(null);
  const [metrics, setMetrics] = useState<{ shortfall_probability: number; median_days_to_zero: number; worst_case_zero: number; best_case_zero: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getForecast(), getFinancialState()])
      .then(([fc, fs]) => {
        // Use full dataset without sampling - no need to lose data
        setForecastData(fc.data);
        setMetrics(fc.metrics);
        setState(fs.data);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Format for ForecastChart component
  const chartData = forecastData.map(d => ({
    name: d.day,
    expected: d.p50,
    p10: d.p10,
    p90: d.p90,
  }));

  // First 7 days for run-rate table
  const first7 = forecastData.slice(0, 7);

  return (
    <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 w-full space-y-8">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-semibold">
          ⚠️ Backend error: {error}
        </div>
      )}

      {/* Metric Cards */}
      {metrics && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="neumorphic-card p-5">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block mb-2">Shortfall Risk</span>
            <p className={`text-3xl font-bold font-poppins ${metrics.shortfall_probability > 0.2 ? 'text-error' : 'text-emerald-600'}`}>
              {Math.round(metrics.shortfall_probability * 100)}%
            </p>
            <p className="text-xs text-slate-500 mt-1">30-day horizon</p>
          </div>
          <div className="neumorphic-card p-5">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block mb-2">Cash Runway (P50)</span>
            <p className="text-3xl font-bold font-poppins text-on-surface">
              {metrics.median_days_to_zero === 999 ? '∞' : metrics.median_days_to_zero}
            </p>
            <p className="text-xs text-slate-500 mt-1">days median</p>
          </div>
          <div className="neumorphic-card p-5">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block mb-2">Cash Balance</span>
            <p className="text-2xl font-bold font-poppins text-primary">{fmt(state?.current_cash_balance ?? 0)}</p>
            <p className="text-xs text-slate-500 mt-1">current</p>
          </div>
          <div className="neumorphic-card p-5">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block mb-2">Net Working Capital</span>
            <p className="text-2xl font-bold font-poppins text-on-surface">{fmt(state?.working_capital ?? 0)}</p>
            <p className="text-xs text-slate-500 mt-1">AR − AP</p>
          </div>
        </div>
      )}

      {/* Main Forecast Chart */}
      {loading ? (
        <Skeleton className="h-80 w-full rounded-2xl" />
      ) : (
        <ForecastChart data={chartData} title="Cash Flow Forecast — Monte Carlo (10,000 paths, 30-day horizon)" showMetrics={true} useApi={false} />
      )}

      {/* Bottom Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 7-Day Run Rate */}
        <div className="neumorphic-card rounded-2xl flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
            <h3 className="font-bold font-headline">7-Day Run Rate (P50)</h3>
            <span className="text-primary text-xs font-bold">Monte Carlo median</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">P10 (Bear)</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">P50 (Base)</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">P90 (Bull)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {loading ? (
                  [1, 2, 3, 4, 5, 6, 7].map(i => (
                    <tr key={i}><td colSpan={4} className="px-6 py-4"><Skeleton className="h-4 w-full" /></td></tr>
                  ))
                ) : first7.map((d, i) => (
                  <tr key={i} className={`hover:bg-slate-50 transition-colors ${i % 2 === 1 ? 'bg-slate-50/50' : ''}`}>
                    <td className="px-6 py-3 text-sm font-semibold">{d.day}</td>
                    <td className="px-6 py-3 text-sm text-error font-medium">{fmt(d.p10)}</td>
                    <td className="px-6 py-3 text-sm font-bold text-primary">{fmt(d.p50)}</td>
                    <td className="px-6 py-3 text-sm text-emerald-600 font-medium text-right">{fmt(d.p90)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Financial Ratios */}
        <div className="neumorphic-card rounded-2xl flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
            <h3 className="font-bold font-headline">Financial Health Summary</h3>
            <div className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${(state?.days_to_zero_runway ?? 999) > 60 ? 'bg-emerald-500' : 'bg-error'}`}></span>
              <span className={`text-[10px] font-bold uppercase ${(state?.days_to_zero_runway ?? 999) > 60 ? 'text-emerald-600' : 'text-error'}`}>
                {(state?.days_to_zero_runway ?? 999) > 60 ? 'Healthy' : 'At Risk'}
              </span>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {[
              { label: 'Current Cash Balance', value: fmt(state?.current_cash_balance ?? 0), color: 'text-primary' },
              { label: 'Accounts Payable (Total)', value: fmt(state?.accounts_payable ?? 0), color: 'text-error' },
              { label: 'Accounts Receivable (Weighted)', value: fmt(state?.accounts_receivable_weighted ?? 0), color: 'text-emerald-600' },
              { label: 'Monthly Burn Rate', value: fmt(state?.monthly_burn_rate ?? 0), color: 'text-amber-600' },
              { label: 'Monthly Inflow', value: fmt(state?.monthly_inflow ?? 0), color: 'text-emerald-600' },
              { label: 'Working Capital (AR − AP)', value: fmt(state?.working_capital ?? 0), color: (state?.working_capital ?? 0) > 0 ? 'text-emerald-600' : 'text-error' },
              { label: 'Days to Zero Runway', value: state?.days_to_zero_runway === 999 ? '∞ days' : `${Math.round(state?.days_to_zero_runway ?? 0)} days`, color: (state?.days_to_zero_runway ?? 999) > 60 ? 'text-emerald-600' : 'text-error' },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-500 font-roboto">{label}</span>
                {loading ? <Skeleton className="h-5 w-28" /> : (
                  <span className={`text-sm font-bold font-poppins ${color}`}>{value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
