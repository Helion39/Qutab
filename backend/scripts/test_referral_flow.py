#!/usr/bin/env python
"""
Test script to demonstrate the referral link flow.
Run this to see how referral links work in development vs production.
"""

import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.affiliates.models import Affiliate
from django.conf import settings

def test_referral_flow():
    print("🔗 Qutab Referral System Test")
    print("=" * 50)
    
    # Get affiliate
    affiliate = Affiliate.objects.first()
    if not affiliate:
        print("❌ No affiliates found. Please create one first.")
        return
    
    print(f"👤 Affiliate: {affiliate.user.get_full_name()}")
    print(f"📧 Email: {affiliate.user.email}")
    print(f"🏷️  Code: {affiliate.affiliate_code}")
    print(f"✅ Status: {affiliate.status}")
    print()
    
    # Show current environment
    print(f"🌍 Environment: {'Development' if settings.DEBUG else 'Production'}")
    print(f"🔧 Frontend URL: {settings.FRONTEND_URL}")
    print(f"🔧 Backend URL: {settings.BACKEND_URL}")
    print()
    
    # Show referral URL
    print("🔗 Referral Link:")
    print(f"   {affiliate.referral_url}")
    print()
    
    # Explain the flow
    print("📋 How it works:")
    print("1. User clicks referral link")
    print("2. Backend records click in database")
    print("3. Backend redirects to frontend with ?ref= parameter")
    print()
    
    if settings.DEBUG:
        print("🧪 Development Flow:")
        print(f"   Click: {affiliate.referral_url}")
        print(f"   Redirects to: {settings.FRONTEND_URL}/?ref={affiliate.affiliate_code}")
    else:
        print("🚀 Production Flow:")
        print(f"   Click: {affiliate.referral_url}")
        print(f"   Redirects to: {settings.FRONTEND_URL}/?ref={affiliate.affiliate_code}")
    
    print()
    print("✅ Test your referral link by opening it in a browser!")
    print("   Check the affiliate dashboard to see click tracking.")

if __name__ == "__main__":
    test_referral_flow()