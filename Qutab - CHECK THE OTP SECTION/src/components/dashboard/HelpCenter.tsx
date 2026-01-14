import { useState } from 'react';
import MaterialIcon from '../MaterialIcon';

export default function HelpCenter() {
  const [activeCategory, setActiveCategory] = useState('umum');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const categories = [
    { id: 'umum', label: 'Umum', icon: 'help' },
    { id: 'pembayaran', label: 'Pembayaran', icon: 'payments' },
    { id: 'qurban', label: 'Qurban', icon: 'volunteer_activism' },
    { id: 'akun', label: 'Akun', icon: 'person' },
  ];

  const faqs = {
    umum: [
      {
        question: 'Apa itu Qurban Tanpa Batas?',
        answer: 'Qurban Tanpa Batas adalah platform digital yang memfasilitasi umat Muslim untuk menunaikan ibadah Qurban dengan mudah, aman, dan transparan. Kami bekerja sama langsung dengan peternak lokal di seluruh Nusantara untuk menyediakan hewan Qurban berkualitas.',
      },
      {
        question: 'Bagaimana cara memesan hewan Qurban?',
        answer: 'Anda dapat memesan melalui dashboard dengan memilih jenis hewan (kambing atau sapi), memilih paket yang sesuai, kemudian melakukan pembayaran. Setelah pembayaran dikonfirmasi, Anda akan menerima bukti pemesanan dan update proses Qurban Anda.',
      },
      {
        question: 'Apakah saya bisa melihat dokumentasi penyembelihan?',
        answer: 'Ya! Setiap pelanggan akan menerima dokumentasi lengkap berupa foto dan video proses penyembelihan hewan Qurban mereka. Dokumentasi akan dikirimkan melalui email dan dashboard Anda dalam waktu 1-3 hari setelah penyembelihan.',
      },
      {
        question: 'Ke daerah mana saja daging Qurban didistribusikan?',
        answer: 'Kami mendistribusikan daging Qurban ke berbagai daerah di Indonesia, prioritas pada daerah dengan tingkat kemiskinan tinggi, pulau-pulau terpencil, dan zona konflik. Anda juga dapat memilih daerah distribusi tertentu saat memesan.',
      },
    ],
    pembayaran: [
      {
        question: 'Metode pembayaran apa saja yang tersedia?',
        answer: 'Kami menerima berbagai metode pembayaran termasuk: Transfer Bank (BCA, Mandiri, BRI, BNI), E-wallet (GoPay, OVO, DANA, ShopeePay), dan Virtual Account. Semua transaksi dilindungi dengan enkripsi tingkat bank.',
      },
      {
        question: 'Berapa lama waktu konfirmasi pembayaran?',
        answer: 'Pembayaran melalui virtual account dan e-wallet biasanya terkonfirmasi otomatis dalam 5-15 menit. Untuk transfer bank manual, konfirmasi dapat memakan waktu hingga 1x24 jam pada hari kerja.',
      },
      {
        question: 'Apakah bisa membayar dengan cicilan?',
        answer: 'Ya, kami menyediakan opsi pembayaran cicilan untuk pembelian Qurban. Anda dapat memilih tenor 3, 6, atau 12 bulan dengan bunga 0% untuk paket tertentu. Silakan hubungi customer service kami untuk informasi lebih lanjut.',
      },
      {
        question: 'Bagaimana jika saya ingin membatalkan pesanan?',
        answer: 'Pembatalan dapat dilakukan maksimal 30 hari sebelum Hari Raya Idul Adha dengan pengembalian dana 100%. Untuk pembatalan 15-30 hari sebelum, dana dikembalikan 50%. Pembatalan kurang dari 15 hari tidak dapat dikembalikan.',
      },
    ],
    qurban: [
      {
        question: 'Apa saja jenis hewan Qurban yang tersedia?',
        answer: 'Kami menyediakan kambing dan sapi dengan berbagai grade kualitas. Untuk kambing tersedia grade A (20-25kg) dan grade B (15-20kg). Untuk sapi tersedia dari 200kg hingga 400kg+ dengan opsi 1/7 bagian atau sapi utuh.',
      },
      {
        question: 'Bagaimana kualitas hewan dijamin?',
        answer: 'Semua hewan Qurban kami diperiksa oleh dokter hewan bersertifikat dan memenuhi syarat Qurban sesuai ketentuan syariat Islam. Kami juga menyediakan sertifikat kesehatan hewan untuk setiap pembelian.',
      },
      {
        question: 'Kapan waktu penyembelihan dilakukan?',
        answer: 'Penyembelihan dilakukan pada Hari Raya Idul Adha dan tiga hari tasyriq setelahnya (11, 12, 13 Dzulhijjah). Anda dapat memilih preferensi hari penyembelihan saat melakukan pemesanan.',
      },
      {
        question: 'Apakah saya bisa hadir saat penyembelihan?',
        answer: 'Untuk lokasi tertentu, kami memfasilitasi kehadiran pelanggan saat penyembelihan dengan koordinasi terlebih dahulu. Silakan hubungi tim kami minimal 7 hari sebelum untuk mengatur kunjungan.',
      },
    ],
    akun: [
      {
        question: 'Bagaimana cara mengubah informasi profil?',
        answer: 'Anda dapat mengubah informasi profil melalui menu "Pengaturan Akun" di dashboard. Klik pada bagian yang ingin diubah, masukkan informasi baru, dan klik "Simpan Perubahan".',
      },
      {
        question: 'Lupa kata sandi, apa yang harus dilakukan?',
        answer: 'Klik "Lupa Kata Sandi" pada halaman login, masukkan email terdaftar Anda, dan kami akan mengirimkan link reset password. Link berlaku selama 24 jam.',
      },
      {
        question: 'Bagaimana cara mengaktifkan notifikasi?',
        answer: 'Buka "Pengaturan Akun" > "Preferensi Notifikasi", lalu aktifkan jenis notifikasi yang Anda inginkan. Anda dapat memilih notifikasi email, SMS, atau keduanya.',
      },
      {
        question: 'Apakah data saya aman?',
        answer: 'Ya, kami sangat serius dalam melindungi data pribadi Anda. Semua data dienkripsi dan disimpan dengan standar keamanan tingkat enterprise. Kami tidak akan membagikan data Anda kepada pihak ketiga tanpa persetujuan.',
      },
    ],
  };

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/6281234567890?text=Halo, saya butuh bantuan terkait Qurban Tanpa Batas', '_blank');
  };

  const handleEmailContact = () => {
    window.location.href = 'mailto:support@qurbantanpabatas.id?subject=Bantuan Qurban Tanpa Batas';
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const filteredFaqs = faqs[activeCategory as keyof typeof faqs].filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#4a2c3a] dark:text-white mb-2">Pusat Bantuan</h1>
        <p className="text-[#7d5a6a] dark:text-gray-400">Temukan jawaban untuk pertanyaan Anda atau hubungi tim kami</p>
      </div>

      {/* Contact Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* WhatsApp Support */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white relative overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          <div className="relative z-10">
            <div className="size-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
              <MaterialIcon icon="chat" className="text-3xl" />
            </div>
            <h3 className="text-2xl font-bold mb-2">WhatsApp Support</h3>
            <p className="text-white/90 mb-6">Hubungi kami langsung melalui WhatsApp untuk bantuan cepat</p>
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
        <div className="bg-gradient-to-br from-[#ffafcc] to-[#ff8fb5] rounded-2xl p-6 text-white relative overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          <div className="relative z-10">
            <div className="size-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
              <MaterialIcon icon="mail" className="text-3xl" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Email Support</h3>
            <p className="text-white/90 mb-6">Kirim pertanyaan detail Anda melalui email dan kami akan merespons dalam 1x24 jam</p>
            <button
              onClick={handleEmailContact}
              className="px-6 py-3 bg-white text-[#ffafcc] font-semibold rounded-lg hover:bg-pink-50 transition-colors flex items-center gap-2"
            >
              <MaterialIcon icon="send" />
              Kirim Email
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#3d2531] rounded-xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm">
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
        <div className="bg-white dark:bg-[#3d2531] rounded-xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm">
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
        <div className="bg-white dark:bg-[#3d2531] rounded-xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <MaterialIcon icon="thumb_up" className="text-purple-600 dark:text-purple-400 text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#4a2c3a] dark:text-white">98%</p>
              <p className="text-xs text-[#7d5a6a] dark:text-gray-400">Kepuasan Pelanggan</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-[#3d2531] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
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
              className="w-full pl-10 pr-4 h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1b24] text-[#4a2c3a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffafcc]/50"
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
                    ? 'bg-[#ffafcc] text-white'
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
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all hover:border-[#ffafcc] dark:hover:border-[#ffafcc]"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 bg-white dark:bg-[#2d1b24] hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <span className="font-semibold text-left text-[#4a2c3a] dark:text-white">{faq.question}</span>
                  <MaterialIcon
                    icon={openFaqIndex === index ? 'expand_less' : 'expand_more'}
                    className="text-[#ffafcc] text-2xl flex-shrink-0"
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

      {/* Additional Resources */}
      <div className="grid md:grid-cols-3 gap-4">
        <a
          href="#"
          className="bg-white dark:bg-[#3d2531] rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:border-[#ffafcc] dark:hover:border-[#ffafcc] transition-all group"
        >
          <div className="size-12 rounded-lg bg-[#ffe1ed] dark:bg-[#ffafcc]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <MaterialIcon icon="menu_book" className="text-[#ffafcc] text-2xl" />
          </div>
          <h3 className="font-bold text-[#4a2c3a] dark:text-white mb-2">Panduan Lengkap</h3>
          <p className="text-sm text-[#7d5a6a] dark:text-gray-400">Pelajari cara menggunakan platform kami dari A sampai Z</p>
        </a>

        <a
          href="#"
          className="bg-white dark:bg-[#3d2531] rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:border-[#bdbef5] dark:hover:border-[#bdbef5] transition-all group"
        >
          <div className="size-12 rounded-lg bg-[#e1e4ff] dark:bg-[#bdbef5]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <MaterialIcon icon="video_library" className="text-[#bdbef5] text-2xl" />
          </div>
          <h3 className="font-bold text-[#4a2c3a] dark:text-white mb-2">Video Tutorial</h3>
          <p className="text-sm text-[#7d5a6a] dark:text-gray-400">Tonton video panduan praktis untuk memulai</p>
        </a>

        <a
          href="#"
          className="bg-white dark:bg-[#3d2531] rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:border-green-500 dark:hover:border-green-500 transition-all group"
        >
          <div className="size-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <MaterialIcon icon="forum" className="text-green-600 dark:text-green-400 text-2xl" />
          </div>
          <h3 className="font-bold text-[#4a2c3a] dark:text-white mb-2">Komunitas</h3>
          <p className="text-sm text-[#7d5a6a] dark:text-gray-400">Bergabung dengan komunitas pengguna kami</p>
        </a>
      </div>
    </div>
  );
}