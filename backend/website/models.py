from django.db import models
from django.contrib.auth.models import User
from rooms.models import Booking
from events.models import EventBooking




class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    review_text = models.TextField()
    rating=models.IntegerField()
    room_booking=models.ForeignKey(Booking, on_delete=models.SET_NULL,null=True)
    event_booking=models.ForeignKey(EventBooking, on_delete=models.SET_NULL, null=True)
    add_time=models.DateTimeField(auto_now_add=True)
    
    
    

class Contact(models.Model):
    full_name = models.CharField(max_length=200)
    email=models.CharField(max_length=200)
    mobile=models.IntegerField()
    message=models.TextField()
    add_time=models.DateTimeField(auto_now_add=True)
    
        
    
    
    

    
     
