import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProfileDropdown() {
<<<<<<< HEAD
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null; // Don't show profile dropdown if user isn't logged in
  }

  const handleLogout = async () => {
    await signOut();
    navigate('/');
=======
  const navigate = useNavigate();
  const { user, userProfile, signOut, upsertProfile } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editLoading, setSaveLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [logoutLoading, setLogoutLoading] = useState(false);

  const [editData, setEditData] = useState({
    full_name: userProfile?.full_name || '',
    company_name: userProfile?.company_name || '',
  });

  const displayName = userProfile?.full_name || user?.email?.split('@')[0] || 'User';
  const displayCompany = userProfile?.company_name || 'No company';

  const handleLogout = async () => {
    console.log('🔓 Logout initiated');
    setLogoutLoading(true);
    setIsOpen(false);
    
    try {
      // Call logout
      console.log('🔓 Calling Supabase signOut...');
      const { error } = await signOut();
      
      if (error) {
        console.warn('🔓 Logout warning (still proceeding):', error);
      } else {
        console.log('🔓 Logout successful');
      }
      
      console.log('🔓 Clearing local auth state and redirecting...');
      // Give auth state a moment to fully update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('🔓 Using React Router navigate');
      // First try React Router navigate
      navigate('/login', { replace: true });
      
      // As a fallback, reload the page to force client-side session check
      setTimeout(() => {
        console.log('🔓 Fallback: full page reload');
        window.location.reload();
      }, 1500);
      
    } catch (err) {
      console.error('🔓 Logout error:', err);
      // Force immediate reload on error
      console.log('🔓 Force page reload due to error');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
  };

  const menuItems = [
    {
      label: 'View Profile',
      icon: 'person',
      onClick: () => {
<<<<<<< HEAD
        navigate('/dashboard/profile');
        setIsOpen(false);
      }
    },
    {
      label: 'Preferences',
      icon: 'tune',
      onClick: () => {
        navigate('/dashboard/preferences');
        setIsOpen(false);
      }
    },
    {
      label: 'Help & Support',
      icon: 'help',
      onClick: () => {
        navigate('/help');
=======
        setIsEditMode(false);
        setShowProfileModal(true);
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
        setIsOpen(false);
      }
    },
    {
      label: 'Settings',
      icon: 'settings',
      onClick: () => {
<<<<<<< HEAD
        navigate('/dashboard/settings');
=======
        navigate('/settings');
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
        setIsOpen(false);
      }
    },
    {
      label: 'Logout',
      icon: 'logout',
      onClick: handleLogout,
      isLogout: true
    }
  ];

<<<<<<< HEAD
=======
  const handleEditClick = () => {
    setEditData({
      full_name: userProfile?.full_name || '',
      company_name: userProfile?.company_name || '',
    });
    setIsEditMode(true);
  };

  const handleSaveProfile = async () => {
    setSaveLoading(true);
    setEditError('');

    const { error } = await upsertProfile({
      full_name: editData.full_name || null,
      company_name: editData.company_name || null,
    });

    if (error) {
      setEditError(error.message);
      setSaveLoading(false);
      return;
    }

    setIsEditMode(false);
    setSaveLoading(false);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditError('');
    setEditData({
      full_name: userProfile?.full_name || '',
      company_name: userProfile?.company_name || '',
    });
  };

  if (!user) return null;

>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
      >
        <div className="hidden md:flex flex-col text-right">
          <p className="text-xs font-bold text-on-surface font-poppins">
<<<<<<< HEAD
            {user?.email}
          </p>
        </div>
        <img
          alt="User Profile"
          className="w-10 h-10 rounded-full border-2 border-white shadow-sm hover:shadow-md transition-shadow"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhAj6S4kt83Py4JD1Yd7SIc1ZF3HdygHOPumB6IsNoSuo2-gyKCQ4vVp_0h2e0Kf7J0Vzv35Hy5Pw8FQ3qbzbZPbniMRhp_2loT7cthIb7w4ne4HySgG9OZedhuuuIL8OEu4bxTFcJ3ffi_Dl2ns1_x7EAFeM75vayJcktYwV-Y1H44t29Kmp7J0th-JuzTMD9RrCBB6qUrWm9zsXQcYJfjjZrpZubfdjqLPJBzBQ_Dyh4_DKLl73l99-5zPHITp_uH066tl6KZTXL"
        />
=======
            {displayName}
          </p>
          <p className="text-[10px] text-slate-500 font-inter uppercase tracking-wider">
            {displayCompany}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[#0055e0] grid place-items-center text-white font-bold shadow-sm">
          {displayName.charAt(0).toUpperCase()}
        </div>
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
      </button>

      {/* Profile Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-40">
          {/* User Info Header */}
          <div className="bg-gradient-to-r from-[#f7f9fc] to-[#f2f4f7] p-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
<<<<<<< HEAD
              <img
                alt="User Profile"
                className="w-12 h-12 rounded-xl border-2 border-white shadow-sm"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhAj6S4kt83Py4JD1Yd7SIc1ZF3HdygHOPumB6IsNoSuo2-gyKCQ4vVp_0h2e0Kf7J0Vzv35Hy5Pw8FQ3qbzbZPbniMRhp_2loT7cthIb7w4ne4HySgG9OZedhuuuIL8OEu4bxTFcJ3ffi_Dl2ns1_x7EAFeM75vayJcktYwV-Y1H44t29Kmp7J0th-JuzTMD9RrCBB6qUrWm9zsXQcYJfjjZrpZubfdjqLPJBzBQ_Dyh4_DKLl73l99-5zPHITp_uH066tl6KZTXL"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-on-surface font-poppins">
                  {user?.email}
                </h3>
              </div>
            </div>
          </div>
          {/* Menu Items */}
          <div className="p-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className={
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ' +
                  (item.isLogout
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-slate-600 hover:bg-slate-50')
                }
              >
                <span className="material-symbols-outlined text-lg">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
=======
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-[#0055e0] grid place-items-center text-white font-bold text-lg shadow-sm">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-lg font-poppins text-on-surface truncate">
                  {displayName}
                </p>
                <p className="text-xs text-slate-600 font-inter truncate">
                  {user.email}
                </p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1 truncate">
                  {displayCompany}
                </p>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-xs font-semibold text-slate-700 font-inter">
                Active Now
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="divide-y divide-slate-100">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                disabled={item.isLogout && logoutLoading}
                className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  item.isLogout
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.isLogout && logoutLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-red-200 border-t-red-600 rounded-full animate-spin"></span>
                ) : (
                  <span className="material-symbols-outlined text-lg">
                    {item.icon}
                  </span>
                )}
                <span className="flex-1 text-left font-inter">
                  {item.isLogout && logoutLoading ? 'Signing out...' : item.label}
                </span>
                {!item.isLogout && (
                  <span className="material-symbols-outlined text-slate-400 text-sm">
                    chevron_right
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Footer Info */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
            <p className="text-[10px] text-slate-500 font-inter text-center">
              CashMind v2.4.0 • © 2026
            </p>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Profile Details Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowProfileModal(false)}
          ></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#f7f9fc] to-[#f2f4f7] p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-2xl font-bold font-poppins text-on-surface">
                {isEditMode ? 'Edit Profile' : 'Profile Details'}
              </h2>
              <button
                onClick={() => setShowProfileModal(false)}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Profile Content */}
            <div className="p-6 space-y-6">
              {editError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {editError}
                </div>
              )}

              {/* Avatar & Name */}
              <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-[#0055e0] grid place-items-center text-white font-bold text-3xl shadow-md flex-shrink-0">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold font-poppins text-on-surface">{displayName}</h3>
                  <p className="text-sm text-slate-600 font-inter">{displayCompany}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-xs font-semibold text-emerald-600">Active</span>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">Personal Information</h4>
                <div className="space-y-3">
                  {isEditMode ? (
                    <>
                      <div>
                        <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Full Name</label>
                        <input
                          type="text"
                          value={editData.full_name}
                          onChange={(e) => setEditData(prev => ({ ...prev, full_name: e.target.value }))}
                          placeholder="Your full name"
                          className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Company Name</label>
                        <input
                          type="text"
                          value={editData.company_name}
                          onChange={(e) => setEditData(prev => ({ ...prev, company_name: e.target.value }))}
                          placeholder="Your company name"
                          className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-slate-500">person</span>
                          <span className="text-xs font-semibold text-slate-600 uppercase">Full Name</span>
                        </div>
                        <span className="text-sm font-medium text-on-surface">{userProfile?.full_name || '—'}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-slate-500">mail</span>
                          <span className="text-xs font-semibold text-slate-600 uppercase">Email</span>
                        </div>
                        <span className="text-sm font-medium text-on-surface truncate">{user.email}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Company Information */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">Company Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-slate-500">business</span>
                      <span className="text-xs font-semibold text-slate-600 uppercase">Company</span>
                    </div>
                    <span className="text-sm font-medium text-on-surface">{userProfile?.company_name || '—'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-slate-500">calendar_today</span>
                      <span className="text-xs font-semibold text-slate-600 uppercase">Member Since</span>
                    </div>
                    <span className="text-sm font-medium text-on-surface">
                      {userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString() : '—'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                {isEditMode ? (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      disabled={editLoading}
                      className="flex-1 py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-60 transition-all"
                    >
                      {editLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={editLoading}
                      className="flex-1 py-2 px-4 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 disabled:opacity-60 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleEditClick}
                      className="flex-1 py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">edit</span>
                      Edit Profile
                    </button>
                    <button
                      onClick={() => setShowProfileModal(false)}
                      className="flex-1 py-2 px-4 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
                    >
                      Close
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
        </div>
      )}
    </div>
  );
}
