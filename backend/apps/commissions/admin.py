from django.contrib import admin
from django.utils import timezone
from .models import Commission, BankAccount, Payout, Coupon


@admin.register(Commission)
class CommissionAdmin(admin.ModelAdmin):
    list_display = ('affiliate', 'order', 'amount', 'commission_rate', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('affiliate__affiliate_code', 'order__order_number')
    readonly_fields = ('affiliate', 'referral', 'order', 'order_amount', 'commission_rate', 'amount', 'created_at', 'updated_at', 'matured_at', 'voided_at')
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Commission Info', {'fields': ('affiliate', 'referral', 'order')}),
        ('Amount', {'fields': ('order_amount', 'commission_rate', 'amount')}),
        ('Status', {'fields': ('status', 'payout')}),
        ('Voiding', {'fields': ('voided_at', 'voided_reason')}),
        ('Maturation', {'fields': ('matured_at',)}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )
    
    actions = ['void_commissions']
    
    @admin.action(description='Void selected commissions')
    def void_commissions(self, request, queryset):
        count = 0
        for commission in queryset.filter(status__in=['pending', 'available']):
            commission.void('Voided by admin')
            count += 1
        self.message_user(request, f'{count} commissions voided.')


@admin.register(BankAccount)
class BankAccountAdmin(admin.ModelAdmin):
    list_display = ('affiliate', 'bank_name', 'account_holder', 'verification_status', 'is_primary')
    list_filter = ('verification_status', 'bank_name')
    search_fields = ('affiliate__affiliate_code', 'account_holder')
    readonly_fields = ('created_at', 'verified_at')
    
    actions = ['verify_accounts', 'reject_accounts']
    
    @admin.action(description='Verify selected bank accounts')
    def verify_accounts(self, request, queryset):
        count = queryset.filter(verification_status='pending').update(
            verification_status='verified',
            verified_at=timezone.now()
        )
        self.message_user(request, f'{count} accounts verified.')
    
    @admin.action(description='Reject selected bank accounts')
    def reject_accounts(self, request, queryset):
        count = queryset.filter(verification_status='pending').update(verification_status='rejected')
        self.message_user(request, f'{count} accounts rejected.')


@admin.register(Payout)
class PayoutAdmin(admin.ModelAdmin):
    list_display = ('affiliate', 'amount', 'status', 'bank_name_snapshot', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('affiliate__affiliate_code',)
    readonly_fields = (
        'affiliate', 'bank_account', 'amount',
        'bank_name_snapshot', 'account_number_snapshot', 'account_holder_snapshot',
        'created_at', 'updated_at'
    )
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Payout Info', {'fields': ('affiliate', 'bank_account', 'amount', 'status')}),
        ('Bank Details (Snapshot)', {'fields': ('bank_name_snapshot', 'account_number_snapshot', 'account_holder_snapshot')}),
        ('Admin', {'fields': ('admin_notes', 'rejection_reason')}),
        ('Transfer', {'fields': ('transfer_reference', 'transfer_date')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at', 'processed_at')}),
    )
    
    actions = ['approve_payouts', 'mark_as_paid', 'reject_payouts']
    
    @admin.action(description='Approve selected payouts (set to processing)')
    def approve_payouts(self, request, queryset):
        count = queryset.filter(status='pending').update(
            status='processing',
            processed_at=timezone.now()
        )
        self.message_user(request, f'{count} payouts approved.')
    
    @admin.action(description='Mark selected payouts as paid')
    def mark_as_paid(self, request, queryset):
        from .models import Commission
        count = 0
        for payout in queryset.filter(status='processing'):
            payout.status = 'paid'
            payout.transfer_date = timezone.now()
            payout.save()
            count += 1
        self.message_user(request, f'{count} payouts marked as paid.')
    
    @admin.action(description='Reject selected payouts')
    def reject_payouts(self, request, queryset):
        count = queryset.filter(status='pending').update(status='rejected')
        self.message_user(request, f'{count} payouts rejected.')


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ('code', 'affiliate', 'discount_type', 'discount_value', 'usage_count', 'usage_limit', 'is_active', 'valid_until')
    list_filter = ('discount_type', 'is_active', 'affiliate')
    search_fields = ('code', 'affiliate__affiliate_code', 'affiliate__user__email')
    readonly_fields = ('usage_count', 'created_at', 'updated_at')
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Coupon Info', {'fields': ('affiliate', 'code', 'is_active')}),
        ('Discount', {'fields': ('discount_type', 'discount_value', 'min_order_amount')}),
        ('Validity', {'fields': ('valid_from', 'valid_until')}),
        ('Usage', {'fields': ('usage_limit', 'usage_count')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )
    
    actions = ['activate_coupons', 'deactivate_coupons']
    
    @admin.action(description='Activate selected coupons')
    def activate_coupons(self, request, queryset):
        count = queryset.update(is_active=True)
        self.message_user(request, f'{count} coupons activated.')
    
    @admin.action(description='Deactivate selected coupons')
    def deactivate_coupons(self, request, queryset):
        count = queryset.update(is_active=False)
        self.message_user(request, f'{count} coupons deactivated.')
