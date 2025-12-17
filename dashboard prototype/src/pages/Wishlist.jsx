import { Trash2 } from "lucide-react";
import { useWishlist } from "./WishlistContext";
import { useCart } from "./CartContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Wishlist</h1>
        <p className="text-gray-500">Hewan qurban yang kamu simpan untuk nanti</p>
      </div>

      {/* EMPTY STATE */}
      {wishlist.length === 0 && (
        <div className="bg-white p-8 rounded-2xl text-center text-gray-400 shadow-sm flex flex-col items-center gap-2">
          <p className="text-lg font-medium">Wishlist kamu masih kosong</p>
          <p className="text-sm">Tambahkan hewan dari katalog untuk disimpan di sini.</p>
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="
              bg-white
              rounded-2xl
              overflow-hidden
              flex flex-col
              shadow-sm
              transition
              hover:shadow-lg
              hover:-translate-y-0.5
            "
          >
            {/* IMAGE */}
            <div className="w-full h-36">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col flex-1 gap-2">
              <h3 className="font-semibold text-sm text-gray-900 truncate">{item.name}</h3>

              <p className="text-xs text-gray-500">Rp {item.price.toLocaleString()}</p>

              {/* ACTION */}
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => addToCart(item)}
                  className="
                    flex-1
                    bg-[#6DED13]
                    hover:bg-[#65A30D]
                    text-white
                    py-2
                    rounded-xl
                    text-sm
                    font-semibold
                    transition
                  "
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="
                    px-3
                    rounded-xl
                    text-red-500
                    hover:bg-red-50
                    transition
                  "
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
