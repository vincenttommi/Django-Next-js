from django.urls import path
from  . import views



urlpatterns = [
    path('banners/', views.BannerView.as_view(), name='banner'),
    path('signup/', views.SignUpView.as_view(), name='signup'),
    path('login/', views.LoginUserView.as_view(), name='login'),
    path('logout/', views.LogoutUserView.as_view(),  name='logout'),
    path('verify-user-email', views.VerifyuserEmail.as_view(), name='VerifyuserEmail'),
    path('password-reset-request', views.PasswordResetRequestView.as_view(), name='PasswordResetRequestView'),
    path('password-reset-confirm', views.PasswordResetConfirmView.as_view(),name='PasswordResetConfirmView'),
    path('set-newPassword-View', views.SetNewPasswordView.as_view(),name='SetNewPasswordView')
    
    
]
    