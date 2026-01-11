
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from django.utils.html import strip_tags
from django.core.signing import Signer
from django.urls import reverse
import logging

logger = logging.getLogger(__name__)

class EmailService:
    """
    Service for sending automated emails.
    """
    
    @staticmethod
    def _send_html_email(subject, template_name, context, recipient_list):
        """
        Send HTML email with plain text fallback.
        """
        try:
            html_message = render_to_string(template_name, context)
            plain_message = strip_tags(html_message)
            
            send_mail(
                subject=subject,
                message=plain_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=recipient_list,
                html_message=html_message,
                fail_silently=False,
            )
            logger.info(f"Email '{subject}' sent to {recipient_list}")
            return True
        except Exception as e:
            logger.error(f"Failed to send email '{subject}' to {recipient_list}: {str(e)}")
            return False

    @staticmethod
    def send_admin_alert_new_affiliate(user, affiliate):
        """
        Notify admin about new affiliate application.
        Trigger: Registration
        """
        subject = f"[Qutab] New Affiliate Application: {user.get_full_name()}"
        
        # Generate signed links
        signer = Signer()
        token_approve = signer.sign(f"approve:{affiliate.id}")
        token_reject = signer.sign(f"reject:{affiliate.id}")
        
        # Build FULL URLs (Assuming /api/affiliate/verify/... is the path)
        # Note: 'affiliate-verify' is in 'apps.affiliates.urls', which is included under 'api/affiliate/' in config/urls.py?
        # Typically urls are namespaced or global. 'affiliate-verify' is global name.
        path_approve = reverse('affiliate-verify', args=['approve', affiliate.id, token_approve])
        path_reject = reverse('affiliate-verify', args=['reject', affiliate.id, token_reject])
        
        # Prepend Backend URL (because API is on 8000)
        # We can use FRONTEND_URL but replace port? Or just standard Django request.build_absolute_uri if we had request.
        # Here we don't have request. We'll assume localhost:8000 for dev.
        # Ideally settings.BACKEND_URL exists. I'll default to Hardcoded http://localhost:8000 for verified dev context.
        # User explicitly asked for tools to do this.
        
        backend_url = getattr(settings, 'BACKEND_URL', 'http://localhost:8000')
        
        approve_url = f"{backend_url}{path_approve}"
        reject_url = f"{backend_url}{path_reject}"
        
        context = {
            'user': user,
            'affiliate': affiliate,
            'admin_url': f"{settings.FRONTEND_URL}/admin/affiliates/affiliate/{affiliate.id}/change/",
            'approve_url': approve_url,
            'reject_url': reject_url,
        }
        return EmailService._send_html_email(
            subject, 
            'emails/admin_new_applicant.html',
            context,
            [settings.ADMIN_EMAIL]
        )

    @staticmethod
    def send_affiliate_welcome(user):
        """
        Notify user their application is received (pending).
        Trigger: Registration
        """
        subject = "Aplikasi Affiliator Qutab Diterima - Menunggu Review"
        context = {
            'user': user,
        }
        return EmailService._send_html_email(
            subject, 
            'emails/affiliate_pending.html',
            context,
            [user.email]
        )

    @staticmethod
    def send_affiliate_approved(user, affiliate):
        """
        Notify user they are approved.
        Trigger: Admin Approval
        """
        subject = "Selamat! Anda Resmi Menjadi Affiliator Qutab 🎉"
        context = {
            'user': user,
            'affiliate': affiliate,
            'login_url': f"{settings.FRONTEND_URL}/affiliate/login",
            'dashboard_url': f"{settings.FRONTEND_URL}/affiliate/dashboard"
        }
        return EmailService._send_html_email(
            subject, 
            'emails/affiliate_approved.html',
            context,
            [user.email]
        )

    @staticmethod
    def send_affiliate_rejected(user, reason=None):
        """
        Notify user they are rejected.
        Trigger: Admin Rejection
        """
        subject = "Update status Aplikasi Affiliator Qutab"
        context = {
            'user': user,
            'reason': reason or "Profil belum memenuhi kriteria kami saat ini."
        }
        return EmailService._send_html_email(
            subject, 
            'emails/affiliate_rejected.html',
            context,
            [user.email]
        )
