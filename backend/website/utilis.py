import random
from django.conf import settings
from django.core.mail import EmailMessage, BadHeaderError
from django.utils import timezone
from . models import OneTimePassword
from django.contrib.auth import get_user_model



User = get_user_model()


def generate_otp():
    """Generate a secure 6-digit OTP."""
    return "".join([str(random.randint(0, 9)) for _ in range(6)])


def send_code_to_user(email):
    """
    Generates a new OTP, stores it (resetting created_at), and sends it via email.
    Returns a dict with success or error message.
    """
    subject = "Your One-Time Passcode for Verification"
    otp_code = generate_otp()

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return {"error": "User with this email does not exist."}

    # Remove existing OTP (if any) to ensure freshness
    OneTimePassword.objects.filter(user=user).delete()

    # Create fresh OTP
    otp = OneTimePassword.objects.create(
        user=user,
        code=otp_code,
        created_at=timezone.now()  # optional if auto_now_add=True
    )

    email_body = (
        f"Hi {user.first_name or 'there'},\n\n"
        f"We received a request to verify your identity.\n"
        f"Your One-Time Passcode (OTP) is: {otp_code}\n\n"
        f"This OTP is valid for {getattr(settings, 'PASSWORD_RESET_TIMEOUT', 300) // 60} minutes.\n"
        f"If you didn’t request this, please ignore this email."
    )

    try:
        email_message = EmailMessage(
            subject=subject,
            body=email_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[email],
        )
        email_message.send(fail_silently=False)
        print(f"✅ OTP email sent to {email}")
        return {"success": "OTP sent successfully", "otp": otp_code}

    except BadHeaderError as e:
        print(f"❌ Email failed: Bad header - {e}")
        return {"error": "Invalid email header"}

    except Exception as e:
        print(f"❌ Email sending failed: {e}")
        return {"error": "Failed to send email"}


def send_normal_email(data):
    """
    Sends a standard email.
    Example input:
    {
        'email_subject': 'Welcome!',
        'email_body': 'Thank you for signing up.',
        'to_email': 'user@example.com'
    }
    """
    try:
        email = EmailMessage(
            subject=data['email_subject'],
            body=data['email_body'],
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[data['to_email']]
        )
        email.send()
        print(f"✅ Normal email sent to {data['to_email']}")
        return {"success": "Email sent successfully"}
    except Exception as e:
        print(f"❌ Failed to send normal email: {e}")
        return {"error": "Failed to send email"}
