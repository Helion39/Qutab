import { useState } from 'react';
import MaterialIcon from '../../MaterialIcon';

export default function AffiliateBannerLink() {
  const [copiedLink, setCopiedLink] = useState('');

  const affiliateLink = 'https://qutab.id/r/XK7mP2q';
  const targetUrl = 'https://qutab.id';

  const banners = [
    {
      id: 1,
      title: 'Banner Landscape 1200x628',
      description: 'Banner untuk Facebook & LinkedIn',
      size: '1200x628',
      clicks: 245
    },
    {
      id: 2,
      title: 'Banner Square 1080x1080',
      description: 'Banner untuk Instagram Feed',
      size: '1080x1080',
      clicks: 312
    },
    {
      id: 3,
      title: 'Banner Story 1080x1920',
      description: 'Banner untuk Instagram & WhatsApp Story',
      size: '1080x1920',
      clicks: 189
    }
  ];

  const handleCopy = (text: string, id: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setCopiedLink(id);
      setTimeout(() => setCopiedLink(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    
    document.body.removeChild(textArea);
  };

  const embedCode = `<a href="${affiliateLink}" target="_blank" rel="nofollow">Qurban Tanpa Batas - Qutab.id</a>`;

  return (
    <div className="p-8 pb-20 bg-[#fffbef] dark:bg-[#2d1b24]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#4a2c3a] dark:text-white mb-2">Banner dan Link</h1>
        <p className="text-[#7d5a6a] dark:text-gray-400">Akses link referral dan materi promosi Anda</p>
      </div>

      {/* Main Affiliate Link Section */}
      <div className="bg-white dark:bg-[#3d2531] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#ffafcc] to-[#ff8fb5] p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <MaterialIcon icon="link" className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Link Referral Anda</h2>
              <p className="text-white/80 text-sm">Bagikan link ini untuk mendapatkan komisi</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={affiliateLink}
              readOnly
              className="flex-1 px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#2d1b24] border border-gray-200 dark:border-gray-700 text-sm text-[#4a2c3a] dark:text-white font-mono"
            />
            <button
              onClick={() => handleCopy(affiliateLink, 'main')}
              className="px-6 py-3 bg-[#ffafcc] hover:bg-[#ff8fb5] text-white rounded-lg font-semibold text-sm transition-colors flex items-center gap-2 shadow-sm"
            >
              <MaterialIcon icon={copiedLink === 'main' ? 'check' : 'content_copy'} className="text-[18px]" />
              {copiedLink === 'main' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs font-semibold text-[#7d5a6a] dark:text-gray-400 mb-2">URL Target</p>
            <div className="px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-[#2d1b24] border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-[#4a2c3a] dark:text-white">{targetUrl}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Embed Code */}
      <div className="bg-white dark:bg-[#3d2531] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#bdbef5] to-[#9b9ef5] p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <MaterialIcon icon="code" className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Kode Sumber (Embed Code)</h2>
              <p className="text-white/80 text-sm">Embed link di website atau blog Anda</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3">
            <code className="flex-1 px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#2d1b24] border border-gray-200 dark:border-gray-700 text-xs text-[#4a2c3a] dark:text-white font-mono overflow-x-auto">
              {embedCode}
            </code>
            <button
              onClick={() => handleCopy(embedCode, 'embed')}
              className="px-6 py-3 bg-[#bdbef5] hover:bg-[#9b9ef5] text-white rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
            >
              <MaterialIcon icon={copiedLink === 'embed' ? 'check' : 'content_copy'} className="text-[18px]" />
              {copiedLink === 'embed' ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className="bg-white dark:bg-[#3d2531] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-[#e1e4ff] dark:bg-[#bdbef5]/20 flex items-center justify-center">
              <MaterialIcon icon="image" className="text-[#bdbef5] text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#4a2c3a] dark:text-white">Materi Promosi</h2>
              <p className="text-sm text-[#7d5a6a] dark:text-gray-400 mt-1">
                Download banner untuk berbagai platform
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:border-[#bdbef5] dark:hover:border-[#bdbef5] transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-[#4a2c3a] dark:text-white">{banner.title}</h4>
                    <span className="text-xs bg-[#e1e4ff] dark:bg-[#bdbef5]/20 text-[#bdbef5] px-2 py-1 rounded font-semibold">
                      {banner.size}
                    </span>
                  </div>
                  <p className="text-sm text-[#7d5a6a] dark:text-gray-400 mb-3">{banner.description}</p>
                  <div className="flex items-center gap-2 text-xs text-[#7d5a6a] dark:text-gray-400">
                    <MaterialIcon icon="mouse" className="text-[16px]" />
                    <span>{banner.clicks} klik total</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#bdbef5] hover:bg-[#9b9ef5] text-white rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5">
                  <MaterialIcon icon="download" className="text-[16px]" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:bg-gradient-to-br dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-4">
          <div className="size-12 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center flex-shrink-0">
            <MaterialIcon icon="lightbulb" className="text-2xl text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-[#4a2c3a] dark:text-white mb-3">
              Tips Memaksimalkan Link Affiliate
            </h3>
            <ul className="space-y-2 text-sm text-[#7d5a6a] dark:text-gray-400">
              <li className="flex items-start gap-2">
                <MaterialIcon icon="check_circle" className="text-green-500 text-[18px] mt-0.5 flex-shrink-0" />
                <span>Bagikan link di bio Instagram, TikTok, atau platform media sosial lainnya</span>
              </li>
              <li className="flex items-start gap-2">
                <MaterialIcon icon="check_circle" className="text-green-500 text-[18px] mt-0.5 flex-shrink-0" />
                <span>Buat konten menarik tentang Qurban Tanpa Batas dan sertakan link</span>
              </li>
              <li className="flex items-start gap-2">
                <MaterialIcon icon="check_circle" className="text-green-500 text-[18px] mt-0.5 flex-shrink-0" />
                <span>Gunakan banner yang telah disediakan untuk meningkatkan daya tarik visual</span>
              </li>
              <li className="flex items-start gap-2">
                <MaterialIcon icon="check_circle" className="text-green-500 text-[18px] mt-0.5 flex-shrink-0" />
                <span>Pantau performa link di menu Statistik untuk optimasi strategi promosi</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}