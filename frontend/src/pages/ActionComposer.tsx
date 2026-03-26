<<<<<<< HEAD
import { useState } from 'react';
import { sendEmail, sendWhatsApp } from '../lib/api';

export default function ActionComposer() {
  const [subject, setSubject] = useState('URGENT: Outstanding Balance for TechFlow Consultations');
  const [messageContent, setMessageContent] = useState(`Dear Marcus,

I hope you're having a productive week.

We are writing to kindly remind you of the outstanding balance for invoice #8842, which was due on the 15th of last month. As your financial architects, we want to ensure your cash flow remains optimized and avoid any late penalty fees.

The total amount due is $12,450.00.

You can complete the payment via your portal dashboard or the link attached below. If you have already made the transfer, please disregard this message.

Best regards,\nThe CashMind Team`);
  const [recipientEmail, setRecipientEmail] = useState('marcus.h@techflow.io');
  const [recipientPhone, setRecipientPhone] = useState('+44 7700 900231');
  const [emailSending, setEmailSending] = useState(false);
  const [whatsAppSending, setWhatsAppSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [useWhatsApp, setUseWhatsApp] = useState(false);

  const handleSendEmail = async () => {
    setEmailSending(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const result = await sendEmail(recipientEmail, subject, messageContent);
      setSuccessMessage(`Email sent successfully! Delivery ID: ${(result as any).delivery_id}`);
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      setErrorMessage('Failed to send email. Please check recipient address and try again.');
      console.error('Email send error:', error);
    } finally {
      setEmailSending(false);
    }
  };

  const handleSendWhatsApp = async () => {
    setWhatsAppSending(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const result = await sendWhatsApp(recipientPhone, messageContent);
      setSuccessMessage(`WhatsApp message sent! Message ID: ${(result as any).message_id}`);
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      setErrorMessage('Failed to send WhatsApp message. Please check phone number and try again.');
      console.error('WhatsApp send error:', error);
    } finally {
      setWhatsAppSending(false);
    }
  };

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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                  <input 
                    className="w-full bg-surface-container-low p-4 rounded-xl border-none text-on-surface neumorphic-inset focus:ring-2 focus:ring-primary/20" 
                    type="email" 
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Phone (WhatsApp)</label>
                  <input 
                    className="w-full bg-surface-container-low p-4 rounded-xl border-none text-on-surface neumorphic-inset focus:ring-2 focus:ring-primary/20" 
                    type="tel" 
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Subject Line</label>
                <input 
                  className="w-full bg-surface-container-low p-4 rounded-xl border-none font-bold text-on-surface neumorphic-inset focus:ring-2 focus:ring-primary/20" 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Message Content</label>
                <textarea 
                  className="w-full bg-surface-container-low p-4 rounded-xl border-none text-on-surface neumorphic-inset focus:ring-2 focus:ring-primary/20 leading-relaxed" 
                  rows={8}
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                {successMessage && (
                  <div className="w-full p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm font-semibold">
                    ✓ {successMessage}
                  </div>
                )}
                {errorMessage && (
                  <div className="w-full p-3 bg-error/10 border border-error rounded-lg text-error text-sm font-semibold">
                    ✗ {errorMessage}
                  </div>
                )}
                <div className="w-full flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div 
                      className={`w-5 h-5 rounded border-2 ${!useWhatsApp ? 'border-primary bg-primary/10' : 'border-slate-300'} flex items-center justify-center`}
                      onClick={() => setUseWhatsApp(false)}
                    >
                      {!useWhatsApp && <div className="w-2.5 h-2.5 bg-primary rounded-sm"></div>}
                    </div>
                    <span className="text-sm font-semibold">Email</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div 
                      className={`w-5 h-5 rounded border-2 ${useWhatsApp ? 'border-[#25D366] bg-[#25D366]/10' : 'border-slate-300'} flex items-center justify-center`}
                      onClick={() => setUseWhatsApp(true)}
                    >
                      {useWhatsApp && <div className="w-2.5 h-2.5 bg-[#25D366] rounded-sm"></div>}
                    </div>
                    <span className={`text-sm font-semibold ${useWhatsApp ? '' : 'text-slate-500'}`}>WhatsApp</span>
                  </label>
                </div>
                
                <div className="flex gap-3 ml-auto">
                  <button 
                    onClick={handleSendWhatsApp}
                    disabled={whatsAppSending}
                    className="px-6 py-3 bg-[#25D366] text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#25D366]/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined fill" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                    {whatsAppSending ? 'Sending...' : 'Send via WhatsApp'}
                  </button>
                  <button 
                    onClick={handleSendEmail}
                    disabled={emailSending}
                    className="px-8 py-3 bg-gradient-to-br from-primary to-[#003ea8] text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                  >
                    {emailSending ? 'Sending...' : 'Send Email'}
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
=======
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
    <div className="overflow-y-auto p-4 lg:p-8 space-y-6 w-full">
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
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
      </div>
    </div>
  );
}
