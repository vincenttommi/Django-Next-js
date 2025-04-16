from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.pagination import PageNumberPagination
from .serializer import RoomTypeSerializer
from django.shortcuts import get_object_or_404
from .models import RoomType, RoomImage

import logging

logger = logging.getLogger(__name__)

class RoomTypeView(APIView):
    serializer_class = RoomTypeSerializer

    def get(self, request):
        try:
            # Fetch all room types
            roomtypes = RoomType.objects.all().order_by('id').prefetch_related('room_type_images')
            logger.info(f"Queryset: {roomtypes.query}")  # Log the SQL query for debugging

            if not roomtypes.exists():
                logger.warning("No RoomType objects found in the database.")
                return Response({
                    "count": 0,
                    "next": None,
                    "previous": None,
                    "results": []
                }, status=status.HTTP_200_OK)

            # Pagination
            paginator = PageNumberPagination()
            paginated_queryset = paginator.paginate_queryset(roomtypes, request)

            # Serialize the data
            serializer = self.serializer_class(paginated_queryset, many=True, context={'request': request})
            return paginator.get_paginated_response(serializer.data)

        except Exception as e:
            logger.error(f"Error in RoomTypeView.get: {str(e)}")
            return Response({
                "error": str(e),
                "count": 0,
                "next": None,
                "previous": None,
                "results": []
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class RoomTypeDetailView(APIView):
    def get(self, request, *args, **kwargs):
        room_type_id = kwargs.get("id")  # Expecting an integer ID
        room_type = get_object_or_404(RoomType, id=room_type_id)
        serializer = RoomTypeSerializer(room_type)
        return Response(serializer.data, status=status.HTTP_200_OK)