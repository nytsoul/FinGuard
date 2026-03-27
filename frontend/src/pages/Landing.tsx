import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import BackgroundCarousel from '../components/BackgroundCarousel';

export default function Landing() {
  const navigate = useNavigate();
  const { user, userProfile, loading } = useAuth();
  const [activeSlide, setActiveSlide] = useState(0);

  // Redirect authenticated users with completed profiles
  useEffect(() => {
    if (!loading && user && userProfile) {
      navigate('/dashboard');
    }
  }, [user, userProfile, loading, navigate]);

  // Money slideshow rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % moneySlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const moneySlides = [
    { amount: '$428,950', label: 'Current Cash Position', color: 'from-emerald-400 to-emerald-600' },
    { amount: '$385,420', label: '30-Day Forecast', color: 'from-amber-400 to-amber-600' },
    { amount: '$156,200', label: 'Upcoming Payables', color: 'from-red-400 to-red-600' },
    { amount: '$286,400', label: 'Receivables Expected', color: 'from-blue-400 to-blue-600' },
  ];

  const features = [
    {
      icon: 'trending_up',
      title: 'Smart Forecasting',
      description: 'AI-driven cash flow projections accurate up to 90 days with confidence intervals',
      color: 'emerald'
    },
    {
      icon: 'lightning_bolt',
      title: 'Real-Time Insights',
      description: 'Live liquidity analysis and instant alerts on critical financial events',
      color: 'amber'
    },
    {
      icon: 'psychology',
      title: 'AI Recommendations',
      description: 'Smart payment strategies and vendor optimization based on your data',
      color: 'blue'
    },
    {
      icon: 'security',
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with ISO compliance and multi-factor authentication',
      color: 'purple'
    },
    {
      icon: 'assessment',
      title: 'Vendor Analytics',
      description: 'Detailed vendor performance metrics and obligation rankings using TOPSIS algorithm',
      color: 'pink'
    },
    {
      icon: 'automation',
      title: 'Workflow Automation',
      description: 'Automate payments and financial workflows with custom rules and conditions',
      color: 'cyan'
    },
  ];

  const colorMap: { [key: string]: string } = {
    emerald: 'from-emerald-50 to-emerald-100/80',
    amber: 'from-amber-50 to-amber-100/80',
    blue: 'from-blue-50 to-blue-100/80',
    purple: 'from-purple-50 to-purple-100/80',
    pink: 'from-pink-50 to-pink-100/80',
    cyan: 'from-cyan-50 to-cyan-100/80',
  };

  const iconColorMap: { [key: string]: string } = {
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    pink: 'text-pink-600',
    cyan: 'text-cyan-600',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fbfd] via-[#f2f4f7] to-[#e8eaef] flex flex-col overflow-hidden">
      {/* Animated Background Image Carousel */}
      <BackgroundCarousel />

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center px-4 lg:px-8 py-6 animate-fadeIn max-w-[2000px] w-full mx-auto">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#004ac6] to-[#0055e0] flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            <span className="material-symbols-outlined">account_balance_wallet</span>
          </div>
          <h1 className="text-2xl font-bold font-poppins text-[#004ac6] group-hover:text-[#0055e0] transition-colors">CashMind</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 text-on-surface font-semibold rounded-xl hover:bg-white/60 transition-all duration-300 hover:shadow-md relative group overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">Sign In</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-2 bg-gradient-to-br from-primary to-[#0055e0] text-white font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40 hover:scale-110 transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 animate-pulse"></div>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 lg:px-8 py-12">
        <div className="max-w-[1800px] w-full">
          {/* Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left: Content */}
            <div className="space-y-8 animate-slideInLeft">
              <div className="space-y-4">
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-bold text-sm rounded-full">✨ Smart Financial Management</span>
                <h2 className="text-5xl lg:text-6xl font-extrabold font-poppins text-on-surface leading-tight">
                  Your Financial <span className="bg-gradient-to-r from-primary to-[#0055e0] bg-clip-text text-transparent animate-shimmer">Architect</span>
                </h2>
                <p className="text-xl text-slate-700 font-medium leading-relaxed">
                  CashMind helps you master your cash flow with intelligent forecasting, smart payment decisions, and real-time liquidity insights powered by advanced AI.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-slideInUp" style={{animationDelay: '0.2s'}}>
                <button
                  onClick={() => navigate('/register')}
                  className="px-8 py-4 bg-gradient-to-br from-primary to-[#0055e0] text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-110 active:scale-95 transition-all duration-300 relative overflow-hidden group/cta"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Free Trial
                    <span className="material-symbols-outlined group-hover/cta:translate-x-1 transition-transform duration-300">arrow_forward</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-primary opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300 -z-10 animate-pulse"></div>
                </button>
                <button
                  onClick={() => navigate('/help')}
                  className="px-8 py-4 border-2 border-slate-300 text-on-surface font-bold text-lg rounded-xl hover:bg-white/80 hover:border-slate-400 active:scale-95 transition-all duration-300 backdrop-blur-sm hover:shadow-lg group/learn"
                >
                  <span className="flex items-center justify-center gap-2">
                    Learn More
                    <span className="material-symbols-outlined group-hover/learn:rotate-90 transition-transform duration-300">info</span>
                  </span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 pt-4 animate-slideInUp" style={{animationDelay: '0.4s'}}>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 px-4 py-2 rounded-full bg-emerald-50/60 border border-emerald-200/40 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 group cursor-pointer">
                  <span className="material-symbols-outlined text-emerald-600 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">verified</span>
                  <span className="group-hover:text-emerald-700 transition-colors">Bank-Grade Security</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 px-4 py-2 rounded-full bg-blue-50/60 border border-blue-200/40 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 group cursor-pointer">
                  <span className="material-symbols-outlined text-blue-600 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-300">shield</span>
                  <span className="group-hover:text-blue-700 transition-colors">ISO 27001 Certified</span>
                </div>
              </div>
            </div>

            {/* Right: Money Slideshow */}
            <div className="animate-slideInRight flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg group/card">
                {/* Animated card background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-400/20 blur-2xl rounded-3xl group-hover/card:from-primary/30 group-hover/card:to-blue-400/30 transition-all duration-500"></div>
                
                {/* Main Card */}
                <div className="relative neumorphic-card bg-white p-12 rounded-2xl shadow-2xl group-hover/card:shadow-3xl group-hover/card:-translate-y-3 transition-all duration-500 overflow-hidden">
                  {/* Subtle glow animation on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/10 via-transparent to-blue-400/10 pointer-events-none"></div>
                  
                  {/* Slide container */}
                  <div className="relative h-48 flex items-center justify-center">
                    {moneySlides.map((slide, idx) => (
                      <div
                        key={idx}
                        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
                          idx === activeSlide
                            ? 'opacity-100 scale-100 z-10'
                            : idx === (activeSlide - 1 + moneySlides.length) % moneySlides.length
                            ? 'opacity-0 scale-95 -translate-x-10'
                            : 'opacity-0 scale-95 translate-x-10'
                        }`}
                      >
                        <p className="text-slate-600 text-sm font-semibold mb-4 group-hover/card:text-primary transition-colors">{slide.label}</p>
                        <p className={`text-6xl font-bold bg-gradient-to-r ${slide.color} bg-clip-text text-transparent animate-pulse group-hover/card:animate-bounce`}>
                          {slide.amount}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Slide Indicators */}
                  <div className="flex justify-center gap-3 mt-12">
                    {moneySlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSlide(idx)}
                        className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
                          idx === activeSlide
                            ? 'bg-primary w-8 shadow-lg shadow-primary/40'
                            : 'bg-slate-300 w-2.5 hover:bg-slate-400 hover:w-3'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Info Section */}
                  <div className="mt-8 pt-8 border-t border-slate-200 space-y-3">
                    <div className="flex items-center justify-between p-3 bg-emerald-50/60 hover:bg-emerald-50 rounded-lg border border-emerald-200/40 hover:border-emerald-200/80 transition-all duration-300 group/info cursor-pointer">
                      <div className="text-sm">
                        <p className="text-xs text-slate-600 font-semibold mb-1 group-hover/info:text-emerald-600 transition-colors">Status</p>
                        <p className="font-bold text-slate-900 group-hover/info:text-emerald-700 transition-colors">Stable & Growing</p>
                      </div>
                      <span className="material-symbols-outlined text-emerald-600 animate-bounce group-hover/info:scale-125 transition-transform">trending_up</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-32 pt-20 border-t-2 border-white/40">
            <div className="text-center mb-16 animate-slideInUp">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-bold text-sm rounded-full mb-4 hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer group">
                <span className="inline-block group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">🚀</span> Core Features
              </span>
              <h3 className="text-4xl lg:text-5xl font-bold font-poppins text-on-surface mb-4 hover:text-primary transition-colors duration-300">
                Everything You Need to Manage Cash Flow
              </h3>
              <p className="text-lg text-slate-700 max-w-2xl mx-auto hover:text-slate-900 transition-colors duration-300">
                Powerful features designed to give you complete control over your financial operations
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="group neumorphic-card p-8 rounded-2xl hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3 animate-featureSlideIn cursor-pointer relative overflow-hidden"
                  style={{animationDelay: `${idx * 0.12}s`}}
                >
                  {/* Animated border glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/20 via-transparent to-blue-400/20 pointer-events-none"></div>
                  
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[feature.color]} rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10`}></div>
                  
                  {/* Icon with floating animation */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorMap[feature.color]} flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:animate-pulse relative`}>
                    <span className={`material-symbols-outlined text-2xl ${iconColorMap[feature.color]} group-hover:animate-bounce`}>
                      {feature.icon}
                    </span>
                  </div>

                  {/* Content */}
                  <h4 className="text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {feature.title}
                  </h4>
                  <p className="text-slate-700 leading-relaxed mb-4 group-hover:text-slate-900 transition-colors duration-300 line-clamp-2">
                    {feature.description}
                  </p>

                  {/* Arrow indicator with slide animation */}
                  <div className="flex items-center text-primary font-semibold text-sm group-hover:translate-x-2 group-hover:gap-3 transition-all duration-300">
                    <span>Learn more</span>
                    <span className="material-symbols-outlined group-hover:rotate-45 transition-transform duration-500">arrow_forward</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-32 pt-20 border-t-2 border-white/40">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: 'speed', label: 'Lightning Fast', text: 'Real-time processing and instant insights', delay: '0s' },
                { icon: 'lock', label: 'Secure by Default', text: 'Bank-grade encryption and compliance', delay: '0.15s' },
                { icon: 'support_agent', label: 'Expert Support', text: '24/7 customer success team ready to help', delay: '0.3s' },
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="group neumorphic-card p-8 rounded-2xl text-center hover:shadow-lg hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 animate-benefitSlideUp hover:scale-105 relative overflow-hidden cursor-pointer"
                  style={{animationDelay: benefit.delay}}
                >
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700 pointer-events-none"></div>
                  
                  {/* Icon container with rotation */}
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-125 group-hover:rotate-360 transition-all duration-500 relative">
                    <span className="material-symbols-outlined text-3xl text-primary group-hover:animate-bounce">{benefit.icon}</span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors duration-300">{benefit.label}</h4>
                  <p className="text-slate-700 group-hover:text-slate-900 transition-colors duration-300">{benefit.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 mb-16 bg-gradient-to-r from-primary/15 to-blue-400/15 rounded-3xl p-12 border-2 border-primary/30 backdrop-blur-sm text-center animate-ctaSlideIn hover:from-primary/20 hover:to-blue-400/20 transition-all duration-500 group relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/10 via-transparent to-blue-400/10 pointer-events-none"></div>
            
            <h3 className="text-3xl lg:text-4xl font-bold text-on-surface mb-6 animate-headingGlow">
              Ready to Transform Your Cash Flow?
            </h3>
            <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto group-hover:text-slate-900 transition-colors duration-300">
              Join hundreds of companies using CashMind to make smarter financial decisions
            </p>
            <button
              onClick={() => navigate('/register')}
              className="px-10 py-4 bg-gradient-to-br from-primary to-[#0055e0] text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 hover:scale-110 active:scale-95 transition-all duration-300 inline-block relative overflow-hidden group/btn"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Free Trial Today
                <span className="material-symbols-outlined group-hover/btn:translate-x-2 transition-transform duration-300">arrow_forward</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 -z-10"></div>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-4 lg:px-8 py-8 border-t border-white/30 backdrop-blur-sm bg-white/50">
        <div className="max-w-[1500px] mx-auto text-center text-sm text-slate-600">
          <p>© 2026 CashMind. All rights reserved. | <a href="/help" className="text-primary hover:underline">Help & Support</a></p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes featureSlideIn {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes benefitSlideUp {
          from {
            opacity: 0;
            transform: translateY(50px) rotateX(20deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }

        @keyframes ctaSlideIn {
          from {
            opacity: 0;
            transform: translateY(80px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.4;
          }
          25% {
            transform: translateY(-30px) translateX(10px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-60px) translateX(-10px);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.5;
          }
        }

        @keyframes shimmer {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes headingGlow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(0, 74, 198, 0);
          }
          50% {
            text-shadow: 0 0 20px rgba(0, 74, 198, 0.2);
          }
        }

        @keyframes rotate360 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out both;
        }

        .animate-featureSlideIn {
          animation: featureSlideIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        .animate-benefitSlideUp {
          animation: benefitSlideUp 0.8s ease-out both;
        }

        .animate-ctaSlideIn {
          animation: ctaSlideIn 1s ease-out both;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-headingGlow {
          animation: headingGlow 3s ease-in-out infinite;
        }

        .group-hover\:rotate-360:hover {
          animation: rotate360 0.6s ease-in-out;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
