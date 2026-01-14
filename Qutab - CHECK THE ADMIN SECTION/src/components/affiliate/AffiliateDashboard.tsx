import { Routes, Route, Navigate } from 'react-router-dom';
import AffiliateDashboardLayout from './dashboard/AffiliateDashboardLayout';
import AffiliateDashboardHome from './dashboard/AffiliateDashboardHome';
import AffiliateProfilePage from './dashboard/AffiliateProfilePage';
import AffiliateBannerLink from './dashboard/AffiliateBannerLink';
import AffiliateStatistik from './dashboard/AffiliateStatistik';
import AffiliateRekening from './dashboard/AffiliateRekening';
import AffiliateCommission from './dashboard/AffiliateCommission';
import AffiliateReferrals from './dashboard/AffiliateReferrals';
import AffiliateKuponDiskon from './dashboard/AffiliateKuponDiskon';
import AffiliateHelpdesk from './dashboard/AffiliateHelpdesk';

export default function AffiliateDashboard() {
  return (
    <AffiliateDashboardLayout>
      <Routes>
        <Route path="/" element={<AffiliateDashboardHome />} />
        <Route path="/profile" element={<AffiliateProfilePage />} />
        <Route path="/banner-link" element={<AffiliateBannerLink />} />
        <Route path="/statistik" element={<AffiliateStatistik />} />
        <Route path="/rekening" element={<AffiliateRekening />} />
        <Route path="/commission" element={<AffiliateCommission />} />
        <Route path="/leads" element={<AffiliateReferrals />} />
        <Route path="/kupon" element={<AffiliateKuponDiskon />} />
        <Route path="/helpdesk" element={<AffiliateHelpdesk />} />
        <Route path="*" element={<Navigate to="/affiliate/dashboard" replace />} />
      </Routes>
    </AffiliateDashboardLayout>
  );
}