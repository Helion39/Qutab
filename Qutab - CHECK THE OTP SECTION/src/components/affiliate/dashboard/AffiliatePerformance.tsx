import MaterialIcon from '../../MaterialIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const clicksData = [
  { name: 'Sen', clicks: 120 },
  { name: 'Sel', clicks: 180 },
  { name: 'Rab', clicks: 150 },
  { name: 'Kam', clicks: 200 },
  { name: 'Jum', clicks: 220 },
  { name: 'Sab', clicks: 190 },
  { name: 'Min', clicks: 187 },
];

const salesData = [
  { name: 'Jan', sales: 12 },
  { name: 'Feb', sales: 19 },
  { name: 'Mar', sales: 15 },
  { name: 'Apr', sales: 22 },
  { name: 'Mei', sales: 28 },
  { name: 'Jun', sales: 24 },
];

export default function AffiliatePerformance() {
  return (
    <div className="p-8 pb-20 bg-[#fffbef] dark:bg-[#2d1b24]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-[#4a2c3a] dark:text-white tracking-tight">
            Performa Affiliasi
          </h2>
          <p className="text-[#7d5a6a] dark:text-gray-400">
            Analisis dan statistik lengkap dari aktivitas affiliasi Anda
          </p>
        </div>

        {/* Time Period Selector */}
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-[#bdbef5] text-white font-semibold text-sm">
            7 Hari
          </button>
          <button className="px-4 py-2 rounded-lg bg-white dark:bg-[#3d2531] border border-gray-200 dark:border-gray-700 text-[#7d5a6a] dark:text-gray-300 font-semibold text-sm hover:bg-[#e1e4ff] transition-colors">
            30 Hari
          </button>
          <button className="px-4 py-2 rounded-lg bg-white dark:bg-[#3d2531] border border-gray-200 dark:border-gray-700 text-[#7d5a6a] dark:text-gray-300 font-semibold text-sm hover:bg-[#e1e4ff] transition-colors">
            3 Bulan
          </button>
          <button className="px-4 py-2 rounded-lg bg-white dark:bg-[#3d2531] border border-gray-200 dark:border-gray-700 text-[#7d5a6a] dark:text-gray-300 font-semibold text-sm hover:bg-[#e1e4ff] transition-colors">
            Tahun Ini
          </button>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Clicks Chart */}
          <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#4a2c3a] dark:text-white">Klik Mingguan</h3>
                <p className="text-sm text-[#7d5a6a] dark:text-gray-400">Total klik 7 hari terakhir</p>
              </div>
              <div className="size-10 rounded-xl bg-[#bdbef5]/20 flex items-center justify-center">
                <MaterialIcon icon="mouse" className="text-[#bdbef5]" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={clicksData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#7d5a6a" style={{ fontSize: '12px' }} />
                <YAxis stroke="#7d5a6a" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="clicks" fill="#bdbef5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Sales Trend Chart */}
          <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#4a2c3a] dark:text-white">Tren Penjualan</h3>
                <p className="text-sm text-[#7d5a6a] dark:text-gray-400">Penjualan 6 bulan terakhir</p>
              </div>
              <div className="size-10 rounded-xl bg-[#ffafcc]/20 flex items-center justify-center">
                <MaterialIcon icon="trending_up" className="text-[#ffafcc]" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#7d5a6a" style={{ fontSize: '12px' }} />
                <YAxis stroke="#7d5a6a" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line type="monotone" dataKey="sales" stroke="#ffafcc" strokeWidth={3} dot={{ fill: '#ffafcc', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-bold text-[#4a2c3a] dark:text-white mb-6">Statistik Detail</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Top Performing Product */}
            <div className="p-4 rounded-xl bg-[#fffbef] dark:bg-[#2d1b24] border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-lg bg-[#ffafcc]/20 flex items-center justify-center">
                  <MaterialIcon icon="workspace_premium" className="text-[#ffafcc]" />
                </div>
                <div>
                  <p className="text-xs text-[#7d5a6a] dark:text-gray-400 uppercase font-semibold">Produk Terlaris</p>
                  <p className="text-lg font-bold text-[#4a2c3a] dark:text-white">Kambing Tipe A</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#7d5a6a] dark:text-gray-400">12 penjualan</span>
                <span className="text-sm font-bold text-[#ffafcc]">Rp 1.2M komisi</span>
              </div>
            </div>

            {/* Best Day */}
            <div className="p-4 rounded-xl bg-[#fffbef] dark:bg-[#2d1b24] border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-lg bg-[#bdbef5]/20 flex items-center justify-center">
                  <MaterialIcon icon="calendar_today" className="text-[#bdbef5]" />
                </div>
                <div>
                  <p className="text-xs text-[#7d5a6a] dark:text-gray-400 uppercase font-semibold">Hari Terbaik</p>
                  <p className="text-lg font-bold text-[#4a2c3a] dark:text-white">Jumat</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#7d5a6a] dark:text-gray-400">220 klik</span>
                <span className="text-sm font-bold text-[#bdbef5]">8 penjualan</span>
              </div>
            </div>

            {/* Average Order Value */}
            <div className="p-4 rounded-xl bg-[#fffbef] dark:bg-[#2d1b24] border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-lg bg-[#bddcee]/20 flex items-center justify-center">
                  <MaterialIcon icon="attach_money" className="text-[#bddcee]" />
                </div>
                <div>
                  <p className="text-xs text-[#7d5a6a] dark:text-gray-400 uppercase font-semibold">Rata-rata Nilai</p>
                  <p className="text-lg font-bold text-[#4a2c3a] dark:text-white">Rp 2.5M</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#7d5a6a] dark:text-gray-400">Per transaksi</span>
                <span className="text-sm font-bold text-[#bddcee]">Rp 100K komisi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-bold text-[#4a2c3a] dark:text-white mb-6">Sumber Traffic</h3>
          
          <div className="space-y-4">
            {/* Instagram */}
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white flex-shrink-0">
                <MaterialIcon icon="photo_camera" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-[#4a2c3a] dark:text-white">Instagram</span>
                  <span className="text-sm font-bold text-[#4a2c3a] dark:text-white">542 klik</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '43%' }}></div>
                </div>
              </div>
              <span className="text-sm text-[#7d5a6a] dark:text-gray-400 w-12 text-right">43%</span>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-[#25D366] flex items-center justify-center text-white flex-shrink-0">
                <MaterialIcon icon="chat" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-[#4a2c3a] dark:text-white">WhatsApp</span>
                  <span className="text-sm font-bold text-[#4a2c3a] dark:text-white">387 klik</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#25D366] rounded-full" style={{ width: '31%' }}></div>
                </div>
              </div>
              <span className="text-sm text-[#7d5a6a] dark:text-gray-400 w-12 text-right">31%</span>
            </div>

            {/* Facebook */}
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-[#1877F2] flex items-center justify-center text-white flex-shrink-0">
                <MaterialIcon icon="thumb_up" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-[#4a2c3a] dark:text-white">Facebook</span>
                  <span className="text-sm font-bold text-[#4a2c3a] dark:text-white">201 klik</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#1877F2] rounded-full" style={{ width: '16%' }}></div>
                </div>
              </div>
              <span className="text-sm text-[#7d5a6a] dark:text-gray-400 w-12 text-right">16%</span>
            </div>

            {/* Others */}
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-gray-400 flex items-center justify-center text-white flex-shrink-0">
                <MaterialIcon icon="more_horiz" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-[#4a2c3a] dark:text-white">Lainnya</span>
                  <span className="text-sm font-bold text-[#4a2c3a] dark:text-white">117 klik</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-400 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
              <span className="text-sm text-[#7d5a6a] dark:text-gray-400 w-12 text-right">10%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
