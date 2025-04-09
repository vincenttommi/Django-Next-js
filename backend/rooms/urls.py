from django.urls import path
from .views import RoomTypeView, RoomTypeDetailView

urlpatterns = [
    path('room-types/', RoomTypeView.as_view(), name='room-type-list'),
    path('room-types/<int:id>/', RoomTypeDetailView.as_view(), name='room-type-detail'),
]