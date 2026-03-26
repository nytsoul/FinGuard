import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculatePasswordStrength = (password: string) => {
    if (!password) return { score: 0, label: '', color: '' };

    let score = 0;
    const checks = [
      { test: password.length >= 8, points: 1 },
      { test: password.length >= 12, points: 1 },
      { test: /[a-z]/.test(password), points: 1 },
      { test: /[A-Z]/.test(password), points: 1 },
      { test: /[0-9]/.test(password), points: 1 },
      { test: /[^a-zA-Z0-9]/.test(password), points: 1 },
    ];

    checks.forEach(check => {
      if (check.test) score += check.points;
    });

    const strengthMap: { [key: number]: { label: string; color: string } } = {
      0: { label: 'Very Weak', color: 'bg-red-400' },
      1: { label: 'Weak', color: 'bg-orange-400' },
      2: { label: 'Fair', color: 'bg-yellow-400' },
      3: { label: 'Good', color: 'bg-blue-400' },
      4: { label: 'Strong', color: 'bg-emerald-400' },
      5: { label: 'Very Strong', color: 'bg-emerald-500' },
      6: { label: 'Very Strong', color: 'bg-emerald-500' },
    };

    return { score, ...strengthMap[score] };
  };

  const passwordStrength = calculatePasswordStrength(formData.password);
  const passwordsMatch = formData.password && formData.confirmPassword === formData.password;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    const { error: err } = await signUp(formData.email, formData.password);

    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      setSuccess('Registration successful! Please check your email to verify your account.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  const benefits = [
    { icon: 'trending_up', title: 'Smart Forecasting', desc: 'AI-powered cash flow predictions' },
    { icon: 'bolt', title: 'Real-Time Insights', desc: 'Instant financial alerts' },
    { icon: 'shield', title: 'Bank-Grade Security', desc: 'Enterprise-level protection' },
    { icon: 'headphones', title: '24/7 Support', desc: 'Expert help anytime' },
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
          {/* Left Side - Benefits (Hidden on Mobile) */}
          <div className="hidden lg:flex bg-gradient-to-br from-slate-50 to-slate-100 p-12 flex-col justify-between animate-slideInLeft">
            <div>
              {/* Logo */}
              <div className="mb-12 group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-[#0055e0] flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:shadow-primary/40 group-hover:scale-110 transition-all duration-300">
                  <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform duration-300">rocket_launch</span>
                </div>
              </div>

              {/* Welcome Text */}
              <div className="mb-16 animate-fadeIn" style={{animationDelay: '0.2s'}}>
                <h1 className="text-4xl font-bold text-on-surface mb-3">Get Started</h1>
                <p className="text-base text-slate-600">Join thousands managing cash flow smartly</p>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <div 
                    key={idx} 
                    className="flex gap-3 p-3 rounded-lg hover:bg-white/40 transition-all duration-300 cursor-pointer group/benefit animate-slideInUp"
                    style={{animationDelay: `${idx * 100}ms`}}
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover/benefit:bg-blue-200 group-hover/benefit:scale-110 transition-all duration-300">
                      <span className="material-symbols-outlined text-sm text-blue-600 group-hover/benefit:animate-bounce">{benefit.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-on-surface group-hover/benefit:text-primary transition-colors">{benefit.title}</h3>
                      <p className="text-xs text-slate-600">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="animate-slideInUp" style={{animationDelay: '0.6s'}}>
              <p className="text-xs text-slate-600 mb-3">✨ Free forever • No credit card required</p>
              <div className="flex gap-2 text-xs">
                <div className="px-2.5 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">verified</span>
                  Secure
                </div>
                <div className="px-2.5 py-1.5 rounded-lg bg-blue-100 text-blue-700 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">lightning_bolt</span>
                  Fast
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white p-8 sm:p-12 flex flex-col justify-center relative z-10 animate-slideInRight">
            <div className="w-full">
              {/* Mobile Logo */}
              <div className="lg:hidden mb-6 animate-fadeIn text-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-[#0055e0] flex items-center justify-center text-white mx-auto mb-3 shadow-lg">
                  <span className="material-symbols-outlined text-2xl">rocket_launch</span>
                </div>
              </div>

              {/* Form Header */}
              <div className="mb-6 animate-slideInDown" style={{animationDelay: '0.1s'}}>
                <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mb-2">Create Account</h2>
                <p className="text-sm lg:text-base text-slate-600">Join CashMind and transform your finances</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs lg:text-sm font-medium flex items-start gap-2 animate-slideInDown">
                  <span className="material-symbols-outlined text-lg flex-shrink-0 mt-0.5">error</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="mb-5 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-xs lg:text-sm font-medium flex items-start gap-2 animate-slideInDown">
                  <span className="material-symbols-outlined text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <span>{success}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleRegister} className="space-y-4">
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

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2 space-y-1.5 animate-slideInUp" style={{animationDelay: '0.3s'}}>
                      <div className="flex gap-1 h-1.5">
                        {[...Array(6)].map((_, idx) => (
                          <div
                            key={idx}
                            className={`flex-1 rounded transition-all ${
                              idx < passwordStrength.score ? passwordStrength.color : 'bg-slate-200'
                            }`}
                          ></div>
                        ))}
                      </div>
                      <p className="text-xs font-medium text-slate-600">
                        Strength: <span className={passwordStrength.color.replace('bg-', 'text-')}>{passwordStrength.label}</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="group/field">
                  <label className="block text-xs lg:text-sm font-semibold text-on-surface mb-1.5 group-focus-within/field:text-primary transition-colors">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-lg focus:shadow-primary/10 neumorphic-input transition-all duration-300 pr-10 group-focus-within/field:-translate-y-0.5"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-primary hover:scale-125 transition-all duration-300"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showConfirmPassword ? 'visibility' : 'visibility_off'}
                      </span>
                    </button>

                    {/* Match Indicator */}
                    {formData.confirmPassword && (
                      <div className="absolute top-2.5 right-12 animate-slideInLeft" style={{animationDelay: '0.2s'}}>
                        {passwordsMatch ? (
                          <span className="material-symbols-outlined text-emerald-600 text-lg">check_circle</span>
                        ) : (
                          <span className="material-symbols-outlined text-red-600 text-lg">cancel</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Terms Checkbox */}
                <label className="flex items-start gap-2 cursor-pointer pt-1 group/checkbox hover:text-primary transition-colors">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 rounded border-slate-300 text-primary accent-primary mt-0.5 flex-shrink-0"
                  />
                  <span className="text-xs lg:text-sm text-slate-700">
                    I agree to the{' '}
                    <a href="#" className="text-primary font-semibold hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary font-semibold hover:underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>

                {/* Create Account Button */}
                <button
                  type="submit"
                  disabled={loading || !passwordsMatch}
                  className="w-full py-2.5 mt-4 bg-gradient-to-r from-primary to-[#0055e0] text-white font-bold text-sm lg:text-base rounded-lg neumorphic-button hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 group/btn"
                >
                  {loading ? (
                    <>
                      <span className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1 transition-transform duration-300">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4 animate-fadeIn" style={{animationDelay: '0.3s'}}>
                <div className="flex-1 h-px bg-slate-300"></div>
                <span className="text-xs text-slate-500 font-medium">Already have an account?</span>
                <div className="flex-1 h-px bg-slate-300"></div>
              </div>

              {/* Sign In Link */}
              <div className="text-center animate-slideInUp" style={{animationDelay: '0.4s'}}>
                <p className="text-xs lg:text-sm text-slate-700">
                  <Link to="/login" className="text-primary font-bold hover:text-[#0055e0] hover:-translate-y-0.5 transition-all duration-300">
                    Sign In
                  </Link>
                </p>
              </div>

              {/* Footer */}
              <p className="text-center text-xs text-slate-500 mt-5 animate-fadeIn" style={{animationDelay: '0.5s'}}>
                Your data is encrypted and secure. We never share your information.
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
