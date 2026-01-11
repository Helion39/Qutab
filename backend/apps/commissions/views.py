from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from .models import Commission, BankAccount, Payout
from .serializers import (
    CommissionSerializer, CommissionSummarySerializer,
    BankAccountSerializer, BankAccountCreateSerializer,
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


class BankAccountListView(generics.ListCreateAPIView):
    """List and create bank accounts."""
    
    permission_classes = [IsAuthenticated]
    
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
        affiliate = Affiliate.objects.get(user=self.request.user)
        serializer.save(affiliate=affiliate)


class BankAccountDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Get, update, or delete a bank account."""
    
    permission_classes = [IsAuthenticated]
    serializer_class = BankAccountSerializer
    
    def get_queryset(self):
        try:
            affiliate = Affiliate.objects.get(user=self.request.user)
            return BankAccount.objects.filter(affiliate=affiliate)
        except Affiliate.DoesNotExist:
            return BankAccount.objects.none()


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
