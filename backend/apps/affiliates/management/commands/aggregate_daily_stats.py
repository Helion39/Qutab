"""
Django management command to aggregate daily statistics for affiliates.

Usage:
    python manage.py aggregate_daily_stats
    python manage.py aggregate_daily_stats --date=2026-01-09
    python manage.py aggregate_daily_stats --days=7
    
Schedule with cron:
    0 1 * * * cd /path/to/backend && python manage.py aggregate_daily_stats
"""

from django.core.management.base import BaseCommand
from django.utils import timezone
from django.db.models import Count, Sum, Q
from datetime import datetime, timedelta, date
from apps.affiliates.models import Affiliate, ReferralClick, Referral, DailyStats
from apps.commissions.models import Commission


class Command(BaseCommand):
    help = 'Aggregate daily statistics for all affiliates'
    
    def add_arguments(self, parser):
        parser.add_argument(
            '--date',
            type=str,
            help='Specific date to aggregate (YYYY-MM-DD). Defaults to yesterday.'
        )
        parser.add_argument(
            '--days',
            type=int,
            help='Number of past days to aggregate (e.g., 7 for last week)'
        )
        parser.add_argument(
            '--affiliate',
            type=str,
            help='Aggregate for specific affiliate code only'
        )
    
    def handle(self, *args, **options):
        # Determine which dates to process
        dates = self._get_dates_to_process(options)
        
        if options.get('affiliate'):
            # Process specific affiliate
            try:
                affiliate = Affiliate.objects.get(
                    affiliate_code=options['affiliate'],
                    status='approved'
                )
                affiliates = [affiliate]
            except Affiliate.DoesNotExist:
                self.stdout.write(self.style.ERROR(f'Affiliate {options["affiliate"]} not found'))
                return
        else:
            # Process all approved affiliates
            affiliates = Affiliate.objects.filter(status='approved')
        
        total_processed = 0
        total_updated = 0
        
        for target_date in dates:
            self.stdout.write(f'\nProcessing date: {target_date}')
            
            for affiliate in affiliates:
                updated = self._aggregate_for_affiliate_date(affiliate, target_date)
                if updated:
                    total_updated += 1
                total_processed += 1
        
        self.stdout.write(
            self.style.SUCCESS(
                f'\n✓ Processed {total_processed} affiliate-days, '
                f'updated {total_updated} records'
            )
        )
    
    def _get_dates_to_process(self, options):
        """Determine which dates to process based on options."""
        if options.get('date'):
            # Specific date
            return [datetime.strptime(options['date'], '%Y-%m-%d').date()]
        elif options.get('days'):
            # Multiple days
            today = date.today()
            return [today - timedelta(days=i) for i in range(1, options['days'] + 1)]
        else:
            # Default: yesterday
            return [date.today() - timedelta(days=1)]
    
    def _aggregate_for_affiliate_date(self, affiliate, target_date):
        """Aggregate stats for one affiliate and one date."""
        start_datetime = timezone.make_aware(
            datetime.combine(target_date, datetime.min.time())
        )
        end_datetime = timezone.make_aware(
            datetime.combine(target_date, datetime.max.time())
        )
        
        # Count clicks for this date
        clicks_count = ReferralClick.objects.filter(
            affiliate=affiliate,
            created_at__gte=start_datetime,
            created_at__lte=end_datetime
        ).count()
        
        # Count conversions (confirmed referrals)
        conversions_count = Referral.objects.filter(
            affiliate=affiliate,
            created_at__gte=start_datetime,
            created_at__lte=end_datetime,
            status='confirmed'
        ).count()
        
        # Calculate conversion rate
        conversion_rate = 0
        if clicks_count > 0:
            conversion_rate = round((conversions_count / clicks_count) * 100, 2)
        
        # Sum commission earned this day
        commission_data = Commission.objects.filter(
            affiliate=affiliate,
            created_at__gte=start_datetime,
            created_at__lte=end_datetime
        ).aggregate(
            earned=Sum('amount')
        )
        commission_earned = commission_data['earned'] or 0
        
        # Sum commission that matured this day
        matured_data = Commission.objects.filter(
            affiliate=affiliate,
            matured_at__gte=start_datetime,
            matured_at__lte=end_datetime,
            status='available'
        ).aggregate(
            matured=Sum('amount')
        )
        commission_matured = matured_data['matured'] or 0
        
        # Sum total sales from referrals
        sales_data = Referral.objects.filter(
            affiliate=affiliate,
            created_at__gte=start_datetime,
            created_at__lte=end_datetime,
            status='confirmed'
        ).aggregate(
            total=Sum('order__final_amount')
        )
        total_sales = sales_data['total'] or 0
        
        # Update or create daily stats record
        daily_stat, created = DailyStats.objects.update_or_create(
            affiliate=affiliate,
            date=target_date,
            defaults={
                'clicks': clicks_count,
                'conversions': conversions_count,
                'conversion_rate': conversion_rate,
                'commission_earned': commission_earned,
                'commission_matured': commission_matured,
                'total_sales': total_sales,
            }
        )
        
        action = 'Created' if created else 'Updated'
        self.stdout.write(
            f'  {action} stats for {affiliate.affiliate_code}: '
            f'{clicks_count} clicks, {conversions_count} conversions, '
            f'Rp {commission_earned:,.0f} earned'
        )
        
        return True
