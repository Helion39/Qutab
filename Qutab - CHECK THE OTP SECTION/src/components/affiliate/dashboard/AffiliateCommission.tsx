import { useState } from 'react';
import MaterialIcon from '../../MaterialIcon';

export default function AffiliateCommission() {
  const [requestAmount, setRequestAmount] = useState('');

  const availableBalance = 680000;
  const pendingCommission = 125000;
  const minimumPayout = 100000;

  const canRequestPayout = availableBalance >= minimumPayout;

  const payoutHistory = [
    {
      id: 1,
      date: '1 Jun 2026',
      period: 'Mei 2026',
      amount: 450000,
      status: 'Dibayar',
      method: 'Transfer Bank BCA',
      transactionId: 'TRX-20260601-001'
    },
    {
      id: 2,
      date: '1 Mei 2026',
      period: 'Apr 2026',
      amount: 380000,
      status: 'Dibayar',
      method: 'Transfer Bank BCA',
      transactionId: 'TRX-20260501-001'
    },
    {
      id: 3,
      date: '1 Apr 2026',
      period: 'Mar 2026',
      amount: 520000,
      status: 'Dibayar',
      method: 'Transfer Bank BCA',
      transactionId: 'TRX-20260401-001'
    },
    {
      id: 4,
      date: '8 Jan 2026',
      period: 'Des 2025',
      amount: 680000,
      status: 'Processing',
      method: 'Transfer Bank BCA',
      transactionId: 'TRX-20260108-001'
    }
  ];

  const totalPaid = payoutHistory
    .filter(p => p.status === 'Dibayar')
    .reduce((sum, p) => sum + p.amount, 0);

  const handleRequestPayout = () => {
    console.log('Request payout:', availableBalance);
  };

  return (
    <div className="p-8 pb-20 bg-[#fffbef] dark:bg-[#2d1b24]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#4a2c3a] dark:text-white mb-2">Komisi</h1>
        <p className="text-[#7d5a6a] dark:text-gray-400">Riwayat dan detail komisi yang Anda dapatkan</p>
      </div>

      {/* Balance & Request Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Balance */}
        <div className="bg-white dark:bg-[#3d2531] border border-gray-200 dark:border-gray-800 shadow-sm rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="size-14 rounded-xl bg-[#e1e4ff] dark:bg-[#bdbef5]/20 flex items-center justify-center">
              <MaterialIcon icon="account_balance_wallet" className="text-2xl text-[#bdbef5]" />
            </div>
          </div>
          <p className="text-sm text-[#7d5a6a] dark:text-gray-400 mb-1">Saldo Tersedia</p>
          <p className="text-3xl font-bold text-[#4a2c3a] dark:text-white">
            Rp {availableBalance.toLocaleString('id-ID')}
          </p>
          <p className="text-xs text-[#7d5a6a] dark:text-gray-400 mt-2">
            Siap untuk ditarik
          </p>
        </div>

        {/* Pending Commission */}
        <div className="bg-white dark:bg-[#3d2531] border border-gray-200 dark:border-gray-800 shadow-sm rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="size-14 rounded-xl bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center">
              <MaterialIcon icon="schedule" className="text-2xl text-yellow-600 dark:text-yellow-500" />
            </div>
          </div>
          <p className="text-sm text-[#7d5a6a] dark:text-gray-400 mb-1">Pending Komisi</p>
          <p className="text-3xl font-bold text-[#4a2c3a] dark:text-white">
            Rp {pendingCommission.toLocaleString('id-ID')}
          </p>
          <p className="text-xs text-[#7d5a6a] dark:text-gray-400 mt-2">
            Menunggu persetujuan
          </p>
        </div>

        {/* Total Paid */}
        <div className="bg-white dark:bg-[#3d2531] border border-gray-200 dark:border-gray-800 shadow-sm rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="size-14 rounded-xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
              <MaterialIcon icon="check_circle" className="text-2xl text-green-600 dark:text-green-500" />
            </div>
          </div>
          <p className="text-sm text-[#7d5a6a] dark:text-gray-400 mb-1">Total Diterima</p>
          <p className="text-3xl font-bold text-[#4a2c3a] dark:text-white">
            Rp {totalPaid.toLocaleString('id-ID')}
          </p>
          <p className="text-xs text-[#7d5a6a] dark:text-gray-400 mt-2">
            Semua waktu
          </p>
        </div>
      </div>

      {/* Request Payout Card */}
      <div className="bg-white dark:bg-[#3d2531] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#bdbef5] to-[#9b9ef5] p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <MaterialIcon icon="payments" className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Ajukan Penarikan</h2>
              <p className="text-white/80 text-sm">
                Minimum penarikan: Rp {minimumPayout.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#4a2c3a] dark:text-white mb-3">
                Jumlah Penarikan
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#7d5a6a]">Rp</span>
                <input
                  type="text"
                  value={availableBalance.toLocaleString('id-ID')}
                  disabled
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-[#2d1b24] border border-gray-200 dark:border-gray-700 text-sm text-[#4a2c3a] dark:text-white font-bold"
                />
              </div>
              <p className="text-xs text-[#7d5a6a] dark:text-gray-400 mt-2">
                Seluruh saldo tersedia akan ditarik
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#4a2c3a] dark:text-white mb-3 invisible">
                Placeholder
              </label>
              <button
                onClick={handleRequestPayout}
                disabled={!canRequestPayout}
                className={`w-full px-6 py-3 rounded-lg font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 ${
                  canRequestPayout
                    ? 'bg-[#bdbef5] hover:bg-[#9b9ef5] text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <MaterialIcon icon="send" className="text-[20px]" />
                {canRequestPayout ? 'Ajukan Penarikan' : 'Saldo Minimum Belum Tercapai'}
              </button>
              {!canRequestPayout && (
                <p className="text-xs text-red-500 mt-2 text-center">
                  Anda membutuhkan minimal Rp {(minimumPayout - availableBalance).toLocaleString('id-ID')} lagi
                </p>
              )}
            </div>
          </div>

          {/* Important Info */}
          <div className="mt-6 p-4 bg-[#e1e4ff] dark:bg-[#bdbef5]/10 border border-[#bdbef5] rounded-lg">
            <div className="flex items-start gap-3">
              <MaterialIcon icon="info" className="text-[#bdbef5] text-lg mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#4a2c3a] dark:text-white mb-2">Informasi Penting</p>
                <ul className="space-y-1 text-xs text-[#7d5a6a] dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <div className="size-1.5 rounded-full bg-[#7d5a6a] dark:bg-gray-400 mt-1.5 flex-shrink-0" />
                    <span>Pembayaran diproses setiap <strong className="text-[#4a2c3a] dark:text-white">tanggal 20-30 setiap bulan</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="size-1.5 rounded-full bg-[#7d5a6a] dark:bg-gray-400 mt-1.5 flex-shrink-0" />
                    <span>Komisi akan ditahan selama <strong className="text-[#4a2c3a] dark:text-white">30 hari</strong> untuk perlindungan refund</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="size-1.5 rounded-full bg-[#7d5a6a] dark:bg-gray-400 mt-1.5 flex-shrink-0" />
                    <span>Pastikan data rekening bank Anda sudah benar dan terverifikasi</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payout History Table */}
      <div className="bg-white dark:bg-[#3d2531] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <MaterialIcon icon="history" className="text-2xl text-[#bdbef5]" />
          <h3 className="text-lg font-bold text-[#4a2c3a] dark:text-white">Riwayat Pembayaran</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-bold text-[#7d5a6a] dark:text-gray-400">Tanggal</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-[#7d5a6a] dark:text-gray-400">Periode</th>
                <th className="text-right py-3 px-4 text-sm font-bold text-[#7d5a6a] dark:text-gray-400">Jumlah</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-[#7d5a6a] dark:text-gray-400">Metode</th>
                <th className="text-center py-3 px-4 text-sm font-bold text-[#7d5a6a] dark:text-gray-400">Status</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-[#7d5a6a] dark:text-gray-400">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {payoutHistory.map((payout) => (
                <tr
                  key={payout.id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-[#e1e4ff]/30 dark:hover:bg-[#bdbef5]/5 transition-colors"
                >
                  <td className="py-4 px-4 text-sm text-[#4a2c3a] dark:text-white">{payout.date}</td>
                  <td className="py-4 px-4 text-sm text-[#7d5a6a] dark:text-gray-400">{payout.period}</td>
                  <td className="py-4 px-4 text-sm text-right font-bold text-[#4a2c3a] dark:text-white">
                    Rp {payout.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#7d5a6a] dark:text-gray-400">{payout.method}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                      payout.status === 'Dibayar'
                        ? 'bg-green-100 text-green-700'
                        : payout.status === 'Processing'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {payout.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-xs text-[#7d5a6a] dark:text-gray-400 font-mono">
                    {payout.transactionId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
}