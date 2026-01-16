import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

import django
django.setup()

from django.contrib.auth import get_user_model
from apps.users.password_reset_models import PasswordResetToken

User = get_user_model()

email = 'nabilhanif39@gmail.com'
user = User.objects.filter(email=email).first()

if user:
    print(f"\nTarget User: {user.email}")
    print(f"Active: {user.is_active}")
    print(f"Old password '10thOfMyself' matches: {user.check_password('10thOfMyself')}")
    
    tokens = PasswordResetToken.objects.filter(user=user).order_by('-created_at')
    print(f"\nTokens ({tokens.count()}):")
    for t in tokens:
        print(f" - Token: {t.token[:10]}... Used: {t.is_used}")
else:
    print(f"User {email} not found")
