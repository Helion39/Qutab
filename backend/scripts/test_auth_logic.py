
import os
import django
import sys

# Setup Django environment
sys.path.append(os.getcwd())
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model, authenticate
User = get_user_model()

def test_auth():
    email = "test_auth_user@example.com"
    password = "TestPassword123!"
    
    # 1. Cleanup previous run
    try:
        u = User.objects.get(email=email)
        u.delete()
        print(f"Cleaned up existing user {email}")
    except User.DoesNotExist:
        pass
        
    # 2. Create User
    print(f"Creating user {email}...")
    user = User.objects.create_user(email=email, password=password)
    print(f"User created. ID: {user.id}")
    
    # 3. Verify Password directly
    print(f"Check password result: {user.check_password(password)}")
    
    # 4. Authenticate via Django Auth System
    # Note: authenticate() uses the default backend. 
    # Since we set USERNAME_FIELD = 'email', we should pass email as username or kwargs depending on backend.
    
    print("Attempting authenticate(username=email, password=password)...")
    auth_user = authenticate(username=email, password=password)
    
    if auth_user:
        print("SUCCESS: Authentication successful!")
        print(f"Authenticated User: {auth_user.email}")
    else:
        print("FAILURE: Authentication failed!")
        
    # 5. Cleanup
    user.delete()
    print("Test user deleted.")

if __name__ == "__main__":
    test_auth()
