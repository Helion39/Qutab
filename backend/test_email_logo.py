import os
import django
from django.conf import settings
from django.core.mail import send_mail

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.users.email_templates import get_password_reset_email_html

recipient = 'nabilhanif39@gmail.com'
subject = '[TEST] Qutab Logo via Django Static'
reset_url = 'http://localhost:3030/reset-password?token=TEST_TOKEN_STATIC'

print(f"Generating email for {recipient}...")

html_content = get_password_reset_email_html(
    user_name='Mohammad Nabil',
    reset_url=reset_url
)

print("Sending email...")

try:
    send_mail(
        subject,
        'Please view this email in HTML mode.', # Plain text fallback
        settings.DEFAULT_FROM_EMAIL,
        [recipient],
        fail_silently=False,
        html_message=html_content
    )
    print(f"Successfully sent test email to {recipient}")
except Exception as e:
    print(f"Failed to send email: {e}")
