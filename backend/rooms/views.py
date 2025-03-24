from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.pagination import PageNumberPagination
from .serializer import RoomTypeSerializer  
from . import models

class RoomTypeView(APIView):
    serializer_class = RoomTypeSerializer
    
    def get(self, request):
       
        # Prefetch related RoomImage objects using the related_name "room_type_images"
        roomtypes = models.RoomType.objects.all().order_by('id').prefetch_related('room_type_images')
        # Using DRF's default pagination
        paginator = PageNumberPagination()
        try:
            paginated_queryset = paginator.paginate_queryset(roomtypes, request)
        except NotFound:
            # If page number is out of range, return an empty result set
            return Response({
                "count": 0,
                "next": None,
                "previous": None,
                "results": []
            }, status=status.HTTP_200_OK)
        
        serializer = self.serializer_class(paginated_queryset, many=True, context={'request': request})
        return paginator.get_paginated_response(serializer.data)
