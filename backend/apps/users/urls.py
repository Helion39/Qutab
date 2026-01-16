from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    CustomerRegisterView,
    AffiliateRegisterView,
    LoginView,
    GoogleLoginView,
    LogoutView,
    ProfileView,
    ChangePasswordView,
    AffiliateStatusView,
    MockCleanupView,
    AdminUserListView,
    AdminUserDetailView,
    AdminUserSuspendView,
    AdminUserActivateView,
    AdminUserResetPasswordView,
)
from .otp_models import EmailOTP
from .otp_views import SendOTPView, VerifyOTPView, ResendOTPView
from .password_reset_views import ForgotPasswordView, ResetPasswordView

urlpatterns = [
    # Customer Auth
    path('auth/register/', CustomerRegisterView.as_view(), name='customer-register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/google-login/', GoogleLoginView.as_view(), name='google-login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    
    # Password Reset
    path('auth/forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('auth/reset-password/', ResetPasswordView.as_view(), name='reset-password'),
    
    # Profile
    path('auth/profile/', ProfileView.as_view(), name='profile'),
    path('auth/profile/password/', ChangePasswordView.as_view(), name='change-password'),
    
    # OTP Email Verification
    path('auth/otp/send/', SendOTPView.as_view(), name='send-otp'),
    path('auth/otp/verify/', VerifyOTPView.as_view(), name='verify-otp'),
    path('auth/otp/resend/', ResendOTPView.as_view(), name='resend-otp'),
    
    # Affiliate Auth
    path('affiliate/auth/register/', AffiliateRegisterView.as_view(), name='affiliate-register'),
    path('affiliate/auth/login/', LoginView.as_view(), name='affiliate-login'),  # Same as customer
    path('affiliate/status/', AffiliateStatusView.as_view(), name='affiliate-status'),
    
    # Dev Tools
    path('auth/dev/cleanup/', MockCleanupView.as_view(), name='dev-cleanup'),
    
    # Admin User Management
    path('admin/users/', AdminUserListView.as_view(), name='admin-user-list'),
    path('admin/users/<uuid:id>/', AdminUserDetailView.as_view(), name='admin-user-detail'),
    path('admin/users/<uuid:id>/suspend/', AdminUserSuspendView.as_view(), name='admin-user-suspend'),
    path('admin/users/<uuid:id>/activate/', AdminUserActivateView.as_view(), name='admin-user-activate'),
    path('admin/users/<uuid:id>/reset-password/', AdminUserResetPasswordView.as_view(), name='admin-user-reset-password'),
]

