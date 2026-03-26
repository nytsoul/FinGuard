import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Retail',
  'Manufacturing',
  'Real Estate',
  'Consulting',
  'Education',
  'Media & Entertainment',
  'Other'
];

const ROLES = [
  'Business Owner',
  'CFO/Finance Manager',
  'Accountant',
  'Operations Manager',
  'Executive',
  'Other'
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    industry: '',
    role: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.full_name || !formData.company_name || !formData.industry || !formData.role) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: err } = await updateProfile(formData);
      
      if (err) {
        setError(err.message || 'Failed to save profile');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fbfd] to-[#f2f4f7] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#004ac6] to-[#0055e0] flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
            <span className="material-symbols-outlined text-4xl">account_balance_wallet</span>
          </div>
          <h1 className="text-4xl font-bold font-poppins text-[#004ac6] mb-3">Welcome to CashMind</h1>
          <p className="text-slate-600 text-lg">Let's set up your profile to get started with your financial management</p>
        </div>

        {/* Form Card */}
        <div className="neumorphic-card bg-white rounded-3xl p-8 md:p-12 shadow-lg">
          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error rounded-lg text-error text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleInputChange}
                placeholder="Your Company Inc."
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-2">
                Industry *
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                required
              >
                <option value="">Select an industry</option>
                {INDUSTRIES.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-2">
                Your Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                required
              >
                <option value="">Select your role</option>
                {ROLES.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            {/* Phone (Optional) */}
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-br from-primary to-[#0055e0] text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 transition-all mt-8"
            >
              {loading ? 'Setting up your profile...' : 'Get Started'}
            </button>
          </form>

          {/* Additional Info */}
          <p className="text-center text-xs text-slate-500 mt-6">
            You can update this information anytime in your profile settings
          </p>
        </div>
      </div>
    </div>
  );
}
