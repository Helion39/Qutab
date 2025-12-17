import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MaterialIcon from './MaterialIcon';

interface NavbarProps {
  isLoggedIn: boolean;
}

export default function Navbar({ isLoggedIn }: NavbarProps) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-[#fffbef] border-b-4 border-black">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_#000000] cursor-pointer">
            <MaterialIcon icon="volunteer_activism" />
          </div>
          <h2 className="text-black text-base md:text-xl font-bold tracking-tight uppercase">
            Qurban Tanpa Batas
          </h2>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            className="text-black text-sm font-bold uppercase hover:bg-[#ffafcc] px-2 py-1 border-2 border-transparent hover:border-black transition-all"
            href="#about"
          >
            Tentang Kami
          </a>
          <a
            className="text-black text-sm font-bold uppercase hover:bg-[#ffafcc] px-2 py-1 border-2 border-transparent hover:border-black transition-all"
            href="#products"
          >
            Produk
          </a>
          <a
            className="text-black text-sm font-bold uppercase hover:bg-[#ffafcc] px-2 py-1 border-2 border-transparent hover:border-black transition-all"
            href="#how-to-order"
          >
            Cara Pesan
          </a>
          <a
            className="text-black text-sm font-bold uppercase hover:bg-[#ffafcc] px-2 py-1 border-2 border-transparent hover:border-black transition-all"
            href="#gallery"
          >
            Galeri
          </a>
          <a
            className="text-black text-sm font-bold uppercase hover:bg-[#ffafcc] px-2 py-1 border-2 border-transparent hover:border-black transition-all"
            href="#faq"
          >
            FAQ
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(isLoggedIn ? '/dashboard' : '/login')}
            className="hidden md:flex items-center justify-center bg-[#ffafcc] h-10 px-6 text-black text-sm font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase hover:bg-[#ff9ebb]"
          >
            {isLoggedIn ? 'DASHBOARD' : 'MASUK'}
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 text-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] bg-white"
          >
            <MaterialIcon icon={mobileMenuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fffbef] border-t-4 border-black">
          <div className="flex flex-col">
            <a
              onClick={() => handleNavClick('#about')}
              className="text-black text-sm font-bold uppercase px-6 py-4 border-b-2 border-black hover:bg-[#ffafcc] active:bg-[#ffafcc] transition-all cursor-pointer"
            >
              Tentang Kami
            </a>
            <a
              onClick={() => handleNavClick('#products')}
              className="text-black text-sm font-bold uppercase px-6 py-4 border-b-2 border-black hover:bg-[#ffafcc] active:bg-[#ffafcc] transition-all cursor-pointer"
            >
              Produk
            </a>
            <a
              onClick={() => handleNavClick('#how-to-order')}
              className="text-black text-sm font-bold uppercase px-6 py-4 border-b-2 border-black hover:bg-[#ffafcc] active:bg-[#ffafcc] transition-all cursor-pointer"
            >
              Cara Pesan
            </a>
            <a
              onClick={() => handleNavClick('#gallery')}
              className="text-black text-sm font-bold uppercase px-6 py-4 border-b-2 border-black hover:bg-[#ffafcc] active:bg-[#ffafcc] transition-all cursor-pointer"
            >
              Galeri
            </a>
            <a
              onClick={() => handleNavClick('#faq')}
              className="text-black text-sm font-bold uppercase px-6 py-4 border-b-2 border-black hover:bg-[#ffafcc] active:bg-[#ffafcc] transition-all cursor-pointer"
            >
              FAQ
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate(isLoggedIn ? '/dashboard' : '/login');
              }}
              className="text-black text-sm font-bold uppercase px-6 py-4 bg-[#ffafcc] border-b-2 border-black hover:bg-[#ff9ebb] active:bg-[#ff9ebb] transition-all"
            >
              {isLoggedIn ? 'DASHBOARD' : 'MASUK'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}