from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.pagination import PageNumberPagination
from .serializer import RoomTypeSerializer
from django.shortcuts import get_object_or_404
from .models import RoomType, RoomImage

class RoomTypeView(APIView):
    serializer_class = RoomTypeSerializer
    
    def get(self, request):
        roomtypes = RoomType.objects.all().order_by('id').prefetch_related('room_type_images')
        paginator = PageNumberPagination()
        try:
            paginated_queryset = paginator.paginate_queryset(roomtypes, request)
        except NotFound:
            return Response({
                "count": 0,
                "next": None,
                "previous": None,
                "results": []
            }, status=status.HTTP_200_OK)
        
        serializer = self.serializer_class(paginated_queryset, many=True, context={'request': request})
        return paginator.get_paginated_response(serializer.data)

class RoomTypeDetailView(APIView):
    def get(self, request, *args, **kwargs):
        room_type_id = kwargs.get("id")  # Expecting an integer ID
        room_type = get_object_or_404(RoomType, id=room_type_id)
        serializer = RoomTypeSerializer(room_type)
        return Response(serializer.data, status=status.HTTP_200_OK)