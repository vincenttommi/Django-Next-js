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
from django.contrib.auth import get_user_model
from django.utils.encoding import smart_str,DjangoUnicodeDecodeError



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
        fields = ['first_name','last_name', 'username', 'password', 'email', 'profile']
        extra_kwargs = {'password': {'write_only': True}}
        
        
    def validate(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
       

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
        self.token = attrs.get('refresh_token')
        return attrs

    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()
        except TokenError:
            raise serializers.ValidationError(self.error_messages['bad_token'])






class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    def validate(self, attrs):
        email = attrs.get('email', '').strip().lower()  # normalize input
        request = self.context.get('request')

        # ✅ Raise error only if user does NOT exist
        if not User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError({"email": "User with this email does not exist."})

        user = User.objects.get(email__iexact=email)

        uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)

        site_domain = get_current_site(request).domain
        relative_link = reverse('password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})
        abslink = f"http://{site_domain}{relative_link}"
        email_body = (
             f"Hi, use the link below to reset your password:\n\n{abslink}\n\n"
            f"This link will expire in 10 minutes."
            )


        data = {
            "email_body": email_body,
            "email_subject": "Reset your password",
            "to_email": user.email
        }

        send_normal_email(data)
        return attrs

class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=100, min_length=6, write_only=True)
    confirm_password = serializers.CharField(max_length=100, min_length=6, write_only=True)
    uidb64 = serializers.CharField()
    token = serializers.CharField()

    def validate(self, attrs):
        password = attrs.get('password')
        confirm_password = attr.get('confirm_password')
        uidb64 = attrs.get('uidb64')
        token = attrs.get('token')
        
        
        
        #checking if  password match
        if password != confirm_password:
            raise serializers.ValidationError("Passwords do  not match")
        
        try:
            
            user_id  = smart_str(urlsafe_base64_decode(uidb64))
            user =  User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise AuthenticationFailed("User not found")


        if not  PasswordResetTokenGenerator().check_token(user,token):
            raise AuthenticationFailed("Reset link is invalid or has expired") 
        
        #attaching user object to attrs for use in save()
        attrs['user'] = user
        return attrs
    
      def save(self, **kwargs):
          user = self.validated_data['user']
          password = self.validated_data['password']
          user.set_password(password)
          user.save()
          return user   