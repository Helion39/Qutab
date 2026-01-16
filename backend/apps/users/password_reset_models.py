"""
Password Reset Models and Logic
"""
import secrets
from django.db import models
from django.utils import timezone
from datetime import timedelta
from django.conf import settings


class PasswordResetToken(models.Model):
    """Token for password reset via email."""
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='reset_tokens'
    )
    token = models.CharField(max_length=64, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_used = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'password_reset_tokens'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Reset token for {self.user.email}"
    
    @classmethod
    def create_for_user(cls, user):
        """Create a new password reset token for a user."""
        # Invalidate any existing unused tokens for this user
        cls.objects.filter(user=user, is_used=False).update(is_used=True)
        
        # Generate secure random token
        token = secrets.token_urlsafe(48)  # 64 chars URL-safe
        
        # Create with 1 hour expiry
        expires_at = timezone.now() + timedelta(hours=1)
        
        return cls.objects.create(
            user=user,
            token=token,
            expires_at=expires_at
        )
    
    def is_valid(self):
        """Check if token is still valid."""
        if self.is_used:
            return False, "Link reset password ini sudah digunakan. Silakan minta link baru."
        
        if timezone.now() > self.expires_at:
            return False, "Link sudah kadaluarsa. Silakan minta link baru."
        
        return True, "Valid"
    
    def mark_used(self):
        """Mark token as used."""
        self.is_used = True
        self.save()
