import MaterialIcon from './MaterialIcon';

export default function MissionSection() {
  return (
    <div className="py-20 bg-white border-b-4 border-black overflow-hidden" id="about">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div
            className="relative border-4 border-black shadow-[8px_8px_0px_0px_#000000] bg-[#ffafcc] p-2"
            data-aos="slide-right"
          >
            <img
              alt="Asian farmer smiling while feeding cattle in a green field"
              className="object-cover w-full h-full border-2 border-black grayscale hover:grayscale-0 transition-all duration-500"
              src="https://images.unsplash.com/photo-1634910958343-2f44bac612ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGZhcm1lciUyMGNhdHRsZXxlbnwxfHx8fDE3NjU3OTc3MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            />
            <div
              className="absolute -bottom-6 -right-6 bg-white border-4 border-black p-4 max-w-xs shadow-[4px_4px_0px_0px_#000000] hidden md:block z-10"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <p className="text-black font-bold italic text-sm">
                "Melalui Qurban Anda, penghidupan kami meningkat." <br />- Pak Asep, Peternak
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6 pt-10 lg:pt-0" data-aos="slide-left">
            <div className="inline-flex items-center gap-2 text-black font-black uppercase tracking-wide text-lg bg-[#ffafcc] w-fit px-3 border-2 border-black shadow-[4px_4px_0px_0px_#000000]">
              Misi Kami
            </div>

            <h2 className="lg:text-6xl font-black text-black leading-none uppercase tracking-tighter text-[41px]">
              Menghubungkan{' '}
              <span className="bg-black text-white px-2">Donatur</span> Kota dengan Masyarakat Desa
            </h2>

            <p className="text-black text-lg font-medium border-l-4 border-black pl-4">
              Qurban Tanpa Batas lebih dari sekadar platform untuk memesan hewan qurban. Kami adalah gerakan untuk memberdayakan peternak lokal di seluruh Indonesia.
            </p>

            <p className="text-black text-lg font-medium border-l-4 border-black pl-4">
              Dengan menghubungkan Anda langsung dengan peternak, kami menghilangkan perantara, memastikan harga yang lebih baik untuk Anda dan margin yang lebih tinggi bagi mereka.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <div
                className="flex flex-col gap-2 p-4 bg-[#fffbef] border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:bg-[#ffafcc] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <MaterialIcon icon="groups" className="text-black text-4xl" />
                <span className="font-black text-2xl text-black">1.000+ Peternak</span>
              </div>

              <div
                className="flex flex-col gap-2 p-4 bg-[#fffbef] border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:bg-[#ffafcc] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <MaterialIcon icon="location_on" className="text-black text-4xl" />
                <span className="font-black text-2xl text-black">50+ Desa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}