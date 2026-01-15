import { useState } from 'react';
import MaterialIcon from '../MaterialIcon';

interface BankVerification {
  id: number;
  affiliate: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  ktpInfo: {
    ktpName: string;
    ktpNumber: string;
    ktpPhoto: string;
  };
  bankInfo: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedDate?: string;
  notes?: string;
}

export default function AdminBankVerification() {
  const [selectedStatus, setSelectedStatus] = useState<string>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVerification, setSelectedVerification] = useState<BankVerification | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const [verifications, setVerifications] = useState<BankVerification[]>([
    {
      id: 1,
      affiliate: {
        id: 3,
        name: 'Ahmad Hidayat',
        email: 'ahmad.h@email.com',
        phone: '+62 821-5678-9012',
      },
      ktpInfo: {
        ktpName: 'Ahmad Hidayat',
        ktpNumber: '3578041234567890',
        ktpPhoto: 'https://example.com/ktp/ahmad.jpg',
      },
      bankInfo: {
        bankName: 'Bank BCA',
        accountNumber: '1234567890',
        accountHolder: 'Ahmad Hidayat',
      },
      submittedDate: '2024-06-10',
      status: 'pending',
    },
    {
      id: 2,
      affiliate: {
        id: 5,
        name: 'Budi Santoso',
        email: 'budi.s@email.com',
        phone: '+62 823-7890-1234',
      },
      ktpInfo: {
        ktpName: 'Budi Santoso',
        ktpNumber: '3578041234567891',
        ktpPhoto: 'https://example.com/ktp/budi.jpg',
      },
      bankInfo: {
        bankName: 'Bank Mandiri',
        accountNumber: '9876543210',
        accountHolder: 'Budi Santoso',
      },
      submittedDate: '2024-06-09',
      status: 'pending',
    },
    {
      id: 3,
      affiliate: {
        id: 4,
        name: 'Dewi Lestari',
        email: 'dewi.l@email.com',
        phone: '+62 822-6789-0123',
      },
      ktpInfo: {
        ktpName: 'Dewi Lestari',
        ktpNumber: '3578041234567892',
        ktpPhoto: 'https://example.com/ktp/dewi.jpg',
      },
      bankInfo: {
        bankName: 'Bank BRI',
        accountNumber: '5555666677',
        accountHolder: 'Dewi Lestari',
      },
      submittedDate: '2024-05-15',
      status: 'approved',
      reviewedDate: '2024-05-16',
    },
  ]);

  const handleApprove = () => {
    if (selectedVerification) {
      setVerifications(
        verifications.map((v) =>
          v.id === selectedVerification.id
            ? {
                ...v,
                status: 'approved',
                reviewedDate: new Date().toISOString().split('T')[0],
              }
            : v
        )
      );
      alert(`Bank details for ${selectedVerification.affiliate.name} have been approved!`);
      setShowModal(false);
    }
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert('Please enter a rejection reason');
      return;
    }

    if (selectedVerification) {
      setVerifications(
        verifications.map((v) =>
          v.id === selectedVerification.id
            ? {
                ...v,
                status: 'rejected',
                reviewedDate: new Date().toISOString().split('T')[0],
                notes: rejectReason,
              }
            : v
        )
      );
      alert(`Bank details for ${selectedVerification.affiliate.name} have been rejected.`);
      setShowModal(false);
      setRejectReason('');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredVerifications = verifications.filter((verification) => {
    const matchesStatus = selectedStatus === 'all' || verification.status === selectedStatus;
    const matchesSearch =
      verification.affiliate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      verification.affiliate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      verification.id.toString().includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: verifications.length,
    pending: verifications.filter((v) => v.status === 'pending').length,
    approved: verifications.filter((v) => v.status === 'approved').length,
    rejected: verifications.filter((v) => v.status === 'rejected').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <MaterialIcon icon="schedule" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-sm text-gray-500">Pending Verification</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <MaterialIcon icon="check_circle" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              <p className="text-sm text-gray-500">Approved</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <MaterialIcon icon="cancel" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
              <p className="text-sm text-gray-500">Rejected</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <MaterialIcon icon="badge" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Total Submissions</p>
            </div>
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
              placeholder="Search by affiliate name, email, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'approved', 'rejected'].map((status) => (
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

      {/* Verifications Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Affiliate
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Bank Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  KTP Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Submitted
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
              {filteredVerifications.map((verification) => (
                <tr key={verification.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-semibold text-gray-900">#{verification.id.toString().padStart(4, '0')}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{verification.affiliate.name}</p>
                      <p className="text-sm text-gray-500">{verification.affiliate.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{verification.bankInfo.bankName}</p>
                      <p className="text-sm text-gray-500">{verification.bankInfo.accountNumber}</p>
                      <p className="text-xs text-gray-400">{verification.bankInfo.accountHolder}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">{verification.ktpInfo.ktpName}</p>
                    <p className="text-xs text-gray-400">{verification.ktpInfo.ktpNumber}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{verification.submittedDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(
                        verification.status
                      )}`}
                    >
                      {verification.status.charAt(0).toUpperCase() + verification.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedVerification(verification);
                          setShowModal(true);
                        }}
                        className="size-8 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 flex items-center justify-center transition-colors"
                        title="View & Verify"
                      >
                        <MaterialIcon icon="visibility" className="text-[18px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification Modal */}
      {showModal && selectedVerification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Bank & KTP Verification</h3>
                <p className="text-sm text-gray-500">Request #{selectedVerification.id.toString().padStart(4, '0')}</p>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
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
                    selectedVerification.status
                  )}`}
                >
                  {selectedVerification.status.charAt(0).toUpperCase() + selectedVerification.status.slice(1)}
                </span>
                <span className="text-sm text-gray-500">Submitted on {selectedVerification.submittedDate}</span>
              </div>

              {/* Verification Alert */}
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <MaterialIcon icon="warning" className="text-yellow-600 text-xl mt-0.5" />
                  <div>
                    <h4 className="font-bold text-yellow-900 mb-1">CRITICAL: Identity Verification Required</h4>
                    <p className="text-sm text-yellow-800">
                      Verify that the <strong>Account Holder Name</strong> matches the <strong>KTP Name</strong> exactly.
                      If they don't match, REJECT this request immediately.
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
                  <p className="text-2xl font-bold text-blue-900">{selectedVerification.bankInfo.accountHolder}</p>
                  <p className="text-xs text-blue-700 mt-1">From Bank Details</p>
                </div>
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                    <MaterialIcon icon="badge" className="text-xl" />
                    KTP Registered Name
                  </h4>
                  <p className="text-2xl font-bold text-green-900">{selectedVerification.ktpInfo.ktpName}</p>
                  <p className="text-xs text-green-700 mt-1">From KTP Verification</p>
                </div>
              </div>

              {/* Match Status */}
              {selectedVerification.bankInfo.accountHolder.toLowerCase() === selectedVerification.ktpInfo.ktpName.toLowerCase() ? (
                <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-green-600 flex items-center justify-center text-white">
                      <MaterialIcon icon="check" className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-900">✓ NAMES MATCH - Safe to Approve</h4>
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
                      <p className="text-sm text-red-800">The names don't match. This affiliate is using someone else's account.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Affiliate Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-3">Affiliate Information</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Name</p>
                    <p className="text-sm text-gray-900">{selectedVerification.affiliate.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Email</p>
                    <p className="text-sm text-gray-900">{selectedVerification.affiliate.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Phone</p>
                    <p className="text-sm text-gray-900">{selectedVerification.affiliate.phone}</p>
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-3">Bank Details Submitted</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Bank Name</p>
                    <p className="text-sm text-gray-900">{selectedVerification.bankInfo.bankName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Account Number</p>
                    <p className="text-lg font-bold text-gray-900">{selectedVerification.bankInfo.accountNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Account Holder Name</p>
                    <p className="text-sm text-gray-900">{selectedVerification.bankInfo.accountHolder}</p>
                  </div>
                </div>
              </div>

              {/* KTP Information */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-3">KTP Photo (Identity Card)</h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">KTP Name</p>
                    <p className="text-sm font-bold text-gray-900">{selectedVerification.ktpInfo.ktpName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">KTP Number</p>
                    <p className="text-sm font-mono text-gray-900">{selectedVerification.ktpInfo.ktpNumber}</p>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                  <MaterialIcon icon="photo_camera" className="text-6xl text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">KTP photo would be displayed here</p>
                  <p className="text-xs text-gray-400 mt-1 break-all">URL: {selectedVerification.ktpInfo.ktpPhoto}</p>
                </div>
              </div>

              {/* Action Section (only for pending) */}
              {selectedVerification.status === 'pending' && (
                <div className="border-t border-gray-200 pt-6 space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">Verify Bank & KTP</h4>
                    <button
                      onClick={handleApprove}
                      className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <MaterialIcon icon="check_circle" />
                      Approve Bank & KTP Verification
                    </button>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-bold text-red-600 mb-4">Reject Verification</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Rejection Reason
                        </label>
                        <textarea
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          placeholder="Enter reason for rejection (e.g., Names don't match, Invalid KTP, etc.)..."
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <button
                        onClick={handleReject}
                        className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <MaterialIcon icon="cancel" />
                        Reject Verification
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Show review info if already processed */}
              {selectedVerification.status !== 'pending' && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3">Review Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Reviewed Date</p>
                      <p className="text-sm text-gray-900">{selectedVerification.reviewedDate}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Status</p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(
                          selectedVerification.status
                        )}`}
                      >
                        {selectedVerification.status.charAt(0).toUpperCase() + selectedVerification.status.slice(1)}
                      </span>
                    </div>
                    {selectedVerification.notes && (
                      <div className="col-span-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Notes</p>
                        <p className="text-sm text-gray-900">{selectedVerification.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
