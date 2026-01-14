import { DollarSign, TrendingUp, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AffiliateSection() {
  return (
    <div className="py-8 lg:py-12 bg-[#fffbef] border-t-8 border-black min-h-screen flex items-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Main Hero Card - Large */}
          <div className="lg:col-span-7 bg-[#ffafcc] border-4 border-black shadow-[12px_12px_0px_0px_#000000] p-6 md:p-8 lg:p-10 relative overflow-hidden">
            
            <div className="relative z-10">
              <div className="bg-black text-[#ffafcc] px-3 py-1.5 font-black uppercase text-xs inline-block mb-4 border-2 border-black">
                Program Affiliator
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black uppercase tracking-tight leading-[0.9] mb-4">
                Jadi<br />
                Affiliator<br />
                Qutab,<br />
                <span className="bg-black text-white px-3 inline-block mt-2">Dapatkan<br />Komisi!</span>
              </h2>
              <p className="text-black text-lg font-black leading-tight max-w-md mb-6 border-l-8 border-black pl-4">
                Promosikan Qutab dan dapatkan komisi untuk setiap pembelian qurban.
              </p>
              <Link
                to="/affiliate/register"
                className="inline-block px-8 py-4 bg-black text-white text-sm font-black uppercase tracking-wider border-4 border-black shadow-[6px_6px_0px_0px_white] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all"
              >
                Daftar Jadi Affiliator
              </Link>
            </div>
          </div>

          {/* Right Side - Stacked Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Card 1 - Komisi */}
            <div className="bg-[#bddcee] border-4 border-black shadow-[8px_8px_0px_0px_#000000] p-4 hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-y-1 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center">
                  <DollarSign className="w-7 h-7 text-black" strokeWidth={3} />
                </div>
                <span className="text-5xl font-black text-black opacity-10 leading-none">01</span>
              </div>
              <h3 className="text-xl font-black text-black uppercase mb-1.5 leading-tight">
                Komisi<br />Menarik
              </h3>
              <p className="text-black font-bold text-xs leading-relaxed">
                Dapatkan komisi untuk setiap transaksi sukses dari link referral Anda.
              </p>
            </div>

            {/* Card 2 - Dashboard */}
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000000] p-4 hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-y-1 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-[#ffafcc] border-4 border-black flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-black" strokeWidth={3} />
                </div>
                <span className="text-5xl font-black text-black opacity-10 leading-none">02</span>
              </div>
              <h3 className="text-xl font-black text-black uppercase mb-1.5 leading-tight">
                Dashboard<br />Lengkap
              </h3>
              <p className="text-black font-bold text-xs leading-relaxed">
                Pantau statistik klik, konversi, dan komisi secara real-time.
              </p>
            </div>

            {/* Card 3 - Support */}
            <div className="bg-[#bdbef5] border-4 border-black shadow-[8px_8px_0px_0px_#000000] p-4 hover:shadow-[12px_12px_0px_0px_#000000] hover:-translate-y-1 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-[#ffafcc] border-4 border-black flex items-center justify-center">
                  <Headphones className="w-7 h-7 text-black" strokeWidth={3} />
                </div>
                <span className="text-5xl font-black text-black opacity-10 leading-none">03</span>
              </div>
              <h3 className="text-xl font-black text-black uppercase mb-1.5 leading-tight">
                Support<br />Tim
              </h3>
              <p className="text-black font-bold text-xs leading-relaxed">
                Dapatkan bantuan dan materi promosi dari tim Qutab.
              </p>
            </div>
          </div>

          {/* Bottom Full-Width CTA */}
          <div className="lg:col-span-12 bg-[#bddcee] border-4 border-black shadow-[8px_8px_0px_0px_#000000] p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-2xl font-black text-black uppercase mb-1.5">
                  Sudah Punya Akun?
                </h3>
                <p className="text-black font-bold text-sm">
                  Masuk sekarang dan mulai promosikan Qutab!
                </p>
              </div>
              <Link
                className="px-8 py-4 bg-white text-black font-black uppercase tracking-wider border-4 border-black hover:bg-[#ffafcc] transition-colors shrink-0 text-sm"
                to="/affiliate/login"
              >
                Masuk di sini
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}