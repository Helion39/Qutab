import { Heart, Check, Star, Share2, Cpu, Plus } from "lucide-react";

export default function Card({ product, onAddToWishlist, isInWishlist, onAddToCart }) {
  const renderBadgeIcon = () => {
    if (!product.badge) return null;
    switch (product.badge.toLowerCase()) {
      case "verified farmer":
        return <Check className="w-3 h-3" />;
      case "best seller":
        return <Star className="w-3 h-3" />;
      case "share":
        return <Share2 className="w-3 h-3" />;
      case "whole":
        return <Cpu className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const badgeColor = () => {
    switch (product.badge?.toLowerCase()) {
      case "verified farmer":
        return "bg-green-100 text-green-800";
      case "best seller":
        return "bg-yellow-100 text-yellow-800";
      case "share":
        return "bg-blue-100 text-blue-800";
      case "whole":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition">
      {/* IMAGE */}
      <div className="relative w-full h-40">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />

        {product.badge && (
          <span className={`absolute top-2 left-2 px-2 py-1 flex items-center gap-1 text-[10px] font-semibold rounded-md ${badgeColor()}`}>
            {renderBadgeIcon()}
            {product.badge}
          </span>
        )}

        {/* WISHLIST */}
        <button type="button" onClick={onAddToWishlist} className="absolute top-2 right-2 p-1.5 rounded-full bg-white hover:bg-gray-100 shadow-md">
          <Heart size={16} className={isInWishlist ? "text-red-500 fill-red-500" : "text-gray-400"} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-3 flex flex-col gap-1 flex-1">
        <h3 className="font-semibold text-sm truncate">{product.name}</h3>
        <p className="text-[10px] text-gray-500">
          {product.type} · {product.weight}
        </p>
        <p className="text-[10px] text-gray-400 truncate">📍 {product.location}</p>

        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-[10px] text-gray-400">Price</span>
            <p className="font-semibold text-sm">Rp {product.price.toLocaleString()}</p>
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product)} // ✅ CUMA INI
            className="bg-[#6DED13] px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 hover:bg-[#5CC10F] transition"
          >
            <Plus size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
