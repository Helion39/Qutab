"""
Management command to create/update admin user from environment variables.
This ensures admin credentials are never hardcoded in the source code.
"""
import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = 'Create or update admin superuser from environment variables'

    def handle(self, *args, **options):
        email = os.environ.get('ADMIN_EMAIL')
        password = os.environ.get('ADMIN_PASSWORD')

        if not all([email, password]):
            self.stderr.write(self.style.ERROR(
                'Missing environment variables. Set ADMIN_EMAIL and ADMIN_PASSWORD in .env'
            ))
            return

        # Try to find existing admin by email or any superuser
        try:
            admin = User.objects.filter(email=email).first()
            if admin:
                # Update existing admin
                admin.set_password(password)
                admin.is_superuser = True
                admin.is_staff = True
                admin.is_active = True
                admin.role = 'admin'
                admin.save()
                self.stdout.write(self.style.SUCCESS(
                    f'✓ Updated existing admin: {email}'
                ))
            else:
                # Create new admin
                admin = User.objects.create_superuser(
                    email=email,
                    password=password
                )
                self.stdout.write(self.style.SUCCESS(
                    f'✓ Created new admin: {email}'
                ))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f'Error: {e}'))
            return

        self.stdout.write(self.style.WARNING(
            '\n⚠️  Admin credentials loaded from environment variables.'
        ))
        self.stdout.write(f'   Login ID: {email}')
        self.stdout.write('   Password: ********** (from ADMIN_PASSWORD env var)')
        self.stdout.write('\n   Use these credentials at /admin/login')
