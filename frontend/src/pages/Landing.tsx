import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function Landing() {
  const navigate = useNavigate();
  const { user, userProfile, loading } = useAuth();

  // Redirect authenticated users with completed profiles
  useEffect(() => {
    if (!loading && user && userProfile) {
      navigate('/dashboard');
    }
  }, [user, userProfile, loading, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fbfd] to-[#f2f4f7] flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 lg:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#004ac6] to-[#0055e0] flex items-center justify-center text-white shadow-lg">
            <span className="material-symbols-outlined">account_balance_wallet</span>
          </div>
          <h1 className="text-2xl font-bold font-poppins text-[#004ac6]">CashMind</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 text-on-surface font-semibold rounded-xl hover:bg-white/50 transition-all"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-2 bg-gradient-to-br from-primary to-[#0055e0] text-white font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 lg:px-12 py-12">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-extrabold font-headline text-on-surface leading-tight">
                Your Financial <span className="text-gradient bg-gradient-to-r from-primary to-[#0055e0] bg-clip-text text-transparent">Architect</span>
              </h2>
              <p className="text-lg text-on-surface-variant font-medium leading-relaxed">
                CashMind helps you master your cash flow with intelligent financial forecasting, smart payment decisions, and real-time liquidity insights.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/50 neumorphic-inset rounded-xl backdrop-blur-sm">
                <div className="text-primary font-bold text-sm mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined">trending_up</span>
                  Smart Forecasting
                </div>
                <p className="text-xs text-slate-600">AI-driven cash flow projections</p>
              </div>
              <div className="p-4 bg-white/50 neumorphic-inset rounded-xl backdrop-blur-sm">
                <div className="text-primary font-bold text-sm mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined">lightning_bolt</span>
                  Real-Time Insights
                </div>
                <p className="text-xs text-slate-600">Live liquidity analysis</p>
              </div>
              <div className="p-4 bg-white/50 neumorphic-inset rounded-xl backdrop-blur-sm">
                <div className="text-primary font-bold text-sm mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined">psychology</span>
                  AI Recommendations
                </div>
                <p className="text-xs text-slate-600">Smart payment strategies</p>
              </div>
              <div className="p-4 bg-white/50 neumorphic-inset rounded-xl backdrop-blur-sm">
                <div className="text-primary font-bold text-sm mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined">security</span>
                  Secure & Reliable
                </div>
                <p className="text-xs text-slate-600">Enterprise-grade security</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate('/register')}
                className="px-8 py-4 bg-gradient-to-br from-primary to-[#0055e0] text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                Start Free Trial
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 border-2 border-slate-200 text-on-surface font-bold rounded-xl hover:bg-white transition-all"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="hidden lg:block space-y-4">
            <div className="neumorphic-card bg-white p-8 rounded-2xl shadow-lg space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-on-surface">Cash Position</h3>
                <span className="material-symbols-outlined text-primary">trending_up</span>
              </div>

              {/* Mock Chart */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Today</span>
                  <span className="font-bold text-on-surface">$428,950</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600" style={{width: '78%'}}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">30-Day Forecast</span>
                  <span className="font-bold text-on-surface">$385,420</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600" style={{width: '65%'}}></div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-2">
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                  <div className="text-sm">
                    <p className="text-xs text-slate-500 mb-1">Recommended Action</p>
                    <p className="font-semibold text-on-surface">Defer $85k to Global Logistics</p>
                  </div>
                  <span className="material-symbols-outlined text-primary">lightbulb</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 lg:px-12 py-8 border-t border-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-slate-600 space-y-4 md:space-y-0">
          <p>© 2024 CashMind. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-on-surface transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-on-surface transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-on-surface transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
