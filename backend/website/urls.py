from django.urls import path
from  . import views



urlpatterns = [
    path('banners/', views.BannerView.as_view(), name='banner'),
    path('signup/', views.SignupView.as_view(), name='signup'),
    path('login/', views.LoginUserView.as_view(), name='login'),
    path('logout/', views.LogoutUserView.as_view(),  name='logout'),
    path('password-reset-request/', views.PasswordResetRequestView.as_view(), name='request') ,
    path('verify/', views.VerifyuserEmail.as_view(), name='verify'),
    path('password-reset-confrim/<uidb64>/<token>/', views.PasswordResetConfirm.as_view(), name='password-reset-confirm'),
    path('set-new-password/', views.SetNewPassword.as_view(), name='set-new-password'),
    
]
    