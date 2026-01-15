import MaterialIcon from './MaterialIcon';

export default function FAQ() {
  const faqs = [
    {
      question: 'Kapan batas waktunya?',
      answer: 'Batas waktu pemesanan Qurban biasanya 1 hari sebelum sholat Idul Adha. Namun, untuk distribusi Palestina, kami menyarankan pemesanan minimal 3 hari sebelumnya.'
    },
    {
      question: 'Apakah saya akan mendapatkan laporan?',
      answer: 'Ya! Setiap donatur menerima sertifikat digital dan dokumentasi foto/video hewan mereka sebelum dan sesudah penyembelihan melalui WhatsApp atau Email dalam waktu 7-14 hari setelah Idul Adha.'
    },
    {
      question: 'Bisakah saya memilih lokasi?',
      answer: 'Secara default, kami mendistribusikan ke daerah yang paling membutuhkan berdasarkan survei lapangan kami. Namun, Anda dapat memilih wilayah luas seperti "Pelosok Jawa" atau "Palestina" saat memilih produk Anda.'
    },
    {
      question: 'Apakah hewannya sehat?',
      answer: 'Tentu saja. Semua hewan bersumber dari peternak mitra kami dan melalui pemeriksaan kesehatan yang ketat oleh dokter hewan untuk memastikan mereka memenuhi persyaratan Syariah untuk Qurban.'
    }
  ];

  return (
    <div className="py-20 bg-white border-b-4 border-black overflow-hidden" id="faq">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h2
          className="text-5xl font-black text-black text-center mb-10 uppercase tracking-tighter"
          data-aos="fade-down"
        >
          FAQ
        </h2>

        <div className="flex flex-col gap-6">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000000] open:shadow-none open:translate-x-[4px] open:translate-y-[4px] transition-all"
              data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer select-none">
                <h4 className="font-black text-black text-xl uppercase">{faq.question}</h4>
                <MaterialIcon
                  icon="expand_more"
                  className="text-4xl transform group-open:rotate-180 transition-transform text-black border-2 border-black bg-[#ffafcc]"
                />
              </summary>
              <div className="p-6 pt-0 text-black text-lg font-medium border-t-4 border-black mt-2">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}