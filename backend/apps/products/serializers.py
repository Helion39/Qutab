from rest_framework import serializers
from .models import Product


class ProductListSerializer(serializers.ModelSerializer):
    """Serializer for product list view."""
    
    effective_price = serializers.DecimalField(max_digits=12, decimal_places=0, read_only=True)
    is_on_sale = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'category', 'grade',
            'price', 'discount_price', 'effective_price', 'is_on_sale',
            'weight_min', 'weight_max', 'stock', 'shares_available',
            'image_url', 'is_featured'
        ]


class ProductDetailSerializer(serializers.ModelSerializer):
    """Serializer for product detail view."""
    
    effective_price = serializers.DecimalField(max_digits=12, decimal_places=0, read_only=True)
    is_on_sale = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'category', 'grade', 'description',
            'price', 'discount_price', 'effective_price', 'is_on_sale',
            'weight_min', 'weight_max', 'stock', 'shares_available',
            'image_url', 'is_featured', 'created_at'
        ]
