from django.contrib import admin
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'grade', 'price', 'stock', 'is_active', 'is_featured')
    list_filter = ('category', 'grade', 'is_active', 'is_featured')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('-is_featured', 'category', 'price')
    
    fieldsets = (
        (None, {'fields': ('name', 'slug', 'category', 'grade', 'description')}),
        ('Pricing', {'fields': ('price', 'discount_price', 'commission_rate')}),
        ('Stock & Weight', {'fields': ('stock', 'shares_available', 'weight_min', 'weight_max')}),
        ('Display', {'fields': ('image_url', 'is_active', 'is_featured')}),
    )
