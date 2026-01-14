"""
Management command to remove all affiliates except specified ones.
Usage: python manage.py cleanup_affiliates --keep "email1,email2"
"""

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction

from apps.affiliates.models import Affiliate
from apps.commissions.models import Commission
from apps.orders.models import Order

User = get_user_model()


class Command(BaseCommand):
    help = 'Remove all affiliate accounts except specified ones'
    
    def add_arguments(self, parser):
        parser.add_argument(
            '--keep',
            type=str,
            default='nabil.hanif@example.com',
            help='Comma-separated list of emails to keep (default: nabil.hanif@example.com)'
        )
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Show what would be deleted without actually deleting'
        )
    
    def handle(self, *args, **options):
        keep_emails = [email.strip() for email in options['keep'].split(',')]
        dry_run = options['dry_run']
        
        self.stdout.write(self.style.SUCCESS(f'🧹 Cleaning up affiliates (keeping: {", ".join(keep_emails)})'))
        
        if dry_run:
            self.stdout.write(self.style.WARNING('DRY RUN MODE - No actual deletions will occur'))
        
        # Find affiliates to keep
        affiliates_to_keep = Affiliate.objects.filter(user__email__in=keep_emails)
        keep_ids = list(affiliates_to_keep.values_list('id', 'user__email'))
        
        self.stdout.write(f'📌 Keeping {len(keep_ids)} affiliates:')
        for affiliate_id, email in keep_ids:
            self.stdout.write(f'   - {email} (ID: {affiliate_id})')
        
        # Find affiliates to remove
        affiliates_to_remove = Affiliate.objects.exclude(user__email__in=keep_emails)
        remove_count = affiliates_to_remove.count()
        
        if remove_count == 0:
            self.stdout.write(self.style.SUCCESS('✅ No affiliates to remove'))
            return
        
        self.stdout.write(f'🗑️  Will remove {remove_count} affiliates:')
        for affiliate in affiliates_to_remove:
            self.stdout.write(f'   - {affiliate.user.email} ({affiliate.user.get_full_name()})')
        
        if not dry_run:
            with transaction.atomic():
                # Delete related data first
                removed_orders = 0
                removed_commissions = 0
                removed_users = 0
                
                for affiliate in affiliates_to_remove:
                    # Delete orders made by this affiliate's referrals
                    affiliate_orders = Order.objects.filter(referral_code=affiliate.affiliate_code)
                    removed_orders += affiliate_orders.count()
                    affiliate_orders.delete()
                    
                    # Delete commissions
                    affiliate_commissions = Commission.objects.filter(affiliate=affiliate)
                    removed_commissions += affiliate_commissions.count()
                    affiliate_commissions.delete()
                    
                    # Delete the user account
                    user = affiliate.user
                    affiliate.delete()  # This will cascade delete the affiliate
                    user.delete()
                    removed_users += 1
                
                self.stdout.write(self.style.SUCCESS(f'✅ Cleanup completed:'))
                self.stdout.write(f'   - Removed {removed_users} users')
                self.stdout.write(f'   - Removed {removed_orders} orders')
                self.stdout.write(f'   - Removed {removed_commissions} commissions')
        
        # Show final stats
        remaining_affiliates = Affiliate.objects.count()
        remaining_users = User.objects.filter(role='affiliate').count()
        
        self.stdout.write(f'\n📊 Final counts:')
        self.stdout.write(f'   - Remaining affiliates: {remaining_affiliates}')
        self.stdout.write(f'   - Remaining affiliate users: {remaining_users}')
        
        if dry_run:
            self.stdout.write(self.style.WARNING('\n⚠️  This was a dry run. Use --dry-run=false to actually delete.'))