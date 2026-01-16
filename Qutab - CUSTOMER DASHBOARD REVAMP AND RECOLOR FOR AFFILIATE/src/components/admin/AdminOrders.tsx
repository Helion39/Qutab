import { useState } from 'react';
import MaterialIcon from '../MaterialIcon';

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shohibulQurban: string[];
  animal: {
    type: string;
    name: string;
    weight: string;
    location: string;
    inventoryId?: string;
    groupId?: string;
    slotNumber?: number;
  };
  amount: number;
  date: string;
  status: 'pending' | 'paid' | 'processing' | 'completed' | 'cancelled';
  paymentMethod?: string;
  notes?: string;
}

export default function AdminOrders() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);

  const orders: Order[] = [
    {
      id: 'QTB-2024-156',
      customer: {
        name: 'Ahmad Rahman',
        email: 'ahmad.rahman@email.com',
        phone: '+62 812-3456-7890',
      },
      shohibulQurban: ['Ahmad Rahman & Keluarga'],
      animal: {
        type: 'Kambing',
        name: 'Kambing Premium',
        weight: '~30-35 kg',
        location: 'Koperasi Jawa Tengah',
      },
      amount: 3800000,
      date: '2024-06-10',
      status: 'pending',
      paymentMethod: 'Bank Transfer',
    },
    {
      id: 'QTB-2024-155',
      customer: {
        name: 'Siti Nurhaliza',
        email: 'siti.n@email.com',
        phone: '+62 813-4567-8901',
      },
      shohibulQurban: ['Siti Nurhaliza'],
      animal: {
        type: 'Sapi',
        name: 'Sapi Kolektif (1/7)',
        weight: 'Standard Cow',
        location: 'Peternakan Jawa Timur',
      },
      amount: 2800000,
      date: '2024-06-10',
      status: 'paid',
      paymentMethod: 'E-Wallet (GoPay)',
    },
    {
      id: 'QTB-2024-154',
      customer: {
        name: 'Budi Santoso',
        email: 'budi.s@email.com',
        phone: '+62 821-5678-9012',
      },
      shohibulQurban: ['Budi Santoso'],
      animal: {
        type: 'Kambing',
        name: 'Kambing Standard',
        weight: '~25-28 kg',
        location: 'West Java Farmers Group',
      },
      amount: 2500000,
      date: '2024-06-09',
      status: 'processing',
      paymentMethod: 'Bank Transfer',
    },
    {
      id: 'QTB-2024-153',
      customer: {
        name: 'Dewi Lestari',
        email: 'dewi.l@email.com',
        phone: '+62 822-6789-0123',
      },
      shohibulQurban: ['Dewi Lestari & Almarhum Suami'],
      animal: {
        type: 'Sapi',
        name: 'Sapi Utuh Standard',
        weight: '~220 kg',
        location: 'Sumatra Breeders',
      },
      amount: 19500000,
      date: '2024-06-09',
      status: 'completed',
      paymentMethod: 'Bank Transfer',
    },
    {
      id: 'QTB-2024-152',
      customer: {
        name: 'Hendra Wijaya',
        email: 'hendra.w@email.com',
        phone: '+62 823-7890-1234',
      },
      shohibulQurban: ['Hendra Wijaya'],
      animal: {
        type: 'Domba',
        name: 'Domba Garut Super',
        weight: '~40 kg',
        location: 'Garut Farms',
      },
      amount: 4200000,
      date: '2024-06-08',
      status: 'paid',
      paymentMethod: 'Virtual Account',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'processing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'paid':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    paid: orders.filter((o) => o.status === 'paid').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    completed: orders.filter((o) => o.status === 'completed').length,
  };

  const handleStatusChange = (order: Order, newStatus: string) => {
    console.log(`Changing order ${order.id} status to ${newStatus}`);
    alert(`Order ${order.id} status updated to ${newStatus}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <MaterialIcon icon="shopping_bag" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Total Orders</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <MaterialIcon icon="schedule" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <MaterialIcon icon="payments" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.paid}</p>
              <p className="text-sm text-gray-500">Paid</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <MaterialIcon icon="sync" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.processing}</p>
              <p className="text-sm text-gray-500">Processing</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <MaterialIcon icon="check_circle" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              <p className="text-sm text-gray-500">Completed</p>
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
              placeholder="Search by Order ID, customer name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'paid', 'processing', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  selectedStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Animal
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
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
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{order.customer.name}</p>
                      <p className="text-sm text-gray-500">{order.customer.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{order.animal.name}</p>
                      <p className="text-sm text-gray-500">{order.animal.weight}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">Rp {order.amount.toLocaleString('id-ID')}</p>
                    {order.paymentMethod && (
                      <p className="text-xs text-gray-500">{order.paymentMethod}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowModal(true);
                        }}
                        className="size-8 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 flex items-center justify-center transition-colors"
                        title="View Details"
                      >
                        <MaterialIcon icon="visibility" className="text-[18px]" />
                      </button>
                      <button
                        className="size-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
                        title="Update Status"
                      >
                        <MaterialIcon icon="edit" className="text-[18px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Order Details</h3>
                <p className="text-sm text-gray-500">{selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="size-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600"
              >
                <MaterialIcon icon="close" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex items-center gap-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getStatusBadge(
                    selectedOrder.status
                  )}`}
                >
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
                <span className="text-sm text-gray-500">Ordered on {selectedOrder.date}</span>
              </div>

              {/* Customer Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-3">Customer Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Name</p>
                    <p className="text-sm text-gray-900">{selectedOrder.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Email</p>
                    <p className="text-sm text-gray-900">{selectedOrder.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Phone</p>
                    <p className="text-sm text-gray-900">{selectedOrder.customer.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Shohibul Qurban</p>
                    <p className="text-sm text-gray-900">
                      {selectedOrder.shohibulQurban.join(', ')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Animal Information */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-3">Animal Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Type</p>
                    <p className="text-sm text-gray-900">{selectedOrder.animal.type}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Name</p>
                    <p className="text-sm text-gray-900">{selectedOrder.animal.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Weight</p>
                    <p className="text-sm text-gray-900">{selectedOrder.animal.weight}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Location</p>
                    <p className="text-sm text-gray-900">{selectedOrder.animal.location}</p>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-3">Payment Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Amount</p>
                    <p className="text-lg font-bold text-gray-900">
                      Rp {selectedOrder.amount.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Payment Method</p>
                    <p className="text-sm text-gray-900">{selectedOrder.paymentMethod}</p>
                  </div>
                </div>
              </div>

              {/* Status Update Actions */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-bold text-gray-900 mb-4">Update Order Status</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedOrder.status === 'pending' && (
                    <button
                      onClick={() => handleStatusChange(selectedOrder, 'paid')}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                    >
                      <MaterialIcon icon="payments" className="text-[18px]" />
                      Mark as Paid
                    </button>
                  )}
                  {selectedOrder.status === 'paid' && (
                    <button
                      onClick={() => handleStatusChange(selectedOrder, 'processing')}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                    >
                      <MaterialIcon icon="sync" className="text-[18px]" />
                      Start Processing
                    </button>
                  )}
                  {selectedOrder.status === 'processing' && (
                    <button
                      onClick={() => handleStatusChange(selectedOrder, 'completed')}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                    >
                      <MaterialIcon icon="check_circle" className="text-[18px]" />
                      Mark as Completed
                    </button>
                  )}
                  {selectedOrder.status !== 'completed' && selectedOrder.status !== 'cancelled' && (
                    <button
                      onClick={() => handleStatusChange(selectedOrder, 'cancelled')}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                    >
                      <MaterialIcon icon="cancel" className="text-[18px]" />
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}