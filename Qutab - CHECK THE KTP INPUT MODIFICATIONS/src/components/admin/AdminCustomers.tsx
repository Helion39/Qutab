import { useState } from 'react';
import MaterialIcon from '../MaterialIcon';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'suspended';
  lastOrderDate?: string;
}

export default function AdminCustomers() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<'suspend' | 'activate' | 'reset'>('suspend');

  const customers: Customer[] = [
    {
      id: 1,
      name: 'Abdullah Rahman',
      email: 'abdullah.r@email.com',
      phone: '+62 812-3456-7890',
      joinedDate: '2024-05-15',
      totalOrders: 3,
      totalSpent: 4500000,
      status: 'active',
      lastOrderDate: '2024-06-10',
    },
    {
      id: 2,
      name: 'Fatimah Zahra',
      email: 'fatimah.z@email.com',
      phone: '+62 813-4567-8901',
      joinedDate: '2024-04-20',
      totalOrders: 5,
      totalSpent: 8500000,
      status: 'active',
      lastOrderDate: '2024-06-12',
    },
    {
      id: 3,
      name: 'Muhammad Irfan',
      email: 'irfan.m@email.com',
      phone: '+62 821-5678-9012',
      joinedDate: '2024-06-01',
      totalOrders: 1,
      totalSpent: 1500000,
      status: 'active',
      lastOrderDate: '2024-06-05',
    },
    {
      id: 4,
      name: 'Siti Aisyah',
      email: 'siti.a@email.com',
      phone: '+62 822-6789-0123',
      joinedDate: '2024-03-10',
      totalOrders: 7,
      totalSpent: 12000000,
      status: 'active',
      lastOrderDate: '2024-06-11',
    },
    {
      id: 5,
      name: 'Ahmad Fauzi',
      email: 'ahmad.f@email.com',
      phone: '+62 823-7890-1234',
      joinedDate: '2024-05-25',
      totalOrders: 2,
      totalSpent: 3000000,
      status: 'suspended',
      lastOrderDate: '2024-06-01',
    },
    {
      id: 6,
      name: 'Khadijah Hasna',
      email: 'khadijah.h@email.com',
      phone: '+62 824-8901-2345',
      joinedDate: '2024-06-08',
      totalOrders: 0,
      totalSpent: 0,
      status: 'active',
    },
  ];

  const handleAction = (customer: Customer, action: 'suspend' | 'activate' | 'reset') => {
    setSelectedCustomer(customer);
    setActionType(action);
    setShowActionModal(true);
  };

  const confirmAction = () => {
    if (!selectedCustomer) return;
    
    switch (actionType) {
      case 'suspend':
        alert(`Customer ${selectedCustomer.name} has been suspended.`);
        break;
      case 'activate':
        alert(`Customer ${selectedCustomer.name} has been activated.`);
        break;
      case 'reset':
        alert(`Password reset link sent to ${selectedCustomer.email}`);
        break;
    }
    
    setShowActionModal(false);
    setSelectedCustomer(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'suspended':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: customers.length,
    active: customers.filter((c) => c.status === 'active').length,
    suspended: customers.filter((c) => c.status === 'suspended').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <MaterialIcon icon="person" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Total Customers</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <MaterialIcon icon="check_circle" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              <p className="text-sm text-gray-500">Active</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <MaterialIcon icon="block" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.suspended}</p>
              <p className="text-sm text-gray-500">Suspended</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <MaterialIcon icon="payments" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {(stats.totalRevenue / 1000000).toFixed(1)}M
              </p>
              <p className="text-sm text-gray-500">Total Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <MaterialIcon
              icon="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
            />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                selectedStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setSelectedStatus('active')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                selectedStatus === 'active'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active ({stats.active})
            </button>
            <button
              onClick={() => setSelectedStatus('suspended')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                selectedStatus === 'suspended'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Suspended ({stats.suspended})
            </button>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{customer.name}</p>
                        <p className="text-sm text-gray-500">ID: #{customer.id.toString().padStart(4, '0')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{customer.email}</p>
                    <p className="text-sm text-gray-500">{customer.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{customer.joinedDate}</td>
                  <td className="px-6 py-4">
                    <p className="text-lg font-bold text-gray-900">{customer.totalOrders}</p>
                    {customer.lastOrderDate && (
                      <p className="text-xs text-gray-500">Last: {customer.lastOrderDate}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">
                      Rp {customer.totalSpent.toLocaleString('id-ID')}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(
                        customer.status
                      )}`}
                    >
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setShowModal(true);
                        }}
                        className="size-8 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 flex items-center justify-center transition-colors"
                        title="View Details"
                      >
                        <MaterialIcon icon="visibility" className="text-[18px]" />
                      </button>
                      {customer.status === 'active' ? (
                        <button
                          onClick={() => handleAction(customer, 'suspend')}
                          className="size-8 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors"
                          title="Suspend Customer"
                        >
                          <MaterialIcon icon="block" className="text-[18px]" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAction(customer, 'activate')}
                          className="size-8 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 flex items-center justify-center transition-colors"
                          title="Activate Customer"
                        >
                          <MaterialIcon icon="check_circle" className="text-[18px]" />
                        </button>
                      )}
                      <button
                        onClick={() => handleAction(customer, 'reset')}
                        className="size-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
                        title="Reset Password"
                      >
                        <MaterialIcon icon="lock_reset" className="text-[18px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {showModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Customer Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="size-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600"
              >
                <MaterialIcon icon="close" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{selectedCustomer.name}</h4>
                  <p className="text-sm text-gray-500">ID: #{selectedCustomer.id.toString().padStart(4, '0')}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Email</p>
                  <p className="text-sm text-gray-900">{selectedCustomer.email}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Phone</p>
                  <p className="text-sm text-gray-900">{selectedCustomer.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Joined Date</p>
                  <p className="text-sm text-gray-900">{selectedCustomer.joinedDate}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Status</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(
                      selectedCustomer.status
                    )}`}
                  >
                    {selectedCustomer.status.charAt(0).toUpperCase() + selectedCustomer.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedCustomer.totalOrders}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                  <p className="text-lg font-bold text-green-600">
                    Rp {(selectedCustomer.totalSpent / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Avg Order</p>
                  <p className="text-lg font-bold text-purple-600">
                    Rp {selectedCustomer.totalOrders > 0 
                      ? ((selectedCustomer.totalSpent / selectedCustomer.totalOrders) / 1000000).toFixed(1) 
                      : 0}M
                  </p>
                </div>
              </div>

              {/* Order History */}
              <div>
                <h5 className="font-bold text-gray-900 mb-3">Order History</h5>
                <div className="bg-gray-50 rounded-lg p-4">
                  {selectedCustomer.totalOrders > 0 ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-gray-200">
                        <div>
                          <p className="font-semibold text-gray-900">QTB-2024-001</p>
                          <p className="text-sm text-gray-500">Kambing Premium - 2024-06-10</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">Rp 1,500,000</p>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                            Completed
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 text-center py-2">
                        View all orders in Order Management
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">No orders yet</p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                {selectedCustomer.status === 'active' ? (
                  <button
                    onClick={() => {
                      setShowModal(false);
                      handleAction(selectedCustomer, 'suspend');
                    }}
                    className="flex-1 h-11 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <MaterialIcon icon="block" />
                    Suspend Customer
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowModal(false);
                      handleAction(selectedCustomer, 'activate');
                    }}
                    className="flex-1 h-11 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <MaterialIcon icon="check_circle" />
                    Activate Customer
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowModal(false);
                    handleAction(selectedCustomer, 'reset');
                  }}
                  className="flex-1 h-11 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <MaterialIcon icon="lock_reset" />
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Confirmation Modal */}
      {showActionModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`size-12 rounded-lg flex items-center justify-center ${
                actionType === 'suspend' ? 'bg-red-100 text-red-600' :
                actionType === 'activate' ? 'bg-green-100 text-green-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                <MaterialIcon icon={
                  actionType === 'suspend' ? 'block' :
                  actionType === 'activate' ? 'check_circle' :
                  'lock_reset'
                } className="text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {actionType === 'suspend' ? 'Suspend Customer' :
                   actionType === 'activate' ? 'Activate Customer' :
                   'Reset Password'}
                </h3>
                <p className="text-sm text-gray-500">{selectedCustomer.name}</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-6">
              {actionType === 'suspend' && 'Are you sure you want to suspend this customer? They will not be able to log in or place orders.'}
              {actionType === 'activate' && 'Are you sure you want to activate this customer? They will be able to log in and place orders again.'}
              {actionType === 'reset' && 'A password reset link will be sent to the customer\'s email address.'}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowActionModal(false)}
                className="flex-1 h-10 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 h-10 font-semibold rounded-lg transition-colors text-white ${
                  actionType === 'suspend' ? 'bg-red-600 hover:bg-red-700' :
                  actionType === 'activate' ? 'bg-green-600 hover:bg-green-700' :
                  'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
