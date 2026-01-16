from rest_framework import serializers
from .models import Commission, BankAccount, Payout


class CommissionSerializer(serializers.ModelSerializer):
    """Serializer for commission details."""
    
    order_number = serializers.CharField(source='order.order_number', read_only=True)
    product_name = serializers.CharField(source='order.product.name', read_only=True)
    
    class Meta:
        model = Commission
        fields = [
            'id', 'order_number', 'product_name',
            'order_amount', 'commission_rate', 'amount',
            'status', 'created_at', 'matured_at', 'voided_at'
        ]


class CommissionSummarySerializer(serializers.Serializer):
    """Serializer for commission balance summary."""
    
    pending = serializers.DecimalField(max_digits=12, decimal_places=0)
    available = serializers.DecimalField(max_digits=12, decimal_places=0)
    withdrawable = serializers.DecimalField(max_digits=12, decimal_places=0)
    paid = serializers.DecimalField(max_digits=12, decimal_places=0)
    total = serializers.DecimalField(max_digits=12, decimal_places=0)


class BankAccountSerializer(serializers.ModelSerializer):
    """Serializer for bank account."""
    
    account_number_masked = serializers.SerializerMethodField()
    
    class Meta:
        model = BankAccount
        fields = [
            'id', 'bank_name', 'account_number', 'account_number_masked',
            'account_holder', 'ktp_image', 'verification_status', 'rejection_reason', 'is_primary', 'created_at'
        ]
        read_only_fields = ['verification_status', 'rejection_reason', 'created_at']
    
    def get_account_number_masked(self, obj):
        """Mask account number for display."""
        num = obj.account_number
        if len(num) <= 4:
            return num
        return '*' * (len(num) - 4) + num[-4:]


class BankAccountCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating/updating bank account."""
    
    class Meta:
        model = BankAccount
        fields = ['bank_name', 'account_number', 'account_holder', 'ktp_image', 'is_primary']


class AdminBankAccountSerializer(serializers.ModelSerializer):
    """Serializer for admin bank account verification list."""
    
    affiliate_id = serializers.IntegerField(source='affiliate.id', read_only=True)
    affiliate_name = serializers.SerializerMethodField()
    affiliate_email = serializers.EmailField(source='affiliate.user.email', read_only=True)
    affiliate_phone = serializers.CharField(source='affiliate.whatsapp', read_only=True)
    
    class Meta:
        model = BankAccount
        fields = [
            'id', 'affiliate_id', 'affiliate_name', 'affiliate_email', 'affiliate_phone',
            'bank_name', 'account_number', 'account_holder',
            'ktp_image', 'verification_status', 'rejection_reason', 'created_at', 'verified_at'
        ]
    
    def get_affiliate_name(self, obj):
        user = obj.affiliate.user
        return f"{user.first_name} {user.last_name}".strip() or user.email


class PayoutSerializer(serializers.ModelSerializer):
    """Serializer for payout details."""
    
    bank_name = serializers.CharField(source='bank_name_snapshot', read_only=True)
    account_number_masked = serializers.SerializerMethodField()
    
    class Meta:
        model = Payout
        fields = [
            'id', 'amount', 'status', 'bank_name',
            'account_number_masked', 'created_at', 
            'processed_at', 'transfer_date', 'rejection_reason'
        ]
    
    def get_account_number_masked(self, obj):
        """Mask account number for display."""
        num = obj.account_number_snapshot
        if len(num) <= 4:
            return num
        return '*' * (len(num) - 4) + num[-4:]


class PayoutRequestSerializer(serializers.Serializer):
    """Serializer for requesting a payout."""
    
    bank_account_id = serializers.IntegerField()
    amount = serializers.DecimalField(max_digits=12, decimal_places=0)
    
    def validate_amount(self, value):
        if value < 50000:
            raise serializers.ValidationError('Minimum payout is Rp 50,000')
        return value


class AdminPayoutSerializer(serializers.ModelSerializer):
    """Serializer for admin payout management with full details."""
    
    affiliate_id = serializers.IntegerField(source='affiliate.id', read_only=True)
    affiliate_name = serializers.SerializerMethodField()
    affiliate_email = serializers.EmailField(source='affiliate.user.email', read_only=True)
    affiliate_code = serializers.CharField(source='affiliate.affiliate_code', read_only=True)
    
    bank_name = serializers.CharField(source='bank_name_snapshot', read_only=True)
    account_number = serializers.CharField(source='account_number_snapshot', read_only=True)
    account_holder = serializers.CharField(source='account_holder_snapshot', read_only=True)
    
    class Meta:
        model = Payout
        fields = [
            'id', 'affiliate_id', 'affiliate_name', 'affiliate_email', 'affiliate_code',
            'amount', 'status', 'bank_name', 'account_number', 'account_holder',
            'transaction_id', 'notes', 'requested_at', 'processed_at'
        ]
        
    def get_affiliate_name(self, obj):
        user = obj.affiliate.user
        return f"{user.first_name} {user.last_name}".strip() or user.email


from .models import Coupon


class CouponSerializer(serializers.ModelSerializer):
    """Serializer for coupon details."""
    
    discount_display = serializers.CharField(source='get_discount_display', read_only=True)
    is_currently_valid = serializers.SerializerMethodField()
    
    class Meta:
        model = Coupon
        fields = [
            'id', 'code', 'discount_type', 'discount_value', 'discount_display',
            'valid_from', 'valid_until', 'usage_limit', 'usage_count',
            'min_order_amount', 'is_active', 'is_currently_valid',
            'created_at'
        ]
        read_only_fields = ['id', 'usage_count', 'created_at']
        
    def get_is_currently_valid(self, obj):
        is_valid, _ = obj.is_valid()
        return is_valid


class CouponCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating a coupon."""
    
    class Meta:
        model = Coupon
        fields = [
            'code', 'discount_type', 'discount_value',
            'valid_from', 'valid_until', 'usage_limit',
            'min_order_amount', 'is_active'
        ]
        
    def validate_code(self, value):
        # Ensure code is uppercase
        return value.strip().upper()
        
    def validate(self, attrs):
        if attrs['discount_type'] == 'percentage':
            if attrs['discount_value'] <= 0 or attrs['discount_value'] > 100:
                raise serializers.ValidationError({
                    'discount_value': 'Percentage must be between 1 and 100'
                })
        if attrs['valid_from'] >= attrs['valid_until']:
            raise serializers.ValidationError({
                'valid_until': 'End date must be after start date'
            })
        return attrs


class CouponValidateSerializer(serializers.Serializer):
    """Serializer for coupon validation response."""
    
    is_valid = serializers.BooleanField()
    message = serializers.CharField()
    code = serializers.CharField()
    discount_type = serializers.CharField(required=False)
    discount_value = serializers.DecimalField(max_digits=12, decimal_places=2, required=False)
    discount_display = serializers.CharField(required=False)
    discount_amount = serializers.DecimalField(max_digits=12, decimal_places=0, required=False)
    affiliate_code = serializers.CharField(required=False)
