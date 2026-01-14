
import json
import urllib.request
import urllib.error

def test_login_endpoint():
    url = "http://127.0.0.1:8000/api/auth/login/"
    data = {
        "email": "nabilhanif@gmail.com",
        "password": "Password123!"
    }
    
    json_data = json.dumps(data).encode('utf-8')
    
    req = urllib.request.Request(url, data=json_data, headers={'Content-Type': 'application/json'})
    
    print(f"Sending POST to {url} with data: {data}")
    
    try:
        with urllib.request.urlopen(req) as response:
            print(f"Status: {response.status}")
            print("Response:", response.read().decode('utf-8'))
            print("SUCCESS: API Login successful.")
    except urllib.error.HTTPError as e:
        print(f"Status: {e.code}")
        print("Error Response:", e.read().decode('utf-8'))
        print("FAILURE: API Login failed.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    test_login_endpoint()
