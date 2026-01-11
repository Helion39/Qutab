from django.contrib import admin
from django.utils import timezone
from .models import Affiliate, ReferralClick, Referral


@admin.register(Affiliate)
class AffiliateAdmin(admin.ModelAdmin):
    list_display = ('user', 'affiliate_code', 'status', 'city', 'primary_platform', 'created_at')
    list_filter = ('status', 'primary_platform', 'city')
    search_fields = ('user__email', 'user__first_name', 'affiliate_code', 'whatsapp')
    readonly_fields = ('affiliate_code', 'created_at', 'updated_at', 'approved_at')
    ordering = ('-created_at',)
    
    fieldsets = (
        ('User & Code', {'fields': ('user', 'affiliate_code', 'status')}),
        ('Contact', {'fields': ('whatsapp', 'city')}),
        ('Social Media', {'fields': ('instagram', 'tiktok', 'youtube', 'facebook')}),
        ('Application', {'fields': ('primary_platform', 'reason', 'rejection_reason')}),
        ('Commission', {'fields': ('custom_commission_rate',)}),
        ('Timestamps', {'fields': ('created_at', 'updated_at', 'approved_at')}),
    )
    
    actions = ['approve_affiliates', 'reject_affiliates']
    
    @admin.action(description='Approve selected affiliates')
    def approve_affiliates(self, request, queryset):
        from apps.core.services.email import EmailService
        
        count = 0
        for affiliate in queryset.filter(status='pending'):
            affiliate.status = 'approved'
            affiliate.approved_at = timezone.now()
            affiliate.save()
            count += 1
            
            # Send approval email
            try:
                EmailService.send_affiliate_approved(affiliate.user, affiliate)
            except Exception as e:
                self.message_user(request, f"Error sending email to {affiliate.user.email}: {e}", level='error')
                
        self.message_user(request, f'{count} affiliates approved and notified.')
    
    @admin.action(description='Reject selected affiliates')
    def reject_affiliates(self, request, queryset):
        from apps.core.services.email import EmailService
        
        count = 0
        for affiliate in queryset.filter(status='pending'):
            affiliate.status = 'rejected'
            affiliate.save()
            count += 1
            
            # Send rejection email
            try:
                EmailService.send_affiliate_rejected(affiliate.user, affiliate.rejection_reason)
            except Exception as e:
                self.message_user(request, f"Error sending email to {affiliate.user.email}: {e}", level='error')
                
        self.message_user(request, f'{count} affiliates rejected and notified.')


@admin.register(ReferralClick)
class ReferralClickAdmin(admin.ModelAdmin):
    list_display = ('affiliate', 'ip_address', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('affiliate__affiliate_code',)
    readonly_fields = ('affiliate', 'ip_address', 'user_agent', 'referer_url', 'landing_page', 'created_at')


@admin.register(Referral)
class ReferralAdmin(admin.ModelAdmin):
    list_display = ('affiliate', 'order', 'customer_name_masked', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('affiliate__affiliate_code', 'order__order_number')
    readonly_fields = ('affiliate', 'order', 'customer', 'customer_name_masked', 'customer_email_masked', 'created_at')
