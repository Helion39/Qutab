import os
import django
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.core.mail import send_mail

print("Attempting to send email...")
try:
    send_mail(
        'Test Subject',
        'Test Body',
        'admin@qurbantanpabatas.id',
        ['admin@qurbantanpabatas.id'],
        fail_silently=False,
    )
    print("SUCCESS: Email sent successfully!")
except Exception as e:
    print(f"FAILURE: Email failed with error: {e}")
