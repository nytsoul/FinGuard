export default function Transactions() {
  return (
    <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Transactions</h2>
          <p className="text-on-surface-variant font-body">Review and reconcile your digital financial footprint.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <button className="px-5 py-2.5 bg-surface-container-highest text-on-surface text-sm font-semibold rounded-xl hover:bg-surface-container-high transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-base">cloud_upload</span>
            Import CSV
          </button>
          <button className="px-5 py-2.5 bg-gradient-to-br from-primary to-primary-container text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-base">add</span>
            New Entry
          </button>
        </div>
      </div>

      {/* Bento Layout Start */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Filters Panel (Sidebar Style Left) */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="bg-surface-container-lowest p-6 rounded-xl neumorphic-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline font-bold text-sm tracking-tight">FILTERS</h3>
              <button className="text-primary text-[10px] font-bold tracking-widest uppercase hover:underline">Clear All</button>
            </div>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-label font-bold text-slate-500 tracking-wider uppercase">Date Range</label>
                <div className="bg-surface-container-low p-2 rounded-lg neumorphic-inset">
                  <select className="w-full bg-transparent border-none text-xs font-medium focus:ring-0 outline-none">
                    <option>Last 30 Days</option>
                    <option>This Quarter</option>
                    <option>Custom Range</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-label font-bold text-slate-500 tracking-wider uppercase">Vendor</label>
                <div className="bg-surface-container-low p-2 rounded-lg neumorphic-inset flex items-center">
                  <span className="material-symbols-outlined text-slate-400 text-sm mr-2">store</span>
                  <input className="w-full bg-transparent border-none text-xs p-0 focus:ring-0 outline-none" placeholder="Search vendor..." type="text" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-label font-bold text-slate-500 tracking-wider uppercase">Category</label>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 bg-primary/10 text-primary text-[11px] font-bold rounded-full">SaaS</button>
                  <button className="px-3 py-1.5 bg-surface-container-high text-slate-600 text-[11px] font-medium rounded-full">Payroll</button>
                  <button className="px-3 py-1.5 bg-surface-container-high text-slate-600 text-[11px] font-medium rounded-full">Office</button>
                  <button className="px-3 py-1.5 bg-surface-container-high text-slate-600 text-[11px] font-medium rounded-full">Marketing</button>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-label font-bold text-slate-500 tracking-wider uppercase">Source Account</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input defaultChecked className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 accent-primary" type="checkbox" />
                    <span className="text-xs font-medium text-slate-700 group-hover:text-primary transition-colors">Chase Business ...9021</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 accent-primary" type="checkbox" />
                    <span className="text-xs font-medium text-slate-700 group-hover:text-primary transition-colors">AMEX Corporate ...4002</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights Mini-Card */}
          <div className="bg-gradient-to-br from-primary to-[#2563eb] p-6 rounded-xl shadow-lg shadow-primary/20 text-white">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <h4 className="font-headline font-bold text-sm">Smart Suggestion</h4>
            </div>
            <p className="text-xs leading-relaxed opacity-90">CashMind detected 4 recurring subscriptions that can be batched to save $120/mo in processing fees.</p>
            <button className="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-xs font-bold transition-all">Review Savings</button>
          </div>
        </div>

        {/* Main Transaction Table (Center/Right) */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {/* Table Card */}
          <div className="bg-surface-container-lowest rounded-xl neumorphic-card overflow-hidden">
            <div className="p-6 flex justify-between items-center bg-white border-b border-slate-100">
              <h3 className="font-headline font-bold text-sm">Recent Activity</h3>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-label font-bold tracking-widest uppercase">
                <span>SHOWING: 12 OF 1,402</span>
                <span className="h-1 w-1 bg-slate-300 rounded-full"></span>
                <button className="text-primary hover:underline">EXPORT PAGE</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-label font-bold text-slate-500 tracking-wider uppercase">Date & Vendor</th>
                    <th className="px-6 py-4 text-[10px] font-label font-bold text-slate-500 tracking-wider uppercase text-right">Amount</th>
                    <th className="px-6 py-4 text-[10px] font-label font-bold text-slate-500 tracking-wider uppercase">Category & Source</th>
                    <th className="px-6 py-4 text-[10px] font-label font-bold text-slate-500 tracking-wider uppercase">Status</th>
                    <th className="px-6 py-4 text-[10px] font-label font-bold text-slate-500 tracking-wider uppercase">Match</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                {/* Row 1 */}
                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-white border border-transparent group-hover:border-slate-100 transition-all">
                        <span className="material-symbols-outlined">cloud</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">Amazon Web Services</p>
                        <p className="text-[11px] text-slate-500">Oct 24, 2023 • ID: #AWS-8821</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-bold text-on-surface">-$1,240.50</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-xs font-semibold text-primary">SaaS Infrastructure</p>
                      <p className="text-[10px] text-slate-400">Chase Business ...9021</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-[#16a34a] text-[#16a34a] bg-opacity-10 text-[10px] font-bold rounded uppercase tracking-wider">Verified</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#16a34a] h-full" style={{ width: '98%' }}></div>
                      </div>
                      <span className="text-[11px] font-bold text-slate-600">98%</span>
                    </div>
                  </td>
                </tr>

                {/* Row 2 (With Duplicate Alert) */}
                <tr className="hover:bg-red-50/50 transition-colors group bg-error/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-error group-hover:bg-white border border-transparent group-hover:border-slate-100 transition-all">
                        <span className="material-symbols-outlined">local_cafe</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">Blue Bottle Coffee</p>
                        <p className="text-[11px] text-slate-500">Oct 23, 2023 • ID: #BBC-1002</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-bold text-on-surface">-$34.12</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-xs font-semibold text-on-surface-variant">General Office</p>
                      <p className="text-[10px] text-slate-400">AMEX Corporate ...4002</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded uppercase tracking-wider">Duplicate?</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-error h-full" style={{ width: '45%' }}></div>
                      </div>
                      <span className="text-[11px] font-bold text-slate-600">45%</span>
                    </div>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-white border border-transparent group-hover:border-slate-100 transition-all">
                        <span className="material-symbols-outlined">work</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">WeWork Manhattan</p>
                        <p className="text-[11px] text-slate-500">Oct 22, 2023 • ID: #WW-9902</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-bold text-on-surface">-$3,500.00</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-xs font-semibold text-on-surface-variant">Real Estate</p>
                      <p className="text-[10px] text-slate-400">Chase Business ...9021</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-[#16a34a] text-[#16a34a] bg-opacity-10 text-[10px] font-bold rounded uppercase tracking-wider">Verified</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#16a34a] h-full" style={{ width: '100%' }}></div>
                      </div>
                      <span className="text-[11px] font-bold text-slate-600">100%</span>
                    </div>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-white border border-transparent group-hover:border-slate-100 transition-all">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">Mailchimp</p>
                        <p className="text-[11px] text-slate-500">Oct 21, 2023 • ID: #MC-4412</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-bold text-on-surface">-$240.00</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-xs font-semibold text-on-surface-variant">Marketing</p>
                      <p className="text-[10px] text-slate-400">AMEX Corporate ...4002</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-200 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">Pending</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: '82%' }}></div>
                      </div>
                      <span className="text-[11px] font-bold text-slate-600">82%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="p-6 bg-surface flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-slate-100">
              <button className="px-4 py-2 bg-white rounded-lg text-xs font-bold shadow-sm hover:shadow-md transition-shadow disabled:opacity-50">Previous</button>
              <div className="flex gap-2 justify-center sm:justify-start">
                <button className="w-8 h-8 rounded-lg bg-primary text-white text-xs font-bold shadow-sm">1</button>
                <button className="w-8 h-8 rounded-lg bg-white hover:bg-slate-50 text-xs font-bold shadow-sm">2</button>
                <button className="w-8 h-8 rounded-lg bg-white hover:bg-slate-50 text-xs font-bold shadow-sm">3</button>
              </div>
              <button className="px-4 py-2 bg-white rounded-lg text-xs font-bold shadow-sm hover:shadow-md transition-shadow">Next</button>
            </div>
          </div>

          {/* Bottom Resolution Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Duplicate Resolution */}
            <div className="bg-white p-6 rounded-xl neumorphic-card border-l-4 border-error">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-error/10 text-error rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>content_copy</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-sm tracking-tight">Potential Duplicates</h3>
                    <p className="text-[11px] text-slate-500">2 clusters require immediate review</p>
                  </div>
                </div>
                <span className="bg-error text-white text-[10px] font-bold px-2 py-0.5 rounded-full">High Priority</span>
              </div>
              
              <div className="bg-surface-container-low rounded-lg p-3 mb-4 flex items-center justify-between border border-slate-100">
                <div>
                  <p className="text-xs font-bold">Blue Bottle Coffee (-$34.12)</p>
                  <p className="text-[10px] text-slate-500 italic">Matched with ID #BBC-1001 from Oct 22</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-1.5 bg-white text-slate-600 hover:text-error rounded-md transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-sm block">delete</span>
                  </button>
                  <button className="p-1.5 bg-white text-slate-600 hover:text-primary rounded-md transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-sm block">check</span>
                  </button>
                </div>
              </div>
              <button className="w-full py-2 border-2 border-dashed border-slate-200 text-slate-500 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors">Review Remaining Duplicates</button>
            </div>
            
            {/* Classification Correction */}
            <div className="bg-white p-6 rounded-xl neumorphic-card border-l-4 border-primary">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-sm tracking-tight">AI Correction Lab</h3>
                    <p className="text-[11px] text-slate-500">ML models learning from your habits</p>
                  </div>
                </div>
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">8 Tasks</span>
              </div>
              
              <div className="space-y-3">
                <div className="bg-surface-container-low border border-slate-100 rounded-lg p-4">
                  <p className="text-[10px] font-label font-bold text-slate-500 uppercase tracking-wider mb-2">Confidence Check: "Uber Technologies"</p>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-500 mb-1">Detected as:</p>
                      <div className="px-3 py-2 bg-white rounded-lg text-xs font-bold text-primary shadow-sm">Travel & Transit</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-500 mb-1">Should be:</p>
                      <select className="w-full px-3 py-2 bg-white border-transparent rounded-lg text-xs font-bold focus:ring-2 focus:ring-primary shadow-sm outline-none">
                        <option>Travel & Transit</option>
                        <option>Meals & Entertainment</option>
                        <option>Logistics</option>
                      </select>
                    </div>
                  </div>
                  <button className="mt-4 w-full py-2 bg-primary text-white rounded-lg text-xs font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-opacity">Train Model & Apply</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
