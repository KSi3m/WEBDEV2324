from django import forms
from .models import Song,Chart,CustomUser
import sys
from django.contrib.auth.forms import UserCreationForm

MUSIC_GENRES= [
    ('pop', 'POP'),
    ('rock', 'ROCK'),
    ('blues', 'BLUES'),
    ('disco', 'DISCO'),
    ('techno', 'TECHNO'),
    ('rap', 'RAP'),
    ('hip-hop', 'HIP-HOP'),
    ('rnb', 'RNB'),
    ('metal', 'METAL'),
    ('soul', 'SOUL'),
    ]    
    
class SongAddForm(forms.Form):
    author = forms.CharField()
    song_title = forms.CharField()
    genre= forms.CharField(widget=forms.Select(choices=MUSIC_GENRES))
    
    author.widget.attrs.update({'class': 'author_class'})
    song_title.widget.attrs.update({'class': 'song_title_class'})
    genre.widget.attrs.update({'class': 'genre_class'})
    
    
class VotingForm(forms.Form):

    def __init__(self, scope, *args, **kwargs):
        super(VotingForm, self).__init__(*args, **kwargs)
        self.CHOICES = ((x.id,x) for x in scope)
        self.fields['id_of_upvoted_song'] = forms.TypedChoiceField(choices=self.CHOICES, widget=forms.RadioSelect, label="")
    id_of_upvoted_song = forms.TypedChoiceField()
    
class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        
class ChartPast(forms.Form):
    CHOICES = ((x.id,x) for x in Chart.objects.all())
    chart = forms.TypedChoiceField(choices=CHOICES,widget=forms.RadioSelect, label="")
  