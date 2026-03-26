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
    .filter(inv => !search || inv.vendor.toLowerCase().includes(search.toLowerCase()) || (inv.invoice_id ?? '').toLowerCase().includes(search.toLowerCase()));

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
        </div>
      </div>
    </div>
  );
}
