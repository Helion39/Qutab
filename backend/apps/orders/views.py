from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.shortcuts import get_object_or_404
from django.utils import timezone

from .models import Order, OrderTracking, Wishlist
from .serializers import (
    OrderListSerializer, OrderDetailSerializer, CreateOrderSerializer,
    WishlistSerializer, WishlistCreateSerializer, AdminOrderSerializer
)
from apps.payments.zendit import zendit_service
from apps.products.models import Product


class OrderListView(generics.ListAPIView):
    """List customer's orders."""
    
    permission_classes = [IsAuthenticated]
    serializer_class = OrderListSerializer
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class OrderDetailView(generics.RetrieveAPIView):
    """Get order details."""
    
    permission_classes = [IsAuthenticated]
    serializer_class = OrderDetailSerializer
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class CreateOrderView(APIView):
    """Create a new order."""
    
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = CreateOrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        data = serializer.validated_data
        product = get_object_or_404(Product, id=data['product_id'], is_active=True)
        
        # Check stock
        if product.stock < data['quantity']:
            return Response(
                {'error': 'Insufficient stock.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Calculate pricing
        unit_price = product.effective_price
        total_amount = unit_price * data['quantity']
        discount_amount = 0
        
        # Apply coupon discount if provided
        coupon_code = data.get('coupon_code', '')
        if coupon_code:
            try:
                from apps.commissions.models import Coupon
                
                coupon = Coupon.objects.get(code=coupon_code.strip().upper())
                is_valid, message = coupon.is_valid(order_amount=total_amount)
                
                if not is_valid:
                    return Response(
                        {'error': f'Coupon invalid: {message}'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                # Calculate discount
                discount_amount = coupon.calculate_discount(total_amount)
                
                # Increment coupon usage
                coupon.increment_usage()
                
                # ATTRBUTION FIX: If no referral link was used, attribute to Coupon owner
                if not data.get('referral_code') and coupon.affiliate:
                    data['referral_code'] = coupon.affiliate.affiliate_code
                
            except Coupon.DoesNotExist:
                return Response(
                    {'error': 'Invalid coupon code'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        final_amount = total_amount - discount_amount
        
        # Create order
        order = Order.objects.create(
            user=request.user,
            product=product,
            quantity=data['quantity'],
            unit_price=unit_price,
            total_amount=total_amount,
            discount_amount=discount_amount,
            final_amount=final_amount,
            recipient_name=data['recipient_name'],
            recipient_location=data.get('recipient_location', ''),
            referral_code=data.get('referral_code', ''),
            coupon_code=coupon_code,
        )
        
        # Create initial tracking
        OrderTracking.objects.create(
            order=order,
            status='pending',
            message='Order created, awaiting payment.'
        )
        
        # Create Zendit payment invoice
        payment_info = {}
        try:
            result = zendit_service.create_invoice(order)
            if result['success']:
                order.zendit_invoice_id = result['invoice_id']
                order.zendit_payment_url = result['payment_url']
                order.save()
                payment_info = {'payment_url': result['payment_url']}
            else:
                # Log error but don't fail order creation (user can retry payment)
                print(f"Failed to create invoice: {result.get('error')}")
        except Exception as e:
            print(f"Payment error: {str(e)}")
        
        return Response({
            'message': 'Order created successfully.',
            'order': OrderDetailSerializer(order).data,
            'payment_url': order.zendit_payment_url,
        }, status=status.HTTP_201_CREATED)


class OrderTrackingView(APIView):
    """Get order tracking updates."""
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        order = get_object_or_404(Order, pk=pk, user=request.user)
        tracking = order.tracking_updates.all()
        from .serializers import OrderTrackingSerializer
        return Response(OrderTrackingSerializer(tracking, many=True).data)


class WishlistListView(generics.ListAPIView):
    """List customer's wishlist."""
    
    permission_classes = [IsAuthenticated]
    serializer_class = WishlistSerializer
    
    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user).select_related('product')


class WishlistAddView(APIView):
    """Add product to wishlist."""
    
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = WishlistCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        product = get_object_or_404(Product, id=serializer.validated_data['product_id'])
        
        wishlist_item, created = Wishlist.objects.get_or_create(
            user=request.user,
            product=product
        )
        
        if created:
            return Response({'message': 'Added to wishlist.'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Already in wishlist.'})


class WishlistRemoveView(APIView):
    """Remove product from wishlist."""
    
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, product_id):
        deleted, _ = Wishlist.objects.filter(
            user=request.user,
            product_id=product_id
        ).delete()
        
        if deleted:
            return Response({'message': 'Removed from wishlist.'})
        else:
            return Response({'message': 'Not in wishlist.'}, status=status.HTTP_404_NOT_FOUND)


class MockCheckoutView(APIView):
    """
    Enhanced mock checkout for testing affiliate commissions.
    Creates realistic completed orders with proper commission calculation.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        affiliate_code = request.data.get('affiliate_code')
        amount = request.data.get('final_amount')
        
        if not affiliate_code:
            return Response({'error': 'Affiliate code required'}, status=400)

        # Use our enhanced mock service
        from apps.payments.mock_service import MockPaymentService
        
        result = MockPaymentService.create_mock_transaction(
            affiliate_code=affiliate_code,
            amount=amount
        )
        
        if result['success']:
            return Response({
                'message': 'Mock transaction created successfully!',
                'transaction': result
            })
        else:
            return Response({
                'error': result['error']
            }, status=400)


class BulkMockDataView(APIView):
    """
    Generate bulk mock data for testing and demos.
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        from apps.payments.mock_service import MockPaymentService
        
        result = MockPaymentService.simulate_realistic_scenario()
        
        return Response(result)


# --- Admin Views ---

class AdminOrderListView(generics.ListAPIView):
    """
    Admin: List all orders with advanced filtering.
    """
    permission_classes = [IsAdminUser]
    serializer_class = AdminOrderSerializer
    
    def get_queryset(self):
        queryset = Order.objects.all().order_by('-created_at')
        
        # Filtering (simple for now, can be expanded)
        status_param = self.request.query_params.get('status')
        if status_param and status_param != 'all':
            queryset = queryset.filter(status=status_param)
            
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(order_number__icontains=search)
            # Add more search fields if needed (e.g. user email) via Q objects
            
        return queryset


class AdminOrderDetailView(generics.RetrieveAPIView):
    """
    Admin: Get full details of a specific order.
    """
    permission_classes = [IsAdminUser]
    serializer_class = AdminOrderSerializer
    queryset = Order.objects.all()
    lookup_field = 'id'


class AdminOrderStatusUpdateView(APIView):
    """
    Admin: Update order status manually.
    Triggers side effects (e.g. commissions) if marked as paid.
    """
    permission_classes = [IsAdminUser]

    def patch(self, request, id):
        order = get_object_or_404(Order, id=id)
        new_status = request.data.get('status')
        
        if not new_status:
            return Response({'error': 'Status is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        if new_status not in dict(Order.STATUS_CHOICES):
            return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)
            
        previous_status = order.status
        
        # If Admin marks as PAID, trigger the full payment success logic
        if new_status == 'paid' and previous_status != 'paid':
            from apps.payments.utils import process_payment_success
            process_payment_success(order, payment_method='manual_admin')
            # Fetch updated order to return
            order.refresh_from_db()
            return Response(AdminOrderSerializer(order).data)
            
        # For other status changes (processing, completed, cancelled)
        order.status = new_status
        if new_status == 'completed':
            order.completed_at = timezone.now()
        
        order.save()
        
        # Log the change
        OrderTracking.objects.create(
            order=order,
            status=new_status,
            message=f"Status updated to {new_status} by admin."
        )
        
        return Response(AdminOrderSerializer(order).data)
