<<<<<<< HEAD
import { useState } from 'react';
import { generateReport, executePayment, exportReportPdf } from '../lib/api';

interface Report {
  report_id: string;
  report_type: string;
  format: string;
  data: {
    title: string;
    sections: string[];
    metrics: { [key: string]: string | number };
    recommendations: string[];
  };
  created_at: string;
}

export default function DecisionEngine() {
  const [showReportModal, setShowReportModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<Report | null>(null);
  const [reportType, setReportType] = useState('financial');
  const [dateRange, setDateRange] = useState('30');
  const [paymentVendor, setPaymentVendor] = useState('Global Logistics');
  const [paymentAmount, setPaymentAmount] = useState('42300');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [paymentError, setPaymentError] = useState('');
  const [reportError, setReportError] = useState('');
  const [exportingPdf, setExportingPdf] = useState(false);

  const handleGenerateReport = async () => {
    setReportLoading(true);
    setReportError('');
    try {
      const report = await generateReport(reportType, `${dateRange}d`);
      setGeneratedReport(report as any);
    } catch (error) {
      setReportError('Failed to generate report. Please try again.');
      console.error('Report generation error:', error);
    } finally {
      setReportLoading(false);
    }
  };

  const handleExportPdf = async () => {
    setExportingPdf(true);
    try {
      await exportReportPdf();
    } catch (error) {
      setReportError('Failed to export PDF. Please try again.');
      console.error('PDF export error:', error);
    } finally {
      setExportingPdf(false);
    }
  };

  const handleExecutePayment = async () => {
    setPaymentLoading(true);
    setPaymentError('');
    try {
      const result = await executePayment(
        paymentVendor, 
        parseFloat(paymentAmount), 
        undefined as any, 
        paymentMethod
      );
      alert(`Payment executed successfully! Reference: ${(result as any).reference_number}`);
      setShowPaymentModal(false);
    } catch (error) {
      setPaymentError('Failed to execute payment. Please try again.');
      console.error('Payment execution error:', error);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-8 max-w-[1600px] mx-auto w-full">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary">Intelligence Hub</span>
          <h2 className="text-3xl font-extrabold font-headline text-on-surface -mt-1">Decision Engine</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setShowReportModal(true)}
            className="px-5 py-2.5 rounded-xl bg-surface-container-highest text-on-surface font-semibold text-sm transition-transform active:scale-95 shadow-sm hover:bg-surface-container-higher"
          >
            Generate Report
          </button>
          <button 
            onClick={() => setShowPaymentModal(true)}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white font-semibold text-sm transition-transform active:scale-95 shadow-lg shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
          >
            Execute Payment
          </button>
        </div>
      </div>

      {/* Top: Recommended Actions Panel */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="neumorphic-card p-6 border-l-4 border-primary">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">priority_high</span>
            </div>
            <span className="text-[10px] font-bold text-primary uppercase bg-primary/5 px-2 py-1 rounded">Urgent Action</span>
          </div>
          <h3 className="font-bold text-lg mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Pay Vendor: Global Logistics</h3>
          <p className="text-sm text-slate-500 mb-4 leading-relaxed">Early payment secures a 3% discount ($1,240 saved). Recommended due to high cash reserves today.</p>
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-on-surface">$42,300.00</span>
            <button className="text-primary font-bold hover:underline">Commit →</button>
          </div>
        </div>

        <div className="neumorphic-card p-6 border-l-4 border-amber-500">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-amber-600">hourglass_top</span>
            </div>
            <span className="text-[10px] font-bold text-amber-600 uppercase bg-amber-500/5 px-2 py-1 rounded">Strategic Delay</span>
          </div>
          <h3 className="font-bold text-lg mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Delay Vendor: Prime Realty</h3>
          <p className="text-sm text-slate-500 mb-4 leading-relaxed">Penalty is only 0.5% after 15 days. Delaying preserves $85k for upcoming inventory buy.</p>
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-on-surface">$85,000.00</span>
            <button className="text-amber-600 font-bold hover:underline">Approve →</button>
          </div>
        </div>

        <div className="neumorphic-card p-6 border-l-4 border-emerald-500">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-emerald-600">handshake</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 uppercase bg-emerald-500/5 px-2 py-1 rounded">Negotiation Opportunity</span>
          </div>
          <h3 className="font-bold text-lg mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Partial: Tech Systems Inc.</h3>
          <p className="text-sm text-slate-500 mb-4 leading-relaxed">Paying 50% now maintains 'Preferred Partner' status while balancing short-term debt.</p>
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-on-surface">$12,000.00 (Split)</span>
            <button className="text-emerald-600 font-bold hover:underline">Initate →</button>
          </div>
        </div>
      </section>

      {/* Main Content Area: Table and Scenario Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Obligation Ranking Table (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-bold text-xl font-headline">Obligation Ranking</h3>
            <div className="flex gap-2">
              <span className="p-2 hover:bg-surface-container-high rounded-lg cursor-pointer transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-400">filter_list</span>
              </span>
            </div>
          </div>
          <div className="neumorphic-card overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-slate-500">
                  <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-wider">Vendor</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-wider text-right">Amount</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-wider">Due Date</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-wider text-center">TOPSIS Score</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-wider text-center">Rank</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-primary-container/10 flex items-center justify-center font-bold text-primary text-xs">GL</div>
                      <div>
                        <p className="font-bold text-on-surface text-sm">Global Logistics</p>
                        <p className="text-xs text-slate-400">Critical Utility</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right font-bold text-sm">$42,300.00</td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium">Oct 24, 2023</span>
                    <p className="text-[10px] text-error font-bold">2 Days Overdue</p>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden max-w-[80px] mx-auto">
                      <div className="bg-primary h-full" style={{ width: '94%' }}></div>
                    </div>
                    <span className="text-xs font-bold mt-1 inline-block">0.94</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs">#1</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#495c95]/10 flex items-center justify-center font-bold text-[#495c95] text-xs">TS</div>
                      <div>
                        <p className="font-bold text-on-surface text-sm">Tech Systems Inc.</p>
                        <p className="text-xs text-slate-400">Infrastructure</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right font-bold text-sm">$12,000.00</td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium">Oct 28, 2023</span>
                    <p className="text-[10px] text-slate-400 font-bold">In 2 Days</p>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden max-w-[80px] mx-auto">
                      <div className="bg-primary h-full" style={{ width: '78%' }}></div>
                    </div>
                    <span className="text-xs font-bold mt-1 inline-block">0.78</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs">#2</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-amber-100 flex items-center justify-center font-bold text-amber-700 text-xs">PR</div>
                      <div>
                        <p className="font-bold text-on-surface text-sm">Prime Realty</p>
                        <p className="text-xs text-slate-400">Lease/Rent</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right font-bold text-sm">$85,000.00</td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium">Nov 05, 2023</span>
                    <p className="text-[10px] text-slate-400 font-bold">In 10 Days</p>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden max-w-[80px] mx-auto">
                      <div className="bg-primary h-full" style={{ width: '42%' }}></div>
                    </div>
                    <span className="text-xs font-bold mt-1 inline-block">0.42</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs">#3</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-xs">SM</div>
                      <div>
                        <p className="font-bold text-on-surface text-sm">Swift Media</p>
                        <p className="text-xs text-slate-400">Marketing</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right font-bold text-sm">$4,200.00</td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium">Nov 15, 2023</span>
                    <p className="text-[10px] text-slate-400 font-bold">In 20 Days</p>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden max-w-[80px] mx-auto">
                      <div className="bg-primary h-full" style={{ width: '15%' }}></div>
                    </div>
                    <span className="text-xs font-bold mt-1 inline-block">0.15</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs">#4</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Scenario Comparison Cards (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="font-bold text-xl font-headline px-2">Scenario Analysis</h3>
          
          {/* Scenario 1 */}
          <div className="neumorphic-card bg-white p-6 ring-2 ring-primary ring-offset-4 ring-offset-surface relative">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-on-surface">Strategy: Priority First</h4>
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Penalty Risk</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Low</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Cash Remaining</span>
                <span className="text-xs font-bold text-on-surface">$142,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Rel. Impact</span>
                <div className="flex gap-1">
                  <div className="w-3 h-1 bg-primary rounded-full"></div>
                  <div className="w-3 h-1 bg-primary rounded-full"></div>
                  <div className="w-3 h-1 bg-primary rounded-full"></div>
                  <div className="w-3 h-1 bg-primary rounded-full"></div>
                  <div className="w-3 h-1 bg-slate-200 rounded-full"></div>
                </div>
              </div>
              <div className="pt-2">
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 font-bold">Optimization Score: 85%</p>
              </div>
            </div>
          </div>

          {/* Scenario 2 */}
          <div className="neumorphic-card bg-white p-6 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-on-surface">Strategy: Min. Amounts</h4>
              <span className="material-symbols-outlined text-slate-300">radio_button_unchecked</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Penalty Risk</span>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Moderate</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Cash Remaining</span>
                <span className="text-xs font-bold text-on-surface">$212,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Rel. Impact</span>
                <div className="flex gap-1">
                  <div className="w-3 h-1 bg-amber-500 rounded-full"></div>
                  <div className="w-3 h-1 bg-amber-500 rounded-full"></div>
                  <div className="w-3 h-1 bg-slate-200 rounded-full"></div>
                  <div className="w-3 h-1 bg-slate-200 rounded-full"></div>
                  <div className="w-3 h-1 bg-slate-200 rounded-full"></div>
                </div>
              </div>
              <div className="pt-2">
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full" style={{ width: '62%' }}></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 font-bold">Optimization Score: 62%</p>
              </div>
            </div>
          </div>

          {/* Scenario 3 */}
          <div className="neumorphic-card bg-white p-6 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-on-surface">Strategy: Strategic Delay</h4>
              <span className="material-symbols-outlined text-slate-300">radio_button_unchecked</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Penalty Risk</span>
                <span className="text-xs font-bold text-error bg-error/10 px-2 py-0.5 rounded">High</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Cash Remaining</span>
                <span className="text-xs font-bold text-on-surface">$288,400</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Rel. Impact</span>
                <div className="flex gap-1">
                  <div className="w-3 h-1 bg-error rounded-full"></div>
                  <div className="w-3 h-1 bg-slate-200 rounded-full"></div>
                  <div className="w-3 h-1 bg-slate-200 rounded-full"></div>
                  <div className="w-3 h-1 bg-slate-200 rounded-full"></div>
                  <div className="w-3 h-1 bg-slate-200 rounded-full"></div>
                </div>
              </div>
              <div className="pt-2">
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-error h-full" style={{ width: '38%' }}></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 font-bold">Optimization Score: 38%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Insight Card */}
      <section className="neumorphic-card bg-white p-8 relative overflow-hidden mt-4">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-extrabold font-headline mb-2">Liquidity Projection Summary</h3>
            <p className="text-slate-500 max-w-2xl leading-relaxed">
              Executing the "Priority First" strategy will leave you with a forecast liquidity buffer of 1.4x for the next 30 days. This maintains your current credit rating while avoiding $2,100 in potential late penalties from Global Logistics and Tech Systems.
            </p>
          </div>
          <div className="flex items-center gap-8 text-center bg-surface p-6 rounded-2xl neumorphic-inset">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Total Due</p>
              <p className="text-xl font-extrabold text-on-surface">$143,500</p>
            </div>
            <div className="w-px h-10 bg-slate-200"></div>
            <div>
              <p className="text-[10px] uppercase font-bold text-emerald-600 mb-1">Savings</p>
              <p className="text-xl font-extrabold text-emerald-600">$2,140</p>
            </div>
          </div>
        </div>
        {/* Decorative Element */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* Report Generation Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-on-surface">Generate Report</h3>
              <button 
                onClick={() => setShowReportModal(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            
            {reportError && (
              <div className="p-3 bg-error/10 border border-error rounded-lg text-error text-sm">
                {reportError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2">Report Type</label>
                <select 
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="financial">Financial Summary</option>
                  <option value="liquidity">Liquidity Analysis</option>
                  <option value="obligations">Obligations Report</option>
                  <option value="cash_flow">Cash Flow Forecast</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2">Date Range (days)</label>
                <select 
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                  <option value="365">Last year</option>
                </select>
              </div>
            </div>

            {generatedReport && (
              <div className="bg-slate-50 p-4 rounded-lg space-y-2 max-h-48 overflow-y-auto">
                <h4 className="font-semibold text-on-surface">{generatedReport.data.title}</h4>
                <div className="text-sm text-slate-600 space-y-1">
                  {generatedReport.data.recommendations.slice(0, 3).map((rec, idx) => (
                    <p key={idx} className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>{rec}</span>
                    </p>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => setShowReportModal(false)}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-on-surface font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              {generatedReport ? (
                <button 
                  onClick={handleExportPdf}
                  disabled={exportingPdf}
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50"
                >
                  {exportingPdf ? 'Exporting...' : 'Export PDF'}
                </button>
              ) : (
                <button 
                  onClick={handleGenerateReport}
                  disabled={reportLoading}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-container disabled:opacity-50"
                >
                  {reportLoading ? 'Generating...' : 'Generate'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment Execution Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-on-surface">Execute Payment</h3>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {paymentError && (
              <div className="p-3 bg-error/10 border border-error rounded-lg text-error text-sm">
                {paymentError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2">Vendor</label>
                <select 
                  value={paymentVendor}
                  onChange={(e) => setPaymentVendor(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Global Logistics">Global Logistics - $42,300</option>
                  <option value="Prime Realty">Prime Realty - $85,000</option>
                  <option value="Tech Systems Inc.">Tech Systems Inc. - $12,000</option>
                  <option value="Swift Media">Swift Media - $4,200</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2">Amount (USD)</label>
                <input 
                  type="number" 
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2">Payment Method</label>
                <select 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="ach">ACH Transfer</option>
                  <option value="check">Check</option>
                  <option value="wire">Wire Transfer</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-xs text-slate-500 mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-primary">${parseFloat(paymentAmount || '0').toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-on-surface font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleExecutePayment}
                disabled={paymentLoading}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-container disabled:opacity-50"
              >
                {paymentLoading ? 'Processing...' : 'Execute Payment'}
              </button>
            </div>
          </div>
        </div>
      )}
=======
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
    <div className="overflow-y-auto p-4 lg:p-8 space-y-8 w-full">
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
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
    </div>
  );
}
