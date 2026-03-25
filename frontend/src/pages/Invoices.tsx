export default function Invoices() {
  return (
    <div className="overflow-y-auto p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Page Header & Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Invoice Registry</h2>
          <p className="text-slate-500 mt-1 font-medium">Manage and optimize your architectural cash flow</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-surface-container-low text-on-surface font-semibold rounded-xl transition-all active:scale-95 hover:bg-slate-200">
            <span className="material-symbols-outlined">filter_list</span>
            Filter
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95">
            <span className="material-symbols-outlined">upload_file</span>
            Upload Invoice
          </button>
        </div>
      </div>

      {/* Tabs & Quick Stats Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tab Switcher (Architectural Card) */}
        <div className="lg:col-span-8 neumorphic-card bg-white rounded-2xl p-2 flex">
          <button className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-white font-bold transition-all shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
            Payables
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-slate-500 font-semibold hover:bg-slate-50 transition-all">
            <span className="material-symbols-outlined">account_balance</span>
            Receivables
          </button>
        </div>

        {/* Match Status Summary */}
        <div className="lg:col-span-4 neumorphic-card bg-white rounded-2xl p-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Integrity Check</span>
            <span className="text-lg font-bold text-on-surface">Match Status</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full font-bold text-xs ring-1 ring-green-200">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            98.2% SYNCED
          </div>
        </div>
      </div>

      {/* Main Data Architecture Section */}
      <div className="space-y-6">
        {/* Payables Section Title */}
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold font-headline">Pending Payables</h3>
          <div className="h-px flex-1 bg-slate-200"></div>
          <span className="text-xs font-bold text-slate-400 bg-surface-container-low p-2 rounded-lg">8 ITEMS DUE</span>
        </div>

        {/* Payables Table (Soft UI Card) */}
        <div className="neumorphic-card bg-white rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Vendor</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center border-b border-slate-100">Due Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center border-b border-slate-100">TOPSIS Rank</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right border-b border-slate-100">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center font-bold text-primary group-hover:bg-white inset-shadow">AM</div>
                      <span className="font-bold text-on-surface">Amazon Web Services</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-headline font-bold text-lg">$12,450.00</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-medium text-error">Oct 12, 2023</span>
                      <span className="text-[10px] px-2 py-0.5 bg-error/10 text-error rounded-md font-bold mt-1">OVERDUE</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-surface-container-high text-slate-500 text-xs font-bold rounded-full">Pending Approval</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-primary font-bold">#1</span>
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-primary font-bold hover:underline">Review</button>
                  </td>
                </tr>

                <tr className="bg-slate-50/50 hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center font-bold text-primary group-hover:bg-white inset-shadow">SL</div>
                      <span className="font-bold text-on-surface">Slack Technologies</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-headline font-bold text-lg">$4,200.00</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="font-medium text-slate-500">Oct 28, 2023</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-blue-50 text-secondary text-xs font-bold rounded-full">Scheduled</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-primary font-bold">#4</span>
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-primary font-bold hover:underline">Review</button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center font-bold text-primary group-hover:bg-white inset-shadow">GF</div>
                      <span className="font-bold text-on-surface">Global Freight Inc.</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-headline font-bold text-lg">$38,920.50</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="font-medium text-slate-500">Nov 04, 2023</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-surface-container-high text-slate-500 text-xs font-bold rounded-full">New</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-primary font-bold">#2</span>
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-primary font-bold hover:underline">Review</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Receivables Insights Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold font-headline">Projected Receivables</h3>
          <div className="h-px flex-1 bg-slate-200"></div>
          <span className="text-xs font-bold text-primary bg-primary/10 p-2 rounded-lg">WEIGHTED FOR RISK</span>
        </div>

        {/* Receivables Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Primary Data Card (Large) */}
          <div className="md:col-span-2 neumorphic-card bg-white rounded-2xl overflow-hidden p-6">
            <table className="w-full text-left">
              <thead className="border-b border-slate-100">
                <tr>
                  <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                  <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expected</th>
                  <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Conf. Weighted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr>
                  <td className="py-4">
                    <p className="font-bold text-on-surface">Horizon Retail Group</p>
                    <p className="text-[10px] text-slate-500 font-medium">Inv #RET-8821</p>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-primary">$45,000</span>
                      <span className="text-[10px] font-medium text-slate-400">Due Nov 12</span>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <div className="inline-flex flex-col items-end">
                      <span className="font-headline font-bold text-on-surface">$42,750</span>
                      <span className="text-[10px] px-2 py-0.5 bg-green-50 text-green-700 font-bold rounded">95% PROB.</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4">
                    <p className="font-bold text-on-surface">Apex Tech Solutions</p>
                    <p className="text-[10px] text-slate-500 font-medium">Inv #TECH-449</p>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-primary">$18,200</span>
                      <span className="text-[10px] font-medium text-slate-400">Due Nov 15</span>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <div className="inline-flex flex-col items-end">
                      <span className="font-headline font-bold text-on-surface">$12,740</span>
                      <span className="text-[10px] px-2 py-0.5 bg-amber-50 text-amber-700 font-bold rounded">70% PROB.</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4">
                    <p className="font-bold text-on-surface">Stellar Media Ltd.</p>
                    <p className="text-[10px] text-slate-500 font-medium">Inv #MD-220</p>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-primary">$5,600</span>
                      <span className="text-[10px] font-medium text-slate-400">Due Nov 18</span>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <div className="inline-flex flex-col items-end">
                      <span className="font-headline font-bold text-on-surface">$4,480</span>
                      <span className="text-[10px] px-2 py-0.5 bg-amber-50 text-amber-700 font-bold rounded">80% PROB.</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Secondary Insight Card (Portrait) */}
          <div className="neumorphic-card bg-[#004ac6] text-white rounded-2xl p-6 flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10">
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Architectural Forecast</span>
              <h4 className="text-2xl font-bold font-headline mt-2 leading-tight">Liquidity Confidence Index</h4>
              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold font-headline tracking-tighter">8.4</span>
                <span className="text-white/60 font-bold">/10</span>
              </div>
              <p className="text-white/80 text-sm mt-4 font-medium leading-relaxed">Your receivables are 12% more stable than last month, reducing the need for bridge financing.</p>
            </div>
            {/* Abstract Graphic */}
            <div className="absolute -bottom-8 -right-8 opacity-20 transform rotate-12">
              <span className="material-symbols-outlined text-[160px]">query_stats</span>
            </div>
            <button className="mt-8 w-full py-3 bg-white/10 hover:bg-white/20 transition-all rounded-xl font-bold text-sm backdrop-blur-sm relative z-10">
              View Probabilistic Graph
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
