export default function ActionComposer() {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 h-[calc(100vh-4rem)]">
      <div className="flex flex-col md:flex-row gap-8 items-start h-full pb-8">
        
        {/* Left: Draft Messages List */}
        <section className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold font-headline tracking-tight">Action Composer</h2>
            <button className="p-2 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Recent Drafts</label>
            
            {/* Draft Item 1 Active */}
            <div className="neumorphic-card bg-white p-5 rounded-xl border-l-4 border-primary">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase">Payment Reminder</span>
                <span className="text-[10px] text-slate-400 font-medium">2m ago</span>
              </div>
              <h3 className="font-bold text-on-surface mb-1">Invoice #8842 - Overdue</h3>
              <p className="text-xs text-slate-500 line-clamp-2">Dear Mr. Henderson, we noticed that the payment for last month's consultation...</p>
            </div>
            
            {/* Draft Item 2 */}
            <div className="bg-surface-container-low p-5 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer group neumorphic-inset">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2 py-0.5 bg-slate-200 text-slate-600 text-[10px] font-bold rounded uppercase">Onboarding</span>
                <span className="text-[10px] text-slate-400 font-medium">1h ago</span>
              </div>
              <h3 className="font-bold text-on-surface mb-1">Welcome to CashMind Premier</h3>
              <p className="text-xs text-slate-500 line-clamp-2">Hi Sarah, welcome to our family! We are excited to help you manage...</p>
            </div>
            
            {/* Draft Item 3 */}
            <div className="bg-surface-container-low p-5 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer group neumorphic-inset">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2 py-0.5 bg-slate-200 text-slate-600 text-[10px] font-bold rounded uppercase">Security</span>
                <span className="text-[10px] text-slate-400 font-medium">Yesterday</span>
              </div>
              <h3 className="font-bold text-on-surface mb-1">Unusual Login Detected</h3>
              <p className="text-xs text-slate-500 line-clamp-2">We noticed a login to your account from a new device in London, UK...</p>
            </div>
          </div>
        </section>

        {/* Right: Message Preview Panel and Edit Box */}
        <section className="flex-1 w-full flex flex-col gap-6">
          <div className="neumorphic-card bg-white p-4 sm:p-6 lg:p-8 rounded-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-400">person</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Recipient: Marcus Henderson</h3>
                  <p className="text-sm text-slate-500">marcus.h@techflow.io • +44 7700 900231</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-surface-container-low rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors">
                  Templates
                </button>
                <button className="px-4 py-2 bg-surface-container-low rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors">
                  Variables
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Subject Line</label>
                <input 
                  className="w-full bg-surface-container-low p-4 rounded-xl border-none font-bold text-on-surface neumorphic-inset focus:ring-2 focus:ring-primary/20" 
                  type="text" 
                  defaultValue="URGENT: Outstanding Balance for TechFlow Consultations"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Message Content</label>
                <textarea 
                  className="w-full bg-surface-container-low p-4 rounded-xl border-none text-on-surface neumorphic-inset focus:ring-2 focus:ring-primary/20 leading-relaxed" 
                  rows={8}
                  defaultValue={`Dear Marcus,\n\nI hope you're having a productive week.\n\nWe are writing to kindly remind you of the outstanding balance for invoice #8842, which was due on the 15th of last month. As your financial architects, we want to ensure your cash flow remains optimized and avoid any late penalty fees.\n\nThe total amount due is $12,450.00.\n\nYou can complete the payment via your portal dashboard or the link attached below. If you have already made the transfer, please disregard this message.\n\nBest regards,\nThe CashMind Team`}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-5 h-5 rounded border-2 border-primary flex items-center justify-center group-hover:bg-primary/5">
                      <div className="w-2.5 h-2.5 bg-primary rounded-sm"></div>
                    </div>
                    <span className="text-sm font-semibold">Email</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-5 h-5 rounded border-2 border-slate-300 flex items-center justify-center"></div>
                    <span className="text-sm font-semibold text-slate-500">SMS</span>
                  </label>
                </div>
                
                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-[#25D366] text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#25D366]/20 hover:scale-[1.02] active:scale-95 transition-all">
                    <span className="material-symbols-outlined fill" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                    Send via WhatsApp
                  </button>
                  <button className="px-8 py-3 bg-gradient-to-br from-primary to-[#003ea8] text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                    Send Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom: Action History Table */}
      <section className="space-y-4 pb-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-xl font-extrabold font-headline tracking-tight">Transmission Log</h2>
            <p className="text-sm text-slate-500">Audit trail of all outbound communications</p>
          </div>
          <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
            View Full History <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        
        <div className="neumorphic-card bg-white rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">Recipient</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">Type</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">Sent Date</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">Engagement</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-primary font-bold text-xs">EL</div>
                    <div>
                      <p className="font-bold text-sm">Elena Laine</p>
                      <p className="text-[10px] text-slate-500">Global Logistics Ltd</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1 text-sm font-medium">
                    <span className="material-symbols-outlined text-base text-slate-400">mail</span> Email
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-tighter">Delivered</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">Oct 24, 14:32</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">88%</span>
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors">more_vert</button>
                </td>
              </tr>
              
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-xs">TR</div>
                    <div>
                      <p className="font-bold text-sm">Thomas Reed</p>
                      <p className="text-[10px] text-slate-500">Individual Partner</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1 text-sm font-medium">
                    <span className="material-symbols-outlined text-base text-[#25D366]">chat</span> WhatsApp
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-tighter">Read</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">Oct 24, 09:15</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 italic">
                    Instant Response
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors">more_vert</button>
                </td>
              </tr>
              
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">SK</div>
                    <div>
                      <p className="font-bold text-sm">Sunil Kapoor</p>
                      <p className="text-[10px] text-slate-500">Kapoor Foundations</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1 text-sm font-medium">
                    <span className="material-symbols-outlined text-base text-slate-400">mail</span> Email
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-full uppercase tracking-tighter">Bounced</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">Oct 23, 17:45</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-error">0%</span>
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-error" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors">more_vert</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Contextual FAB (Hidden on Mobile) */}
      <div className="fixed bottom-8 right-8 hidden lg:block z-50">
        <button className="w-16 h-16 bg-gradient-to-br from-primary to-[#003ea8] text-white rounded-full shadow-[0_8px_24px_rgba(0,74,198,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group">
          <span className="material-symbols-outlined text-3xl">auto_awesome</span>
          <span className="absolute right-full mr-4 px-3 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">AI Smart Drafting</span>
        </button>
      </div>
    </div>
  );
}
