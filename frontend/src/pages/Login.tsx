import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: err } = await signIn(formData.email, formData.password);

    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      // Always redirect to dashboard after successful login
      navigate('/dashboard');
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');
    const { error: err } = await signInWithGoogle();
    
    if (err) {
      setError(err.message);
      setGoogleLoading(false);
    }
  };

  const features = [
    { icon: 'trending_up', title: 'Smart Forecasting', desc: '90-day cash flow projections' },
    { icon: 'bolt', title: 'Real-Time Insights', desc: 'Live liquidity analytics' },
    { icon: 'shield', title: 'Bank-Grade Security', desc: 'Enterprise protection' },
    { icon: 'settings', title: 'Payment Automation', desc: 'Smart workflows' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white flex items-center justify-center relative overflow-hidden p-4">
      {/* Animated background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Primary floating blob - top left */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        
        {/* Secondary floating blob - bottom right */}
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-300/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* Tertiary pulse blob - top right */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-200/3 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        
        {/* Quaternary rotating blob - center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-300/3 rounded-full blur-3xl animate-rotate-slow" style={{animationDelay: '0.5s'}}></div>
        
        {/* Accent blob - bottom left */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-200/4 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
        
        {/* Shimmer overlay lines */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-shimmer" style={{animationDelay: '2s'}}></div>
        </div>
      </div>

      {/* Main Container - Card Like Box */}
      <div className="w-full max-w-4xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden neumorphic-card-large">
          {/* Left Side - Branding & Features (Hidden on Mobile) */}
          <div className="hidden lg:flex bg-gradient-to-br from-slate-50 to-slate-100 p-12 flex-col justify-between animate-slideInLeft">
            <div>
              {/* Logo */}
              <div className="mb-12 group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-[#0055e0] flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:shadow-primary/40 group-hover:scale-110 transition-all duration-300">
                  <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform duration-300">account_balance_wallet</span>
                </div>
              </div>

              {/* Welcome Text */}
              <div className="mb-16 animate-fadeIn" style={{animationDelay: '0.2s'}}>
                <h1 className="text-4xl font-bold text-on-surface mb-3">Welcome Back</h1>
                <p className="text-base text-slate-600">Manage your cash flow with intelligence</p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {features.map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="flex gap-3 p-3 rounded-lg hover:bg-white/40 transition-all duration-300 cursor-pointer group/feature animate-slideInUp"
                    style={{animationDelay: `${idx * 100}ms`}}
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover/feature:bg-blue-200 group-hover/feature:scale-110 transition-all duration-300">
                      <span className="material-symbols-outlined text-sm text-blue-600 group-hover/feature:animate-bounce">{feature.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-on-surface group-hover/feature:text-primary transition-colors">{feature.title}</h3>
                      <p className="text-xs text-slate-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Proof */}
            <div className="animate-slideInUp" style={{animationDelay: '0.6s'}}>
              <p className="text-xs text-slate-600 mb-3">Trusted by 5,000+ businesses</p>
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-primary/80"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="bg-white p-8 sm:p-12 flex flex-col justify-center relative z-10 animate-slideInRight">
            <div className="w-full">
              {/* Mobile Logo */}
              <div className="lg:hidden mb-6 animate-fadeIn text-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-[#0055e0] flex items-center justify-center text-white mx-auto mb-3 shadow-lg">
                  <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
                </div>
              </div>

              {/* Form Header */}
              <div className="mb-6 animate-slideInDown" style={{animationDelay: '0.1s'}}>
                <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mb-2">Sign In</h2>
                <p className="text-sm lg:text-base text-slate-600">Enter your credentials to access your account</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs lg:text-sm font-medium flex items-start gap-2 animate-slideInDown">
                  <span className="material-symbols-outlined text-lg flex-shrink-0 mt-0.5">error</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Field */}
                <div className="group/field">
                  <label className="block text-xs lg:text-sm font-semibold text-on-surface mb-1.5 group-focus-within/field:text-primary transition-colors">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-lg focus:shadow-primary/10 neumorphic-input transition-all duration-300 group-focus-within/field:-translate-y-0.5"
                      required
                    />
                    <span className="absolute right-3 top-2.5 material-symbols-outlined text-xs lg:text-base text-slate-400 group-focus-within/field:text-primary transition-colors duration-300">mail</span>
                  </div>
                </div>

                {/* Password Field */}
                <div className="group/field">
                  <label className="block text-xs lg:text-sm font-semibold text-on-surface mb-1.5 group-focus-within/field:text-primary transition-colors">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-lg focus:shadow-primary/10 neumorphic-input transition-all duration-300 pr-10 group-focus-within/field:-translate-y-0.5"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-primary hover:scale-125 transition-all duration-300"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showPassword ? 'visibility' : 'visibility_off'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer group/checkbox hover:text-primary transition-colors">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-primary accent-primary cursor-pointer hover:accent-blue-600 transition-all"
                    />
                    <span className="text-xs lg:text-sm text-slate-700">Remember me</span>
                  </label>
                  <a href="#" className="text-xs lg:text-sm text-primary font-semibold hover:text-[#0055e0] hover:-translate-y-0.5 transition-all duration-300">
                    Forgot password?
                  </a>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 mt-4 bg-gradient-to-r from-primary to-[#0055e0] text-white font-bold text-sm lg:text-base rounded-lg neumorphic-button hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 group/btn"
                >
                  {loading ? (
                    <>
                      <span className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1 transition-transform duration-300">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4 animate-fadeIn" style={{animationDelay: '0.3s'}}>
                <div className="flex-1 h-px bg-slate-300"></div>
                <span className="text-xs text-slate-500 font-medium">OR</span>
                <div className="flex-1 h-px bg-slate-300"></div>
              </div>

              {/* Google Button */}
              <button
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="w-full py-2.5 border-2 border-slate-300 text-on-surface font-semibold text-sm lg:text-base rounded-lg hover:bg-slate-50 hover:border-primary hover:shadow-md neumorphic-button disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 group/google animate-slideInUp"
                style={{animationDelay: '0.3s'}}
              >
                <svg className="w-4 h-4 lg:w-5 lg:h-5 group-hover/google:scale-125 transition-transform duration-300" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {googleLoading ? 'Connecting...' : 'Continue with Google'}
              </button>

              {/* Sign Up Link */}
              <div className="mt-5 text-center animate-slideInUp" style={{animationDelay: '0.4s'}}>
                <p className="text-xs lg:text-sm text-slate-700">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary font-bold hover:text-[#0055e0] hover:-translate-y-0.5 transition-all duration-300">
                    Sign Up
                  </Link>
                </p>
              </div>

              {/* Footer */}
              <p className="text-center text-xs text-slate-500 mt-6 animate-fadeIn" style={{animationDelay: '0.5s'}}>
                By signing in, you agree to our{' '}
                <a href="#" className="text-primary hover:underline">
                  Terms
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:underline">
                  Privacy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .neumorphic-card-large {
          background: linear-gradient(135deg, #ffffff 0%, #f9fbfd 100%);
          box-shadow: 
            0 10px 40px rgba(0, 0, 0, 0.1),
            0 20px 60px rgba(0, 0, 0, 0.08),
            inset -1px -1px 3px rgba(255, 255, 255, 0.8),
            inset 1px 1px 3px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.6);
          animation: cardSlideIn 0.8s ease-out;
        }

        .neumorphic-card {
          background: linear-gradient(135deg, #ffffff 0%, #f9fbfd 100%);
          box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.04),
            0 8px 24px rgba(0, 0, 0, 0.08),
            inset -1px -1px 2px rgba(255, 255, 255, 0.8),
            inset 1px 1px 2px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.6);
          animation: cardSlideIn 0.6s ease-out;
        }

        .neumorphic-input {
          background: linear-gradient(135deg, #ffffff 0%, #f9fbfd 100%);
          box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.03),
            inset -1px -1px 2px rgba(255, 255, 255, 0.8);
        }

        .neumorphic-input:focus {
          box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.03),
            inset -1px -1px 2px rgba(255, 255, 255, 0.8),
            0 0 0 3px rgba(0, 74, 198, 0.1);
        }

        .neumorphic-button {
          box-shadow: 
            0 4px 12px rgba(0, 74, 198, 0.15),
            0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .neumorphic-button:hover:not(:disabled) {
          box-shadow: 
            0 6px 16px rgba(0, 74, 198, 0.25),
            0 4px 8px rgba(0, 0, 0, 0.08);
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes cardSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(20px);
          }
        }

        @keyframes rotateSlow {
          from {
            transform: translateX(-50%) translateY(-50%) rotate(0deg) scale(1);
          }
          to {
            transform: translateX(-50%) translateY(-50%) rotate(360deg) scale(1.1);
          }
        }

        @keyframes pulseSlow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-rotate-slow {
          animation: rotateSlow 20s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulseSlow 4s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 8s ease-in-out infinite;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }

        .animate-slideInDown {
          animation: slideInDown 0.6s ease-out;
        }

        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
