from django.urls import path
from  . import views



urlpatterns = [
    path('banners/', views.BannerView.as_view(), name='banner'),
    path('signup/', views.SignUpView.as_view(), name='signup'),
    path('login/', views.LoginUserView.as_view(), name='login'),
    path('logout/', views.LogoutUserView.as_view(),  name='logout'),
    path('password-reset-request/', views.PasswordResetRequestView.as_view(), name='PasswordResetRequestView'),
    path('verify-user-email/', views.VerifyuserEmail.as_view(), name='VerifyuserEmail'),
    path('password-reset-confirm/<uidb64>/<token>/',views.PasswordResetConfirmView.as_view(),name='password-reset-confirm'),
    path('set-newPassword-View/', views.SetNewPassword.as_view(),name='SetNewPasswordView')
    
    
]
    