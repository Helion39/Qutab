import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from apps.users.models import User
from apps.commissions.models import BankAccount
from apps.commissions.serializers import BankAccountSerializer

# Find the user
user = User.objects.get(email="mohammad.n.hanif@gmail.com")
print(f"User: {user.email} (ID: {user.id})")

# Get their affiliate
affiliate = user.affiliate
print(f"Affiliate: {affiliate.id}")

# Get their bank accounts
bank_accounts = BankAccount.objects.filter(affiliate=affiliate)
print(f"\nBank Accounts Count: {bank_accounts.count()}")

if bank_accounts.exists():
    ba = bank_accounts.first()
    print(f"\nRaw DB Object:")
    print(f"  ID: {ba.id}")
    print(f"  Bank: {ba.bank_name}")
    print(f"  Account: {ba.account_number}")
    print(f"  Holder: {ba.account_holder}")
    print(f"  KTP Image: {ba.ktp_image}")
    print(f"  Status: {ba.verification_status}")
    print(f"  Primary: {ba.is_primary}")
    
    # Serialize it
    serializer = BankAccountSerializer(ba)
    print(f"\nSerialized Data:")
    print(serializer.data)
