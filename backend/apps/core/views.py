"""
Core admin and utility views.
"""

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import get_user_model
from django.db.models import Sum, Count
from django.utils import timezone
from django.shortcuts import get_object_or_404

from apps.affiliates.models import Affiliate
from apps.commissions.models import Commission
from apps.orders.models import Order
from apps.products.models import Product

User = get_user_model()


def is_admin(user):
    """Check if user has admin privileges."""
    return user.is_staff or user.is_superuser or user.role == 'admin'


class SystemStatsView(APIView):
    """Get system-wide statistics for admin dashboard."""
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # Only allow admin users
        if not is_admin(request.user):
            return Response({'error': 'Admin access required'}, status=403)
        
        # Basic counts
        stats = {
            'users': {
                'total': User.objects.count(),
                'customers': User.objects.filter(role='customer').count(),
                'affiliates': User.objects.filter(role='affiliate').count(),
                'admins': User.objects.filter(role='admin').count(),
            },
            'affiliates': {
                'total': Affiliate.objects.count(),
                'pending': Affiliate.objects.filter(status='pending').count(),
                'approved': Affiliate.objects.filter(status='approved').count(),
                'rejected': Affiliate.objects.filter(status='rejected').count(),
            },
            'orders': {
                'total': Order.objects.count(),
                'completed': Order.objects.filter(status='completed').count(),
                'pending': Order.objects.filter(status='pending').count(),
                'mock_tests': Order.objects.filter(payment_method='mock_test').count(),
            },
            'commissions': {
                'total': Commission.objects.count(),
                'pending': Commission.objects.filter(status='pending').count(),
                'available': Commission.objects.filter(status='available').count(),
                'paid': Commission.objects.filter(status='paid').count(),
            },
            'products': {
                'total': Product.objects.count(),
                'active': Product.objects.filter(is_active=True).count(),
                'featured': Product.objects.filter(is_featured=True).count(),
            }
        }
        
        # Financial summary
        total_revenue = Order.objects.filter(status='completed').aggregate(
            total=Sum('final_amount')
        )['total'] or 0
        
        total_commissions = Commission.objects.aggregate(
            total=Sum('amount')
        )['total'] or 0
        
        stats['financial'] = {
            'total_revenue': float(total_revenue),
            'total_commissions': float(total_commissions),
            'commission_rate': round((float(total_commissions) / float(total_revenue) * 100) if total_revenue > 0 else 0, 2)
        }
        
        return Response(stats)


class TopPerformersView(APIView):
    """Get top performing affiliates."""
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        if not is_admin(request.user):
            return Response({'error': 'Admin access required'}, status=403)
        
        # Top affiliates by commission earned
        top_affiliates = []
        
        for affiliate in Affiliate.objects.filter(status='approved'):
            commissions = Commission.objects.filter(affiliate=affiliate)
            total_earned = commissions.aggregate(total=Sum('amount'))['total'] or 0
            referrals_count = affiliate.referrals.count()
            clicks_count = affiliate.clicks.count()
            
            conversion_rate = (referrals_count / clicks_count * 100) if clicks_count > 0 else 0
            
            top_affiliates.append({
                'id': affiliate.id,
                'name': affiliate.user.get_full_name(),
                'email': affiliate.user.email,
                'affiliate_code': affiliate.affiliate_code,
                'total_earned': float(total_earned),
                'commissions_count': commissions.count(),
                'referrals_count': referrals_count,
                'clicks_count': clicks_count,
                'conversion_rate': round(conversion_rate, 2),
                'joined_date': affiliate.created_at.isoformat(),
            })
        
        # Sort by total earned
        top_affiliates.sort(key=lambda x: x['total_earned'], reverse=True)
        
        return Response({
            'top_performers': top_affiliates[:10],
            'total_affiliates': len(top_affiliates)
        })


# ============================================================
# ADMIN AFFILIATE MANAGEMENT VIEWS
# ============================================================

class AdminAffiliateListView(APIView):
    """List all affiliates for admin dashboard."""
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        if not is_admin(request.user):
            return Response({'error': 'Admin access required'}, status=403)
        
        # Get all affiliates with related user data
        affiliates = Affiliate.objects.select_related('user').all().order_by('-created_at')
        
        # Optional status filter
        status_filter = request.query_params.get('status')
        if status_filter and status_filter != 'all':
            affiliates = affiliates.filter(status=status_filter)
        
        result = []
        for aff in affiliates:
            # Get commission data
            commissions = Commission.objects.filter(affiliate=aff)
            total_earned = commissions.aggregate(total=Sum('amount'))['total'] or 0
            paid_amount = commissions.filter(status='paid').aggregate(total=Sum('amount'))['total'] or 0
            
            result.append({
                'id': aff.id,
                'user': {
                    'id': aff.user.id,
                    'email': aff.user.email,
                    'full_name': aff.user.get_full_name() or aff.user.email,
                    'first_name': aff.user.first_name,
                    'last_name': aff.user.last_name,
                },
                'affiliate_code': aff.affiliate_code,
                'status': aff.status,
                'phone_number': aff.whatsapp,
                'city': aff.city,
                'instagram_handle': aff.instagram,
                'tiktok_handle': aff.tiktok,
                'youtube_handle': aff.youtube,
                'facebook_handle': aff.facebook,
                'platform': aff.primary_platform,
                'reason': aff.reason,
                'rejection_reason': aff.rejection_reason,
                'date_joined': aff.created_at.isoformat(),
                'approved_at': aff.approved_at.isoformat() if aff.approved_at else None,
                'referral_count': aff.referrals.count(),
                'balance': float(total_earned - paid_amount),
                'paid_commission': float(paid_amount),
                'total_earned': float(total_earned),
            })
        
        return Response(result)


class AdminAffiliateDetailView(APIView):
    """Get single affiliate details for admin."""
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        if not is_admin(request.user):
            return Response({'error': 'Admin access required'}, status=403)
        
        aff = get_object_or_404(Affiliate, pk=pk)
        
        # Get commission data
        commissions = Commission.objects.filter(affiliate=aff)
        total_earned = commissions.aggregate(total=Sum('amount'))['total'] or 0
        paid_amount = commissions.filter(status='paid').aggregate(total=Sum('amount'))['total'] or 0
        
        return Response({
            'id': aff.id,
            'user': {
                'id': aff.user.id,
                'email': aff.user.email,
                'full_name': aff.user.get_full_name() or aff.user.email,
                'first_name': aff.user.first_name,
                'last_name': aff.user.last_name,
            },
            'affiliate_code': aff.affiliate_code,
            'status': aff.status,
            'phone_number': aff.whatsapp,
            'city': aff.city,
            'instagram_handle': aff.instagram,
            'tiktok_handle': aff.tiktok,
            'youtube_handle': aff.youtube,
            'facebook_handle': aff.facebook,
            'platform': aff.primary_platform,
            'reason': aff.reason,
            'rejection_reason': aff.rejection_reason,
            'date_joined': aff.created_at.isoformat(),
            'approved_at': aff.approved_at.isoformat() if aff.approved_at else None,
            'referral_count': aff.referrals.count(),
            'balance': float(total_earned - paid_amount),
            'paid_commission': float(paid_amount),
            'total_earned': float(total_earned),
        })


class AdminAffiliateApproveView(APIView):
    """Approve an affiliate application."""
    
    permission_classes = [IsAuthenticated]
    
    def post(self, request, pk):
        if not is_admin(request.user):
            return Response({'error': 'Admin access required'}, status=403)
        
        affiliate = get_object_or_404(Affiliate, pk=pk)
        
        if affiliate.status == 'approved':
            return Response({'message': 'Affiliate is already approved'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Approve the affiliate
        affiliate.status = 'approved'
        affiliate.approved_at = timezone.now()
        affiliate.save()
        
        # Optional: Send email notification
        try:
            from apps.core.services.email import EmailService
            EmailService.send_affiliate_approved(affiliate.user, affiliate)
        except Exception as e:
            print(f"Failed to send approval email: {e}")
        
        return Response({
            'message': f'Affiliate {affiliate.user.email} has been approved.',
            'affiliate_id': affiliate.id,
            'status': 'approved'
        })


class AdminAffiliateRejectView(APIView):
    """Reject an affiliate application."""
    
    permission_classes = [IsAuthenticated]
    
    def post(self, request, pk):
        if not is_admin(request.user):
            return Response({'error': 'Admin access required'}, status=403)
        
        affiliate = get_object_or_404(Affiliate, pk=pk)
        
        if affiliate.status == 'rejected':
            return Response({'message': 'Affiliate is already rejected'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get rejection reason from request body
        rejection_reason = request.data.get('reason', 'Application did not meet requirements.')
        
        # Reject the affiliate
        affiliate.status = 'rejected'
        affiliate.rejection_reason = rejection_reason
        affiliate.save()
        
        # Optional: Send email notification
        try:
            from apps.core.services.email import EmailService
            EmailService.send_affiliate_rejected(affiliate.user)
        except Exception as e:
            print(f"Failed to send rejection email: {e}")
        
        return Response({
            'message': f'Affiliate {affiliate.user.email} has been rejected.',
            'affiliate_id': affiliate.id,
            'status': 'rejected',
            'reason': rejection_reason
        })


class AdminAffiliateAddBalanceView(APIView):
    """Manually add balance/commission to an affiliate."""
    
    permission_classes = [IsAuthenticated]
    
    def post(self, request, pk):
        if not is_admin(request.user):
            return Response({'error': 'Admin access required'}, status=403)
        
        affiliate = get_object_or_404(Affiliate, pk=pk)
        
        if affiliate.status != 'approved':
            return Response({'error': 'Can only add balance to approved affiliates'}, status=status.HTTP_400_BAD_REQUEST)
        
        amount = request.data.get('amount')
        reason = request.data.get('reason', 'Manual adjustment by admin')
        
        if not amount:
            return Response({'error': 'Amount is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            amount = float(amount)
            if amount <= 0:
                raise ValueError("Amount must be positive")
        except ValueError:
            return Response({'error': 'Invalid amount'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create a manual commission entry
        commission = Commission.objects.create(
            affiliate=affiliate,
            order=None,  # No order for manual adjustment
            amount=amount,
            status='available',  # Immediately available
            description=f"Manual credit: {reason}"
        )
        
        return Response({
            'message': f'Added Rp {amount:,.0f} to {affiliate.user.email}',
            'commission_id': commission.id,
            'amount': float(amount),
            'new_balance': float(Commission.get_affiliate_summary(affiliate.id).get('available', 0))
        })
