import MaterialIcon from '../../MaterialIcon';

export default function AffiliateDashboardHome() {
  return (
    <div className="p-8 pb-20 bg-[#fffbef] dark:bg-[#2d1b24]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Welcome Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-[#4a2c3a] dark:text-white tracking-tight">
            Selamat datang, Siti! 👋
          </h2>
          <p className="text-[#7d5a6a] dark:text-gray-400">
            Berikut adalah ringkasan performa affiliasi Anda bulan ini
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 rounded-xl bg-[#bdbef5]/20 flex items-center justify-center">
                <MaterialIcon icon="visibility" className="text-[#bdbef5] text-2xl" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase">Bulan Ini</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-[#4a2c3a] dark:text-white">1,247</span>
              <span className="text-sm text-[#7d5a6a] dark:text-gray-400">Total Klik</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 rounded-xl bg-[#ffafcc]/20 flex items-center justify-center">
                <MaterialIcon icon="shopping_cart" className="text-[#ffafcc] text-2xl" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase">Konversi</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-[#4a2c3a] dark:text-white">28</span>
              <span className="text-sm text-[#7d5a6a] dark:text-gray-400">Penjualan</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 rounded-xl bg-[#bddcee]/20 flex items-center justify-center">
                <MaterialIcon icon="trending_up" className="text-[#bddcee] text-2xl" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase">Rate</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-[#4a2c3a] dark:text-white">2.24%</span>
              <span className="text-sm text-[#7d5a6a] dark:text-gray-400">Conversion Rate</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 rounded-xl bg-[#ffafcc]/20 flex items-center justify-center">
                <MaterialIcon icon="payments" className="text-[#ffafcc] text-2xl filled" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase">Bulan Ini</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-[#4a2c3a] dark:text-white">Rp 2.8M</span>
              <span className="text-sm text-[#7d5a6a] dark:text-gray-400">Total Komisi</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Banner */}
        <div className="bg-gradient-to-br from-[#bdbef5] to-[#9b9ef5] rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Tingkatkan Penghasilan Anda!</h3>
          <p className="mb-6 text-white/90">
            Bagikan link affiliasi Anda di media sosial dan dapatkan komisi untuk setiap penjualan yang berhasil.
          </p>
          <a
            href="/affiliate/dashboard/links"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-white text-[#9b9ef5] font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Dapatkan Link
            <MaterialIcon icon="arrow_forward" />
          </a>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#4a2c3a] dark:text-white">Aktivitas Terbaru</h3>
            <a href="#" className="text-sm font-semibold text-[#bdbef5] hover:text-[#9b9ef5] transition-colors">
              Lihat Semua
            </a>
          </div>

          <div className="space-y-4">
            {/* Activity Item */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#fffbef] dark:bg-[#2d1b24] border border-gray-100 dark:border-gray-800">
              <div className="size-10 rounded-full bg-[#bdbef5]/20 flex items-center justify-center flex-shrink-0">
                <MaterialIcon icon="shopping_bag" className="text-[#bdbef5]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#4a2c3a] dark:text-white">Penjualan Baru</p>
                <p className="text-xs text-[#7d5a6a] dark:text-gray-400">Ahmad membeli Kambing Tipe A - Rp 100.000 komisi</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">2 jam lalu</span>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#fffbef] dark:bg-[#2d1b24] border border-gray-100 dark:border-gray-800">
              <div className="size-10 rounded-full bg-[#ffafcc]/20 flex items-center justify-center flex-shrink-0">
                <MaterialIcon icon="payments" className="text-[#ffafcc]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#4a2c3a] dark:text-white">Pembayaran Diproses</p>
                <p className="text-xs text-[#7d5a6a] dark:text-gray-400">Komisi Rp 2.5M sedang diproses ke rekening Anda</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">1 hari lalu</span>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#fffbef] dark:bg-[#2d1b24] border border-gray-100 dark:border-gray-800">
              <div className="size-10 rounded-full bg-[#bddcee]/20 flex items-center justify-center flex-shrink-0">
                <MaterialIcon icon="trending_up" className="text-[#bddcee]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#4a2c3a] dark:text-white">Pencapaian Baru</p>
                <p className="text-xs text-[#7d5a6a] dark:text-gray-400">Selamat! Anda naik ke level Affiliator Pro</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">3 hari lalu</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
