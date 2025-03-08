from  django.db import models


class RoomType(models.Model):
    title  =  models.CharField(max_length=200)
    detail = models.JSONField(null=True)
    
    
    def __str__(self):
        return self.title