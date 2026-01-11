"""
Django management command to mature pending commissions after 30-day holding period.

Usage:
    python manage.py mature_commissions
    
Schedule with cron:
    0 0 * * * cd /path/to/backend && python manage.py mature_commissions
"""

from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from apps.commissions.models import Commission


class Command(BaseCommand):
    help = 'Mature pending commissions after 30-day holding period'
    
    def add_arguments(self, parser):
        parser.add_argument(
            '--days',
            type=int,
            default=30,
            help='Minimum days before maturation (default: 30)'
        )
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Show what would be matured without actually doing it'
        )
    
    def handle(self, *args, **options):
        days = options['days']
        dry_run = options['dry_run']
        
        cutoff_date = timezone.now() - timedelta(days=days)
        
        # Get pending commissions older than specified days
        # Only mature if order is not cancelled/refunded
        mature_commissions = Commission.objects.filter(
            status='pending',
            created_at__lte=cutoff_date
        ).exclude(
            order__status__in=['cancelled', 'refunded']
        ).select_related('affiliate', 'order')
        
        count = mature_commissions.count()
        total_amount = sum(c.amount for c in mature_commissions)
        
        if count == 0:
            self.stdout.write(self.style.WARNING('No commissions ready for maturation'))
            return
        
        if dry_run:
            self.stdout.write(self.style.WARNING(f'\n=== DRY RUN MODE ==='))
            self.stdout.write(f'Would mature {count} commissions')
            self.stdout.write(f'Total amount: Rp {total_amount:,.0f}')
            self.stdout.write('\nCommissions that would be matured:')
            for commission in mature_commissions[:10]:  # Show first 10
                self.stdout.write(
                    f'  - Commission #{commission.id}: '
                    f'Affiliate {commission.affiliate.affiliate_code}, '
                    f'Rp {commission.amount:,.0f}, '
                    f'Created {commission.created_at.strftime("%Y-%m-%d")}'
                )
            if count > 10:
                self.stdout.write(f'  ... and {count - 10} more')
        else:
            # Actually mature the commissions
            now = timezone.now()
            matured = 0
            
            for commission in mature_commissions:
                commission.status = 'available'
                commission.matured_at = now
                commission.save(update_fields=['status', 'matured_at', 'updated_at'])
                matured += 1
            
            self.stdout.write(
                self.style.SUCCESS(
                    f'\n✓ Successfully matured {matured} commissions '
                    f'(Total: Rp {total_amount:,.0f})'
                )
            )
            
            # Group by affiliate for summary
            from django.db.models import Sum
            affiliate_summary = mature_commissions.values('affiliate__affiliate_code').annotate(
                total=Sum('amount'),
                count=models.Count('id')
            ).order_by('-total')[:5]
            
            if affiliate_summary:
                self.stdout.write('\nTop 5 affiliates:')
                for item in affiliate_summary:
                    self.stdout.write(
                        f'  - {item["affiliate__affiliate_code"]}: '
                        f'{item["count"]} commissions, '
                        f'Rp {item["total"]:,.0f}'
                    )
