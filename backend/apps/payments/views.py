import json
import logging
from django.utils import timezone
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from apps.orders.models import Order, OrderTracking
from .zendit import zendit_service, ZenditService

logger = logging.getLogger(__name__)


class CreatePaymentView(APIView):
    """Create payment invoice for an order."""
    
    permission_classes = [IsAuthenticated]
    
    def post(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id, user=request.user)
        except Order.DoesNotExist:
            return Response(
                {'error': 'Order not found.'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Check if order is in valid state for payment
        if order.status != 'pending':
            return Response(
                {'error': f'Order is not in pending state. Current status: {order.status}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if already has payment URL
        if order.zendit_payment_url:
            return Response({
                'message': 'Payment already initiated.',
                'payment_url': order.zendit_payment_url,
            })
        
        # Create Zendit invoice
        result = zendit_service.create_invoice(order)
        
        if result['success']:
            # Update order with payment info
            order.zendit_invoice_id = result['invoice_id']
            order.zendit_payment_url = result['payment_url']
            order.save()
            
            # Add tracking
            OrderTracking.objects.create(
                order=order,
                status='pending',
                message='Payment invoice created. Awaiting payment.'
            )
            
            return Response({
                'message': 'Payment initiated.',
                'payment_url': result['payment_url'],
                'invoice_id': result['invoice_id'],
            })
        else:
            logger.error(f"Zendit error for order {order.order_number}: {result.get('error')}")
            return Response(
                {'error': 'Failed to create payment. Please try again.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@method_decorator(csrf_exempt, name='dispatch')
class PaymentWebhookView(APIView):
    """Handle Zendit payment webhooks."""
    
    permission_classes = [AllowAny]
    authentication_classes = []  # No auth for webhooks
    
    def post(self, request):
        # Get signature from header
        signature = request.headers.get('X-Zendit-Signature', '')
        
        # Verify signature (skip in development if not configured)
        if signature and not ZenditService.verify_webhook_signature(
            request.body, signature
        ):
            logger.warning('Invalid webhook signature')
            return Response(
                {'error': 'Invalid signature'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return Response(
                {'error': 'Invalid JSON'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get the event type and external_id (our order ID)
        event_type = data.get('event') or data.get('status')
        external_id = data.get('external_id') or data.get('data', {}).get('external_id')
        
        if not external_id:
            logger.warning(f'Webhook missing external_id: {data}')
            return Response({'status': 'ignored - no external_id'})
        
        try:
            order = Order.objects.get(id=external_id)
        except Order.DoesNotExist:
            logger.warning(f'Order not found for webhook: {external_id}')
            return Response({'status': 'ignored - order not found'})
        
        # Handle different event types
        if event_type in ['paid', 'PAID', 'payment.success', 'success']:
            self._handle_payment_success(order, data)
        elif event_type in ['expired', 'EXPIRED', 'payment.expired']:
            self._handle_payment_expired(order, data)
        elif event_type in ['failed', 'FAILED', 'payment.failed']:
            self._handle_payment_failed(order, data)
        else:
            logger.info(f'Unhandled webhook event: {event_type}')
        
        return Response({'status': 'received'})
    
    def _handle_payment_success(self, order, data):
        """Handle successful payment."""
        from .utils import process_payment_success
        payment_method = data.get('payment_method', 'zendit')
        process_payment_success(order, payment_method)
    
    def _handle_payment_expired(self, order, data):
        """Handle expired payment."""
        if order.status != 'pending':
            return
        
        order.status = 'cancelled'
        order.save()
        
        OrderTracking.objects.create(
            order=order,
            status='cancelled',
            message='Payment expired. Order cancelled.'
        )
        
        logger.info(f'Order {order.order_number} cancelled due to expired payment')
    
    def _handle_payment_failed(self, order, data):
        """Handle failed payment."""
        if order.status != 'pending':
            return
        
        # Don't cancel yet, allow retry
        OrderTracking.objects.create(
            order=order,
            status='pending',
            message='Payment failed. Please try again.'
        )
        
        logger.info(f'Order {order.order_number} payment failed')


class PaymentStatusView(APIView):
    """Check payment status for an order."""
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id, user=request.user)
        except Order.DoesNotExist:
            return Response(
                {'error': 'Order not found.'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # If already paid, return from database
        if order.status in ['paid', 'processing', 'distributed', 'completed']:
            return Response({
                'status': order.status,
                'paid_at': order.paid_at,
                'payment_method': order.payment_method,
            })
        
        # Check with Zendit if we have invoice_id
        if order.zendit_invoice_id:
            result = zendit_service.check_invoice_status(order.zendit_invoice_id)
            if result['success']:
                # Update order if paid
                if result['status'] in ['paid', 'PAID']:
                    order.status = 'paid'
                    order.paid_at = result.get('paid_at') or timezone.now()
                    order.payment_method = result.get('payment_method', 'zendit')
                    order.save()
                    
                    OrderTracking.objects.create(
                        order=order,
                        status='paid',
                        message='Payment confirmed via status check.'
                    )
                
                return Response({
                    'status': order.status,
                    'zendit_status': result['status'],
                    'paid_at': order.paid_at,
                })
        
        return Response({
            'status': order.status,
            'message': 'Payment pending.',
        })
