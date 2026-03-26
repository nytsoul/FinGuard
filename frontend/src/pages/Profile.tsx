import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProfileFormData {
  full_name: string;
  company_name: string;
  industry: string;
  role: string;
  phone: string;
  avatar_url?: string;
  bank_name: string;
  bank_account_number: string;
  account_holder_name: string;
  pan: string;
  aadhar: string;
}

const DEFAULT_FORM_DATA: ProfileFormData = {
  full_name: '',
  company_name: '',
  industry: '',
  role: '',
  phone: '',
  avatar_url: '',
  bank_name: '',
  bank_account_number: '',
  account_holder_name: '',
  pan: '',
  aadhar: '',
};

export default function Profile() {
  const navigate = useNavigate();
  const { user, userProfile, updateProfile, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditMode, setIsEditMode] = useState(true);
  const [formData, setFormData] = useState<ProfileFormData>(DEFAULT_FORM_DATA);

  // Update form data when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setFormData({
        full_name: userProfile.full_name || '',
        company_name: userProfile.company_name || '',
        industry: userProfile.industry || '',
        role: userProfile.role || '',
        phone: userProfile.phone || '',
        avatar_url: userProfile.avatar_url || '',
        bank_name: userProfile.bank_name || '',
        bank_account_number: userProfile.bank_account_number || '',
        account_holder_name: userProfile.account_holder_name || '',
        pan: userProfile.pan || '',
        aadhar: userProfile.aadhar || '',
      });
      setIsEditMode(!userProfile.full_name);
    }
  }, [userProfile]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate required fields
    if (!formData.full_name.trim()) {
      setError('Full name is required');
      setLoading(false);
      return;
    }

    try {
      const { error: err } = await updateProfile({
        full_name: formData.full_name,
        company_name: formData.company_name,
        industry: formData.industry,
        role: formData.role,
        phone: formData.phone,
        avatar_url: formData.avatar_url,
        bank_name: formData.bank_name,
        bank_account_number: formData.bank_account_number,
        account_holder_name: formData.account_holder_name,
        pan: formData.pan,
        aadhar: formData.aadhar,
      });

      if (err) {
        setError(err.message || 'Failed to update profile');
      } else {
        setSuccess('Profile updated successfully!');
        setIsEditMode(false);
        // Redirect to dashboard after 1.5 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fbfd] to-[#f2f4f7] p-4 sm:p-6 lg:p-8">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-poppins text-on-surface mb-2">
            {isEditMode ? 'Complete Your Profile' : 'Your Profile'}
          </h1>
          <p className="text-slate-600">
            {isEditMode
              ? 'Help us know more about you to personalize your experience'
              : 'Your account information'}
          </p>
        </div>

        {/* Profile Card */}
        <div className="neumorphic-card rounded-3xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error rounded-xl text-error text-sm font-semibold">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-emerald-100 border border-emerald-500 rounded-xl text-emerald-700 text-sm font-semibold">
              ✓ {success}
            </div>
          )}

          {!isEditMode && userProfile?.full_name ? (
            // View Mode
            <div className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined">person</span>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="neumorphic-inset p-4 rounded-xl">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                      Full Name
                    </p>
                    <p className="text-lg font-semibold text-on-surface">
                      {userProfile.full_name}
                    </p>
                  </div>

                  <div className="neumorphic-inset p-4 rounded-xl">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                      Email
                    </p>
                    <p className="text-lg font-semibold text-on-surface">{user?.email}</p>
                  </div>

                  <div className="neumorphic-inset p-4 rounded-xl">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                      Phone
                    </p>
                    <p className="text-lg font-semibold text-on-surface">{userProfile.phone || '—'}</p>
                  </div>
                </div>
              </div>

              {/* Company Information */}
              {!isEditMode && userProfile && (
                <div>
                  <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined">business</span>
                    Company Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="neumorphic-inset p-4 rounded-xl">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                        Company Name
                      </p>
                      <p className="text-lg font-semibold text-on-surface">
                        {userProfile?.company_name || '—'}
                      </p>
                    </div>

                    <div className="neumorphic-inset p-4 rounded-xl">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                        Industry
                      </p>
                      <p className="text-lg font-semibold text-on-surface">
                        {userProfile?.industry || '—'}
                      </p>
                    </div>

                    <div className="neumorphic-inset p-4 rounded-xl">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                        Role
                      </p>
                      <p className="text-lg font-semibold text-on-surface">{userProfile?.role || '—'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Bank & Import Details */}
              {!isEditMode && userProfile && (userProfile.bank_name || userProfile.pan || userProfile.aadhar) && (
                <div>
                  <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined">account_balance</span>
                    Bank & Import Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userProfile.bank_name && (
                      <div className="neumorphic-inset p-4 rounded-xl">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                          Bank Name
                        </p>
                        <p className="text-lg font-semibold text-on-surface">{userProfile.bank_name}</p>
                      </div>
                    )}

                    {userProfile.account_holder_name && (
                      <div className="neumorphic-inset p-4 rounded-xl">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                          Account Holder Name
                        </p>
                        <p className="text-lg font-semibold text-on-surface">{userProfile.account_holder_name}</p>
                      </div>
                    )}

                    {userProfile.bank_account_number && (
                      <div className="neumorphic-inset p-4 rounded-xl">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                          Bank Account Number
                        </p>
                        <p className="text-lg font-mono font-semibold text-on-surface">
                          ••••{userProfile.bank_account_number.slice(-4)}
                        </p>
                      </div>
                    )}

                    {userProfile.pan && (
                      <div className="neumorphic-inset p-4 rounded-xl">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                          PAN (Permanent Account Number)
                        </p>
                        <p className="text-lg font-mono font-semibold text-on-surface">{userProfile.pan}</p>
                      </div>
                    )}

                    {userProfile.aadhar && (
                      <div className="neumorphic-inset p-4 rounded-xl">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                          Aadhar Number
                        </p>
                        <p className="text-lg font-mono font-semibold text-on-surface">
                          ••••••••{userProfile.aadhar.slice(-4)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={() => setIsEditMode(true)}
                className="w-full py-3 neumorphic-button-primary font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">edit</span>
                Edit Profile
              </button>
            </div>
          ) : (
            // Edit Mode - Form
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <section className="neumorphic-card p-6 rounded-2xl">
                  <h3 className="text-base font-bold text-on-surface mb-5 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">person</span>
                    Personal Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-on-surface mb-3">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-surface-container-low p-4 rounded-xl border-none neumorphic-inset text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-on-surface mb-3">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full bg-surface-container-low p-4 rounded-xl border-none neumorphic-inset text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </section>

                <section className="neumorphic-card p-6 rounded-2xl">
                  <h3 className="text-base font-bold text-on-surface mb-5 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">business</span>
                    Company Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-on-surface mb-3">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleInputChange}
                        placeholder="Your Company Inc."
                        className="w-full bg-surface-container-low p-4 rounded-xl border-none neumorphic-inset text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-on-surface mb-3">
                        Industry
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container-low p-4 rounded-xl border-none neumorphic-inset text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Select an industry</option>
                        <option value="Technology">Technology</option>
                        <option value="Finance">Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Retail">Retail</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Education">Education</option>
                        <option value="Non-Profit">Non-Profit</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-on-surface mb-3">
                        Job Title / Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        placeholder="e.g., CFO, Finance Manager, CEO"
                        className="w-full bg-surface-container-low p-4 rounded-xl border-none neumorphic-inset text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </section>

                <section className="neumorphic-card p-6 rounded-2xl xl:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary">account_balance</span>
                    <h3 className="text-base font-bold text-on-surface">Bank & Import Details</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-6">
                    These details are required for financial imports and transaction processing.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-on-surface mb-3">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        name="bank_name"
                        value={formData.bank_name}
                        onChange={handleInputChange}
                        placeholder="e.g., ICICI Bank, HDFC Bank"
                        className="w-full bg-surface-container-low p-4 rounded-xl border-none neumorphic-inset text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-on-surface mb-3">
                        Account Holder Name
                      </label>
                      <input
                        type="text"
                        name="account_holder_name"
                        value={formData.account_holder_name}
                        onChange={handleInputChange}
                        placeholder="Name as per bank records"
                        className="w-full bg-surface-container-low p-4 rounded-xl border-none neumorphic-inset text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-on-surface mb-3">
                        Bank Account Number
                      </label>
                      <input
                        type="text"
                        name="bank_account_number"
                        value={formData.bank_account_number}
                        onChange={handleInputChange}
                        placeholder="Your bank account number (confidential)"
                        className="w-full bg-surface-container-low p-4 rounded-xl border-none neumorphic-inset text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-on-surface mb-3">
                        PAN (Permanent Account Number)
                      </label>
                      <input
                        type="text"
                        name="pan"
                        value={formData.pan}
                        onChange={handleInputChange}
                        placeholder="10-digit PAN (e.g., ABCDE1234F)"
                        maxLength={10}
                        className="w-full bg-surface-container-low p-4 rounded-xl border-none neumorphic-inset text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono uppercase"
                      />
                      {formData.pan && formData.pan.length !== 10 && (
                        <p className="text-xs text-red-500 mt-1">PAN must be 10 characters</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-on-surface mb-3">
                        Aadhar Number
                      </label>
                      <input
                        type="text"
                        name="aadhar"
                        value={formData.aadhar}
                        onChange={handleInputChange}
                        placeholder="12-digit Aadhar number"
                        maxLength={12}
                        className="w-full bg-surface-container-low p-4 rounded-xl border-none neumorphic-inset text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono"
                      />
                      {formData.aadhar && formData.aadhar.length !== 12 && (
                        <p className="text-xs text-red-500 mt-1">Aadhar must be 12 digits</p>
                      )}
                    </div>
                  </div>
                </section>

                <section className="neumorphic-card p-6 rounded-2xl xl:col-span-2">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3 neumorphic-button-primary font-bold rounded-xl disabled:opacity-50 transition-all"
                    >
                      {loading ? (
                        <>
                          <span className="material-symbols-outlined inline mr-2 animate-spin">
                            refresh
                          </span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined inline mr-2">check</span>
                          Save Profile
                        </>
                      )}
                    </button>
                    {isEditMode && userProfile?.full_name && (
                      <button
                        type="button"
                        onClick={() => setIsEditMode(false)}
                        className="flex-1 py-3 neumorphic-button text-slate-700 font-bold rounded-xl transition-all"
                      >
                        <span className="material-symbols-outlined inline mr-2">close</span>
                        Cancel
                      </button>
                    )}
                  </div>
                </section>
              </div>
            </form>
          )}
        </div>

        {/* Info Box */}
        {isEditMode && (
          <div className="mt-6 p-4 rounded-xl neumorphic-card border-l-4 border-primary/70">
            <p className="text-sm text-slate-700">
              <span className="font-bold">💡 Tip:</span> Complete your profile to unlock
              personalized financial insights and recommendations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
