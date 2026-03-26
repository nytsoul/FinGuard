import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface VendorMetrics {
  totalPayments: number;
  totalAmount: number;
  averageDaysToPayment: number;
  reliabilityScore: number;
  lastPaymentDate: string;
  paymentFrequency: string;
}

interface VendorDetail {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  category: string;
  paymentTerms: string;
  tier: 'Strategic' | 'Preferred' | 'Standard' | 'Occasional';
  metrics: VendorMetrics;
  activeObligations: number;
  totalDueAmount: number;
}

export default function VendorDetail() {
  const { vendorName } = useParams<{ vendorName: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [vendor, setVendor] = useState<VendorDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [obligations, setObligations] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Fetch vendor details
    fetchVendorDetails();
    fetchVendorObligations();
  }, [vendorName, user, navigate]);

  const fetchVendorDetails = async () => {
    try {
      // Mock vendor data - in production, fetch from /api/vendors/{id}
      const mockVendors: Record<string, VendorDetail> = {
        'amazon-web-services': {
          id: '1',
          name: 'Amazon Web Services',
          email: 'billing@aws.amazon.com',
          phone: '+1-206-266-7933',
          category: 'Cloud Infrastructure',
          paymentTerms: 'Net 30',
          tier: 'Strategic',
          metrics: {
            totalPayments: 24,
            totalAmount: 298500,
            averageDaysToPayment: 12,
            reliabilityScore: 0.98,
            lastPaymentDate: '2024-03-15',
            paymentFrequency: 'Monthly'
          },
          activeObligations: 2,
          totalDueAmount: 24900,
        },
        'slack-technologies': {
          id: '2',
          name: 'Slack Technologies',
          email: 'support@slack.com',
          phone: '+1-415-639-7264',
          category: 'Software',
          paymentTerms: 'Net 30',
          tier: 'Preferred',
          metrics: {
            totalPayments: 16,
            totalAmount: 67200,
            averageDaysToPayment: 18,
            reliabilityScore: 0.85,
            lastPaymentDate: '2024-03-10',
            paymentFrequency: 'Monthly'
          },
          activeObligations: 1,
          totalDueAmount: 4200,
        },
        'lumina-systems': {
          id: '3',
          name: 'Lumina Systems',
          email: 'accounting@lumina.com',
          phone: '+1-510-555-0123',
          category: 'Software Licensing',
          paymentTerms: 'Net 45',
          tier: 'Strategic',
          metrics: {
            totalPayments: 8,
            totalAmount: 124000,
            averageDaysToPayment: 35,
            reliabilityScore: 0.72,
            lastPaymentDate: '2024-02-28',
            paymentFrequency: 'Quarterly'
          },
          activeObligations: 1,
          totalDueAmount: 124000,
        }
      };

      const vendorKey = vendorName?.toLowerCase().replace(/\s+/g, '-') || '';
      const vendorData = mockVendors[vendorKey];
      
      if (vendorData) {
        setVendor(vendorData);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching vendor details:', err);
      setLoading(false);
    }
  };

  const fetchVendorObligations = async () => {
    try {
      // Mock obligations - in production, fetch from /api/vendors/{id}/obligations
      const mockObligations = [
        {
          id: '1',
          invoiceNumber: 'INV-94021',
          amount: 12450,
          dueDate: '2024-03-12',
          status: 'pending',
          topsisRank: 1,
          topsisScore: 0.94,
          description: 'Monthly cloud services'
        },
        {
          id: '2',
          invoiceNumber: 'INV-94022',
          amount: 12450,
          dueDate: '2024-04-12',
          status: 'draft',
          topsisRank: 3,
          topsisScore: 0.82,
          description: 'Monthly cloud services'
        }
      ];
      
      setObligations(mockObligations);
    } catch (err) {
      console.error('Error fetching obligations:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading vendor details...</p>
        </div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f9fbfd] to-[#f2f4f7] p-8 flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-slate-400 mb-4">business</span>
          <h2 className="text-2xl font-bold text-on-surface mb-2">Vendor Not Found</h2>
          <p className="text-slate-600 mb-6">The vendor "{vendorName}" was not found in the system.</p>
          <button
            onClick={() => navigate('/dashboard/invoices')}
            className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all"
          >
            Back to Invoices
          </button>
        </div>
      </div>
    );
  }

  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      'Strategic': 'bg-emerald-100 text-emerald-700 border-emerald-300',
      'Preferred': 'bg-blue-100 text-blue-700 border-blue-300',
      'Standard': 'bg-slate-100 text-slate-700 border-slate-300',
      'Occasional': 'bg-orange-100 text-orange-700 border-orange-300',
    };
    return colors[tier] || colors['Standard'];
  };

  const getReliabilityColor = (score: number) => {
    if (score >= 0.9) return 'text-emerald-600';
    if (score >= 0.75) return 'text-blue-600';
    if (score >= 0.6) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fbfd] to-[#f2f4f7] p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate('/dashboard/invoices')}
          className="flex items-center gap-2 text-primary font-semibold mb-6 hover:opacity-80 transition-opacity"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Invoices
        </button>

        {/* Vendor Header Card */}
        <div className="neumorphic-card bg-white rounded-3xl p-8 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-[#0055e0] flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined text-4xl">business</span>
            </div>

            {/* Vendor Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold font-poppins text-on-surface mb-2">
                {vendor.name}
              </h1>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getTierColor(vendor.tier)}`}>
                  {vendor.tier} Vendor
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-bold bg-slate-100 text-slate-700">
                  {vendor.category}
                </span>
              </div>
              <p className="text-slate-600 text-sm">
                Payment Terms: <span className="font-semibold text-on-surface">{vendor.paymentTerms}</span>
              </p>
            </div>

            {/* Key Metrics Summary */}
            <div className="flex flex-col gap-2">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                  Reliability Score
                </p>
                <p className={`text-2xl font-bold ${getReliabilityColor(vendor.metrics.reliabilityScore)}`}>
                  {(vendor.metrics.reliabilityScore * 100).toFixed(0)}%
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                  Active Obligations
                </p>
                <p className="text-2xl font-bold text-primary">{vendor.activeObligations}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="neumorphic-card bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold font-poppins text-on-surface mb-4">Contact Information</h3>
            <div className="space-y-4">
              {vendor.email && (
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-1">mail</span>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email</p>
                    <a href={`mailto:${vendor.email}`} className="text-primary font-semibold hover:underline">
                      {vendor.email}
                    </a>
                  </div>
                </div>
              )}
              {vendor.phone && (
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-1">phone</span>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Phone</p>
                    <a href={`tel:${vendor.phone}`} className="text-primary font-semibold hover:underline">
                      {vendor.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Relationship Metrics */}
          <div className="neumorphic-card bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold font-poppins text-on-surface mb-4">Relationship Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold text-on-surface">Payment Frequency</p>
                  <p className="text-sm text-slate-600">{vendor.metrics.paymentFrequency}</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold text-on-surface">Avg. Days to Payment</p>
                  <p className="text-sm font-bold text-primary">{vendor.metrics.averageDaysToPayment} days</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold text-on-surface">Total Payments</p>
                  <p className="text-sm font-bold text-on-surface">{vendor.metrics.totalPayments}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-on-surface">Total Amount Paid</p>
                  <p className="text-sm font-bold text-emerald-600">
                    ${(vendor.metrics.totalAmount / 1000).toFixed(1)}k
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="neumorphic-card bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="text-lg font-bold font-poppins text-on-surface mb-6">Financial Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="neumorphic-inset p-4 rounded-xl">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Total Due</p>
              <p className="text-2xl font-bold text-error">${vendor.totalDueAmount.toLocaleString()}</p>
            </div>
            <div className="neumorphic-inset p-4 rounded-xl">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Active Obligations</p>
              <p className="text-2xl font-bold text-primary">{vendor.activeObligations}</p>
            </div>
            <div className="neumorphic-inset p-4 rounded-xl">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Last Payment</p>
              <p className="text-sm font-semibold text-on-surface">{vendor.metrics.lastPaymentDate}</p>
            </div>
            <div className="neumorphic-inset p-4 rounded-xl">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Payment Terms</p>
              <p className="text-lg font-bold text-slate-700">{vendor.paymentTerms}</p>
            </div>
          </div>
        </div>

        {/* Active Obligations */}
        <div className="neumorphic-card bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
            <h3 className="font-bold font-headline text-lg">Active Obligations</h3>
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full">
              {obligations.length}
            </span>
          </div>
          <div className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Status
                    </th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Priority
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {obligations.map((obligation) => (
                    <tr key={obligation.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-on-surface">{obligation.invoiceNumber}</p>
                        <p className="text-[10px] text-slate-500">{obligation.description}</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-on-surface">
                        ${obligation.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{obligation.dueDate}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-[10px] font-bold rounded-full ${
                            obligation.status === 'pending'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {obligation.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs font-bold text-primary">#{obligation.topsisRank}</span>
                          <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-[#0055e0]"
                              style={{ width: `${obligation.topsisScore * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
