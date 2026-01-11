from rest_framework import serializers
from .models import Affiliate, ReferralClick, Referral


class AffiliateSerializer(serializers.ModelSerializer):
    """Serializer for affiliate profile."""
    
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    referral_url = serializers.CharField(read_only=True)
    
    class Meta:
        model = Affiliate
        fields = [
            'affiliate_code', 'status', 'email', 'first_name', 'last_name',
            'whatsapp', 'city', 'instagram', 'tiktok', 'youtube', 'facebook',
            'primary_platform', 'referral_url', 'custom_commission_rate',
            'created_at', 'approved_at'
        ]
        read_only_fields = ['affiliate_code', 'status', 'referral_url', 'created_at', 'approved_at']


class AffiliateStatusSerializer(serializers.ModelSerializer):
    """Minimal serializer for checking affiliate status."""
    
    referral_url = serializers.CharField(read_only=True)
    
    class Meta:
        model = Affiliate
        fields = ['affiliate_code', 'status', 'referral_url', 'approved_at']


class AffiliateProfileUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating affiliate profile."""
    
    class Meta:
        model = Affiliate
        fields = ['whatsapp', 'city', 'instagram', 'tiktok', 'youtube', 'facebook']


class ReferralClickSerializer(serializers.ModelSerializer):
    """Serializer for referral clicks."""
    
    class Meta:
        model = ReferralClick
        fields = ['id', 'created_at']


class ReferralSerializer(serializers.ModelSerializer):
    """Serializer for referrals (leads)."""
    
    order_number = serializers.CharField(source='order.order_number', read_only=True)
    order_amount = serializers.DecimalField(source='order.final_amount', max_digits=12, decimal_places=0, read_only=True)
    order_status = serializers.CharField(source='order.get_status_display', read_only=True)
    
    class Meta:
        model = Referral
        fields = [
            'id', 'order_number', 'order_amount', 'order_status',
            'customer_name_masked', 'customer_email_masked',
            'status', 'created_at'
        ]


class AffiliateDashboardSerializer(serializers.Serializer):
    """Serializer for affiliate dashboard summary."""
    
    total_clicks = serializers.IntegerField()
    total_referrals = serializers.IntegerField()
    pending_commission = serializers.DecimalField(max_digits=12, decimal_places=0)
    available_commission = serializers.DecimalField(max_digits=12, decimal_places=0)
    total_commission = serializers.DecimalField(max_digits=12, decimal_places=0)
    recent_clicks = ReferralClickSerializer(many=True)
    recent_referrals = ReferralSerializer(many=True)
