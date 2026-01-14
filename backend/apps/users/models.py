from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager):
    """Custom user manager for email-based authentication."""
    
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    """
    Custom User model with role support.
    Roles: customer, affiliate, admin
    """
    
    ROLE_CHOICES = [
        ('customer', 'Customer'),
        ('affiliate', 'Affiliate'),
        ('admin', 'Admin'),
    ]
    
    username = None  # Remove username field
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer')
    phone = models.CharField(max_length=20, blank=True)
    referred_by = models.ForeignKey('affiliates.Affiliate', on_delete=models.SET_NULL, null=True, blank=True, related_name='referred_users')
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    class Meta:
        db_table = 'users'
    
    def __str__(self):
        return self.email
    
    @property
    def is_customer(self):
        return self.role == 'customer'
    
    @property
    def is_affiliate(self):
        return self.role == 'affiliate'
    
    @property
    def is_admin_user(self):
        return self.role == 'admin'


# Import EmailOTP model to register it with Django
from .otp_models import EmailOTP
