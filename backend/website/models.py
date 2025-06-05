from datetime import timedelta
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings


# ✅ 1. Define your custom user model
class CustomUser(AbstractUser):
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.username


# ✅ 2. Use settings.AUTH_USER_MODEL as foreign key reference
class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    mobile = models.CharField(null=True, unique=True)

    def __str__(self):
        return self.user.username


class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    review_text = models.TextField()
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    room_booking = models.ForeignKey('rooms.Booking', on_delete=models.SET_NULL, null=True, blank=True)
    event_booking = models.ForeignKey('events.EventBooking', on_delete=models.SET_NULL, null=True, blank=True)
    add_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.user.username} - {self.rating}/5"


class Contact(models.Model):
    full_name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200, null=True)
    mobile = models.CharField(blank=True, null=True)
    message = models.TextField()
    add_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name


class Career(models.Model):
    full_name = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200, null=True)
    mobile = models.CharField(null=True)
    message = models.TextField(null=True)
    updated_cv = models.FileField(upload_to='cv_files/')
    add_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name


class Banners(models.Model):
    title = models.CharField(max_length=200, null=True)
    image = models.ImageField(upload_to='banner_images')

    def __str__(self):
        return self.title


class ControlPanel(models.Model):
    logo = models.ImageField(upload_to='logo_images')


class OneTimePassword(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    code = models.CharField(max_length=6, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def is_expired(self):
        timeout = getattr(settings, 'PASSWORD_RESET_TIMEOUT', 300)  # Default: 5 minutes
        expiration_time = self.created_at + timedelta(seconds=timeout)
        return timezone.now() > expiration_time
