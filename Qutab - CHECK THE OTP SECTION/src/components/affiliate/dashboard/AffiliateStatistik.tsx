import { useState } from 'react';
import MaterialIcon from '../../MaterialIcon';

export default function AffiliateStatistik() {
  const [dateRange, setDateRange] = useState('30days');

  const stats = [
    {
      icon: 'group',
      label: 'LEADS',
      value: '2',
      change: '+0%',
      isPositive: true,
      description: 'Total Klik',
      color: 'blue'
    },
    {
      icon: 'shopping_cart',
      label: 'KONVERSI',
      value: '4',
      change: '+0%',
      isPositive: true,
      description: 'Signups Baru',
      color: 'purple'
    },
    {
      icon: 'trending_up',
      label: 'RATE',
      value: '0%',
      change: '0%',
      isPositive: true,
      description: 'Conversion Rate',
      color: 'green'
    },
    {
      icon: 'payments',
      label: 'TOTAL',
      value: 'Rp 0',
      change: '+0%',
      isPositive: true,
      description: 'Total Komisi',
      color: 'pink'
    }
  ];

  const monthlyData = [
    { month: 'Jan', clicks: 120, conversions: 10, commission: 280000 },
    { month: 'Feb', clicks: 150, conversions: 12, commission: 340000 },
    { month: 'Mar', clicks: 180, conversions: 15, commission: 425000 },
    { month: 'Apr', clicks: 210, conversions: 18, commission: 510000 },
    { month: 'Mei', clicks: 250, conversions: 20, commission: 565000 },
    { month: 'Jun', clicks: 335, conversions: 32, commission: 890000 }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      purple: 'bg-[#e1e4ff] dark:bg-[#bdbef5]/20 text-[#bdbef5]',
      green: 'bg-[#e1f5fe] dark:bg-[#99d6ff]/20 text-[#009688]',
      pink: 'bg-[#ffe1ed] dark:bg-[#ffafcc]/20 text-[#ffafcc]'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="p-8 pb-20 bg-[#fffbef] dark:bg-[#2d1b24]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#4a2c3a] dark:text-white mb-2">Statistik Performa</h1>
            <p className="text-[#7d5a6a] dark:text-gray-400">Pantau performa affiliate Anda</p>
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-white dark:bg-[#3d2531] border border-gray-200 dark:border-gray-700 text-sm text-[#4a2c3a] dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#bdbef5]/50"
          >
            <option value="today">Hari Ini</option>
            <option value="7days">7 Hari Terakhir</option>
            <option value="30days">30 Hari Terakhir</option>
            <option value="thismonth">Bulan Ini</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`size-14 rounded-xl flex items-center justify-center ${getColorClasses(stat.color)}`}>
                  <MaterialIcon icon={stat.icon} className="text-2xl" />
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  stat.isPositive
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-[#7d5a6a] dark:text-gray-400 mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-[#4a2c3a] dark:text-white mb-1">{stat.value}</p>
              <p className="text-xs text-[#7d5a6a] dark:text-gray-400">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Conversion Rate Card */}
        <div className="bg-gradient-to-br from-[#bdbef5] to-[#9b9ef5] rounded-2xl p-6 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Conversion Rate</p>
              <p className="text-4xl font-bold">6.98%</p>
              <p className="text-white/80 text-sm mt-2">
                87 konversi dari 1,245 klik
              </p>
            </div>
            <div className="size-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <MaterialIcon icon="trending_up" className="text-5xl" />
            </div>
          </div>
        </div>

        {/* Monthly Performance Chart */}
        <div className="bg-white dark:bg-[#3d2531] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-lg bg-[#e1e4ff] dark:bg-[#bdbef5]/20 flex items-center justify-center">
                <MaterialIcon icon="bar_chart" className="text-[#bdbef5] text-2xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#4a2c3a] dark:text-white">Grafik Performa Bulanan</h2>
                <p className="text-sm text-[#7d5a6a] dark:text-gray-400 mt-1">
                  Data 6 bulan terakhir
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-bold text-[#7d5a6a] dark:text-gray-400">Bulan</th>
                  <th className="text-right py-3 px-4 text-sm font-bold text-[#7d5a6a] dark:text-gray-400">Klik</th>
                  <th className="text-right py-3 px-4 text-sm font-bold text-[#7d5a6a] dark:text-gray-400">Konversi</th>
                  <th className="text-right py-3 px-4 text-sm font-bold text-[#7d5a6a] dark:text-gray-400">Rate</th>
                  <th className="text-right py-3 px-4 text-sm font-bold text-[#7d5a6a] dark:text-gray-400">Komisi</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((data, index) => {
                  const rate = ((data.conversions / data.clicks) * 100).toFixed(2);
                  return (
                    <tr
                      key={index}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-[#e1e4ff]/20 dark:hover:bg-[#bdbef5]/5 transition-colors"
                    >
                      <td className="py-4 px-4 text-sm font-semibold text-[#4a2c3a] dark:text-white">{data.month}</td>
                      <td className="py-4 px-4 text-sm text-right text-[#4a2c3a] dark:text-white">{data.clicks}</td>
                      <td className="py-4 px-4 text-sm text-right text-[#4a2c3a] dark:text-white">{data.conversions}</td>
                      <td className="py-4 px-4 text-sm text-right">
                        <span className="inline-flex px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold">
                          {rate}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-right font-bold text-[#bdbef5]">
                        Rp {data.commission.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Tips */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:bg-gradient-to-br dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-full bg-yellow-500 dark:bg-yellow-600 flex items-center justify-center flex-shrink-0">
              <MaterialIcon icon="tips_and_updates" className="text-2xl text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#4a2c3a] dark:text-white mb-3">
                Tips Meningkatkan Performa
              </h3>
              <ul className="space-y-2 text-sm text-[#7d5a6a] dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <MaterialIcon icon="arrow_forward" className="text-yellow-600 dark:text-yellow-500 text-[18px] mt-0.5 flex-shrink-0" />
                  <span>Fokus pada platform dengan conversion rate tertinggi</span>
                </li>
                <li className="flex items-start gap-2">
                  <MaterialIcon icon="arrow_forward" className="text-yellow-600 dark:text-yellow-500 text-[18px] mt-0.5 flex-shrink-0" />
                  <span>Buat konten engaging yang menjelaskan value proposition Qutab</span>
                </li>
                <li className="flex items-start gap-2">
                  <MaterialIcon icon="arrow_forward" className="text-yellow-600 dark:text-yellow-500 text-[18px] mt-0.5 flex-shrink-0" />
                  <span>Gunakan kupon diskon untuk meningkatkan daya tarik</span>
                </li>
                <li className="flex items-start gap-2">
                  <MaterialIcon icon="arrow_forward" className="text-yellow-600 dark:text-yellow-500 text-[18px] mt-0.5 flex-shrink-0" />
                  <span>Post secara konsisten menjelang Idul Adha untuk hasil maksimal</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
