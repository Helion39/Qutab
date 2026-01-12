from django.urls import path
from .views import (
    OrderListView, OrderDetailView, CreateOrderView, OrderTrackingView,
    WishlistListView, WishlistAddView, WishlistRemoveView, MockCheckoutView
)

urlpatterns = [
    # Orders
    path('', OrderListView.as_view(), name='order-list'),
    path('create/', CreateOrderView.as_view(), name='order-create'),
    path('<uuid:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('<uuid:pk>/tracking/', OrderTrackingView.as_view(), name='order-tracking'),
    
    # Wishlist
    path('wishlist/', WishlistListView.as_view(), name='wishlist-list'),
    path('wishlist/add/', WishlistAddView.as_view(), name='wishlist-add'),
    path('wishlist/remove/<int:product_id>/', WishlistRemoveView.as_view(), name='wishlist-remove'),
    
    # Mock / Testing
    path('mock-checkout/', MockCheckoutView.as_view(), name='mock-checkout'),
]
