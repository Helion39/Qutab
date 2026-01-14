import { useState } from 'react';
import MaterialIcon from '../../MaterialIcon';

export default function AffiliateKuponDiskon() {
  const [copiedCode, setCopiedCode] = useState(false);

  const coupon = {
    code: 'DARMAWAN10',
    discount: '10%',
    discountType: 'Percentage',
    validFrom: '1 Jan 2026',
    validUntil: '31 Des 2026',
    usageCount: 23,
    usageLimit: 100
  };

  const usagePercentage = (coupon.usageCount / coupon.usageLimit) * 100;

  const handleCopy = () => {
    // Fallback copy method that doesn't require clipboard permissions
    const textArea = document.createElement('textarea');
    textArea.value = coupon.code;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    
    document.body.removeChild(textArea);
  };

  return (
    <div className="p-8 pb-20 bg-[#fffbef] dark:bg-[#2d1b24]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#4a2c3a] dark:text-white mb-2">Kupon Diskon</h1>
        <p className="text-[#7d5a6a] dark:text-gray-400">Kelola kode kupon diskon eksklusif untuk audiens Anda</p>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:bg-gradient-to-br dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5 flex items-start gap-3">
        <div className="size-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
          <MaterialIcon icon="info" className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#4a2c3a] dark:text-white mb-1">
            Cara Menggunakan Kupon
          </p>
          <p className="text-xs text-[#7d5a6a] dark:text-gray-400">
            Bagikan kode kupon ini kepada calon customer Anda. Mereka akan mendapatkan diskon saat checkout, dan Anda tetap mendapatkan komisi dari penjualan tersebut!
          </p>
        </div>
      </div>

      {/* Coupon Card */}
      <div className="bg-gradient-to-br from-[#bdbef5] to-[#9b9ef5] rounded-2xl p-8 shadow-lg relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-14 rounded-xl bg-white/20 flex items-center justify-center">
              <MaterialIcon icon="confirmation_number" className="text-3xl text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-lg">Kode Kupon Anda</p>
              <p className="text-white/80 text-sm">Berlaku sampai {coupon.validUntil}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-[#7d5a6a] mb-2 font-semibold">KODE KUPON</p>
                <p className="text-4xl font-bold text-[#4a2c3a] tracking-wider font-mono">{coupon.code}</p>
              </div>
              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-[#ffafcc] hover:bg-[#ff8fb5] text-white rounded-lg font-semibold text-sm transition-colors flex items-center gap-2 shadow-sm"
              >
                <MaterialIcon icon={copiedCode ? 'check' : 'content_copy'} className="text-[18px]" />
                {copiedCode ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-white/80 text-xs mb-1">Diskon</p>
              <p className="text-white text-2xl font-bold">{coupon.discount}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-white/80 text-xs mb-1">Digunakan</p>
              <p className="text-white text-2xl font-bold">{coupon.usageCount}x</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-white/80 text-xs mb-1">Limit</p>
              <p className="text-white text-2xl font-bold">{coupon.usageLimit}x</p>
            </div>
          </div>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white dark:bg-[#3d2531] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-[#e1e4ff] dark:bg-[#bdbef5]/20 flex items-center justify-center">
              <MaterialIcon icon="receipt_long" className="text-[#bdbef5] text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#4a2c3a] dark:text-white">Detail Kupon</h2>
              <p className="text-sm text-[#7d5a6a] dark:text-gray-400 mt-1">Informasi lengkap kupon diskon</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Discount Value */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
            <span className="text-sm text-[#7d5a6a] dark:text-gray-400">Nilai Diskon</span>
            <span className="text-sm font-bold text-[#4a2c3a] dark:text-white">{coupon.discount}</span>
          </div>

          {/* Validity Period */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
            <span className="text-sm text-[#7d5a6a] dark:text-gray-400">Periode Berlaku</span>
            <span className="text-sm font-bold text-[#4a2c3a] dark:text-white">
              {coupon.validFrom} - {coupon.validUntil}
            </span>
          </div>

          {/* Usage Progress */}
          <div className="py-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#7d5a6a] dark:text-gray-400">Penggunaan Kupon</span>
              <span className="text-sm font-bold text-[#4a2c3a] dark:text-white">
                {coupon.usageCount} / {coupon.usageLimit}
              </span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-[#2d1b24] rounded-full h-3">
              <div
                className="bg-[#bdbef5] h-3 rounded-full transition-all"
                style={{ width: `${usagePercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-[#7d5a6a] dark:text-gray-400 mt-2">
              Tersisa {coupon.usageLimit - coupon.usageCount} penggunaan lagi
            </p>
          </div>
        </div>
      </div>

      {/* Tips Card */}
      <div className="bg-[#fffbef] dark:bg-[#2d1b24] border border-gray-200 dark:border-gray-700 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <MaterialIcon icon="lightbulb" className="text-[#ff4757] text-xl mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#4a2c3a] dark:text-white mb-2">
              Tips Memaksimalkan Kupon
            </p>
            <ul className="space-y-1 text-xs text-[#7d5a6a] dark:text-gray-400">
              <li className="flex items-start gap-2">
                <div className="size-1.5 rounded-full bg-[#7d5a6a] dark:bg-gray-400 mt-1.5 flex-shrink-0" />
                <span>Bagikan kupon di bio Instagram/TikTok Anda</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="size-1.5 rounded-full bg-[#7d5a6a] dark:bg-gray-400 mt-1.5 flex-shrink-0" />
                <span>Post story/video tentang program Qutab dengan kupon diskon</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="size-1.5 rounded-full bg-[#7d5a6a] dark:bg-gray-400 mt-1.5 flex-shrink-0" />
                <span>Kirim kupon langsung via WhatsApp ke grup atau teman</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="size-1.5 rounded-full bg-[#7d5a6a] dark:bg-gray-400 mt-1.5 flex-shrink-0" />
                <span>Tekankan bahwa mereka dapat diskon + bantu peternak lokal</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}