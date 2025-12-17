import { useCart } from "../../pages/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPopup({ open, onClose }) {
  const { cart, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="absolute right-0 top-10 w-80 bg-white rounded-xl shadow-lg border z-50">
      <div className="p-4 border-b font-semibold">Keranjang</div>

      <div className="max-h-64 overflow-y-auto">
        {cart.length === 0 && <p className="p-4 text-sm text-gray-500">Keranjang kosong</p>}

        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center p-3 border-b text-sm">
            <div>
              <div className="font-medium">{item.name}</div>
              <div className="text-gray-500">Qty: {item.qty}</div>
            </div>

            <div className="text-right">
              <div className="font-semibold">Rp {(item.price * item.qty).toLocaleString()}</div>
              <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500">
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="p-4">
          <div className="flex justify-between font-semibold mb-3">
            <span>Total</span>
            <span>Rp {totalPrice.toLocaleString()}</span>
          </div>

          <button
            onClick={() => {
              onClose();
              navigate("/payments");
            }}
            className="w-full bg-[#6DED13] hover:bg-[#5CC10F] text-white py-2 rounded-lg text-sm transition"
          >
            Lanjut ke Pembayaran
          </button>
        </div>
      )}
    </div>
  );
}
