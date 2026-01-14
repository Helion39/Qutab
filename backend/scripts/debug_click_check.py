
import os
import django
import sys

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.affiliates.models import Affiliate, ReferralClick

def monitor_clicks(email):
    try:
        affiliate = Affiliate.objects.get(user__email=email)
        print(f"--- Stats for {email} ({affiliate.affiliate_code}) ---")
        
        clicks = ReferralClick.objects.filter(affiliate=affiliate)
        count = clicks.count()
        
        print(f"Total Clicks Found: {count}")
        
        if count > 0:
            print("\nRecent Clicks:")
            for click in clicks.order_by('-created_at')[:5]:
                print(f" - {click.created_at.strftime('%Y-%m-%d %H:%M:%S')} | IP: {click.ip_address} | Page: {click.landing_page}")
        else:
            print("No clicks recorded yet.")
            
    except Affiliate.DoesNotExist:
        print(f"Affiliate with email {email} not found.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    target_email = "nabilhanif39@gmail.com"
    if len(sys.argv) > 1:
        target_email = sys.argv[1]
    monitor_clicks(target_email)
