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
      statusLabel: 'Selesai'
    },
    {
      id: 2,
      animalName: 'Sapi Kolektif (1/7)',
      orderId: 'QTB-2024-002',
      date: '2024-02-01',
      amount: 'Rp 2.800.000',
      status: 'processing',
      statusLabel: 'Diproses'
    },
    {
      id: 3,
      animalName: 'Kambing Standard',
      orderId: 'QTB-2024-003',
      date: '2024-03-10',
      amount: 'Rp 2.500.000',
      status: 'pending',
      statusLabel: 'Menunggu Pembayaran'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-[#bdbef5]/20 dark:bg-[#bdbef5]/30 text-[#bdbef5] dark:text-[#dfdffa]';
      case 'processing':
        return 'bg-[#ffc7dd]/20 dark:bg-[#ffafcc]/30 text-[#ef9bb8] dark:text-[#ffc7dd]';
      case 'pending':
        return 'bg-[#ffe1ed]/50 dark:bg-[#ffafcc]/20 text-[#ef9bb8] dark:text-[#ffc7dd]';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-500';
    }
  };

  return (
    <div className="p-8 pb-20 bg-[#fffbef] dark:bg-[#2d1b24]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Page Heading */}
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-[#4a2c3a] dark:text-white tracking-tight">
            Qurban Saya & Pembayaran
          </h2>
          <p className="text-[#7d5a6a] dark:text-gray-400">
            Lacak pesanan dan riwayat pembayaran Anda
          </p>
        </div>

        {/* Payment List */}
        <div className="flex flex-col gap-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg text-[#4a2c3a] dark:text-white">
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
                  <div className="flex flex-col gap-1 text-sm text-[#7d5a6a] dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <MaterialIcon icon="receipt" className="text-[16px]" />
                      <span>ID Pesanan: {payment.orderId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MaterialIcon icon="calendar_today" className="text-[16px]" />
                      <span>{payment.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs text-gray-400 font-medium mb-1">Total Pembayaran</div>
                    <div className="text-2xl font-bold text-[#4a2c3a] dark:text-white">
                      {payment.amount}
                    </div>
                  </div>
                  <button className="h-10 px-6 rounded-lg bg-[#ffafcc] hover:bg-[#ef9bb8] text-white font-bold text-sm shadow-sm transition-colors flex items-center gap-2 active:scale-95">
                    <MaterialIcon icon="visibility" className="text-[18px]" />
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-br from-[#ffafcc] to-[#ef9bb8] rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Total Kontribusi 2024</h3>
              <p className="text-white/90">Terima kasih atas kemurahan hati Anda!</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">Rp 9.1M</div>
              <div className="text-sm text-white/90">3 Hewan Qurban</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}