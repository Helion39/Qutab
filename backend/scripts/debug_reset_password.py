
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

email = "nabilhanif39@gmail.com"
password = "password123"

try:
    user = User.objects.get(email=email)
    user.set_password(password)
    user.save()
    print(f"Password for {email} has been reset to '{password}'.")
except User.DoesNotExist:
    print(f"User {email} NOT found.")
