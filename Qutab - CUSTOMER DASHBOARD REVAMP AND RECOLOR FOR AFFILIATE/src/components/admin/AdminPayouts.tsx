import { useState } from 'react';
import MaterialIcon from '../MaterialIcon';

interface PayoutRequest {
  id: number;
  affiliate: {
    id: number;
    name: string;
    email: string;
    phone: string;
    ktpName: string;
    ktpNumber: string;
    ktpPhoto: string;
    availableBalance: number;
    pendingCommission: number;
    totalEarned: number;
  };
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  amount: number;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  processedDate?: string;
  transactionId?: string;
  notes?: string;
}

export default function AdminPayouts() {
  const [selectedStatus, setSelectedStatus] = useState<string>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayout, setSelectedPayout] = useState<PayoutRequest | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAffiliateModal, setShowAffiliateModal] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [rejectReason, setRejectReason] = useState('');

  const [payouts, setPayouts] = useState<PayoutRequest[]>([
    {
      id: 1,
      affiliate: {
        id: 3,
        name: 'Ahmad Hidayat',
        email: 'ahmad.h@email.com',
        phone: '081234567890',
        ktpName: 'Ahmad Hidayat',
        ktpNumber: '1234567890123456',
        ktpPhoto: 'https://example.com/ahmad_ktp.jpg',
        availableBalance: 5000000,
        pendingCommission: 1200000,
        totalEarned: 6200000,
      },
      bankDetails: {
        bankName: 'Bank BCA',
        accountNumber: '1234567890',
        accountHolder: 'Ahmad Hidayat',
      },
      amount: 1200000,
      requestDate: '2024-06-10',
      status: 'pending',
    },
    {
      id: 2,
      affiliate: {
        id: 5,
        name: 'Budi Santoso',
        email: 'budi.s@email.com',
        phone: '081234567891',
        ktpName: 'Budi Santoso',
        ktpNumber: '1234567890123457',
        ktpPhoto: 'https://example.com/budi_ktp.jpg',
        availableBalance: 7000000,
        pendingCommission: 2500000,
        totalEarned: 9500000,
      },
      bankDetails: {
        bankName: 'Bank Mandiri',
        accountNumber: '9876543210',
        accountHolder: 'Budi Santoso',
      },
      amount: 2500000,
      requestDate: '2024-06-09',
      status: 'pending',
    },
    {
      id: 3,
      affiliate: {
        id: 4,
        name: 'Dewi Lestari',
        email: 'dewi.l@email.com',
        phone: '081234567892',
        ktpName: 'Dewi Lestari',
        ktpNumber: '1234567890123458',
        ktpPhoto: 'https://example.com/dewi_ktp.jpg',
        availableBalance: 3000000,
        pendingCommission: 800000,
        totalEarned: 3800000,
      },
      bankDetails: {
        bankName: 'Bank BRI',
        accountNumber: '5555666677',
        accountHolder: 'Dewi Lestari',
      },
      amount: 800000,
      requestDate: '2024-06-08',
      status: 'pending',
    },
    {
      id: 4,
      affiliate: {
        id: 3,
        name: 'Ahmad Hidayat',
        email: 'ahmad.h@email.com',
        phone: '081234567890',
        ktpName: 'Ahmad Hidayat',
        ktpNumber: '1234567890123456',
        ktpPhoto: 'https://example.com/ahmad_ktp.jpg',
        availableBalance: 5000000,
        pendingCommission: 1500000,
        totalEarned: 6500000,
      },
      bankDetails: {
        bankName: 'Bank BCA',
        accountNumber: '1234567890',
        accountHolder: 'Ahmad Hidayat',
      },
      amount: 1500000,
      requestDate: '2024-05-25',
      status: 'paid',
      processedDate: '2024-05-26',
      transactionId: 'TRX-2024-0526-001',
    },
    {
      id: 5,
      affiliate: {
        id: 5,
        name: 'Budi Santoso',
        email: 'budi.s@email.com',
        phone: '081234567891',
        ktpName: 'Budi Santoso',
        ktpNumber: '1234567890123457',
        ktpPhoto: 'https://example.com/budi_ktp.jpg',
        availableBalance: 7000000,
        pendingCommission: 3000000,
        totalEarned: 12500000,
      },
      bankDetails: {
        bankName: 'Bank Mandiri',
        accountNumber: '9876543210',
        accountHolder: 'Budi Santoso',
      },
      amount: 3000000,
      requestDate: '2024-05-20',
      status: 'paid',
      processedDate: '2024-05-21',
      transactionId: 'TRX-2024-0521-003',
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'approved':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredPayouts = payouts.filter((payout) => {
    const matchesStatus = selectedStatus === 'all' || payout.status === selectedStatus;
    const matchesSearch =
      payout.affiliate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payout.affiliate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payout.id.toString().includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: payouts.length,
    pending: payouts.filter((p) => p.status === 'pending').length,
    approved: payouts.filter((p) => p.status === 'approved').length,
    paid: payouts.filter((p) => p.status === 'paid').length,
    totalPending: payouts.filter((p) => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    totalPaid: payouts.filter((p) => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
  };

  const handleMarkAsPaid = () => {
    if (!transactionId.trim()) {
      alert('Please enter a transaction ID');
      return;
    }

    if (selectedPayout) {
      setPayouts(
        payouts.map((p) =>
          p.id === selectedPayout.id
            ? {
                ...p,
                status: 'paid',
                processedDate: new Date().toISOString().split('T')[0],
                transactionId: transactionId,
              }
            : p
        )
      );
      alert(`Payout #${selectedPayout.id} marked as paid!`);
      setShowModal(false);
      setTransactionId('');
    }
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert('Please enter a rejection reason');
      return;
    }

    if (selectedPayout) {
      setPayouts(
        payouts.map((p) =>
          p.id === selectedPayout.id
            ? {
                ...p,
                status: 'rejected',
                processedDate: new Date().toISOString().split('T')[0],
                notes: rejectReason,
              }
            : p
        )
      );
      alert(`Payout #${selectedPayout.id} has been rejected.`);
      setShowModal(false);
      setRejectReason('');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-12 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <MaterialIcon icon="schedule" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-sm text-gray-500">Pending Requests</p>
            </div>
          </div>
          <div className="pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">Total Amount</p>
            <p className="text-lg font-bold text-gray-900">
              Rp {(stats.totalPending / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <MaterialIcon icon="check_circle" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.paid}</p>
              <p className="text-sm text-gray-500">Completed Payouts</p>
            </div>
          </div>
          <div className="pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">Total Paid</p>
            <p className="text-lg font-bold text-gray-900">
              Rp {(stats.totalPaid / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <MaterialIcon icon="payments" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Total Requests</p>
            </div>
          </div>
          <div className="pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">All Time</p>
            <p className="text-lg font-bold text-gray-900">
              Rp {((stats.totalPaid + stats.totalPending) / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <MaterialIcon
              icon="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
            />
            <input
              type="text"
              placeholder="Search by affiliate name, email, or request ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'paid', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  selectedStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Payouts Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Request ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Affiliate
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Bank Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Request Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayouts.map((payout) => (
                <tr key={payout.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-semibold text-gray-900">#{payout.id.toString().padStart(4, '0')}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{payout.affiliate.name}</p>
                      <p className="text-sm text-gray-500">{payout.affiliate.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{payout.bankDetails.bankName}</p>
                      <p className="text-sm text-gray-500">{payout.bankDetails.accountNumber}</p>
                      <p className="text-xs text-gray-400">{payout.bankDetails.accountHolder}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">Rp {payout.amount.toLocaleString('id-ID')}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{payout.requestDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(
                        payout.status
                      )}`}
                    >
                      {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedPayout(payout);
                          setShowModal(true);
                        }}
                        className="size-8 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 flex items-center justify-center transition-colors"
                        title="View Details"
                      >
                        <MaterialIcon icon="visibility" className="text-[18px]" />
                      </button>
                      {payout.status === 'pending' && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedPayout(payout);
                              setShowModal(true);
                            }}
                            className="size-8 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 flex items-center justify-center transition-colors"
                            title="Process"
                          >
                            <MaterialIcon icon="check" className="text-[18px]" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Process Payout Modal */}
      {showModal && selectedPayout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Process Payout Request</h3>
                <p className="text-sm text-gray-500">Request #{selectedPayout.id.toString().padStart(4, '0')}</p>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  setTransactionId('');
                  setRejectReason('');
                }}
                className="size-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600"
              >
                <MaterialIcon icon="close" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex items-center gap-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getStatusBadge(
                    selectedPayout.status
                  )}`}
                >
                  {selectedPayout.status.charAt(0).toUpperCase() + selectedPayout.status.slice(1)}
                </span>
                <span className="text-sm text-gray-500">Requested on {selectedPayout.requestDate}</span>
              </div>

              {/* Affiliate Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-gray-900">Affiliate Information</h4>
                  <button
                    onClick={() => setShowAffiliateModal(true)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <MaterialIcon icon="person" className="text-[16px]" />
                    View Profile & KTP
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Name</p>
                    <p className="text-sm text-gray-900">{selectedPayout.affiliate.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Email</p>
                    <p className="text-sm text-gray-900">{selectedPayout.affiliate.email}</p>
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-3">Bank Details</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Bank Name</p>
                    <p className="text-sm text-gray-900">{selectedPayout.bankDetails.bankName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Account Number</p>
                    <p className="text-lg font-bold text-gray-900">{selectedPayout.bankDetails.accountNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Account Holder Name</p>
                    <p className="text-sm text-gray-900">{selectedPayout.bankDetails.accountHolder}</p>
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Payout Amount</h4>
                <p className="text-3xl font-bold text-green-600">
                  Rp {selectedPayout.amount.toLocaleString('id-ID')}
                </p>
              </div>

              {/* Transaction Details (if paid) */}
              {selectedPayout.status === 'paid' && (
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3">Transaction Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Transaction ID</p>
                      <p className="text-sm font-mono text-gray-900">{selectedPayout.transactionId}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Processed Date</p>
                      <p className="text-sm text-gray-900">{selectedPayout.processedDate}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Section (only for pending) */}
              {selectedPayout.status === 'pending' && (
                <div className="border-t border-gray-200 pt-6 space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">Process Payment</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Transaction ID / Proof of Payment
                        </label>
                        <input
                          type="text"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          placeholder="Enter transaction ID after bank transfer"
                          className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <button
                        onClick={handleMarkAsPaid}
                        className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <MaterialIcon icon="check_circle" />
                        Mark as Paid & Complete
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-bold text-red-600 mb-4">Reject Request</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Rejection Reason
                        </label>
                        <textarea
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          placeholder="Enter reason for rejection..."
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <button
                        onClick={handleReject}
                        className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <MaterialIcon icon="cancel" />
                        Reject Payout Request
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Affiliate Profile & KTP Verification Modal */}
      {showAffiliateModal && selectedPayout && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Affiliate Profile & KTP Verification</h3>
                <p className="text-sm text-gray-500">Verify identity before processing payout</p>
              </div>
              <button
                onClick={() => setShowAffiliateModal(false)}
                className="size-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600"
              >
                <MaterialIcon icon="close" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Verification Alert */}
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <MaterialIcon icon="warning" className="text-yellow-600 text-xl mt-0.5" />
                  <div>
                    <h4 className="font-bold text-yellow-900 mb-1">CRITICAL: Identity Verification Required</h4>
                    <p className="text-sm text-yellow-800">
                      Before processing this payout, verify that the <strong>Account Holder Name</strong> matches the <strong>KTP Name</strong> below.
                      If they don't match, REJECT the request immediately.
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Holder vs KTP Name Comparison */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <MaterialIcon icon="account_balance" className="text-xl" />
                    Bank Account Holder
                  </h4>
                  <p className="text-2xl font-bold text-blue-900">{selectedPayout.bankDetails.accountHolder}</p>
                  <p className="text-xs text-blue-700 mt-1">From Bank Details</p>
                </div>
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                    <MaterialIcon icon="badge" className="text-xl" />
                    KTP Registered Name
                  </h4>
                  <p className="text-2xl font-bold text-green-900">{selectedPayout.affiliate.ktpName}</p>
                  <p className="text-xs text-green-700 mt-1">From KTP Verification</p>
                </div>
              </div>

              {/* Match Status */}
              {selectedPayout.bankDetails.accountHolder.toLowerCase() === selectedPayout.affiliate.ktpName.toLowerCase() ? (
                <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-green-600 flex items-center justify-center text-white">
                      <MaterialIcon icon="check" className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-900">✓ NAMES MATCH - Safe to Process</h4>
                      <p className="text-sm text-green-800">The bank account holder name matches the KTP name.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-red-600 flex items-center justify-center text-white">
                      <MaterialIcon icon="error" className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-red-900">✗ NAMES DO NOT MATCH - REJECT THIS REQUEST</h4>
                      <p className="text-sm text-red-800">Do not process this payout. Affiliate is attempting to withdraw to someone else's account.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Affiliate Full Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-4">Complete Affiliate Profile</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Full Name</p>
                    <p className="text-sm text-gray-900">{selectedPayout.affiliate.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Email</p>
                    <p className="text-sm text-gray-900">{selectedPayout.affiliate.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Phone</p>
                    <p className="text-sm text-gray-900">{selectedPayout.affiliate.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">KTP Number</p>
                    <p className="text-sm font-mono text-gray-900">{selectedPayout.affiliate.ktpNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Available Balance</p>
                    <p className="text-sm font-bold text-gray-900">Rp {selectedPayout.affiliate.availableBalance.toLocaleString('id-ID')}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Total Earned</p>
                    <p className="text-sm font-bold text-gray-900">Rp {selectedPayout.affiliate.totalEarned.toLocaleString('id-ID')}</p>
                  </div>
                </div>
              </div>

              {/* KTP Photo */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-3">KTP Photo (Identity Card)</h4>
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                  <MaterialIcon icon="photo_camera" className="text-6xl text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">KTP photo would be displayed here</p>
                  <p className="text-xs text-gray-400 mt-1">Photo URL: {selectedPayout.affiliate.ktpPhoto}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowAffiliateModal(false)}
                  className="flex-1 h-11 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}