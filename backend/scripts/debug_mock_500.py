import os
import sys
import django
import requests

sys.path.append(os.getcwd())
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.affiliates.models import Affiliate

# 1. Login
login_url = 'http://localhost:8000/api/auth/login/'
email = 'budi.santoso@gmail.com'
password = 'QutabBerkah2024!'

print(f"Logging in as {email}...")
sess = requests.Session()
r = sess.post(login_url, json={'email': email, 'password': password})
if r.status_code != 200:
    print(f"Login failed: {r.status_code} {r.text}")
    sys.exit(1)

token = r.json()['tokens']['access']
print("Login success. Token acquired.")

# 2. Get Code
user_affiliate = Affiliate.objects.get(user__email=email)
code = user_affiliate.affiliate_code
print(f"Affiliate Code: {code}")

# 3. Trigger Mock Checkout
mock_url = 'http://localhost:8000/api/orders/mock-checkout/'
headers = {'Authorization': f'Bearer {token}'}
data = {
    'affiliate_code': code,
    'final_amount': 2500000
}

print(f"POSTing to {mock_url}...")
r2 = sess.post(mock_url, json=data, headers=headers)

print(f"Response Status: {r2.status_code}")

if r2.status_code == 500:
    print("CAPTURED 500 ERROR CONTENT:")
    with open('500_error.html', 'w', encoding='utf-8') as f:
        f.write(r2.text)
    print("Saved to 500_error.html")
    
    # Try to find exception value
    if "Exception Value" in r2.text:
        start = r2.text.find("Exception Value")
        end = r2.text.find("</pre>", start)
        print("EXCEPTION FOUND:")
        print(r2.text[start:end+20])

else:
    print(r2.text)
