import { ImageWithFallback } from '../figma/ImageWithFallback';
import MaterialIcon from '../MaterialIcon';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Wishlist() {
  const { items, removeFromCart, updateQuantity, getSubtotal } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  const subtotal = getSubtotal();
  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const total = subtotal - discount;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'QURBAN2024') {
      setAppliedCoupon({ code: couponCode, discount: 200000 });
    } else if (couponCode.toUpperCase() === 'DISKON50K') {
      setAppliedCoupon({ code: couponCode, discount: 50000 });
    } else {
      alert('Kode kupon tidak valid');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Keranjang Anda masih kosong');
      return;
    }
    navigate('/dashboard/checkout');
  };

  return (
    <div className="p-8 pb-20 bg-[#f8f9fc] dark:bg-[#2d1b24]">
      <div className="max-w-7xl mx-auto">
        {/* Page Heading */}
        <div className="flex flex-col gap-2 mb-8">
          <h2 className="text-3xl font-bold text-[#4a2c3a] dark:text-white tracking-tight">
            Keranjang Belanja
          </h2>
          <p className="text-[#7d5a6a] dark:text-gray-400">
            {items.length} item dalam keranjang Anda
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-800">
            <MaterialIcon icon="shopping_cart" className="text-6xl text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-[#4a2c3a] dark:text-white mb-2">
              Keranjang Belanja Kosong
            </h3>
            <p className="text-[#7d5a6a] dark:text-gray-400 mb-6">
              Anda belum menambahkan produk ke keranjang
            </p>
            <button
              onClick={() => navigate('/dashboard/catalogue')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#ffafcc] hover:bg-[#ef9bb8] text-white font-bold rounded-lg transition-colors"
            >
              <MaterialIcon icon="storefront" className="text-[20px]" />
              Lihat Katalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-32 h-32 rounded-xl overflow-hidden bg-[#dfdffa] dark:bg-gray-800 flex-shrink-0">
                      <ImageWithFallback
                        src={item.productImage}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-[#4a2c3a] dark:text-white">
                            {item.productName}
                          </h3>
                          <p className="text-sm text-[#7d5a6a] dark:text-gray-400 mt-1">
                            {item.weight}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="size-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 flex items-center justify-center transition-colors"
                        >
                          <MaterialIcon icon="delete" className="text-[20px]" />
                        </button>
                      </div>

                      {/* Shohibul Qurban Info */}
                      {item.shohibulQurban && (
                        <div className="bg-[#f8f9fc] dark:bg-[#2d1b24] rounded-lg p-3 mb-3">
                          <p className="text-xs font-semibold text-[#7d5a6a] dark:text-gray-400 mb-1">
                            Shohibul Qurban:
                          </p>
                          <p className="text-sm font-bold text-[#4a2c3a] dark:text-white">
                            {item.shohibulQurban}
                          </p>
                        </div>
                      )}

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-400">Harga</span>
                          <span className="text-xl font-bold text-[#4a2c3a] dark:text-white">
                            {item.priceFormatted}
                          </span>
                        </div>

                        {/* Quantity Control */}
                        <div className="flex items-center gap-2 bg-[#f8f9fc] dark:bg-[#2d1b24] rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="size-8 rounded-lg bg-white dark:bg-[#3d2531] hover:bg-[#ffafcc] hover:text-white text-[#7d5a6a] dark:text-gray-300 flex items-center justify-center transition-colors border border-gray-200 dark:border-gray-700"
                          >
                            <MaterialIcon icon="remove" className="text-[18px]" />
                          </button>
                          <span className="w-12 text-center font-bold text-[#4a2c3a] dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="size-8 rounded-lg bg-white dark:bg-[#3d2531] hover:bg-[#ffafcc] hover:text-white text-[#7d5a6a] dark:text-gray-300 flex items-center justify-center transition-colors border border-gray-200 dark:border-gray-700"
                          >
                            <MaterialIcon icon="add" className="text-[18px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary - Detail Pemesanan */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm sticky top-8">
                <h3 className="text-xl font-bold text-[#4a2c3a] dark:text-white mb-6">
                  Detail Pemesanan
                </h3>

                {/* Subtotal */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-[#7d5a6a] dark:text-gray-400">
                    <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} item)</span>
                    <span className="font-semibold">Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>

                  {/* Coupon Section */}
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-sm font-semibold text-[#7d5a6a] dark:text-gray-400 mb-2">
                      Kode Kupon
                    </p>
                    {appliedCoupon ? (
                      <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                        <MaterialIcon icon="local_offer" className="text-green-600 text-[20px]" />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-green-700 dark:text-green-400">
                            {appliedCoupon.code}
                          </p>
                          <p className="text-xs text-green-600 dark:text-green-500">
                            Diskon Rp {discount.toLocaleString('id-ID')}
                          </p>
                        </div>
                        <button
                          onClick={handleRemoveCoupon}
                          className="size-6 rounded-full hover:bg-green-100 dark:hover:bg-green-800 text-green-600 flex items-center justify-center"
                        >
                          <MaterialIcon icon="close" className="text-[16px]" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          placeholder="Masukkan kode"
                          className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1b24] text-[#4a2c3a] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ffafcc]/50"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          className="px-4 py-2 bg-[#ffafcc] hover:bg-[#ef9bb8] text-white font-bold text-sm rounded-lg transition-colors"
                        >
                          Pakai
                        </button>
                      </div>
                    )}
                  </div>

                  {discount > 0 && (
                    <div className="flex items-center justify-between text-green-600 dark:text-green-400">
                      <span>Diskon</span>
                      <span className="font-semibold">- Rp {discount.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="pt-4 border-t-2 border-gray-200 dark:border-gray-800 mb-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg font-bold text-[#4a2c3a] dark:text-white">Total</span>
                    <span className="text-2xl font-bold text-[#4a2c3a] dark:text-white">
                      Rp {total.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <p className="text-xs text-[#7d5a6a] dark:text-gray-400">
                    Termasuk semua biaya
                  </p>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-[#ffafcc] hover:bg-[#ef9bb8] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
                >
                  <MaterialIcon icon="payment" className="text-[24px]" />
                  Lanjut ke Pembayaran
                </button>

                {/* Info */}
                <div className="mt-4 bg-[#f8f9fc] dark:bg-[#2d1b24] rounded-lg p-4">
                  <div className="flex gap-3">
                    <MaterialIcon icon="info" className="text-[#bdbef5] text-[20px] flex-shrink-0" />
                    <p className="text-xs text-[#7d5a6a] dark:text-gray-400">
                      Pembayaran dapat dilakukan melalui transfer bank, e-wallet, atau saldo Qurban Tanpa Batas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}