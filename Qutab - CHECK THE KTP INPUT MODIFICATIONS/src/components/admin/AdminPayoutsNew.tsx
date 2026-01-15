import { useState } from 'react';
import MaterialIcon from '../MaterialIcon';

interface Affiliate {
  id: number;
  name: string;
  email: string;
  phone: string;
  ktpName: string;
  ktpNumber: string;
  bankVerified: boolean;
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  balance: number;
  totalEarned: number;
}

interface PaymentHistory {
  id: number;
  affiliateId: number;
  affiliateName: string;
  amount: number;
  type: 'add_balance' | 'payout';
  transactionId?: string;
  date: string;
  notes?: string;
}

export default function AdminPayoutsNew() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(null);
  const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [balanceAmount, setBalanceAmount] = useState('');
  const [balanceNotes, setBalanceNotes] = useState('');
  const [payoutAmount, setPayoutAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const [affiliates, setAffiliates] = useState<Affiliate[]>([
    {
      id: 3,
      name: 'Ahmad Hidayat',
      email: 'ahmad.h@email.com',
      phone: '+62 821-5678-9012',
      ktpName: 'Ahmad Hidayat',
      ktpNumber: '3578041234567890',
      bankVerified: true,
      bankDetails: {
        bankName: 'Bank BCA',
        accountNumber: '1234567890',
        accountHolder: 'Ahmad Hidayat',
      },
      balance: 2500000,
      totalEarned: 5000000,
    },
    {
      id: 5,
      name: 'Budi Santoso',
      email: 'budi.s@email.com',
      phone: '+62 823-7890-1234',
      ktpName: 'Budi Santoso',
      ktpNumber: '3578041234567891',
      bankVerified: true,
      bankDetails: {
        bankName: 'Bank Mandiri',
        accountNumber: '9876543210',
        accountHolder: 'Budi Santoso',
      },
      balance: 3500000,
      totalEarned: 8000000,
    },
    {
      id: 4,
      name: 'Dewi Lestari',
      email: 'dewi.l@email.com',
      phone: '+62 822-6789-0123',
      ktpName: 'Dewi Lestari',
      ktpNumber: '3578041234567892',
      bankVerified: true,
      bankDetails: {
        bankName: 'Bank BRI',
        accountNumber: '5555666677',
        accountHolder: 'Dewi Lestari',
      },
      balance: 1200000,
      totalEarned: 3000000,
    },
  ]);

  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([
    {
      id: 1,
      affiliateId: 3,
      affiliateName: 'Ahmad Hidayat',
      amount: 1000000,
      type: 'add_balance',
      date: '2024-06-10',
      notes: 'Manual commission for offline referrals',
    },
    {
      id: 2,
      affiliateId: 5,
      affiliateName: 'Budi Santoso',
      amount: 2000000,
      type: 'payout',
      transactionId: 'TRX-2024-0609-001',
      date: '2024-06-09',
    },
  ]);

  const handleAddBalance = () => {
    const amount = parseFloat(balanceAmount);
    if (!balanceAmount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (!balanceNotes.trim()) {
      alert('Please enter notes/reason for adding balance');
      return;
    }

    if (selectedAffiliate) {
      // Update affiliate balance
      setAffiliates(
        affiliates.map((a) =>
          a.id === selectedAffiliate.id
            ? {
                ...a,
                balance: a.balance + amount,
                totalEarned: a.totalEarned + amount,
              }
            : a
        )
      );

      // Add to payment history
      setPaymentHistory([
        {
          id: paymentHistory.length + 1,
          affiliateId: selectedAffiliate.id,
          affiliateName: selectedAffiliate.name,
          amount: amount,
          type: 'add_balance',
          date: new Date().toISOString().split('T')[0],
          notes: balanceNotes,
        },
        ...paymentHistory,
      ]);

      alert(`Successfully added Rp ${amount.toLocaleString('id-ID')} to ${selectedAffiliate.name}'s balance!`);
      setShowAddBalanceModal(false);
      setBalanceAmount('');
      setBalanceNotes('');
    }
  };

  const handleProcessPayout = () => {
    const amount = parseFloat(payoutAmount);
    if (!payoutAmount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (!transactionId.trim()) {
      alert('Please enter transaction ID');
      return;
    }

    if (selectedAffiliate) {
      if (amount > selectedAffiliate.balance) {
        alert('Payout amount cannot exceed affiliate balance!');
        return;
      }

      // Update affiliate balance
      setAffiliates(
        affiliates.map((a) =>
          a.id === selectedAffiliate.id
            ? {
                ...a,
                balance: a.balance - amount,
              }
            : a
        )
      );

      // Add to payment history
      setPaymentHistory([
        {
          id: paymentHistory.length + 1,
          affiliateId: selectedAffiliate.id,
          affiliateName: selectedAffiliate.name,
          amount: amount,
          type: 'payout',
          transactionId: transactionId,
          date: new Date().toISOString().split('T')[0],
        },
        ...paymentHistory,
      ]);

      alert(`Successfully processed payout of Rp ${amount.toLocaleString('id-ID')} to ${selectedAffiliate.name}!`);
      setShowPayoutModal(false);
      setPayoutAmount('');
      setTransactionId('');
    }
  };

  const filteredAffiliates = affiliates.filter((affiliate) => {
    const matchesSearch =
      affiliate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      affiliate.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && affiliate.bankVerified;
  });

  const stats = {
    totalAffiliates: affiliates.filter((a) => a.bankVerified).length,
    totalBalance: affiliates.reduce((sum, a) => sum + a.balance, 0),
    totalPaid: affiliates.reduce((sum, a) => sum + a.totalEarned, 0),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Commission Payouts</h2>
          <p className="text-sm text-gray-500">Manually add commission balance and process payouts</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <MaterialIcon icon="people" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalAffiliates}</p>
              <p className="text-sm text-gray-500">Verified Affiliates</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <MaterialIcon icon="account_balance_wallet" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                Rp {(stats.totalBalance / 1000000).toFixed(1)}M
              </p>
              <p className="text-sm text-gray-500">Total Balance Available</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <MaterialIcon icon="payments" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                Rp {(stats.totalPaid / 1000000).toFixed(1)}M
              </p>
              <p className="text-sm text-gray-500">Total Commission Paid</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <MaterialIcon
              icon="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
            />
            <input
              type="text"
              placeholder="Search by affiliate name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Affiliates Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-bold text-gray-900">Bank-Verified Affiliates</h3>
          <p className="text-sm text-gray-500">Only affiliates with verified bank accounts are shown</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Affiliate
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Bank Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Current Balance
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Earned
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
                    <div>
                      <p className="font-semibold text-gray-900">{affiliate.name}</p>
                      <p className="text-sm text-gray-500">{affiliate.email}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <MaterialIcon icon="verified" className="text-green-600 text-[14px]" />
                        <span className="text-xs text-green-600 font-semibold">Bank Verified</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{affiliate.bankDetails.bankName}</p>
                      <p className="text-sm text-gray-500">{affiliate.bankDetails.accountNumber}</p>
                      <p className="text-xs text-gray-400">{affiliate.bankDetails.accountHolder}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-lg font-bold text-green-600">
                      Rp {affiliate.balance.toLocaleString('id-ID')}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">
                      Rp {affiliate.totalEarned.toLocaleString('id-ID')}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedAffiliate(affiliate);
                          setShowAddBalanceModal(true);
                        }}
                        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-1"
                        title="Add Balance"
                      >
                        <MaterialIcon icon="add_circle" className="text-[16px]" />
                        Add Balance
                      </button>
                      <button
                        onClick={() => {
                          setSelectedAffiliate(affiliate);
                          setShowPayoutModal(true);
                        }}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-1"
                        title="Process Payout"
                      >
                        <MaterialIcon icon="payments" className="text-[16px]" />
                        Pay Out
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-bold text-gray-900">Payment History</h3>
          <p className="text-sm text-gray-500">Recent balance additions and payouts</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Affiliate
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-700">{payment.date}</td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{payment.affiliateName}</p>
                  </td>
                  <td className="px-6 py-4">
                    {payment.type === 'add_balance' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                        <MaterialIcon icon="add_circle" className="text-[14px] mr-1" />
                        Balance Added
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                        <MaterialIcon icon="payments" className="text-[14px] mr-1" />
                        Payout
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className={`font-bold ${payment.type === 'add_balance' ? 'text-green-600' : 'text-blue-600'}`}>
                      {payment.type === 'add_balance' ? '+' : '-'}Rp {payment.amount.toLocaleString('id-ID')}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {payment.transactionId && (
                      <p className="text-xs font-mono text-gray-500">{payment.transactionId}</p>
                    )}
                    {payment.notes && (
                      <p className="text-xs text-gray-500">{payment.notes}</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Balance Modal */}
      {showAddBalanceModal && selectedAffiliate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Add Commission Balance</h3>
              <button
                onClick={() => {
                  setShowAddBalanceModal(false);
                  setBalanceAmount('');
                  setBalanceNotes('');
                }}
                className="size-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600"
              >
                <MaterialIcon icon="close" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Affiliate Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                    {selectedAffiliate.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{selectedAffiliate.name}</h4>
                    <p className="text-sm text-gray-500">{selectedAffiliate.email}</p>
                  </div>
                </div>
              </div>

              {/* Current Balance */}
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Current Balance</p>
                <p className="text-2xl font-bold text-blue-600">
                  Rp {selectedAffiliate.balance.toLocaleString('id-ID')}
                </p>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Commission Amount (Rp)
                </label>
                <input
                  type="number"
                  value={balanceAmount}
                  onChange={(e) => setBalanceAmount(e.target.value)}
                  placeholder="Enter amount (e.g., 500000)"
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Notes Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notes / Reason *
                </label>
                <textarea
                  value={balanceNotes}
                  onChange={(e) => setBalanceNotes(e.target.value)}
                  placeholder="Enter reason for adding balance (e.g., Manual commission for 3 offline referrals)"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowAddBalanceModal(false);
                    setBalanceAmount('');
                    setBalanceNotes('');
                  }}
                  className="flex-1 h-11 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddBalance}
                  className="flex-1 h-11 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <MaterialIcon icon="add_circle" />
                  Add Balance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Process Payout Modal */}
      {showPayoutModal && selectedAffiliate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Process Payout</h3>
              <button
                onClick={() => {
                  setShowPayoutModal(false);
                  setPayoutAmount('');
                  setTransactionId('');
                }}
                className="size-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600"
              >
                <MaterialIcon icon="close" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Affiliate Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                    {selectedAffiliate.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{selectedAffiliate.name}</h4>
                    <p className="text-sm text-gray-500">{selectedAffiliate.email}</p>
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-bold text-gray-900 mb-3">Bank Details</h5>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Bank Name</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedAffiliate.bankDetails.bankName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Account Number</p>
                    <p className="text-lg font-bold text-gray-900">{selectedAffiliate.bankDetails.accountNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Account Holder</p>
                    <p className="text-sm text-gray-900">{selectedAffiliate.bankDetails.accountHolder}</p>
                  </div>
                </div>
              </div>

              {/* Current Balance */}
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Available Balance</p>
                <p className="text-2xl font-bold text-green-600">
                  Rp {selectedAffiliate.balance.toLocaleString('id-ID')}
                </p>
              </div>

              {/* Payout Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Payout Amount (Rp) *
                </label>
                <input
                  type="number"
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  placeholder="Enter amount to pay out"
                  max={selectedAffiliate.balance}
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Maximum: Rp {selectedAffiliate.balance.toLocaleString('id-ID')}
                </p>
              </div>

              {/* Transaction ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Transaction ID / Proof *
                </label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter bank transaction ID after transfer"
                  className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Warning */}
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <MaterialIcon icon="warning" className="text-yellow-600 text-lg mt-0.5" />
                  <p className="text-sm text-yellow-800">
                    Make sure you've transferred the money to the affiliate's bank account before clicking "Process Payout".
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowPayoutModal(false);
                    setPayoutAmount('');
                    setTransactionId('');
                  }}
                  className="flex-1 h-11 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProcessPayout}
                  className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <MaterialIcon icon="check_circle" />
                  Process Payout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
