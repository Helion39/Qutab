import logging
from django.utils import timezone
from apps.orders.models import OrderTracking

logger = logging.getLogger(__name__)

def process_payment_success(order, payment_method='zendit'):
    """
    Handle successful payment logic:
    1. Update order status to 'paid'
    2. Create OrderTracking entry
    3. Generate Affiliate Commission if referral_code exists
    """
    if order.status in ['paid', 'processing', 'completed', 'distributed']:
        logger.info(f'Order {order.order_number} already processed')
        return

    order.status = 'paid'
    order.paid_at = timezone.now()
    order.payment_method = payment_method
    order.save()
    
    # Add tracking
    OrderTracking.objects.create(
        order=order,
        status='paid',
        message=f'Payment received successfully via {payment_method}.'
    )
    
    logger.info(f'Order {order.order_number} marked as paid')
    
    # Create commission for affiliate if referral_code exists
    if order.referral_code:
        try:
            from apps.affiliates.models import Affiliate, Referral
            from apps.commissions.models import Commission
            
            affiliate = Affiliate.objects.get(
                affiliate_code=order.referral_code,
                status='approved'
            )
            
            # Create referral record with masked customer data
            referral = Referral.objects.create(
                affiliate=affiliate,
                order=order,
                customer=order.user,
                customer_name_masked=Referral.mask_name(order.user.get_full_name()),
                customer_email_masked=Referral.mask_email(order.user.email),
                status='confirmed'
            )
            
            # Calculate commission amount
            commission_rate = affiliate.custom_commission_rate or order.product.commission_rate
            commission_amount = Commission.calculate_amount(order.final_amount, commission_rate)
            
            # Create commission record (status=pending, will mature after 30 days)
            Commission.objects.create(
                affiliate=affiliate,
                referral=referral,
                order=order,
                order_amount=order.final_amount,
                commission_rate=commission_rate,
                amount=commission_amount,
                status='pending'
            )
            
            logger.info(f'Commission created for affiliate {affiliate.affiliate_code}: Rp {commission_amount:,.0f}')
            
        except Affiliate.DoesNotExist:
            logger.warning(f'Invalid or inactive referral code: {order.referral_code}')
        except Exception as e:
            logger.error(f'Error creating commission for order {order.order_number}: {str(e)}')
