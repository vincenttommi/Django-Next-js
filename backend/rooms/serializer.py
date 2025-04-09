from rest_framework import serializers
from .models import RoomType, RoomImage

class RoomImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomImage
        fields = ['image']

class RoomTypeSerializer(serializers.ModelSerializer):
    room_type_images = RoomImageSerializer(many=True, read_only=True)

    class Meta:
        model = RoomType
        fields = ['id', 'title', 'detail', 'room_type_images']  # Include id instead of slug