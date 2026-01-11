from django.urls import path
from .views import (
    AffiliateProfileView, AffiliateStatusView, AffiliateDashboardView,
    AffiliateReferralsView, ReferralLinkRedirectView, AffiliateStatisticsView,
    AffiliateVerifyView
)

urlpatterns = [
    path('profile/', AffiliateProfileView.as_view(), name='affiliate-profile'),
    path('status/', AffiliateStatusView.as_view(), name='affiliate-status'),
    path('dashboard/', AffiliateDashboardView.as_view(), name='affiliate-dashboard'),
    path('referrals/', AffiliateReferralsView.as_view(), name='affiliate-referrals'),
    path('statistics/', AffiliateStatisticsView.as_view(), name='affiliate-statistics'),
    path('verify/<str:action>/<int:pk>/<str:token>/', AffiliateVerifyView.as_view(), name='affiliate-verify'),
]

# This should be added to main urls.py at root level for /r/{code}/
referral_redirect_patterns = [
    path('r/<str:code>/', ReferralLinkRedirectView.as_view(), name='referral-redirect'),
]
