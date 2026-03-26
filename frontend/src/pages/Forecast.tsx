<<<<<<< HEAD
import ForecastChart from '../components/ForecastChart';

const MONTE_CARLO_DATA = [
  { name: 'Sept 01', expected: 1200000, p10: 1200000, p90: 1200000 },
  { name: 'Sept 15', expected: 1300000, p10: 1000000, p90: 1600000 },
  { name: 'Oct 01', expected: 1500000, p10: 1100000, p90: 1900000 },
  { name: 'Oct 15', expected: 1800000, p10: 1300000, p90: 2300000 },
  { name: 'Nov 01', expected: 1400000, p10: 900000, p90: 1900000 },
  { name: 'Nov 15', expected: 1100000, p10: 500000, p90: 1700000 },
  { name: 'Dec 01', expected: 1250000, p10: 400000, p90: 2100000 },
  { name: 'Dec 15', expected: 1400000, p10: 400000, p90: 2400000 },
];

export default function Forecast() {
  return (
    <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 w-full space-y-8">
      {/* Main Forecast Chart Component */}
      <ForecastChart data={MONTE_CARLO_DATA} title="Cash Flow Forecast (Monte Carlo Analysis)" showMetrics={true} />

      {/* Bottom Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Projection Table */}
        <div className="neumorphic-card rounded-2xl flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
            <h3 className="font-bold font-headline">7-Day Run Rate</h3>
            <button className="text-primary text-xs font-bold hover:underline">Full Projection</button>
          </div>
          <div className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cash In</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cash Out</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold">Sept 01</td>
                  <td className="px-6 py-4 text-sm text-emerald-600 font-medium">+$14,200</td>
                  <td className="px-6 py-4 text-sm text-error font-medium">-$8,400</td>
                  <td className="px-6 py-4 text-sm font-bold text-right">$1,254,190</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors bg-slate-50/50">
                  <td className="px-6 py-4 text-sm font-semibold">Sept 02</td>
                  <td className="px-6 py-4 text-sm text-slate-400">—</td>
                  <td className="px-6 py-4 text-sm text-error font-medium">-$12,100</td>
                  <td className="px-6 py-4 text-sm font-bold text-right">$1,242,090</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold">Sept 03</td>
                  <td className="px-6 py-4 text-sm text-emerald-600 font-medium">+$42,000</td>
                  <td className="px-6 py-4 text-sm text-error font-medium">-$2,200</td>
                  <td className="px-6 py-4 text-sm font-bold text-right">$1,281,890</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors bg-slate-50/50">
                  <td className="px-6 py-4 text-sm font-semibold">Sept 04</td>
                  <td className="px-6 py-4 text-sm text-slate-400">—</td>
                  <td className="px-6 py-4 text-sm text-error font-medium">-$5,000</td>
                  <td className="px-6 py-4 text-sm font-bold text-right">$1,276,890</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Receivables Risk Table */}
        <div className="neumorphic-card rounded-2xl flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
            <h3 className="font-bold font-headline">Receivables Risk Index</h3>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-error"></span>
              <span className="text-[10px] font-bold text-error uppercase">High Priority</span>
            </div>
          </div>
          <div className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Debtor</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Amount</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Due Date</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold">Lumina Systems</p>
                    <p className="text-[10px] text-slate-400">INV-94021</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">$124,000</td>
                  <td className="px-6 py-4 text-sm text-slate-600">Aug 24</td>
                  <td className="px-6 py-4 text-right">
                    <span className="px-2 py-1 bg-error/10 text-error text-[10px] font-bold rounded-full">85% CRITICAL</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors bg-slate-50/50">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold">Solaris Global</p>
                    <p className="text-[10px] text-slate-400">INV-94044</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">$82,500</td>
                  <td className="px-6 py-4 text-sm text-slate-600">Sept 12</td>
                  <td className="px-6 py-4 text-right">
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full">42% MEDIUM</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold">Cloud Arch</p>
                    <p className="text-[10px] text-slate-400">INV-94108</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">$210,000</td>
                  <td className="px-6 py-4 text-sm text-slate-600">Sept 28</td>
                  <td className="px-6 py-4 text-right">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">12% LOW</span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
=======
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {/* 7-Day Run Rate */}
        <div className="neumorphic-card rounded-2xl flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
            <h3 className="font-bold font-headline">7-Day Run Rate (P50)</h3>
            <span className="text-primary text-xs font-bold">Monte Carlo median</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-2 sm:px-6 py-2 sm:py-3 text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3 text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest">P10</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3 text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest">P50</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3 text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">P90</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {loading ? (
                  [1, 2, 3, 4, 5, 6, 7].map(i => (
                    <tr key={i}><td colSpan={4} className="px-2 sm:px-6 py-2 sm:py-4"><Skeleton className="h-4 w-full" /></td></tr>
                  ))
                ) : first7.map((d, i) => (
                  <tr key={i} className={`hover:bg-slate-50 transition-colors ${i % 2 === 1 ? 'bg-slate-50/50' : ''}`}>
                    <td className="px-2 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-sm font-semibold">{d.day}</td>
                    <td className="px-2 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-sm text-error font-medium">{fmt(d.p10)}</td>
                    <td className="px-2 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-sm font-bold text-primary">{fmt(d.p50)}</td>
                    <td className="px-2 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-sm text-emerald-600 font-medium text-right">{fmt(d.p90)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Financial Ratios */}
        <div className="neumorphic-card rounded-2xl flex flex-col overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white gap-2">
            <h3 className="font-bold font-headline text-sm sm:text-base">Financial Health Summary</h3>
            <div className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${(state?.days_to_zero_runway ?? 999) > 60 ? 'bg-emerald-500' : 'bg-error'}`}></span>
              <span className={`text-[10px] font-bold uppercase ${(state?.days_to_zero_runway ?? 999) > 60 ? 'text-emerald-600' : 'text-error'}`}>
                {(state?.days_to_zero_runway ?? 999) > 60 ? 'Healthy' : 'At Risk'}
              </span>
            </div>
          </div>
          <div className="p-4 sm:p-6 space-y-2 sm:space-y-4">
            {[
              { label: 'Current Cash Balance', value: fmt(state?.current_cash_balance ?? 0), color: 'text-primary' },
              { label: 'Accounts Payable (Total)', value: fmt(state?.accounts_payable ?? 0), color: 'text-error' },
              { label: 'Accounts Receivable (Weighted)', value: fmt(state?.accounts_receivable_weighted ?? 0), color: 'text-emerald-600' },
              { label: 'Monthly Burn Rate', value: fmt(state?.monthly_burn_rate ?? 0), color: 'text-amber-600' },
              { label: 'Monthly Inflow', value: fmt(state?.monthly_inflow ?? 0), color: 'text-emerald-600' },
              { label: 'Working Capital (AR − AP)', value: fmt(state?.working_capital ?? 0), color: (state?.working_capital ?? 0) > 0 ? 'text-emerald-600' : 'text-error' },
              { label: 'Days to Zero Runway', value: state?.days_to_zero_runway === 999 ? '∞ days' : `${Math.round(state?.days_to_zero_runway ?? 0)} days`, color: (state?.days_to_zero_runway ?? 999) > 60 ? 'text-emerald-600' : 'text-error' },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex justify-between items-center py-1.5 sm:py-2 border-b border-slate-100 last:border-0 gap-2">
                <span className="text-xs sm:text-sm text-slate-500 font-roboto">{label}</span>
                {loading ? <Skeleton className="h-5 w-28" /> : (
                  <span className={`text-xs sm:text-sm font-bold font-poppins ${color} text-right`}>{value}</span>
                )}
              </div>
            ))}
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
          </div>
        </div>
      </div>
    </div>
  );
}
