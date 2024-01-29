from django.contrib import admin
from .models import Song,Chart,CustomUser

admin.site.register(Song)
admin.site.register(Chart)
admin.site.register(CustomUser)