from django.db import models, transaction
from django.db.models import Sum
from django.utils import timezone
from decimal import Decimal


class Commission(models.Model):
    """
    Commission earned by affiliate from a referral.
    
    IMPORTANT: Balance is NEVER stored as a field. 
    It is calculated dynamically to prevent race conditions.
    """
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),      # Order paid, in 30-day holding period
        ('available', 'Available'),  # Holding period complete, can be withdrawn
        ('paid', 'Paid'),            # Included in a completed payout
        ('voided', 'Voided'),        # Order cancelled/refunded
    ]
    
    affiliate = models.ForeignKey('affiliates.Affiliate', on_delete=models.CASCADE, related_name='commissions')
    referral = models.OneToOneField('affiliates.Referral', on_delete=models.CASCADE, related_name='commission')
    order = models.ForeignKey('orders.Order', on_delete=models.CASCADE, related_name='commissions')
    
    # Amount
    order_amount = models.DecimalField(max_digits=12, decimal_places=0)
    commission_rate = models.DecimalField(max_digits=4, decimal_places=2)  # e.g., 5.00 = 5%
    amount = models.DecimalField(max_digits=12, decimal_places=0)
    
    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Payout reference (when paid)
    payout = models.ForeignKey('Payout', on_delete=models.SET_NULL, null=True, blank=True, related_name='commission_items')
    
    # Voiding info
    voided_at = models.DateTimeField(null=True, blank=True)
    voided_reason = models.CharField(max_length=255, blank=True)
    
    # Maturation
    matured_at = models.DateTimeField(null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'commissions'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['affiliate', 'status', 'created_at']),
            models.Index(fields=['order']),
        ]
    
    def __str__(self):
        return f"Commission {self.affiliate.affiliate_code} - Rp {self.amount:,.0f} ({self.status})"
    
    @staticmethod
    def calculate_amount(order_amount, commission_rate):
        """Calculate commission amount from order amount and rate."""
        return Decimal(order_amount) * Decimal(commission_rate) / Decimal(100)
    
    def void(self, reason=''):
        """Mark commission as voided (order cancelled/refunded)."""
        if self.status in ['pending', 'available']:
            self.status = 'voided'
            self.voided_at = timezone.now()
            self.voided_reason = reason
            self.save()
    
    @classmethod
    def get_affiliate_balance(cls, affiliate_id):
        """
        Calculate affiliate's real-time balance.
        
        CRITICAL: This is calculated dynamically from commissions minus payouts
        to prevent race condition exploits (double-withdraw).
        """
        with transaction.atomic():
            # Total available commissions
            available = cls.objects.filter(
                affiliate_id=affiliate_id,
                status='available'
            ).aggregate(total=Sum('amount'))['total'] or Decimal(0)
            
            # Minus pending/processing payouts
            pending_payouts = Payout.objects.filter(
                affiliate_id=affiliate_id,
                status__in=['pending', 'processing']
            ).aggregate(total=Sum('amount'))['total'] or Decimal(0)
            
            return available - pending_payouts
    
    @classmethod
    def get_affiliate_summary(cls, affiliate_id):
        """Get summary of affiliate's commissions."""
        pending = cls.objects.filter(
            affiliate_id=affiliate_id,
            status='pending'
        ).aggregate(total=Sum('amount'))['total'] or Decimal(0)
        
        available = cls.objects.filter(
            affiliate_id=affiliate_id,
            status='available'
        ).aggregate(total=Sum('amount'))['total'] or Decimal(0)
        
        paid = cls.objects.filter(
            affiliate_id=affiliate_id,
            status='paid'
        ).aggregate(total=Sum('amount'))['total'] or Decimal(0)
        
        # Actual withdrawable balance (available minus pending payouts)
        withdrawable = cls.get_affiliate_balance(affiliate_id)
        
        return {
            'pending': pending,
            'available': available,
            'withdrawable': withdrawable,
            'paid': paid,
            'total': pending + available + paid,
        }


class BankAccount(models.Model):
    """Affiliate's bank account for payouts."""
    
    VERIFICATION_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('verified', 'Verified'),
        ('rejected', 'Rejected'),
    ]
    
    affiliate = models.ForeignKey('affiliates.Affiliate', on_delete=models.CASCADE, related_name='bank_accounts')
    
    bank_name = models.CharField(max_length=100)
    account_number = models.CharField(max_length=50)
    account_holder = models.CharField(max_length=200)
    
    # KTP verification
    ktp_image = models.ImageField(upload_to='ktp/', blank=True)
    verification_status = models.CharField(max_length=20, choices=VERIFICATION_STATUS_CHOICES, default='pending')
    
    is_primary = models.BooleanField(default=False)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    verified_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'bank_accounts'
    
    def __str__(self):
        return f"{self.bank_name} - {self.account_number[-4:].rjust(len(self.account_number), '*')}"
    
    def save(self, *args, **kwargs):
        # If this is set as primary, unset others
        if self.is_primary:
            BankAccount.objects.filter(affiliate=self.affiliate, is_primary=True).exclude(pk=self.pk).update(is_primary=False)
        super().save(*args, **kwargs)


class Payout(models.Model):
    """Payout request from affiliate."""
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),       # Requested, awaiting admin approval
        ('processing', 'Processing'), # Approved, being processed
        ('paid', 'Paid'),             # Money transferred
        ('rejected', 'Rejected'),     # Admin rejected
        ('failed', 'Failed'),         # Transfer failed
    ]
    
    affiliate = models.ForeignKey('affiliates.Affiliate', on_delete=models.CASCADE, related_name='payouts')
    bank_account = models.ForeignKey(BankAccount, on_delete=models.PROTECT, related_name='payouts')
    
    amount = models.DecimalField(max_digits=12, decimal_places=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Bank account snapshot (in case bank details change later)
    bank_name_snapshot = models.CharField(max_length=100)
    account_number_snapshot = models.CharField(max_length=50)
    account_holder_snapshot = models.CharField(max_length=200)
    
    # Admin notes
    admin_notes = models.TextField(blank=True)
    rejection_reason = models.CharField(max_length=255, blank=True)
    
    # Transfer info (when paid)
    transfer_reference = models.CharField(max_length=100, blank=True)
    transfer_date = models.DateTimeField(null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    processed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'payouts'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Payout {self.affiliate.affiliate_code} - Rp {self.amount:,.0f} ({self.status})"
    
    def save(self, *args, **kwargs):
        # Snapshot bank details on creation
        if not self.pk:
            self.bank_name_snapshot = self.bank_account.bank_name
            self.account_number_snapshot = self.bank_account.account_number
            self.account_holder_snapshot = self.bank_account.account_holder
        super().save(*args, **kwargs)
    
    @classmethod
    def request_payout(cls, affiliate, bank_account, amount):
        """
        Create a payout request with proper locking.
        
        CRITICAL: Uses transaction and row locking to prevent race conditions.
        """
        from django.db import IntegrityError
        
        with transaction.atomic():
            # Lock the affiliate row to prevent concurrent modifications
            from apps.affiliates.models import Affiliate
            locked_affiliate = Affiliate.objects.select_for_update().get(pk=affiliate.pk)
            
            # Calculate actual balance
            actual_balance = Commission.get_affiliate_balance(affiliate.id)
            
            # Validate amount
            if amount > actual_balance:
                raise ValueError(f'Insufficient balance. Available: Rp {actual_balance:,.0f}')
            
            if amount < 50000:  # Minimum payout
                raise ValueError('Minimum payout is Rp 50,000')
            
            # Create payout
            payout = cls.objects.create(
                affiliate=affiliate,
                bank_account=bank_account,
                amount=amount
            )
            
            return payout


class Coupon(models.Model):
    """
    Discount coupons created for affiliates.
    Can be percentage-based or fixed amount discounts.
    """
    
    DISCOUNT_TYPE_CHOICES = [
        ('percentage', 'Percentage'),
        ('fixed', 'Fixed Amount'),
    ]
    
    affiliate = models.ForeignKey(
        'affiliates.Affiliate',
        on_delete=models.CASCADE,
        related_name='coupons',
        help_text='Affiliate who owns this coupon'
    )
    code = models.CharField(
        max_length=50,
        unique=True,
        help_text='Unique coupon code (e.g., QURBAN2024)'
    )
    discount_type = models.CharField(
        max_length=20,
        choices=DISCOUNT_TYPE_CHOICES,
        default='percentage'
    )
    discount_value = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        help_text='Percentage (0-100) or fixed amount in Rupiah'
    )
    
    # Validity period
    valid_from = models.DateTimeField()
    valid_until = models.DateTimeField()
    
    # Usage limits
    usage_limit = models.IntegerField(
        null=True,
        blank=True,
        help_text='Maximum number of times this coupon can be used (null = unlimited)'
    )
    usage_count = models.IntegerField(
        default=0,
        help_text='Number of times this coupon has been used'
    )
    
    # Minimum order amount (optional)
    min_order_amount = models.DecimalField(
        max_digits=12,
        decimal_places=0,
        null=True,
        blank=True,
        help_text='Minimum order amount required to use this coupon'
    )
    
    # Status
    is_active = models.BooleanField(default=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['code']),
            models.Index(fields=['affiliate', 'is_active']),
        ]
    
    def __str__(self):
        return f'{self.code} ({self.get_discount_display()})'
    
    def get_discount_display(self):
        """Return human-readable discount amount."""
        if self.discount_type == 'percentage':
            return f'{self.discount_value}%'
        else:
            return f'Rp {self.discount_value:,.0f}'
    
    def is_valid(self, order_amount=None):
        """
        Check if coupon is currently valid.
        
        Args:
            order_amount: Optional order amount to check minimum requirement
        
        Returns:
            tuple: (is_valid: bool, message: str)
        """
        now = timezone.now()
        
        if not self.is_active:
            return False, 'Coupon is inactive'
        
        if now < self.valid_from:
            return False, 'Coupon not yet valid'
        
        if now > self.valid_until:
            return False, 'Coupon has expired'
        
        if self.usage_limit and self.usage_count >= self.usage_limit:
            return False, 'Coupon usage limit reached'
        
        if order_amount and self.min_order_amount:
            if order_amount < self.min_order_amount:
                return False, f'Minimum order amount is Rp {self.min_order_amount:,.0f}'
        
        return True, 'Valid'
    
    def calculate_discount(self, amount):
        """
        Calculate discount amount for given order amount.
        
        Args:
            amount: Original order amount
        
        Returns:
            Decimal: Discount amount
        """
        if self.discount_type == 'percentage':
            discount = amount * (self.discount_value / Decimal('100'))
        else:
            discount = self.discount_value
        
        # Discount cannot exceed order amount
        return min(discount, amount)
    
    def apply_discount(self, amount):
        """
        Apply discount to amount and return final price.
        
        Args:
            amount: Original amount
        
        Returns:
            Decimal: Amount after discount
        """
        discount = self.calculate_discount(amount)
        return max(Decimal('0'), amount - discount)
    
    def increment_usage(self):
        """Increment usage count (called when coupon is used)."""
        self.usage_count += 1
        self.save(update_fields=['usage_count', 'updated_at'])
