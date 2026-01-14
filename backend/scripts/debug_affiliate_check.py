
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from apps.affiliates.models import Affiliate

User = get_user_model()
email = "nabilhanif39@gmail.com"

try:
    user = User.objects.get(email=email)
    try:
        affiliate = Affiliate.objects.get(user=user)
        print(f"User {email} IS an Affiliate.")
        print(f"Affiliate Status: {affiliate.status}")
    except Affiliate.DoesNotExist:
        print(f"User {email} is NOT an Affiliate.")
        
        # Make them an affiliate for testing if needed
        # Affiliate.objects.create(user=user, status='active')
        # print("Created Affiliate profile for user.")

except User.DoesNotExist:
    print("User not found.")
