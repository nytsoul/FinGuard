import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserPreferences, saveUserPreferences, type BackendPreferences } from '../lib/api';

interface PreferencesData {
  // Notification Preferences
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  emailFrequency: 'immediate' | 'daily' | 'weekly';
  invoiceAlerts: boolean;
  paymentReminders: boolean;
  cashFlowAlerts: boolean;
  vendorAlerts: boolean;
  
  // Display Preferences
  theme: 'light' | 'dark' | 'auto';
  language: string;
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  currencyFormat: string;
  itemsPerPage: number;
  
  // Financial Preferences
  defaultPaymentTerm: number;
  budgetWarningThreshold: number;
  autoPaymentEnabled: boolean;
  autoPaymentThreshold: number;
  reconciliationMethod: 'manual' | 'auto' | 'semi-auto';
  taxCalculation: 'GST' | 'VAT' | 'NONE';
}

const Preferences: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'notifications' | 'display' | 'financial'>('notifications');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [preferences, setPreferences] = useState<PreferencesData>({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    emailFrequency: 'daily',
    invoiceAlerts: true,
    paymentReminders: true,
    cashFlowAlerts: true,
    vendorAlerts: true,
    
    theme: 'auto',
    language: 'English',
    dateFormat: 'MM/DD/YYYY',
    currencyFormat: 'USD',
    itemsPerPage: 10,
    
    defaultPaymentTerm: 30,
    budgetWarningThreshold: 80,
    autoPaymentEnabled: false,
    autoPaymentThreshold: 100000,
    reconciliationMethod: 'manual',
    taxCalculation: 'NONE',
  });

  const fromBackend = (data: BackendPreferences): PreferencesData => ({
    emailNotifications: data.notifications.email_notifications,
    smsNotifications: data.notifications.sms_notifications,
    pushNotifications: data.notifications.push_notifications,
    emailFrequency: data.notifications.email_frequency,
    invoiceAlerts: data.notifications.invoice_alerts,
    paymentReminders: data.notifications.payment_reminders,
    cashFlowAlerts: data.notifications.cash_flow_alerts,
    vendorAlerts: data.notifications.vendor_alerts,
    theme: data.display.theme,
    language: data.display.language,
    dateFormat: data.display.date_format,
    currencyFormat: data.display.currency_format,
    itemsPerPage: data.display.items_per_page,
    defaultPaymentTerm: data.financial.default_payment_term,
    budgetWarningThreshold: data.financial.budget_warning_threshold,
    autoPaymentEnabled: data.financial.auto_payment_enabled,
    autoPaymentThreshold: data.financial.auto_payment_threshold,
    reconciliationMethod: data.financial.reconciliation_method,
    taxCalculation: data.financial.tax_calculation,
  });

  const toBackend = (userId: string, data: PreferencesData): BackendPreferences => ({
    user_id: userId,
    notifications: {
      email_notifications: data.emailNotifications,
      sms_notifications: data.smsNotifications,
      push_notifications: data.pushNotifications,
      email_frequency: data.emailFrequency,
      invoice_alerts: data.invoiceAlerts,
      payment_reminders: data.paymentReminders,
      cash_flow_alerts: data.cashFlowAlerts,
      vendor_alerts: data.vendorAlerts,
    },
    display: {
      theme: data.theme,
      language: data.language,
      date_format: data.dateFormat,
      currency_format: data.currencyFormat,
      items_per_page: data.itemsPerPage,
    },
    financial: {
      default_payment_term: data.defaultPaymentTerm,
      budget_warning_threshold: data.budgetWarningThreshold,
      auto_payment_enabled: data.autoPaymentEnabled,
      auto_payment_threshold: data.autoPaymentThreshold,
      reconciliation_method: data.reconciliationMethod,
      tax_calculation: data.taxCalculation,
    },
  });

  // Load preferences from backend for signed-in users, fallback to local storage.
  useEffect(() => {
    const loadPreferences = async () => {
      if (user?.id) {
        try {
          const apiData = await getUserPreferences(user.id);
          setPreferences(fromBackend(apiData));
          return;
        } catch (error) {
          console.warn('Failed to fetch backend preferences, falling back to localStorage:', error);
        }
      }

      const local = localStorage.getItem('preferences');
      if (local) {
        setPreferences(JSON.parse(local));
      }
    };

    loadPreferences();
  }, [user?.id]);

  const handleChange = (key: keyof PreferencesData, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (user?.id) {
        await saveUserPreferences(user.id, toBackend(user.id, preferences));
      }

      localStorage.setItem('preferences', JSON.stringify(preferences));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSwitch = (key: keyof PreferencesData) => {
    handleChange(key, !preferences[key as keyof PreferencesData]);
  };

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'display', label: 'Display', icon: 'display_settings' },
    { id: 'financial', label: 'Financial', icon: 'account_balance' },
  ];

  // Toggle Switch Component
  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: (val: boolean) => void }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-primary' : 'bg-slate-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="overflow-y-auto p-4 lg:p-8 space-y-8 w-full bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="max-w-6xl">
        <div className="flex items-center gap-3 mb-2">
          <span className="material-symbols-outlined text-4xl text-primary">settings</span>
          <h1 className="text-4xl font-bold text-on-surface font-poppins">Preferences & Settings</h1>
        </div>
        <p className="text-slate-600">Customize your FinGuard experience to match your needs</p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Tab Navigation */}
        <div className="neumorphic-card p-1 rounded-2xl mb-8 flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-sm transition-all ${
                activeTab === tab.id
                  ? 'neumorphic-pressed text-primary'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            {/* Communication Channels Section */}
            <div className="neumorphic-card p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-blue-100">
                  <span className="material-symbols-outlined text-blue-600">notifications_active</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface font-poppins">Communication Channels</h3>
                  <p className="text-sm text-slate-600">Choose how you want to receive notifications</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive urgent alerts via SMS' },
                  { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive notifications in your browser' },
                ].map(item => (
                  <div key={item.key} className="neumorphic-inset p-4 rounded-xl flex items-center justify-between hover:shadow-md transition-all">
                    <div>
                      <p className="font-semibold text-slate-900">{item.label}</p>
                      <p className="text-xs text-slate-600">{item.desc}</p>
                    </div>
                    <ToggleSwitch 
                      checked={preferences[item.key as keyof PreferencesData] as boolean}
                      onChange={() => toggleSwitch(item.key as keyof PreferencesData)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Email Frequency Section */}
            <div className="neumorphic-card p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-purple-100">
                  <span className="material-symbols-outlined text-purple-600">schedule</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface font-poppins">Email Frequency</h3>
                  <p className="text-sm text-slate-600">Choose how often you receive email summaries</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['immediate', 'daily', 'weekly'].map(freq => (
                  <button
                    key={freq}
                    onClick={() => handleChange('emailFrequency', freq as any)}
                    className={`neumorphic-inset p-4 rounded-xl text-center transition-all ${
                      preferences.emailFrequency === freq
                        ? 'ring-2 ring-primary neumorphic-card'
                        : 'hover:shadow-md'
                    }`}
                  >
                    <span className="block text-sm font-semibold text-slate-900 capitalize">{freq}</span>
                    <span className="text-xs text-slate-600 capitalize">
                      {freq === 'immediate' ? 'As it happens' : freq === 'daily' ? 'Once per day' : 'Once per week'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Alert Types Section */}
            <div className="neumorphic-card p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-amber-100">
                  <span className="material-symbols-outlined text-amber-600">warning</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface font-poppins">Alert Types</h3>
                  <p className="text-sm text-slate-600">Select which events trigger notifications</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'invoiceAlerts', label: 'Invoice Alerts', desc: 'Get notified about new invoices and updates', icon: 'description' },
                  { key: 'paymentReminders', label: 'Payment Reminders', desc: 'Remind me about upcoming payments', icon: 'payment' },
                  { key: 'cashFlowAlerts', label: 'Cash Flow Alerts', desc: 'Alert me about significant cash flow changes', icon: 'trending_up' },
                  { key: 'vendorAlerts', label: 'Vendor Alerts', desc: 'Get notified about vendor updates', icon: 'business' },
                ].map(item => (
                  <div key={item.key} className="neumorphic-inset p-4 rounded-xl flex items-center justify-between hover:shadow-md transition-all">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-slate-100 mt-1">
                        <span className="material-symbols-outlined text-slate-600 text-xl">{item.icon}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{item.label}</p>
                        <p className="text-xs text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                    <ToggleSwitch 
                      checked={preferences[item.key as keyof PreferencesData] as boolean}
                      onChange={() => toggleSwitch(item.key as keyof PreferencesData)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'display' && (
          <div className="space-y-6">
            {/* Theme & Language Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Theme */}
              <div className="neumorphic-card p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-indigo-100">
                    <span className="material-symbols-outlined text-indigo-600">dark_mode</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface font-poppins">Theme</h3>
                </div>

                <div className="space-y-3">
                  {['light', 'dark', 'auto'].map(theme => (
                    <button
                      key={theme}
                      onClick={() => handleChange('theme', theme as any)}
                      className={`w-full neumorphic-inset p-4 rounded-xl text-left transition-all flex items-center gap-3 ${
                        preferences.theme === theme
                          ? 'ring-2 ring-primary neumorphic-card'
                          : 'hover:shadow-md'
                      }`}
                    >
                      <span className="material-symbols-outlined text-slate-600">
                        {theme === 'light' ? 'light_mode' : theme === 'dark' ? 'dark_mode' : 'brightness_auto'}
                      </span>
                      <span className="font-semibold text-slate-900 capitalize">{theme}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div className="neumorphic-card p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-green-100">
                    <span className="material-symbols-outlined text-green-600">language</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface font-poppins">Language</h3>
                </div>

                <select
                  value={preferences.language}
                  onChange={(e) => handleChange('language', e.target.value)}
                  className="w-full neumorphic-inset p-4 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>
            </div>

            {/* Date & Currency Format */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Date Format */}
              <div className="neumorphic-card p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-orange-100">
                    <span className="material-symbols-outlined text-orange-600">calendar_today</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface font-poppins">Date Format</h3>
                </div>

                <select
                  value={preferences.dateFormat}
                  onChange={(e) => handleChange('dateFormat', e.target.value)}
                  className="w-full neumorphic-inset p-4 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              {/* Currency */}
              <div className="neumorphic-card p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-cyan-100">
                    <span className="material-symbols-outlined text-cyan-600">currency_rupee</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface font-poppins">Currency</h3>
                </div>

                <select
                  value={preferences.currencyFormat}
                  onChange={(e) => handleChange('currencyFormat', e.target.value)}
                  className="w-full neumorphic-inset p-4 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>

            {/* Items Per Page */}
            <div className="neumorphic-card p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-pink-100">
                  <span className="material-symbols-outlined text-pink-600">grid_on</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface font-poppins">Items Per Page</h3>
                  <p className="text-sm text-slate-600">How many items to show in paginated lists</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={preferences.itemsPerPage}
                  onChange={(e) => handleChange('itemsPerPage', parseInt(e.target.value))}
                  className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="neumorphic-inset px-4 py-2 rounded-lg min-w-16 text-center">
                  <p className="font-bold text-slate-900">{preferences.itemsPerPage}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'financial' && (
          <div className="space-y-6">
            {/* Payment Settings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Default Payment Term */}
              <div className="neumorphic-card p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-blue-100">
                    <span className="material-symbols-outlined text-blue-600">event</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface font-poppins">Payment Term</h3>
                </div>

                <div className="space-y-2">
                  <input
                    type="number"
                    min="0"
                    max="365"
                    value={preferences.defaultPaymentTerm}
                    onChange={(e) => handleChange('defaultPaymentTerm', parseInt(e.target.value))}
                    className="w-full neumorphic-inset p-4 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-xs text-slate-600">Standard payment due date in days</p>
                </div>
              </div>

              {/* Budget Warning Threshold */}
              <div className="neumorphic-card p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-amber-100">
                    <span className="material-symbols-outlined text-amber-600">warning</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface font-poppins">Budget Warning</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={preferences.budgetWarningThreshold}
                      onChange={(e) => handleChange('budgetWarningThreshold', parseInt(e.target.value))}
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="neumorphic-inset px-4 py-2 rounded-lg min-w-16 text-center">
                      <p className="font-bold text-slate-900">{preferences.budgetWarningThreshold}%</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600">Alert when budget usage reaches this %</p>
                </div>
              </div>
            </div>

            {/* Tax & Reconciliation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tax Calculation */}
              <div className="neumorphic-card p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-red-100">
                    <span className="material-symbols-outlined text-red-600">receipt</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface font-poppins">Tax Method</h3>
                </div>

                <select
                  value={preferences.taxCalculation}
                  onChange={(e) => handleChange('taxCalculation', e.target.value)}
                  className="w-full neumorphic-inset p-4 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="NONE">None</option>
                  <option value="GST">GST (India)</option>
                  <option value="VAT">VAT (Europe)</option>
                </select>
              </div>

              {/* Reconciliation Method */}
              <div className="neumorphic-card p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-teal-100">
                    <span className="material-symbols-outlined text-teal-600">rule_folder</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface font-poppins">Reconciliation</h3>
                </div>

                <select
                  value={preferences.reconciliationMethod}
                  onChange={(e) => handleChange('reconciliationMethod', e.target.value)}
                  className="w-full neumorphic-inset p-4 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="manual">Manual</option>
                  <option value="semi-auto">Semi-Automatic</option>
                  <option value="auto">Fully Automatic</option>
                </select>
              </div>
            </div>

            {/* Auto Payment Section */}
            <div className="neumorphic-card p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-green-100">
                    <span className="material-symbols-outlined text-green-600">verified</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-on-surface font-poppins">Auto Payment</h3>
                    <p className="text-sm text-slate-600">Automatically pay invoices meeting your criteria</p>
                  </div>
                </div>
                <ToggleSwitch 
                  checked={preferences.autoPaymentEnabled}
                  onChange={() => toggleSwitch('autoPaymentEnabled')}
                />
              </div>

              {preferences.autoPaymentEnabled && (
                <div className="neumorphic-inset p-6 rounded-xl">
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    Payment Threshold (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={preferences.autoPaymentThreshold}
                    onChange={(e) => handleChange('autoPaymentThreshold', parseInt(e.target.value))}
                    className="w-full p-3 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  />
                  <p className="text-xs text-slate-600 mt-2">Only auto-pay invoices below this amount</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex gap-4 mt-8 sticky bottom-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="neumorphic-button-primary px-8 py-4 rounded-xl font-bold flex items-center gap-2 text-lg disabled:opacity-50 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin">refresh</span>
                Saving...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">check_circle</span>
                Save All Preferences
              </>
            )}
          </button>

          {saved && (
            <div className="flex items-center gap-2 px-6 py-4 neumorphic-card rounded-xl font-bold text-emerald-600">
              <span className="material-symbols-outlined">done</span>
              Preferences saved successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preferences;
