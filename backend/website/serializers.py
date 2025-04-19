from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Banners,Profile

class BannerSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Banners
        fields = '__all__'

    def get_image(self, obj):
        request = self.context.get('request')
        # Build the absolute URI for the image file
        return request.build_absolute_uri(obj.image.url) if request else obj.image.url


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['mobile']
        
        
        

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
        