from rest_framework import serializers
from . import models


class RoomImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RoomImage
        fields  = ['id']

class RoomTypeSerializer(serializers.ModelSerializer):
    
    room_type_images  = RoomImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = models.RoomType
        fields = ['id','title','detail', 'room_type_images']
        
    
    