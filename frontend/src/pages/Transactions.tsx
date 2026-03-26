import { useEffect, useState } from 'react';
import { getTransactions, getReconcileSummary, type Transaction, type ReconcileSummary } from '../lib/api';

function fmt(n: number) {
  return '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}
function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-slate-200 rounded ${className}`} />;
}

const SOURCE_BADGE: Record<string, string> = {
  aa: 'bg-blue-100 text-blue-700',
  gst: 'bg-violet-100 text-violet-700',
  ocr: 'bg-amber-100 text-amber-700',
  simulated: 'bg-slate-100 text-slate-600',
  manual: 'bg-emerald-100 text-emerald-700',
};
const SOURCE_LABEL: Record<string, string> = {
  aa: 'Bank (AA)',
  gst: 'GST Portal',
  ocr: 'OCR/Receipt',
  simulated: 'Simulated',
  manual: 'Manual',
};

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [recon, setRecon] = useState<ReconcileSummary | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getTransactions(), getReconcileSummary()])
      .then(([tx, rc]) => {
        setTransactions(tx.data);
        setRecon(rc);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = transactions
    .filter(t => filter === 'all' || t.direction === filter)
    .filter(t => !search || t.vendor.toLowerCase().includes(search.toLowerCase()) || t.narration.toLowerCase().includes(search.toLowerCase()));

  const totalDebit = transactions.filter(t => t.direction === 'debit').reduce((s, t) => s + t.amount, 0);
  const totalCredit = transactions.filter(t => t.direction === 'credit').reduce((s, t) => s + t.amount, 0);

  return (
    <div className="overflow-y-auto p-4 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-semibold">
          ⚠️ Backend error: {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Records', value: transactions.length.toString(), icon: 'receipt_long', color: 'text-primary' },
          { label: 'After Dedup', value: (recon?.deduplicated_count ?? '—').toString(), icon: 'deblur', color: 'text-emerald-600' },
          { label: 'Total Debits', value: fmt(totalDebit), icon: 'arrow_upward', color: 'text-error' },
          { label: 'Total Credits', value: fmt(totalCredit), icon: 'arrow_downward', color: 'text-emerald-600' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="neumorphic-card p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">{label}</span>
              <span className={`material-symbols-outlined text-lg ${color}`}>{icon}</span>
            </div>
            {loading ? <Skeleton className="h-8 w-32" /> : (
              <p className={`text-2xl font-bold font-poppins ${color}`}>{value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Dedup Clusters */}
      {recon && recon.duplicate_clusters.length > 0 && (
        <div className="neumorphic-card p-5">
          <h3 className="font-bold text-sm font-poppins text-on-surface mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-500 text-base">merge</span>
            Fuzzy Deduplication Clusters ({recon.duplicate_clusters.length} removed)
          </h3>
          <div className="space-y-2">
            {recon.duplicate_clusters.map(dc => (
              <div key={dc.duplicate_id} className="flex items-center gap-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs">
                <span className="material-symbols-outlined text-amber-500 text-sm">merge_type</span>
                <div className="flex-1">
                  <span className="font-bold text-amber-800">{dc.vendor}</span>
                  <span className="text-amber-600 ml-2">{fmt(dc.amount)}</span>
                </div>
                <span className="text-slate-500 font-roboto">{dc.reason}</span>
                <span className="font-bold text-amber-700">Kept: {dc.kept_id} · Removed: {dc.duplicate_id}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter + Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex gap-2">
          {['all', 'debit', 'credit'].map(f => (
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
          placeholder="Search vendor or narration…"
          className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm font-roboto focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Transaction Table */}
      <div className="neumorphic-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-container-low border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Vendor</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Date</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Amount</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Source</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Confidence</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Narration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [1,2,3,4,5,6].map(i => (
                  <tr key={i}><td colSpan={6} className="px-4 py-3"><Skeleton className="h-4 w-full" /></td></tr>
                ))
              ) : filtered.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${tx.direction === 'credit' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                        {tx.vendor[0]}
                      </div>
                      <span className="font-semibold font-roboto text-xs max-w-[140px] truncate">{tx.vendor}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500 font-roboto whitespace-nowrap">{tx.date}</td>
                  <td className="px-4 py-3">
                    <span className={`font-bold font-poppins text-xs ${tx.direction === 'credit' ? 'text-emerald-600' : 'text-error'}`}>
                      {tx.direction === 'credit' ? '+' : '−'}{fmt(tx.amount)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${SOURCE_BADGE[tx.source] ?? 'bg-slate-100 text-slate-600'}`}>
                      {SOURCE_LABEL[tx.source] ?? tx.source}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${tx.confidence * 100}%` }} />
                      </div>
                      <span className="text-[10px] text-slate-500 font-inter">{(tx.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[10px] text-slate-400 font-roboto max-w-[200px] truncate">{tx.narration}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && filtered.length === 0 && (
            <div className="px-4 py-12 text-center text-slate-400 text-sm font-roboto">No transactions match your filter.</div>
          )}
        </div>
      </div>
    </div>
  );
}
