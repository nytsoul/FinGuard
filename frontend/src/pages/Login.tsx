import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, isNewUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
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
      // Check if user has completed onboarding
      if (isNewUser) {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fbfd] to-[#f2f4f7] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#004ac6] to-[#0055e0] flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
            <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
          </div>
          <h1 className="text-3xl font-bold font-poppins text-[#004ac6] mb-1">CashMind</h1>
          <p className="text-slate-600 text-sm">Your Financial Architect</p>
        </div>

        {/* Login Card */}
        <div className="neumorphic-card bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-on-surface mb-6 text-center">Welcome Back</h2>

          {error && (
            <div className="mb-6 p-3 bg-error/10 border border-error rounded-lg text-error text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-br from-primary to-[#0055e0] text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 transition-all mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-xs text-slate-500 font-medium">Don't have an account?</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Register Link */}
          <Link
            to="/register"
            className="w-full py-3 border-2 border-slate-200 text-on-surface font-bold rounded-xl hover:bg-slate-50 transition-all text-center block"
          >
            Create Account
          </Link>
        </div>

        {/* Footer Info */}
        <p className="text-center text-xs text-slate-500 mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
