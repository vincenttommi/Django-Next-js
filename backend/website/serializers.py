from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Banners, Profile
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken



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

        # Create the user
        user = User(**validated_data)
        user.set_password(password)
        user.save()

        # Create the profile and link to the user
        Profile.objects.create(user=user, **profile_data)

        return user
    
    
    
    
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255, min_length=6)
    password = serializers.CharField(max_length=68, write_only=True)
    access_token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed('Invalid credentials, try again')

        if not user.check_password(password):
            raise AuthenticationFailed('Invalid credentials, try again')

        # Token generation
        refresh = RefreshToken.for_user(user)
        tokens = {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }

        # Attach token data
        attrs['access_token'] = tokens['access']
        attrs['refresh_token'] = tokens['refresh']

        return attrs

