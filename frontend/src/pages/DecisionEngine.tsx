import { useEffect, useState } from 'react';
import { getDecisionRanking, getScenarios, type Obligation, type ScenarioResult } from '../lib/api';

function fmt(n: number) {
  return '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}
function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-slate-200 rounded ${className}`} />;
}

const STRATEGY_LABELS: Record<string, string> = {
  smallest_first: 'Smallest First',
  priority_first: 'Priority First',
  request_extensions: 'Request Extensions',
  partial_pay_all: 'Partial Pay All',
  delay_non_critical: 'Delay Non-Critical',
};

const STRATEGY_ICONS: Record<string, string> = {
  smallest_first: 'low_priority',
  priority_first: 'priority_high',
  request_extensions: 'schedule',
  partial_pay_all: 'splitscreen',
  delay_non_critical: 'snooze',
};

export default function DecisionEngine() {
  const [obligations, setObligations] = useState<Obligation[]>([]);
  const [scenarios, setScenarios] = useState<ScenarioResult[]>([]);
  const [recommended, setRecommended] = useState<ScenarioResult | null>(null);
  const [weights, setWeights] = useState<{ criteria: string[]; weights: number[] } | null>(null);
  const [selected, setSelected] = useState<Obligation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getDecisionRanking(), getScenarios()])
      .then(([dr, sc]) => {
        setObligations(dr.data);
        setWeights(dr.weights);
        setScenarios(sc.data);
        setRecommended(sc.recommended);
        if (dr.data.length) setSelected(dr.data[0]);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="overflow-y-auto p-4 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-semibold">
          ⚠️ Backend error: {error}
        </div>
      )}

      {/* AHP Weights Banner */}
      {weights && (
        <div className="neumorphic-card p-5 flex flex-wrap gap-4 items-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AHP Criteria Weights</span>
          {weights.criteria.map((c, i) => (
            <div key={c} className="flex items-center gap-2">
              <div className="h-2 bg-primary rounded-full" style={{ width: `${Math.round(weights.weights[i] * 100)}px` }} />
              <span className="text-xs font-semibold text-on-surface font-inter capitalize">{c.replace(/_/g, ' ')}</span>
              <span className="text-xs font-bold text-primary">{(weights.weights[i] * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left: TOPSIS Ranking */}
        <div className="xl:col-span-2 space-y-4">
          <h3 className="font-bold text-base font-poppins text-on-surface">TOPSIS Obligation Ranking</h3>
          {loading ? (
            [1,2,3,4,5].map(i => <Skeleton key={i} className="h-24 w-full rounded-2xl" />)
          ) : obligations.map(ob => (
            <div
              key={ob.id}
              onClick={() => setSelected(ob)}
              className={`neumorphic-card p-5 cursor-pointer transition-all hover:shadow-lg border-2 ${selected?.id === ob.id ? 'border-primary' : 'border-transparent'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg font-poppins flex-shrink-0 ${ob.rank === 1 ? 'bg-primary text-white' : ob.rank === 2 ? 'bg-primary/20 text-primary' : 'bg-slate-100 text-slate-500'}`}>
                    {ob.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold font-poppins text-sm text-on-surface truncate">{ob.vendor}</p>
                    <p className="text-xs text-slate-500 font-roboto mt-0.5">{fmt(ob.amount)} · Due {ob.due_date}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(Array.isArray(ob.explanation) ? ob.explanation : [ob.explanation]).filter(Boolean).slice(0, 2).map((e: string, i: number) => (
                        <span key={i} className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-inter">{e}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-2xl font-bold font-poppins text-primary">{ob.topsis_score.toFixed(4)}</p>
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest font-inter">TOPSIS</p>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${ob.delay_probability > 0.2 ? 'bg-error/10 text-error' : ob.delay_probability > 0.1 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {Math.round(ob.delay_probability * 100)}% delay risk
                  </span>
                </div>
              </div>
              {/* TOPSIS score bar */}
              <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all" style={{ width: `${ob.topsis_score * 100}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Right: Detail + Scenarios */}
        <div className="space-y-6">
          {/* Selected Obligation Detail */}
          {selected && (
            <div className="neumorphic-card p-6">
              <h4 className="font-bold text-sm font-poppins mb-4 text-on-surface">Obligation Detail</h4>
              <p className="font-bold text-base text-primary mb-1">{selected.vendor}</p>
              <p className="text-2xl font-bold font-poppins">{fmt(selected.amount)}</p>
              <p className="text-xs text-slate-500 mb-4">Due {selected.due_date} · {selected.days_overdue > 0 ? `${selected.days_overdue} days overdue` : 'on time'}</p>

              <div className="space-y-2 mb-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Model Attribution</p>
                {(selected.model_contributions || []).map((c) => (
                  <div key={c.feature} className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 w-32 capitalize font-roboto">{c.feature.replace(/_/g, ' ')}</span>
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${c.contribution > 0 ? 'bg-error' : 'bg-emerald-500'}`}
                        style={{ width: `${Math.min(100, Math.abs(c.contribution) * 200)}%` }}
                      />
                    </div>
                    <span className={`text-[10px] font-bold w-12 text-right ${c.contribution > 0 ? 'text-error' : 'text-emerald-600'}`}>
                      {c.contribution > 0 ? '+' : ''}{c.contribution.toFixed(3)}
                    </span>
                  </div>
                ))}
                {(!selected.model_contributions || selected.model_contributions.length === 0) && (
                  <p className="text-xs text-slate-400 italic">No model contributions available</p>
                )}
              </div>

              <div className="p-3 bg-primary/5 rounded-xl">
                <p className="text-xs font-bold text-primary font-poppins">{selected.recommendation}</p>
              </div>
            </div>
          )}

          {/* Scenarios */}
          <div className="neumorphic-card p-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-sm font-poppins text-on-surface">Payment Strategies</h4>
              {recommended && (
                <span className="text-[9px] bg-primary text-white px-2 py-1 rounded-full font-bold uppercase">
                  {STRATEGY_LABELS[recommended.strategy] ?? recommended.strategy}
                </span>
              )}
            </div>
            {loading ? (
              [1,2,3,4,5].map(i => <Skeleton key={i} className="h-16 w-full rounded-xl mb-2" />)
            ) : scenarios.map((sc) => {
              const isRec = sc.strategy === recommended?.strategy;
              return (
                <div key={sc.strategy} className={`p-4 rounded-xl mb-2 border ${isRec ? 'border-primary bg-primary/5' : 'border-slate-100 bg-white'}`}>
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-lg ${isRec ? 'text-primary' : 'text-slate-400'}`}>
                      {STRATEGY_ICONS[sc.strategy] ?? 'payment'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold font-poppins ${isRec ? 'text-primary' : 'text-on-surface'}`}>
                        {STRATEGY_LABELS[sc.strategy] ?? sc.strategy}
                        {isRec && <span className="ml-2 text-[8px] bg-primary text-white px-1.5 py-0.5 rounded-full">BEST</span>}
                      </p>
                      <p className="text-[10px] text-slate-500 font-roboto">
                        {fmt(sc.cash_remaining_day_30)} cash · penalty {fmt(sc.total_penalty)}
                      </p>
                    </div>
                    <p className="text-lg font-bold font-poppins text-primary">{sc.score.toFixed(2)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
