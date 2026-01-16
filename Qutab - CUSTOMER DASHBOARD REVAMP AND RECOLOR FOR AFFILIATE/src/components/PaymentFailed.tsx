import { useNavigate, useSearchParams } from 'react-router-dom';
import MaterialIcon from './MaterialIcon';
import { motion } from 'motion/react';

export default function PaymentFailed() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reason = searchParams.get('reason') || 'Transaksi dibatalkan atau gagal diproses';

  return (
    <div className="min-h-screen bg-[#fffbef] dark:bg-[#2d1b24] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-white dark:bg-[#3d2531] rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12"
        >
          {/* Failed Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="size-24 rounded-full bg-red-500 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <MaterialIcon icon="close" className="text-white text-[48px] filled" />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-[#4a2c3a] dark:text-white mb-3">
              Pembayaran Gagal
            </h1>
            <p className="text-lg text-[#7d5a6a] dark:text-gray-400">
              {reason}
            </p>
          </motion.div>

          {/* Error Details */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="size-12 bg-red-100 dark:bg-red-900/40 border-2 border-red-300 dark:border-red-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <MaterialIcon icon="info" className="text-red-500 text-[24px]" />
              </div>
              <div>
                <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">Kemungkinan Penyebab</h3>
                <ul className="space-y-2 text-sm text-red-600 dark:text-red-400/80">
                  <li className="flex items-start gap-2">
                    <MaterialIcon icon="radio_button_checked" className="text-[16px] mt-0.5 flex-shrink-0" />
                    <span>Pembayaran dibatalkan oleh pengguna</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MaterialIcon icon="radio_button_checked" className="text-[16px] mt-0.5 flex-shrink-0" />
                    <span>Saldo atau limit kartu tidak mencukupi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MaterialIcon icon="radio_button_checked" className="text-[16px] mt-0.5 flex-shrink-0" />
                    <span>Koneksi internet terputus saat proses pembayaran</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MaterialIcon icon="radio_button_checked" className="text-[16px] mt-0.5 flex-shrink-0" />
                    <span>Waktu pembayaran habis (timeout)</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* What to Do Next */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-[#dfdffa] dark:bg-[#bdbef5]/20 border-2 border-[#bdbef5] rounded-xl p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="size-12 bg-[#bdbef5] border-2 border-black rounded-lg flex items-center justify-center flex-shrink-0">
                <MaterialIcon icon="lightbulb" className="text-white text-[24px]" />
              </div>
              <div>
                <h3 className="font-bold text-[#4a2c3a] dark:text-white mb-2">Apa yang Harus Dilakukan?</h3>
                <ul className="space-y-2 text-sm text-[#7d5a6a] dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <MaterialIcon icon="arrow_forward" className="text-[#bdbef5] text-[18px] mt-0.5 flex-shrink-0" />
                    <span>Periksa saldo atau limit kartu/e-wallet Anda</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MaterialIcon icon="arrow_forward" className="text-[#bdbef5] text-[18px] mt-0.5 flex-shrink-0" />
                    <span>Pastikan koneksi internet stabil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MaterialIcon icon="arrow_forward" className="text-[#bdbef5] text-[18px] mt-0.5 flex-shrink-0" />
                    <span>Coba lagi dengan metode pembayaran yang berbeda</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <button
              onClick={() => navigate('/dashboard/checkout')}
              className="h-14 bg-[#ffafcc] hover:bg-[#ef9bb8] border-2 border-black text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              <MaterialIcon icon="replay" className="text-[20px]" />
              Coba Lagi
            </button>
            <button
              onClick={() => navigate('/dashboard/help')}
              className="h-14 bg-[#bdbef5] hover:bg-[#9fa0d5] border-2 border-black text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              <MaterialIcon icon="support_agent" className="text-[20px]" />
              Hubungi CS
            </button>
          </motion.div>

          {/* Alternative Actions */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <button
              onClick={() => navigate('/dashboard/cart')}
              className="h-12 bg-white dark:bg-[#2d1b24] hover:bg-[#fffbef] dark:hover:bg-[#3d2531] border-2 border-black text-[#4a2c3a] dark:text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              <MaterialIcon icon="shopping_cart" className="text-[18px]" />
              Kembali ke Keranjang
            </button>
            <button
              onClick={() => navigate('/dashboard/catalogue')}
              className="h-12 bg-white dark:bg-[#2d1b24] hover:bg-[#fffbef] dark:hover:bg-[#3d2531] border-2 border-black text-[#4a2c3a] dark:text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              <MaterialIcon icon="storefront" className="text-[18px]" />
              Lihat Katalog
            </button>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pesanan Anda masih tersimpan dan dapat diselesaikan kapan saja
            </p>
          </motion.div>
        </motion.div>

        {/* Back to Home Link */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-[#7d5a6a] dark:text-gray-400 hover:text-[#ffafcc] transition-colors text-sm font-medium flex items-center gap-2 mx-auto"
          >
            <MaterialIcon icon="home" className="text-[18px]" />
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}
