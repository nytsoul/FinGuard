<<<<<<< HEAD
import { useState, useRef } from 'react';
import { importCsv, generateAiTransactionDraft } from '../lib/api';

export default function Transactions() {
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvLoading, setCsvLoading] = useState(false);
  const [csvError, setCsvError] = useState('');
  const [csvSuccess, setCsvSuccess] = useState('');
  const [entryType, setEntryType] = useState('expense');
  const [entryAmount, setEntryAmount] = useState('');
  const [entryCategory, setEntryCategory] = useState('SaaS');
  const [entryContext, setEntryContext] = useState('');
  const [useAiDraft, setUseAiDraft] = useState(false);
  const [aiDrafting, setAiDrafting] = useState(false);
  const [aiDraftResult, setAiDraftResult] = useState<any>(null);
  const [entryError, setEntryError] = useState('');
  const csvInputRef = useRef<HTMLInputElement>(null);

  const handleCsvFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      setCsvError('');
    } else {
      setCsvError('Please select a valid CSV file.');
      setCsvFile(null);
    }
  };

  const handleImportCsv = async () => {
    if (!csvFile) {
      setCsvError('Please select a file first.');
      return;
    }
    setCsvLoading(true);
    setCsvError('');
    setCsvSuccess('');
    try {
      const result = await importCsv(csvFile);
      setCsvSuccess(`Successfully imported ${result.imported_count} transactions. Skipped: ${result.skipped_count}.`);
      setCsvFile(null);
      if (csvInputRef.current) csvInputRef.current.value = '';
      setTimeout(() => {
        setShowCsvModal(false);
        setCsvSuccess('');
      }, 2000);
    } catch (error) {
      setCsvError('Failed to import CSV. Please check the file format and try again.');
      console.error('CSV import error:', error);
    } finally {
      setCsvLoading(false);
    }
  };

  const handleGenerateAiDraft = async () => {
    setAiDrafting(true);
    setEntryError('');
    try {
      const result = await generateAiTransactionDraft(
        entryType,
        parseFloat(entryAmount || '0'),
        entryCategory,
        entryContext
      );
      setAiDraftResult(result);
    } catch (error) {
      setEntryError('Failed to generate AI draft. Please try again.');
      console.error('AI draft error:', error);
    } finally {
      setAiDrafting(false);
    }
  };

  const handleAddNewEntry = () => {
    // This would normally save to backend
    alert(`Entry added: ${aiDraftResult?.vendor_suggestion || entryContext} - $${entryAmount}`);
    setShowNewEntryModal(false);
    setEntryType('expense');
    setEntryAmount('');
    setEntryCategory('SaaS');
    setEntryContext('');
    setUseAiDraft(false);
    setAiDraftResult(null);
  };

  return (
    <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Transactions</h2>
          <p className="text-on-surface-variant font-body">Review and reconcile your digital financial footprint.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <button 
            onClick={() => setShowCsvModal(true)}
            className="px-5 py-2.5 bg-surface-container-highest text-on-surface text-sm font-semibold rounded-xl hover:bg-surface-container-high transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">cloud_upload</span>
            Import CSV
          </button>
          <button 
            onClick={() => setShowNewEntryModal(true)}
            className="px-5 py-2.5 bg-gradient-to-br from-primary to-primary-container text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">add</span>
            New Entry
          </button>
        </div>
      </div>

      {/* Bento Layout Start */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Filters Panel (Sidebar Style Left) */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="bg-surface-container-lowest p-6 rounded-xl neumorphic-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline font-bold text-sm tracking-tight">FILTERS</h3>
              <button className="text-primary text-[10px] font-bold tracking-widest uppercase hover:underline">Clear All</button>
            </div>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-label font-bold text-slate-500 tracking-wider uppercase">Date Range</label>
                <div className="bg-surface-container-low p-2 rounded-lg neumorphic-inset">
                  <select className="w-full bg-transparent border-none text-xs font-medium focus:ring-0 outline-none">
                    <option>Last 30 Days</option>
                    <option>This Quarter</option>
                    <option>Custom Range</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-label font-bold text-slate-500 tracking-wider uppercase">Vendor</label>
                <div className="bg-surface-container-low p-2 rounded-lg neumorphic-inset flex items-center">
                  <span className="material-symbols-outlined text-slate-400 text-sm mr-2">store</span>
                  <input className="w-full bg-transparent border-none text-xs p-0 focus:ring-0 outline-none" placeholder="Search vendor..." type="text" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-label font-bold text-slate-500 tracking-wider uppercase">Category</label>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 bg-primary/10 text-primary text-[11px] font-bold rounded-full">SaaS</button>
                  <button className="px-3 py-1.5 bg-surface-container-high text-slate-600 text-[11px] font-medium rounded-full">Payroll</button>
                  <button className="px-3 py-1.5 bg-surface-container-high text-slate-600 text-[11px] font-medium rounded-full">Office</button>
                  <button className="px-3 py-1.5 bg-surface-container-high text-slate-600 text-[11px] font-medium rounded-full">Marketing</button>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-label font-bold text-slate-500 tracking-wider uppercase">Source Account</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input defaultChecked className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 accent-primary" type="checkbox" />
                    <span className="text-xs font-medium text-slate-700 group-hover:text-primary transition-colors">Chase Business ...9021</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 accent-primary" type="checkbox" />
                    <span className="text-xs font-medium text-slate-700 group-hover:text-primary transition-colors">AMEX Corporate ...4002</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights Mini-Card */}
          <div className="bg-gradient-to-br from-primary to-[#2563eb] p-6 rounded-xl shadow-lg shadow-primary/20 text-white">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <h4 className="font-headline font-bold text-sm">Smart Suggestion</h4>
            </div>
            <p className="text-xs leading-relaxed opacity-90">CashMind detected 4 recurring subscriptions that can be batched to save $120/mo in processing fees.</p>
            <button className="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-xs font-bold transition-all">Review Savings</button>
          </div>
        </div>

        {/* Main Transaction Table (Center/Right) */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {/* Table Card */}
          <div className="bg-surface-container-lowest rounded-xl neumorphic-card overflow-hidden">
            <div className="p-6 flex justify-between items-center bg-white border-b border-slate-100">
              <h3 className="font-headline font-bold text-sm">Recent Activity</h3>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-label font-bold tracking-widest uppercase">
                <span>SHOWING: 12 OF 1,402</span>
                <span className="h-1 w-1 bg-slate-300 rounded-full"></span>
                <button className="text-primary hover:underline">EXPORT PAGE</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-label font-bold text-slate-500 tracking-wider uppercase">Date & Vendor</th>
                    <th className="px-6 py-4 text-[10px] font-label font-bold text-slate-500 tracking-wider uppercase text-right">Amount</th>
                    <th className="px-6 py-4 text-[10px] font-label font-bold text-slate-500 tracking-wider uppercase">Category & Source</th>
                    <th className="px-6 py-4 text-[10px] font-label font-bold text-slate-500 tracking-wider uppercase">Status</th>
                    <th className="px-6 py-4 text-[10px] font-label font-bold text-slate-500 tracking-wider uppercase">Match</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                {/* Row 1 */}
                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-white border border-transparent group-hover:border-slate-100 transition-all">
                        <span className="material-symbols-outlined">cloud</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">Amazon Web Services</p>
                        <p className="text-[11px] text-slate-500">Oct 24, 2023 • ID: #AWS-8821</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-bold text-on-surface">-$1,240.50</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-xs font-semibold text-primary">SaaS Infrastructure</p>
                      <p className="text-[10px] text-slate-400">Chase Business ...9021</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-[#16a34a] text-[#16a34a] bg-opacity-10 text-[10px] font-bold rounded uppercase tracking-wider">Verified</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#16a34a] h-full" style={{ width: '98%' }}></div>
                      </div>
                      <span className="text-[11px] font-bold text-slate-600">98%</span>
                    </div>
                  </td>
                </tr>

                {/* Row 2 (With Duplicate Alert) */}
                <tr className="hover:bg-red-50/50 transition-colors group bg-error/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-error group-hover:bg-white border border-transparent group-hover:border-slate-100 transition-all">
                        <span className="material-symbols-outlined">local_cafe</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">Blue Bottle Coffee</p>
                        <p className="text-[11px] text-slate-500">Oct 23, 2023 • ID: #BBC-1002</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-bold text-on-surface">-$34.12</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-xs font-semibold text-on-surface-variant">General Office</p>
                      <p className="text-[10px] text-slate-400">AMEX Corporate ...4002</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded uppercase tracking-wider">Duplicate?</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-error h-full" style={{ width: '45%' }}></div>
                      </div>
                      <span className="text-[11px] font-bold text-slate-600">45%</span>
                    </div>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-white border border-transparent group-hover:border-slate-100 transition-all">
                        <span className="material-symbols-outlined">work</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">WeWork Manhattan</p>
                        <p className="text-[11px] text-slate-500">Oct 22, 2023 • ID: #WW-9902</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-bold text-on-surface">-$3,500.00</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-xs font-semibold text-on-surface-variant">Real Estate</p>
                      <p className="text-[10px] text-slate-400">Chase Business ...9021</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-[#16a34a] text-[#16a34a] bg-opacity-10 text-[10px] font-bold rounded uppercase tracking-wider">Verified</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#16a34a] h-full" style={{ width: '100%' }}></div>
                      </div>
                      <span className="text-[11px] font-bold text-slate-600">100%</span>
                    </div>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-white border border-transparent group-hover:border-slate-100 transition-all">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">Mailchimp</p>
                        <p className="text-[11px] text-slate-500">Oct 21, 2023 • ID: #MC-4412</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-bold text-on-surface">-$240.00</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-xs font-semibold text-on-surface-variant">Marketing</p>
                      <p className="text-[10px] text-slate-400">AMEX Corporate ...4002</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-200 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">Pending</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: '82%' }}></div>
                      </div>
                      <span className="text-[11px] font-bold text-slate-600">82%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="p-6 bg-surface flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-slate-100">
              <button className="px-4 py-2 bg-white rounded-lg text-xs font-bold shadow-sm hover:shadow-md transition-shadow disabled:opacity-50">Previous</button>
              <div className="flex gap-2 justify-center sm:justify-start">
                <button className="w-8 h-8 rounded-lg bg-primary text-white text-xs font-bold shadow-sm">1</button>
                <button className="w-8 h-8 rounded-lg bg-white hover:bg-slate-50 text-xs font-bold shadow-sm">2</button>
                <button className="w-8 h-8 rounded-lg bg-white hover:bg-slate-50 text-xs font-bold shadow-sm">3</button>
              </div>
              <button className="px-4 py-2 bg-white rounded-lg text-xs font-bold shadow-sm hover:shadow-md transition-shadow">Next</button>
            </div>
          </div>

          {/* Bottom Resolution Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Duplicate Resolution */}
            <div className="bg-white p-6 rounded-xl neumorphic-card border-l-4 border-error">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-error/10 text-error rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>content_copy</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-sm tracking-tight">Potential Duplicates</h3>
                    <p className="text-[11px] text-slate-500">2 clusters require immediate review</p>
                  </div>
                </div>
                <span className="bg-error text-white text-[10px] font-bold px-2 py-0.5 rounded-full">High Priority</span>
              </div>
              
              <div className="bg-surface-container-low rounded-lg p-3 mb-4 flex items-center justify-between border border-slate-100">
                <div>
                  <p className="text-xs font-bold">Blue Bottle Coffee (-$34.12)</p>
                  <p className="text-[10px] text-slate-500 italic">Matched with ID #BBC-1001 from Oct 22</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-1.5 bg-white text-slate-600 hover:text-error rounded-md transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-sm block">delete</span>
                  </button>
                  <button className="p-1.5 bg-white text-slate-600 hover:text-primary rounded-md transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-sm block">check</span>
                  </button>
                </div>
              </div>
              <button className="w-full py-2 border-2 border-dashed border-slate-200 text-slate-500 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors">Review Remaining Duplicates</button>
            </div>
            
            {/* Classification Correction */}
            <div className="bg-white p-6 rounded-xl neumorphic-card border-l-4 border-primary">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-sm tracking-tight">AI Correction Lab</h3>
                    <p className="text-[11px] text-slate-500">ML models learning from your habits</p>
                  </div>
                </div>
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">8 Tasks</span>
              </div>
              
              <div className="space-y-3">
                <div className="bg-surface-container-low border border-slate-100 rounded-lg p-4">
                  <p className="text-[10px] font-label font-bold text-slate-500 uppercase tracking-wider mb-2">Confidence Check: "Uber Technologies"</p>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-500 mb-1">Detected as:</p>
                      <div className="px-3 py-2 bg-white rounded-lg text-xs font-bold text-primary shadow-sm">Travel & Transit</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-500 mb-1">Should be:</p>
                      <select className="w-full px-3 py-2 bg-white border-transparent rounded-lg text-xs font-bold focus:ring-2 focus:ring-primary shadow-sm outline-none">
                        <option>Travel & Transit</option>
                        <option>Meals & Entertainment</option>
                        <option>Logistics</option>
                      </select>
                    </div>
                  </div>
                  <button className="mt-4 w-full py-2 bg-primary text-white rounded-lg text-xs font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-opacity">Train Model & Apply</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CSV Import Modal */}
      {showCsvModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-on-surface">Import CSV</h3>
              <button 
                onClick={() => setShowCsvModal(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {csvError && (
              <div className="p-3 bg-error/10 border border-error rounded-lg text-error text-sm">
                {csvError}
              </div>
            )}

            {csvSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm">
                ✓ {csvSuccess}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2">Select CSV File</label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <input 
                    ref={csvInputRef}
                    type="file" 
                    accept=".csv" 
                    onChange={handleCsvFileSelect}
                    className="hidden"
                  />
                  <button 
                    onClick={() => csvInputRef.current?.click()}
                    className="text-center w-full"
                  >
                    <span className="material-symbols-outlined text-4xl text-slate-400 block mb-2">upload_file</span>
                    <p className="text-sm font-semibold text-slate-600">Click to upload CSV</p>
                    <p className="text-xs text-slate-400 mt-1">or drag and drop</p>
                    {csvFile && <p className="text-xs text-primary font-semibold mt-2">✓ {csvFile.name}</p>}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-2">Expected columns: vendor, amount, date, category, account</p>
                <a href="#" className="text-primary text-xs font-bold hover:underline">Download template</a>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => setShowCsvModal(false)}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-on-surface font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleImportCsv}
                disabled={csvLoading || !csvFile}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-container disabled:opacity-50"
              >
                {csvLoading ? 'Importing...' : 'Import'}
              </button>
            </div>
=======
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
    <div className="overflow-y-auto p-4 lg:p-8 space-y-6 w-full">
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
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
          </div>
        </div>
      )}

<<<<<<< HEAD
      {/* New Entry Modal */}
      {showNewEntryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-on-surface">New Entry</h3>
              <button 
                onClick={() => setShowNewEntryModal(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {entryError && (
              <div className="p-3 bg-error/10 border border-error rounded-lg text-error text-sm">
                {entryError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2">Type</label>
                <select 
                  value={entryType}
                  onChange={(e) => setEntryType(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                  <option value="transfer">Transfer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2">Amount (USD)</label>
                <input 
                  type="number" 
                  value={entryAmount}
                  onChange={(e) => setEntryAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2">Category</label>
                <select 
                  value={entryCategory}
                  onChange={(e) => setEntryCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="SaaS">SaaS</option>
                  <option value="Payroll">Payroll</option>
                  <option value="Office">Office</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Travel">Travel</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2">Description/Context</label>
                <textarea 
                  value={entryContext}
                  onChange={(e) => setEntryContext(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  rows={3}
                  placeholder="e.g., 'Monthly subscription renewal with 20% discount'"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer p-3 bg-primary/5 rounded-lg border border-primary/20">
                <input 
                  type="checkbox" 
                  checked={useAiDraft}
                  onChange={(e) => {
                    setUseAiDraft(e.target.checked);
                    if (!e.target.checked) setAiDraftResult(null);
                  }}
                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 accent-primary"
                />
                <div>
                  <p className="text-sm font-semibold text-on-surface">Use AI Smart Drafting</p>
                  <p className="text-xs text-slate-500">Let AI suggest vendor and description</p>
                </div>
              </label>

              {useAiDraft && !aiDraftResult && (
                <button 
                  onClick={handleGenerateAiDraft}
                  disabled={aiDrafting || !entryAmount || !entryContext}
                  className="w-full px-4 py-2 bg-gradient-to-br from-primary to-blue-600 text-white rounded-lg font-semibold text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">auto_awesome</span>
                  {aiDrafting ? 'Generating...' : 'Generate with AI'}
                </button>
              )}

              {aiDraftResult && (
                <div className="bg-slate-50 p-4 rounded-lg border border-primary/20 space-y-2">
                  <p className="text-xs text-slate-500 font-semibold">AI Suggestions:</p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-xs font-semibold text-slate-600">Vendor:</span>
                      <p className="font-semibold text-on-surface">{aiDraftResult.vendor_suggestion}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-600">Description:</span>
                      <p className="font-semibold text-on-surface">{aiDraftResult.description}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-600">Category Confidence:</span>
                      <p className="font-semibold text-primary">{(aiDraftResult.category_confidence * 100).toFixed(0)}%</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setAiDraftResult(null)}
                    className="w-full text-xs text-slate-500 hover:text-slate-700 mt-2"
                  >
                    Regenerate
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => setShowNewEntryModal(false)}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-on-surface font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddNewEntry}
                disabled={!entryAmount}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-container disabled:opacity-50"
              >
                Add Entry
              </button>
            </div>
          </div>
        </div>
      )}
=======
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

      {/* Transaction Table - Desktop View */}
      <div className="hidden sm:block neumorphic-card overflow-hidden">
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

      {/* Transaction Cards - Mobile View */}
      <div className="sm:hidden space-y-3">
        {loading ? (
          [1,2,3,4,5].map(i => <Skeleton key={i} className="h-24 w-full rounded-xl" />)
        ) : filtered.length === 0 ? (
          <div className="neumorphic-card p-6 text-center text-slate-400 text-sm font-roboto">
            No transactions match your filter.
          </div>
        ) : (
          filtered.map(tx => (
            <div key={tx.id} className="neumorphic-card p-4 space-y-3">
              {/* Header with vendor and direction */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${tx.direction === 'credit' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                    {tx.vendor[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{tx.vendor}</p>
                    <p className="text-xs text-slate-500">{tx.date}</p>
                  </div>
                </div>
                <span className={`font-bold text-sm ${tx.direction === 'credit' ? 'text-emerald-600' : 'text-error'}`}>
                  {tx.direction === 'credit' ? '+' : '−'}{fmt(tx.amount)}
                </span>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Source</p>
                  <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${SOURCE_BADGE[tx.source] ?? 'bg-slate-100 text-slate-600'}`}>
                    {SOURCE_LABEL[tx.source] ?? tx.source}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Confidence</p>
                  <div className="flex items-center gap-1">
                    <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${tx.confidence * 100}%` }} />
                    </div>
                    <span className="text-[9px] text-slate-500">{(tx.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>

              {/* Narration */}
              {tx.narration && (
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Note</p>
                  <p className="text-xs text-slate-600 line-clamp-2">{tx.narration}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
    </div>
  );
}
