export default function DecisionEngine() {
  return (
    <div className="overflow-y-auto p-8 flex flex-col gap-8 max-w-[1600px] mx-auto w-full">
      {/* Page Title */}
      <div className="flex justify-between items-end">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary">Intelligence Hub</span>
          <h2 className="text-3xl font-extrabold font-headline text-on-surface -mt-1">Decision Engine</h2>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-xl bg-surface-container-highest text-on-surface font-semibold text-sm transition-transform active:scale-95 shadow-sm">
            Generate Report
          </button>
          <button className="px-6 py-2.5 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white font-semibold text-sm transition-transform active:scale-95 shadow-lg shadow-primary/20">
            Execute Payment
          </button>
        </div>
      </div>

      {/* Top: Recommended Actions Panel */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="neumorphic-card p-6 border-l-4 border-primary">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">priority_high</span>
            </div>
            <span className="text-[10px] font-bold text-primary uppercase bg-primary/5 px-2 py-1 rounded">Urgent Action</span>
          </div>
          <h3 className="font-bold text-lg mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Pay Vendor: Global Logistics</h3>
          <p className="text-sm text-slate-500 mb-4 leading-relaxed">Early payment secures a 3% discount ($1,240 saved). Recommended due to high cash reserves today.</p>
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-on-surface">$42,300.00</span>
            <button className="text-primary font-bold hover:underline">Commit →</button>
          </div>
        </div>

        <div className="neumorphic-card p-6 border-l-4 border-amber-500">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-amber-600">hourglass_top</span>
            </div>
            <span className="text-[10px] font-bold text-amber-600 uppercase bg-amber-500/5 px-2 py-1 rounded">Strategic Delay</span>
          </div>
          <h3 className="font-bold text-lg mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Delay Vendor: Prime Realty</h3>
          <p className="text-sm text-slate-500 mb-4 leading-relaxed">Penalty is only 0.5% after 15 days. Delaying preserves $85k for upcoming inventory buy.</p>
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-on-surface">$85,000.00</span>
            <button className="text-amber-600 font-bold hover:underline">Approve →</button>
          </div>
        </div>

        <div className="neumorphic-card p-6 border-l-4 border-emerald-500">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-emerald-600">handshake</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 uppercase bg-emerald-500/5 px-2 py-1 rounded">Negotiation Opportunity</span>
          </div>
          <h3 className="font-bold text-lg mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Partial: Tech Systems Inc.</h3>
          <p className="text-sm text-slate-500 mb-4 leading-relaxed">Paying 50% now maintains 'Preferred Partner' status while balancing short-term debt.</p>
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-on-surface">$12,000.00 (Split)</span>
            <button className="text-emerald-600 font-bold hover:underline">Initate →</button>
          </div>
        </div>
      </section>

      {/* Main Content Area: Table and Scenario Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Obligation Ranking Table (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-bold text-xl font-headline">Obligation Ranking</h3>
            <div className="flex gap-2">
              <span className="p-2 hover:bg-surface-container-high rounded-lg cursor-pointer transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-400">filter_list</span>
              </span>
            </div>
          </div>
          <div className="neumorphic-card overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-slate-500">
                  <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-wider">Vendor</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-wider text-right">Amount</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-wider">Due Date</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-wider text-center">TOPSIS Score</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-wider text-center">Rank</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-primary-container/10 flex items-center justify-center font-bold text-primary text-xs">GL</div>
                      <div>
                        <p className="font-bold text-on-surface text-sm">Global Logistics</p>
                        <p className="text-xs text-slate-400">Critical Utility</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right font-bold text-sm">$42,300.00</td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium">Oct 24, 2023</span>
                    <p className="text-[10px] text-error font-bold">2 Days Overdue</p>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden max-w-[80px] mx-auto">
                      <div className="bg-primary h-full" style={{ width: '94%' }}></div>
                    </div>
                    <span className="text-xs font-bold mt-1 inline-block">0.94</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs">#1</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#495c95]/10 flex items-center justify-center font-bold text-[#495c95] text-xs">TS</div>
                      <div>
                        <p className="font-bold text-on-surface text-sm">Tech Systems Inc.</p>
                        <p className="text-xs text-slate-400">Infrastructure</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right font-bold text-sm">$12,000.00</td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium">Oct 28, 2023</span>
                    <p className="text-[10px] text-slate-400 font-bold">In 2 Days</p>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden max-w-[80px] mx-auto">
                      <div className="bg-primary h-full" style={{ width: '78%' }}></div>
                    </div>
                    <span className="text-xs font-bold mt-1 inline-block">0.78</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs">#2</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-amber-100 flex items-center justify-center font-bold text-amber-700 text-xs">PR</div>
                      <div>
                        <p className="font-bold text-on-surface text-sm">Prime Realty</p>
                        <p className="text-xs text-slate-400">Lease/Rent</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right font-bold text-sm">$85,000.00</td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium">Nov 05, 2023</span>
                    <p className="text-[10px] text-slate-400 font-bold">In 10 Days</p>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden max-w-[80px] mx-auto">
                      <div className="bg-primary h-full" style={{ width: '42%' }}></div>
                    </div>
                    <span className="text-xs font-bold mt-1 inline-block">0.42</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs">#3</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-xs">SM</div>
                      <div>
                        <p className="font-bold text-on-surface text-sm">Swift Media</p>
                        <p className="text-xs text-slate-400">Marketing</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right font-bold text-sm">$4,200.00</td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium">Nov 15, 2023</span>
                    <p className="text-[10px] text-slate-400 font-bold">In 20 Days</p>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden max-w-[80px] mx-auto">
                      <div className="bg-primary h-full" style={{ width: '15%' }}></div>
                    </div>
                    <span className="text-xs font-bold mt-1 inline-block">0.15</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs">#4</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Scenario Comparison Cards (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="font-bold text-xl font-headline px-2">Scenario Analysis</h3>
          
          {/* Scenario 1 */}
          <div className="neumorphic-card bg-white p-6 ring-2 ring-primary ring-offset-4 ring-offset-surface relative">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-on-surface">Strategy: Priority First</h4>
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Penalty Risk</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Low</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Cash Remaining</span>
                <span className="text-xs font-bold text-on-surface">$142,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Rel. Impact</span>
                <div className="flex gap-1">
                  <div className="w-3 h-1 bg-primary rounded-full"></div>
                  <div className="w-3 h-1 bg-primary rounded-full"></div>
                  <div className="w-3 h-1 bg-primary rounded-full"></div>
                  <div className="w-3 h-1 bg-primary rounded-full"></div>
                  <div className="w-3 h-1 bg-slate-200 rounded-full"></div>
                </div>
              </div>
              <div className="pt-2">
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 font-bold">Optimization Score: 85%</p>
              </div>
            </div>
          </div>

          {/* Scenario 2 */}
          <div className="neumorphic-card bg-white p-6 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-on-surface">Strategy: Min. Amounts</h4>
              <span className="material-symbols-outlined text-slate-300">radio_button_unchecked</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Penalty Risk</span>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Moderate</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Cash Remaining</span>
                <span className="text-xs font-bold text-on-surface">$212,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Rel. Impact</span>
                <div className="flex gap-1">
                  <div className="w-3 h-1 bg-amber-500 rounded-full"></div>
                  <div className="w-3 h-1 bg-amber-500 rounded-full"></div>
                  <div className="w-3 h-1 bg-slate-200 rounded-full"></div>
                  <div className="w-3 h-1 bg-slate-200 rounded-full"></div>
                  <div className="w-3 h-1 bg-slate-200 rounded-full"></div>
                </div>
              </div>
              <div className="pt-2">
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full" style={{ width: '62%' }}></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 font-bold">Optimization Score: 62%</p>
              </div>
            </div>
          </div>

          {/* Scenario 3 */}
          <div className="neumorphic-card bg-white p-6 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-on-surface">Strategy: Strategic Delay</h4>
              <span className="material-symbols-outlined text-slate-300">radio_button_unchecked</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Penalty Risk</span>
                <span className="text-xs font-bold text-error bg-error/10 px-2 py-0.5 rounded">High</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Cash Remaining</span>
                <span className="text-xs font-bold text-on-surface">$288,400</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Rel. Impact</span>
                <div className="flex gap-1">
                  <div className="w-3 h-1 bg-error rounded-full"></div>
                  <div className="w-3 h-1 bg-slate-200 rounded-full"></div>
                  <div className="w-3 h-1 bg-slate-200 rounded-full"></div>
                  <div className="w-3 h-1 bg-slate-200 rounded-full"></div>
                  <div className="w-3 h-1 bg-slate-200 rounded-full"></div>
                </div>
              </div>
              <div className="pt-2">
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-error h-full" style={{ width: '38%' }}></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 font-bold">Optimization Score: 38%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Insight Card */}
      <section className="neumorphic-card bg-white p-8 relative overflow-hidden mt-4">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-extrabold font-headline mb-2">Liquidity Projection Summary</h3>
            <p className="text-slate-500 max-w-2xl leading-relaxed">
              Executing the "Priority First" strategy will leave you with a forecast liquidity buffer of 1.4x for the next 30 days. This maintains your current credit rating while avoiding $2,100 in potential late penalties from Global Logistics and Tech Systems.
            </p>
          </div>
          <div className="flex items-center gap-8 text-center bg-surface p-6 rounded-2xl neumorphic-inset">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Total Due</p>
              <p className="text-xl font-extrabold text-on-surface">$143,500</p>
            </div>
            <div className="w-px h-10 bg-slate-200"></div>
            <div>
              <p className="text-[10px] uppercase font-bold text-emerald-600 mb-1">Savings</p>
              <p className="text-xl font-extrabold text-emerald-600">$2,140</p>
            </div>
          </div>
        </div>
        {/* Decorative Element */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      </section>
    </div>
  );
}
