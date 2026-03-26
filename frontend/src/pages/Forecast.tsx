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
          </div>
        </div>
      </div>
    </div>
  );
}
