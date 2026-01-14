import { useNavigate } from 'react-router-dom';
import MaterialIcon from './MaterialIcon';

export default function HowToOrder() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: 'pets',
      title: '1. Pilih Hewan',
      description: 'Pilih jenis hewan Qurban yang sesuai dengan anggaran Anda.'
    },
    {
      icon: 'edit_note',
      title: '2. Isi Data',
      description: 'Masukkan detail data diri Anda atau orang yang Anda qurbankan.'
    },
    {
      icon: 'payments',
      title: '3. Pembayaran',
      description: 'Selesaikan pembayaran via Transfer Bank atau E-Wallet dengan aman.'
    },
    {
      icon: 'assignment_turned_in',
      title: '4. Terima Laporan',
      description: 'Kami akan mengirimkan foto dan sertifikat setelah pemotongan.'
    }
  ];

  return (
    <div className="py-20 bg-[#ffafcc] border-b-4 border-black overflow-hidden" id="how-to-order">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className="text-5xl font-black text-black uppercase tracking-tighter">
            Cara Pesan
          </h2>
          <p className="text-black font-bold text-xl mt-4 bg-white inline-block px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_#000000]">
            Empat langkah mudah untuk menyempurnakan Ibadah Anda.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-black z-0 border-t-2 border-b-2 border-black"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >
                <div className={`w-24 h-24 bg-white border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_#000000] mb-6 transform hover:${
                  index % 2 === 0 ? 'rotate-3' : '-rotate-3'
                } transition-transform`}>
                  <MaterialIcon icon={step.icon} className="text-5xl text-black" />
                </div>
                <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_#000000] w-full">
                  <h4 className="text-xl font-black text-black uppercase mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm font-bold text-black/80">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <button
            onClick={() => navigate('/login')}
            className="h-16 px-12 bg-black text-white text-xl font-black uppercase tracking-wider border-2 border-white shadow-[8px_8px_0px_0px_#ffffff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#ffffff] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
            data-aos="zoom-in"
            data-aos-offset="50"
          >
            Qurban Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}