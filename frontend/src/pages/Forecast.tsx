import {
  ResponsiveContainer,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart
} from 'recharts';

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

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
  return `$${value}`;
};

export default function Forecast() {
  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary/60 mb-1 block">Predictive Analytics</span>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Cash Flow Forecast</h2>
        </div>
        <div className="flex gap-3">
          <div className="bg-surface-container-low p-1 rounded-xl flex gap-1 neumorphic-inset">
            <button className="px-4 py-1.5 text-xs font-bold rounded-lg bg-white shadow-sm text-primary">30 Days</button>
            <button className="px-4 py-1.5 text-xs font-bold rounded-lg text-slate-500 hover:bg-white/50">90 Days</button>
            <button className="px-4 py-1.5 text-xs font-bold rounded-lg text-slate-500 hover:bg-white/50">12 Months</button>
          </div>
          <button className="bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-primary/20 flex items-center gap-2 transition-all">
            <span className="material-symbols-outlined text-sm">ios_share</span>
            Export Report
          </button>
        </div>
      </div>

      {/* Risk Metrics - Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Shortfall Probability */}
        <div className="neumorphic-card p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-error/10 rounded-lg">
              <span className="material-symbols-outlined text-error">warning</span>
            </div>
            <span className="text-[10px] font-bold text-error bg-error/10 px-2 py-0.5 rounded-full">-2.4% vs LY</span>
          </div>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Shortfall Prob.</p>
          <p className="text-3xl font-extrabold font-headline text-on-surface">12.4%</p>
          <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-error rounded-full" style={{ width: '12.4%' }}></div>
          </div>
        </div>

        {/* Median Days to Zero */}
        <div className="neumorphic-card p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <span className="material-symbols-outlined text-primary">timer</span>
            </div>
          </div>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Median Days to Zero</p>
          <p className="text-3xl font-extrabold font-headline text-on-surface">142</p>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">Safe operating zone (90+ days)</p>
        </div>

        {/* Worst Case Cash */}
        <div className="neumorphic-card p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <span className="material-symbols-outlined text-amber-600">trending_down</span>
            </div>
            <span className="text-[10px] font-bold text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full">P10 Confidence</span>
          </div>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Worst Case Cash</p>
          <p className="text-3xl font-extrabold font-headline text-on-surface">$842k</p>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">Estimated for Dec 31, 2024</p>
        </div>

        {/* Best Case Cash */}
        <div className="neumorphic-card p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <span className="material-symbols-outlined text-emerald-600">trending_up</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full">P90 Confidence</span>
          </div>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Best Case Cash</p>
          <p className="text-3xl font-extrabold font-headline text-on-surface">$2.15M</p>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">Estimated for Dec 31, 2024</p>
        </div>
      </div>

      {/* Monte Carlo Cash Flow Chart */}
      <section className="neumorphic-card p-8 rounded-3xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-lg font-bold font-headline">Monte Carlo Simulation</h3>
            <p className="text-sm text-slate-500">Probabilistic outcomes based on 10,000 iterations of current burn vs. receivables</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#004ac6]"></span>
              <span className="text-xs font-semibold text-slate-600">Expected</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-200"></span>
              <span className="text-xs font-semibold text-slate-600">Confidence Band</span>
            </div>
          </div>
        </div>

        <div className="relative h-[400px] w-full bg-slate-50/50 rounded-2xl p-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={MONTE_CARLO_DATA} margin={{ top: 20, right: 20, left: 20, bottom: 0 }}>
              <defs>
                <linearGradient id="band-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#004ac6" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#004ac6" stopOpacity={0.01}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} dy={10} />
              <YAxis 
                tickFormatter={formatCurrency} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }}
                dx={-10}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value: any) => formatCurrency(Number(value))} />
              {/* Confidence Band represented by area between p10 and p90 */}
              <Area type="monotone" dataKey="p90" stroke="none" fill="url(#band-grad)" />
              <Area type="monotone" dataKey="p10" stroke="none" fill="#f8fafc" />
              {/* Main Expected Line */}
              <Line type="monotone" dataKey="expected" stroke="#004ac6" strokeWidth={3} dot={{ stroke: '#004ac6', strokeWidth: 2, fill: 'white', r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Bottom Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Projection Table */}
        <div className="neumorphic-card rounded-2xl flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
            <h3 className="font-bold font-headline">7-Day Run Rate</h3>
            <button className="text-primary text-xs font-bold hover:underline">Full Projection</button>
          </div>
          <div className="p-0">
            <table className="w-full text-left border-collapse">
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
            <table className="w-full text-left border-collapse">
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
        </div>
      </div>
    </div>
  );
}
