import MaterialIcon from './MaterialIcon';
import { Wallet, Hand, Handshake } from 'lucide-react';

export default function Benefits() {
  return (
    <div className="relative bg-[#fffbef] border-b-4 border-black overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-32">
        {/* Header */}
        <div className="mb-24 text-center max-w-4xl mx-auto">
          <h2
            className="text-6xl md:text-8xl font-black text-black mb-6 tracking-tighter leading-none uppercase"
            data-aos="fade-down"
          >
            Kenapa Memilih <br />
            <span className="relative inline-block px-4 bg-[#ffafcc] border-4 border-black shadow-[4px_4px_0px_0px_#000000] transform -rotate-1 mt-2 origin-left">
              Qurban Tanpa Batas?
            </span>
          </h2>
          <p
            className="text-black text-xl font-bold border-2 border-black bg-white inline-block p-4 shadow-[4px_4px_0px_0px_#000000] mt-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Mendefinisikan ulang pengalaman Qurban: Berdampak. Mudah. Transparan.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="flex flex-col gap-32 md:gap-48 pb-12">
          {/* Card 1 - Ekonomis */}
          <div className="flex w-full justify-start" data-aos="slide-right">
            <div className="relative w-full md:max-w-4xl bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000000] p-8 md:p-12 transition-all duration-300 hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-y-1 group">
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#ffafcc] border-4 border-black flex items-center justify-center text-2xl font-black shadow-[4px_4px_0px_0px_#000000] z-20 text-black">
                01
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* Icon */}
                <div className="shrink-0 relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-[#ffc7dd] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_#000000] relative z-10 group-hover:bg-black transition-colors duration-300">
                    <Wallet className="w-16 h-16 md:w-20 md:h-20 text-black group-hover:text-[#ffafcc] fill-current" />
                  </div>
                  <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 border-4 border-black z-0"></div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-4xl md:text-5xl font-black text-black mb-4 uppercase tracking-tighter">
                    Ekonomis
                  </h3>
                  <p className="text-black text-lg font-medium leading-relaxed border-l-4 border-[#ffafcc] pl-4 mb-6">
                    Bersumber langsung dari jaringan peternak lokal kami, kami memangkas perantara untuk memastikan harga yang adil bagi Anda tanpa mark-up tersembunyi.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-bold uppercase tracking-wider border-2 border-black">
                    <MaterialIcon icon="verified" className="text-base" />
                    Sumber Langsung
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Proses Mudah */}
          <div className="flex w-full justify-end" data-aos="slide-left">
            <div className="relative w-full md:max-w-4xl bg-[#bdbef5] border-4 border-black shadow-[8px_8px_0px_0px_#000000] p-8 md:p-12 transition-all duration-300 hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-y-1 group">
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#ffafcc] border-4 border-black flex items-center justify-center text-2xl font-black shadow-[4px_4px_0px_0px_#000000] z-20 text-black">
                02
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
                {/* Icon */}
                <div className="shrink-0 relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-white border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_#000000] relative z-10 group-hover:bg-[#ffafcc] transition-colors duration-300">
                    <Hand className="w-16 h-16 md:w-20 md:h-20 text-black fill-current" />
                  </div>
                  <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 border-4 border-black z-0"></div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-right">
                  <h3 className="text-4xl md:text-5xl font-black text-black mb-4 uppercase tracking-tighter">
                    Proses Mudah
                  </h3>
                  <p className="text-black text-lg font-medium leading-relaxed border-r-4 border-black pr-4 mb-6">
                    Rasakan perjalanan digital yang mulus. Dari memilih hewan hingga menerima laporan distribusi, semuanya hanya berjarak beberapa klik.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffafcc] text-black text-sm font-bold uppercase tracking-wider border-2 border-black">
                    Platform Digital
                    <MaterialIcon icon="devices" className="text-base" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - Pemberdayaan Peternak */}
          <div className="flex w-full justify-start" data-aos="slide-right">
            <div className="relative w-full md:max-w-4xl bg-[#ffafcc] border-4 border-black shadow-[8px_8px_0px_0px_#000000] p-8 md:p-12 transition-all duration-300 hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-y-1 group">
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-white border-4 border-black flex items-center justify-center text-2xl font-black shadow-[4px_4px_0px_0px_#000000] z-20 text-black">
                03
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* Icon */}
                <div className="shrink-0 relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-[#bdbef5] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_#000000] relative z-10 group-hover:bg-white transition-colors duration-300">
                    <Handshake className="w-16 h-16 md:w-20 md:h-20 text-black group-hover:text-black fill-current" />
                  </div>
                  <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 border-4 border-black z-0"></div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-4xl md:text-5xl font-black text-black mb-4 uppercase tracking-tighter">
                    Pemberdayaan Peternak
                  </h3>
                  <p className="text-black text-lg font-medium leading-relaxed border-l-4 border-black pl-4 mb-6">
                    Setiap pembelian secara langsung mendukung kesejahteraan dan keberlanjutan peternak lokal, membantu ekonomi pedesaan berkembang.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-bold uppercase tracking-wider border-2 border-black">
                    <MaterialIcon icon="volunteer_activism" className="text-base" />
                    Dampak Sosial
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}