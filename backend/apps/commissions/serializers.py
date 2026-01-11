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
            'account_holder', 'verification_status', 'is_primary', 'created_at'
        ]
        read_only_fields = ['verification_status', 'created_at']
    
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
