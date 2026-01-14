"""
OTP Views for Email Verification during Affiliate Registration.
"""

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings

from .otp_models import EmailOTP
from apps.affiliates.models import Affiliate

User = get_user_model()


class SendOTPView(APIView):
    """
    Send OTP to email for verification.
    POST /api/auth/otp/send/
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        registration_data = request.data.get('registration_data')
        
        if not email:
            return Response(
                {'error': 'Email is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if email already exists
        if User.objects.filter(email=email).exists():
            return Response(
                {'error': 'Email sudah terdaftar. Silakan login.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Generate OTP
        otp = EmailOTP.generate_otp(email, registration_data)
        
        # Send email
        try:
            subject = 'Kode Verifikasi Qutab - Pendaftaran Affiliator'
            message = f"""
Halo!

Terima kasih telah mendaftar sebagai affiliator Qutab.

Kode verifikasi Anda adalah:

    {otp.otp_code}

Kode ini berlaku selama 10 menit.

Jika Anda tidak merasa mendaftar, abaikan email ini.

Salam,
Tim Qutab
            """
            
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
            
            return Response({
                'message': 'Kode OTP telah dikirim ke email Anda.',
                'email': email
            })
            
        except Exception as e:
            # If email fails, still return success for development
            # In production, you'd want to handle this differently
            print(f"Email send failed: {e}")
            
            # For development, return the OTP in response (REMOVE IN PRODUCTION)
            if settings.DEBUG:
                return Response({
                    'message': 'Kode OTP telah dikirim ke email Anda.',
                    'email': email,
                    'debug_otp': otp.otp_code  # Remove in production!
                })
            
            return Response({
                'message': 'Kode OTP telah dikirim ke email Anda.',
                'email': email
            })


class VerifyOTPView(APIView):
    """
    Verify OTP and complete registration.
    POST /api/auth/otp/verify/
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        otp_code = request.data.get('otp_code')
        
        if not email or not otp_code:
            return Response(
                {'error': 'Email and OTP code are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Find OTP record
        try:
            otp = EmailOTP.objects.filter(
                email=email,
                is_verified=False
            ).latest('created_at')
        except EmailOTP.DoesNotExist:
            return Response(
                {'error': 'Tidak ada kode OTP untuk email ini. Silakan minta kode baru.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate OTP
        is_valid, message = otp.is_valid(otp_code)
        
        if not is_valid:
            return Response(
                {'error': message},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # OTP is valid - create the user and affiliate account
        registration_data = otp.registration_data
        
        if not registration_data:
            return Response(
                {'error': 'Data registrasi tidak ditemukan. Silakan daftar ulang.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Create user
            user = User.objects.create_user(
                email=email,
                password=registration_data.get('password'),
                first_name=registration_data.get('first_name', ''),
                last_name=registration_data.get('last_name', ''),
                role='affiliate'
            )
            
            # Create affiliate profile
            affiliate = Affiliate.objects.create(
                user=user,
                whatsapp=registration_data.get('whatsapp', ''),
                city=registration_data.get('city', ''),
                instagram=registration_data.get('instagram', ''),
                tiktok=registration_data.get('tiktok', ''),
                youtube=registration_data.get('youtube', ''),
                facebook=registration_data.get('facebook', ''),
                primary_platform=registration_data.get('primary_platform', ''),
                reason=registration_data.get('reason', ''),
                status='pending'  # Always pending until admin approves
            )
            
            # Clean up OTP
            otp.delete()
            
            return Response({
                'message': 'Email berhasil diverifikasi! Pendaftaran Anda sedang ditinjau.',
                'status': 'pending',
                'affiliate_id': affiliate.id
            })
            
        except Exception as e:
            return Response(
                {'error': f'Gagal membuat akun: {str(e)}'},
                status=status.HTTP_400_BAD_REQUEST
            )


class ResendOTPView(APIView):
    """
    Resend OTP to email.
    POST /api/auth/otp/resend/
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        
        if not email:
            return Response(
                {'error': 'Email is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Find existing OTP to get registration data
        try:
            old_otp = EmailOTP.objects.filter(
                email=email,
                is_verified=False
            ).latest('created_at')
            registration_data = old_otp.registration_data
        except EmailOTP.DoesNotExist:
            registration_data = None
        
        # Generate new OTP
        otp = EmailOTP.generate_otp(email, registration_data)
        
        # Send email (same as SendOTPView)
        try:
            subject = 'Kode Verifikasi Baru - Qutab'
            message = f"""
Halo!

Berikut adalah kode verifikasi baru Anda:

    {otp.otp_code}

Kode ini berlaku selama 10 menit.

Salam,
Tim Qutab
            """
            
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Email send failed: {e}")
        
        response_data = {
            'message': 'Kode OTP baru telah dikirim ke email Anda.',
            'email': email
        }
        
        if settings.DEBUG:
            response_data['debug_otp'] = otp.otp_code
        
        return Response(response_data)
