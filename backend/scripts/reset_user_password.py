
import os
import django
import sys

# Setup Django
sys.path.append(os.getcwd())
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

def reset_password():
    email = "nabilhanif@gmail.com"
    new_password = "Password123!" # Default known password
    
    try:
        user = User.objects.get(email=email)
        user.set_password(new_password)
        user.save()
        print(f"SUCCESS: Password for {email} has been reset to '{new_password}'")
        print("Please try logging in with this password.")
        
        # Verify it works immediately
        if user.check_password(new_password):
            print("Verification: Password matches hash.")
        else:
            print("Verification: Password DOES NOT match hash (Something is wrong).")
            
    except User.DoesNotExist:
        print(f"ERROR: User {email} not found in database.")

if __name__ == "__main__":
    reset_password()
