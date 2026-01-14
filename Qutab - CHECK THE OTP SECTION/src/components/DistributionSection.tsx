import MaterialIcon from './MaterialIcon';

export default function DistributionSection() {
  const locations = [
    'Palestina', 'Lampung', 'Padang Lawas U.', 'Banten', 'Bogor', 'Pangandaran',
    'Gunung Sindur', 'Bandung Barat', 'Boyolali', 'Wonosobo', 'Ungaran', 'Magelang',
    'Cilacap', 'Kediri', 'Jember', 'Trenggalek', 'Magetan', 'Situbondo',
    'Bangkalan', 'Bojonegoro', 'Mataram', 'Sumbawa', 'Dompu', 'Bima', 'NTT'
  ];

  return (
    <div className="py-20 bg-[#bdbef5] border-b-4 border-black relative overflow-hidden">
      {/* Dot Pattern Background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#000000 2px, transparent 2px)',
          backgroundSize: '30px 30px'
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Content */}
          <div className="w-full lg:w-1/2" data-aos="fade-right">
            <span className="bg-[#ffafcc] text-black px-3 py-1 font-bold uppercase tracking-widest text-sm border-2 border-black shadow-[4px_4px_0px_0px_#000000] mb-4 inline-block">
              Cakupan Luas
            </span>

            <h2 className="md:text-6xl font-black mt-4 mb-6 text-black uppercase tracking-tighter leading-none text-[40px]">
              Mendistribusikan <br />
              <span className="text-[#ffafcc]" style={{ WebkitTextStroke: '1px black' }}>
                Kebahagiaan
              </span>
            </h2>

            <p className="text-black mb-8 text-xl font-medium border-l-4 border-black pl-6">
              Kami memprioritaskan distribusi ke daerah dengan tingkat kemiskinan tinggi, pulau-pulau terpencil, dan zona konflik di mana bantuan sangat dibutuhkan.
            </p>

            <div className="flex items-center gap-5 p-6 bg-[#dfdffa] border-4 border-black shadow-[4px_4px_0px_0px_#000000] mb-10">
              <div className="flex items-center justify-center w-20 h-20 bg-[#ffafcc] border-4 border-black text-black shadow-[4px_4px_0px_0px_#000000]">
                <MaterialIcon icon="public" className="text-4xl" />
              </div>
              <div>
                <span className="block text-4xl sm:text-5xl font-black text-black tracking-tighter">
                  25+ Lokasi
                </span>
                <span className="text-black font-bold text-sm sm:text-base uppercase tracking-wider">
                  Di Seluruh Indonesia & Palestina
                </span>
              </div>
            </div>

            <div
              className="bg-white/40 p-6 border-2 border-black"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3 className="text-sm font-black text-black uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-[#ffafcc] border border-black"></span>
                Jaringan Distribusi Kami
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-2 text-sm text-black font-bold font-mono">
                {locations.map((location, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#ffafcc] border border-black"></span> {location}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Map */}
          <div
            className="w-full lg:w-1/2 relative mt-10 lg:mt-0 lg:self-center"
            data-aos="zoom-in"
            data-aos-duration="1200"
          >
            <div className="relative bg-black p-2 border-4 border-white shadow-[12px_12px_0px_0px_#ffafcc]">
              <img
                alt="Map of Indonesia with distribution points"
                className="w-full h-auto grayscale contrast-125 brightness-75 border-2 border-white"
                src="https://images.unsplash.com/photo-1660886023919-307e19c33554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWElMjBtYXB8ZW58MXx8fHwxNzY1Nzk3NzIzfDA&ixlib=rb-4.1.0&q=80&w=1080"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}