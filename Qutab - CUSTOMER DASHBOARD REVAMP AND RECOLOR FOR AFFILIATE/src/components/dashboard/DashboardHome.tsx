import MaterialIcon from '../MaterialIcon';

export default function DashboardHome() {
  return (
    <div className="p-8 pb-20 bg-[#f8f9fc] dark:bg-[#2d1b24]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Welcome Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-[#4a2c3a] dark:text-white tracking-tight">
            Selamat datang kembali, Ahmad! 👋
          </h2>
          <p className="text-[#7d5a6a] dark:text-gray-400">
            Inilah ringkasan perjalanan Qurban Anda untuk tahun 2024
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 rounded-xl bg-[#ffafcc]/20 flex items-center justify-center">
                <MaterialIcon icon="shopping_bag" className="text-[#ffafcc] text-2xl" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase">Tahun Ini</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-[#4a2c3a] dark:text-white">3</span>
              <span className="text-sm text-[#7d5a6a] dark:text-gray-400">Total Qurban</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 rounded-xl bg-[#bdbef5]/20 flex items-center justify-center">
                <MaterialIcon icon="favorite" className="text-[#bdbef5] text-2xl filled" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase">Tersimpan</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-[#4a2c3a] dark:text-white">5</span>
              <span className="text-sm text-[#7d5a6a] dark:text-gray-400">Item Favorit</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 rounded-xl bg-[#ffc7dd]/20 flex items-center justify-center">
                <MaterialIcon icon="wallet" className="text-[#ffafcc] text-2xl" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase">Saldo</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-[#4a2c3a] dark:text-white">Rp 5.2M</span>
              <span className="text-sm text-[#7d5a6a] dark:text-gray-400">Dana Tersedia</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-[#ffafcc] to-[#ef9bb8] rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Siap untuk Qurban 2024?</h3>
          <p className="mb-6 text-white/90">
            Jelajahi katalog kami dan pilih hewan kurban Anda hari ini. Pemesanan awal mendapat prioritas dokumentasi.
          </p>
          <a
            href="/dashboard/catalogue"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-white text-[#ef9bb8] font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Lihat Katalog
            <MaterialIcon icon="arrow_forward" />
          </a>
        </div>
      </div>
    </div>
  );
}