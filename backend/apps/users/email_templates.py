"""
Email Templates for Qutab
"""

# Logo URL - Use production URL for emails
QUTAB_LOGO_URL = "https://shop.qurbantanpabatas.id/Logo_Qutab.png"


def get_otp_email_html(otp_code):
    return f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@700;900&display=swap');
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Public Sans', Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td style="padding: 40px 20px; text-align: center;">
                
                <!-- Main Card -->
                <div style="max-width: 500px; margin: 0 auto; background-color: #fffbef; border: 4px solid #000000; box-shadow: 8px 8px 0px 0px #000000; overflow: hidden;">
                    
                    <!-- Header with Logo -->
                    <div style="background-color: #000000; padding: 25px; text-align: center;">
                        <img src="{QUTAB_LOGO_URL}" alt="Qutab" style="height: 50px; width: auto;" />
                    </div>

                    <!-- Content -->
                    <div style="padding: 40px 30px;">
                        
                        <!-- Illustration/Icon Area -->
                        <div style="margin-bottom: 25px;">
                            <span style="display: inline-block; background-color: #ffafcc; border: 3px solid #000000; padding: 8px 15px; font-weight: 900; text-transform: uppercase; transform: rotate(-2deg); box-shadow: 4px 4px 0px 0px #000000;">
                                Verifikasi Email
                            </span>
                        </div>

                        <h2 style="color: #000000; margin: 0 0 15px; font-size: 24px; font-weight: 800;">Halo Calon Affiliator!</h2>
                        
                        <p style="color: #000000; font-size: 16px; line-height: 1.6; margin-bottom: 25px; font-weight: 600;">
                            Terima kasih telah mendaftar. Untuk melanjutkan proses pendaftaran Anda, silakan gunakan kode verifikasi di bawah ini:
                        </p>

                        <!-- OTP Box -->
                        <div style="background-color: #ffffff; border: 4px solid #000000; padding: 20px; margin-bottom: 25px; text-align: center;">
                            <span style="display: block; font-size: 14px; font-weight: 700; text-transform: uppercase; margin-bottom: 5px; color: #666;">Kode OTP Anda</span>
                            <span style="display: block; font-size: 36px; font-weight: 900; letter-spacing: 5px; color: #000000;">{otp_code}</span>
                        </div>

                        <p style="color: #000000; font-size: 14px; font-weight: 600; margin-bottom: 0;">
                            Kode ini akan kadaluarsa dalam <span style="background-color: #bddcee; padding: 2px 6px; border: 1px solid #000000;">10 menit.</span>
                        </p>
                        
                        <p style="color: #666666; font-size: 12px; margin-top: 30px;">
                            Jika Anda tidak merasa melakukan pendaftaran ini, abaikan email ini.
                        </p>
                    </div>
                </div>

                <!-- Footer -->
                <div style="margin-top: 30px; text-align: center;">
                    <p style="color: #666666; font-size: 12px; font-weight: 600;">
                        &copy; 2026 Qutab. All rights reserved.
                    </p>
                </div>

            </td>
        </tr>
    </table>
</body>
</html>
"""


def get_password_reset_email_html(user_name, reset_url):
    return f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@700;900&display=swap');
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Public Sans', Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td style="padding: 40px 20px; text-align: center;">
                
                <!-- Main Card -->
                <div style="max-width: 500px; margin: 0 auto; background-color: #fffbef; border: 4px solid #000000; box-shadow: 8px 8px 0px 0px #000000; overflow: hidden;">
                    
                    <!-- Header with Logo -->
                    <div style="background-color: #000000; padding: 25px; text-align: center;">
                        <img src="{QUTAB_LOGO_URL}" alt="Qutab" style="height: 50px; width: auto;" />
                    </div>

                    <!-- Content -->
                    <div style="padding: 40px 30px;">
                        
                        <!-- Illustration/Icon Area -->
                        <div style="margin-bottom: 25px;">
                            <span style="display: inline-block; background-color: #bddcee; border: 3px solid #000000; padding: 8px 15px; font-weight: 900; text-transform: uppercase; transform: rotate(-2deg); box-shadow: 4px 4px 0px 0px #000000;">
                                Reset Password
                            </span>
                        </div>

                        <h2 style="color: #000000; margin: 0 0 15px; font-size: 24px; font-weight: 800;">Halo {user_name}!</h2>
                        
                        <p style="color: #000000; font-size: 16px; line-height: 1.6; margin-bottom: 25px; font-weight: 600;">
                            Kami menerima permintaan untuk reset password akun Anda. Klik tombol di bawah untuk membuat password baru:
                        </p>

                        <!-- Reset Button -->
                        <div style="margin-bottom: 25px;">
                            <a href="{reset_url}" 
                               style="display: inline-block; background-color: #ffafcc; color: #000000; padding: 15px 35px; font-size: 16px; font-weight: 900; text-transform: uppercase; text-decoration: none; border: 4px solid #000000; box-shadow: 6px 6px 0px 0px #000000;">
                                Reset Password
                            </a>
                        </div>

                        <p style="color: #666666; font-size: 12px; margin-bottom: 15px;">
                            Atau copy link berikut ke browser Anda:
                        </p>
                        <p style="color: #000000; font-size: 11px; word-break: break-all; background-color: #f0f0f0; padding: 10px; border: 1px solid #ddd;">
                            {reset_url}
                        </p>

                        <p style="color: #000000; font-size: 14px; font-weight: 600; margin-top: 25px;">
                            Link ini akan kadaluarsa dalam <span style="background-color: #bddcee; padding: 2px 6px; border: 1px solid #000000;">1 jam.</span>
                        </p>
                        
                        <p style="color: #666666; font-size: 12px; margin-top: 30px;">
                            Jika Anda tidak meminta reset password, abaikan email ini. Password Anda akan tetap aman.
                        </p>
                    </div>
                </div>

                <!-- Footer -->
                <div style="margin-top: 30px; text-align: center;">
                    <p style="color: #666666; font-size: 12px; font-weight: 600;">
                        &copy; 2026 Qutab. All rights reserved.
                    </p>
                </div>

            </td>
        </tr>
    </table>
</body>
</html>
"""
