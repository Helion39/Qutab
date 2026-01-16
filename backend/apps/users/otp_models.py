"""
OTP (One-Time Password) Model for Email Verification.
"""

import random
import string
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta

User = get_user_model()


class EmailOTP(models.Model):
    """
    Stores OTP codes for email verification during registration.
    """
    email = models.EmailField()
    otp_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_verified = models.BooleanField(default=False)
    attempts = models.IntegerField(default=0)  # Track failed attempts
    
    # Store registration data temporarily until OTP is verified
    registration_data = models.JSONField(null=True, blank=True)
    
    class Meta:
        verbose_name = 'Email OTP'
        verbose_name_plural = 'Email OTPs'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"OTP for {self.email} - {'Verified' if self.is_verified else 'Pending'}"
    
    @classmethod
    def generate_otp(cls, email, registration_data=None, expiry_minutes=10):
        """
        Generate a new 6-digit OTP for the given email.
        Invalidates any existing OTPs for this email.
        """
        # Invalidate existing OTPs for this email
        cls.objects.filter(email=email, is_verified=False).delete()
        
        # Generate 6-digit OTP
        otp_code = ''.join(random.choices(string.digits, k=6))
        
        # Create new OTP record
        otp = cls.objects.create(
            email=email,
            otp_code=otp_code,
            expires_at=timezone.now() + timedelta(minutes=expiry_minutes),
            registration_data=registration_data
        )
        
        return otp
    
    def is_expired(self):
        """Check if OTP has expired."""
        return timezone.now() > self.expires_at
    
    def is_valid(self, code):
        """Validate the OTP code."""
        if self.is_expired():
            return False, "Kode OTP sudah expired. Silakan minta kode baru."
        
        if self.attempts >= 5:
            return False, "Terlalu banyak percobaan. Silakan minta kode baru."
        
        if self.is_verified:
            return False, "Kode verifikasi ini sudah digunakan."
        
        if self.otp_code != code:
            self.attempts += 1
            self.save()
            remaining = 5 - self.attempts
            return False, f"Kode OTP salah. Sisa percobaan: {remaining}"
        
        # OTP is valid
        self.is_verified = True
        self.save()
        return True, "Email berhasil diverifikasi!"
    
    @classmethod
    def cleanup_expired(cls):
        """Remove expired and old OTPs."""
        threshold = timezone.now() - timedelta(hours=24)
        cls.objects.filter(created_at__lt=threshold).delete()
