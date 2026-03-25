import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [showHelpSupport, setShowHelpSupport] = useState(false);
  const navigate = useNavigate();

  const user = {
    name: 'Alex Stratton',
    email: 'alex@techflow.com',
    phone: '+1 (555) 123-4567',
    role: 'CFO',
    company: 'TechFlow Inc.',
    companyReg: 'REG-2024-45892',
    bankAccount: '****4521',
    bankName: 'Global Finance Bank',
    pan: 'AAAPA1234A',
    ifsc: 'GFBK0001234',
    address: '123 Business Park, Tech Valley, CA 94025',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBhAj6S4kt83Py4JD1Yd7SIc1ZF3HdygHOPumB6IsNoSuo2-gyKCQ4vVp_0h2e0Kf7J0Vzv35Hy5Pw8FQ3qbzbZPbniMRhp_2loT7cthIb7w4ne4HySgG9OZedhuuuIL8OEu4bxTFcJ3ffi_Dl2ns1_x7EAFeM75vayJcktYwV-Y1H44t29Kmp7J0th-JuzTMD9RrCBB6qUrWm9zsXQcYJfjjZrpZubfdjqLPJBzBQ_Dyh4_DKLl73l99-5zPHITp_uH066tl6KZTXL'
  };

  const menuItems = [
    {
      label: 'View Profile',
      icon: 'person',
      onClick: () => {
        setShowProfileModal(true);
        setIsOpen(false);
      }
    },
    {
      label: 'Preferences',
      icon: 'tune',
      onClick: () => {
        setShowPreferences(true);
        setIsOpen(false);
      }
    },
    {
      label: 'Help & Support',
      icon: 'help',
      onClick: () => {
        setShowHelpSupport(true);
        setIsOpen(false);
      }
    },
    {
      label: 'Settings',
      icon: 'settings',
      onClick: () => {
        navigate('/settings');
        setIsOpen(false);
      }
    },
    {
      label: 'Logout',
      icon: 'logout',
      onClick: () => alert('Logout functionality coming soon!'),
      isLogout: true
    }
  ];

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
      >
        <div className="hidden md:flex flex-col text-right">
          <p className="text-xs font-bold text-on-surface font-poppins">
            {user.name}
          </p>
          <p className="text-[10px] text-slate-500 font-inter uppercase tracking-wider">
            {user.role} • {user.company}
          </p>
        </div>
        <img
          alt="User Profile"
          className="w-10 h-10 rounded-full border-2 border-white shadow-sm hover:shadow-md transition-shadow"
          src={user.avatar}
        />
      </button>

      {/* Profile Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-40">
          {/* User Info Header */}
          <div className="bg-gradient-to-r from-[#f7f9fc] to-[#f2f4f7] p-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <img
                alt="User Profile"
                className="w-12 h-12 rounded-xl border-2 border-white shadow-sm"
                src={user.avatar}
              />
              <div>
                <p className="font-bold text-lg font-poppins text-on-surface">
                  {user.name}
                </p>
                <p className="text-xs text-slate-600 font-inter">
                  {user.email}
                </p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1">
                  {user.role}
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
                className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                  item.isLogout
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="material-symbols-outlined text-lg">
                  {item.icon}
                </span>
                <span className="flex-1 text-left font-inter">{item.label}</span>
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
              <h2 className="text-2xl font-bold font-poppins text-on-surface">Profile Details</h2>
              <button
                onClick={() => setShowProfileModal(false)}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Profile Content */}
            <div className="p-6 space-y-6">
              {/* Avatar & Name */}
              <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                <img
                  alt="User Profile"
                  className="w-20 h-20 rounded-2xl border-2 border-white shadow-md"
                  src={user.avatar}
                />
                <div>
                  <h3 className="text-2xl font-bold font-poppins text-on-surface">{user.name}</h3>
                  <p className="text-sm text-slate-600 font-inter">{user.role}</p>
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
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-slate-500">mail</span>
                      <span className="text-xs font-semibold text-slate-600 uppercase">Email</span>
                    </div>
                    <span className="text-sm font-medium text-on-surface">{user.email}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-slate-500">phone</span>
                      <span className="text-xs font-semibold text-slate-600 uppercase">Phone</span>
                    </div>
                    <span className="text-sm font-medium text-on-surface">{user.phone}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-slate-500">location_on</span>
                      <span className="text-xs font-semibold text-slate-600 uppercase">Address</span>
                    </div>
                    <span className="text-sm font-medium text-on-surface text-right">{user.address}</span>
                  </div>
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
                    <span className="text-sm font-medium text-on-surface">{user.company}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-slate-500">article</span>
                      <span className="text-xs font-semibold text-slate-600 uppercase">Registration</span>
                    </div>
                    <span className="text-sm font-medium text-on-surface">{user.companyReg}</span>
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">Bank Details</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-blue-600">account_balance</span>
                      <span className="text-xs font-semibold text-blue-700 uppercase">Bank</span>
                    </div>
                    <span className="text-sm font-medium text-blue-900">{user.bankName}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-blue-600">credit_card</span>
                      <span className="text-xs font-semibold text-blue-700 uppercase">Account</span>
                    </div>
                    <span className="text-sm font-medium text-blue-900 font-mono">{user.bankAccount}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-blue-600">confirmation_number</span>
                      <span className="text-xs font-semibold text-blue-700 uppercase">IFSC</span>
                    </div>
                    <span className="text-sm font-medium text-blue-900">{user.ifsc}</span>
                  </div>
                </div>
              </div>

              {/* Tax Information */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">Tax Information</h4>
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-amber-600">badge</span>
                    <span className="text-xs font-semibold text-amber-700 uppercase">PAN</span>
                  </div>
                  <span className="text-sm font-medium text-amber-900 font-mono">{user.pan}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button className="flex-1 py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-all">
                  Edit Profile
                </button>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="flex-1 py-2 px-4 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowPreferences(false)}
          ></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-[#f7f9fc] to-[#f2f4f7] p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-2xl font-bold font-poppins text-on-surface">Preferences</h2>
              <button
                onClick={() => setShowPreferences(false)}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Notification Preferences */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">Notification Preferences</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors">
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-slate-700">Email Notifications</p>
                      <p className="text-xs text-slate-500">Receive alerts via email</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors">
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-slate-700">Push Notifications</p>
                      <p className="text-xs text-slate-500">Desktop & mobile alerts</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors">
                    <input type="checkbox" className="w-5 h-5" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-slate-700">SMS Alerts</p>
                      <p className="text-xs text-slate-500">Critical alerts only</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Display Preferences */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">Display Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-semibold text-slate-700">Dark Mode</span>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-semibold text-slate-700">Compact View</span>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Language & Region */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">Language & Region</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase">Language</label>
                    <select className="w-full mt-2 p-2 border border-slate-200 rounded-lg font-roboto focus:ring-2 focus:ring-primary/20">
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase">Currency</label>
                    <select className="w-full mt-2 p-2 border border-slate-200 rounded-lg font-roboto focus:ring-2 focus:ring-primary/20">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>INR (₹)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-all">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help & Support Modal */}
      {showHelpSupport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowHelpSupport(false)}
          ></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-[#f7f9fc] to-[#f2f4f7] p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-2xl font-bold font-poppins text-on-surface">Help & Support</h2>
              <button
                onClick={() => setShowHelpSupport(false)}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* FAQ Section */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">Frequently Asked Questions</h4>
                <div className="space-y-3">
                  <details className="p-3 bg-slate-50 rounded-lg cursor-pointer group">
                    <summary className="font-semibold text-slate-700 text-sm flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg group-open:hidden">add</span>
                      <span className="material-symbols-outlined text-lg hidden group-open:block">remove</span>
                      How do I reset my password?
                    </summary>
                    <p className="text-xs text-slate-600 mt-2 ml-6">Go to Settings {">"}  Security {">"}  Change Password. Enter your current password and set a new one.</p>
                  </details>
                  <details className="p-3 bg-slate-50 rounded-lg cursor-pointer group">
                    <summary className="font-semibold text-slate-700 text-sm flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg group-open:hidden">add</span>
                      <span className="material-symbols-outlined text-lg hidden group-open:block">remove</span>
                      How do I export my data?
                    </summary>
                    <p className="text-xs text-slate-600 mt-2 ml-6">Visit Dashboard {">"}  Export Data to download your financial records in CSV or PDF format.</p>
                  </details>
                  <details className="p-3 bg-slate-50 rounded-lg cursor-pointer group">
                    <summary className="font-semibold text-slate-700 text-sm flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg group-open:hidden">add</span>
                      <span className="material-symbols-outlined text-lg hidden group-open:block">remove</span>
                      What payment methods do you support?
                    </summary>
                    <p className="text-xs text-slate-600 mt-2 ml-6">We support bank transfers, credit/debit cards, and digital wallets.</p>
                  </details>
                </div>
              </div>

              {/* Contact Support */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">Contact Support</h4>
                <div className="space-y-3">
                  <a href="mailto:support@cashmind.com" className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                    <span className="material-symbols-outlined text-blue-600">mail</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-blue-900">Email Support</p>
                      <p className="text-xs text-blue-700">support@cashmind.com</p>
                    </div>
                  </a>
                  <a href="tel:+1-800-FINANCE" className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                    <span className="material-symbols-outlined text-green-600">phone</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-green-900">Phone Support</p>
                      <p className="text-xs text-green-700">+1 (800) 334-2623 • Available 9 AM - 6 PM EST</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors">
                    <span className="material-symbols-outlined text-purple-600">chat</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-purple-900">Live Chat</p>
                      <p className="text-xs text-purple-700">Available now • Average response: 2 minutes</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Documentation */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">Resources</h4>
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-2 p-2 text-primary hover:text-primary-container hover:bg-blue-50 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-sm">description</span>
                    <span className="text-sm font-semibold">User Documentation</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 p-2 text-primary hover:text-primary-container hover:bg-blue-50 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-sm">video_library</span>
                    <span className="text-sm font-semibold">Video Tutorials</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 p-2 text-primary hover:text-primary-container hover:bg-blue-50 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span className="text-sm font-semibold">Webinars & Events</span>
                  </a>
                </div>
              </div>

              {/* Version Info */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-[10px] text-slate-600 text-center">
                  CashMind v2.4.0 • Build 2026.01 • © 2026 CashMind Inc.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
