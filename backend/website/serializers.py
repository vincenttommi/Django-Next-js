from rest_framework import serializers
from .models import Banners

class BannerSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Banners
        fields = '__all__'

    def get_image(self, obj):
        request = self.context.get('request')
        # Build the absolute URI for the image file
        return request.build_absolute_uri(obj.image.url) if request else obj.image.url
