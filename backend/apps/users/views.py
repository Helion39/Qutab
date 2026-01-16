from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .serializers import (
    UserSerializer, 
    CustomerRegisterSerializer, 
    AffiliateRegisterSerializer,
    ChangePasswordSerializer,
)

User = get_user_model()


@method_decorator(csrf_exempt, name='dispatch')
class CustomerRegisterView(generics.CreateAPIView):
    """Register a new customer account."""
    
    permission_classes = [AllowAny]
    serializer_class = CustomerRegisterSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'message': 'Registrasi berhasil',
            'user': UserSerializer(user).data,
            'tokens': {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }
        }, status=status.HTTP_201_CREATED)


@method_decorator(csrf_exempt, name='dispatch')
class AffiliateRegisterView(generics.CreateAPIView):
    """Submit affiliate application."""
    
    permission_classes = [AllowAny]
    serializer_class = AffiliateRegisterSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Send notifications
        try:
            from apps.affiliates.models import Affiliate
            from apps.core.services.email import EmailService
            
            affiliate = Affiliate.objects.get(user=user)
            
            # 1. Alert Admin
            EmailService.send_admin_alert_new_affiliate(user, affiliate)
            
            # 2. Welcome User
            EmailService.send_affiliate_welcome(user)
            
        except Exception as e:
            # Log error but don't fail registration
            print(f"Failed to send registration emails: {e}")
        
        return Response({
            'message': 'Pendaftaran affiliator berhasil. Mohon tunggu persetujuan.',
            'user': UserSerializer(user).data,
            'status': 'pending'
        }, status=status.HTTP_201_CREATED)


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    """Login for both customers and affiliates. Accepts username or email param as ID."""
    
    permission_classes = [AllowAny]
    
    def post(self, request):
        # Frontend might send 'username' (Admin ID) or 'email'
        login_identifier = request.data.get('username') or request.data.get('email')
        password = request.data.get('password')
        
        if not login_identifier or not password:
            if 'username' in request.data:
                error_msg = 'ID Admin dan password wajib diisi.'
            else:
                error_msg = 'Email dan password wajib diisi.'
                
            return Response(
                {'error': error_msg},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Authenticate using the identifier. 
        # Since USERNAME_FIELD = 'email' in models.py, 'username' kwarg here expects the email value.
        user = authenticate(request, username=login_identifier, password=password)
        
        if user is None:
            # Different error message based on input type
            if 'username' in request.data:
                error_msg = 'ID Admin atau password salah.'
            else:
                error_msg = 'Email atau password salah.'
                
            return Response(
                {'error': error_msg},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        if not user.is_active:
            return Response(
                {'error': 'Akun dinonaktifkan. Silakan hubungi admin.'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'message': 'Login berhasil',
            'user': UserSerializer(user).data,
            'tokens': {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }
        })


@method_decorator(csrf_exempt, name='dispatch')
class GoogleLoginView(APIView):
    """Login using Google OAuth access token."""
    
    permission_classes = [AllowAny]
    
    def post(self, request):
        access_token = request.data.get('access_token')
        
        if not access_token:
            return Response(
                {'error': 'Access token is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        # Verify token with Google
        import requests
        try:
            google_response = requests.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                headers={'Authorization': f'Bearer {access_token}'}
            )
            
            if google_response.status_code != 200:
                return Response(
                    {'error': 'Gagal verifikasi Google. Silakan login ulang.'},
                    status=status.HTTP_401_UNAUTHORIZED
                )
                
            user_info = google_response.json()
            email = user_info.get('email')
            
            if not email:
                return Response(
                    {'error': 'Email akun Google tidak ditemukan.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            # Find user
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response(
                    {'error': 'Akun tidak ditemukan. Silakan daftar terlebih dahulu.'},
                    status=status.HTTP_404_NOT_FOUND
                )
                
            if not user.is_active:
                return Response(
                    {'error': 'Akun dinonaktifkan. Silakan hubungi admin.'},
                    status=status.HTTP_403_FORBIDDEN
                )
                
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'message': 'Login berhasil',
                'user': UserSerializer(user).data,
                'tokens': {
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                }
            })
            
        except Exception as e:
            # Log the actual error for debugging, but don't expose to user
            print(f"Google login error: {e}")
            return Response(
                {'error': 'Login dengan Google gagal. Silakan coba lagi.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class LogoutView(APIView):
    """Logout by blacklisting the refresh token."""
    
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response({'message': 'Logout berhasil'})
        except Exception:
            return Response({'message': 'Logout berhasil'})


class ProfileView(generics.RetrieveUpdateAPIView):
    """Get and update user profile."""
    
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user


class ChangePasswordView(APIView):
    """Change user password."""
    
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = request.user
        
        if not user.check_password(serializer.validated_data['current_password']):
            return Response(
                {'error': 'Password saat ini salah.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        
        return Response({'message': 'Password berhasil diubah.'})


class AffiliateStatusView(APIView):
    """Check affiliate application status."""
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        
        if user.role != 'affiliate':
            return Response(
                {'error': 'Not an affiliate account.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            from apps.affiliates.models import Affiliate
            affiliate = Affiliate.objects.get(user=user)
            
            return Response({
                'status': affiliate.status,
                'affiliate_id': affiliate.id,
                'affiliate_code': affiliate.affiliate_code,
                'approved_at': affiliate.approved_at,
            })
        except Affiliate.DoesNotExist:
            return Response({
                'status': 'not_found',
                'error': 'Affiliate profile not found.'
            }, status=status.HTTP_404_NOT_FOUND)
from django.conf import settings

class MockCleanupView(APIView):
    """Dev Tool: Clear all test accounts (Superusers/Staff preserved)."""
    permission_classes = [AllowAny]

    def post(self, request):
        if not getattr(settings, 'DEBUG', False):
            # In production, pretend this endpoint doesn't exist
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        # Lazy imports to avoid circular deps if any
        from apps.orders.models import Order
        from apps.commissions.models import Commission
        
        # Cleanup
        Commission.objects.all().delete()
        Order.objects.all().delete()
        # Delete non-staff users
        deleted_count, _ = User.objects.filter(is_staff=False, is_superuser=False).delete()
        
        return Response({'message': f'Cleanup successful! Deleted {deleted_count} test users.'})


# --- Admin User Management Views ---

from rest_framework.permissions import IsAdminUser
from .serializers import AdminUserSerializer
from django.contrib.auth.hashers import make_password
import secrets
import string


class AdminUserListView(generics.ListAPIView):
    """Admin: List all users with optional role filtering."""
    
    permission_classes = [IsAdminUser]
    serializer_class = AdminUserSerializer
    
    def get_queryset(self):
        queryset = User.objects.all().order_by('-created_at')
        
        # Filter by role
        role = self.request.query_params.get('role')
        if role:
            queryset = queryset.filter(role=role)
            
        # Search by email or name
        search = self.request.query_params.get('search')
        if search:
            from django.db.models import Q
            queryset = queryset.filter(
                Q(email__icontains=search) |
                Q(first_name__icontains=search) |
                Q(last_name__icontains=search)
            )
            
        # Exclude staff/superusers from normal admin view
        exclude_staff = self.request.query_params.get('exclude_staff', 'true')
        if exclude_staff.lower() == 'true':
            queryset = queryset.filter(is_staff=False, is_superuser=False)
            
        return queryset


class AdminUserDetailView(generics.RetrieveAPIView):
    """Admin: Get detailed user info."""
    
    permission_classes = [IsAdminUser]
    serializer_class = AdminUserSerializer
    queryset = User.objects.all()
    lookup_field = 'id'


class AdminUserSuspendView(APIView):
    """Admin: Suspend/deactivate a user account."""
    
    permission_classes = [IsAdminUser]
    
    def post(self, request, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
            
        if user.is_superuser or user.is_staff:
            return Response({'error': 'Cannot suspend admin users'}, status=status.HTTP_403_FORBIDDEN)
            
        user.is_active = False
        user.save(update_fields=['is_active'])
        
        return Response({'message': f'User {user.email} has been suspended.'})


class AdminUserActivateView(APIView):
    """Admin: Activate a suspended user account."""
    
    permission_classes = [IsAdminUser]
    
    def post(self, request, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
            
        user.is_active = True
        user.save(update_fields=['is_active'])
        
        return Response({'message': f'User {user.email} has been activated.'})


class AdminUserResetPasswordView(APIView):
    """Admin: Reset user password to a random temporary password."""
    
    permission_classes = [IsAdminUser]
    
    def post(self, request, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
            
        if user.is_superuser:
            return Response({'error': 'Cannot reset superuser password'}, status=status.HTTP_403_FORBIDDEN)
        
        # Generate random password
        alphabet = string.ascii_letters + string.digits
        new_password = ''.join(secrets.choice(alphabet) for _ in range(12))
        
        user.set_password(new_password)
        user.save()
        
        # In production, you'd email this to the user instead of returning it
        return Response({
            'message': f'Password reset for {user.email}',
            'temporary_password': new_password,
            'note': 'User should change this password immediately.'
        })
