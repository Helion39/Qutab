from django.shortcuts import redirect, get_object_or_404
from django.utils import timezone
from django.core.signing import Signer, BadSignature
from django.urls import reverse
from django.conf import settings
from django.http import HttpResponse
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Count, Sum, Q

from .models import Affiliate, ReferralClick, Referral
from .serializers import (
    AffiliateSerializer, AffiliateStatusSerializer, 
    AffiliateProfileUpdateSerializer, AffiliateDashboardSerializer,
    ReferralSerializer, ReferralClickSerializer
)


class AffiliateProfileView(generics.RetrieveUpdateAPIView):
    """Get and update affiliate profile."""
    
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return AffiliateSerializer
        return AffiliateProfileUpdateSerializer
    
    def get_object(self):
        affiliate, _ = Affiliate.objects.get_or_create(
            user=self.request.user,
            defaults={
                'whatsapp': self.request.user.phone or '',
                'city': '',
                'primary_platform': 'instagram',
                'reason': '',
            }
        )
        return affiliate


class AffiliateStatusView(APIView):
    """Check affiliate application status."""
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            affiliate = Affiliate.objects.get(user=request.user)
            return Response(AffiliateStatusSerializer(affiliate).data)
        except Affiliate.DoesNotExist:
            return Response({
                'status': 'not_applied',
                'affiliate_code': None,
                'referral_url': None,
            })


class AffiliateDashboardView(APIView):
    """Get affiliate dashboard summary."""
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            affiliate = Affiliate.objects.get(user=request.user)
        except Affiliate.DoesNotExist:
            return Response({'error': 'No affiliate profile'}, status=status.HTTP_404_NOT_FOUND)
        
        if affiliate.status != 'approved':
            return Response({'error': 'Affiliate not approved'}, status=status.HTTP_403_FORBIDDEN)
        
        # Get stats with optimized queries
        total_clicks = affiliate.clicks.count()
        total_referrals = affiliate.referrals.count()
        
        # Get real commission data
        from apps.commissions.models import Commission
        
        commission_summary = Commission.get_affiliate_summary(affiliate.id)
        pending_commission = commission_summary.get('pending_balance', 0)
        available_commission = commission_summary.get('available_balance', 0)
        total_commission = commission_summary.get('total_earned', 0)
        total_paid = commission_summary.get('total_paid', 0)
        
        # Recent data with select_related for performance
        recent_clicks = affiliate.clicks.select_related('affiliate').order_by('-created_at')[:5]
        recent_referrals = affiliate.referrals.select_related('order', 'order__product').order_by('-created_at')[:5]
        
        data = {
            'total_clicks': total_clicks,
            'total_referrals': total_referrals,
            'pending_commission': float(pending_commission),
            'available_commission': float(available_commission),
            'total_commission': float(total_commission),
            'total_paid': float(total_paid),
            'conversion_rate': round((total_referrals / total_clicks * 100) if total_clicks > 0 else 0, 2),
            'recent_clicks': ReferralClickSerializer(recent_clicks, many=True).data,
            'recent_referrals': ReferralSerializer(recent_referrals, many=True).data,
        }
        
        return Response(data)


class AffiliateReferralsView(generics.ListAPIView):
    """List affiliate's referrals (leads)."""
    
    permission_classes = [IsAuthenticated]
    serializer_class = ReferralSerializer
    
    def get_queryset(self):
        try:
            affiliate = Affiliate.objects.get(user=self.request.user)
            return affiliate.referrals.all()
        except Affiliate.DoesNotExist:
            return Referral.objects.none()


class ReferralLinkRedirectView(APIView):
    """
    Handle referral link clicks: /r/{code}/
    Records click and redirects to frontend.
    """
    
    permission_classes = [AllowAny]
    authentication_classes = []
    
    def get(self, request, code):
        from django.conf import settings
        
        try:
            affiliate = Affiliate.objects.get(affiliate_code=code, status='approved')
        except Affiliate.DoesNotExist:
            # Redirect to homepage if invalid code
            return redirect(getattr(settings, 'FRONTEND_URL', 'http://localhost:5173'))
        
        # Record click
        ReferralClick.objects.create(
            affiliate=affiliate,
            ip_address=self._get_client_ip(request),
            user_agent=request.META.get('HTTP_USER_AGENT', '')[:500],
            referer_url=request.META.get('HTTP_REFERER', '')[:500],
            landing_page=request.GET.get('page', ''),
        )
        
        # Redirect to frontend with referral code in URL parameter
        frontend_url = getattr(settings, 'FRONTEND_URL', 'http://localhost:5173')
        target_page = request.GET.get('page', '')
        
        if target_page:
            redirect_url = f"{frontend_url}/{target_page}?ref={code}"
        else:
            redirect_url = f"{frontend_url}?ref={code}"
        
        return redirect(redirect_url)
    
    def _get_client_ip(self, request):
        x_forwarded = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded:
            return x_forwarded.split(',')[0].strip()
        return request.META.get('REMOTE_ADDR')


class AffiliateStatisticsView(APIView):
    """Get affiliate performance statistics."""
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            affiliate = Affiliate.objects.get(user=request.user)
        except Affiliate.DoesNotExist:
            return Response({'error': 'No affiliate profile'}, status=status.HTTP_404_NOT_FOUND)
        
        # Get period from query params (default: last 30 days)
        period = request.query_params.get('period', '30')
        try:
            days = int(period)
        except ValueError:
            days = 30
        
        start_date = timezone.now() - timezone.timedelta(days=days)
        
        # Clicks over period
        clicks_by_day = (
            affiliate.clicks
            .filter(created_at__gte=start_date)
            .extra({'date': 'DATE(created_at)'})
            .values('date')
            .annotate(count=Count('id'))
            .order_by('date')
        )
        
        # Referrals over period
        referrals_by_day = (
            affiliate.referrals
            .filter(created_at__gte=start_date)
            .extra({'date': 'DATE(created_at)'})
            .values('date')
            .annotate(count=Count('id'))
            .order_by('date')
        )
        
        return Response({
            'period_days': days,
            'total_clicks': affiliate.clicks.filter(created_at__gte=start_date).count(),
            'total_referrals': affiliate.referrals.filter(created_at__gte=start_date).count(),
            'clicks_by_day': list(clicks_by_day),
            'referrals_by_day': list(referrals_by_day),
        })


class AffiliateVerifyView(APIView):
    """
    Handle admin verification via email link (Signed URL).
    GET /api/affiliate/verify/<action>/<int:pk>/<str:token>/
    """
    permission_classes = [AllowAny]
    
    def get(self, request, action, pk, token):
        signer = Signer()
        try:
            # Verify signature: "approve:123"
            original = signer.unsign(token)
            signed_action, signed_pk = original.split(':')
            
            if signed_action != action or str(signed_pk) != str(pk):
                raise BadSignature()
                
        except BadSignature:
            return HttpResponse("Invalid or expired link.", status=400)
        
        affiliate = get_object_or_404(Affiliate, pk=pk)
        
        if affiliate.status == 'approved' and action == 'approve':
            return HttpResponse(f"Affiliate {affiliate.user.email} is already approved.")
            
        from apps.core.services.email import EmailService
        
        if action == 'approve':
            affiliate.status = 'approved'
            affiliate.approved_at = timezone.now()
            affiliate.save()
            
            # Send notification
            EmailService.send_affiliate_approved(affiliate.user, affiliate)
            
            return HttpResponse(f"""
                <h1 style='color:green'>Success</h1>
                <p>Affiliate <b>{affiliate.user.email}</b> has been APPROVED.</p>
                <p>Start promoting!</p>
            """)
            
        elif action == 'reject':
            affiliate.status = 'rejected'
            affiliate.save()
            
            # Send notification
            EmailService.send_affiliate_rejected(affiliate.user)
            
            return HttpResponse(f"""
                <h1 style='color:red'>Rejected</h1>
                <p>Affiliate <b>{affiliate.user.email}</b> has been REJECTED.</p>
            """)
        
        return HttpResponse("Invalid action.", status=400)
