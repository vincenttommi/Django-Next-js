from rest_framework.views import APIView
from .serializers import LoginSerializer, UserSerializer, BannerSerializer
from . import models
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
from   rest_framework_simplejwt.tokens import  RefreshToken,TokenError
import logging
logger = logging.getLogger(__name__)


class BannerView(APIView):
    serializer_class = BannerSerializer
    
    def get(self, request):
        banners = models.Banners.objects.all()
        serializer = self.serializer_class(banners, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class SignUpView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"detail": "Signup successful!"},
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

@method_decorator(csrf_exempt, name='dispatch')
class LoginUserView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(
            request,
            username=serializer.validated_data['email'],
            password=serializer.validated_data['password']
        )
        if user:
            refresh = RefreshToken.for_user(user)
            user_serializer = UserSerializer(user)  # Serialize user data
            response = Response(
                {
                    'success': True,
                    'access_token': str(refresh.access_token),
                    'refresh_token': str(refresh),
                    'user': user_serializer.data  # Add user data
                },
                status=status.HTTP_200_OK
            )
            response.set_cookie(
                key='auth_token',
                value=str(refresh.access_token),
                httponly=True,
                samesite='Lax',
                path='/'
            )
            return response
        return Response(
            {'detail': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED
        )
        
        




class LogoutUserView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self,request):
        refresh_token = request.data.get("refresh")
        if not  refresh_token:
            return Response({"detail":"Refresh token missing"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()  #blacklisting the refresh token
        except TokenError:
            return Response({"detail":"Invalid or expired refresh token"},status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"detail":"Logout successful"}, status=status.HTTP_200_OK)    
            
        