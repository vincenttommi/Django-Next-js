from rest_framework.views import APIView
from  . import serializers
from . import  models
from rest_framework import status
from rest_framework.response import Response





class BannerView(APIView):
    serializers_class = serializers.BannerSerializer
    def get(self,request):
        banners = models.Banners.objects.all()
        serializer = self.serializers_class(banners, many=True, context={'request':request})
        return Response(serializer.data, status=status.HTTP_200_OK)