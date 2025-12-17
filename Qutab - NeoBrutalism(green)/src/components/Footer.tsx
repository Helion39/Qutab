import React from 'react';
import MaterialIcon from './MaterialIcon';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t-8 border-[#cecd34]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b-2 border-white/20 pb-12">
          {/* Brand Column */}
          <div className="md:col-span-1" data-aos="fade-up" data-aos-delay="0">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center size-10 bg-[#cecd34] text-black border-2 border-white shadow-[4px_4px_0px_0px_#ffffff]">
                <MaterialIcon icon="volunteer_activism" className="text-xl" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-wider">
                Qurban Tanpa Batas
              </h2>
            </div>
            <p className="text-sm text-gray-300 font-mono leading-relaxed mb-6">
              Memfasilitasi Ibadah Anda, memberdayakan peternak, dan memberi makan yang membutuhkan. Berizin dan Terpercaya.
            </p>
            <div className="flex gap-4">
              <a
                className="w-10 h-10 bg-white text-black border-2 border-black flex items-center justify-center hover:bg-[#cecd34] hover:translate-y-[-4px] transition-all shadow-[4px_4px_0px_0px_#cecd34]"
                href="#"
              >
                <span className="text-xs font-black">IG</span>
              </a>
              <a
                className="w-10 h-10 bg-white text-black border-2 border-black flex items-center justify-center hover:bg-[#cecd34] hover:translate-y-[-4px] transition-all shadow-[4px_4px_0px_0px_#cecd34]"
                href="#"
              >
                <span className="text-xs font-black">FB</span>
              </a>
              <a
                className="w-10 h-10 bg-white text-black border-2 border-black flex items-center justify-center hover:bg-[#cecd34] hover:translate-y-[-4px] transition-all shadow-[4px_4px_0px_0px_#cecd34]"
                href="#"
              >
                <span className="text-xs font-black">YT</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-lg font-black uppercase text-[#cecd34] mb-6">
              Tautan Cepat
            </h3>
            <ul className="space-y-4 text-sm font-bold text-gray-300">
              <li>
                <a className="hover:text-[#cecd34] hover:underline decoration-2 underline-offset-4 transition-all" href="#">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a className="hover:text-[#cecd34] hover:underline decoration-2 underline-offset-4 transition-all" href="#">
                  Peternak Kami
                </a>
              </li>
              <li>
                <a className="hover:text-[#cecd34] hover:underline decoration-2 underline-offset-4 transition-all" href="#">
                  Dokumentasi
                </a>
              </li>
              <li>
                <a className="hover:text-[#cecd34] hover:underline decoration-2 underline-offset-4 transition-all" href="#">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div data-aos="fade-up" data-aos-delay="400">
            <h3 className="text-lg font-black uppercase text-[#cecd34] mb-6">Produk</h3>
            <ul className="space-y-4 text-sm font-bold text-gray-300">
              <li>
                <a className="hover:text-[#cecd34] hover:underline decoration-2 underline-offset-4 transition-all" href="#">
                  Kambing Standard
                </a>
              </li>
              <li>
                <a className="hover:text-[#cecd34] hover:underline decoration-2 underline-offset-4 transition-all" href="#">
                  Kambing Premium
                </a>
              </li>
              <li>
                <a className="hover:text-[#cecd34] hover:underline decoration-2 underline-offset-4 transition-all" href="#">
                  Sapi Patungan
                </a>
              </li>
              <li>
                <a className="hover:text-[#cecd34] hover:underline decoration-2 underline-offset-4 transition-all" href="#">
                  Qurban Palestina
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div data-aos="fade-up" data-aos-delay="600">
            <h3 className="text-lg font-black uppercase text-[#cecd34] mb-6">
              Hubungi Kami
            </h3>
            <ul className="space-y-4 text-sm font-bold text-gray-300">
              <li className="flex items-start gap-3">
                <MaterialIcon icon="location_on" className="text-[#cecd34] text-sm mt-1" />
                <span>
                  Jl. Kebaikan No. 99,
                  <br />
                  Jakarta Selatan, Indonesia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MaterialIcon icon="call" className="text-[#cecd34] text-sm" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <MaterialIcon icon="mail" className="text-[#cecd34] text-sm" />
                <span>salam@qurbantanpabatas.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm font-mono text-gray-500">
          <p>© 2024 Qurban Tanpa Batas. Hak cipta dilindungi undang-undang.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a className="hover:text-white" href="#">
              Kebijakan Privasi
            </a>
            <a className="hover:text-white" href="#">
              Syarat & Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
