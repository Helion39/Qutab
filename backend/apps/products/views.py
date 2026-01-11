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
