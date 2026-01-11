from django.urls import path
from .views import (
    CommissionListView, CommissionSummaryView,
    BankAccountListView, BankAccountDetailView,
    PayoutListView, PayoutRequestView
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
]
