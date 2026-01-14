
import os
import django
from django.contrib.auth import authenticate

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

email = 'budi.santoso@gmail.com'
password = 'password123'

print(f"Testing authentication for {email}...")
user = authenticate(username=email, password=password)

if user:
    print(f"Success! User found: {user.email}, Role: {user.role}, Is Active: {user.is_active}")
else:
    print("Failed! authenticate() returned None.")

    # Check if user exists manually
    from apps.users.models import User
    try:
        u = User.objects.get(email=email)
        print(f"User exists in DB: {u.email}")
        print(f"Is Active: {u.is_active}")
        print(f"Has Usable Password: {u.has_usable_password()}")
        print(f"Check Password: {u.check_password(password)}")
    except User.DoesNotExist:
        print("User does NOT exist in DB.")
