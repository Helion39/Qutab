from django.urls import path
from .views import ProductListView, ProductDetailView, AdminProductListView, AdminProductDetailView

urlpatterns = [
    path('', ProductListView.as_view(), name='product-list'),
    path('<slug:slug>/', ProductDetailView.as_view(), name='product-detail'),
    
    # Admin
    path('admin/', AdminProductListView.as_view(), name='admin-product-list'),
    path('admin/<int:id>/', AdminProductDetailView.as_view(), name='admin-product-detail'),
]
