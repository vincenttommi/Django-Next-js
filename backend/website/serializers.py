from rest_framework import serializers
from .models import Banners, Profile
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken,TokenError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode 
from .utilis import send_normal_email
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import smart_str, smart_bytes, force_str
from django.urls import reverse
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from .models import OneTimePassword
from .utilis import send_code_to_user





User = get_user_model()

class BannerSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Banners
        fields = '__all__'

    def get_image(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.image.url) if request else obj.image.url

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['mobile']

    def validate_mobile(self, value):
        if value and not value.replace('+', '').replace('-', '').isdigit():
            raise serializers.ValidationError("Mobile number must contain only digits, '+' or '-'.")
        return value

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'password', 'email', 'profile']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        Profile.objects.create(user=user, **profile_data)
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255, min_length=6)
    password = serializers.CharField(max_length=68, write_only=True)
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        if not email or not password:
            raise serializers.ValidationError("Email and password are required.")
        return attrs
    
    

class LogoutUserSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()
    default_error_messages = {
        'bad_token': ('Token is invalid or has expired')
    }

    def validate(self, attrs):
        
        self.token = attrs.get('refresh_token')  # Fixed typo
        return attrs

    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()
        except TokenError as e:
            raise serializers.ValidationError(self.error_messages['bad_token'])





class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    def validate(self, attrs):
        email = attrs.get('email')

        if not User.objects.filter(email=email).exists():
            raise serializers.ValidationError("User with this email does not exist.")

        user = User.objects.get(email=email)
        uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)

        # 🔗 Use your utility to send the OTP
        otp_result = send_code_to_user(email)
        if "error" in otp_result:
            raise serializers.ValidationError(otp_result["error"])

        # Get absolute reset link
        request = self.context.get('request')
        site_domain = get_current_site(request).domain
        relative_link = reverse('password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})
        abslink = f"http://{site_domain}{relative_link}"

        # Optional: Include the reset link in the OTP email body (already done in utils if desired)

        # Attach for use in response
        self.user = user
        self.uidb64 = uidb64
        self.token = token
        self.otp_code = otp_result.get("otp")  # Optional, for debug or API response

        return attrs

    def create(self, validated_data):
        return {
            "message": "OTP and reset link sent to your email.",
            "uidb64": self.uidb64,
            "token": self.token,
            "otp": self.otp_code  # Optional
        }
    
    
    


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=100, min_length=6, write_only=True)
    confirm_password = serializers.CharField(max_length=100, min_length=6, write_only=True)
    uidb64 = serializers.CharField(write_only=True)
    token = serializers.CharField(write_only=True)

    def validate(self, attrs):
        token = attrs.get('token')
        uidb64 = attrs.get('uidb64')
        password = attrs.get('password')
        confirm_password = attrs.get('confirm_password')

        # Check if the passwords match
        if password != confirm_password:
            raise serializers.ValidationError("Passwords do not match.")

        # Decode the uidb64
        user_id = force_str(urlsafe_base64_decode(uidb64))
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise AuthenticationFailed("User not found.")

        # Validate the token
        if not PasswordResetTokenGenerator().check_token(user, token):
            raise AuthenticationFailed('Reset link is invalid or expired.')

        # If everything is fine, return the user object
        attrs['user'] = user
        return attrs

    def create(self, validated_data):
        user = validated_data['user']
        user.set_password(validated_data['password'])
        user.save()
        return user    
    
   


   
    

class  OTPValidationSerializer(serializers.Serializer):
    otp = serializers.CharField(max_length=6)
    
    def validate(self, attrs):
        otp = attrs.get('otp')
        try:
            otp_record = OneTimePassword.objects.get(code=otp)
            
        except OneTimePassword.DoesNotExist:
            raise serializers.ValidationError("Invalid OTP")   
        
        if otp_record.is_expired:
            raise serializers.ValidationError("OTP has expired") 
        
        self.user  =  otp_record.user
        return attrs 
    
    def create(self, validated_data):
        #clear OTP afeter use
        OneTimePassword.objects.filter(code=validated_data['otp']).delete()
        return {"message":"OTP is valid","user_id":"self.user.id"}
    
    
    
    
        
