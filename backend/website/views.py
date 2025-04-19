from rest_framework.views import APIView
from  . serializers import UserSerializer,BannerSerializer
from . import  models
from rest_framework import status
from rest_framework.response import Response





class BannerView(APIView):
    serializers_class = BannerSerializer
    def get(self,request):
        banners = models.Banners.objects.all()
        serializer = self.serializers_class(banners, many=True, context={'request':request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    





class SignUpView(APIView):
    def post(self,request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        print("❌ Serializer errors:", serializer.errors)   
        print("📦 Incoming data:", request.data)           
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
