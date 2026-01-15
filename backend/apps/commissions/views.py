from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db import models
from django.utils import timezone

from .models import Commission, BankAccount, Payout
from .serializers import (
    CommissionSerializer, CommissionSummarySerializer,
    BankAccountSerializer, BankAccountCreateSerializer,
    AdminBankAccountSerializer,
    PayoutSerializer, PayoutRequestSerializer
)
from apps.affiliates.models import Affiliate


class CommissionListView(generics.ListAPIView):
    """List affiliate's commissions."""
    
    permission_classes = [IsAuthenticated]
    serializer_class = CommissionSerializer
    
    def get_queryset(self):
        try:
            affiliate = Affiliate.objects.get(user=self.request.user)
            queryset = Commission.objects.filter(affiliate=affiliate)
            
            # Filter by status
            status_filter = self.request.query_params.get('status')
            if status_filter:
                queryset = queryset.filter(status=status_filter)
            
            return queryset
        except Affiliate.DoesNotExist:
            return Commission.objects.none()


class CommissionSummaryView(APIView):
    """Get affiliate's commission balance summary."""
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            affiliate = Affiliate.objects.get(user=request.user)
        except Affiliate.DoesNotExist:
            return Response({'error': 'No affiliate profile'}, status=status.HTTP_404_NOT_FOUND)
        
        summary = Commission.get_affiliate_summary(affiliate.id)
        return Response(CommissionSummarySerializer(summary).data)


from rest_framework.parsers import MultiPartParser, FormParser

class BankAccountListView(generics.ListCreateAPIView):
    """List and create bank accounts."""
    
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BankAccountCreateSerializer
        return BankAccountSerializer
    
    def get_queryset(self):
        try:
            affiliate = Affiliate.objects.get(user=self.request.user)
            return BankAccount.objects.filter(affiliate=affiliate)
        except Affiliate.DoesNotExist:
            return BankAccount.objects.none()
    
    def perform_create(self, serializer):
        try:
            affiliate = Affiliate.objects.get(user=self.request.user)
            serializer.save(affiliate=affiliate)
        except Exception as e:
            print(f"!!! ERROR CREATING BANK ACCOUNT: {e}")
            import traceback
            traceback.print_exc()
            raise e


class BankAccountDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Get, update, or delete a bank account."""
    
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = BankAccountSerializer
    
    def get_queryset(self):
        try:
            affiliate = Affiliate.objects.get(user=self.request.user)
            return BankAccount.objects.filter(affiliate=affiliate)
        except Affiliate.DoesNotExist:
            return BankAccount.objects.none()

    def perform_update(self, serializer):
        # Smart Update: Only reset status if critical fields changed
        instance = serializer.instance
        data = serializer.validated_data
        
        has_changes = False
        
        # Check text fields
        for field in ['bank_name', 'account_number', 'account_holder']:
            if field in data and data[field] != getattr(instance, field):
                has_changes = True
                break
                
        # Check image field (if provided in update)
        if 'ktp_image' in data:
            has_changes = True
            
        if has_changes:
            serializer.save(
                verification_status='pending',
                verified_at=None,
                rejection_reason=""
            )
        else:
            # No critical changes, just save (e.g. if we add non-critical fields later)
            serializer.save()


class PayoutListView(generics.ListAPIView):
    """List affiliate's payouts."""
    
    permission_classes = [IsAuthenticated]
    serializer_class = PayoutSerializer
    
    def get_queryset(self):
        try:
            affiliate = Affiliate.objects.get(user=self.request.user)
            return Payout.objects.filter(affiliate=affiliate)
        except Affiliate.DoesNotExist:
            return Payout.objects.none()


class PayoutRequestView(APIView):
    """Request a payout."""
    
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            affiliate = Affiliate.objects.get(user=request.user)
        except Affiliate.DoesNotExist:
            return Response({'error': 'No affiliate profile'}, status=status.HTTP_404_NOT_FOUND)
        
        if affiliate.status != 'approved':
            return Response({'error': 'Affiliate not approved'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = PayoutRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Get bank account
        try:
            bank_account = BankAccount.objects.get(
                id=serializer.validated_data['bank_account_id'],
                affiliate=affiliate
            )
        except BankAccount.DoesNotExist:
            return Response({'error': 'Bank account not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if bank account is verified
        if bank_account.verification_status != 'verified':
            return Response({'error': 'Bank account not verified'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Request payout with transaction locking
        try:
            payout = Payout.request_payout(
                affiliate=affiliate,
                bank_account=bank_account,
                amount=serializer.validated_data['amount']
            )
            return Response({
                'message': 'Payout request submitted.',
                'payout': PayoutSerializer(payout).data
            }, status=status.HTTP_201_CREATED)

        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# --- Admin Views ---

from rest_framework.permissions import IsAdminUser

class AdminBankAccountListView(generics.ListAPIView):
    """Admin: List all bank accounts for verification."""
    permission_classes = [IsAdminUser]
    serializer_class = AdminBankAccountSerializer
    
    def get_queryset(self):
        # Return all bank accounts, ordered by pending first
        return BankAccount.objects.all().order_by(
            models.Case(
                models.When(verification_status='pending', then=0),
                default=1
            ),
            '-created_at'
        )

class AdminVerifyBankAccountView(APIView):
    """Admin: Mark bank account as verified."""
    permission_classes = [IsAdminUser]
    
    def post(self, request, pk):
        bank_account = get_object_or_404(BankAccount, pk=pk)
        
        bank_account.verification_status = 'verified'
        bank_account.verified_at = timezone.now()
        bank_account.save()
        
        return Response({'message': 'Bank account verified successfully.'})

class AdminRejectBankAccountView(APIView):
    """Admin: Reject bank account."""
    permission_classes = [IsAdminUser]
    
    def post(self, request, pk):
        bank_account = get_object_or_404(BankAccount, pk=pk)
        
        reason = request.data.get('reason', 'Verification rejected by admin.')
        
        bank_account.verification_status = 'rejected'
        bank_account.rejection_reason = reason
        bank_account.save()
        
        return Response({'message': 'Bank account rejected.'})

class AdminDeleteBankAccountView(APIView):
    """Admin: Delete bank account."""
    permission_classes = [IsAdminUser]
    
    def delete(self, request, pk):
        bank_account = get_object_or_404(BankAccount, pk=pk)
        bank_account.delete()
        return Response({'message': 'Bank account deleted successfully.'})
