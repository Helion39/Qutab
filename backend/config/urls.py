from django.contrib import admin
from django.urls import path, include
from apps.affiliates.views import ReferralLinkRedirectView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Admin (Obfuscated)
    path('manage-qutab-secure/', admin.site.urls),
    path('api/', include('apps.users.urls')),
    path('api/products/', include('apps.products.urls')),
    path('api/orders/', include('apps.orders.urls')),
    path('api/payments/', include('apps.payments.urls')),
    path('api/affiliate/', include('apps.affiliates.urls')),
    path('api/commissions/', include('apps.commissions.urls')),
    path('api/core/', include('apps.core.urls')),
    
    # Referral redirect (short URL: /r/{code}/)
    path('r/<str:code>/', ReferralLinkRedirectView.as_view(), name='referral-redirect'),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
