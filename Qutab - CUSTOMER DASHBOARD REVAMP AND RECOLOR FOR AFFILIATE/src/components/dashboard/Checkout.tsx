import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialIcon from '../MaterialIcon';
import { useCart } from '../../contexts/CartContext';
import { toast } from 'sonner@2.0.3';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart, getTotalItems } = useCart();
  
  const [customerInfo, setCustomerInfo] = useState({
    name: 'Ahmad Fulan',
    email: 'ahmad.fulan@example.com',
    whatsapp: '+62 812-3456-7890',
    address: ''
  });

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getSubtotal();
  const total = subtotal - discount;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getBadgeColors = (color: string) => {
    const colors: Record<string, string> = {
      green: 'bg-[#dfdffa] dark:bg-[#bdbef5]/30 text-[#bdbef5] dark:text-[#dfdffa]',
      amber: 'bg-[#ffc7dd] dark:bg-[#ffafcc]/30 text-[#ef9bb8] dark:text-[#ffc7dd]',
      blue: 'bg-[#bdbef5] dark:bg-[#bdbef5]/30 text-white dark:text-[#dfdffa]',
      purple: 'bg-[#dfdffa] dark:bg-[#bdbef5]/30 text-[#bdbef5] dark:text-[#dfdffa]',
      gray: 'bg-gray-100 dark:bg-gray-800 text-gray-400'
    };
    return colors[color] || colors.green;
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Mohon masukkan kode kupon');
      return;
    }

    setIsValidatingCoupon(true);
    
    // Simulate API call to validate coupon
    // In production: POST /commissions/coupons/{code}/validate/
    setTimeout(() => {
      // Mock validation - accept "HEMAT10" for 10% discount
      if (couponCode.toUpperCase() === 'HEMAT10') {
        const discountAmount = Math.floor(subtotal * 0.1);
        setDiscount(discountAmount);
        setCouponApplied(true);
        toast.success(`Kupon berhasil! Diskon: ${formatCurrency(discountAmount)}`);
      } else {
        toast.error('Kupon tidak valid atau sudah expired');
      }
      setIsValidatingCoupon(false);
    }, 1000);
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setCouponCode('');
    setCouponApplied(false);
    toast.success('Kupon dihapus');
  };

  const handlePayment = async () => {
    if (!agreeToTerms) {
      toast.error('Mohon setujui syarat dan ketentuan');
      return;
    }

    if (items.length === 0) {
      toast.error('Keranjang kosong');
      return;
    }

    setIsProcessing(true);

    // Simulate API call to create order
    // In production: POST /orders/ (returns Xendit URL)
    setTimeout(() => {
      // Mock order creation
      const orderNumber = `QTB-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      
      // Clear cart
      clearCart();
      
      // In production, redirect to Xendit payment page
      // window.location.href = xenditUrl;
      
      // For demo, redirect to success page
      navigate(`/payment/success?order=${orderNumber}`);
      setIsProcessing(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="p-8 pb-20 bg-[#f8f9fc] dark:bg-[#2d1b24] min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-[#3d2531] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-12 flex flex-col items-center justify-center">
            <MaterialIcon icon="shopping_cart" className="text-[64px] text-gray-300 dark:text-gray-700 mb-4" />
            <h3 className="text-2xl font-bold text-[#4a2c3a] dark:text-white mb-2">Keranjang Kosong</h3>
            <p className="text-[#7d5a6a] dark:text-gray-400 mb-8">Tambahkan produk terlebih dahulu</p>
            <button
              onClick={() => navigate('/dashboard/catalogue')}
              className="px-8 py-3 bg-[#ffafcc] hover:bg-[#ef9bb8] text-white font-bold rounded-lg transition-colors"
            >
              Lihat Katalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 pb-20 bg-[#f8f9fc] dark:bg-[#2d1b24] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate('/dashboard/cart')}
            className="size-10 rounded-lg bg-white dark:bg-[#3d2531] border border-gray-200 dark:border-gray-800 flex items-center justify-center text-[#7d5a6a] dark:text-gray-400 hover:text-[#ffafcc] transition-colors"
          >
            <MaterialIcon icon="arrow_back" className="text-[20px]" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-[#4a2c3a] dark:text-white tracking-tight">
              Checkout
            </h2>
            <p className="text-[#7d5a6a] dark:text-gray-400 mt-1">
              Periksa kembali pesanan Anda sebelum melakukan pembayaran
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className="bg-white dark:bg-[#3d2531] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h3 className="text-xl font-bold text-[#4a2c3a] dark:text-white mb-6 flex items-center gap-2">
                <MaterialIcon icon="person" className="text-[#ffafcc]" />
                Informasi Pembeli
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#7d5a6a] dark:text-gray-300 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-[#2d1b24] border border-gray-200 dark:border-gray-700 rounded-lg text-[#4a2c3a] dark:text-white focus:outline-none focus:border-[#ffafcc]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-[#7d5a6a] dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-[#2d1b24] border border-gray-200 dark:border-gray-700 rounded-lg text-[#4a2c3a] dark:text-white focus:outline-none focus:border-[#ffafcc]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-[#7d5a6a] dark:text-gray-300 mb-2">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.whatsapp}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, whatsapp: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-[#2d1b24] border border-gray-200 dark:border-gray-700 rounded-lg text-[#4a2c3a] dark:text-white focus:outline-none focus:border-[#ffafcc]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-[#7d5a6a] dark:text-gray-300 mb-2">
                    Alamat (Opsional)
                  </label>
                  <input
                    type="text"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    placeholder="Untuk preferensi distribusi"
                    className="w-full px-4 py-3 bg-white dark:bg-[#2d1b24] border border-gray-200 dark:border-gray-700 rounded-lg text-[#4a2c3a] dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#ffafcc]"
                  />
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white dark:bg-[#3d2531] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h3 className="text-xl font-bold text-[#4a2c3a] dark:text-white mb-6 flex items-center gap-2">
                <MaterialIcon icon="list_alt" className="text-[#ffafcc]" />
                Detail Pesanan
              </h3>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-800 last:border-0">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#dfdffa] dark:bg-gray-800 flex-shrink-0">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${item.productImage}')` }}
                      ></div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-[#4a2c3a] dark:text-white">{item.productName}</h4>
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${getBadgeColors(item.typeBadgeColor)} mt-1`}>
                            {item.productType}
                          </span>
                        </div>
                        <span className="font-bold text-[#4a2c3a] dark:text-white">
                          {formatCurrency(item.price)}
                        </span>
                      </div>
                      <div className="bg-[#ffe1ed] dark:bg-[#ffafcc]/10 rounded-lg p-2">
                        <div className="flex items-center gap-2">
                          <MaterialIcon icon="person" className="text-[#ffafcc] text-[14px]" />
                          <span className="text-xs font-bold text-[#7d5a6a] dark:text-gray-300">Shohibul Qurban:</span>
                          <span className="text-xs font-medium text-[#4a2c3a] dark:text-white">
                            {item.shohibulQurban}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon */}
            <div className="bg-white dark:bg-[#3d2531] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h3 className="text-xl font-bold text-[#4a2c3a] dark:text-white mb-4 flex items-center gap-2">
                <MaterialIcon icon="local_offer" className="text-[#ffafcc]" />
                Kode Kupon
              </h3>
              
              {couponApplied ? (
                <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <MaterialIcon icon="check_circle" className="text-green-500 text-[24px]" />
                    <div>
                      <p className="font-bold text-green-700 dark:text-green-400">Kupon diterapkan!</p>
                      <p className="text-sm text-green-600 dark:text-green-500">Kode: {couponCode.toUpperCase()}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="px-4 py-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg text-sm font-bold transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Masukkan kode kupon"
                    className="flex-1 px-4 py-3 bg-white dark:bg-[#2d1b24] border border-gray-200 dark:border-gray-700 rounded-lg text-[#4a2c3a] dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#ffafcc]"
                    disabled={isValidatingCoupon}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={isValidatingCoupon || !couponCode.trim()}
                    className="px-6 py-3 bg-[#bdbef5] hover:bg-[#9fa0d5] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isValidatingCoupon && <MaterialIcon icon="sync" className="text-[18px] animate-spin" />}
                    Terapkan
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-[#3d2531] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sticky top-24">
              <h3 className="text-xl font-bold text-[#4a2c3a] dark:text-white mb-6">Ringkasan Pembayaran</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#7d5a6a] dark:text-gray-400">Subtotal</span>
                  <span className="text-sm font-bold text-[#4a2c3a] dark:text-white">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                
                {discount > 0 && (
                  <div className="flex items-center justify-between text-green-600 dark:text-green-400">
                    <span className="text-sm">Diskon</span>
                    <span className="text-sm font-bold">- {formatCurrency(discount)}</span>
                  </div>
                )}

                <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#4a2c3a] dark:text-white">Total</span>
                    <span className="text-2xl font-bold text-[#ffafcc]">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="mt-1 size-4 rounded border-gray-300 text-[#ffafcc] focus:ring-[#ffafcc]"
                  />
                  <span className="text-sm text-[#7d5a6a] dark:text-gray-400 group-hover:text-[#4a2c3a] dark:group-hover:text-white transition-colors">
                    Saya menyetujui{' '}
                    <a href="#" className="text-[#ffafcc] hover:underline font-medium">
                      syarat dan ketentuan
                    </a>
                  </span>
                </label>
              </div>

              <button
                onClick={handlePayment}
                disabled={!agreeToTerms || isProcessing}
                className="w-full h-14 bg-[#ffafcc] hover:bg-[#ef9bb8] text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <MaterialIcon icon="sync" className="text-[20px] animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <MaterialIcon icon="payment" className="text-[20px]" />
                    Bayar Sekarang
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <MaterialIcon icon="lock" className="text-[14px]" />
                <span>Pembayaran aman dengan Xendit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
