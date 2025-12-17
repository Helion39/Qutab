import { Plus } from "lucide-react";
import QurbanInfoCard from "../components/Card";
import { useWishlist } from "./WishlistContext";
import { useCart } from "./CartContext"; // ✅ WAJIB DITAMBAH

const products = [
  {
    id: 1,
    name: "Kambing Standard",
    type: "TYPE A",
    weight: "~25–28 kg",
    location: "West Java Farmers Group",
    price: 2500000,
    badge: "Verified Farmer",
    image: "https://picsum.photos/seed/goat1/400/300",
    stock: true,
  },
  {
    id: 2,
    name: "Kambing Premium",
    type: "TYPE B",
    weight: "~30–35 kg",
    location: "Central Java Co-op",
    price: 3800000,
    badge: "Best Seller",
    image: "https://picsum.photos/seed/goat2/400/300",
    stock: true,
  },
  {
    id: 3,
    name: "Sapi Kolektif (1/7)",
    type: "SHARE",
    weight: "Standard Cow",
    location: "East Java Livestock",
    price: 2800000,
    badge: "Verified Farmer",
    image: "https://picsum.photos/seed/cow1/400/300",
    stock: true,
  },
  {
    id: 4,
    name: "Sapi Utuh Standard",
    type: "WHOLE",
    weight: "~220 kg",
    location: "Sumatra Breeders",
    price: 19500000,
    badge: "Verified Farmer",
    image: "https://picsum.photos/seed/cow2/400/300",
    stock: true,
  },
  {
    id: 5,
    name: "Domba Garut Super",
    type: "SPECIAL",
    weight: "~40 kg",
    location: "Garut Farms",
    price: 4200000,
    badge: "Out of Stock",
    image: "https://picsum.photos/seed/sheep1/400/300",
    stock: false,
  },
  {
    id: 6,
    name: "Kambing Hemat",
    type: "ECONOMY",
    weight: "~20 kg",
    location: "Banten Village",
    price: 2100000,
    badge: "Out of Stock",
    image: "https://picsum.photos/seed/goat3/400/300",
    stock: false,
  },
];

export default function Catalog() {
  const { wishlist, addToWishlist } = useWishlist();
  const { addToCart } = useCart(); // ✅ INI KUNCI MASALAH KAMU

  return (
    <div className="space-y-6">
      {/* TOP HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Qurban Catalog 2024</h1>
          <p className="text-sm" style={{ color: "#84CC16" }}>
            Select your sacrifice animal from trusted local farmers. All animals are health-checked and sharia-compliant.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col justify-center px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm min-w-[160px]">
            <span className="text-[11px] text-gray-400 tracking-wide">BALANCE</span>
            <span className="text-base font-semibold text-gray-900">Rp 5.250.000</span>
          </div>

          <button
            type="button"
            className="h-12 w-12 flex items-center justify-center rounded-xl shadow-md transition text-white"
            style={{ backgroundColor: "#84CC16" }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#65A30D")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#84CC16")}
          >
            <Plus size={22} />
          </button>
        </div>
      </div>

      {/* FILTER */}
      <div className="flex gap-2">
        {["All Animals", "Goats / Sheep", "Cows (Whole)", "Cow Share (1/7)"].map((tab, i) => (
          <button key={tab} className="px-4 py-2 rounded-lg text-sm font-medium transition border text-gray-600" style={i === 0 ? { backgroundColor: "#84CC16", color: "#fff" } : {}}>
            {tab}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <QurbanInfoCard
            key={product.id}
            product={product}
            onAddToWishlist={() => addToWishlist(product)}
            isInWishlist={wishlist.some((i) => i.id === product.id)}
            onAddToCart={addToCart} // ✅ FIX FINAL
          />
        ))}
      </div>
    </div>
  );
}
