from rest_framework.views import APIView
from .serializers import LoginSerializer, LogoutUserSerializer, UserSerializer, BannerSerializer
from . import models
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from   rest_framework_simplejwt.tokens import  RefreshToken,TokenError
from rest_framework.decorators import  permission_classes
from rest_framework.exceptions import AuthenticationFailed
from django.shortcuts import get_object_or_404, redirect
from .serializers import LoginSerializer,PasswordResetRequestSerializer,SetNewPasswordSerializer,LogoutUserSerializer
from .utilis import send_code_to_user
from .models import OneTimePassword, User
from rest_framework.permissions import IsAuthenticated
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import smart_str,DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator 






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

    




class VerifyuserEmail(APIView):
    def post(self, request):
        otp_code = request.data.get('otp')
        if not otp_code:
            return Response({"message": "Passcode not provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_code_obj = OneTimePassword.objects.get(code=otp_code)
            user = user_code_obj.user
            if not user.is_verified:
                user.is_verified = True
                user.save()
                return Response({"message": "Account verified successfully"}, status=status.HTTP_200_OK)
            return Response({"message": "User already verified"}, status=status.HTTP_200_OK)
        except OneTimePassword.DoesNotExist:
            return Response({"message": "Invalid passcode"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # Log the exception to see what's causing the 500 error
            print(f"Error during verification: {e}")
            return Response({"message": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)






class PasswordResetRequestView(APIView):
    serializer_class = PasswordResetRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response({'message': 'A link has been sent to your email to reset your password.'}, status=status.HTTP_200_OK)
    



class PasswordResetConfirmView(APIView):
    def post(self, request, uidb64, token):
        try:
            # Decode the uidb64 to get user ID
            user_id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=user_id)

            # Check if the token is valid
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'success': False, 'message': 'Token is invalid or has expired'}, status=status.HTTP_401_UNAUTHORIZED)

            # If everything is valid
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
            serializer.save()  # Ensure the save method is defined in your serializer
            return Response({"message": "Password reset successful"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    