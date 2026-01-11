"""
Zendit Payment Gateway Service

Zendit API Integration for invoice creation and payment processing.
Documentation: https://docs.zendit.id/

Configure these in settings.py or environment variables:
- ZENDIT_API_KEY: Your Zendit API key
- ZENDIT_CALLBACK_URL: Webhook URL for payment notifications
"""

import os
import httpx
import hashlib
import hmac
from django.conf import settings
from django.utils import timezone


# Zendit API Configuration
ZENDIT_API_KEY = os.environ.get('ZENDIT_API_KEY', 'your-test-api-key')
ZENDIT_API_URL = os.environ.get('ZENDIT_API_URL', 'https://api.zendit.id/v1')
ZENDIT_CALLBACK_URL = os.environ.get('ZENDIT_CALLBACK_URL', 'http://localhost:8000/api/payments/webhook/')
ZENDIT_SECRET_KEY = os.environ.get('ZENDIT_SECRET_KEY', 'your-secret-key')


class ZenditError(Exception):
    """Exception for Zendit API errors."""
    pass


class ZenditService:
    """Service for interacting with Zendit payment gateway."""
    
    def __init__(self):
        self.api_key = ZENDIT_API_KEY
        self.api_url = ZENDIT_API_URL
        self.callback_url = ZENDIT_CALLBACK_URL
    
    def _get_headers(self):
        """Get authentication headers for Zendit API."""
        return {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    
    def create_invoice(self, order):
        """
        Create a payment invoice for an order.
        
        Args:
            order: Order model instance
            
        Returns:
            dict: Invoice data including payment URL
        """
        payload = {
            'external_id': str(order.id),
            'amount': int(order.final_amount),
            'description': f'Qurban - {order.product.name}',
            'customer': {
                'name': order.user.get_full_name() or order.user.email,
                'email': order.user.email,
                'phone': order.user.phone or '',
            },
            'items': [
                {
                    'name': order.product.name,
                    'quantity': order.quantity,
                    'price': int(order.unit_price),
                }
            ],
            'callback_url': self.callback_url,
            'success_redirect_url': f'{settings.FRONTEND_URL}/dashboard/payment?status=success&order={order.order_number}',
            'failure_redirect_url': f'{settings.FRONTEND_URL}/dashboard/payment?status=failed&order={order.order_number}',
            'expiry_date': (timezone.now() + timezone.timedelta(hours=24)).isoformat(),
        }
        
        try:
            with httpx.Client() as client:
                response = client.post(
                    f'{self.api_url}/invoices',
                    json=payload,
                    headers=self._get_headers(),
                    timeout=30.0
                )
                
                if response.status_code == 201 or response.status_code == 200:
                    data = response.json()
                    return {
                        'success': True,
                        'invoice_id': data.get('id') or data.get('invoice_id'),
                        'payment_url': data.get('invoice_url') or data.get('payment_url'),
                        'amount': data.get('amount'),
                        'status': data.get('status'),
                    }
                else:
                    return {
                        'success': False,
                        'error': response.text,
                        'status_code': response.status_code,
                    }
                    
        except httpx.RequestError as e:
            return {
                'success': False,
                'error': f'Network error: {str(e)}',
            }
    
    def check_invoice_status(self, invoice_id):
        """
        Check the status of an invoice.
        
        Args:
            invoice_id: Zendit invoice ID
            
        Returns:
            dict: Invoice status data
        """
        try:
            with httpx.Client() as client:
                response = client.get(
                    f'{self.api_url}/invoices/{invoice_id}',
                    headers=self._get_headers(),
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    data = response.json()
                    return {
                        'success': True,
                        'status': data.get('status'),
                        'paid_at': data.get('paid_at'),
                        'payment_method': data.get('payment_method'),
                    }
                else:
                    return {
                        'success': False,
                        'error': response.text,
                    }
                    
        except httpx.RequestError as e:
            return {
                'success': False,
                'error': f'Network error: {str(e)}',
            }
    
    @staticmethod
    def verify_webhook_signature(payload: bytes, signature: str) -> bool:
        """
        Verify Zendit webhook signature.
        
        Args:
            payload: Raw request body bytes
            signature: Signature from X-Zendit-Signature header
            
        Returns:
            bool: True if signature is valid
        """
        expected = hmac.new(
            ZENDIT_SECRET_KEY.encode(),
            payload,
            hashlib.sha256
        ).hexdigest()
        
        return hmac.compare_digest(expected, signature)


# Singleton instance
zendit_service = ZenditService()
