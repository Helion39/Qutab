import { useState } from 'react';
import MaterialIcon from '../../MaterialIcon';

export default function AffiliateHelpdesk() {
  const [activeCategory, setActiveCategory] = useState('umum');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const categories = [
    { id: 'umum', label: 'Umum', icon: 'help' },
    { id: 'komisi', label: 'Komisi', icon: 'payments' },
    { id: 'promosi', label: 'Promosi', icon: 'campaign' },
    { id: 'teknis', label: 'Teknis', icon: 'settings' },
  ];

  const faqs = {
    umum: [
      {
        question: 'Bagaimana cara mendapatkan link affiliate?',
        answer: 'Anda bisa mendapatkan link affiliate di menu "Banner dan Link". Copy link tersebut dan bagikan kepada calon customer melalui media sosial, blog, atau platform apapun yang Anda gunakan.'
      },
      {
        question: 'Apakah ada biaya untuk bergabung sebagai affiliate?',
        answer: 'Tidak ada biaya sama sekali! Program affiliate Qutab 100% gratis. Anda hanya perlu mendaftar, verifikasi akun, dan langsung bisa mulai mempromosikan.'
      },
      {
        question: 'Bagaimana cara melacak performa affiliate saya?',
        answer: 'Anda bisa melihat performa affiliate Anda di menu "Statistik" yang menampilkan data lengkap termasuk jumlah klik, konversi, dan komisi yang dihasilkan dalam periode tertentu.'
      }
    ],
    komisi: [
      {
        question: 'Berapa besar komisi yang saya dapatkan?',
        answer: 'Komisi yang Anda dapatkan adalah 10% dari total nilai transaksi yang dilakukan oleh customer yang Anda referensikan. Komisi akan otomatis terhitung setelah transaksi dikonfirmasi.'
      },
      {
        question: 'Kapan komisi dibayarkan?',
        answer: 'Komisi dibayarkan setiap tanggal 20-30 setiap bulan untuk periode bulan sebelumnya dengan minimal pembayaran Rp 100.000. Jika komisi belum mencapai minimum, akan diakumulasi ke bulan berikutnya.'
      },
      {
        question: 'Apa itu holding period dan mengapa ada?',
        answer: 'Holding period adalah masa tunggu 30 hari sebelum komisi dapat ditarik. Ini untuk melindungi dari kemungkinan refund atau pembatalan order yang mungkin terjadi setelah transaksi.'
      },
      {
        question: 'Bagaimana cara menarik komisi?',
        answer: 'Setelah komisi Anda mencapai minimum Rp 100.000, Anda dapat mengajukan penarikan melalui menu "Pembayaran Komisi". Pastikan data rekening bank Anda sudah terverifikasi.'
      }
    ],
    promosi: [
      {
        question: 'Bagaimana cara menggunakan kupon diskon?',
        answer: 'Bagikan kode kupon Anda kepada customer. Mereka akan mendapatkan diskon saat checkout, dan Anda tetap mendapatkan komisi penuh dari penjualan tersebut. Win-win solution!'
      },
      {
        question: 'Apakah saya boleh menggunakan iklan berbayar?',
        answer: 'Ya, Anda boleh menggunakan iklan berbayar seperti Facebook Ads, Instagram Ads, atau Google Ads. Pastikan iklan Anda mematuhi kebijakan masing-masing platform dan tidak menyesatkan.'
      },
      {
        question: 'Dimana sebaiknya saya mempromosikan link affiliate?',
        answer: 'Platform terbaik adalah Instagram, TikTok, YouTube, blog pribadi, WhatsApp Group, atau Telegram. Fokus pada platform dimana Anda memiliki audiens yang engaged.'
      },
      {
        question: 'Apakah ada materi promosi yang disediakan?',
        answer: 'Ya! Kami menyediakan berbagai banner dengan ukuran berbeda, copy untuk caption, dan panduan konten yang bisa Anda download di menu "Banner dan Link".'
      }
    ],
    teknis: [
      {
        question: 'Kenapa link affiliate saya tidak berfungsi?',
        answer: 'Pastikan Anda meng-copy link dengan benar tanpa ada spasi di awal atau akhir. Jika masih bermasalah, coba bersihkan cache browser atau gunakan browser berbeda. Hubungi support jika masih tidak bisa.'
      },
      {
        question: 'Bagaimana cara mengubah data rekening?',
        answer: 'Buka menu "Rekening Pembayaran" dan update data rekening Anda. Setiap perubahan akan memerlukan verifikasi ulang untuk keamanan, yang biasanya memakan waktu 1-2 hari kerja.'
      },
      {
        question: 'Apakah saya bisa memiliki lebih dari satu akun affiliate?',
        answer: 'Tidak. Setiap orang hanya diperbolehkan memiliki satu akun affiliate. Sistem kami akan mendeteksi duplikasi akun dan dapat menonaktifkan akun yang melanggar.'
      }
    ]
  };

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/6281234567890?text=Halo, saya butuh bantuan terkait program affiliate Qutab', '_blank');
  };

  const handleEmailContact = () => {
    window.location.href = 'mailto:affiliate@qutab.id?subject=Bantuan Affiliate Qutab';
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const filteredFaqs = faqs[activeCategory as keyof typeof faqs].filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 pb-20 bg-[#fffbef] dark:bg-[#2d1b24]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#4a2c3a] dark:text-white mb-2">Helpdesk</h1>
        <p className="text-[#7d5a6a] dark:text-gray-400">Dapatkan bantuan dan temukan jawaban pertanyaan Anda</p>
      </div>

      {/* Contact Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* WhatsApp Support */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          <div className="relative z-10">
            <div className="size-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
              <MaterialIcon icon="chat" className="text-3xl" />
            </div>
            <h3 className="text-2xl font-bold mb-2">WhatsApp Support</h3>
            <p className="text-white/90 mb-2">+62 812-3456-7890</p>
            <p className="text-white/80 text-sm mb-6">Hubungi kami langsung untuk bantuan cepat</p>
            <button
              onClick={handleWhatsAppContact}
              className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors flex items-center gap-2"
            >
              <MaterialIcon icon="send" />
              Chat Sekarang
            </button>
          </div>
        </div>

        {/* Email Support */}
        <div className="bg-gradient-to-br from-[#bdbef5] to-[#9b9ef5] rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          <div className="relative z-10">
            <div className="size-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
              <MaterialIcon icon="mail" className="text-3xl" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Email Support</h3>
            <p className="text-white/90 mb-2">affiliate@qutab.id</p>
            <p className="text-white/80 text-sm mb-6">Kirim pertanyaan detail melalui email</p>
            <button
              onClick={handleEmailContact}
              className="px-6 py-3 bg-white text-[#bdbef5] font-semibold rounded-lg hover:bg-purple-50 transition-colors flex items-center gap-2"
            >
              <MaterialIcon icon="send" />
              Kirim Email
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#3d2531] rounded-xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <MaterialIcon icon="schedule" className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#4a2c3a] dark:text-white">24/7</p>
              <p className="text-xs text-[#7d5a6a] dark:text-gray-400">Layanan Online</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-[#3d2531] rounded-xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <MaterialIcon icon="speed" className="text-green-600 dark:text-green-400 text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#4a2c3a] dark:text-white">&lt;15 min</p>
              <p className="text-xs text-[#7d5a6a] dark:text-gray-400">Respon WhatsApp</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-[#3d2531] rounded-xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <MaterialIcon icon="thumb_up" className="text-purple-600 dark:text-purple-400 text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#4a2c3a] dark:text-white">98%</p>
              <p className="text-xs text-[#7d5a6a] dark:text-gray-400">Kepuasan</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-[#3d2531] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-[#4a2c3a] dark:text-white mb-4">Pertanyaan yang Sering Diajukan (FAQ)</h2>
          
          {/* Search */}
          <div className="relative mb-4">
            <MaterialIcon icon="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bdbef5]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pertanyaan..."
              className="w-full pl-10 pr-4 h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1b24] text-[#4a2c3a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bdbef5]/50"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? 'bg-[#bdbef5] text-white'
                    : 'bg-gray-100 dark:bg-[#2d1b24] text-[#7d5a6a] dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                <MaterialIcon icon={cat.icon} className="text-lg" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="p-6 space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <MaterialIcon icon="search_off" className="text-6xl text-gray-300 dark:text-gray-700 mb-4" />
              <p className="text-[#7d5a6a] dark:text-gray-400">Tidak ada hasil yang ditemukan</p>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all hover:border-[#bdbef5] dark:hover:border-[#bdbef5]"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 bg-white dark:bg-[#2d1b24] hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <span className="font-semibold text-left text-[#4a2c3a] dark:text-white">{faq.question}</span>
                  <MaterialIcon
                    icon={openFaqIndex === index ? 'expand_less' : 'expand_more'}
                    className="text-[#bdbef5] text-2xl flex-shrink-0"
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="p-4 bg-gray-50 dark:bg-[#2d1b24] border-t border-gray-200 dark:border-gray-700">
                    <p className="text-[#7d5a6a] dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Resources */}
      <div className="grid md:grid-cols-2 gap-4">
        <a
          href="#"
          className="bg-white dark:bg-[#3d2531] rounded-xl p-6 border border-gray-100 dark:border-gray-800 hover:border-[#bdbef5] dark:hover:border-[#bdbef5] transition-all group"
        >
          <div className="size-12 rounded-lg bg-[#e1e4ff] dark:bg-[#bdbef5]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <MaterialIcon icon="library_books" className="text-[#bdbef5] text-2xl" />
          </div>
          <h3 className="font-bold text-[#4a2c3a] dark:text-white mb-2">Panduan Affiliate</h3>
          <p className="text-sm text-[#7d5a6a] dark:text-gray-400">Download panduan lengkap program affiliate Qutab</p>
        </a>

        <a
          href="#"
          className="bg-white dark:bg-[#3d2531] rounded-xl p-6 border border-gray-100 dark:border-gray-800 hover:border-green-500 dark:hover:border-green-500 transition-all group"
        >
          <div className="size-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <MaterialIcon icon="forum" className="text-green-600 dark:text-green-400 text-2xl" />
          </div>
          <h3 className="font-bold text-[#4a2c3a] dark:text-white mb-2">Grup WhatsApp</h3>
          <p className="text-sm text-[#7d5a6a] dark:text-gray-400">Bergabung dengan komunitas affiliate</p>
        </a>
      </div>
      </div>
    </div>
  );
}