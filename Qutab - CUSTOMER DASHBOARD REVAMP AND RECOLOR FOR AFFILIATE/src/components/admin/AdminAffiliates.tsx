import { useState } from 'react';
import MaterialIcon from '../MaterialIcon';

interface Affiliate {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  joinedDate: string;
  totalReferrals: number;
  totalCommission: number;
  commissionPaid: number;
  // KTP & Bank Information
  ktpName: string;
  ktpNumber: string;
  ktpPhoto: string;
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
  // Registration data
  city?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  facebook?: string;
  primaryPlatform?: string;
  reason?: string;
}

export default function AdminAffiliates() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
  const [balanceAmount, setBalanceAmount] = useState('');

  const affiliates: Affiliate[] = [
    {
      id: 1,
      name: 'Muhammad Faisal',
      email: 'faisal@email.com',
      phone: '+62 812-3456-7890',
      status: 'pending',
      joinedDate: '2024-06-10',
      totalReferrals: 0,
      totalCommission: 0,
      commissionPaid: 0,
      ktpName: 'Muhammad Faisal',
      ktpNumber: '1234567890123456',
      ktpPhoto: 'https://example.com/faisal_ktp.jpg',
      city: 'Jakarta',
      instagram: 'https://instagram.com/faisal',
      tiktok: 'https://tiktok.com/@faisal',
      youtube: '',
      facebook: '',
      primaryPlatform: 'Instagram',
      reason: 'Saya ingin membantu menyebarkan kebaikan qurban dan mendapatkan penghasilan tambahan sebagai affiliator. Saya memiliki followers yang cukup banyak di Instagram dan yakin bisa membantu program ini.',
    },
    {
      id: 2,
      name: 'Rina Kusuma',
      email: 'rina.k@email.com',
      phone: '+62 813-4567-8901',
      status: 'pending',
      joinedDate: '2024-06-09',
      totalReferrals: 0,
      totalCommission: 0,
      commissionPaid: 0,
      ktpName: 'Rina Kusuma',
      ktpNumber: '1234567890123457',
      ktpPhoto: 'https://example.com/rina_ktp.jpg',
      city: 'Bandung',
      instagram: '',
      tiktok: 'https://tiktok.com/@rinakusuma',
      youtube: 'https://youtube.com/@rinakusuma',
      facebook: '',
      primaryPlatform: 'TikTok',
      reason: 'Saya memiliki komunitas TikTok yang aktif dan tertarik dengan program kebaikan. Ingin mengajak followers saya untuk berpartisipasi dalam program qurban.',
    },
    {
      id: 3,
      name: 'Ahmad Hidayat',
      email: 'ahmad.h@email.com',
      phone: '+62 821-5678-9012',
      status: 'approved',
      joinedDate: '2024-05-15',
      totalReferrals: 12,
      totalCommission: 3600000,
      commissionPaid: 2400000,
      ktpName: 'Ahmad Hidayat',
      ktpNumber: '1234567890123458',
      ktpPhoto: 'https://example.com/ahmad_ktp.jpg',
      city: 'Surabaya',
      instagram: 'https://instagram.com/ahmadh',
      primaryPlatform: 'Instagram',
    },
    {
      id: 4,
      name: 'Dewi Lestari',
      email: 'dewi.l@email.com',
      phone: '+62 822-6789-0123',
      status: 'approved',
      joinedDate: '2024-05-10',
      totalReferrals: 8,
      totalCommission: 2400000,
      commissionPaid: 2400000,
      ktpName: 'Dewi Lestari',
      ktpNumber: '1234567890123459',
      ktpPhoto: 'https://example.com/dewi_ktp.jpg',
      city: 'Yogyakarta',
      facebook: 'https://facebook.com/dewilestari',
      primaryPlatform: 'Facebook',
    },
    {
      id: 5,
      name: 'Budi Santoso',
      email: 'budi.s@email.com',
      phone: '+62 823-7890-1234',
      status: 'approved',
      joinedDate: '2024-04-20',
      totalReferrals: 25,
      totalCommission: 7500000,
      commissionPaid: 5000000,
      ktpName: 'Budi Santoso',
      ktpNumber: '1234567890123460',
      ktpPhoto: 'https://example.com/budi_ktp.jpg',
      city: 'Semarang',
      primaryPlatform: 'WhatsApp Group',
    },
    {
      id: 6,
      name: 'Siti Nurhaliza',
      email: 'siti.n@email.com',
      phone: '+62 824-8901-2345',
      status: 'rejected',
      joinedDate: '2024-06-08',
      totalReferrals: 0,
      totalCommission: 0,
      commissionPaid: 0,
      ktpName: 'Siti Nurhaliza',
      ktpNumber: '1234567890123461',
      ktpPhoto: 'https://example.com/siti_ktp.jpg',
      city: 'Medan',
      reason: 'Ingin mencoba program affiliate.',
    },
  ];

  const handleApprove = (affiliate: Affiliate) => {
    console.log('Approving affiliate:', affiliate);
    alert(`Affiliate ${affiliate.name} has been approved!`);
    setShowModal(false);
  };

  const handleReject = (affiliate: Affiliate) => {
    console.log('Rejecting affiliate:', affiliate);
    if (confirm(`Are you sure you want to reject ${affiliate.name}?`)) {
      alert(`Affiliate ${affiliate.name} has been rejected.`);
      setShowModal(false);
    }
  };

  const handleAddBalance = () => {
    const amount = parseFloat(balanceAmount);
    if (!balanceAmount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (selectedAffiliate) {
      alert(`Successfully added Rp ${amount.toLocaleString('id-ID')} to ${selectedAffiliate.name}'s balance!`);
      setShowAddBalanceModal(false);
      setBalanceAmount('');
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

  const filteredAffiliates = affiliates.filter((affiliate) => {
    const matchesStatus = selectedStatus === 'all' || affiliate.status === selectedStatus;
    const matchesSearch =
      affiliate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      affiliate.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: affiliates.length,
    approved: affiliates.filter((a) => a.status === 'approved').length,
    pending: affiliates.filter((a) => a.status === 'pending').length,
    rejected: affiliates.filter((a) => a.status === 'rejected').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <MaterialIcon icon="groups" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Total Affiliates</p>
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
            <div className="size-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <MaterialIcon icon="cancel" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
              <p className="text-sm text-gray-500">Rejected</p>
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
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
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
              onClick={() => setSelectedStatus('approved')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                selectedStatus === 'approved'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Approved ({stats.approved})
            </button>
            <button
              onClick={() => setSelectedStatus('rejected')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                selectedStatus === 'rejected'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Rejected ({stats.rejected})
            </button>
          </div>
        </div>
      </div>

      {/* Affiliates Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Affiliate
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Referrals
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
              {filteredAffiliates.map((affiliate) => (
                <tr key={affiliate.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                        {affiliate.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{affiliate.name}</p>
                        <p className="text-sm text-gray-500">ID: #{affiliate.id.toString().padStart(4, '0')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{affiliate.email}</p>
                    <p className="text-sm text-gray-500">{affiliate.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{affiliate.joinedDate}</td>
                  <td className="px-6 py-4">
                    <p className="text-lg font-bold text-gray-900">{affiliate.totalReferrals}</p>
                    <p className="text-xs text-gray-500">leads</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">
                      Rp {affiliate.totalCommission.toLocaleString('id-ID')}
                    </p>
                    <p className="text-xs text-gray-500">
                      Paid: Rp {affiliate.commissionPaid.toLocaleString('id-ID')}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(
                        affiliate.status
                      )}`}
                    >
                      {affiliate.status.charAt(0).toUpperCase() + affiliate.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedAffiliate(affiliate);
                          setShowModal(true);
                        }}
                        className="size-8 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 flex items-center justify-center transition-colors"
                        title="View Details"
                      >
                        <MaterialIcon icon="visibility" className="text-[18px]" />
                      </button>
                      {affiliate.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(affiliate)}
                            className="size-8 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 flex items-center justify-center transition-colors"
                            title="Approve"
                          >
                            <MaterialIcon icon="check" className="text-[18px]" />
                          </button>
                          <button
                            onClick={() => handleReject(affiliate)}
                            className="size-8 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors"
                            title="Reject"
                          >
                            <MaterialIcon icon="close" className="text-[18px]" />
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

      {/* Modal */}
      {showModal && selectedAffiliate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Affiliate Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="size-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600"
              >
                <MaterialIcon icon="close" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl">
                  {selectedAffiliate.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{selectedAffiliate.name}</h4>
                  <p className="text-sm text-gray-500">ID: #{selectedAffiliate.id.toString().padStart(4, '0')}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Email</p>
                  <p className="text-sm text-gray-900">{selectedAffiliate.email}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Phone</p>
                  <p className="text-sm text-gray-900">{selectedAffiliate.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Joined Date</p>
                  <p className="text-sm text-gray-900">{selectedAffiliate.joinedDate}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Status</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(
                      selectedAffiliate.status
                    )}`}
                  >
                    {selectedAffiliate.status.charAt(0).toUpperCase() + selectedAffiliate.status.slice(1)}
                  </span>
                </div>
                {selectedAffiliate.city && (
                  <div className="col-span-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">City</p>
                    <p className="text-sm text-gray-900">{selectedAffiliate.city}</p>
                  </div>
                )}
              </div>

              {/* KTP Information Section */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <MaterialIcon icon="badge" className="text-blue-600 text-xl" />
                  <h5 className="font-bold text-gray-900">KTP Information (Identity Card)</h5>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">KTP Name</p>
                    <p className="text-sm font-bold text-gray-900">{selectedAffiliate.ktpName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">KTP Number</p>
                    <p className="text-sm font-mono text-gray-900">{selectedAffiliate.ktpNumber}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">KTP Photo</p>
                  <div className="bg-white rounded-lg p-6 text-center border-2 border-dashed border-blue-300">
                    <MaterialIcon icon="photo_camera" className="text-5xl text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">KTP photo would be displayed here</p>
                    <p className="text-xs text-gray-400 mt-1 break-all">URL: {selectedAffiliate.ktpPhoto}</p>
                  </div>
                </div>
              </div>

              {/* Show registration data for pending affiliates */}
              {selectedAffiliate.status === 'pending' && (
                <>
                  {/* Social Media Links */}
                  {(selectedAffiliate.instagram || selectedAffiliate.tiktok || selectedAffiliate.youtube || selectedAffiliate.facebook) && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-bold text-gray-900 mb-3">Social Media</h5>
                      <div className="space-y-2">
                        {selectedAffiliate.instagram && (
                          <div className="flex items-center gap-2">
                            <MaterialIcon icon="link" className="text-gray-400 text-sm" />
                            <span className="text-xs font-semibold text-gray-500 w-20">Instagram:</span>
                            <a href={selectedAffiliate.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline truncate">
                              {selectedAffiliate.instagram}
                            </a>
                          </div>
                        )}
                        {selectedAffiliate.tiktok && (
                          <div className="flex items-center gap-2">
                            <MaterialIcon icon="link" className="text-gray-400 text-sm" />
                            <span className="text-xs font-semibold text-gray-500 w-20">TikTok:</span>
                            <a href={selectedAffiliate.tiktok} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline truncate">
                              {selectedAffiliate.tiktok}
                            </a>
                          </div>
                        )}
                        {selectedAffiliate.youtube && (
                          <div className="flex items-center gap-2">
                            <MaterialIcon icon="link" className="text-gray-400 text-sm" />
                            <span className="text-xs font-semibold text-gray-500 w-20">YouTube:</span>
                            <a href={selectedAffiliate.youtube} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline truncate">
                              {selectedAffiliate.youtube}
                            </a>
                          </div>
                        )}
                        {selectedAffiliate.facebook && (
                          <div className="flex items-center gap-2">
                            <MaterialIcon icon="link" className="text-gray-400 text-sm" />
                            <span className="text-xs font-semibold text-gray-500 w-20">Facebook:</span>
                            <a href={selectedAffiliate.facebook} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline truncate">
                              {selectedAffiliate.facebook}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Primary Platform */}
                  {selectedAffiliate.primaryPlatform && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h5 className="font-bold text-gray-900 mb-2">Primary Promotion Platform</h5>
                      <p className="text-sm text-gray-900">{selectedAffiliate.primaryPlatform}</p>
                    </div>
                  )}

                  {/* Reason */}
                  {selectedAffiliate.reason && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <h5 className="font-bold text-gray-900 mb-2">Reason for Joining</h5>
                      <p className="text-sm text-gray-700 leading-relaxed">{selectedAffiliate.reason}</p>
                    </div>
                  )}
                </>
              )}

              {/* Show performance stats for approved affiliates */}
              {selectedAffiliate.status === 'approved' && (
                <>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Total Referrals</p>
                      <p className="text-2xl font-bold text-blue-600">{selectedAffiliate.totalReferrals}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Total Commission</p>
                      <p className="text-lg font-bold text-green-600">
                        Rp {(selectedAffiliate.totalCommission / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Commission Paid</p>
                      <p className="text-lg font-bold text-purple-600">
                        Rp {(selectedAffiliate.commissionPaid / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  </div>

                  {/* Add Balance Button */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-gray-900 mb-1">Manual Balance Adjustment</h5>
                        <p className="text-sm text-gray-600">Add commission manually to affiliate balance</p>
                      </div>
                      <button
                        onClick={() => setShowAddBalanceModal(true)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                      >
                        <MaterialIcon icon="add_circle" />
                        Add Balance
                      </button>
                    </div>
                  </div>
                </>
              )}

              {selectedAffiliate.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleApprove(selectedAffiliate)}
                    className="flex-1 h-11 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <MaterialIcon icon="check_circle" />
                    Approve Affiliate
                  </button>
                  <button
                    onClick={() => handleReject(selectedAffiliate)}
                    className="flex-1 h-11 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <MaterialIcon icon="cancel" />
                    Reject Application
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Balance Modal */}
      {showAddBalanceModal && selectedAffiliate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Add Balance to Affiliate</h3>
              <button
                onClick={() => setShowAddBalanceModal(false)}
                className="size-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600"
              >
                <MaterialIcon icon="close" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl">
                  {selectedAffiliate.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{selectedAffiliate.name}</h4>
                  <p className="text-sm text-gray-500">ID: #{selectedAffiliate.id.toString().padStart(4, '0')}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Email</p>
                  <p className="text-sm text-gray-900">{selectedAffiliate.email}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Phone</p>
                  <p className="text-sm text-gray-900">{selectedAffiliate.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Joined Date</p>
                  <p className="text-sm text-gray-900">{selectedAffiliate.joinedDate}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Status</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(
                      selectedAffiliate.status
                    )}`}
                  >
                    {selectedAffiliate.status.charAt(0).toUpperCase() + selectedAffiliate.status.slice(1)}
                  </span>
                </div>
                {selectedAffiliate.city && (
                  <div className="col-span-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">City</p>
                    <p className="text-sm text-gray-900">{selectedAffiliate.city}</p>
                  </div>
                )}
              </div>

              {/* Add Balance Form */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <MaterialIcon icon="add_circle" className="text-green-600 text-xl" />
                  <h5 className="font-bold text-gray-900">Add Balance</h5>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Amount (Rp)</p>
                    <input
                      type="text"
                      value={balanceAmount}
                      onChange={(e) => setBalanceAmount(e.target.value)}
                      className="w-full h-10 pl-4 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <button
                    onClick={handleAddBalance}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                  >
                    <MaterialIcon icon="add_circle" />
                    Add Balance
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}