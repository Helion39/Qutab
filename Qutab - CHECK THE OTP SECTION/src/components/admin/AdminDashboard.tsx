import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminDashboardHome from './AdminDashboardHome';
import AdminAffiliates from './AdminAffiliates';
import AdminOrders from './AdminOrders';
import AdminProducts from './AdminProducts';
import AdminPayoutsNew from './AdminPayoutsNew';
import AdminBankVerification from './AdminBankVerification';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminDashboardHome />} />
        <Route path="affiliates" element={<AdminAffiliates />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="payouts" element={<AdminPayoutsNew />} />
        <Route path="bank-verification" element={<AdminBankVerification />} />
      </Routes>
    </AdminLayout>
  );
}