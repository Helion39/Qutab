from django.urls import path
from .views import (
    CommissionListView, CommissionSummaryView,
    BankAccountListView, BankAccountDetailView,
    PayoutListView, PayoutRequestView,
    AdminBankAccountListView, AdminVerifyBankAccountView, AdminRejectBankAccountView, AdminDeleteBankAccountView
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
    
    # --- Admin Routes ---
    path('admin/bank-accounts/', AdminBankAccountListView.as_view(), name='admin-bank-account-list'),
    path('admin/bank-accounts/<int:pk>/verify/', AdminVerifyBankAccountView.as_view(), name='admin-bank-account-verify'),
    path('admin/bank-accounts/<int:pk>/reject/', AdminRejectBankAccountView.as_view(), name='admin-bank-account-reject'),
    path('admin/bank-accounts/<int:pk>/delete/', AdminDeleteBankAccountView.as_view(), name='admin-bank-account-delete'),
]
