from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    CustomerRegisterView,
    AffiliateRegisterView,
    LoginView,
    LogoutView,
    ProfileView,
    ChangePasswordView,
    AffiliateStatusView,
)

urlpatterns = [
    # Customer Auth
    path('auth/register/', CustomerRegisterView.as_view(), name='customer-register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    
    # Profile
    path('profile/', ProfileView.as_view(), name='profile'),
    path('profile/password/', ChangePasswordView.as_view(), name='change-password'),
    
    # Affiliate Auth
    path('affiliate/auth/register/', AffiliateRegisterView.as_view(), name='affiliate-register'),
    path('affiliate/auth/login/', LoginView.as_view(), name='affiliate-login'),  # Same as customer
    path('affiliate/status/', AffiliateStatusView.as_view(), name='affiliate-status'),
]
