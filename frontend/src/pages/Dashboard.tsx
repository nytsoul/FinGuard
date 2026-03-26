<<<<<<< HEAD
import { useState } from 'react';
import CashFlowChart from '../components/CashFlowChart';
import { getMitigationStrategy } from '../lib/api';

const CHART_DATA = [
  { name: 'AUG 01', current: 0, w1: 40, w2: 55, w3: 45, expected: 50 },
  { name: 'AUG 08', current: 65, w1: 0, w2: 0, w3: 0, expected: 60 },
  { name: 'AUG 15', current: 0, expected: 50, expected2: 30, expected3: 35, forecast: 48 },
  { name: 'AUG 22', current: 0, risk: 20, forecast: 35 },
  { name: 'AUG 31', current: 0, expected: 40, expected2: 55, forecast: 52 },
];

export default function Dashboard() {
  const [showStrategyModal, setShowStrategyModal] = useState(false);
  const [strategyLoading, setStrategyLoading] = useState(false);
  const [strategyData, setStrategyData] = useState<any>(null);
  const [selectedScenario, setSelectedScenario] = useState('current');
  const [strategyError, setStrategyError] = useState('');

  const handleViewStrategy = async () => {
    setShowStrategyModal(true);
    setStrategyLoading(true);
    setStrategyError('');
    try {
      const data = await getMitigationStrategy(selectedScenario as 'current' | 'pessimistic' | 'optimistic');
      setStrategyData(data);
    } catch (error) {
      setStrategyError('Failed to load mitigation strategy. Please try again.');
      console.error('Strategy fetch error:', error);
    } finally {
      setStrategyLoading(false);
    }
  };

  const handleScenarioChange = async (scenario: string) => {
    setSelectedScenario(scenario);
    setStrategyLoading(true);
    setStrategyError('');
    try {
      const data = await getMitigationStrategy(scenario as 'current' | 'pessimistic' | 'optimistic');
      setStrategyData(data);
    } catch (error) {
      setStrategyError('Failed to load scenario data.');
      console.error('Scenario fetch error:', error);
    } finally {
      setStrategyLoading(false);
    }
  };

  return (
    <div className="overflow-y-auto p-4 lg:p-8 space-y-6 lg:space-y-8 w-full">
=======
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
        console.log('✅ Dashboard data loaded:', { fs, dr, fc });
        setState(fs.data);
        setObligations(dr.data.slice(0, 3));
        // Build chart-compatible data from forecast
        const sampled = fc.data.filter((_, i) => i % 3 === 0).slice(0, 8);
        setForecastDays(sampled);
        setShortfallProb(fc.metrics.shortfall_probability);
      })
      .catch(e => {
        console.error('❌ API Error:', e.message);
        setError(e.message);
      })
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
    <div className="w-full overflow-y-auto space-y-6 lg:space-y-8">
      <div className="px-4 lg:px-8 py-4 lg:py-8 space-y-6 lg:space-y-8">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-semibold">
          ⚠️ Backend error: {error} — make sure the server is running on port 8001.
        </div>
      )}

>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
      {/* Top Row: Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Cash Balance */}
        <div className="neumorphic-card p-6 flex flex-col justify-between min-h-[140px]">
          <div>
            <span className="text-[10px] font-semibold text-slate-500 font-inter uppercase tracking-widest block mb-2">Cash Balance</span>
<<<<<<< HEAD
            <h2 className="text-3xl font-bold font-poppins tracking-tight text-primary">$428,950.00</h2>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-4 font-inter">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span>+12.5% vs last month</span>
          </div>
        </div>
        
=======
            {loading ? <Skeleton className="h-9 w-40 mt-1" /> : (
              <h2 className="text-3xl font-bold font-poppins tracking-tight text-primary">{fmt(state?.current_cash_balance ?? 0)}</h2>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-4 font-inter">
            <span className="material-symbols-outlined text-sm">account_balance</span>
            <span>Working capital {fmt(state?.working_capital ?? 0)}</span>
          </div>
        </div>

>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
        {/* Cash Runway */}
        <div className="neumorphic-card p-6 flex flex-col justify-between min-h-[140px]">
          <div>
            <span className="text-[10px] font-semibold text-slate-500 font-inter uppercase tracking-widest block mb-2">Cash Runway</span>
            <div className="flex items-baseline gap-2">
<<<<<<< HEAD
              <h2 className="text-3xl font-bold font-poppins tracking-tight text-on-surface">142</h2>
              <span className="text-sm font-semibold text-slate-400 font-inter">DAYS</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold mt-4 font-inter">
            <span className="material-symbols-outlined text-sm">hourglass_bottom</span>
            <span>Critical at &lt; 45 days</span>
=======
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
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
          </div>
        </div>

        {/* Total Payables */}
        <div className="neumorphic-card p-6 flex flex-col justify-between min-h-[140px]">
          <div>
            <span className="text-[10px] font-semibold text-slate-500 font-inter uppercase tracking-widest block mb-2">Total Payables</span>
<<<<<<< HEAD
            <h2 className="text-3xl font-bold font-poppins tracking-tight text-on-surface">$114,200.00</h2>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold mt-4 font-inter">
            <span className="material-symbols-outlined text-sm">event</span>
            <span>24 invoices pending</span>
=======
            {loading ? <Skeleton className="h-9 w-36 mt-1" /> : (
              <h2 className="text-3xl font-bold font-poppins tracking-tight text-on-surface">{fmt(state?.accounts_payable ?? 0)}</h2>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold mt-4 font-inter">
            <span className="material-symbols-outlined text-sm">event</span>
            <span>Monthly burn {fmt(state?.monthly_burn_rate ?? 0)}</span>
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
          </div>
        </div>

        {/* Total Receivables */}
        <div className="neumorphic-card p-6 flex flex-col justify-between min-h-[140px]">
          <div>
            <span className="text-[10px] font-semibold text-slate-500 font-inter uppercase tracking-widest block mb-2">Total Receivables</span>
<<<<<<< HEAD
            <h2 className="text-3xl font-bold font-poppins tracking-tight text-on-surface">$286,400.00</h2>
          </div>
          <div className="flex items-center gap-1 text-xs text-primary font-semibold mt-4 font-inter">
            <span className="material-symbols-outlined text-sm">payments</span>
            <span>$42k expected today</span>
=======
            {loading ? <Skeleton className="h-9 w-36 mt-1" /> : (
              <h2 className="text-3xl font-bold font-poppins tracking-tight text-on-surface">{fmt(state?.accounts_receivable_weighted ?? 0)}</h2>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-primary font-semibold mt-4 font-inter">
            <span className="material-symbols-outlined text-sm">payments</span>
            <span>Monthly inflow {fmt(state?.monthly_inflow ?? 0)}</span>
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
          </div>
        </div>
      </div>

      {/* Middle Section: Chart & Risk */}
<<<<<<< HEAD
      <div className="space-y-6 lg:space-y-8">
      {/* Cash Flow Chart Section - Full Width */}
      <div className="w-full">
        <CashFlowChart data={CHART_DATA} title="Daily Cash Flow Projection" showLegend={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">

        {/* Risk Alert Panel */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <div className="neumorphic-card p-8 bg-error/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            </div>
            <span className="text-[10px] font-semibold text-error font-inter uppercase tracking-widest block mb-4">Risk Probability Index</span>
            <div className="mb-6">
              <h3 className="text-4xl font-bold font-poppins text-error mb-2">70%</h3>
              <p className="text-on-surface font-semibold font-roboto">Probability of cash shortfall in 14 days.</p>
            </div>
            <p className="text-sm text-on-surface-variant font-roboto mb-6 leading-relaxed">
              Projected outflow from <span className="font-bold font-poppins text-on-surface">Amazon AWS</span> and <span className="font-bold font-poppins text-on-surface">Office Lease</span> exceeds expected receivables by <span className="text-error font-bold">$12,400</span>.
            </p>
            <button 
              onClick={handleViewStrategy}
              className="w-full py-4 bg-error text-white rounded-xl font-bold font-inter shadow-lg shadow-error/20 hover:scale-[1.02] active:scale-95 transition-all"
=======
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
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
            >
              VIEW MITIGATION STRATEGY
            </button>
          </div>
<<<<<<< HEAD
          
          <div className="neumorphic-card p-6 flex-1 bg-surface-container-low">
            <h4 className="text-sm font-bold font-poppins text-on-surface mb-4">Recommended Actions</h4>
            <div className="space-y-4">
              <div className="flex gap-3 p-3 bg-white rounded-lg neumorphic-inset">
                <span className="material-symbols-outlined text-primary">mail</span>
                <div className="flex-1">
                  <p className="text-xs font-bold font-poppins">Follow up: Invoice #4402</p>
                  <p className="text-[10px] text-slate-500 font-roboto">Overdue by 3 days ($12k)</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 bg-white rounded-lg neumorphic-inset">
                <span className="material-symbols-outlined text-amber-600">schedule</span>
                <div className="flex-1">
                  <p className="text-xs font-bold font-poppins">Defer: Vendor Payment #889</p>
                  <p className="text-[10px] text-slate-500 font-roboto">Move to next billing cycle</p>
                </div>
              </div>
=======

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
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
            </div>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      </div>

      {/* Bottom Section: Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-8 relative z-0">
        {/* Payables Due */}
        <div className="neumorphic-card overflow-hidden">
          <div className="p-4 lg:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white">
            <h3 className="font-bold text-sm lg:text-base font-poppins text-on-surface">Upcoming Payables</h3>
            <span className="text-xs font-bold text-primary cursor-pointer hover:underline font-inter">View All</span>
=======
      {/* Bottom Section: Payables & Receivables tables from rankings */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-8">
        {/* Upcoming Payables */}
        <div className="neumorphic-card overflow-hidden">
          <div className="p-4 lg:p-6 flex justify-between items-center bg-white">
            <h3 className="font-bold text-sm font-poppins text-on-surface">Upcoming Payables</h3>
            <span onClick={() => navigate('/decision-engine')} className="text-xs font-bold text-primary cursor-pointer hover:underline font-inter">View All</span>
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs lg:text-sm">
              <thead className="bg-surface-container-low border-b border-slate-100">
                <tr>
<<<<<<< HEAD
                  <th className="px-3 lg:px-6 py-3 lg:py-4 text-[9px] lg:text-[10px] font-semibold text-slate-500 font-inter uppercase tracking-widest">Vendor</th>
                  <th className="px-3 lg:px-6 py-3 lg:py-4 text-[9px] lg:text-[10px] font-semibold text-slate-500 font-inter uppercase tracking-widest">Due Date</th>
                  <th className="px-3 lg:px-6 py-3 lg:py-4 text-[9px] lg:text-[10px] font-semibold text-slate-500 font-inter uppercase tracking-widest">Amount</th>
                  <th className="px-3 lg:px-6 py-3 lg:py-4 text-[9px] lg:text-[10px] font-semibold text-slate-500 font-inter uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 lg:px-6 py-3 lg:py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs font-poppins">A</div>
                      <span className="text-xs lg:text-sm font-semibold font-roboto truncate">Amazon Web Services</span>
                    </div>
                  </td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-roboto">Aug 12, 2023</td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-bold font-poppins">$4,820.00</td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 text-right">
                    <button className="text-[9px] lg:text-[10px] font-bold font-inter px-2 lg:px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-100 neumorphic-smooth whitespace-nowrap">APPROVE</button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 lg:px-6 py-3 lg:py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs font-poppins">S</div>
                      <span className="text-xs lg:text-sm font-semibold font-roboto truncate">Slack Technologies</span>
                    </div>
                  </td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-roboto">Aug 14, 2023</td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-bold font-poppins">$1,250.00</td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 text-right">
                    <button className="text-[9px] lg:text-[10px] font-bold font-inter px-2 lg:px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-100 neumorphic-smooth whitespace-nowrap">APPROVE</button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 lg:px-6 py-3 lg:py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs font-poppins">G</div>
                      <span className="text-xs lg:text-sm font-semibold font-roboto truncate">Google Workspace</span>
                    </div>
                  </td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-roboto">Aug 18, 2023</td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-bold font-poppins">$840.00</td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 text-right">
                    <button className="text-[9px] lg:text-[10px] font-bold font-inter px-2 lg:px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-100 neumorphic-smooth whitespace-nowrap">APPROVE</button>
                  </td>
                </tr>
=======
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
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
              </tbody>
            </table>
          </div>
        </div>

<<<<<<< HEAD
        {/* Expected Receivables */}
        <div className="neumorphic-card overflow-hidden">
          <div className="p-4 lg:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white font-poppins">
            <h3 className="font-bold text-sm lg:text-base text-on-surface">Expected Receivables</h3>
            <span className="text-xs font-bold text-primary cursor-pointer hover:underline font-inter">View All</span>
=======
        {/* TOPSIS ranking summary */}
        <div className="neumorphic-card overflow-hidden">
          <div className="p-4 lg:p-6 flex justify-between items-center bg-white">
            <h3 className="font-bold text-sm font-poppins text-on-surface">TOPSIS Decision Ranking</h3>
            <span onClick={() => navigate('/decision-engine')} className="text-xs font-bold text-primary cursor-pointer hover:underline font-inter">Full Ranking</span>
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs lg:text-sm">
              <thead className="bg-surface-container-low border-b border-slate-100">
                <tr>
<<<<<<< HEAD
                  <th className="px-3 lg:px-6 py-3 lg:py-4 text-[9px] lg:text-[10px] font-semibold text-slate-500 font-inter uppercase tracking-widest">Client</th>
                  <th className="px-3 lg:px-6 py-3 lg:py-4 text-[9px] lg:text-[10px] font-semibold text-slate-500 font-inter uppercase tracking-widest">Expected Date</th>
                  <th className="px-3 lg:px-6 py-3 lg:py-4 text-[9px] lg:text-[10px] font-semibold text-slate-500 font-inter uppercase tracking-widest">Amount</th>
                  <th className="px-3 lg:px-6 py-3 lg:py-4 text-[9px] lg:text-[10px] font-semibold text-slate-500 font-inter uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 lg:px-6 py-3 lg:py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-xs font-poppins">N</div>
                      <span className="text-xs lg:text-sm font-semibold font-roboto truncate">Nexis Solutions</span>
                    </div>
                  </td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-roboto">Aug 11, 2023</td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-bold font-poppins text-primary">$28,500.00</td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 text-right">
                    <span className="text-[9px] lg:text-[10px] font-bold font-inter px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 whitespace-nowrap">CONFIRMED</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 lg:px-6 py-3 lg:py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-xs font-poppins">V</div>
                      <span className="text-xs lg:text-sm font-semibold font-roboto truncate">Vortex Media</span>
                    </div>
                  </td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-roboto">Aug 15, 2023</td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-bold font-poppins text-primary">$15,200.00</td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 text-right">
                    <span className="text-[9px] lg:text-[10px] font-bold font-inter px-2 py-1 rounded-full bg-amber-100 text-amber-700 whitespace-nowrap">PENDING</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 lg:px-6 py-3 lg:py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-xs font-poppins">P</div>
                      <span className="text-xs lg:text-sm font-semibold font-roboto truncate">Prime Dynamics</span>
                    </div>
                  </td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-roboto">Aug 20, 2023</td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-bold font-poppins text-primary">$42,000.00</td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 text-right">
                    <span className="text-[9px] lg:text-[10px] font-bold font-inter px-2 py-1 rounded-full bg-slate-100 text-slate-600 whitespace-nowrap">DRAFT</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-primary to-primary-container text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group z-30">
        <span className="material-symbols-outlined text-3xl">add</span>
        <span className="absolute right-full mr-4 bg-on-surface text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">New Transaction</span>
      </button>

      {/* Mitigation Strategy Modal */}
      {showStrategyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 sticky top-0 bg-white border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-on-surface">Mitigation Strategy</h3>
              <button 
                onClick={() => setShowStrategyModal(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Scenario Selector */}
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-3">Select Scenario</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'current', label: 'Current', desc: 'Based on current forecast' },
                    { value: 'pessimistic', label: 'Pessimistic', desc: 'Worst case scenario' },
                    { value: 'optimistic', label: 'Optimistic', desc: 'Best case scenario' }
                  ].map(scenario => (
                    <button
                      key={scenario.value}
                      onClick={() => handleScenarioChange(scenario.value)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        selectedScenario === scenario.value
                          ? 'border-primary bg-primary/5'
                          : 'border-slate-200 bg-white hover:border-primary/50'
                      }`}
                    >
                      <p className="font-semibold text-sm text-on-surface">{scenario.label}</p>
                      <p className="text-xs text-slate-500">{scenario.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {strategyError && (
                <div className="p-3 bg-error/10 border border-error rounded-lg text-error text-sm">
                  {strategyError}
                </div>
              )}

              {strategyLoading && (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="inline-block w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin mb-2"></div>
                    <p className="text-sm text-slate-500">Loading strategy...</p>
                  </div>
                </div>
              )}

              {strategyData && !strategyLoading && (
                <div className="space-y-6">
                  {/* Risk Assessment */}
                  <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                    <h4 className="font-semibold text-on-surface">Risk Assessment</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Risk Level</p>
                        <p className="text-lg font-bold text-on-surface">{strategyData.risk_level}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Days to Critical</p>
                        <p className="text-lg font-bold text-error">{strategyData.days_to_critical} days</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Shortfall Probability</p>
                        <p className="text-lg font-bold text-on-surface">{(strategyData.shortfall_probability * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-semibold text-on-surface mb-3">Recommended Actions</h4>
                    <div className="space-y-3">
                      {strategyData.recommendations?.map((rec: any, idx: number) => (
                        <div key={idx} className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white text-xs font-bold">
                                {rec.priority}
                              </span>
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-sm text-on-surface mb-1">{rec.action}</p>
                              <p className="text-xs text-slate-600">{rec.description}</p>
                              {rec.estimated_impact && (
                                <p className="text-xs font-semibold text-primary mt-2">
                                  Impact: {rec.estimated_impact}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
                    <p className="text-sm text-emerald-900">
                      <span className="font-semibold">Summary:</span> By following these recommendations, you can improve your cash position by an estimated <span className="font-bold">${strategyData.estimated_improvement || 'TBD'}</span> and reduce risk by <span className="font-bold">{strategyData.risk_reduction || 'TBD'}</span>.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button 
                  onClick={() => setShowStrategyModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-on-surface font-semibold hover:bg-slate-50"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-container">
                  Export Strategy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
=======
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
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
    </div>
  );
}
