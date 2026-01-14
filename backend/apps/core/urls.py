from django.urls import path
from .views import (
    SystemStatsView, 
    TopPerformersView,
    AdminAffiliateListView,
    AdminAffiliateDetailView,
    AdminAffiliateApproveView,
    AdminAffiliateRejectView,
    AdminAffiliateAddBalanceView,
)

urlpatterns = [
    # Dashboard Stats
    path('stats/', SystemStatsView.as_view(), name='system-stats'),
    path('top-performers/', TopPerformersView.as_view(), name='top-performers'),
    
    # Admin Affiliate Management
    path('admin/affiliates/', AdminAffiliateListView.as_view(), name='admin-affiliates-list'),
    path('admin/affiliates/<int:pk>/', AdminAffiliateDetailView.as_view(), name='admin-affiliates-detail'),
    path('admin/affiliates/<int:pk>/approve/', AdminAffiliateApproveView.as_view(), name='admin-affiliates-approve'),
    path('admin/affiliates/<int:pk>/reject/', AdminAffiliateRejectView.as_view(), name='admin-affiliates-reject'),
    path('admin/affiliates/<int:pk>/balance/add/', AdminAffiliateAddBalanceView.as_view(), name='admin-affiliates-add-balance'),
]