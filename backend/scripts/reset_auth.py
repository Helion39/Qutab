
import os
import django
from django.contrib.auth import authenticate

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.users.models import User

email = 'budi.santoso@gmail.com'
password = 'password123'

try:
    user = User.objects.get(email=email)
    user.set_password(password)
    user.save()
    print(f"Password reset successfully for {email}")
    
    # Verify
    user = authenticate(username=email, password=password)
    if user:
        print("Verification successful: authenticate() returned the user.")
    else:
        print("Verification failed: authenticate() still returned None.")
except User.DoesNotExist:
    print(f"User {email} not found.")
