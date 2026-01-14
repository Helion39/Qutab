from django.db import models
from django.conf import settings
import uuid


class Order(models.Model):
    """Customer order for Qurban products."""
    
    STATUS_CHOICES = [
        ('pending', 'Pending Payment'),
        ('paid', 'Paid'),
        ('processing', 'Processing'),
        ('distributed', 'Distributed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('refunded', 'Refunded'),
    ]
    
    # Order ID
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_number = models.CharField(max_length=20, unique=True, editable=False)
    
    # Customer
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='orders')
    
    # Product
    product = models.ForeignKey('products.Product', on_delete=models.PROTECT, related_name='orders')
    quantity = models.PositiveIntegerField(default=1)
    
    # Pricing at time of order
    unit_price = models.DecimalField(max_digits=12, decimal_places=0)
    total_amount = models.DecimalField(max_digits=12, decimal_places=0)
    discount_amount = models.DecimalField(max_digits=12, decimal_places=0, default=0)
    final_amount = models.DecimalField(max_digits=12, decimal_places=0)
    
    # Qurban recipient info
    recipient_name = models.CharField(max_length=200, help_text='Name for Qurban')
    recipient_location = models.CharField(max_length=200, blank=True, help_text='Distribution location preference')
    
    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Referral tracking
    referral_code = models.CharField(max_length=20, blank=True, null=True, help_text='Affiliate referral code')
    coupon_code = models.CharField(max_length=50, blank=True, null=True, help_text='Discount coupon used')
    
    # Payment info (Zendit)
    payment_method = models.CharField(max_length=50, blank=True)
    zendit_invoice_id = models.CharField(max_length=100, blank=True, null=True)
    zendit_payment_url = models.URLField(blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    paid_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'orders'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['referral_code', 'created_at']),
            models.Index(fields=['status', 'created_at']),
            models.Index(fields=['user', 'status']),
        ]
    
    def __str__(self):
        return f"Order {self.order_number} - {self.user.email}"
    
    def save(self, *args, **kwargs):
        if not self.order_number:
            # Generate order number: QTB-YYMMDD-XXXX with microseconds for uniqueness
            from django.utils import timezone
            import random
            now = timezone.now()
            date_str = now.strftime('%y%m%d')
            # Use microseconds + random for better uniqueness
            unique_str = f"{now.microsecond:06d}"[-4:] + f"{random.randint(0, 99):02d}"
            self.order_number = f"QTB-{date_str}-{unique_str}"
        super().save(*args, **kwargs)


class OrderTracking(models.Model):
    """Track order status changes."""
    
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='tracking_updates')
    status = models.CharField(max_length=20)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'order_tracking'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.order.order_number} - {self.status}"


class Wishlist(models.Model):
    """Customer wishlist for products."""
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='wishlist')
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE, related_name='wishlisted_by')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'wishlists'
        unique_together = ['user', 'product']
    
    def __str__(self):
        return f"{self.user.email} - {self.product.name}"
