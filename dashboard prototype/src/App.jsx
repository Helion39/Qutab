import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Catalog from "./pages/Catalog";
import Wishlist from "./pages/Wishlist";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import HelpCenter from "./pages/HelpCenter";
import { WishlistProvider } from "./pages/WishlistContext";
import { CartProvider } from "./pages/CartContext";

export default function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/payment" element={<Payments />} />
            <Route path="/settings/*" element={<Settings />} />
            <Route path="/help-center/*" element={<HelpCenter />} />
          </Routes>
        </DashboardLayout>
      </CartProvider>
    </WishlistProvider>
  );
}
