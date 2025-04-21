from rest_framework.views import APIView
from  . serializers import LoginSerializer, UserSerializer,BannerSerializer
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
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Signup successful!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        



class LoginUserView(APIView):
    def post(self, request):
        print("Received data:", request.data)
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        print("Errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)