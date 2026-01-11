from django.urls import path
from .views import CreatePaymentView, PaymentWebhookView, PaymentStatusView

urlpatterns = [
    path('create/<uuid:order_id>/', CreatePaymentView.as_view(), name='payment-create'),
    path('webhook/', PaymentWebhookView.as_view(), name='payment-webhook'),
    path('status/<uuid:order_id>/', PaymentStatusView.as_view(), name='payment-status'),
]
