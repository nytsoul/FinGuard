import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';

import { getForecast, type ForecastResponse } from '../lib/api';
import { downloadTextFile, exportElementToPdf, toCsv } from '../lib/export';

interface ForecastChartProps {
  data?: any[];
  title?: string;
  showMetrics?: boolean;
  useApi?: boolean;
  pollIntervalMs?: number;
}

type ForecastChartPoint = {
  name: string;
  expected: number;
  p10: number;
  p90: number;
  median?: number;
  p50?: number;
};

const MONTE_CARLO_DATA = [
  { name: 'Sept 01', expected: 1200000, p10: 1200000, p90: 1200000 },
  { name: 'Sept 15', expected: 1300000, p10: 1000000, p90: 1600000 },
  { name: 'Oct 01', expected: 1500000, p10: 1100000, p90: 1900000 },
  { name: 'Oct 15', expected: 1800000, p10: 1300000, p90: 2300000 },
  { name: 'Nov 01', expected: 1400000, p10: 900000, p90: 1900000 },
  { name: 'Nov 15', expected: 1100000, p10: 500000, p90: 1700000 },
  { name: 'Dec 01', expected: 1250000, p10: 400000, p90: 2100000 },
  { name: 'Dec 15', expected: 1400000, p10: 400000, p90: 2400000 },
];

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
  return `$${value}`;
};

export default function ForecastChart({
  data = MONTE_CARLO_DATA,
  title = 'Cash Flow Forecast (Monte Carlo)',
  showMetrics = true,
  useApi = true,
  pollIntervalMs = 15_000
}: ForecastChartProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('90');
  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');
  const [isLive, setIsLive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [api, setApi] = useState<ForecastResponse | null>(null);

  const refresh = async () => {
    if (!useApi) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await getForecast();
      setApi(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load forecast');
      setApi(null);
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

  const chartData = useMemo(() => {
    const fromApi = api?.data?.map((d): ForecastChartPoint => ({
      name: d.day,
      expected: d.p50 ?? d.median,
      p10: d.p10,
      p90: d.p90,
      median: d.median,
      p50: d.p50
    }));

    const raw: ForecastChartPoint[] = (fromApi && fromApi.length ? fromApi : data) as ForecastChartPoint[];

    const days = Math.max(1, Math.min(Number(timeRange || '90'), raw.length));
    const sliced = raw.slice(0, days);

    const getIndex = (d: ForecastChartPoint) => {
      const s = String(d.name ?? '');
      const match = s.match(/(\d+)/);
      return match ? Number(match[1]) : null;
    };
    const start = startDay ? Number(startDay) : null;
    const end = endDay ? Number(endDay) : null;
    if (!start && !end) return sliced;

    return sliced.filter((d: ForecastChartPoint) => {
      const idx = getIndex(d);
      if (!idx) return true;
      if (start && idx < start) return false;
      if (end && idx > end) return false;
      return true;
    });
  }, [api, data, timeRange, startDay, endDay]);

  const handleExportCsv = () => {
    const rows = chartData.map((d: any) => ({
      day: d.name,
      p90: d.p90,
      expected: d.expected,
      p10: d.p10
    }));
    downloadTextFile('forecast_monte_carlo.csv', toCsv(rows), 'text/csv;charset=utf-8');
  };

  const handleExportPdf = async () => {
    if (!chartRef.current) return;
    await exportElementToPdf({
      element: chartRef.current,
      filename: 'forecast_monte_carlo.pdf',
      title
    });
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white rounded-2xl shadow-2xl p-4 border border-slate-100 neumorphic-card">
          <p className="font-bold text-sm text-on-surface mb-3">{data.name}</p>
          <div className="space-y-1.5">
            <div className="flex justify-between gap-4">
              <span className="text-xs text-slate-600">Best Case (P90):</span>
              <span className="text-xs font-bold text-emerald-600">{formatCurrency(data.p90)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-xs text-slate-600">Expected:</span>
              <span className="text-xs font-bold text-primary">{formatCurrency(data.expected)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-xs text-slate-600">Worst Case (P10):</span>
              <span className="text-xs font-bold text-red-600">{formatCurrency(data.p10)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <span className="text-xs text-slate-600">Confidence Range: </span>
              <span className="text-xs font-bold text-on-surface">${(((data.p90 - data.p10) / data.expected) * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold font-poppins text-on-surface">{title}</h3>
          <p className="text-sm text-slate-500 mt-1">10,000 simulation scenarios with confidence bands</p>
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

      {/* Custom Day Range */}
      <div className="neumorphic-card p-4 rounded-xl bg-slate-50">
        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3">Custom Day Range</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Start Day</label>
            <input
              value={startDay}
              onChange={(e) => setStartDay(e.target.value)}
              className="mt-2 w-full bg-surface-container-low p-3 rounded-lg border-none neumorphic-inset text-sm outline-none"
              placeholder="e.g. 1"
              inputMode="numeric"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">End Day</label>
            <input
              value={endDay}
              onChange={(e) => setEndDay(e.target.value)}
              className="mt-2 w-full bg-surface-container-low p-3 rounded-lg border-none neumorphic-inset text-sm outline-none"
              placeholder="e.g. 30"
              inputMode="numeric"
            />
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="neumorphic-card p-4 rounded-xl bg-slate-50">
        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3">Forecast Period</p>
        <div className="flex gap-2 flex-wrap">
          {[
            { label: '30 Days', value: '30' },
            { label: '90 Days', value: '90', active: true },
            { label: '6 Months', value: '180' },
            { label: '12 Months', value: '365' }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              className={`px-4 py-2 rounded-lg font-semibold text-xs transition-all ${
                timeRange === option.value
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart */}
      <div ref={chartRef} className="neumorphic-card rounded-2xl p-6 bg-gradient-to-br from-white via-purple-50/20 to-slate-50">
        <ResponsiveContainer width="100%" height={450}>
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="fillConfidence" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillExpected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" opacity={0.2} />
            <XAxis
              dataKey="name"
              tick={{ fill: '#71717a', fontSize: 12, fontWeight: 500 }}
              axisLine={{ stroke: '#d4d4d8', strokeWidth: 1 }}
            />
            <YAxis
              tickFormatter={formatCurrency}
              tick={{ fill: '#71717a', fontSize: 12 }}
              axisLine={{ stroke: '#d4d4d8', strokeWidth: 1 }}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Confidence Band (P10-P90) */}
            <Area
              type="monotone"
              dataKey="p90"
              fill="url(#fillConfidence)"
              stroke="none"
              name="Best Case (P90)"
              isAnimationActive={true}
              animationDuration={1000}
            />
            <Area
              type="monotone"
              dataKey="p10"
              fill="white"
              stroke="none"
              name="Worst Case (P10)"
              isAnimationActive={true}
              animationDuration={1000}
            />

            {/* Expected Line */}
            <Line
              type="monotone"
              dataKey="expected"
              stroke="#7C3AED"
              strokeWidth={4}
              dot={{
                fill: '#7C3AED',
                r: 6,
                strokeWidth: 2,
                stroke: '#ffffff'
              }}
              activeDot={{
                r: 8
              }}
              isAnimationActive={true}
              animationDuration={1000}
              name="Expected Balance"
            />

            {/* Risk Line (Optional) */}
            <Line
              type="monotone"
              dataKey="p10"
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Worst Case (P10)"
              isAnimationActive={true}
              animationDuration={1000}
            />

            <ReferenceLine
              y={500000}
              stroke="#f59e0b"
              strokeDasharray="5 5"
              label={{
                value: 'Critical Threshold ($500k)',
                position: 'insideTopRight',
                offset: 10,
                fill: '#f59e0b',
                fontSize: 12,
                fontWeight: 600
              }}
            />

            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Metrics Grid */}
      {showMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Shortfall Risk',
              value: '12.4%',
              icon: 'warning',
              color: 'bg-red-50',
              textColor: 'text-red-600',
              description: 'Probability of going below $500k',
              trend: 'down'
            },
            {
              title: 'Days to Zero',
              value: '142',
              icon: 'hourglass_bottom',
              color: 'bg-amber-50',
              textColor: 'text-amber-600',
              description: 'Worst-case scenario',
              trend: 'up'
            },
            {
              title: 'Best Case',
              value: '$2.15M',
              icon: 'trending_up',
              color: 'bg-emerald-50',
              textColor: 'text-emerald-600',
              description: '90th percentile at Dec 15',
              trend: 'up'
            },
            {
              title: 'Worst Case',
              value: '$842k',
              icon: 'trending_down',
              color: 'bg-blue-50',
              textColor: 'text-blue-600',
              description: '10th percentile at Nov 15',
              trend: 'down'
            }
          ].map((metric, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredMetric(metric.title)}
              onMouseLeave={() => setHoveredMetric(null)}
              className={`neumorphic-card p-5 rounded-xl transition-all ${metric.color} ${
                hoveredMetric === metric.title ? 'scale-105 shadow-lg' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                    {metric.title}
                  </p>
                  <p className={`text-2xl font-bold ${metric.textColor} mt-1`}>
                    {metric.value}
                  </p>
                </div>
                <span className={`material-symbols-outlined text-4xl opacity-20 ${metric.textColor}`}>
                  {metric.icon}
                </span>
              </div>
              <p className="text-xs text-slate-600">{metric.description}</p>
              {metric.trend && (
                <div className={`mt-2 inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${
                  metric.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  <span className="material-symbols-outlined text-sm">
                    {metric.trend === 'up' ? 'trending_up' : 'trending_down'}
                  </span>
                  {metric.trend === 'up' ? 'Positive' : 'Concerning'}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Confidence Explanation */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 neumorphic-card">
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-3xl text-blue-600 flex-shrink-0">info</span>
          <div>
            <h4 className="font-bold text-on-surface mb-1">About this Forecast</h4>
            <p className="text-sm text-slate-700">
              This forecast simulates 10,000 scenarios based on historical cash flow patterns, seasonal trends, and known obligations. The confidence bands (P10-P90) represent the range of possible outcomes. The wider the band, the more uncertainty in the forecast.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
