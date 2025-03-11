from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.utils.timezone import now




class EventType(models.Model):
   title = models.CharField(max_length=200)
   detail = models.TextField()
  
   def __str__(self):
       return self.title




class EventBooking(models.Model):
   event_type = models.ForeignKey(EventType, on_delete=models.CASCADE)
   user = models.ForeignKey(User, on_delete=models.CASCADE)
   event_detail = models.TextField()
   booking_date = models.DateTimeField(auto_now_add=True)
   total_quest = models.PositiveIntegerField()  # Ensure only positive integers
   event_date = models.DateField()
   booking_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Allow blank amounts
   booking_detail=models.JSONField(null=True, blank=True)


   # Ensure 'event_date' can't be in the past
   def clean(self):
       booking_date = self.booking_date.date() if self.booking_date else now().date()


       if self.event_date and self.event_date < booking_date:
           raise ValidationError("Event date cannot be in the past.")


   def __str__(self):
       return f'{self.event_type} - {self.event_date} - {self.user}'


   class Meta:
       indexes = [
           models.Index(fields=['event_date']),
           models.Index(fields=['user']),
       ]



class Payment(models.Model):
    booking=models.ForeignKey(EventBooking, on_delete=models.CASCADE)
    transaction_id  =  models.TextField() 
    total_amount=models.DecimalField(max_digits=10, decimal_places=2)
    response_data = models.TextField() 
    payment_date = models.DateTimeField(auto_now_add=True)   