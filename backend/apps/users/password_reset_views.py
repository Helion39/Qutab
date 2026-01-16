"""
Password Reset Views
"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings

from .password_reset_models import PasswordResetToken
from .email_templates import get_password_reset_email_html

User = get_user_model()


class ForgotPasswordView(APIView):
    """
    Request password reset email.
    POST /api/auth/forgot-password/
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get('email', '').strip().lower()
        
        if not email:
            return Response(
                {'error': 'Email wajib diisi.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Always return success message to prevent email enumeration
        success_message = 'Jika email terdaftar, Anda akan menerima link reset password.'
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Don't reveal that email doesn't exist
            return Response({'message': success_message})
        
        # Check if user is active
        if not user.is_active:
            return Response({'message': success_message})
        
        # Create reset token
        reset_token = PasswordResetToken.create_for_user(user)
        
        # Build reset URL
        frontend_url = getattr(settings, 'FRONTEND_URL', 'http://localhost:3030')
        reset_url = f"{frontend_url}/reset-password?token={reset_token.token}"
        
        # Send email
        try:
            subject = 'Reset Password - Qutab'
            text_message = f"""
Halo {user.first_name or 'Pengguna'},

Kami menerima permintaan untuk reset password akun Anda.

Klik link berikut untuk reset password:
{reset_url}

Link ini berlaku selama 1 jam.

Jika Anda tidak meminta reset password, abaikan email ini.

Salam,
Tim Qutab
            """
            
            html_message = get_password_reset_email_html(
                user_name=user.first_name or 'Pengguna',
                reset_url=reset_url
            )
            
            send_mail(
                subject,
                text_message,
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
                html_message=html_message
            )
            
        except Exception as e:
            print(f"Password reset email failed: {e}")
            # Still return success to prevent enumeration
        
        return Response({'message': success_message})


class ResetPasswordView(APIView):
    """
    Reset password with token.
    POST /api/auth/reset-password/
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        token = request.data.get('token', '').strip()
        new_password = request.data.get('new_password', '')
        confirm_password = request.data.get('confirm_password', '')
        
        # Validation
        if not token:
            return Response(
                {'error': 'Token tidak valid.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not new_password:
            return Response(
                {'error': 'Password baru wajib diisi.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if len(new_password) < 8:
            return Response(
                {'error': 'Password minimal 8 karakter.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if new_password != confirm_password:
            return Response(
                {'error': 'Password dan konfirmasi password tidak sama.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Find token
        try:
            reset_token = PasswordResetToken.objects.get(token=token)
        except PasswordResetToken.DoesNotExist:
            return Response(
                {'error': 'Token tidak valid atau sudah kadaluarsa.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate token
        is_valid, message = reset_token.is_valid()
        if not is_valid:
            return Response(
                {'error': message},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Reset password
        user = reset_token.user
        user.set_password(new_password)
        user.save()
        
        # Mark token as used
        reset_token.mark_used()
        
        return Response({
            'message': 'Password berhasil direset. Silakan login dengan password baru.'
        })
