from django.urls import path
from . import views 


urlpatterns = [
   path('roomtypes/', views.RoomTypeView.as_view(), name='roomtypes'),
]