<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';

export default function Invoices() {
  const navigate = useNavigate();
  return (
    <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 w-full space-y-8">
      {/* Page Header & Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Invoice Registry</h2>
          <p className="text-slate-500 mt-1 font-medium">Manage and optimize your architectural cash flow</p>
        </div>
        <div className="flex flex-wrap gap-3">
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tab Switcher (Architectural Card) */}
        <div className="lg:col-span-2 neumorphic-card bg-white rounded-2xl p-2 flex">
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
        <div className="lg:col-span-2 neumorphic-card bg-white rounded-2xl p-6 flex items-center justify-between">
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
            <table className="w-full min-w-[960px] text-left border-collapse">
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
                      <button
                        onClick={() => navigate('/dashboard/vendor/amazon-web-services')}
                        className="font-bold text-primary hover:underline transition-all"
                      >
                        Amazon Web Services
                      </button>
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
                      <button
                        onClick={() => navigate('/dashboard/vendor/slack-technologies')}
                        className="font-bold text-primary hover:underline transition-all"
                      >
                        Slack Technologies
                      </button>
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
                      <button
                        onClick={() => navigate('/dashboard/vendor/global-freight-inc')}
                        className="font-bold text-primary hover:underline transition-all"
                      >
                        Global Freight Inc.
                      </button>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Primary Data Card (Large) */}
          <div className="lg:col-span-2 neumorphic-card bg-white rounded-2xl overflow-hidden p-6">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left">
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
                    <button
                      onClick={() => navigate('/dashboard/vendor/horizon-retail-group')}
                      className="font-bold text-primary hover:underline transition-all text-left"
                    >
                      Horizon Retail Group
                    </button>
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
=======
import { useEffect, useState } from 'react';
import { getInvoices, getInvoiceSummary, type Invoice, type InvoiceSummary } from '../lib/api';

function fmt(n: number) {
  return '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}
function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-slate-200 rounded ${className}`} />;
}

const STATUS_STYLE: Record<string, string> = {
  matched: 'bg-emerald-100 text-emerald-700',
  unmatched: 'bg-red-100 text-red-600',
  partial: 'bg-amber-100 text-amber-700',
};

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [summary, setSummary] = useState<InvoiceSummary | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getInvoices(), getInvoiceSummary()])
      .then(([inv, sum]) => {
        setInvoices(inv.data);
        setSummary(sum);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = invoices
    .filter(inv => filter === 'all' || inv.status === filter)
    .filter(inv => !search || inv.vendor.toLowerCase().includes(search.toLowerCase()) || inv.invoice_id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="overflow-y-auto p-4 lg:p-8 space-y-6 w-full">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-semibold">
          ⚠️ Backend error: {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Invoices', value: summary?.total_invoices ?? '—', color: 'text-primary', icon: 'description' },
          { label: 'Matched', value: summary?.matched ?? '—', color: 'text-emerald-600', icon: 'check_circle' },
          { label: 'Unmatched', value: summary?.unmatched ?? '—', color: 'text-error', icon: 'cancel' },
          { label: 'Partial', value: summary?.breakdown.partial ?? '—', color: 'text-amber-600', icon: 'pending' },
        ].map(({ label, value, color, icon }) => (
          <div key={label} className="neumorphic-card p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">{label}</span>
              <span className={`material-symbols-outlined text-lg ${color}`}>{icon}</span>
            </div>
            {loading ? <Skeleton className="h-8 w-16" /> : (
              <p className={`text-3xl font-bold font-poppins ${color}`}>{value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Match rate bar */}
      {summary && (
        <div className="neumorphic-card p-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold font-poppins">Invoice Match Rate</span>
            <span className="text-sm font-bold text-primary">{Math.round((summary.matched / summary.total_invoices) * 100)}%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex">
            <div className="h-full bg-emerald-500 transition-all" style={{ width: `${(summary.matched / summary.total_invoices) * 100}%` }} />
            {summary.breakdown.partial > 0 && (
              <div className="h-full bg-amber-400 transition-all" style={{ width: `${(summary.breakdown.partial / summary.total_invoices) * 100}%` }} />
            )}
            <div className="h-full bg-red-400 transition-all" style={{ width: `${(summary.unmatched / summary.total_invoices) * 100}%` }} />
          </div>
          <div className="flex gap-4 mt-2 text-[10px] font-semibold">
            <span className="text-emerald-600">■ Matched ({summary.matched})</span>
            {summary.breakdown.partial > 0 && <span className="text-amber-600">■ Partial ({summary.breakdown.partial})</span>}
            <span className="text-error">■ Unmatched ({summary.unmatched})</span>
          </div>
        </div>
      )}

      {/* Filter + Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex gap-2">
          {['all', 'matched', 'unmatched', 'partial'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-inter transition-all ${filter === f ? 'bg-primary text-white shadow-lg' : 'neumorphic-smooth text-slate-600 hover:bg-slate-100'}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search vendor or invoice ID…"
          className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm font-roboto focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Invoice Table */}
      <div className="neumorphic-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-container-low border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Invoice ID</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Vendor</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Amount</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Due Date</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Source</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Match Conf.</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [1,2,3,4,5].map(i => (
                  <tr key={i}><td colSpan={7} className="px-4 py-3"><Skeleton className="h-4 w-full" /></td></tr>
                ))
              ) : filtered.map(inv => (
                <tr key={inv.invoice_id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{inv.invoice_id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">{inv.vendor[0]}</div>
                      <span className="font-semibold text-xs font-roboto max-w-[140px] truncate">{inv.vendor}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold font-poppins text-xs">{fmt(inv.amount)}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 font-roboto whitespace-nowrap">{inv.due_date}</td>
                  <td className="px-4 py-3 text-[10px] font-semibold uppercase text-slate-500">{inv.source}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${(Number(inv.match_confidence) || 0) * 100}%` }} />
                      </div>
                      <span className="text-[10px] text-slate-500">{((Number(inv.match_confidence) || 0) * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${STATUS_STYLE[inv.status] ?? 'bg-slate-100 text-slate-600'}`}>
                      {inv.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && filtered.length === 0 && (
            <div className="px-4 py-12 text-center text-slate-400 text-sm">No invoices match your filter.</div>
          )}
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
        </div>
      </div>
    </div>
  );
}
