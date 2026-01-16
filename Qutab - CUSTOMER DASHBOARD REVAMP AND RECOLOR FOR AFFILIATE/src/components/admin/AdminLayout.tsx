import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MaterialIcon from '../MaterialIcon';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/admin/dashboard', icon: 'dashboard', label: 'Dashboard', color: 'blue' },
    { path: '/admin/dashboard/affiliates', icon: 'groups', label: 'Affiliates', color: 'purple' },
    { path: '/admin/dashboard/bank-verification', icon: 'verified_user', label: 'Bank Verification', color: 'yellow' },
    { path: '/admin/referrals', icon: 'link', label: 'Referrals', color: 'teal' },
    { path: '/admin/customers', icon: 'person', label: 'Customers', color: 'indigo' },
    { path: '/admin/dashboard/orders', icon: 'shopping_bag', label: 'Orders', color: 'green' },
    { path: '/admin/dashboard/products', icon: 'inventory_2', label: 'Products', color: 'orange' },
    { path: '/admin/dashboard/payouts', icon: 'payments', label: 'Payouts', color: 'red' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 admin-scrollbar">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 flex flex-col flex-shrink-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand / Logo Area */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-gray-200">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <MaterialIcon icon="admin_panel_settings" className="text-xl" />
              </div>
              <div>
                <h1 className="font-bold text-sm text-gray-900">Admin Panel</h1>
                <p className="text-xs text-gray-500">Qurban Tanpa Batas</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="size-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors"
          >
            <MaterialIcon icon={isSidebarCollapsed ? 'menu' : 'menu_open'} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                title={isSidebarCollapsed ? item.label : ''}
              >
                <MaterialIcon
                  icon={item.icon}
                  className={`text-xl ${isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}`}
                />
                {!isSidebarCollapsed && <span className="text-sm">{item.label}</span>}
                {!isSidebarCollapsed && isActive(item.path) && (
                  <div className="ml-auto size-1.5 rounded-full bg-blue-600"></div>
                )}
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className={`${isSidebarCollapsed ? '' : 'px-3 mb-2'}`}>
              {!isSidebarCollapsed && (
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Settings
                </p>
              )}
            </div>
            <Link
              to="/admin/settings"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive('/admin/settings')
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'hover:bg-gray-100 text-gray-700'
              } ${isSidebarCollapsed ? 'justify-center' : ''}`}
              title={isSidebarCollapsed ? 'Settings' : ''}
            >
              <MaterialIcon
                icon="settings"
                className={`text-xl ${isActive('/admin/settings') ? 'text-blue-600' : 'text-gray-500'}`}
              />
              {!isSidebarCollapsed && <span className="text-sm">Settings</span>}
              {!isSidebarCollapsed && isActive('/admin/settings') && (
                <div className="ml-auto size-1.5 rounded-full bg-blue-600"></div>
              )}
            </Link>
          </div>
        </nav>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-gray-200">
          {!isSidebarCollapsed ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="size-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  AD
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">Admin User</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 h-9 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
              >
                <MaterialIcon icon="logout" className="text-[18px]" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center h-10 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors"
              title="Logout"
            >
              <MaterialIcon icon="logout" className="text-xl" />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 px-6 flex items-center justify-between border-b border-gray-200 bg-white">
          {/* Page Title - will be set by children */}
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900">
              {location.pathname === '/admin/dashboard' && 'Dashboard Overview'}
              {location.pathname === '/admin/dashboard/affiliates' && 'Affiliate Management'}
              {location.pathname === '/admin/dashboard/bank-verification' && 'Bank Verification'}
              {location.pathname === '/admin/referrals' && 'Referral Management'}
              {location.pathname === '/admin/customers' && 'Customer Management'}
              {location.pathname === '/admin/dashboard/orders' && 'Order Management'}
              {location.pathname === '/admin/dashboard/products' && 'Product Management'}
              {location.pathname === '/admin/dashboard/payouts' && 'Payout Requests'}
              {location.pathname === '/admin/settings' && 'Settings'}
            </h2>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 h-9 pl-9 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <MaterialIcon
                icon="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]"
              />
            </div>
            <button className="size-9 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600 relative transition-colors">
              <MaterialIcon icon="notifications" className="text-xl" />
              <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">{children}</div>
      </main>
    </div>
  );
}