import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';

import { getTransactions, type Transaction } from '../lib/api';
import { downloadTextFile, exportElementToPdf, toCsv } from '../lib/export';

interface CashFlowChartProps {
  data?: any[];
  title?: string;
  showLegend?: boolean;
  useApi?: boolean;
  pollIntervalMs?: number;
}

const CHART_DATA = [
  { name: 'AUG 01', current: 0, w1: 40, w2: 55, w3: 45, expected: 50 },
  { name: 'AUG 08', current: 65, w1: 0, w2: 0, w3: 0, expected: 60 },
  { name: 'AUG 15', current: 0, expected: 50, expected2: 30, expected3: 35, forecast: 48 },
  { name: 'AUG 22', current: 0, risk: 20, forecast: 35 },
  { name: 'AUG 31', current: 0, expected: 40, expected2: 55, forecast: 52 },
];

type CashFlowPoint = {
  date: string; // YYYY-MM-DD
  name: string; // display label
  inflow: number;
  outflow: number;
  net: number;
};

function formatShortDate(isoDate: string) {
  const parsed = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return parsed.toLocaleDateString(undefined, { month: 'short', day: '2-digit' });
}

function formatMoney(value: number) {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `$${(value / 1_000).toFixed(0)}k`;
  return `$${value.toFixed(0)}`;
}

export default function CashFlowChart({
  data: fallbackData = CHART_DATA,
  title = 'Daily Cash Flow Projection',
  showLegend = true,
  useApi = true,
  pollIntervalMs = 10_000
}: CashFlowChartProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [isLive, setIsLive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  const [vendorQuery, setVendorQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [direction, setDirection] = useState<'all' | 'inflow' | 'outflow'>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const refresh = async () => {
    if (!useApi) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await getTransactions();
      // getTransactions now returns { status, data: Transaction[] }
      const txList = Array.isArray(res) ? res : (res as any).data ?? [];
      setTransactions(txList);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load transactions');
      setTransactions(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useApi]);

  useEffect(() => {
    if (!useApi || !isLive) return;
    const id = window.setInterval(() => {
      refresh();
    }, pollIntervalMs);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useApi, isLive, pollIntervalMs]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as CashFlowPoint;
      return (
        <div className="bg-white rounded-2xl shadow-2xl p-4 border border-slate-100 neumorphic-card">
          <p className="font-bold text-sm text-on-surface mb-2">{data.name}</p>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-emerald-700">Inflow: {formatMoney(data.inflow)}</p>
            <p className="text-xs font-semibold text-red-700">Outflow: {formatMoney(data.outflow)}</p>
            <p className="text-xs font-bold text-primary">Net: {formatMoney(data.net)}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const vendorOptions = useMemo(() => {
    const list = (transactions || []).map((t) => t.vendor).filter(Boolean);
    return Array.from(new Set(list)).sort((a, b) => a.localeCompare(b));
  }, [transactions]);

  const categoryOptions = useMemo(() => {
    const list = (transactions || []).map((t) => (t as any).category).filter(Boolean) as string[];
    return Array.from(new Set(list)).sort((a, b) => a.localeCompare(b));
  }, [transactions]);

  const computedSeries = useMemo<CashFlowPoint[] | null>(() => {
    if (!useApi || !transactions) return null;

    const normalizedVendorQuery = vendorQuery.trim().toLowerCase();
    const filtered = transactions.filter((t) => {
      if (normalizedVendorQuery && !t.vendor?.toLowerCase().includes(normalizedVendorQuery)) return false;
      if (category !== 'all' && (t as any).category !== category) return false;

      const isInflow = (t.amount || 0) < 0;
      if (direction === 'inflow' && !isInflow) return false;
      if (direction === 'outflow' && isInflow) return false;

      if (startDate && t.date < startDate) return false;
      if (endDate && t.date > endDate) return false;
      return true;
    });

    const byDate = new Map<string, { inflow: number; outflow: number }>();
    for (const t of filtered) {
      const entry = byDate.get(t.date) || { inflow: 0, outflow: 0 };
      const amt = Number(t.amount || 0);
      if (amt < 0) entry.inflow += Math.abs(amt);
      else entry.outflow += Math.abs(amt);
      byDate.set(t.date, entry);
    }

    const dates = Array.from(byDate.keys()).sort();
    return dates.map((d) => {
      const sums = byDate.get(d)!;
      const net = sums.inflow - sums.outflow;
      return {
        date: d,
        name: formatShortDate(d),
        inflow: Math.round(sums.inflow),
        outflow: Math.round(sums.outflow),
        net: Math.round(net)
      };
    });
  }, [useApi, transactions, vendorQuery, category, direction, startDate, endDate]);

  const visibleData = useMemo(() => {
    if (computedSeries) return computedSeries;

    // Fallback to the original demo shape when API is unavailable.
    // Map the demo fields into the new series shape.
    return (fallbackData || []).map((p: any, idx: number) => {
      const outflow = Number(p.current || 0) + Number(p.expected || 0);
      const inflow = 0;
      return {
        date: String(idx),
        name: String(p.name ?? idx),
        inflow,
        outflow,
        net: inflow - outflow
      };
    }) as CashFlowPoint[];
  }, [computedSeries, fallbackData]);

  const summary = useMemo(() => {
    const days = visibleData.length;
    const totalIn = visibleData.reduce((s, p) => s + p.inflow, 0);
    const totalOut = visibleData.reduce((s, p) => s + p.outflow, 0);
    const totalNet = visibleData.reduce((s, p) => s + p.net, 0);
    const avgNet = days > 0 ? totalNet / days : 0;
    const peak = visibleData.reduce((m, p) => Math.max(m, p.net), Number.NEGATIVE_INFINITY);
    const low = visibleData.reduce((m, p) => Math.min(m, p.net), Number.POSITIVE_INFINITY);
    return {
      days,
      totalIn,
      totalOut,
      totalNet,
      avgNet,
      peak: Number.isFinite(peak) ? peak : 0,
      low: Number.isFinite(low) ? low : 0
    };
  }, [visibleData]);

  const handleExportCsv = () => {
    const rows = visibleData.map((p) => ({
      date: p.date,
      label: p.name,
      inflow: p.inflow,
      outflow: p.outflow,
      net: p.net
    }));
    downloadTextFile('cashflow_timeline.csv', toCsv(rows), 'text/csv;charset=utf-8');
  };

  const handleExportPdf = async () => {
    if (!chartRef.current) return;
    await exportElementToPdf({
      element: chartRef.current,
      filename: 'cashflow_timeline.pdf',
      title
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold font-poppins text-on-surface">{title}</h3>
          <p className="text-sm text-slate-500 mt-1">Interactive daily cash flow projection</p>
          {useApi && (
            <p className="text-[10px] font-bold uppercase tracking-widest mt-2 text-slate-500">
              {isLoading ? 'Syncing…' : error ? 'Offline (using fallback)' : isLive ? 'Live' : 'Paused'}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {useApi && (
            <button
              onClick={() => setIsLive((v) => !v)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                isLive ? 'bg-primary text-white hover:opacity-90' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              <span className="material-symbols-outlined text-sm inline mr-1">sensors</span>
              {isLive ? 'Live' : 'Paused'}
            </button>
          )}

          <button
            onClick={refresh}
            className="px-3 py-1.5 text-xs font-bold bg-primary text-white rounded-lg hover:opacity-90 transition-all"
          >
            <span className="material-symbols-outlined text-sm inline mr-1">refresh</span>
            Refresh
          </button>
          <button
            onClick={handleExportCsv}
            className="px-3 py-1.5 text-xs font-bold bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-all"
          >
            <span className="material-symbols-outlined text-sm inline mr-1">table_view</span>
            CSV
          </button>
          <button
            onClick={handleExportPdf}
            className="px-3 py-1.5 text-xs font-bold bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-all"
          >
            <span className="material-symbols-outlined text-sm inline mr-1">picture_as_pdf</span>
            PDF
          </button>
        </div>
      </div>

      {/* Filters + Custom Date Range */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 neumorphic-card p-4 rounded-xl">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3">Advanced Filters</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Vendor</label>
              <input
                value={vendorQuery}
                onChange={(e) => setVendorQuery(e.target.value)}
                className="mt-2 w-full bg-surface-container-low p-3 rounded-lg border-none neumorphic-inset text-sm outline-none"
                placeholder={vendorOptions.length ? `Search (e.g., ${vendorOptions[0]})` : 'Search vendor…'}
                type="text"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Transaction Type</label>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value as any)}
                className="mt-2 w-full bg-surface-container-low p-3 rounded-lg border-none neumorphic-inset text-sm outline-none"
              >
                <option value="all">All</option>
                <option value="outflow">Outflow</option>
                <option value="inflow">Inflow</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full bg-surface-container-low p-3 rounded-lg border-none neumorphic-inset text-sm outline-none"
              >
                <option value="all">All</option>
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Start Date</label>
              <input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-2 w-full bg-surface-container-low p-3 rounded-lg border-none neumorphic-inset text-sm outline-none"
                type="date"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">End Date</label>
              <input
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-2 w-full bg-surface-container-low p-3 rounded-lg border-none neumorphic-inset text-sm outline-none"
                type="date"
              />
            </div>
          </div>
        </div>

        <div className="neumorphic-card p-4 rounded-xl">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Period Summary</p>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-xs text-slate-600">Days:</span>
              <span className="text-sm font-bold text-on-surface">{summary.days}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-slate-600">Avg Net:</span>
              <span className="text-sm font-bold text-primary">{formatMoney(summary.avgNet)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-slate-600">Total In:</span>
              <span className="text-sm font-bold text-emerald-600">{formatMoney(summary.totalIn)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-slate-600">Total Out:</span>
              <span className="text-sm font-bold text-red-600">{formatMoney(summary.totalOut)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div ref={chartRef} className="neumorphic-card rounded-2xl p-6 bg-gradient-to-br from-white to-slate-50">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={visibleData}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#004ac6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#004ac6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorWarn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={(v: any) => formatMoney(Number(v))}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            <ReferenceLine 
              y={0}
              stroke="#e2e8f0"
              strokeDasharray="3 3"
            />

            <Bar 
              dataKey="inflow" 
              fill="#10b981" 
              radius={[8, 8, 0, 0]}
              isAnimationActive={true}
              animationDuration={800}
              name="Inflow"
            />
            <Bar 
              dataKey="outflow" 
              fill="#dc2626" 
              radius={[8, 8, 0, 0]}
              isAnimationActive={true}
              animationDuration={800}
              name="Outflow"
            />
            <Line 
              type="monotone" 
              dataKey="net" 
              stroke="#004ac6" 
              strokeWidth={3}
              dot={{ fill: '#004ac6', r: 5 }}
              activeDot={{ r: 7 }}
              isAnimationActive={true}
              animationDuration={800}
              name="Net"
            />
            
            {showLegend && (
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Details Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="neumorphic-card p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-50/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase">Total Net</p>
              <p className="text-2xl font-bold text-primary mt-1">{formatMoney(summary.totalNet)}</p>
            </div>
            <span className="material-symbols-outlined text-5xl text-blue-200">trending_up</span>
          </div>
        </div>
        <div className="neumorphic-card p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-50/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase">Total Inflow</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{formatMoney(summary.totalIn)}</p>
            </div>
            <span className="material-symbols-outlined text-5xl text-emerald-200">bar_chart</span>
          </div>
        </div>
        <div className="neumorphic-card p-4 rounded-xl bg-gradient-to-br from-amber-50 to-amber-50/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase">Peak Net Day</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">{formatMoney(summary.peak)}</p>
            </div>
            <span className="material-symbols-outlined text-5xl text-amber-200">show_chart</span>
          </div>
        </div>
        <div className="neumorphic-card p-4 rounded-xl bg-gradient-to-br from-red-50 to-red-50/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase">Lowest Net Day</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{formatMoney(summary.low)}</p>
            </div>
            <span className="material-symbols-outlined text-5xl text-red-200">warning</span>
          </div>
        </div>
      </div>
    </div>
  );
}
