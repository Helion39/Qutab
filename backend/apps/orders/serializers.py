from rest_framework import serializers
from .models import Order, OrderTracking, Wishlist
from apps.products.serializers import ProductListSerializer


class OrderTrackingSerializer(serializers.ModelSerializer):
    """Serializer for order tracking updates."""
    
    class Meta:
        model = OrderTracking
        fields = ['status', 'message', 'created_at']


class OrderListSerializer(serializers.ModelSerializer):
    """Serializer for order list view."""
    
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_category = serializers.CharField(source='product.category', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'product_name', 'product_category',
            'quantity', 'final_amount', 'status', 'status_display',
            'recipient_name', 'created_at'
        ]


class OrderDetailSerializer(serializers.ModelSerializer):
    """Serializer for order detail view."""
    
    product = ProductListSerializer(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    tracking_updates = OrderTrackingSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'product', 'quantity',
            'unit_price', 'total_amount', 'discount_amount', 'final_amount',
            'recipient_name', 'recipient_location',
            'status', 'status_display', 'payment_method',
            'referral_code', 'coupon_code',
            'zendit_payment_url',
            'created_at', 'paid_at', 'completed_at',
            'tracking_updates'
        ]


class CreateOrderSerializer(serializers.Serializer):
    """Serializer for creating a new order."""
    
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1, default=1)
    recipient_name = serializers.CharField(max_length=200)
    recipient_location = serializers.CharField(max_length=200, required=False, allow_blank=True)
    referral_code = serializers.CharField(max_length=20, required=False, allow_blank=True)
    coupon_code = serializers.CharField(max_length=50, required=False, allow_blank=True)
    
    def validate_product_id(self, value):
        from apps.products.models import Product
        if not Product.objects.filter(id=value, is_active=True).exists():
            raise serializers.ValidationError('Product not found or not available.')
        return value


class WishlistSerializer(serializers.ModelSerializer):
    """Serializer for wishlist items."""
    
    product = ProductListSerializer(read_only=True)
    
    class Meta:
        model = Wishlist
        fields = ['id', 'product', 'created_at']


class WishlistCreateSerializer(serializers.Serializer):
    """Serializer for adding item to wishlist."""
    
    product_id = serializers.IntegerField()
    
    def validate_product_id(self, value):
        from apps.products.models import Product
        if not Product.objects.filter(id=value, is_active=True).exists():
            raise serializers.ValidationError('Product not found.')
        return value
