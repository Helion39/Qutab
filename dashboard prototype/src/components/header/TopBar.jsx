import { useLocation } from "react-router-dom";
import { Search, Bell, ShoppingCart } from "lucide-react";
import { useState } from "react";
import CartPopup from "../ui/CartPopup";
import { useCart } from "../../pages/CartContext";

const breadcrumbMap = {
  "/dashboard": "Dashboard",
  "/catalog": "Catalog",
  "/wishlist": "Wishlist",
  "/payments": "My Qurban / Payments",
  "/settings": "Settings",
  "/settings/profile": "Settings / Profile",
  "/settings/account": "Settings / Account",
  "/help-center": "Help Center",
  "/help-center/faq": "Help Center / FAQ",
  "/help-center/contact": "Help Center / Contact Support",
};

export default function TopBar() {
  const location = useLocation();
  const title = breadcrumbMap[location.pathname] || "";

  // State notifikasi contoh
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New message" },
    { id: 2, message: "Order updated" },
  ]);

  // State popup cart
  const [openCart, setOpenCart] = useState(false);

  // Ambil cart dari context
  const { cart } = useCart();

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-200 flex items-center px-7">
        {/* LEFT - BREADCRUMB */}
        <div className="text-sm text-gray-500">
          Home
          {title && (
            <>
              <span className="mx-2">{">"}</span>
              <span className="text-gray-800 font-medium">{title}</span>
            </>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="ml-auto flex items-center gap-5">
          {/* SEARCH */}
          <div className="relative w-60 sm:w-72 md:w-96">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search animals (e.g., Goat Type A)..." className="w-full border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>

          {/* NOTIFICATION */}
          <div className="relative cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition">
            <Bell className="text-gray-600" size={20} />
            {notifications.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 rounded-full text-xs text-white w-4 h-4 flex items-center justify-center">{notifications.length}</span>}
          </div>

          {/* CART */}
          <div className="relative cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition" onClick={() => setOpenCart(!openCart)}>
            <ShoppingCart className="text-gray-600" size={20} />
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-green-500 rounded-full text-xs text-white w-4 h-4 flex items-center justify-center">{cart.length}</span>}
          </div>
        </div>
      </header>

      {/* CART POPUP */}
      <CartPopup open={openCart} onClose={() => setOpenCart(false)} />
    </>
  );
}
