from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Booking, Room, RoomType, Gallery, RoomImage

# Registering simple models
admin.site.register(Booking)
admin.site.register(Room)
admin.site.register(Gallery)
admin.site.register(RoomImage)  # Register RoomImage correctly

# Creating an inline for RoomImage
class RoomImageInline(admin.TabularInline):
    model = RoomImage  # Use direct model name
    extra = 1

# Customizing RoomTypeAdmin to include RoomImageInline
class RoomTypeAdmin(admin.ModelAdmin):
    inlines = [RoomImageInline]
    list_display = ['title', 'first_image']
    search_fields = ['title']

    def first_image(self, obj):
        first_image = obj.room_type_images .first()
        if first_image:
            return mark_safe('<img src="%s" width="50" />' % first_image.image.url)
        return ""

    first_image.allow_tags = True  # Correct placement

# Register RoomType with RoomTypeAdmin
admin.site.register(RoomType, RoomTypeAdmin)


