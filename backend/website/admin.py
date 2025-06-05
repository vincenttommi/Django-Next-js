from django.contrib import admin
from .import  models
from django.contrib.auth.admin import UserAdmin
from . models import CustomUser




admin.site.register(models.Review)
admin.site.register(models.Contact)
admin.site.register(models.Profile)
admin.site.register(models.Banners)
admin.site.register(models.ControlPanel)
admin.site.register(CustomUser,UserAdmin)






