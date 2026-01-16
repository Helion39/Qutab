import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MaterialIcon from './MaterialIcon';
import { motion } from 'motion/react';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('order') || 'QTB-XXXXXX';
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  return (
    <div className="min-h-screen bg-[#fffbef] dark:bg-[#2d1b24] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute size-2 rounded-full"
              style={{
                backgroundColor: ['#ffafcc', '#bdbef5', '#ffc7dd', '#dfdffa'][i % 4],
                left: `${Math.random() * 100}%`,
                top: '-10px',
              }}
              animate={{
                y: ['0vh', '110vh'],
                x: [0, (Math.random() - 0.5) * 200],
                rotate: [0, 360],
                opacity: [1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-white dark:bg-[#3d2531] rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="size-24 rounded-full bg-green-500 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <MaterialIcon icon="check" className="text-white text-[48px] filled" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-[#4a2c3a] dark:text-white mb-3">
              Pembayaran Berhasil!
            </h1>
            <p className="text-lg text-[#7d5a6a] dark:text-gray-400">
              Terima kasih atas partisipasi Anda dalam program Qurban Tanpa Batas
            </p>
          </motion.div>

          {/* Order Number */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-[#ffe1ed] dark:bg-[#ffafcc]/20 border-2 border-[#ffafcc] rounded-xl p-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#7d5a6a] dark:text-gray-300 mb-1">Nomor Pesanan</p>
                <p className="text-2xl font-bold text-[#4a2c3a] dark:text-white font-mono">{orderNumber}</p>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(orderNumber)}
                className="size-12 bg-[#ffafcc] hover:bg-[#ef9bb8] border-2 border-black rounded-lg flex items-center justify-center text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                title="Salin nomor pesanan"
              >
                <MaterialIcon icon="content_copy" className="text-[20px]" />
              </button>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-[#dfdffa] dark:bg-[#bdbef5]/20 border-2 border-[#bdbef5] rounded-xl p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="size-12 bg-[#bdbef5] border-2 border-black rounded-lg flex items-center justify-center flex-shrink-0">
                <MaterialIcon icon="notifications_active" className="text-white text-[24px]" />
              </div>
              <div>
                <h3 className="font-bold text-[#4a2c3a] dark:text-white mb-2">Langkah Selanjutnya</h3>
                <ul className="space-y-2 text-sm text-[#7d5a6a] dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <MaterialIcon icon="check_circle" className="text-[#bdbef5] text-[18px] mt-0.5 flex-shrink-0" />
                    <span>Anda akan menerima notifikasi via <strong>WhatsApp</strong> saat hewan dikurbankan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MaterialIcon icon="check_circle" className="text-[#bdbef5] text-[18px] mt-0.5 flex-shrink-0" />
                    <span>Foto dan video dokumentasi akan dikirimkan setelah penyembelihan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MaterialIcon icon="check_circle" className="text-[#bdbef5] text-[18px] mt-0.5 flex-shrink-0" />
                    <span>Sertifikat kurban digital akan tersedia untuk diunduh</span>
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
              onClick={() => navigate('/dashboard/orders')}
              className="h-14 bg-[#ffafcc] hover:bg-[#ef9bb8] border-2 border-black text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              <MaterialIcon icon="receipt_long" className="text-[20px]" />
              Lihat Pesanan
            </button>
            <button
              onClick={() => navigate('/dashboard/catalogue')}
              className="h-14 bg-white dark:bg-[#2d1b24] hover:bg-[#fffbef] dark:hover:bg-[#3d2531] border-2 border-black text-[#4a2c3a] dark:text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              <MaterialIcon icon="storefront" className="text-[20px]" />
              Kembali ke Katalog
            </button>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Jika ada pertanyaan, hubungi kami melalui{' '}
              <a href="/dashboard/help" className="text-[#ffafcc] hover:underline font-medium">
                Pusat Bantuan
              </a>
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
