import { useState } from 'react';
import MaterialIcon from '../../MaterialIcon';

export default function AffiliateLinks() {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleCopy = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const affiliateLink = 'https://qutab.id/ref/SITI2024';

  return (
    <div className="p-8 pb-20 bg-white dark:bg-[#2d1b24]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-[#4a2c3a] dark:text-white tracking-tight">
            Link & Materi Promosi
          </h2>
          <p className="text-[#7d5a6a] dark:text-gray-400">
            Gunakan link dan materi di bawah ini untuk mempromosikan Qutab
          </p>
        </div>

        {/* Main Affiliate Link */}
        <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-12 rounded-xl bg-[#bdbef5]/20 flex items-center justify-center">
              <MaterialIcon icon="link" className="text-[#bdbef5] text-2xl" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#4a2c3a] dark:text-white">Link Affiliasi Utama</h3>
              <p className="text-sm text-[#7d5a6a] dark:text-gray-400">Bagikan link ini untuk mendapatkan komisi</p>
            </div>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={affiliateLink}
              readOnly
              className="flex-1 px-4 h-12 rounded-lg bg-[#fffbef] dark:bg-[#2d1b24] border border-gray-200 dark:border-gray-700 text-[#4a2c3a] dark:text-white font-mono text-sm"
            />
            <button
              onClick={() => handleCopy(affiliateLink, 'main')}
              className="h-12 px-6 rounded-lg bg-[#bdbef5] hover:bg-[#9b9ef5] text-white font-bold transition-colors flex items-center gap-2"
            >
              <MaterialIcon icon={copiedLink === 'main' ? 'check' : 'content_copy'} />
              {copiedLink === 'main' ? 'Tersalin!' : 'Salin'}
            </button>
          </div>
        </div>

        {/* Product Specific Links */}
        <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-bold text-[#4a2c3a] dark:text-white mb-4">Link Produk Spesifik</h3>
          
          <div className="space-y-3">
            {/* Kambing Link */}
            <div className="p-4 rounded-xl bg-[#fffbef] dark:bg-[#2d1b24] border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="pets" className="text-[#ffafcc]" />
                  <span className="font-bold text-sm text-[#4a2c3a] dark:text-white">Kambing Tipe A</span>
                </div>
                <button
                  onClick={() => handleCopy('https://qutab.id/ref/SITI2024/kambing-a', 'kambing')}
                  className="px-4 py-2 rounded-lg bg-[#e1e4ff] hover:bg-[#bdbef5] text-[#4a2c3a] dark:text-white text-sm font-semibold transition-colors flex items-center gap-2"
                >
                  <MaterialIcon icon={copiedLink === 'kambing' ? 'check' : 'content_copy'} className="text-[18px]" />
                  {copiedLink === 'kambing' ? 'Tersalin' : 'Salin Link'}
                </button>
              </div>
              <p className="text-xs text-[#7d5a6a] dark:text-gray-400 font-mono ml-8">
                https://qutab.id/ref/SITI2024/kambing-a
              </p>
            </div>

            {/* Sapi Link */}
            <div className="p-4 rounded-xl bg-[#fffbef] dark:bg-[#2d1b24] border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="pets" className="text-[#bddcee]" />
                  <span className="font-bold text-sm text-[#4a2c3a] dark:text-white">Sapi Tipe A</span>
                </div>
                <button
                  onClick={() => handleCopy('https://qutab.id/ref/SITI2024/sapi-a', 'sapi')}
                  className="px-4 py-2 rounded-lg bg-[#e1e4ff] hover:bg-[#bdbef5] text-[#4a2c3a] dark:text-white text-sm font-semibold transition-colors flex items-center gap-2"
                >
                  <MaterialIcon icon={copiedLink === 'sapi' ? 'check' : 'content_copy'} className="text-[18px]" />
                  {copiedLink === 'sapi' ? 'Tersalin' : 'Salin Link'}
                </button>
              </div>
              <p className="text-xs text-[#7d5a6a] dark:text-gray-400 font-mono ml-8">
                https://qutab.id/ref/SITI2024/sapi-a
              </p>
            </div>

            {/* Domba Link */}
            <div className="p-4 rounded-xl bg-[#fffbef] dark:bg-[#2d1b24] border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="pets" className="text-[#ffafcc]" />
                  <span className="font-bold text-sm text-[#4a2c3a] dark:text-white">Domba Tipe A</span>
                </div>
                <button
                  onClick={() => handleCopy('https://qutab.id/ref/SITI2024/domba-a', 'domba')}
                  className="px-4 py-2 rounded-lg bg-[#e1e4ff] hover:bg-[#bdbef5] text-[#4a2c3a] dark:text-white text-sm font-semibold transition-colors flex items-center gap-2"
                >
                  <MaterialIcon icon={copiedLink === 'domba' ? 'check' : 'content_copy'} className="text-[18px]" />
                  {copiedLink === 'domba' ? 'Tersalin' : 'Salin Link'}
                </button>
              </div>
              <p className="text-xs text-[#7d5a6a] dark:text-gray-400 font-mono ml-8">
                https://qutab.id/ref/SITI2024/domba-a
              </p>
            </div>
          </div>
        </div>

        {/* Marketing Materials */}
        <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-bold text-[#4a2c3a] dark:text-white mb-4">Materi Promosi</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Banner 1 */}
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 hover:border-[#bdbef5] transition-colors">
              <div className="aspect-video bg-gradient-to-br from-[#ffafcc] to-[#ef9bb8] rounded-lg mb-3 flex items-center justify-center">
                <MaterialIcon icon="image" className="text-white text-4xl" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#4a2c3a] dark:text-white">Banner 1920x1080</p>
                  <p className="text-xs text-[#7d5a6a] dark:text-gray-400">Instagram & Facebook</p>
                </div>
                <button className="size-10 rounded-lg bg-[#e1e4ff] hover:bg-[#bdbef5] flex items-center justify-center text-[#4a2c3a] dark:text-white transition-colors">
                  <MaterialIcon icon="download" />
                </button>
              </div>
            </div>

            {/* Banner 2 */}
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 hover:border-[#bdbef5] transition-colors">
              <div className="aspect-video bg-gradient-to-br from-[#bdbef5] to-[#9b9ef5] rounded-lg mb-3 flex items-center justify-center">
                <MaterialIcon icon="image" className="text-white text-4xl" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#4a2c3a] dark:text-white">Story Template</p>
                  <p className="text-xs text-[#7d5a6a] dark:text-gray-400">Instagram Stories</p>
                </div>
                <button className="size-10 rounded-lg bg-[#e1e4ff] hover:bg-[#bdbef5] flex items-center justify-center text-[#4a2c3a] dark:text-white transition-colors">
                  <MaterialIcon icon="download" />
                </button>
              </div>
            </div>

            {/* Banner 3 */}
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 hover:border-[#bdbef5] transition-colors">
              <div className="aspect-video bg-gradient-to-br from-[#bddcee] to-[#9dc5d9] rounded-lg mb-3 flex items-center justify-center">
                <MaterialIcon icon="image" className="text-white text-4xl" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#4a2c3a] dark:text-white">WhatsApp Banner</p>
                  <p className="text-xs text-[#7d5a6a] dark:text-gray-400">Status WhatsApp</p>
                </div>
                <button className="size-10 rounded-lg bg-[#e1e4ff] hover:bg-[#bdbef5] flex items-center justify-center text-[#4a2c3a] dark:text-white transition-colors">
                  <MaterialIcon icon="download" />
                </button>
              </div>
            </div>

            {/* Video */}
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 hover:border-[#bdbef5] transition-colors">
              <div className="aspect-video bg-gradient-to-br from-[#ffafcc] to-[#bdbef5] rounded-lg mb-3 flex items-center justify-center">
                <MaterialIcon icon="play_circle" className="text-white text-4xl" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#4a2c3a] dark:text-white">Video Promo</p>
                  <p className="text-xs text-[#7d5a6a] dark:text-gray-400">TikTok & Reels</p>
                </div>
                <button className="size-10 rounded-lg bg-[#e1e4ff] hover:bg-[#bdbef5] flex items-center justify-center text-[#4a2c3a] dark:text-white transition-colors">
                  <MaterialIcon icon="download" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}