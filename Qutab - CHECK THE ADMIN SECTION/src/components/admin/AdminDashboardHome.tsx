import MaterialIcon from '../MaterialIcon';

export default function AdminDashboardHome() {
  const stats = [
    {
      label: 'Total Revenue',
      value: 'Rp 248.5M',
      change: '+12.5%',
      trend: 'up',
      icon: 'payments',
      color: 'blue',
    },
    {
      label: 'Total Orders',
      value: '1,247',
      change: '+8.2%',
      trend: 'up',
      icon: 'shopping_bag',
      color: 'green',
    },
    {
      label: 'Active Affiliates',
      value: '89',
      change: '+15.3%',
      trend: 'up',
      icon: 'groups',
      color: 'purple',
    },
    {
      label: 'Pending Payouts',
      value: 'Rp 12.8M',
      change: '5 requests',
      trend: 'neutral',
      icon: 'account_balance_wallet',
      color: 'orange',
    },
  ];

  const recentOrders = [
    { id: 'QTB-2024-156', customer: 'Ahmad Rahman', animal: 'Kambing Premium', amount: 'Rp 3.800.000', status: 'pending', date: '2024-06-10' },
    { id: 'QTB-2024-155', customer: 'Siti Nurhaliza', animal: 'Sapi Kolektif (1/7)', amount: 'Rp 2.800.000', status: 'paid', date: '2024-06-10' },
    { id: 'QTB-2024-154', customer: 'Budi Santoso', animal: 'Kambing Standard', amount: 'Rp 2.500.000', status: 'processing', date: '2024-06-09' },
    { id: 'QTB-2024-153', customer: 'Dewi Lestari', animal: 'Sapi Utuh', amount: 'Rp 19.500.000', status: 'completed', date: '2024-06-09' },
    { id: 'QTB-2024-152', customer: 'Hendra Wijaya', animal: 'Domba Garut', amount: 'Rp 4.200.000', status: 'paid', date: '2024-06-08' },
  ];

  const pendingAffiliates = [
    { name: 'Muhammad Faisal', email: 'faisal@email.com', date: '2024-06-10', referrals: 0 },
    { name: 'Rina Kusuma', email: 'rina.k@email.com', date: '2024-06-09', referrals: 0 },
    { name: 'Agus Setiawan', email: 'agus.s@email.com', date: '2024-06-09', referrals: 0 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'processing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'paid':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`size-12 rounded-lg ${getStatColor(stat.color)} flex items-center justify-center`}>
                <MaterialIcon icon={stat.icon} className="text-2xl" />
              </div>
              {stat.trend !== 'neutral' && (
                <div className={`flex items-center gap-1 text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  <MaterialIcon icon={stat.trend === 'up' ? 'trending_up' : 'trending_down'} className="text-[18px]" />
                  {stat.change}
                </div>
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
              {stat.trend === 'neutral' && (
                <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders - 2/3 width */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
            <a href="/admin/dashboard/orders" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All
              <MaterialIcon icon="arrow_forward" className="text-[16px]" />
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Animal</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{order.id}</div>
                      <div className="text-xs text-gray-500">{order.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.animal}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{order.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Affiliates - 1/3 width */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Pending Affiliates</h3>
            <span className="size-6 rounded-full bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center">
              {pendingAffiliates.length}
            </span>
          </div>
          <div className="p-6 space-y-4">
            {pendingAffiliates.map((affiliate, index) => (
              <div key={index} className="flex items-start justify-between pb-4 border-b border-gray-100 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{affiliate.name}</p>
                  <p className="text-xs text-gray-500 truncate">{affiliate.email}</p>
                  <p className="text-xs text-gray-400 mt-1">{affiliate.date}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button className="size-8 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 flex items-center justify-center transition-colors">
                    <MaterialIcon icon="check" className="text-[18px]" />
                  </button>
                  <button className="size-8 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors">
                    <MaterialIcon icon="close" className="text-[18px]" />
                  </button>
                </div>
              </div>
            ))}
            <a href="/admin/dashboard/affiliates" className="block text-center text-sm font-semibold text-blue-600 hover:text-blue-700 py-2">
              View All Applications →
            </a>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="/admin/dashboard/orders" className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all group">
          <div className="size-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <MaterialIcon icon="add_shopping_cart" className="text-2xl" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Process New Orders</h3>
          <p className="text-sm text-gray-500">Review and process pending orders</p>
        </a>
        <a href="/admin/dashboard/products" className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all group">
          <div className="size-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <MaterialIcon icon="inventory_2" className="text-2xl" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Manage Products</h3>
          <p className="text-sm text-gray-500">Update catalog and inventory</p>
        </a>
        <a href="/admin/dashboard/payouts" className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all group">
          <div className="size-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <MaterialIcon icon="account_balance" className="text-2xl" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Process Payouts</h3>
          <p className="text-sm text-gray-500">Handle affiliate commission requests</p>
        </a>
      </div>
    </div>
  );
}