from django.db import models
from django.conf import settings
import secrets
import string


def generate_affiliate_code():
    """Generate unique 7-character affiliate code."""
    chars = string.ascii_letters + string.digits
    while True:
        code = ''.join(secrets.choice(chars) for _ in range(7))
        if not Affiliate.objects.filter(affiliate_code=code).exists():
            return code


class Affiliate(models.Model):
    """Affiliate account linked to a user."""
    
    STATUS_CHOICES = [
        ('pending', 'Pending Review'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('suspended', 'Suspended'),
    ]
    
    PLATFORM_CHOICES = [
        ('instagram', 'Instagram'),
        ('tiktok', 'TikTok'),
        ('youtube', 'YouTube'),
        ('facebook', 'Facebook'),
        ('twitter', 'Twitter/X'),
        ('blog', 'Website/Blog'),
        ('other', 'Other'),
    ]
    
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='affiliate_profile')
    affiliate_code = models.CharField(max_length=10, unique=True, blank=True)
    
    # Application info
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Contact & Social
    whatsapp = models.CharField(max_length=20)
    city = models.CharField(max_length=100)
    instagram = models.CharField(max_length=100, blank=True)
    tiktok = models.CharField(max_length=100, blank=True)
    youtube = models.CharField(max_length=200, blank=True)
    facebook = models.CharField(max_length=100, blank=True)
    
    # Application details
    primary_platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    reason = models.TextField(help_text='Why do you want to become an affiliate?')
    rejection_reason = models.TextField(blank=True, help_text='Reason for rejection if rejected')
    
    # Commission rate override (null = use product default)
    custom_commission_rate = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    approved_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'affiliates'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.get_full_name() or self.user.email} ({self.affiliate_code})"
    
    def save(self, *args, **kwargs):
        if not self.affiliate_code:
            self.affiliate_code = generate_affiliate_code()
        super().save(*args, **kwargs)
    
    @property
    def is_approved(self):
        return self.status == 'approved'
    
    @property
    def referral_url(self):
        """Get full referral URL."""
        from django.conf import settings
        base_url = getattr(settings, 'FRONTEND_URL', 'http://localhost:5173')
        return f"{base_url}/r/{self.affiliate_code}"


class ReferralClick(models.Model):
    """Track clicks on affiliate referral links."""
    
    affiliate = models.ForeignKey(Affiliate, on_delete=models.CASCADE, related_name='clicks')
    
    # Tracking info
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    referer_url = models.URLField(blank=True)
    landing_page = models.URLField(blank=True)
    
    # Timestamp
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'referral_clicks'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['affiliate', 'created_at']),
        ]
    
    def __str__(self):
        return f"Click for {self.affiliate.affiliate_code} at {self.created_at}"


class Referral(models.Model):
    """Track successful referrals (orders from affiliate links)."""
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),      # Order placed, not yet paid
        ('confirmed', 'Confirmed'),  # Paid, in holding period
        ('paid', 'Paid'),            # Commission paid to affiliate
        ('voided', 'Voided'),        # Order cancelled/refunded
    ]
    
    affiliate = models.ForeignKey(Affiliate, on_delete=models.CASCADE, related_name='referrals')
    order = models.OneToOneField('orders.Order', on_delete=models.CASCADE, related_name='referral')
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='referred_orders')
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Masked customer info for affiliate dashboard
    customer_name_masked = models.CharField(max_length=100)  # e.g., "Dar**** Pu****"
    customer_email_masked = models.CharField(max_length=100)  # e.g., "dar****@gmail.com"
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'referrals'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['affiliate', 'status', 'created_at']),
            models.Index(fields=['order']),
        ]
    
    def __str__(self):
        return f"Referral: {self.affiliate.affiliate_code} -> {self.order.order_number}"
    
    @staticmethod
    def mask_name(name):
        """Mask name for privacy: 'Darmawan Putra' -> 'Dar**** Pu****'"""
        parts = name.split()
        masked = []
        for part in parts:
            if len(part) <= 2:
                masked.append(part)
            else:
                masked.append(part[:3] + '*' * (len(part) - 3))
        return ' '.join(masked)
    
    @staticmethod
    def mask_email(email):
        """Mask email for privacy: 'darmawan@gmail.com' -> 'dar****@gmail.com'"""
        local, domain = email.split('@')
        if len(local) <= 3:
            return f"{local[0]}****@{domain}"
        return f"{local[:3]}****@{domain}"


class DailyStats(models.Model):
    """
    Pre-aggregated daily statistics for affiliate performance.
    Updated by nightly cron job for dashboard performance.
    """
    
    affiliate = models.ForeignKey(
        Affiliate,
        on_delete=models.CASCADE,
        related_name='daily_stats'
    )
    date = models.DateField(help_text='Date of these statistics')
    
    # Click metrics
    clicks = models.IntegerField(default=0, help_text='Total clicks for this day')
    
    # Conversion metrics
    conversions = models.IntegerField(default=0, help_text='Total conversions (orders) for this day')
    conversion_rate = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0,
        help_text='Conversion rate percentage (conversions/clicks * 100)'
    )
    
    # Commission metrics
    commission_earned = models.DecimalField(
        max_digits=12,
        decimal_places=0,
        default=0,
        help_text='Total commission earned this day'
    )
    commission_matured = models.DecimalField(
        max_digits=12,
        decimal_places=0,
        default=0,
        help_text='Total commission that matured this day'
    )
    
    # Order metrics
    total_sales = models.DecimalField(
        max_digits=12,
        decimal_places=0,
        default=0,
        help_text='Total order value from referrals this day'
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['affiliate', 'date']
        ordering = ['-date']
        indexes = [
            models.Index(fields=['affiliate', 'date']),
            models.Index(fields=['date']),
        ]
        verbose_name = 'Daily Stat'
        verbose_name_plural = 'Daily Stats'
    
    def __str__(self):
        return f'{self.affiliate.affiliate_code} - {self.date}'
    
    @staticmethod
    def get_stats_for_period(affiliate_id, start_date, end_date):
        """
        Get aggregated stats for a date range.
        
        Returns dict with totals for the period.
        """
        from django.db.models import Sum
        
        stats = DailyStats.objects.filter(
            affiliate_id=affiliate_id,
            date__gte=start_date,
            date__lte=end_date
        ).aggregate(
            total_clicks=Sum('clicks'),
            total_conversions=Sum('conversions'),
            total_commission=Sum('commission_earned'),
            total_sales=Sum('total_sales')
        )
        
        # Calculate overall conversion rate
        if stats['total_clicks'] and stats['total_clicks'] > 0:
            stats['conversion_rate'] = round(
                (stats['total_conversions'] / stats['total_clicks']) * 100,
                2
            )
        else:
            stats['conversion_rate'] = 0
        
        return stats
