from django.urls import path
from  . import views



urlpatterns = [
    path('banners/', views.BannerView.as_view(), name='banner')
]
    