import { useEffect, useState } from 'react';
import { getDecisionRanking, generateActionDraft, getLLMStatus, type Obligation, type ActionDraftResponse } from '../lib/api';

function fmt(n: number) {
  return '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

const TONES = ['professional', 'respectful', 'firm', 'conciliatory'];

export default function ActionComposer() {
  const [obligations, setObligations] = useState<Obligation[]>([]);
  const [selected, setSelected] = useState<Obligation | null>(null);
  const [tone, setTone] = useState('professional');
  const [context, setContext] = useState('');
  const [result, setResult] = useState<ActionDraftResponse | null>(null);
  const [llmAvailable, setLlmAvailable] = useState(false);
  const [loadingObligations, setLoadingObligations] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getDecisionRanking(), getLLMStatus()])
      .then(([dr, ls]) => {
        setObligations(dr.data);
        setLlmAvailable(ls.llm_available);
        if (dr.data.length) {
          setSelected(dr.data[0]);
          setContext(`Request extension for ${dr.data[0].vendor} payment`);
        }
      })
      .catch(e => setError(e.message))
      .finally(() => setLoadingObligations(false));
  }, []);

  const handleGenerate = async () => {
    if (!selected) return;
    setGenerating(true);
    setResult(null);
    setError(null);
    try {
      const draft = await generateActionDraft({
        vendor_name: selected.vendor,
        amount: selected.amount,
        context: context || `Payment communication for ${selected.vendor}`,
        relationship_tenure_months: selected.features?.relationship_tenure_months ?? 6,
        tone,
      });
      setResult(draft);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(`Subject: ${result.draft_subject}\n\n${result.draft_body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-y-auto p-4 lg:p-8 space-y-6 max-w-6xl mx-auto">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-semibold">
          ⚠️ {error}
        </div>
      )}

      {/* LLM Status Banner */}
      <div className={`px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-semibold ${llmAvailable ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}`}>
        <span className={`material-symbols-outlined text-lg ${llmAvailable ? 'text-emerald-600' : 'text-amber-500'}`}>
          {llmAvailable ? 'smart_toy' : 'psychology_alt'}
        </span>
        <span className={llmAvailable ? 'text-emerald-700' : 'text-amber-700'}>
          {llmAvailable ? 'Claude AI active — drafts are LLM-generated' : 'Claude API not configured — using professional template drafts'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Compose Panel */}
        <div className="space-y-5">
          <div className="neumorphic-card p-6 space-y-5">
            <h3 className="font-bold text-sm font-poppins text-on-surface">Compose Payment Communication</h3>

            {/* Vendor Selector */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Select Vendor (TOPSIS Ranked)</label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {loadingObligations ? (
                  [1,2,3].map(i => <div key={i} className="h-14 bg-slate-100 animate-pulse rounded-xl" />)
                ) : obligations.slice(0, 8).map(ob => (
                  <button
                    key={ob.id}
                    onClick={() => { setSelected(ob); setResult(null); setContext(`Payment communication for ${ob.vendor}`); }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${selected?.id === ob.id ? 'border-primary bg-primary/5' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${selected?.id === ob.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {ob.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-xs font-poppins truncate">{ob.vendor}</p>
                      <p className="text-[10px] text-slate-500">{fmt(ob.amount)} · {ob.days_overdue > 0 ? `${ob.days_overdue}d overdue` : `due ${ob.due_date}`}</p>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${ob.delay_probability > 0.2 ? 'bg-error/10 text-error' : 'bg-emerald-100 text-emerald-700'}`}>
                      {Math.round(ob.delay_probability * 100)}%
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Communication Tone</label>
              <div className="flex flex-wrap gap-2">
                {TONES.map(t => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold font-inter transition-all capitalize ${tone === t ? 'bg-primary text-white shadow-md' : 'neumorphic-smooth text-slate-600 hover:bg-slate-100'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Context */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Context / Instructions</label>
              <textarea
                value={context}
                onChange={e => setContext(e.target.value)}
                rows={3}
                placeholder="e.g. Request 15-day extension due to GST filing delay…"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-roboto focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating || !selected}
              className="w-full py-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl font-bold font-inter shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                  Generating draft…
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">auto_awesome</span>
                  Generate Draft
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Draft Preview */}
        <div>
          {result ? (
            <div className="neumorphic-card p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm font-poppins text-on-surface">Generated Draft</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${result.llm_available ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {result.llm_available ? 'Claude AI' : 'Template'}
                    </span>
                    <span className="text-[9px] text-slate-400 capitalize">{result.tone} tone</span>
                  </div>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg neumorphic-smooth text-xs font-bold font-inter hover:bg-slate-100 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">{copied ? 'check' : 'content_copy'}</span>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Subject</p>
                <p className="text-sm font-semibold font-poppins text-on-surface">{result.draft_subject}</p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 min-h-48">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Body</p>
                <pre className="text-sm font-roboto text-on-surface whitespace-pre-wrap leading-relaxed">{result.draft_body}</pre>
              </div>

              <p className="text-[10px] text-slate-400 font-roboto text-center">
                To: {result.vendor} · {fmt(selected?.amount ?? 0)}
              </p>
            </div>
          ) : (
            <div className="neumorphic-card p-12 flex flex-col items-center justify-center text-center h-full min-h-80">
              <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">mail</span>
              <p className="font-bold text-slate-400 font-poppins">No draft yet</p>
              <p className="text-sm text-slate-400 font-roboto mt-1">Select a vendor and click Generate Draft</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
