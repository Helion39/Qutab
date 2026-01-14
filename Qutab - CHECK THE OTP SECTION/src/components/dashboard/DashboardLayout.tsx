import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MaterialIcon from '../MaterialIcon';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen overflow-hidden bg-[#fffbef] dark:bg-[#2d1b24]">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-[#3d2531] border-r border-gray-100 dark:border-gray-800 flex flex-col flex-shrink-0 z-20 h-full">
        {/* Brand / Logo Area */}
        <div className="p-6 flex items-center gap-3">
          <div className="size-10 rounded-xl bg-[#ffafcc] flex items-center justify-center text-white">
            <MaterialIcon icon="volunteer_activism" className="filled text-2xl" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-[#4a2c3a] dark:text-white leading-tight">
              Qurban<br />Tanpa Batas
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto">
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
              isActive('/dashboard')
                ? 'bg-[#ffe1ed] dark:bg-[#ffafcc]/20 text-[#7d5a6a] dark:text-white font-semibold'
                : 'hover:bg-[#ffe1ed] dark:hover:bg-gray-800 text-[#7d5a6a] dark:text-gray-300'
            }`}
          >
            <MaterialIcon
              icon="dashboard"
              className={isActive('/dashboard') ? 'filled text-[#7d5a6a] dark:text-[#ffafcc]' : 'group-hover:text-[#ffafcc]'}
            />
            <span className="font-medium text-sm">Dasbor</span>
          </Link>

          <Link
            to="/dashboard/catalogue"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
              isActive('/dashboard/catalogue')
                ? 'bg-[#ffe1ed] dark:bg-[#ffafcc]/20 text-[#7d5a6a] dark:text-white font-semibold'
                : 'hover:bg-[#ffe1ed] dark:hover:bg-gray-800 text-[#7d5a6a] dark:text-gray-300'
            }`}
          >
            <MaterialIcon
              icon="storefront"
              className={isActive('/dashboard/catalogue') ? 'filled text-[#7d5a6a] dark:text-[#ffafcc]' : 'group-hover:text-[#ffafcc]'}
            />
            <span className="font-medium text-sm">Katalog Produk</span>
          </Link>

          <Link
            to="/dashboard/wishlist"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
              isActive('/dashboard/wishlist')
                ? 'bg-[#ffe1ed] dark:bg-[#ffafcc]/20 text-[#7d5a6a] dark:text-white font-semibold'
                : 'hover:bg-[#ffe1ed] dark:hover:bg-gray-800 text-[#7d5a6a] dark:text-gray-300'
            }`}
          >
            <MaterialIcon
              icon="favorite"
              className={isActive('/dashboard/wishlist') ? 'filled text-[#7d5a6a] dark:text-[#ffafcc]' : 'group-hover:text-[#ffafcc]'}
            />
            <span className="font-medium text-sm">Daftar Keinginan</span>
          </Link>

          <Link
            to="/dashboard/payment"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
              isActive('/dashboard/payment')
                ? 'bg-[#ffe1ed] dark:bg-[#ffafcc]/20 text-[#7d5a6a] dark:text-white font-semibold'
                : 'hover:bg-[#ffe1ed] dark:hover:bg-gray-800 text-[#7d5a6a] dark:text-gray-300'
            }`}
          >
            <MaterialIcon
              icon="receipt_long"
              className={isActive('/dashboard/payment') ? 'filled text-[#7d5a6a] dark:text-[#ffafcc]' : 'group-hover:text-[#ffafcc]'}
            />
            <span className="font-medium text-sm">Qurban Saya / Pembayaran</span>
          </Link>

          <div className="mt-6 px-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Pengaturan</p>
            <Link
              to="/dashboard/settings"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
                isActive('/dashboard/settings')
                  ? 'bg-[#ffe1ed] dark:bg-[#ffafcc]/20 text-[#7d5a6a] dark:text-white font-semibold'
                  : 'hover:bg-[#ffe1ed] dark:hover:bg-gray-800 text-[#7d5a6a] dark:text-gray-300'
              }`}
            >
              <MaterialIcon 
                icon="settings" 
                className={isActive('/dashboard/settings') ? 'filled text-[#7d5a6a] dark:text-[#ffafcc]' : 'group-hover:text-[#ffafcc]'} 
              />
              <span className="font-medium text-sm">Pengaturan Akun</span>
            </Link>
            <Link
              to="/dashboard/help"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
                isActive('/dashboard/help')
                  ? 'bg-[#ffe1ed] dark:bg-[#ffafcc]/20 text-[#7d5a6a] dark:text-white font-semibold'
                  : 'hover:bg-[#ffe1ed] dark:hover:bg-gray-800 text-[#7d5a6a] dark:text-gray-300'
              }`}
            >
              <MaterialIcon 
                icon="help" 
                className={isActive('/dashboard/help') ? 'filled text-[#7d5a6a] dark:text-[#ffafcc]' : 'group-hover:text-[#ffafcc]'} 
              />
              <span className="font-medium text-sm">Pusat Bantuan</span>
            </Link>
          </div>
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-black/20">
          <a href="#" className="flex items-center gap-3 mb-4 hover:bg-white/50 dark:hover:bg-white/5 p-2 rounded-lg transition-colors">
            <div
              className="size-10 rounded-full bg-cover bg-center border-2 border-white dark:border-gray-700 shadow-sm"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDYjUU6vVBxaaUgK4e9nfNMBeI-B4oKxra-N1xCLGde10rmVFswV1-sui5NEPHieJaOxwa8jc8ngmwzVVE5BlMySWW0nbiGLgaqjW7lSZDldwI2QAsh7wVKlQQWh-s7HE9-Wxf5W2woAC8Z48btQz3dxr6WPWiIc1R3PsUIjsQRZmekgKvw-j92IyN85BB4nK9zqbFK_SkbOdQnXZUvsL9V0sxhFtV3FX21-28iECBMUqSmqBbD9ScE9uB8J2uXC76-kcrbrLMyVv4')"
              }}
            ></div>
            <div className="flex flex-col overflow-hidden">
              <p className="text-sm font-bold text-[#4a2c3a] dark:text-white truncate">Ahmad Fulan</p>
              <p className="text-xs text-[#ffafcc] dark:text-[#ffafcc] font-medium">Donatur Emas</p>
            </div>
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 h-10 bg-white dark:bg-[#3d2531] border border-gray-200 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 text-red-400 dark:text-red-400 rounded-lg text-sm font-semibold transition-all"
          >
            <MaterialIcon icon="logout" className="text-[18px]" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Header */}
        <header className="h-20 px-8 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-[#2d1b24]/80 backdrop-blur-md sticky top-0 z-10">
          {/* Breadcrumbs / Title */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-sm text-[#7d5a6a] dark:text-gray-400">
              <a href="#" className="hover:text-[#ffafcc] transition-colors">Beranda</a>
              <MaterialIcon icon="chevron_right" className="text-[14px]" />
              <span className="text-[#4a2c3a] dark:text-white font-medium">
                {location.pathname === '/dashboard' && 'Dasbor'}
                {location.pathname === '/dashboard/catalogue' && 'Katalog'}
                {location.pathname === '/dashboard/wishlist' && 'Daftar Keinginan'}
                {location.pathname === '/dashboard/payment' && 'Pembayaran'}
                {location.pathname === '/dashboard/settings' && 'Pengaturan Akun'}
                {location.pathname === '/dashboard/help' && 'Pusat Bantuan'}
              </span>
            </div>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            <div className="relative w-80 hidden md:block group">
              <button className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bdbef5] hover:text-[#ffafcc] transition-colors">
                <MaterialIcon icon="search" />
              </button>
              <input
                className="w-full pl-10 pr-4 h-10 rounded-lg bg-[#ffe1ed]/30 dark:bg-[#3d2531] border border-transparent focus:bg-white focus:border-[#bdbef5] dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#bdbef5]/50 text-sm text-[#4a2c3a] dark:text-white placeholder-[#7d5a6a]/50 transition-all"
                placeholder="Cari hewan (misal: Kambing Tipe A)..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="size-10 rounded-full bg-white dark:bg-[#3d2531] border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[#7d5a6a] dark:text-gray-300 hover:bg-[#ffe1ed] dark:hover:bg-gray-800 transition-colors relative">
              <MaterialIcon icon="notifications" />
              <span className="absolute top-2 right-2 size-2 bg-[#ffafcc] rounded-full border border-white dark:border-[#3d2531]"></span>
            </button>
            <button className="size-10 rounded-full bg-white dark:bg-[#3d2531] border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[#7d5a6a] dark:text-gray-300 hover:bg-[#ffe1ed] dark:hover:bg-gray-800 transition-colors">
              <MaterialIcon icon="shopping_cart" />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}