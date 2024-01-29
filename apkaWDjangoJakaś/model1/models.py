from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser

        
class CustomUser(AbstractUser):
    votes_left =  models.IntegerField(default=10)

 
class Song(models.Model):
    author_name = models.CharField(max_length=200)
    song_title = models.CharField(max_length=200)
    genre = models.CharField(max_length=200)
    add_date = models.DateTimeField(default=timezone.now)
    votes = models.IntegerField(default=0)
    
    def __str__(self):
        return self.author_name+" - "+self.song_title
        
        
class Chart(models.Model):
    text = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.timestamp.strftime("%d %B %Y (%A) at %H:%M:%S")