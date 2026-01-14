import MaterialIcon from '../../MaterialIcon';

export default function AffiliateEarnings() {
  return (
    <div className="p-8 pb-20 bg-[#fffbef] dark:bg-[#2d1b24]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-[#4a2c3a] dark:text-white tracking-tight">
            Penghasilan & Pembayaran
          </h2>
          <p className="text-[#7d5a6a] dark:text-gray-400">
            Kelola komisi dan riwayat pembayaran Anda
          </p>
        </div>

        {/* Earnings Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Earnings */}
          <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 rounded-xl bg-[#ffafcc]/20 flex items-center justify-center">
                <MaterialIcon icon="account_balance_wallet" className="text-[#ffafcc] text-2xl filled" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase">Total</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-[#4a2c3a] dark:text-white">Rp 18.5M</span>
              <span className="text-sm text-[#7d5a6a] dark:text-gray-400">Total Penghasilan</span>
            </div>
          </div>

          {/* Available Balance */}
          <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 rounded-xl bg-[#bdbef5]/20 flex items-center justify-center">
                <MaterialIcon icon="payments" className="text-[#bdbef5] text-2xl filled" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase">Tersedia</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-[#4a2c3a] dark:text-white">Rp 2.8M</span>
              <span className="text-sm text-[#7d5a6a] dark:text-gray-400">Saldo Tersedia</span>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 rounded-xl bg-[#bddcee]/20 flex items-center justify-center">
                <MaterialIcon icon="schedule" className="text-[#bddcee] text-2xl" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase">Proses</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-[#4a2c3a] dark:text-white">Rp 750K</span>
              <span className="text-sm text-[#7d5a6a] dark:text-gray-400">Sedang Diproses</span>
            </div>
          </div>
        </div>

        {/* Withdraw Section */}
        <div className="bg-gradient-to-br from-[#bdbef5] to-[#9b9ef5] rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Tarik Penghasilan Anda</h3>
              <p className="text-white/90 mb-4">
                Saldo tersedia: <span className="font-bold">Rp 2.8M</span>
              </p>
              <p className="text-sm text-white/80 mb-6">
                Minimum penarikan Rp 500.000 | Diproses dalam 1-3 hari kerja
              </p>
              <button className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-white text-[#9b9ef5] font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                <MaterialIcon icon="account_balance" />
                Tarik Saldo
              </button>
            </div>
            <div className="hidden lg:flex size-32 rounded-full bg-white/10 items-center justify-center">
              <MaterialIcon icon="savings" className="text-6xl" />
            </div>
          </div>
        </div>

        {/* Commission Breakdown */}
        <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-bold text-[#4a2c3a] dark:text-white mb-6">Rincian Komisi Bulan Ini</h3>
          
          <div className="space-y-4">
            {/* Commission Item 1 */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#fffbef] dark:bg-[#2d1b24] border border-gray-100 dark:border-gray-800">
              <div className="size-12 rounded-lg bg-[#ffafcc]/20 flex items-center justify-center flex-shrink-0">
                <MaterialIcon icon="shopping_bag" className="text-[#ffafcc]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-[#4a2c3a] dark:text-white">Kambing Tipe A - Ahmad Fulan</p>
                  <span className="text-sm font-bold text-[#ffafcc]">+ Rp 100.000</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#7d5a6a] dark:text-gray-400">Order #QTB20240108001</p>
                  <span className="text-xs text-gray-400">2 jam lalu</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
                Selesai
              </span>
            </div>

            {/* Commission Item 2 */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#fffbef] dark:bg-[#2d1b24] border border-gray-100 dark:border-gray-800">
              <div className="size-12 rounded-lg bg-[#bddcee]/20 flex items-center justify-center flex-shrink-0">
                <MaterialIcon icon="shopping_bag" className="text-[#bddcee]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-[#4a2c3a] dark:text-white">Sapi Tipe B - Siti Aminah</p>
                  <span className="text-sm font-bold text-[#bddcee]">+ Rp 250.000</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#7d5a6a] dark:text-gray-400">Order #QTB20240107156</p>
                  <span className="text-xs text-gray-400">1 hari lalu</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
                Selesai
              </span>
            </div>

            {/* Commission Item 3 */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#fffbef] dark:bg-[#2d1b24] border border-gray-100 dark:border-gray-800">
              <div className="size-12 rounded-lg bg-[#ffafcc]/20 flex items-center justify-center flex-shrink-0">
                <MaterialIcon icon="shopping_bag" className="text-[#ffafcc]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-[#4a2c3a] dark:text-white">Domba Tipe A - Budi Santoso</p>
                  <span className="text-sm font-bold text-[#ffafcc]">+ Rp 120.000</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#7d5a6a] dark:text-gray-400">Order #QTB20240106892</p>
                  <span className="text-xs text-gray-400">2 hari lalu</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-xs font-semibold">
                Pending
              </span>
            </div>

            {/* Commission Item 4 */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#fffbef] dark:bg-[#2d1b24] border border-gray-100 dark:border-gray-800">
              <div className="size-12 rounded-lg bg-[#bdbef5]/20 flex items-center justify-center flex-shrink-0">
                <MaterialIcon icon="shopping_bag" className="text-[#bdbef5]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-[#4a2c3a] dark:text-white">Kambing Tipe B - Dewi Lestari</p>
                  <span className="text-sm font-bold text-[#bdbef5]">+ Rp 150.000</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#7d5a6a] dark:text-gray-400">Order #QTB20240105731</p>
                  <span className="text-xs text-gray-400">3 hari lalu</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
                Selesai
              </span>
            </div>
          </div>

          <button className="w-full mt-6 h-12 rounded-lg border-2 border-gray-200 dark:border-gray-700 text-[#7d5a6a] dark:text-gray-300 font-semibold hover:bg-[#e1e4ff] dark:hover:bg-gray-800 transition-colors">
            Lihat Semua Transaksi
          </button>
        </div>

        {/* Withdrawal History */}
        <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-bold text-[#4a2c3a] dark:text-white mb-6">Riwayat Penarikan</h3>
          
          <div className="space-y-4">
            {/* Withdrawal Item 1 */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#fffbef] dark:bg-[#2d1b24] border border-gray-100 dark:border-gray-800">
              <div className="size-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <MaterialIcon icon="check_circle" className="text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-[#4a2c3a] dark:text-white">Penarikan ke BCA - 1234567890</p>
                  <span className="text-sm font-bold text-[#4a2c3a] dark:text-white">Rp 5.000.000</span>
                </div>
                <p className="text-xs text-[#7d5a6a] dark:text-gray-400">15 Desember 2023</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
                Berhasil
              </span>
            </div>

            {/* Withdrawal Item 2 */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#fffbef] dark:bg-[#2d1b24] border border-gray-100 dark:border-gray-800">
              <div className="size-12 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                <MaterialIcon icon="pending" className="text-yellow-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-[#4a2c3a] dark:text-white">Penarikan ke BCA - 1234567890</p>
                  <span className="text-sm font-bold text-[#4a2c3a] dark:text-white">Rp 2.500.000</span>
                </div>
                <p className="text-xs text-[#7d5a6a] dark:text-gray-400">1 Januari 2024</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-xs font-semibold">
                Proses
              </span>
            </div>

            {/* Withdrawal Item 3 */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#fffbef] dark:bg-[#2d1b24] border border-gray-100 dark:border-gray-800">
              <div className="size-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <MaterialIcon icon="check_circle" className="text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-[#4a2c3a] dark:text-white">Penarikan ke BCA - 1234567890</p>
                  <span className="text-sm font-bold text-[#4a2c3a] dark:text-white">Rp 3.200.000</span>
                </div>
                <p className="text-xs text-[#7d5a6a] dark:text-gray-400">1 November 2023</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
                Berhasil
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
