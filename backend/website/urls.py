from django.urls import path
from  . import views



urlpatterns = [
    path('banners/', views.BannerView.as_view(), name='banner'),
    path('signup/', views.SignUpView.as_view(), name='signup'),
    path('login/', views.LoginUserView.as_view(), name='login')
]
    