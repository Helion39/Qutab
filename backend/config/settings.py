from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

# ... imports ...
from pathlib import Path
from datetime import timedelta
import os
import xendit

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# ...

# =============================================================================
# XENDIT PAYMENT GATEWAY
# =============================================================================
XENDIT_API_KEY = os.environ.get('XENDIT_API_KEY')
XENDIT_CALLBACK_TOKEN = os.environ.get('XENDIT_CALLBACK_TOKEN')

if XENDIT_API_KEY:
    xendit.api_key = XENDIT_API_KEY
# =============================================================================


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-dev-key-change-in-production')

# SECURITY WARNING: don't run with debug turned on in production!
# Defaults to False for safety - explicitly set DEBUG=True in .env for development
DEBUG = os.environ.get('DEBUG', 'False') == 'True'

ALLOWED_HOSTS = [
    'localhost', 
    '127.0.0.1', 
    'qutab.co.id', 
    'www.qutab.co.id', 
    'api.qutab.co.id',
    'shop.qurbantanpabatas.id',
    'affiliate.qurbantanpabatas.id',
    'dash-u28mzk49.qurbantanpabatas.id',
]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party apps
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'axes',  # Brute-force protection
    
    # Local apps
    'apps.core',
    'apps.users',
    'apps.products',
    'apps.orders',
    'apps.affiliates',
    'apps.commissions',
    'apps.payments',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # CORS - must be before CommonMiddleware
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'axes.middleware.AxesMiddleware',  # Brute-force protection - must be last
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database - using SQLite for development, PostgreSQL for production
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# For PostgreSQL (uncomment and configure for production):
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': os.environ.get('DB_NAME', 'qutab'),
#         'USER': os.environ.get('DB_USER', 'postgres'),
#         'PASSWORD': os.environ.get('DB_PASSWORD', ''),
#         'HOST': os.environ.get('DB_HOST', 'localhost'),
#         'PORT': os.environ.get('DB_PORT', '5432'),
#     }
# }


# Custom User Model
AUTH_USER_MODEL = 'users.User'


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# Django REST Framework Configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}


# JWT Configuration
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
}


# Authentication Backends (required for django-axes)
AUTHENTICATION_BACKENDS = [
    'axes.backends.AxesStandaloneBackend',  # Rate limiting
    'django.contrib.auth.backends.ModelBackend',  # Default
]


# =============================================================================
# DJANGO-AXES (Brute-Force Protection)
# Based on NIST 800-63B guidelines for e-commerce
# =============================================================================
AXES_FAILURE_LIMIT = 10  # NIST recommends ≥10 for e-commerce (prevents DoS lockout attacks)
AXES_COOLOFF_TIME = 0.5  # Lock for 30 minutes (0.5 hours)
AXES_LOCKOUT_CALLABLE = None  # Use default lockout response
AXES_RESET_ON_SUCCESS = True  # Reset counter on successful login
AXES_ONLY_USER_FAILURES = False  # Track IP + username combination
AXES_LOCK_OUT_BY_COMBINATION_USER_AND_IP = True  # Lock specific IP + user combo

# What counts as a login attempt (for API/DRF)
AXES_USERNAME_FORM_FIELD = 'email'  # Our login uses email field
AXES_SENSITIVE_PARAMETERS = ['password', 'new_password', 'old_password']


# CORS Configuration - Allow frontend during development and production
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:5173',  # Vite default
    'http://localhost:3030',  # User preferred
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3030',
    'https://qutab.co.id',    # Production frontend
    'https://www.qutab.co.id', # Production frontend with www
    'https://shop.qurbantanpabatas.id',
    'https://affiliate.qurbantanpabatas.id',
    'https://dash-u28mzk49.qurbantanpabatas.id',
]

CSRF_TRUSTED_ORIGINS = [
    'https://shop.qurbantanpabatas.id',
    'https://affiliate.qurbantanpabatas.id',
    'https://dash-u28mzk49.qurbantanpabatas.id',
]

CORS_ALLOW_CREDENTIALS = True


# Internationalization
LANGUAGE_CODE = 'id-id'  # Indonesian
TIME_ZONE = 'Asia/Jakarta'  # WIB
USE_I18N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Media files (uploads)
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'


# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Frontend URL (for redirects after payment)
# Environment-aware frontend URL configuration
if DEBUG:
    # Development: Use the same host as the request but different port
    FRONTEND_URL = os.environ.get('FRONTEND_URL', 'http://localhost:3030')
    BACKEND_URL = os.environ.get('BACKEND_URL', 'http://127.0.0.1:8000')
else:
    # Production: Use the production domain
    FRONTEND_URL = os.environ.get('FRONTEND_URL', 'https://qutab.co.id')
    BACKEND_URL = os.environ.get('BACKEND_URL', 'https://qutab.co.id')


# =============================================================================
# ZENDIT PAYMENT GATEWAY (Configure later when registered)
# =============================================================================
# Set these environment variables when you register with Zendit:
#   ZENDIT_API_KEY=your-api-key
#   ZENDIT_SECRET_KEY=your-secret-key  
#   ZENDIT_API_URL=https://api.zendit.id/v1
#   ZENDIT_CALLBACK_URL=https://your-domain.com/api/payments/webhook/
# =============================================================================


# =============================================================================
# =============================================================================
# EMAIL CONFIGURATION
# =============================================================================
# Production SMTP Settings (Hostinger)
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.hostinger.com'
EMAIL_PORT = 465
EMAIL_USE_SSL = True
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', 'admin@qurbantanpabatas.id')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', '')  # Set in .env file!
DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL', 'Qutab Notification <admin@qurbantanpabatas.id>')
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@qurbantanpabatas.id')


# For dev/testing (Console):
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'


# =============================================================================
# PRODUCTION SECURITY SETTINGS (Auto-enabled when DEBUG=False)
# =============================================================================
if not DEBUG:
    # HTTPS/SSL
    SECURE_SSL_REDIRECT = True
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    
    # Cookies
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    
    # Headers
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = 'DENY'
    
    # HSTS (HTTP Strict Transport Security)
    SECURE_HSTS_SECONDS = 31536000  # 1 year
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
