from decimal import Decimal
from django.utils import timezone
from django.db import transaction

from apps.commissions.models import Commission
from apps.affiliates.models import Affiliate, Referral
from apps.products.models import Product

class CommissionService:
    """Service to handle commission calculations and creation."""
    
    @staticmethod
    def calculate_commission(order):
        """
        Calculate and create commission for a completed order.
        Idempotent: Checks if commission/referral exists first.
        """
        if not order.referral_code:
            return None
        
        # 1. Find Affiliate
        try:
            affiliate = Affiliate.objects.get(affiliate_code=order.referral_code, status='approved')
        except Affiliate.DoesNotExist:
            print(f"Commission skipped: Invalid or unapproved affiliate code {order.referral_code}")
            return None
            
        # 2. Prevent self-referral (unless allowed for dev/mock, but logic typically forbids it)
        # For Mock Checkout, we might want to allow it if order.user == affiliate.user.
        # But logically, you can't earn commission on your own purchase.
        # I'll add a check but maybe skip it for 'mock_test' payment method?
        if order.user == affiliate.user and order.payment_method != 'mock_test':
            print("Commission skipped: Self-referral")
            return None

        with transaction.atomic():
            # 3. Ensure Referral Exists
            referral, created = Referral.objects.get_or_create(
                order=order,
                defaults={
                    'affiliate': affiliate,
                    'customer': order.user,
                    'status': 'confirmed' if order.status == 'completed' else 'pending',
                    'customer_name_masked': Referral.mask_name(order.recipient_name or order.user.get_full_name()),
                    'customer_email_masked': Referral.mask_email(order.user.email),
                }
            )

            # 4. Check if commission already exists
            if hasattr(referral, 'commission'):
                return referral.commission
            
            # 5. Determine Commission Rate
            # Priority: Affiliate Custom > Product > Global Default (5%)
            rate = Decimal('5.00') # Default
            
            # Check product logic
            # If order has multiple items, we might need to loop items.
            # But Order model (checked earlier) seems to link to ONE product (Field: product) directly?
            # Let's re-verify Order model. Views.py line 212: product=product.
            # Yes, simplified model for now.
            
            if order.product:
                rate = order.product.commission_rate
            
            if affiliate.custom_commission_rate:
                rate = affiliate.custom_commission_rate
                
            # 6. Calculate Amount
            # Base amount: Order Final Amount (Revenue)
            amount = Commission.calculate_amount(order.final_amount, rate)
            
            # 7. Create Commission
            commission = Commission.objects.create(
                affiliate=affiliate,
                referral=referral,
                order=order,
                order_amount=order.final_amount,
                commission_rate=rate,
                amount=amount,
                status='pending' # Always pending initially (waiting for maturation)
            )
            
            return commission
