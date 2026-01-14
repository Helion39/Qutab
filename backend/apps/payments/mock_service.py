"""
Mock Payment Service for Development and Testing
Generates realistic transaction data for affiliate system testing.
"""

import random
from decimal import Decimal
from django.utils import timezone
from django.contrib.auth import get_user_model
from datetime import timedelta

from apps.orders.models import Order
from apps.products.models import Product
from apps.affiliates.models import Affiliate, Referral
from apps.commissions.services import CommissionService

User = get_user_model()


class MockPaymentService:
    """Mock payment service that creates realistic transactions for testing."""
    
    # Sample customer data for realistic mock transactions
    MOCK_CUSTOMERS = [
        {'name': 'Ahmad Wijaya', 'email': 'ahmad.wijaya@email.com', 'phone': '081234567890'},
        {'name': 'Siti Nurhaliza', 'email': 'siti.nurhaliza@email.com', 'phone': '081234567891'},
        {'name': 'Budi Santoso', 'email': 'budi.santoso@email.com', 'phone': '081234567892'},
        {'name': 'Dewi Lestari', 'email': 'dewi.lestari@email.com', 'phone': '081234567893'},
        {'name': 'Eko Prasetyo', 'email': 'eko.prasetyo@email.com', 'phone': '081234567894'},
        {'name': 'Fatimah Zahra', 'email': 'fatimah.zahra@email.com', 'phone': '081234567895'},
        {'name': 'Gunawan Susanto', 'email': 'gunawan.susanto@email.com', 'phone': '081234567896'},
        {'name': 'Hesti Purnamasari', 'email': 'hesti.purnamasari@email.com', 'phone': '081234567897'},
        {'name': 'Indra Kurniawan', 'email': 'indra.kurniawan@email.com', 'phone': '081234567898'},
        {'name': 'Joko Widodo', 'email': 'joko.widodo@email.com', 'phone': '081234567899'},
    ]
    
    @classmethod
    def create_mock_transaction(cls, affiliate_code, amount=None, days_ago=0):
        """
        Create a single mock transaction for testing.
        
        Args:
            affiliate_code (str): Affiliate code to credit the transaction to
            amount (Decimal, optional): Transaction amount. Random if not provided.
            days_ago (int): How many days ago this transaction occurred
            
        Returns:
            dict: Transaction details
        """
        try:
            # Get affiliate
            affiliate = Affiliate.objects.get(affiliate_code=affiliate_code, status='approved')
        except Affiliate.DoesNotExist:
            return {'success': False, 'error': f'Affiliate {affiliate_code} not found or not approved'}
        
        # Get or create a random product
        products = list(Product.objects.filter(is_active=True))
        if not products:
            # Create a sample product if none exist
            product = Product.objects.create(
                name='Paket Kambing Premium',
                slug='paket-kambing-premium',
                category='kambing',
                grade='premium',
                description='Paket qurban kambing premium berkualitas tinggi',
                price=Decimal('1500000'),
                weight_min=Decimal('25.0'),
                weight_max=Decimal('35.0'),
                stock=100,
                commission_rate=Decimal('10.00')
            )
        else:
            product = random.choice(products)
        
        # Generate random customer
        customer_data = random.choice(cls.MOCK_CUSTOMERS)
        
        # Get or create customer user
        customer, created = User.objects.get_or_create(
            email=customer_data['email'],
            defaults={
                'first_name': customer_data['name'].split()[0],
                'last_name': ' '.join(customer_data['name'].split()[1:]),
                'phone': customer_data['phone'],
                'role': 'customer',
                'is_active': True,
            }
        )
        
        # Calculate amount
        if amount is None:
            # Random amount between 80% and 120% of product price
            base_price = float(product.price)
            amount = Decimal(random.uniform(base_price * 0.8, base_price * 1.2))
            amount = amount.quantize(Decimal('1000'))  # Round to nearest 1000
        
        # Create order with retry logic for unique order numbers
        transaction_date = timezone.now() - timedelta(days=days_ago)
        max_retries = 3
        for attempt in range(max_retries):
            try:
                order = Order.objects.create(
                    user=customer,
                    product=product,
                    quantity=1,
                    unit_price=product.price,
                    total_amount=amount,
                    discount_amount=Decimal('0'),
                    final_amount=amount,
                    recipient_name=customer_data['name'],
                    recipient_location='Jakarta',
                    status='completed',  # Mock as completed
                    referral_code=affiliate_code,
                    payment_method='mock_test',
                    created_at=transaction_date,
                    updated_at=transaction_date,
                    paid_at=transaction_date,
                    completed_at=transaction_date,
                )
                break  # Success, exit retry loop
            except Exception as e:
                if attempt == max_retries - 1:  # Last attempt
                    return {'success': False, 'error': f'Failed to create order after {max_retries} attempts: {str(e)}'}
                # Add small delay and try again
                import time
                time.sleep(0.1)
        
        # Calculate commission
        commission = CommissionService.calculate_commission(order)
        
        return {
            'success': True,
            'order_id': str(order.id),
            'order_number': order.order_number,
            'customer_name': customer_data['name'],
            'customer_email': customer_data['email'],
            'product_name': product.name,
            'amount': float(amount),
            'commission_amount': float(commission.amount) if commission else 0,
            'affiliate_code': affiliate_code,
            'transaction_date': transaction_date.isoformat(),
        }
    
    @classmethod
    def generate_bulk_transactions(cls, affiliate_code, count=20, days_range=30):
        """
        Generate multiple mock transactions over a time period.
        
        Args:
            affiliate_code (str): Affiliate code
            count (int): Number of transactions to generate
            days_range (int): Spread transactions over this many days
            
        Returns:
            list: List of transaction results
        """
        results = []
        
        for i in range(count):
            # Random day within range
            days_ago = random.randint(0, days_range)
            
            # Random amount variation
            base_amounts = [1200000, 1500000, 1800000, 2000000, 2500000]
            amount = Decimal(random.choice(base_amounts))
            
            result = cls.create_mock_transaction(
                affiliate_code=affiliate_code,
                amount=amount,
                days_ago=days_ago
            )
            results.append(result)
        
        return results
    
    @classmethod
    def simulate_realistic_scenario(cls):
        """
        Create a realistic scenario with multiple affiliates and transactions.
        Perfect for demos and testing.
        """
        # Get all approved affiliates
        affiliates = Affiliate.objects.filter(status='approved')
        
        if not affiliates.exists():
            return {'success': False, 'error': 'No approved affiliates found'}
        
        total_transactions = 0
        results = []
        
        for affiliate in affiliates:
            # Each affiliate gets different performance levels
            if affiliate.affiliate_code.endswith('1'):  # High performer
                transaction_count = random.randint(15, 25)
            elif affiliate.affiliate_code.endswith('2'):  # Medium performer  
                transaction_count = random.randint(8, 15)
            else:  # Low performer
                transaction_count = random.randint(2, 8)
            
            affiliate_results = cls.generate_bulk_transactions(
                affiliate_code=affiliate.affiliate_code,
                count=transaction_count,
                days_range=45
            )
            
            results.extend(affiliate_results)
            total_transactions += len(affiliate_results)
        
        return {
            'success': True,
            'total_transactions': total_transactions,
            'affiliates_count': affiliates.count(),
            'message': f'Generated {total_transactions} mock transactions for {affiliates.count()} affiliates'
        }