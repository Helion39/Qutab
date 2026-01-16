import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

import django
django.setup()

from django.contrib.auth import get_user_model
from apps.users.password_reset_models import PasswordResetToken

User = get_user_model()

# Search for all users matching 'nabil'
users = User.objects.filter(email__icontains='nabil')
print(f"Found {users.count()} users matching 'nabil':")

for user in users:
    print(f"\n--- User: {user.email} (ID: {user.id}) ---")
    print(f"Active: {user.is_active}")
    print(f"Password '10thOfMyself' matches: {user.check_password('10thOfMyself')}")
    
    # Check reset tokens
    tokens = PasswordResetToken.objects.filter(user=user).order_by('-created_at')
    print(f"Reset Tokens ({tokens.count()}):")
    for t in tokens:
        print(f"  Token: {t.token[:20]}... | Used: {t.is_used} | Expires: {t.expires_at}")
        is_valid, msg = t.is_valid()
        print(f"    Status: {msg}")
