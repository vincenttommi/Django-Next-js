from datetime import timedelta, timezone
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from rooms.models import Booking
from events.models import EventBooking
from django.core.validators import MinValueValidator, MaxValueValidator


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    review_text = models.TextField()
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    room_booking = models.ForeignKey(Booking, on_delete=models.SET_NULL, null=True, blank=True)
    event_booking = models.ForeignKey(EventBooking, on_delete=models.SET_NULL, null=True, blank=True)
    add_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.user.username} - {self.rating}/5"


class Contact(models.Model):
    full_name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200,null=True)
    mobile = models.CharField(blank=True, null=True)  # Supports international format
    message = models.TextField()
    add_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    mobile = models.CharField(null=True, unique=True)  # Better than IntegerField

    def __str__(self):
        return self.user.username



class Career(models.Model):
    full_name  = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200, null=True)
    mobile=models.CharField(null=True)
    message = models.TextField(null=True)
    updated_cv = models.FileField(upload_to='cv_files/')
    add_time = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return  self.full_name 
    
    



class Banners(models.Model):
    title = models.CharField(max_length=200, null=True)
    image=models.ImageField(upload_to='banner_images')
    
    
    def __str__(self):
        return self.title
    
    
    
    
class ControlPanel(models.Model):
    logo = models.ImageField(upload_to='logo_images')
        




class OneTimePassword(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    code = models.CharField(max_length=6,unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    
    @property
    def is_expired(self):
        return timezone.now() > self.created_at + timedelta(minutes=5)