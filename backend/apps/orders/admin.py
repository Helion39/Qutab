from django.contrib import admin
from .models import Order, OrderTracking, Wishlist


class OrderTrackingInline(admin.TabularInline):
    model = OrderTracking
    extra = 0
    readonly_fields = ('status', 'message', 'created_at')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'user', 'product', 'final_amount', 'status', 'created_at')
    list_filter = ('status', 'product__category', 'created_at')
    search_fields = ('order_number', 'user__email', 'recipient_name')
    readonly_fields = ('id', 'order_number', 'created_at', 'updated_at', 'paid_at', 'completed_at')
    inlines = [OrderTrackingInline]
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Order Info', {'fields': ('id', 'order_number', 'user', 'status')}),
        ('Product', {'fields': ('product', 'quantity')}),
        ('Pricing', {'fields': ('unit_price', 'total_amount', 'discount_amount', 'final_amount')}),
        ('Recipient', {'fields': ('recipient_name', 'recipient_location')}),
        ('Referral & Coupon', {'fields': ('referral_code', 'coupon_code')}),
        ('Payment (Zendit)', {'fields': ('payment_method', 'zendit_invoice_id', 'zendit_payment_url')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at', 'paid_at', 'completed_at')}),
    )
    
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        # Create tracking entry on status change
        if change:
            OrderTracking.objects.create(
                order=obj,
                status=obj.status,
                message=f'Status updated to {obj.get_status_display()}'
            )


@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'created_at')
    list_filter = ('product__category',)
    search_fields = ('user__email', 'product__name')
