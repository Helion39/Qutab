import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MaterialIcon from '../../MaterialIcon';

interface AffiliateDashboardLayoutProps {
  children: ReactNode;
}

export default function AffiliateDashboardLayout({ children }: AffiliateDashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [infoAffiliateOpen, setInfoAffiliateOpen] = useState(true);

  const handleLogout = () => {
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-[#2d1b24]">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-[#3d2531] border-r border-gray-100 dark:border-gray-800 flex flex-col flex-shrink-0 z-20 h-full">
        {/* Brand / Logo Area */}
        <div className="p-6 flex items-center gap-3">
          <div className="size-10 rounded-xl bg-[#bdbef5] flex items-center justify-center text-white">
            <MaterialIcon icon="group" className="filled text-2xl" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-[#4a2c3a] dark:text-white leading-tight">
              Qutab<br />Affiliator
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto">
          <Link
            to="/affiliate/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
              isActive('/affiliate/dashboard')
                ? 'bg-[#e1e4ff] dark:bg-[#bdbef5]/20 text-[#4a2c3a] dark:text-white font-semibold'
                : 'hover:bg-[#e1e4ff] dark:hover:bg-gray-800 text-[#7d5a6a] dark:text-gray-300'
            }`}
          >
            <MaterialIcon
              icon="dashboard"
              className={isActive('/affiliate/dashboard') ? 'filled text-black dark:text-white' : 'group-hover:text-[#bdbef5]'}
            />
            <span className="font-medium text-sm">Dasbor</span>
          </Link>

          <Link
            to="/affiliate/dashboard/banner-link"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
              isActive('/affiliate/dashboard/banner-link')
                ? 'bg-[#e1e4ff] dark:bg-[#bdbef5]/20 text-[#4a2c3a] dark:text-white font-semibold'
                : 'hover:bg-[#e1e4ff] dark:hover:bg-gray-800 text-[#7d5a6a] dark:text-gray-300'
            }`}
          >
            <MaterialIcon
              icon="link"
              className={isActive('/affiliate/dashboard/banner-link') ? 'filled text-black dark:text-white' : 'group-hover:text-[#bdbef5]'}
            />
            <span className="font-medium text-sm">Banner dan Link</span>
          </Link>

          <Link
            to="/affiliate/dashboard/statistik"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
              isActive('/affiliate/dashboard/statistik')
                ? 'bg-[#e1e4ff] dark:bg-[#bdbef5]/20 text-[#4a2c3a] dark:text-white font-semibold'
                : 'hover:bg-[#e1e4ff] dark:hover:bg-gray-800 text-[#7d5a6a] dark:text-gray-300'
            }`}
          >
            <MaterialIcon
              icon="bar_chart"
              className={isActive('/affiliate/dashboard/statistik') ? 'filled text-black dark:text-white' : 'group-hover:text-[#bdbef5]'}
            />
            <span className="font-medium text-sm">Statistik</span>
          </Link>

          <Link
            to="/affiliate/dashboard/rekening"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
              isActive('/affiliate/dashboard/rekening')
                ? 'bg-[#e1e4ff] dark:bg-[#bdbef5]/20 text-[#4a2c3a] dark:text-white font-semibold'
                : 'hover:bg-[#e1e4ff] dark:hover:bg-gray-800 text-[#7d5a6a] dark:text-gray-300'
            }`}
          >
            <MaterialIcon
              icon="account_balance"
              className={isActive('/affiliate/dashboard/rekening') ? 'filled text-black dark:text-white' : 'group-hover:text-[#bdbef5]'}
            />
            <span className="font-medium text-sm">Rekening Pembayaran Komisi</span>
          </Link>

          <Link
            to="/affiliate/dashboard/commission"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
              isActive('/affiliate/dashboard/commission')
                ? 'bg-[#e1e4ff] dark:bg-[#bdbef5]/20 text-[#4a2c3a] dark:text-white font-semibold'
                : 'hover:bg-[#e1e4ff] dark:hover:bg-gray-800 text-[#7d5a6a] dark:text-gray-300'
            }`}
          >
            <MaterialIcon
              icon="payments"
              className={isActive('/affiliate/dashboard/commission') ? 'filled text-black dark:text-white' : 'group-hover:text-[#bdbef5]'}
            />
            <span className="font-medium text-sm">Pembayaran Komisi</span>
          </Link>

          <Link
            to="/affiliate/dashboard/leads"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
              isActive('/affiliate/dashboard/leads')
                ? 'bg-[#e1e4ff] dark:bg-[#bdbef5]/20 text-[#4a2c3a] dark:text-white font-semibold'
                : 'hover:bg-[#e1e4ff] dark:hover:bg-gray-800 text-[#7d5a6a] dark:text-gray-300'
            }`}
          >
            <MaterialIcon
              icon="people"
              className={isActive('/affiliate/dashboard/leads') ? 'filled text-black dark:text-white' : 'group-hover:text-[#bdbef5]'}
            />
            <span className="font-medium text-sm">Leads Anda</span>
          </Link>

          <Link
            to="/affiliate/dashboard/kupon"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
              isActive('/affiliate/dashboard/kupon')
                ? 'bg-[#e1e4ff] dark:bg-[#bdbef5]/20 text-[#4a2c3a] dark:text-white font-semibold'
                : 'hover:bg-[#e1e4ff] dark:hover:bg-gray-800 text-[#7d5a6a] dark:text-gray-300'
            }`}
          >
            <MaterialIcon
              icon="confirmation_number"
              className={isActive('/affiliate/dashboard/kupon') ? 'filled text-black dark:text-white' : 'group-hover:text-[#bdbef5]'}
            />
            <span className="font-medium text-sm">Kupon Diskon</span>
          </Link>

          <Link
            to="/affiliate/dashboard/helpdesk"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
              isActive('/affiliate/dashboard/helpdesk')
                ? 'bg-[#e1e4ff] dark:bg-[#bdbef5]/20 text-[#4a2c3a] dark:text-white font-semibold'
                : 'hover:bg-[#e1e4ff] dark:hover:bg-gray-800 text-[#7d5a6a] dark:text-gray-300'
            }`}
          >
            <MaterialIcon
              icon="help"
              className={isActive('/affiliate/dashboard/helpdesk') ? 'filled text-black dark:text-white' : 'group-hover:text-[#bdbef5]'}
            />
            <span className="font-medium text-sm">Helpdesk</span>
          </Link>

          <Link
            to="/affiliate/dashboard/profile"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
              isActive('/affiliate/dashboard/profile')
                ? 'bg-[#e1e4ff] dark:bg-[#bdbef5]/20 text-[#4a2c3a] dark:text-white font-semibold'
                : 'hover:bg-[#e1e4ff] dark:hover:bg-gray-800 text-[#7d5a6a] dark:text-gray-300'
            }`}
          >
            <MaterialIcon
              icon="person"
              className={isActive('/affiliate/dashboard/profile') ? 'filled text-black dark:text-white' : 'group-hover:text-[#bdbef5]'}
            />
            <span className="font-medium text-sm">Profil Member</span>
          </Link>
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
              <p className="text-sm font-bold text-[#4a2c3a] dark:text-white truncate">Siti Aminah</p>
              <p className="text-xs text-[#bdbef5] dark:text-[#bdbef5] font-medium">Affiliator Pro</p>
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
              <a href="#" className="hover:text-[#bdbef5] transition-colors">Beranda</a>
              <MaterialIcon icon="chevron_right" className="text-[14px]" />
              <span className="text-[#4a2c3a] dark:text-white font-medium">
                {location.pathname === '/affiliate/dashboard' && 'Dasbor'}
                {location.pathname === '/affiliate/dashboard/profile' && 'Profil Member'}
                {location.pathname === '/affiliate/dashboard/banner-link' && 'Banner dan Link'}
                {location.pathname === '/affiliate/dashboard/statistik' && 'Statistik'}
                {location.pathname === '/affiliate/dashboard/rekening' && 'Rekening Pembayaran Komisi'}
                {location.pathname === '/affiliate/dashboard/commission' && 'Pembayaran Komisi'}
                {location.pathname === '/affiliate/dashboard/leads' && 'Leads Anda'}
                {location.pathname === '/affiliate/dashboard/helpdesk' && 'Helpdesk'}
              </span>
            </div>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            <button className="size-10 rounded-full bg-white dark:bg-[#3d2531] border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[#7d5a6a] dark:text-gray-300 hover:bg-[#e1e4ff] dark:hover:bg-gray-800 transition-colors relative">
              <MaterialIcon icon="notifications" />
              <span className="absolute top-2 right-2 size-2 bg-[#bdbef5] rounded-full border border-white dark:border-[#3d2531]"></span>
            </button>
            <button className="size-10 rounded-full bg-white dark:bg-[#3d2531] border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[#7d5a6a] dark:text-gray-300 hover:bg-[#e1e4ff] dark:hover:bg-gray-800 transition-colors">
              <MaterialIcon icon="mail" />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}