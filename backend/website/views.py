from rest_framework.views import APIView
from .serializers import LoginSerializer, LogoutUserSerializer, OTPValidationSerializer, UserSerializer, BannerSerializer
from . import models
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from   rest_framework_simplejwt.tokens import  RefreshToken,TokenError
from rest_framework.decorators import  permission_classes
from rest_framework.exceptions import AuthenticationFailed
from django.shortcuts import get_object_or_404, redirect
from .serializers import LoginSerializer,PasswordResetRequestSerializer,SetNewPasswordSerializer,LogoutUserSerializer
from .models import OneTimePassword, User
from rest_framework.permissions import IsAuthenticated
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import smart_str,DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator 
import logging
logger = logging.getLogger(__name__)
from .throttle import OTPUserRateThrottle
from django.contrib.auth import get_user_model


User  = get_user_model()


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
            user_serializer = UserSerializer(user)
            return Response({
                'success': True,
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
                'user': user_serializer.data
            }, status=status.HTTP_200_OK)

        return Response(
            {'detail': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED
        )

                 


class LogoutUserView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self,request):
        serializer = LogoutUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response({"message": "Logout successfully"}, status=status.HTTP_200_OK)


class PasswordResetRequestView(APIView):
    serializer_class = PasswordResetRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response({'message': 'A link has been sent to your email to reset your password .Please  note that the link will expire in 5 minutes.'}, status=status.HTTP_200_OK)
    



class PasswordResetConfirmView(APIView):
    def post(self, request, uidb64, token):
        try:
            user_id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=user_id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'success': False, 'message': 'Token is invalid or has expired'}, status=status.HTTP_401_UNAUTHORIZED)

            return Response({'success': True, 'message': 'Credentials are valid', 'uidb64': uidb64, 'token': token}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({'success': False, 'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'success': False, 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SetNewPassword(APIView):
    serializer_class = SetNewPasswordSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"message": "Password reset successful"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
class  OTPValidationView(APIView):
    throttle_classes = [OTPUserRateThrottle]
    def post(self, request):
        serializer = OTPValidationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.user
            
            
            #Delete OTP afters successful validation
            serializer.otp_obj.delete()
            
            logger.info(f"✅  OTP validated for user ID:{user.id}, email:{user.email}")
            return Response({
                "success":True,
                "message":"OTP validated successfully.",
                "user":{
                "id": user.id,
                "email":user.email,
                }
            }, status=status.HTTP_200_OK)    
            logger.warning(f"❌ OTP validation failed:{serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    