import { useState } from 'react';

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedFaqIdx, setExpandedFaqIdx] = useState<number | null>(null);

  const categories = [
    { id: 'general', label: 'Getting Started', icon: 'rocket', color: 'emerald' },
    { id: 'dashboard', label: 'Dashboard', icon: 'monitoring', color: 'blue' },
    { id: 'invoices', label: 'Invoices', icon: 'receipt_long', color: 'amber' },
    { id: 'transactions', label: 'Transactions', icon: 'swap_horiz', color: 'purple' },
    { id: 'payments', label: 'Payments', icon: 'payment', color: 'pink' },
    { id: 'technical', label: 'Technical', icon: 'code', color: 'cyan' },
  ];

  const faqData = [
    {
      category: 'general',
      questions: [
        {
          q: 'What is CashMind and how does it help?',
          a: 'CashMind is an AI-powered financial management platform that helps you forecast cash flow, make smarter payment decisions, and manage your liquidity in real-time. It combines predictive analytics with vendor intelligence to optimize your financial operations.',
        },
        {
          q: 'How do I get started with CashMind?',
          a: 'Simply sign up with your email, complete your company profile with banking and financial details, and connect your data sources. Our onboarding wizard will guide you through each step.',
        },
        {
          q: 'Is my financial data secure?',
          a: 'Yes. We use bank-grade encryption (TLS 1.3), ISO 27001 compliance, and never store sensitive credentials. Your data is encrypted both in transit and at rest.',
        },
      ],
    },
    {
      category: 'dashboard',
      questions: [
        {
          q: 'What do the dashboard metrics show?',
          a: 'The dashboard displays your current cash balance, 30-day forecast, upcoming payables, and expected receivables. These metrics update in real-time based on your connected data sources.',
        },
        {
          q: 'How accurate is the cash flow forecast?',
          a: 'Our AI model achieves ~90% accuracy for 30-day forecasts. It considers historical patterns, seasonal trends, vendor behavior, and invoice timing to generate predictions.',
        },
        {
          q: 'Can I customize my dashboard?',
          a: 'Yes! You can rearrange cards, toggle metrics, adjust refresh rates, and set custom date ranges in your preferences.',
        },
      ],
    },
    {
      category: 'invoices',
      questions: [
        {
          q: 'How do I upload invoices?',
          a: 'Navigate to Invoices → Upload, select your files (PDF, Excel, or CSV), and our system will automatically parse and categorize them.',
        },
        {
          q: 'Can CashMind extract data from invoices automatically?',
          a: 'Yes. Our OCR technology extracts vendor names, amounts, dates, and payment terms automatically. You can review and correct before they\'re finalized.',
        },
        {
          q: 'What invoice formats are supported?',
          a: 'We support PDF, Excel (XLSX), CSV, and direct integrations with common accounting software like QuickBooks and Xero.',
        },
      ],
    },
    {
      category: 'transactions',
      questions: [
        {
          q: 'How do I view my transaction history?',
          a: 'Go to Transactions page to see all payments, receipts, and transfers. You can filter by date, amount, vendor, or payment method.',
        },
        {
          q: 'Can I download transaction reports?',
          a: 'Yes. Click the Export button to download transactions as CSV, Excel, or PDF with custom date ranges and filters.',
        },
        {
          q: 'How often are transactions updated?',
          a: 'For connected accounts, transactions update approximately every 4 hours. For manual entries, updates are instant.',
        },
      ],
    },
    {
      category: 'payments',
      questions: [
        {
          q: 'How do I schedule a payment?',
          a: 'Navigate to Payments → Schedule, enter vendor details, amount, due date, and confirm. We\'ll execute it on the specified date.',
        },
        {
          q: 'Can CashMind recommend optimal payment timing?',
          a: 'Yes. Our AI analyzes your forecast and suggests payment dates to maximize cash retention while meeting vendor requirements.',
        },
        {
          q: 'What payment methods are supported?',
          a: 'We support bank transfers, credit cards, digital wallets, and ACH payments. More integrations coming soon.',
        },
      ],
    },
    {
      category: 'technical',
      questions: [
        {
          q: 'What browsers does CashMind support?',
          a: 'We support all modern browsers: Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+. Mobile support is fully optimized for iOS and Android.',
        },
        {
          q: 'Is there an API for integrations?',
          a: 'Yes! Our REST API allows custom integrations. Visit docs.cashmind.io for complete API documentation and authentication details.',
        },
        {
          q: 'How do I enable two-factor authentication?',
          a: 'Go to Settings → Security → Enable 2FA. Choose between authenticator apps (Google Authenticator) or SMS codes.',
        },
      ],
    },
  ];

  // Filter FAQs based on search and active category
  const filteredFaqData = faqData
    .filter(cat => cat.category === activeCategory)
    .map(cat => ({
      ...cat,
      questions: cat.questions.filter(faq =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }));

  const categoryObj = categories.find(c => c.id === activeCategory);

  const colorMap: { [key: string]: string } = {
    emerald: 'from-emerald-50 to-emerald-100/80',
    blue: 'from-blue-50 to-blue-100/80',
    amber: 'from-amber-50 to-amber-100/80',
    purple: 'from-purple-50 to-purple-100/80',
    pink: 'from-pink-50 to-pink-100/80',
    cyan: 'from-cyan-50 to-cyan-100/80',
  };

  const iconColorMap: { [key: string]: string } = {
    emerald: 'text-emerald-600',
    blue: 'text-blue-600',
    amber: 'text-amber-600',
    purple: 'text-purple-600',
    pink: 'text-pink-600',
    cyan: 'text-cyan-600',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fbfd] via-[#f2f4f7] to-[#e8eaef]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/40 backdrop-blur-md bg-white/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[#0055e0] flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined">help</span>
            </div>
            <h1 className="text-2xl font-bold font-poppins text-[#004ac6]">Help & Support</h1>
          </div>
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-white/60 rounded-lg transition-colors"
            title="Go back"
          >
            <span className="material-symbols-outlined text-on-surface">close</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-400/10 border-b border-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-on-surface">
              How Can We Help?
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Find answers to common questions about CashMind. Browse by category or search for specific topics.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 flex justify-center">
            <div className="relative w-full max-w-xl">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">search</span>
              <input
                type="text"
                placeholder="Search help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white neumorphic-card rounded-xl border-2 border-white/40 focus:border-primary outline-none transition-all text-slate-900 placeholder-slate-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-16 pb-12 border-b border-white/40">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setExpandedFaqIdx(null);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeCategory === cat.id
                  ? `neumorphic-pressed bg-gradient-to-br ${colorMap[cat.color]} text-${cat.color}-600 border-2 border-${cat.color}-200`
                  : 'neumorphic-card text-slate-700 hover:shadow-md hover:bg-white/60'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* FAQs Section */}
        {filteredFaqData.length > 0 && filteredFaqData[0].questions.length > 0 ? (
          <div className="space-y-6">
            {/* Category Header */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-on-surface mb-2">{categoryObj?.label}</h3>
              <p className="text-slate-700">
                {filteredFaqData[0].questions.length} frequently asked question{filteredFaqData[0].questions.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFaqData[0].questions.map((faq, idx) => (
                <div
                  key={idx}
                  onClick={() => setExpandedFaqIdx(expandedFaqIdx === idx ? null : idx)}
                  className="neumorphic-card rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
                >
                  {/* Question */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorMap[categoryObj?.color || 'blue']} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <span className={`material-symbols-outlined ${iconColorMap[categoryObj?.color || 'blue']}`}>
                          {expandedFaqIdx === idx ? 'expand_less' : 'expand_more'}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                        {faq.q}
                      </h4>
                    </div>
                    <span className={`material-symbols-outlined text-2xl text-slate-400 group-hover:text-primary transition-all ${expandedFaqIdx === idx ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </div>

                  {/* Answer */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedFaqIdx === idx ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-14 text-slate-700 leading-relaxed border-l-2 border-primary/20 py-2">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-slate-300 block mb-4">search_off</span>
            <h3 className="text-2xl font-bold text-slate-700 mb-2">No results found</h3>
            <p className="text-slate-600">Try searching for different keywords or browse other categories</p>
          </div>
        )}

        {/* Contact Support Section */}
        <div className="mt-24 pt-16 border-t border-white/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="neumorphic-card p-8 rounded-2xl text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl text-blue-600">mail</span>
              </div>
              <h4 className="text-xl font-bold text-on-surface mb-3">Email Support</h4>
              <p className="text-slate-700 mb-4">
                Send us an email and we'll respond within 24 hours
              </p>
              <a
                href="mailto:support@cashmind.io"
                className="inline-block px-6 py-2 bg-blue-100 text-blue-600 font-semibold rounded-lg hover:bg-blue-200 transition-colors"
              >
                support@cashmind.io
              </a>
            </div>

            <div className="neumorphic-card p-8 rounded-2xl text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl text-emerald-600">chat_bubble</span>
              </div>
              <h4 className="text-xl font-bold text-on-surface mb-3">Live Chat</h4>
              <p className="text-slate-700 mb-4">
                Chat with our support team (Mon-Fri, 9am-6pm EST)
              </p>
              <button className="inline-block px-6 py-2 bg-emerald-100 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-200 transition-colors">
                Start Chat
              </button>
            </div>

            <div className="neumorphic-card p-8 rounded-2xl text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl text-purple-600">terminal</span>
              </div>
              <h4 className="text-xl font-bold text-on-surface mb-3">Documentation</h4>
              <p className="text-slate-700 mb-4">
                Browse our complete API and integration documentation
              </p>
              <a
                href="https://docs.cashmind.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-purple-100 text-purple-600 font-semibold rounded-lg hover:bg-purple-200 transition-colors"
              >
                View Docs
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/40 backdrop-blur-sm bg-white/50 mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 text-center text-sm text-slate-600">
          <p>© 2026 CashMind. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        .text-primary {
          color: #004ac6;
        }
      `}</style>
    </div>
  );
}
