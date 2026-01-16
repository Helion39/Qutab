import { useState } from 'react';
import MaterialIcon from '../MaterialIcon';

interface Referral {
  id: number;
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  affiliateId: number;
  affiliateName: string;
  referralDate: string;
  status: 'pending' | 'contacted' | 'confirmed' | 'paid' | 'cancelled';
  orderValue: number;
  commission: number;
  orderId?: string;
}

export default function AdminReferrals() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAffiliate, setSelectedAffiliate] = useState<string>('');

  const referrals: Referral[] = [
    {
      id: 1,
      leadName: 'Bambang Suryanto',
      leadEmail: 'bambang.s@email.com',
      leadPhone: '+62 811-2233-4455',
      affiliateId: 3,
      affiliateName: 'Ahmad Hidayat',
      referralDate: '2024-06-12',
      status: 'pending',
      orderValue: 0,
      commission: 0,
    },
    {
      id: 2,
      leadName: 'Rina Wijaya',
      leadEmail: 'rina.w@email.com',
      leadPhone: '+62 812-3344-5566',
      affiliateId: 3,
      affiliateName: 'Ahmad Hidayat',
      referralDate: '2024-06-10',
      status: 'confirmed',
      orderValue: 1500000,
      commission: 150000,
      orderId: 'QTB-2024-015',
    },
    {
      id: 3,
      leadName: 'Adi Nugroho',
      leadEmail: 'adi.n@email.com',
      leadPhone: '+62 813-4455-6677',
      affiliateId: 4,
      affiliateName: 'Dewi Lestari',
      referralDate: '2024-06-11',
      status: 'paid',
      orderValue: 2500000,
      commission: 250000,
      orderId: 'QTB-2024-016',
    },
    {
      id: 4,
      leadName: 'Sari Kusuma',
      leadEmail: 'sari.k@email.com',
      leadPhone: '+62 814-5566-7788',
      affiliateId: 5,
      affiliateName: 'Budi Santoso',
      referralDate: '2024-06-09',
      status: 'contacted',
      orderValue: 0,
      commission: 0,
    },
    {
      id: 5,
      leadName: 'Doni Pratama',
      leadEmail: 'doni.p@email.com',
      leadPhone: '+62 815-6677-8899',
      affiliateId: 5,
      affiliateName: 'Budi Santoso',
      referralDate: '2024-06-08',
      status: 'paid',
      orderValue: 1500000,
      commission: 150000,
      orderId: 'QTB-2024-013',
    },
    {
      id: 6,
      leadName: 'Lisa Amelia',
      leadEmail: 'lisa.a@email.com',
      leadPhone: '+62 816-7788-9900',
      affiliateId: 4,
      affiliateName: 'Dewi Lestari',
      referralDate: '2024-06-07',
      status: 'cancelled',
      orderValue: 0,
      commission: 0,
    },
  ];

  const affiliateList = [
    { id: 3, name: 'Ahmad Hidayat' },
    { id: 4, name: 'Dewi Lestari' },
    { id: 5, name: 'Budi Santoso' },
  ];

  const handleStatusChange = (referral: Referral, newStatus: string) => {
    console.log(`Changing referral ${referral.id} status to ${newStatus}`);
    alert(`Referral status updated to ${newStatus}`);
    setShowModal(false);
  };

  const handleReassign = () => {
    if (!selectedReferral || !selectedAffiliate) return;
    
    const affiliate = affiliateList.find(a => a.id.toString() === selectedAffiliate);
    alert(`Referral reassigned to ${affiliate?.name}`);
    setShowAssignModal(false);
    setSelectedReferral(null);
    setSelectedAffiliate('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'contacted':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredReferrals = referrals.filter((referral) => {
    const matchesStatus = selectedStatus === 'all' || referral.status === selectedStatus;
    const matchesSearch =
      referral.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      referral.leadEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      referral.affiliateName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: referrals.length,
    pending: referrals.filter((r) => r.status === 'pending').length,
    confirmed: referrals.filter((r) => r.status === 'confirmed').length,
    paid: referrals.filter((r) => r.status === 'paid').length,
    totalCommission: referrals.reduce((sum, r) => sum + r.commission, 0),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <MaterialIcon icon="link" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Total Leads</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <MaterialIcon icon="schedule" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <MaterialIcon icon="check_circle" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
              <p className="text-sm text-gray-500">Confirmed</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <MaterialIcon icon="payments" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.paid}</p>
              <p className="text-sm text-gray-500">Paid</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <MaterialIcon icon="account_balance_wallet" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {(stats.totalCommission / 1000000).toFixed(1)}M
              </p>
              <p className="text-sm text-gray-500">Commission</p>
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
              placeholder="Search by lead name, email, or affiliate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                selectedStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setSelectedStatus('pending')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                selectedStatus === 'pending'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending ({stats.pending})
            </button>
            <button
              onClick={() => setSelectedStatus('confirmed')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                selectedStatus === 'confirmed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Confirmed ({stats.confirmed})
            </button>
            <button
              onClick={() => setSelectedStatus('paid')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                selectedStatus === 'paid'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Paid ({stats.paid})
            </button>
          </div>
        </div>
      </div>

      {/* Referrals Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Lead
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Affiliate
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Referral Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order Value
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Commission
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
              {filteredReferrals.map((referral) => (
                <tr key={referral.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{referral.leadName}</p>
                      <p className="text-sm text-gray-500">{referral.leadEmail}</p>
                      <p className="text-sm text-gray-500">{referral.leadPhone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {referral.affiliateName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{referral.affiliateName}</p>
                        <p className="text-xs text-gray-500">ID: #{referral.affiliateId.toString().padStart(4, '0')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{referral.referralDate}</td>
                  <td className="px-6 py-4">
                    {referral.orderValue > 0 ? (
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Rp {referral.orderValue.toLocaleString('id-ID')}
                        </p>
                        {referral.orderId && (
                          <p className="text-xs text-gray-500">{referral.orderId}</p>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {referral.commission > 0 ? (
                      <p className="text-sm font-semibold text-green-600">
                        Rp {referral.commission.toLocaleString('id-ID')}
                      </p>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(
                        referral.status
                      )}`}
                    >
                      {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedReferral(referral);
                          setShowModal(true);
                        }}
                        className="size-8 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 flex items-center justify-center transition-colors"
                        title="View Details"
                      >
                        <MaterialIcon icon="visibility" className="text-[18px]" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedReferral(referral);
                          setShowAssignModal(true);
                        }}
                        className="size-8 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-600 flex items-center justify-center transition-colors"
                        title="Reassign Affiliate"
                      >
                        <MaterialIcon icon="swap_horiz" className="text-[18px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {showModal && selectedReferral && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Referral Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="size-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600"
              >
                <MaterialIcon icon="close" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Lead Info */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Lead Information</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Name:</span>
                    <span className="text-sm font-semibold text-gray-900">{selectedReferral.leadName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Email:</span>
                    <span className="text-sm font-semibold text-gray-900">{selectedReferral.leadEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Phone:</span>
                    <span className="text-sm font-semibold text-gray-900">{selectedReferral.leadPhone}</span>
                  </div>
                </div>
              </div>

              {/* Affiliate Info */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Referred By</h4>
                <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-3">
                  <div className="size-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                    {selectedReferral.affiliateName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{selectedReferral.affiliateName}</p>
                    <p className="text-sm text-gray-600">Affiliate ID: #{selectedReferral.affiliateId.toString().padStart(4, '0')}</p>
                  </div>
                </div>
              </div>

              {/* Referral Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Referral Date</p>
                  <p className="text-sm text-gray-900">{selectedReferral.referralDate}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Status</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(
                      selectedReferral.status
                    )}`}
                  >
                    {selectedReferral.status.charAt(0).toUpperCase() + selectedReferral.status.slice(1)}
                  </span>
                </div>
                {selectedReferral.orderId && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Order ID</p>
                    <p className="text-sm text-gray-900">{selectedReferral.orderId}</p>
                  </div>
                )}
                {selectedReferral.orderValue > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Order Value</p>
                    <p className="text-sm font-semibold text-gray-900">
                      Rp {selectedReferral.orderValue.toLocaleString('id-ID')}
                    </p>
                  </div>
                )}
              </div>

              {selectedReferral.commission > 0 && (
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Commission Earned</p>
                  <p className="text-2xl font-bold text-green-600">
                    Rp {selectedReferral.commission.toLocaleString('id-ID')}
                  </p>
                </div>
              )}

              {/* Status Actions */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-3">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {selectedReferral.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(selectedReferral, 'contacted')}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        Mark as Contacted
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedReferral, 'confirmed')}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        Mark as Confirmed
                      </button>
                    </>
                  )}
                  {selectedReferral.status === 'contacted' && (
                    <button
                      onClick={() => handleStatusChange(selectedReferral, 'confirmed')}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Mark as Confirmed
                    </button>
                  )}
                  {selectedReferral.status === 'confirmed' && (
                    <button
                      onClick={() => handleStatusChange(selectedReferral, 'paid')}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Mark as Paid
                    </button>
                  )}
                  {(selectedReferral.status === 'pending' || selectedReferral.status === 'contacted') && (
                    <button
                      onClick={() => handleStatusChange(selectedReferral, 'cancelled')}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reassign Modal */}
      {showAssignModal && selectedReferral && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Reassign Referral</h3>
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedAffiliate('');
                }}
                className="size-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600"
              >
                <MaterialIcon icon="close" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Current Affiliate:</p>
              <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2">
                <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  {selectedReferral.affiliateName.charAt(0)}
                </div>
                <p className="font-semibold text-gray-900">{selectedReferral.affiliateName}</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reassign to:
              </label>
              <select
                value={selectedAffiliate}
                onChange={(e) => setSelectedAffiliate(e.target.value)}
                className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select an affiliate</option>
                {affiliateList
                  .filter(a => a.id !== selectedReferral.affiliateId)
                  .map((affiliate) => (
                    <option key={affiliate.id} value={affiliate.id}>
                      {affiliate.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedAffiliate('');
                }}
                className="flex-1 h-10 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReassign}
                disabled={!selectedAffiliate}
                className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reassign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
