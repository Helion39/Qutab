"""
Management command to generate realistic test data for the affiliate system.
Usage: python manage.py generate_test_data
"""

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from decimal import Decimal
import random

from apps.products.models import Product
from apps.affiliates.models import Affiliate
from apps.payments.mock_service import MockPaymentService

User = get_user_model()


class Command(BaseCommand):
    help = 'Generate realistic test data for affiliate system development and demos'
    
    def add_arguments(self, parser):
        parser.add_argument(
            '--transactions',
            type=int,
            default=50,
            help='Number of transactions to generate per affiliate (default: 50)'
        )
        parser.add_argument(
            '--days',
            type=int,
            default=60,
            help='Spread transactions over this many days (default: 60)'
        )
        parser.add_argument(
            '--reset',
            action='store_true',
            help='Reset existing test data before generating new data'
        )
    
    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('🚀 Starting test data generation...'))
        
        if options['reset']:
            self.reset_test_data()
        
        # 1. Create sample products if they don't exist
        self.create_sample_products()
        
        # 2. Ensure we have approved affiliates
        self.ensure_approved_affiliates()
        
        # 3. Generate realistic transactions
        self.generate_transactions(options['transactions'], options['days'])
        
        self.stdout.write(self.style.SUCCESS('✅ Test data generation completed!'))
    
    def reset_test_data(self):
        """Reset existing test data."""
        self.stdout.write('🧹 Resetting existing test data...')
        
        from apps.orders.models import Order
        from apps.commissions.models import Commission
        from apps.affiliates.models import ReferralClick, Referral
        
        # Delete test orders and related data
        test_orders = Order.objects.filter(payment_method='mock_test')
        count = test_orders.count()
        test_orders.delete()
        
        self.stdout.write(f'   Deleted {count} test orders and related data')
    
    def create_sample_products(self):
        """Create sample Qurban products if they don't exist."""
        self.stdout.write('📦 Creating sample products...')
        
        sample_products = [
            {
                'name': 'Paket Kambing Grade A',
                'slug': 'paket-kambing-grade-a',
                'category': 'kambing',
                'grade': 'a',
                'description': 'Kambing berkualitas tinggi dengan berat 25-35 kg',
                'price': Decimal('1200000'),
                'weight_min': Decimal('25.0'),
                'weight_max': Decimal('35.0'),
                'commission_rate': Decimal('8.00'),
            },
            {
                'name': 'Paket Kambing Premium',
                'slug': 'paket-kambing-premium',
                'category': 'kambing',
                'grade': 'premium',
                'description': 'Kambing premium pilihan terbaik dengan berat 30-40 kg',
                'price': Decimal('1500000'),
                'weight_min': Decimal('30.0'),
                'weight_max': Decimal('40.0'),
                'commission_rate': Decimal('10.00'),
            },
            {
                'name': 'Paket Sapi 1/7 Grade A',
                'slug': 'paket-sapi-1-7-grade-a',
                'category': 'sapi',
                'grade': 'a',
                'description': 'Bagian 1/7 dari sapi berkualitas tinggi',
                'price': Decimal('1800000'),
                'weight_min': Decimal('40.0'),
                'weight_max': Decimal('60.0'),
                'shares_available': 7,
                'commission_rate': Decimal('12.00'),
            },
            {
                'name': 'Paket Sapi 1/7 Premium',
                'slug': 'paket-sapi-1-7-premium',
                'category': 'sapi',
                'grade': 'premium',
                'description': 'Bagian 1/7 dari sapi premium pilihan terbaik',
                'price': Decimal('2500000'),
                'weight_min': Decimal('50.0'),
                'weight_max': Decimal('70.0'),
                'shares_available': 7,
                'commission_rate': Decimal('15.00'),
            },
        ]
        
        created_count = 0
        for product_data in sample_products:
            product, created = Product.objects.get_or_create(
                slug=product_data['slug'],
                defaults={
                    **product_data,
                    'stock': random.randint(50, 200),
                    'is_active': True,
                    'is_featured': random.choice([True, False]),
                }
            )
            if created:
                created_count += 1
        
        self.stdout.write(f'   Created {created_count} new products')
    
    def ensure_approved_affiliates(self):
        """Ensure we have some approved affiliates for testing."""
        self.stdout.write('👥 Checking approved affiliates...')
        
        approved_count = Affiliate.objects.filter(status='approved').count()
        
        if approved_count == 0:
            # Approve existing pending affiliates
            pending_affiliates = Affiliate.objects.filter(status='pending')[:5]
            for affiliate in pending_affiliates:
                affiliate.status = 'approved'
                affiliate.save()
                approved_count += 1
        
        self.stdout.write(f'   Found {approved_count} approved affiliates')
        
        if approved_count == 0:
            self.stdout.write(self.style.WARNING('   ⚠️  No approved affiliates found. Please create some affiliates first.'))
    
    def generate_transactions(self, transactions_per_affiliate, days_range):
        """Generate realistic transactions for all approved affiliates."""
        self.stdout.write(f'💰 Generating transactions ({transactions_per_affiliate} per affiliate over {days_range} days)...')
        
        approved_affiliates = Affiliate.objects.filter(status='approved')
        
        if not approved_affiliates.exists():
            self.stdout.write(self.style.ERROR('   ❌ No approved affiliates found. Cannot generate transactions.'))
            return
        
        total_transactions = 0
        
        for affiliate in approved_affiliates:
            self.stdout.write(f'   Generating for {affiliate.user.get_full_name()} ({affiliate.affiliate_code})...')
            
            # Vary performance by affiliate
            performance_multiplier = random.uniform(0.3, 1.5)
            actual_transactions = int(transactions_per_affiliate * performance_multiplier)
            
            results = MockPaymentService.generate_bulk_transactions(
                affiliate_code=affiliate.affiliate_code,
                count=actual_transactions,
                days_range=days_range
            )
            
            successful_transactions = sum(1 for r in results if r.get('success'))
            total_transactions += successful_transactions
            
            self.stdout.write(f'     ✅ {successful_transactions} transactions created')
        
        self.stdout.write(f'   📊 Total: {total_transactions} transactions across {approved_affiliates.count()} affiliates')
    
    def display_summary(self):
        """Display a summary of generated data."""
        from apps.orders.models import Order
        from apps.commissions.models import Commission
        
        test_orders = Order.objects.filter(payment_method='mock_test')
        test_commissions = Commission.objects.filter(order__payment_method='mock_test')
        
        total_revenue = sum(float(order.final_amount) for order in test_orders)
        total_commissions = sum(float(commission.amount) for commission in test_commissions)
        
        self.stdout.write('\n📈 Generated Data Summary:')
        self.stdout.write(f'   Orders: {test_orders.count()}')
        self.stdout.write(f'   Total Revenue: Rp {total_revenue:,.0f}')
        self.stdout.write(f'   Commissions: {test_commissions.count()}')
        self.stdout.write(f'   Total Commissions: Rp {total_commissions:,.0f}')
        self.stdout.write(f'   Average Commission Rate: {(total_commissions/total_revenue*100):.1f}%')