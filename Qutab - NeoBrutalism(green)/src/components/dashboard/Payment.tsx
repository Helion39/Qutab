import React from 'react';
import MaterialIcon from '../MaterialIcon';

export default function Payment() {
  const payments = [
    {
      id: 1,
      animalName: 'Kambing Premium',
      orderId: 'QTB-2024-001',
      date: '2024-01-15',
      amount: 'Rp 3.800.000',
      status: 'completed',
      statusLabel: 'Completed'
    },
    {
      id: 2,
      animalName: 'Sapi Kolektif (1/7)',
      orderId: 'QTB-2024-002',
      date: '2024-02-01',
      amount: 'Rp 2.800.000',
      status: 'processing',
      statusLabel: 'Processing'
    },
    {
      id: 3,
      animalName: 'Kambing Standard',
      orderId: 'QTB-2024-003',
      date: '2024-03-10',
      amount: 'Rp 2.500.000',
      status: 'pending',
      statusLabel: 'Pending Payment'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'processing':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'pending':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-500';
    }
  };

  return (
    <div className="p-8 pb-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Page Heading */}
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-[#131b0d] dark:text-white tracking-tight">
            My Qurban & Payments
          </h2>
          <p className="text-[#6c9a4c] dark:text-gray-400">
            Track your orders and payment history
          </p>
        </div>

        {/* Payment List */}
        <div className="flex flex-col gap-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="bg-white dark:bg-[#23301a] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg text-[#131b0d] dark:text-white">
                      {payment.animalName}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {payment.statusLabel}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <MaterialIcon icon="receipt" className="text-[16px]" />
                      <span>Order ID: {payment.orderId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MaterialIcon icon="calendar_today" className="text-[16px]" />
                      <span>{payment.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs text-gray-400 font-medium mb-1">Total Amount</div>
                    <div className="text-2xl font-bold text-[#131b0d] dark:text-white">
                      {payment.amount}
                    </div>
                  </div>
                  <button className="h-10 px-6 rounded-lg bg-[#6dec13] hover:bg-[#5bc710] text-[#131b0d] font-bold text-sm shadow-sm transition-colors flex items-center gap-2">
                    <MaterialIcon icon="visibility" className="text-[18px]" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-br from-[#6dec13] to-[#5bc710] rounded-2xl p-6 text-[#131b0d]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Total Contribution 2024</h3>
              <p className="text-[#131b0d]/80">Thank you for your generosity!</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">Rp 9.1M</div>
              <div className="text-sm text-[#131b0d]/80">3 Qurban Animals</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
