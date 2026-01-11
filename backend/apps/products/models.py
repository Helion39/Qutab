from django.db import models


class Product(models.Model):
    """Qurban product/package model."""
    
    CATEGORY_CHOICES = [
        ('kambing', 'Kambing'),
        ('sapi', 'Sapi'),
    ]
    
    GRADE_CHOICES = [
        ('a', 'Grade A'),
        ('b', 'Grade B'),
        ('premium', 'Premium'),
    ]
    
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    grade = models.CharField(max_length=20, choices=GRADE_CHOICES, blank=True)
    description = models.TextField()
    
    # Pricing
    price = models.DecimalField(max_digits=12, decimal_places=0)  # Rupiah, no decimals
    discount_price = models.DecimalField(max_digits=12, decimal_places=0, null=True, blank=True)
    
    # Stock & Weight
    weight_min = models.DecimalField(max_digits=6, decimal_places=1, help_text='Minimum weight in kg')
    weight_max = models.DecimalField(max_digits=6, decimal_places=1, help_text='Maximum weight in kg')
    stock = models.PositiveIntegerField(default=0)
    
    # For sapi - number of shares (1/7)
    shares_available = models.PositiveIntegerField(default=1, help_text='For sapi: 7 shares per animal')
    
    # Image
    image_url = models.URLField(blank=True)
    
    # Status
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    
    # Commission rate for affiliates (percentage)
    commission_rate = models.DecimalField(max_digits=4, decimal_places=2, default=5.00, help_text='Affiliate commission %')
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'products'
        ordering = ['-is_featured', 'category', 'price']
    
    def __str__(self):
        return f"{self.name} - Rp {self.price:,.0f}"
    
    @property
    def effective_price(self):
        """Return discount price if available, otherwise regular price."""
        return self.discount_price or self.price
    
    @property
    def is_on_sale(self):
        return self.discount_price is not None and self.discount_price < self.price
