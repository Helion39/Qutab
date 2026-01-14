
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

email = "nabilhanif@gmail.com"
try:
    user = User.objects.get(email=email)
    print(f"User {email} found.")
    print(f"Is active: {user.is_active}")
    print(f"Is staff: {user.is_staff}")
    print(f"Is superuser: {user.is_superuser}")
    # We can't check the password directly as it's hashed, but we can check if it's usable
    print(f"Has usable password: {user.has_usable_password()}")
except User.DoesNotExist:
    print(f"User {email} NOT found.")
    print("Users available in DB:")
    for u in User.objects.all():
        print(f" - {u.email}")
