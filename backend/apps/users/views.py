from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model

from .serializers import (
    UserSerializer, 
    CustomerRegisterSerializer, 
    AffiliateRegisterSerializer,
    ChangePasswordSerializer,
)

User = get_user_model()


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
            'message': 'Registration successful',
            'user': UserSerializer(user).data,
            'tokens': {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }
        }, status=status.HTTP_201_CREATED)


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
            'message': 'Affiliate application submitted. Please wait for approval.',
            'user': UserSerializer(user).data,
            'status': 'pending'
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """Login for both customers and affiliates."""
    
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response(
                {'error': 'Email and password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = authenticate(request, username=email, password=password)
        
        if user is None:
            return Response(
                {'error': 'Invalid email or password.'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        if not user.is_active:
            return Response(
                {'error': 'Account is deactivated.'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'message': 'Login successful',
            'user': UserSerializer(user).data,
            'tokens': {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }
        })


class LogoutView(APIView):
    """Logout by blacklisting the refresh token."""
    
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response({'message': 'Logout successful'})
        except Exception:
            return Response({'message': 'Logout successful'})


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
                {'error': 'Current password is incorrect.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        
        return Response({'message': 'Password changed successfully.'})


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
                'affiliate_code': affiliate.affiliate_code,
                'approved_at': affiliate.approved_at,
            })
        except Affiliate.DoesNotExist:
            return Response({
                'status': 'not_found',
                'error': 'Affiliate profile not found.'
            }, status=status.HTTP_404_NOT_FOUND)
