from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Product
from .serializers import ProductListSerializer, ProductDetailSerializer


class ProductListView(generics.ListAPIView):
    """List all active products."""
    
    permission_classes = [AllowAny]
    serializer_class = ProductListSerializer
    
    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True)
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        
        # Filter by featured
        featured = self.request.query_params.get('featured')
        if featured == 'true':
            queryset = queryset.filter(is_featured=True)
        
        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    """Get product details by slug."""
    
    permission_classes = [AllowAny]
    serializer_class = ProductDetailSerializer
    queryset = Product.objects.filter(is_active=True)
    lookup_field = 'slug'


# --- Admin Views ---

from rest_framework.permissions import IsAdminUser
from .serializers import AdminProductSerializer


class AdminProductListView(generics.ListCreateAPIView):
    """Admin: List all products (including inactive) or create new product."""
    
    permission_classes = [IsAdminUser]
    serializer_class = AdminProductSerializer
    
    def get_queryset(self):
        queryset = Product.objects.all().order_by('-created_at')
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
            
        # Filter by active status
        is_active = self.request.query_params.get('is_active')
        if is_active == 'true':
            queryset = queryset.filter(is_active=True)
        elif is_active == 'false':
            queryset = queryset.filter(is_active=False)
            
        return queryset


class AdminProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Admin: Get, update, or delete a product."""
    
    permission_classes = [IsAdminUser]
    serializer_class = AdminProductSerializer
    queryset = Product.objects.all()
    lookup_field = 'id'
    
    def perform_destroy(self, instance):
        # Soft delete - just deactivate instead of hard delete
        instance.is_active = False
        instance.save(update_fields=['is_active'])
