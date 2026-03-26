import { useState } from 'react';

export default function Settings() {
  const [weights, setWeights] = useState({
    liquidity: 85,
    risk: 45,
    growth: 60,
    cost: 30,
  });

  const [thresholds, setThresholds] = useState({
    reserve: '250,000.00',
    variance: '12.5',
    daysPayable: '45',
  });

  const [pushEnabled, setPushEnabled] = useState(true);

  return (
    <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 w-full">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface mb-2">System Architecture</h1>
        <p className="text-slate-500 font-medium">Fine-tune your financial engine and API integrations.</p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Section: Connected Accounts (6 cols initially, 7 in design) */}
        <section className="md:col-span-7 neumorphic-card bg-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold font-headline flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">api</span>
              Connected Accounts
            </h2>
            <button className="text-primary text-xs font-bold uppercase tracking-wider hover:underline">Add New API</button>
          </div>
          
          <div className="space-y-4">
            {/* Bank API */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl group hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center neumorphic-inset">
                  <span className="material-symbols-outlined text-primary">account_balance</span>
                </div>
                <div>
                  <p className="font-bold text-sm">Open Banking Hub</p>
                  <p className="text-xs text-slate-500">Connected to 14 Institutions</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase tracking-tight">Active</span>
                <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary">more_vert</span>
              </div>
            </div>
            
            {/* GST Integration */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl group hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center neumorphic-inset">
                  <span className="material-symbols-outlined text-orange-600">receipt</span>
                </div>
                <div>
                  <p className="font-bold text-sm">GST Portal</p>
                  <p className="text-xs text-slate-500">Direct Filing Enabled</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase tracking-tight">Active</span>
                <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary">more_vert</span>
              </div>
            </div>
            
            {/* WhatsApp */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl group hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center neumorphic-inset">
                  <span className="material-symbols-outlined text-[#25D366]">chat</span>
                </div>
                <div>
                  <p className="font-bold text-sm">WhatsApp Business</p>
                  <p className="text-xs text-slate-500">Instant Notifications</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase tracking-tight">Active</span>
                <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary">more_vert</span>
              </div>
            </div>
            
            {/* Razorpay */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl group hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center neumorphic-inset">
                  <span className="material-symbols-outlined text-primary">payments</span>
                </div>
                <div>
                  <p className="font-bold text-sm">Razorpay Checkout</p>
                  <p className="text-xs text-slate-500">Live Mode Enabled</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-slate-200 text-slate-600 text-[10px] font-bold rounded uppercase tracking-tight">Paused</span>
                <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary">more_vert</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: AHP Criteria Weight Sliders (5 cols) */}
        <section className="md:col-span-5 neumorphic-card bg-white rounded-2xl p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold font-headline flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">balance</span>
              AHP Allocation Weights
            </h2>
            <p className="text-xs text-slate-500 mt-1">Adjust Analytical Hierarchy Process priorities.</p>
          </div>
          
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Liquidity Priority</label>
                <span className="text-xs font-bold text-primary">{weights.liquidity}%</span>
              </div>
              <input 
                className="w-full appearance-none bg-slate-200 h-1" 
                type="range" 
                value={weights.liquidity} 
                onChange={(e) => setWeights({ ...weights, liquidity: Number(e.target.value) })}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Risk Mitigation</label>
                <span className="text-xs font-bold text-primary">{weights.risk}%</span>
              </div>
              <input 
                className="w-full appearance-none bg-slate-200 h-1" 
                type="range" 
                value={weights.risk} 
                onChange={(e) => setWeights({ ...weights, risk: Number(e.target.value) })}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Growth Velocity</label>
                <span className="text-xs font-bold text-primary">{weights.growth}%</span>
              </div>
              <input 
                className="w-full appearance-none bg-slate-200 h-1" 
                type="range" 
                value={weights.growth} 
                onChange={(e) => setWeights({ ...weights, growth: Number(e.target.value) })}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Operational Cost</label>
                <span className="text-xs font-bold text-primary">{weights.cost}%</span>
              </div>
              <input 
                className="w-full appearance-none bg-slate-200 h-1" 
                type="range" 
                value={weights.cost} 
                onChange={(e) => setWeights({ ...weights, cost: Number(e.target.value) })}
              />
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 italic">Note: Weight adjustments will recalculate the Forecast engine in real-time.</p>
          </div>
        </section>

        {/* Section: Alert Threshold Settings (5 cols) */}
        <section className="md:col-span-5 neumorphic-card bg-white rounded-2xl p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold font-headline flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">notification_important</span>
              Alert Thresholds
            </h2>
          </div>
          
          <div className="space-y-5">
            <div className="p-4 bg-slate-50 rounded-xl neumorphic-inset">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Cash Reserve Floor</label>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-400">$</span>
                <input 
                  className="w-full bg-transparent border-0 p-0 font-bold text-on-surface focus:ring-0" 
                  type="text" 
                  value={thresholds.reserve}
                  onChange={(e) => setThresholds({ ...thresholds, reserve: e.target.value })}
                />
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 rounded-xl neumorphic-inset">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Max Transaction Variance</label>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-400">%</span>
                <input 
                  className="w-full bg-transparent border-0 p-0 font-bold text-on-surface focus:ring-0" 
                  type="text" 
                  value={thresholds.variance}
                  onChange={(e) => setThresholds({ ...thresholds, variance: e.target.value })}
                />
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 rounded-xl neumorphic-inset">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Days Payable Outstanding (Target)</label>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-400">D</span>
                <input 
                  className="w-full bg-transparent border-0 p-0 font-bold text-on-surface focus:ring-0" 
                  type="text" 
                  value={thresholds.daysPayable}
                  onChange={(e) => setThresholds({ ...thresholds, daysPayable: e.target.value })}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between px-2 cursor-pointer" onClick={() => setPushEnabled(!pushEnabled)}>
              <span className="text-xs font-semibold text-slate-500">Enable Push Notifications</span>
              <div className={`w-10 h-5 rounded-full relative shadow-inner transition-colors ${pushEnabled ? 'bg-primary' : 'bg-slate-300'}`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${pushEnabled ? 'right-1' : 'left-1'}`}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Vendor Relationship Profiles (7 cols) */}
        <section className="md:col-span-7 neumorphic-card bg-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold font-headline flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">partner_reports</span>
              Vendor Relationship Profiles
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-pointer shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-sm">factory</span>
                </div>
                <span className="font-bold text-sm">Strategic Supply</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-500">Priority</span>
                  <span className="text-primary font-bold">Tier 1</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-500">Payment Cycle</span>
                  <span className="font-semibold text-on-surface">Net 30</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-pointer shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-orange-600 text-sm">cloud</span>
                </div>
                <span className="font-bold text-sm">Digital Services</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-500">Priority</span>
                  <span className="text-primary font-bold">Tier 2</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-500">Payment Cycle</span>
                  <span className="font-semibold text-on-surface">Auto-Debit</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-pointer shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">local_shipping</span>
                </div>
                <span className="font-bold text-sm">Logistics Fleet</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-500">Priority</span>
                  <span className="text-primary font-bold">Tier 1</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-500">Payment Cycle</span>
                  <span className="font-semibold text-on-surface">Weekly</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 gap-1 group hover:bg-slate-50 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-lg">add_circle</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">New Profile</span>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Action Bar */}
      <div className="mt-12 flex justify-end items-center gap-4">
        <button className="px-6 py-3 text-slate-500 font-bold text-sm hover:text-on-surface transition-colors">Discard Changes</button>
        <button className="px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 scale-100 hover:scale-[1.02] active:scale-95 transition-all">
          Commit Configurations
        </button>
      </div>
    </div>
  );
}
