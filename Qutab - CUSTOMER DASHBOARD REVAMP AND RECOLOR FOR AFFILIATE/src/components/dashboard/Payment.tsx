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
      statusLabel: 'Selesai',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkmh9t6CuT3s8TU_6A5oUHxkbViYdPL1jpW57akrkwqWJRxhTc42TGCFG1N5IU5xzRO3pYa_6rxB95xqRwr1HDp20ADh2Uao-QfBy8fo7BTSBrL85YOAqpbpuD17_UlTt3pwKTpoNiJwbFWGy4qJcbhOnNyIEYuwcLSlAhHP5tbMtZphFlZ3mROESp-GBjvXpYvupzzgA2MR35noqOJRs04bar9rqcWFusoc_rGIPoX5k6nPRlhSEtqCfyH-bvcJjZ1oFdeUmlObc'
    },
    {
      id: 2,
      animalName: 'Sapi Kolektif (1/7)',
      orderId: 'QTB-2024-002',
      date: '2024-02-01',
      amount: 'Rp 2.800.000',
      status: 'processing',
      statusLabel: 'Diproses',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiJYVFKvXtetjJKtBagYQW6k9cx3P5B6EgOHA8V5y7rlsdn1ytv9IwctM5C2QTIwUFovUOWwn6EqzYIPnDKuT6YMYGmN9bFiN4ca5eihHVYGFoTGDt8i-y-e5Mdo7mnMrSlSxYOcfFMNO_iPrpoCUB1ksGLab8-4pj5SvhMYPJsv9zol3tqBJL7wgGQguUfehW9vnw79zE4Xk0k0jR2LVtLHnWvW8UPdL54373aKEXb0-tkS2hdqZEtKGn7PP20nrjvp2lY5s-304'
    },
    {
      id: 3,
      animalName: 'Kambing Standard',
      orderId: 'QTB-2024-003',
      date: '2024-03-10',
      amount: 'Rp 2.500.000',
      status: 'pending',
      statusLabel: 'Menunggu Pembayaran',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC77I3-1OtvWdH2wGUjcQXUQTkNTnjEwx6qYbYPCyv2MbhiHixHIzdONsm9F4qvurREmgQNST84FVZJA6vy4szqPKkOo2kBHliP4EOoAhy2yMCTb1oXuZexVkXl5qXM0IHvLhCnXp8lHJ8vbKQpmGXqZAcL9mBn4B0vuf_vfmdVkdZLaBJYfQxwvS9yOumx9oPKgG8hep16JJZNhv_l4UgV67Uu83R5WGqizjgksxegpAkO2j4sXOgoKZ9BjGLK4mY5qD2Qa5DnRpM'
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
    <div className="p-8 pb-20 bg-[#f8f9fc] dark:bg-[#2d1b24]">
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
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Product Image */}
                <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${payment.image}')` }}
                  ></div>
                </div>

                {/* Product Info */}
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

                {/* Price & Action */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="text-left md:text-right">
                    <div className="text-xs text-gray-400 font-medium mb-1">Total Pembayaran</div>
                    <div className="text-2xl font-bold text-[#4a2c3a] dark:text-white">
                      {payment.amount}
                    </div>
                  </div>
                  <button className="h-10 px-6 rounded-lg bg-[#ffafcc] hover:bg-[#ef9bb8] text-white font-bold text-sm shadow-sm transition-colors flex items-center gap-2 active:scale-95 whitespace-nowrap">
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
