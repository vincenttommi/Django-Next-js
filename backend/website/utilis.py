import random
from django.conf import settings
from django.core.mail import EmailMessage, BadHeaderError
from .models import User, OneTimePassword


def generate_otp():
    """Generate a 6-digit OTP (avoiding 0 for simplicity)."""
    return "".join([str(random.randint(1, 9)) for _ in range(6)])


def send_code_to_user(email):
    """
    Generates an OTP, stores it, and sends it via email to the user.
    Returns a dict indicating success or failure.
    """
    subject = "Your One-Time Passcode for Verification"
    otp_code = generate_otp()

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return {"error": "User with this email does not exist."}

    # Save or update OTP in DB
    OneTimePassword.objects.update_or_create(
        user=user,
        defaults={"code": otp_code}
    )

    email_body = (
        f"Hi {user.first_name or 'there'},\n\n"
        f"We received a request to verify your identity.\n"
        f"Please use the following One-Time Passcode (OTP): {otp_code}\n\n"
        f"If you didn’t request this, please ignore this email."
    )

    email_message = EmailMessage(
        subject=subject,
        body=email_body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[email],
    )

    try:
        email_message.send(fail_silently=False)
        print(f"✅ OTP email sent to {email}")
        return {"success": "OTP sent successfully", "otp": otp_code}  # Optional return of OTP
    except BadHeaderError as e:
        print(f"❌ Email sending failed: Bad header - {e}")
        return {"error": "Invalid email header"}
    except Exception as e:
        print(f"❌ Email sending failed: {e}")
        return {"error": "Failed to send email"}


def send_normal_email(data):
    """
    Sends a standard email.
    """
    email = EmailMessage(
        subject=data['email_subject'],
        body=data['email_body'],
        from_email=settings.EMAIL_HOST_USER,
        to=[data['to_email']]
    )
    email.send()
