import os
import django
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.users.models import User
from apps.affiliates.models import Affiliate
from apps.core.services.email import EmailService

# create dummy user
email = "debug.test.999@example.com"
if User.objects.filter(email=email).exists():
    u = User.objects.get(email=email)
    # ensure affiliate exists
    if not hasattr(u, 'affiliate_profile'):
         Affiliate.objects.create(user=u, status='pending', primary_platform='instagram')
else:
    u = User.objects.create_user(email=email, password='password123', first_name='Debug', last_name='User')
    Affiliate.objects.create(user=u, status='pending', primary_platform='instagram', city='Debug City', reason='Debug')

affiliate = u.affiliate_profile

print(f"Testing Email Logic for {email}...")
try:
    EmailService.send_admin_alert_new_affiliate(u, affiliate)
    print("SUCCESS: Admin Alert Sent")
except Exception as e:
    import traceback
    traceback.print_exc()
    print(f"FAILURE: {e}")
