import { useState } from "react";
import { useCart } from "../pages/CartContext"; // ✅ SATU KALI SAJA
import Modal from "../components/ui/Modal";
import { ShoppingCart, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Payments() {
  const { cart, removeFromCart, totalPrice, clearCart } = useCart();

  const [deleteItem, setDeleteItem] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-1">My Qurban / Payments</h1>
      <p className="text-gray-500 mb-6">Review pesanan dan lanjutkan pembayaran</p>

      {/* EMPTY STATE */}
      {cart.length === 0 && !success && (
        <div className="bg-white p-6 rounded-xl text-center text-gray-500 flex flex-col items-center gap-2 shadow-md">
          <ShoppingCart className="w-10 h-10 text-gray-300" />
          <span>Keranjang kamu masih kosong 🛒</span>
        </div>
      )}

      {/* SUCCESS STATE */}
      {success && (
        <div className="bg-[#6DED13]/10 border border-[#6DED13]/30 p-6 rounded-xl text-center flex flex-col items-center gap-2 shadow-md">
          <CheckCircle className="w-10 h-10 text-[#6DED13]" />
          <h2 className="text-lg font-bold text-[#6DED13] mb-1">Payment Successful 🎉</h2>
          <p className="text-sm text-[#6DED13]/90">Pesanan qurban kamu berhasil dicatat (mock).</p>
        </div>
      )}

      {/* CART LIST */}
      {!success &&
        cart.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl mb-3 flex justify-between items-center shadow-sm hover:shadow-md transition">
            <div>
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-500">Qty: {item.qty}</div>
            </div>

            <div className="text-right">
              <div className="font-semibold">Rp {(item.qty * item.price).toLocaleString()}</div>
              <button onClick={() => setDeleteItem(item)} className="text-xs text-red-500 hover:underline">
                Remove
              </button>
            </div>
          </div>
        ))}

      {/* FOOTER */}
      {cart.length > 0 && !success && (
        <div className="mt-6 bg-white p-4 rounded-xl flex justify-between items-center shadow-md sticky bottom-0">
          <div className="font-bold">Total: Rp {totalPrice.toLocaleString()}</div>
          <button onClick={() => setShowPayment(true)} className="bg-[#6DED13] hover:bg-[#65A30D] text-white px-6 py-2 rounded-lg transition">
            Proceed to Payment
          </button>
        </div>
      )}

      {/* DELETE MODAL */}
      <Modal open={!!deleteItem} title="Remove Item" onClose={() => setDeleteItem(null)}>
        <p className="text-sm mb-4">
          Remove <b>{deleteItem?.name}</b> from cart?
        </p>
        <div className="flex justify-end gap-2">
          <button onClick={() => setDeleteItem(null)} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>
          <button
            onClick={() => {
              removeFromCart(deleteItem.id);
              setDeleteItem(null);
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Remove
          </button>
        </div>
      </Modal>

      {/* PAYMENT MODAL */}
      <Modal open={showPayment} title="Payment Preview" onClose={() => setShowPayment(false)}>
        <p className="text-sm text-gray-600 mb-4">This is a mock payment before Xendit integration.</p>

        <div className="bg-gray-50 p-3 rounded-lg text-sm mb-4">
          <div>Total items: {cart.length}</div>
          <div className="font-semibold">Total payment: Rp {totalPrice.toLocaleString()}</div>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={() => setShowPayment(false)} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>
          <button
            onClick={() => {
              clearCart();
              setShowPayment(false);
              setSuccess(true);
            }}
            className="px-4 py-2 bg-[#6DED13] hover:bg-[#65A30D] text-white rounded-lg transition"
          >
            Pay Now
          </button>
        </div>
      </Modal>
    </div>
  );
}
