# Qutab Backend

Django REST API backend for the Qutab Qurban platform.

## Setup

1. Create virtual environment:
```bash
cd backend
python -m venv venv
```

2. Activate virtual environment:
```bash
# Windows
.\venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers psycopg2-binary python-dotenv pillow
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create superuser:
```bash
python manage.py createsuperuser
```

6. Run development server:
```bash
python manage.py runserver
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Customer registration |
| POST | `/api/auth/login/` | Login (customers & affiliates) |
| POST | `/api/auth/logout/` | Logout |
| POST | `/api/auth/token/refresh/` | Refresh JWT token |

### Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile/` | Get current user profile |
| PUT | `/api/profile/` | Update profile |
| POST | `/api/profile/password/` | Change password |

### Affiliate
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/affiliate/auth/register/` | Submit affiliate application |
| GET | `/api/affiliate/status/` | Check application status |

## Admin Panel

Access Django Admin at: `http://localhost:8000/admin/`

Default superuser: `admin@qutab.id`
