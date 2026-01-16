from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model."""
    
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'phone', 'role', 'is_verified', 'created_at', 'is_superuser', 'is_staff']
        read_only_fields = ['id', 'email', 'role', 'is_verified', 'created_at', 'is_superuser', 'is_staff']


class CustomerRegisterSerializer(serializers.ModelSerializer):
    """Serializer for customer registration."""
    
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)
    referral_code = serializers.CharField(write_only=True, required=False, allow_blank=True)
    
    class Meta:
        model = User
        fields = ['email', 'password', 'password_confirm', 'first_name', 'last_name', 'phone', 'referral_code']
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({'password_confirm': 'Passwords do not match.'})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        referral_code = validated_data.pop('referral_code', None)
        
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone=validated_data.get('phone', ''),
            role='customer'
        )
        
        # Link referral if code exists
        if referral_code:
            try:
                from apps.affiliates.models import Affiliate
                affiliate = Affiliate.objects.get(affiliate_code=referral_code, status='approved')
                user.referred_by = affiliate
                user.save(update_fields=['referred_by'])
            except Affiliate.DoesNotExist:
                pass # Ignore invalid codes
                
        return user


class AffiliateRegisterSerializer(serializers.ModelSerializer):
    """Serializer for affiliate registration/application."""
    
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)
    whatsapp = serializers.CharField(required=True)
    city = serializers.CharField(required=True)
    instagram = serializers.CharField(required=False, allow_blank=True)
    tiktok = serializers.CharField(required=False, allow_blank=True)
    primary_platform = serializers.CharField(required=True)
    reason = serializers.CharField(required=True)
    is_google_user = serializers.BooleanField(required=False, write_only=True)
    
    class Meta:
        model = User
        fields = [
            'email', 'password', 'password_confirm', 
            'first_name', 'last_name', 'whatsapp', 'city',
            'instagram', 'tiktok', 'primary_platform', 'reason',
            'is_google_user'
        ]
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({'password_confirm': 'Passwords do not match.'})
        return attrs
    
    def create(self, validated_data):
        from apps.affiliates.models import Affiliate
        
        # Extract affiliate-specific fields
        affiliate_data = {
            'whatsapp': validated_data.pop('whatsapp'),
            'city': validated_data.pop('city'),
            'instagram': validated_data.pop('instagram', ''),
            'tiktok': validated_data.pop('tiktok', ''),
            'primary_platform': validated_data.pop('primary_platform'),
            'reason': validated_data.pop('reason'),
        }
        validated_data.pop('password_confirm')
        is_google_user = validated_data.pop('is_google_user', False)
        
        # Create user with affiliate role
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone=affiliate_data['whatsapp'],  # Use whatsapp as phone
            role='affiliate',
            is_verified=is_google_user  # Auto-verify if Google user
        )
        
        # Create Affiliate record
        Affiliate.objects.create(
            user=user,
            whatsapp=affiliate_data['whatsapp'],
            city=affiliate_data['city'],
            instagram=affiliate_data['instagram'],
            tiktok=affiliate_data['tiktok'],
            primary_platform=affiliate_data['primary_platform'],
            reason=affiliate_data['reason'],
            status='pending'
        )
        
        return user


class LoginSerializer(serializers.Serializer):
    """Serializer for login."""
    
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class ChangePasswordSerializer(serializers.Serializer):
    """Serializer for changing password."""
    
    current_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True)
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError({'confirm_password': 'Passwords do not match.'})
        return attrs


class AdminUserSerializer(serializers.ModelSerializer):
    """Serializer for admin user management with extended info."""
    
    full_name = serializers.SerializerMethodField()
    order_count = serializers.SerializerMethodField()
    total_spent = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name', 'full_name',
            'phone', 'role', 'is_active', 'is_verified',
            'created_at', 'order_count', 'total_spent'
        ]
        read_only_fields = ['id', 'email', 'created_at', 'order_count', 'total_spent']
        
    def get_full_name(self, obj):
        return obj.get_full_name() or obj.email
        
    def get_order_count(self, obj):
        return obj.orders.count() if hasattr(obj, 'orders') else 0
        
    def get_total_spent(self, obj):
        from django.db.models import Sum
        if hasattr(obj, 'orders'):
            total = obj.orders.filter(status__in=['paid', 'processing', 'completed']).aggregate(
                total=Sum('final_amount')
            )['total']
            return float(total) if total else 0
        return 0
