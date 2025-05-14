from rest_framework.throttling import SimpleRateThrottle
from .models import OneTimePassword


class OTPUserRateThrottle(SimpleRateThrottle):
    scope = 'otp'

    def get_cache_key(self, request, view):
        otp = request.data.get('otp')
        if not otp:
            return None

        try:
            otp_obj = OneTimePassword.objects.get(code=otp)
            ident = str(otp_obj.user.id)  # Use user ID for throttling
        except OneTimePassword.DoesNotExist:
            # Fallback to IP-based rate limiting if OTP is invalid
            ident = self.get_ident(request)

        # Define my own cache key pattern manually
        return f"throttle_{self.scope}_{ident}"
