import { useState } from 'react';
import MaterialIcon from '../../MaterialIcon';

export default function AffiliateReferrals() {
  const [statusFilter, setStatusFilter] = useState('all');

  // Helper function to mask email
  const maskEmail = (email: string) => {
    const [name, domain] = email.split('@');
    const maskedName = name.substring(0, 3) + '***';
    return `${maskedName}@${domain}`;
  };

  // Helper function to mask name
  const maskName = (name: string) => {
    const parts = name.split(' ');
    return parts.map((part, index) => {
      if (index === 0) return part; // Keep first name
      return part.substring(0, 2) + '***'; // Mask last name
    }).join(' ');
  };

  const leads = [
    {
      id: 1,
      name: 'Ahmad Fulan',
      email: 'ahmad.fulan@email.com',
      product: 'Paket Kambing Premium',
      date: '5 Jan 2026',
      value: 1500000,
      commission: 150000,
      status: 'Confirmed'
    },
    {
      id: 2,
      name: 'Siti Nurhaliza',
      email: 'siti.nur@email.com',
      product: 'Paket Kambing Standar',
      date: '4 Jan 2026',
      value: 1200000,
      commission: 120000,
      status: 'Pending'
    },
    {
      id: 3,
      name: 'Budi Santoso',
      email: 'budi.santoso@email.com',
      product: 'Paket Sapi 1/7',
      date: '3 Jan 2026',
      value: 2000000,
      commission: 200000,
      status: 'Paid'
    },
    {
      id: 4,
      name: 'Dewi Lestari',
      email: 'dewi.lestari@email.com',
      product: 'Paket Kambing Premium',
      date: '2 Jan 2026',
      value: 1500000,
      commission: 150000,
      status: 'Pending'
    },
    {
      id: 5,
      name: 'Eko Prasetyo',
      email: 'eko.prasetyo@email.com',
      product: 'Paket Sapi 1/7',
      date: '1 Jan 2026',
      value: 1800000,
      commission: 180000,
      status: 'Confirmed'
    }
  ];

  const filteredLeads = statusFilter === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === statusFilter);

  const totalLeads = leads.length;
  const confirmedLeads = leads.filter(lead => lead.status === 'Confirmed' || lead.status === 'Paid').length;

  return (
    <div className="p-8 pb-20 bg-white dark:bg-[#2d1b24]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#4a2c3a] dark:text-white mb-2">Referral Saya</h1>
        <p className="text-[#7d5a6a] dark:text-gray-400">Orang-orang yang daftar melalui link referral Anda</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#3d2531] border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="size-14 rounded-xl bg-[#e1e4ff] dark:bg-[#bdbef5]/20 flex items-center justify-center">
              <MaterialIcon icon="people" className="text-2xl text-[#bdbef5]" />
            </div>
          </div>
          <p className="text-sm text-[#7d5a6a] dark:text-gray-400 mb-1">Total Leads</p>
          <p className="text-3xl font-bold text-[#4a2c3a] dark:text-white">{totalLeads}</p>
        </div>

        <div className="bg-white dark:bg-[#3d2531] border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="size-14 rounded-xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
              <MaterialIcon icon="check_circle" className="text-2xl text-green-600 dark:text-green-500" />
            </div>
          </div>
          <p className="text-sm text-[#7d5a6a] dark:text-gray-400 mb-1">Confirmed & Paid</p>
          <p className="text-3xl font-bold text-[#4a2c3a] dark:text-white">{confirmedLeads}</p>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-[#e1e4ff] dark:bg-[#bdbef5]/10 border border-[#bdbef5] rounded-xl p-5 flex items-start gap-3">
        <div className="size-10 rounded-full bg-[#bdbef5]/20 flex items-center justify-center flex-shrink-0">
          <MaterialIcon icon="privacy_tip" className="text-[#bdbef5]" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#4a2c3a] dark:text-white mb-1">Perlindungan Privasi</p>
          <p className="text-xs text-[#7d5a6a] dark:text-gray-400">
            Nama dan email customer disamarkan untuk melindungi privasi mereka. Anda tetap dapat melihat performa dan komisi dari setiap referral.
          </p>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white dark:bg-[#3d2531] border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-lg bg-[#e1e4ff] dark:bg-[#bdbef5]/20 flex items-center justify-center">
                <MaterialIcon icon="list" className="text-2xl text-[#bdbef5]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#4a2c3a] dark:text-white">Daftar Referral</h2>
                <p className="text-sm text-[#7d5a6a] dark:text-gray-400 mt-1">
                  Riwayat customer dari link Anda
                </p>
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white dark:bg-[#2d1b24] border border-gray-200 dark:border-gray-700 text-sm text-[#4a2c3a] dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#bdbef5]/50"
            >
              <option value="all">Semua Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-bold text-[#7d5a6a] dark:text-gray-400">Nama</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-[#7d5a6a] dark:text-gray-400">Email</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-[#7d5a6a] dark:text-gray-400">Produk</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-[#7d5a6a] dark:text-gray-400">Tanggal</th>
                <th className="text-right py-3 px-4 text-sm font-bold text-[#7d5a6a] dark:text-gray-400">Nilai Order</th>
                <th className="text-right py-3 px-4 text-sm font-bold text-[#7d5a6a] dark:text-gray-400">Komisi</th>
                <th className="text-center py-3 px-4 text-sm font-bold text-[#7d5a6a] dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-[#e1e4ff]/30 dark:hover:bg-[#bdbef5]/5 transition-colors"
                >
                  <td className="py-4 px-4">
                    <p className="text-sm font-semibold text-[#4a2c3a] dark:text-white">{maskName(lead.name)}</p>
                  </td>
                  <td className="py-4 px-4 text-sm text-[#7d5a6a] dark:text-gray-400 font-mono text-xs">
                    {maskEmail(lead.email)}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#7d5a6a] dark:text-gray-400">{lead.product}</td>
                  <td className="py-4 px-4 text-sm text-[#7d5a6a] dark:text-gray-400">{lead.date}</td>
                  <td className="py-4 px-4 text-sm text-right font-semibold text-[#4a2c3a] dark:text-white">
                    Rp {lead.value.toLocaleString('id-ID')}
                  </td>
                  <td className="py-4 px-4 text-sm text-right font-bold text-[#bdbef5]">
                    Rp {lead.commission.toLocaleString('id-ID')}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                      lead.status === 'Paid'
                        ? 'bg-green-100 text-green-700'
                        : lead.status === 'Confirmed'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {lead.status}
                    </span>
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