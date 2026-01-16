import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './dashboard/DashboardLayout';
import Catalogue from './dashboard/Catalogue';
import ProductDetail from './dashboard/ProductDetail';
import Checkout from './dashboard/Checkout';
import Wishlist from './dashboard/Wishlist';
import Payment from './dashboard/Payment';
import DashboardHome from './dashboard/DashboardHome';
import AccountSettings from './dashboard/AccountSettings';
import HelpCenter from './dashboard/HelpCenter';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Payment />} />
        <Route path="/payment" element={<Navigate to="/dashboard/orders" replace />} />
        <Route path="/settings" element={<AccountSettings />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
}