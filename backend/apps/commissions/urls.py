from django.urls import path
from .views import (
    CommissionListView, CommissionSummaryView,
    BankAccountListView, BankAccountDetailView,
    PayoutListView, PayoutRequestView,
    AdminBankAccountListView, AdminVerifyBankAccountView, AdminRejectBankAccountView, AdminDeleteBankAccountView,
    AdminPayoutListView, AdminPayoutConfirmView, AdminPayoutRejectView,
    CouponListView, CouponDetailView, CouponValidateView
)

urlpatterns = [
    # Commissions
    path('', CommissionListView.as_view(), name='commission-list'),
    path('summary/', CommissionSummaryView.as_view(), name='commission-summary'),
    
    # Bank Accounts
    path('bank-accounts/', BankAccountListView.as_view(), name='bank-account-list'),
    path('bank-accounts/<int:pk>/', BankAccountDetailView.as_view(), name='bank-account-detail'),
    
    # Payouts
    path('payouts/', PayoutListView.as_view(), name='payout-list'),
    path('payouts/request/', PayoutRequestView.as_view(), name='payout-request'),
    
    # Coupons
    path('coupons/', CouponListView.as_view(), name='coupon-list'),
    path('coupons/<int:pk>/', CouponDetailView.as_view(), name='coupon-detail'),
    path('coupons/<str:code>/validate/', CouponValidateView.as_view(), name='coupon-validate'),
    
    # --- Admin Routes ---
    path('admin/bank-accounts/', AdminBankAccountListView.as_view(), name='admin-bank-account-list'),
    path('admin/bank-accounts/<int:pk>/verify/', AdminVerifyBankAccountView.as_view(), name='admin-bank-account-verify'),
    path('admin/bank-accounts/<int:pk>/reject/', AdminRejectBankAccountView.as_view(), name='admin-bank-account-reject'),
    path('admin/bank-accounts/<int:pk>/delete/', AdminDeleteBankAccountView.as_view(), name='admin-bank-account-delete'),
    
    # Admin Payouts
    path('admin/payouts/', AdminPayoutListView.as_view(), name='admin-payout-list'),
    path('admin/payouts/<int:pk>/confirm/', AdminPayoutConfirmView.as_view(), name='admin-payout-confirm'),
    path('admin/payouts/<int:pk>/reject/', AdminPayoutRejectView.as_view(), name='admin-payout-reject'),
]
