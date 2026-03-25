import CashFlowChart from '../components/CashFlowChart';

const CHART_DATA = [
  { name: 'AUG 01', current: 0, w1: 40, w2: 55, w3: 45, expected: 50 },
  { name: 'AUG 08', current: 65, w1: 0, w2: 0, w3: 0, expected: 60 },
  { name: 'AUG 15', current: 0, expected: 50, expected2: 30, expected3: 35, forecast: 48 },
  { name: 'AUG 22', current: 0, risk: 20, forecast: 35 },
  { name: 'AUG 31', current: 0, expected: 40, expected2: 55, forecast: 52 },
];

export default function Dashboard() {
  return (
    <div className="overflow-y-auto p-4 lg:p-8 space-y-6 lg:space-y-8 max-w-[1600px] mx-auto">
      {/* Top Row: Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Cash Balance */}
        <div className="neumorphic-card p-6 flex flex-col justify-between min-h-[140px]">
          <div>
            <span className="text-[10px] font-semibold text-slate-500 font-inter uppercase tracking-widest block mb-2">Cash Balance</span>
            <h2 className="text-3xl font-bold font-poppins tracking-tight text-primary">$428,950.00</h2>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-4 font-inter">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span>+12.5% vs last month</span>
          </div>
        </div>
        
        {/* Cash Runway */}
        <div className="neumorphic-card p-6 flex flex-col justify-between min-h-[140px]">
          <div>
            <span className="text-[10px] font-semibold text-slate-500 font-inter uppercase tracking-widest block mb-2">Cash Runway</span>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold font-poppins tracking-tight text-on-surface">142</h2>
              <span className="text-sm font-semibold text-slate-400 font-inter">DAYS</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold mt-4 font-inter">
            <span className="material-symbols-outlined text-sm">hourglass_bottom</span>
            <span>Critical at &lt; 45 days</span>
          </div>
        </div>

        {/* Total Payables */}
        <div className="neumorphic-card p-6 flex flex-col justify-between min-h-[140px]">
          <div>
            <span className="text-[10px] font-semibold text-slate-500 font-inter uppercase tracking-widest block mb-2">Total Payables</span>
            <h2 className="text-3xl font-bold font-poppins tracking-tight text-on-surface">$114,200.00</h2>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold mt-4 font-inter">
            <span className="material-symbols-outlined text-sm">event</span>
            <span>24 invoices pending</span>
          </div>
        </div>

        {/* Total Receivables */}
        <div className="neumorphic-card p-6 flex flex-col justify-between min-h-[140px]">
          <div>
            <span className="text-[10px] font-semibold text-slate-500 font-inter uppercase tracking-widest block mb-2">Total Receivables</span>
            <h2 className="text-3xl font-bold font-poppins tracking-tight text-on-surface">$286,400.00</h2>
          </div>
          <div className="flex items-center gap-1 text-xs text-primary font-semibold mt-4 font-inter">
            <span className="material-symbols-outlined text-sm">payments</span>
            <span>$42k expected today</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Chart & Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
      {/* Cash Flow Chart Section */}
      <div className="lg:col-span-2">
        <CashFlowChart data={CHART_DATA} title="Daily Cash Flow Projection" showLegend={true} />
      </div>

        {/* Risk Alert Panel */}
        <div className="flex flex-col gap-6">
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
            <button className="w-full py-4 bg-error text-white rounded-xl font-bold font-inter shadow-lg shadow-error/20 hover:scale-[1.02] active:scale-95 transition-all">
              VIEW MITIGATION STRATEGY
            </button>
          </div>
          
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
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-8 relative z-0">
        {/* Payables Due */}
        <div className="neumorphic-card overflow-hidden">
          <div className="p-4 lg:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white">
            <h3 className="font-bold text-sm lg:text-base font-poppins text-on-surface">Upcoming Payables</h3>
            <span className="text-xs font-bold text-primary cursor-pointer hover:underline font-inter">View All</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs lg:text-sm">
              <thead className="bg-surface-container-low border-b border-slate-100">
                <tr>
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
              </tbody>
            </table>
          </div>
        </div>

        {/* Expected Receivables */}
        <div className="neumorphic-card overflow-hidden">
          <div className="p-4 lg:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white font-poppins">
            <h3 className="font-bold text-sm lg:text-base text-on-surface">Expected Receivables</h3>
            <span className="text-xs font-bold text-primary cursor-pointer hover:underline font-inter">View All</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs lg:text-sm">
              <thead className="bg-surface-container-low border-b border-slate-100">
                <tr>
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
    </div>
  );
}
