import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import AffiliateRegister from './components/affiliate/AffiliateRegister';
import AffiliateOTP from './components/affiliate/AffiliateOTP';
import AffiliatePending from './components/affiliate/AffiliatePending';
import AffiliateLogin from './components/affiliate/AffiliateLogin';
import AffiliateDashboard from './components/affiliate/AffiliateDashboard';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminSettings from './components/admin/AdminSettings';
import AdminLayout from './components/admin/AdminLayout';
import AdminCustomers from './components/admin/AdminCustomers';
import AdminReferrals from './components/admin/AdminReferrals';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAffiliateLoggedIn, setIsAffiliateLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} />} />
        <Route 
          path="/login" 
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />
          } 
        />
        <Route path="/affiliate/register" element={<AffiliateRegister />} />
        <Route path="/affiliate/otp" element={<AffiliateOTP />} />
        <Route path="/affiliate/pending" element={<AffiliatePending setIsAffiliateLoggedIn={setIsAffiliateLoggedIn} />} />
        <Route path="/affiliate/login" element={<AffiliateLogin setIsAffiliateLoggedIn={setIsAffiliateLoggedIn} />} />
        <Route 
          path="/affiliate/dashboard/*" 
          element={
            isAffiliateLoggedIn ? <AffiliateDashboard /> : <Navigate to="/affiliate/login" />
          } 
        />
        <Route 
          path="/dashboard/*" 
          element={
            isLoggedIn ? <Dashboard setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />
          } 
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard/*" 
          element={<AdminDashboard />} 
        />
        <Route 
          path="/admin/settings" 
          element={
            <AdminLayout>
              <AdminSettings />
            </AdminLayout>
          } 
        />
        <Route 
          path="/admin/customers" 
          element={
            <AdminLayout>
              <AdminCustomers />
            </AdminLayout>
          } 
        />
        <Route 
          path="/admin/referrals" 
          element={
            <AdminLayout>
              <AdminReferrals />
            </AdminLayout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;