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
    <div className="flex h-screen overflow-hidden bg-[#f7f8f6] dark:bg-[#182210]">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-[#23301a] border-r border-gray-200 dark:border-gray-800 flex flex-col flex-shrink-0 z-20 h-full">
        {/* Brand / Logo Area */}
        <div className="p-6 flex items-center gap-3">
          <div className="size-10 rounded-xl bg-[#6dec13] flex items-center justify-center text-[#131b0d]">
            <MaterialIcon icon="volunteer_activism" className="filled text-2xl" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-[#131b0d] dark:text-white leading-tight">
              Qurban<br />Tanpa Batas
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto">
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              isActive('/dashboard')
                ? 'bg-[#6dec13]/20 text-[#131b0d] dark:text-white font-semibold'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
          >
            <MaterialIcon
              icon="dashboard"
              className={isActive('/dashboard') ? 'filled text-[#5bc710] dark:text-[#6dec13]' : ''}
            />
            <span className="text-sm">Dashboard</span>
          </Link>

          <Link
            to="/dashboard/catalogue"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              isActive('/dashboard/catalogue')
                ? 'bg-[#6dec13]/20 text-[#131b0d] dark:text-white font-semibold'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
          >
            <MaterialIcon
              icon="storefront"
              className={isActive('/dashboard/catalogue') ? 'filled text-[#5bc710] dark:text-[#6dec13]' : ''}
            />
            <span className="text-sm">Product Catalog</span>
          </Link>

          <Link
            to="/dashboard/wishlist"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              isActive('/dashboard/wishlist')
                ? 'bg-[#6dec13]/20 text-[#131b0d] dark:text-white font-semibold'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
          >
            <MaterialIcon
              icon="favorite"
              className={isActive('/dashboard/wishlist') ? 'filled text-[#5bc710] dark:text-[#6dec13]' : ''}
            />
            <span className="text-sm">Wishlist</span>
          </Link>

          <Link
            to="/dashboard/payment"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              isActive('/dashboard/payment')
                ? 'bg-[#6dec13]/20 text-[#131b0d] dark:text-white font-semibold'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
          >
            <MaterialIcon
              icon="receipt_long"
              className={isActive('/dashboard/payment') ? 'filled text-[#5bc710] dark:text-[#6dec13]' : ''}
            />
            <span className="text-sm">My Qurban / Payments</span>
          </Link>

          <div className="mt-6 px-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Settings</p>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors group"
            >
              <MaterialIcon icon="settings" className="group-hover:text-[#6dec13]" />
              <span className="text-sm">Account Settings</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors group"
            >
              <MaterialIcon icon="help" className="group-hover:text-[#6dec13]" />
              <span className="text-sm">Help Center</span>
            </a>
          </div>
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-black/20">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="size-10 rounded-full bg-cover bg-center border-2 border-white dark:border-gray-700 shadow-sm"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDYjUU6vVBxaaUgK4e9nfNMBeI-B4oKxra-N1xCLGde10rmVFswV1-sui5NEPHieJaOxwa8jc8ngmwzVVE5BlMySWW0nbiGLgaqjW7lSZDldwI2QAsh7wVKlQQWh-s7HE9-Wxf5W2woAC8Z48btQz3dxr6WPWiIc1R3PsUIjsQRZmekgKvw-j92IyN85BB4nK9zqbFK_SkbOdQnXZUvsL9V0sxhFtV3FX21-28iECBMUqSmqBbD9ScE9uB8J2uXC76-kcrbrLMyVv4')"
              }}
            ></div>
            <div className="flex flex-col overflow-hidden">
              <p className="text-sm font-bold text-[#131b0d] dark:text-white truncate">Ahmad Fulan</p>
              <p className="text-xs text-[#5bc710] dark:text-[#6dec13] font-medium">Gold Donor</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 h-10 bg-white dark:bg-[#23301a] border border-gray-200 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 text-red-600 dark:text-red-400 rounded-lg text-sm font-semibold transition-all"
          >
            <MaterialIcon icon="logout" className="text-[18px]" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Header */}
        <header className="h-20 px-8 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#182210]/80 backdrop-blur-md sticky top-0 z-10">
          {/* Breadcrumbs / Title */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Home</span>
              <MaterialIcon icon="chevron_right" className="text-[14px]" />
              <span className="text-[#131b0d] dark:text-white font-medium">
                {location.pathname === '/dashboard' && 'Dashboard'}
                {location.pathname === '/dashboard/catalogue' && 'Catalog'}
                {location.pathname === '/dashboard/wishlist' && 'Wishlist'}
                {location.pathname === '/dashboard/payment' && 'Payments'}
              </span>
            </div>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            <div className="relative w-80 hidden md:block">
              <MaterialIcon icon="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full pl-10 pr-4 h-10 rounded-lg bg-[#f7f8f6] dark:bg-[#23301a] border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6dec13]/50 text-sm text-[#131b0d] dark:text-white placeholder-gray-400"
                placeholder="Search animals (e.g., Goat Type A)..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="size-10 rounded-full bg-white dark:bg-[#23301a] border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors relative">
              <MaterialIcon icon="notifications" />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white dark:border-[#23301a]"></span>
            </button>
            <button className="size-10 rounded-full bg-white dark:bg-[#23301a] border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
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
