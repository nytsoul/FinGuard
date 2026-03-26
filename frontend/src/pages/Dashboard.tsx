import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CashFlowChart from '../components/CashFlowChart';
import {
  getFinancialState, getDecisionRanking, getForecast,
  type FinancialState, type Obligation, type ForecastDay,
} from '../lib/api';

function fmt(n: number) {
  return '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-slate-200 rounded ${className}`} />;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [state, setState] = useState<FinancialState | null>(null);
  const [obligations, setObligations] = useState<Obligation[]>([]);
  const [forecastDays, setForecastDays] = useState<ForecastDay[]>([]);
  const [shortfallProb, setShortfallProb] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getFinancialState(), getDecisionRanking(), getForecast()])
      .then(([fs, dr, fc]) => {
        setState(fs.data);
        setObligations(dr.data.slice(0, 3));
        // Build chart-compatible data from forecast
        const sampled = fc.data.filter((_, i) => i % 3 === 0).slice(0, 8);
        setForecastDays(sampled);
        setShortfallProb(fc.metrics.shortfall_probability);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const chartData = forecastDays.map(d => ({
    name: d.day,
    expected: Math.round(d.p50 / 1000),
    p10: Math.round(d.p10 / 1000),
    p90: Math.round(d.p90 / 1000),
  }));

  // Determine risk level
  const riskColor = shortfallProb > 0.3 ? 'text-error' : shortfallProb > 0.1 ? 'text-amber-600' : 'text-emerald-600';
  const riskBg = shortfallProb > 0.3 ? 'bg-error/5' : shortfallProb > 0.1 ? 'bg-amber-50' : 'bg-emerald-50';
  const riskBorderColor = shortfallProb > 0.3 ? 'border-error/20' : shortfallProb > 0.1 ? 'border-amber-200' : 'border-emerald-200';

  return (
    <div className="overflow-y-auto p-4 lg:p-8 space-y-6 lg:space-y-8 max-w-[1600px] mx-auto">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-semibold">
          ⚠️ Backend error: {error} — make sure the server is running on port 8001.
        </div>
      )}

      {/* Top Row: Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Cash Balance */}
        <div className="neumorphic-card p-6 flex flex-col justify-between min-h-[140px]">
          <div>
            <span className="text-[10px] font-semibold text-slate-500 font-inter uppercase tracking-widest block mb-2">Cash Balance</span>
            {loading ? <Skeleton className="h-9 w-40 mt-1" /> : (
              <h2 className="text-3xl font-bold font-poppins tracking-tight text-primary">{fmt(state?.current_cash_balance ?? 0)}</h2>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-4 font-inter">
            <span className="material-symbols-outlined text-sm">account_balance</span>
            <span>Working capital {fmt(state?.working_capital ?? 0)}</span>
          </div>
        </div>

        {/* Cash Runway */}
        <div className="neumorphic-card p-6 flex flex-col justify-between min-h-[140px]">
          <div>
            <span className="text-[10px] font-semibold text-slate-500 font-inter uppercase tracking-widest block mb-2">Cash Runway</span>
            <div className="flex items-baseline gap-2">
              {loading ? <Skeleton className="h-9 w-20 mt-1" /> : (
                <h2 className="text-3xl font-bold font-poppins tracking-tight text-on-surface">
                  {state?.days_to_zero_runway === 999 ? '∞' : Math.round(state?.days_to_zero_runway ?? 0)}
                </h2>
              )}
              <span className="text-sm font-semibold text-slate-400 font-inter">DAYS</span>
            </div>
          </div>
          <div className={`flex items-center gap-1 text-xs font-semibold mt-4 font-inter ${(state?.days_to_zero_runway ?? 999) < 45 ? 'text-error' : 'text-emerald-600'}`}>
            <span className="material-symbols-outlined text-sm">hourglass_bottom</span>
            <span>{(state?.days_to_zero_runway ?? 999) < 45 ? 'Critical — < 45 day threshold' : 'Healthy runway'}</span>
          </div>
        </div>

        {/* Total Payables */}
        <div className="neumorphic-card p-6 flex flex-col justify-between min-h-[140px]">
          <div>
            <span className="text-[10px] font-semibold text-slate-500 font-inter uppercase tracking-widest block mb-2">Total Payables</span>
            {loading ? <Skeleton className="h-9 w-36 mt-1" /> : (
              <h2 className="text-3xl font-bold font-poppins tracking-tight text-on-surface">{fmt(state?.accounts_payable ?? 0)}</h2>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold mt-4 font-inter">
            <span className="material-symbols-outlined text-sm">event</span>
            <span>Monthly burn {fmt(state?.monthly_burn_rate ?? 0)}</span>
          </div>
        </div>

        {/* Total Receivables */}
        <div className="neumorphic-card p-6 flex flex-col justify-between min-h-[140px]">
          <div>
            <span className="text-[10px] font-semibold text-slate-500 font-inter uppercase tracking-widest block mb-2">Total Receivables</span>
            {loading ? <Skeleton className="h-9 w-36 mt-1" /> : (
              <h2 className="text-3xl font-bold font-poppins tracking-tight text-on-surface">{fmt(state?.accounts_receivable_weighted ?? 0)}</h2>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-primary font-semibold mt-4 font-inter">
            <span className="material-symbols-outlined text-sm">payments</span>
            <span>Monthly inflow {fmt(state?.monthly_inflow ?? 0)}</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Chart & Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
        <div className="lg:col-span-2">
          <CashFlowChart data={chartData} title="Monte Carlo Cash Flow (P10/P50/P90)" showLegend={true} />
        </div>

        <div className="flex flex-col gap-6">
          {/* Risk Panel */}
          <div className={`neumorphic-card p-8 ${riskBg} border ${riskBorderColor} relative overflow-hidden`}>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            </div>
            <span className={`text-[10px] font-semibold ${riskColor} font-inter uppercase tracking-widest block mb-4`}>
              Shortfall Risk (30-Day)
            </span>
            <div className="mb-4">
              {loading ? <Skeleton className="h-12 w-24 mb-2" /> : (
                <h3 className={`text-4xl font-bold font-poppins ${riskColor} mb-2`}>
                  {Math.round(shortfallProb * 100)}%
                </h3>
              )}
              <p className="text-on-surface font-semibold font-roboto">
                {shortfallProb === 0 ? 'No shortfall detected in 30-day horizon.' : `Probability of cash shortfall in 30 days.`}
              </p>
            </div>
            <button
              onClick={() => navigate('/decision-engine')}
              className="w-full py-3 bg-primary text-white rounded-xl font-bold font-inter shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm"
            >
              VIEW MITIGATION STRATEGY
            </button>
          </div>

          {/* Top Obligations */}
          <div className="neumorphic-card p-6 flex-1 bg-surface-container-low">
            <h4 className="text-sm font-bold font-poppins text-on-surface mb-4">Top Priority Obligations</h4>
            <div className="space-y-3">
              {loading ? (
                [1, 2, 3].map(i => <Skeleton key={i} className="h-14 w-full" />)
              ) : obligations.map(ob => (
                <div key={ob.id} className="flex gap-3 p-3 bg-white rounded-lg neumorphic-inset">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-xs font-poppins flex-shrink-0">
                    {ob.vendor[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold font-poppins truncate">{ob.vendor}</p>
                    <p className="text-[10px] text-slate-500 font-roboto">{fmt(ob.amount)} · {ob.days_overdue > 0 ? `${ob.days_overdue}d overdue` : `due ${ob.due_date}`}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full self-center whitespace-nowrap ${ob.delay_probability > 0.2 ? 'bg-error/10 text-error' : 'bg-emerald-100 text-emerald-700'}`}>
                    {Math.round(ob.delay_probability * 100)}% risk
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Payables & Receivables tables from rankings */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-8">
        {/* Upcoming Payables */}
        <div className="neumorphic-card overflow-hidden">
          <div className="p-4 lg:p-6 flex justify-between items-center bg-white">
            <h3 className="font-bold text-sm font-poppins text-on-surface">Upcoming Payables</h3>
            <span onClick={() => navigate('/decision-engine')} className="text-xs font-bold text-primary cursor-pointer hover:underline font-inter">View All</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs lg:text-sm">
              <thead className="bg-surface-container-low border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3 text-[9px] font-semibold text-slate-500 font-inter uppercase tracking-widest">Vendor</th>
                  <th className="px-4 py-3 text-[9px] font-semibold text-slate-500 font-inter uppercase tracking-widest">Due Date</th>
                  <th className="px-4 py-3 text-[9px] font-semibold text-slate-500 font-inter uppercase tracking-widest">Amount</th>
                  <th className="px-4 py-3 text-[9px] font-semibold text-slate-500 font-inter uppercase tracking-widest text-right">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  [1, 2, 3].map(i => (
                    <tr key={i}><td colSpan={4} className="px-4 py-3"><Skeleton className="h-4 w-full" /></td></tr>
                  ))
                ) : obligations.slice(0, 5).map(ob => (
                  <tr key={ob.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">{ob.vendor[0]}</div>
                        <span className="font-semibold text-xs font-roboto truncate max-w-[120px]">{ob.vendor}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-roboto text-xs">{ob.due_date}</td>
                    <td className="px-4 py-3 font-bold font-poppins text-xs">{fmt(ob.amount)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${ob.delay_probability > 0.2 ? 'bg-error/10 text-error' : ob.delay_probability > 0.1 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {Math.round(ob.delay_probability * 100)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TOPSIS ranking summary */}
        <div className="neumorphic-card overflow-hidden">
          <div className="p-4 lg:p-6 flex justify-between items-center bg-white">
            <h3 className="font-bold text-sm font-poppins text-on-surface">TOPSIS Decision Ranking</h3>
            <span onClick={() => navigate('/decision-engine')} className="text-xs font-bold text-primary cursor-pointer hover:underline font-inter">Full Ranking</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs lg:text-sm">
              <thead className="bg-surface-container-low border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3 text-[9px] font-semibold text-slate-500 font-inter uppercase tracking-widest">#</th>
                  <th className="px-4 py-3 text-[9px] font-semibold text-slate-500 font-inter uppercase tracking-widest">Vendor</th>
                  <th className="px-4 py-3 text-[9px] font-semibold text-slate-500 font-inter uppercase tracking-widest">Score</th>
                  <th className="px-4 py-3 text-[9px] font-semibold text-slate-500 font-inter uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  [1, 2, 3].map(i => (
                    <tr key={i}><td colSpan={4} className="px-4 py-3"><Skeleton className="h-4 w-full" /></td></tr>
                  ))
                ) : obligations.slice(0, 5).map(ob => (
                  <tr key={ob.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-primary text-xs">#{ob.rank}</td>
                    <td className="px-4 py-3 font-semibold text-xs font-roboto truncate max-w-[120px]">{ob.vendor}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${ob.topsis_score * 100}%` }} />
                        </div>
                        <span className="text-xs font-bold font-poppins">{ob.topsis_score.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-[9px] font-bold font-inter px-2 py-1 rounded-full border border-slate-200 hover:bg-slate-100 cursor-pointer whitespace-nowrap">
                        {ob.recommendation.split(' ').slice(0, 2).join(' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
