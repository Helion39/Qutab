import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './dashboard/DashboardLayout';
import Catalogue from './dashboard/Catalogue';
import Wishlist from './dashboard/Wishlist';
import Payment from './dashboard/Payment';
import DashboardHome from './dashboard/DashboardHome';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
}
