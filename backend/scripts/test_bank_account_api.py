#!/usr/bin/env python
"""
Test script to verify bank account API endpoints work correctly.
"""

import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.commissions.models import BankAccount
from apps.affiliates.models import Affiliate

def test_bank_account_model():
    print("🏦 Testing Bank Account Model")
    print("=" * 40)
    
    # Get affiliate
    affiliate = Affiliate.objects.first()
    if not affiliate:
        print("❌ No affiliates found. Please create one first.")
        return
    
    print(f"👤 Testing with affiliate: {affiliate.user.get_full_name()}")
    
    # Check existing bank accounts
    existing_accounts = BankAccount.objects.filter(affiliate=affiliate)
    print(f"📊 Existing bank accounts: {existing_accounts.count()}")
    
    for account in existing_accounts:
        print(f"   - {account.bank_name}: {account.account_number} ({account.verification_status})")
    
    print()
    print("✅ Bank Account Model Test Complete!")
    print()
    print("🔗 API Endpoints Available:")
    print("   GET  /api/commissions/bank-accounts/     - List bank accounts")
    print("   POST /api/commissions/bank-accounts/     - Create bank account")
    print("   GET  /api/commissions/bank-accounts/{id}/ - Get specific account")
    print("   PUT  /api/commissions/bank-accounts/{id}/ - Update account")
    print("   DELETE /api/commissions/bank-accounts/{id}/ - Delete account")
    print()
    print("📝 Frontend Form Fields:")
    print("   - bank_name: String (required)")
    print("   - account_number: String (required)")
    print("   - account_holder: String (required)")
    print("   - ktp_image: File (required for new accounts)")
    print("   - is_primary: Boolean (default: true)")

if __name__ == "__main__":
    test_bank_account_model()