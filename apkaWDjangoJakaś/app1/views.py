from django.shortcuts import render,HttpResponse
from django.views.generic.edit import CreateView
from model1.forms import CustomUserCreationForm
from django.urls import reverse_lazy
from django.views import generic
from model1.models import Song,Chart, CustomUser
from model1.forms import VotingForm,SongAddForm,ChartPast
from django.db.models import Q
from django.views.generic import ListView
import sys
from datetime import datetime
import random
import operator
from functools import reduce

class SongAlreadyExists(Exception):
    "Raised when the song already exists xd"
    pass   
    
class NoVotesLeft(Exception):
    "Raised when user has no votes left"
    pass       
    
class UserIsAdmin(Exception):
    "Raised when user is admin"
    pass  

class SignUpView(generic.CreateView):

    form_class = CustomUserCreationForm
    success_url = reverse_lazy("main")
    template_name = "registration/signup.html"

def voting_page(request):
    if request.user.is_authenticated:
        msg=''
        if request.method == 'POST':
            manysongs = Song.objects.all()
            form = VotingForm(manysongs,request.POST)
            if form.is_valid():
                print(form.cleaned_data, file=sys.stderr)
                id_of_upvoted_song = form.cleaned_data['id_of_upvoted_song']
                try:
                    if request.user.votes_left > 0:
                        selected_song = Song.objects.get(id=int(id_of_upvoted_song))
                        selected_song.votes = selected_song.votes+1
                        request.user.votes_left -= 1    
                    else:
                        raise NoVotesLeft
                except NoVotesLeft:
                    msg += "No votes left for today, come again after new chart is deployed!"
                except:
                    msg+="Sorry! error. "
                else:
                    selected_song.save()
                    request.user.save()
                    msg+="Thank you! Upvote for "+str(selected_song)+" saved!  "+str(request.user.votes_left)+" votes left!"
                valid_song_id_list = Song.objects.filter().values_list('id', flat=True)
                random_song_id_list = random.sample(list(valid_song_id_list), min(len(valid_song_id_list), 10))
                manysongs = Song.objects.filter(id__in=random_song_id_list)
                form = VotingForm(manysongs)
            else:
                print(form.errors.as_data())
        else:  

            valid_song_id_list = Song.objects.filter().values_list('id', flat=True)
            random_song_id_list = random.sample(list(valid_song_id_list), min(len(valid_song_id_list), 10))
            manysongs = Song.objects.filter(id__in=random_song_id_list)
            query = request.GET.get("q")
  
            if query != None:
                position_of_hyphen = -1
                position_of_hyphen = query.find('-')
                
                if (position_of_hyphen == -1):   
                    manysongs = Song.objects.filter(
                    Q(author_name__icontains=query) | Q(song_title__icontains=query)
                )
                
                else:
                    first_half = query[:position_of_hyphen:]
                    second_half = query[position_of_hyphen+1::]
                    
                    first_half = first_half.split()
                    second_half = second_half.split()

                    #print(first_half, file=sys.stderr)
                    #print(second_half, file=sys.stderr)

                    manysongs = Song.objects.filter(reduce(operator.or_, (Q(author_name__icontains=x) for x in first_half)))
                    if second_half:
                        filter2 = manysongs.filter(reduce(operator.or_, (Q(song_title__icontains=x) for x in second_half)))
                        if filter2:
                            manysongs = filter2
                        else:
                            print(filter2, file=sys.stderr)
                           
           
   
            form = VotingForm(manysongs)

        return render(request, 'voting_page.html', {'msg': msg, 'form':form})    
    else:
        return render(request, 'error_page.html')


def song_add(request):
    if request.user.is_authenticated:
        msg=''
        form = SongAddForm()
        if request.method == 'POST':
            form = SongAddForm(request.POST)
            if form.is_valid():
                aut=form.cleaned_data['author']
                title=form.cleaned_data['song_title']
                gen=form.cleaned_data['genre']
                try:
                    if Song.objects.filter(Q(song_title=title) & Q(author_name=aut)).exists():
                        raise SongAlreadyExists
                    new_song = Song(
                        author_name = aut,
                        song_title = title,
                        genre = gen,
                    )
                except SongAlreadyExists:
                    msg+="Song already exists and thus your entry has not been added!"           
                except:
                    msg+="Sorry! The song has not been added. "
                    print(form.errors.as_data())
                else:
                    new_song.save()
                    msg+="Thank you! Song has been added to database! "

        else:
            form = SongAddForm()

        return render(request, 'song_add.html', {'form': form,'msg':msg})
    else:
        return render(request, 'error_page.html')



def latest_chart(request):
    msg = ''
    if request.method == 'POST':
        if request.user.is_superuser:
            try:
                manysongs = Song.objects.order_by('-votes', 'song_title')[:20]  
                msg += '<ol>'
                for song in range(len(manysongs)):
                    msg += '<li>'+manysongs[song].author_name + '-' + manysongs[song].song_title + ' - '+str(manysongs[song].votes)+'🗳️</li>' 
                msg += '</ol><br>'
                new_chart = Chart(
                   text = msg,
                   timestamp = datetime.now()
                )
                for x in CustomUser.objects.all():
                    x.votes_left = 10
                    x.save()
                    
                for x in Song.objects.all():
                    x.votes = 0
                    x.save()
            except:
                msg+="Sorry! Erorr "
            else:
                new_chart.save()
                msg+="New Chart deployed "
    else:

        chart = Chart.objects.last()
        msg = "<h2><p>Chart deployed at: "+chart.timestamp.strftime("%d %B %Y (%A) at %H:%M:%S")+'</p></h2>'
        msg += chart.text

    return render(request, 'chart.html', {'msg':msg})

    
def list_of_past_charts(request):
    msg = ''
    if request.method == 'POST':
        try:
            form = ChartPast(request.POST)
            if form.is_valid():
                index=form.cleaned_data['chart']
                chart = Chart.objects.get(id=int(index))
                msg = "<h2><p>Chart deployed at: "+chart.timestamp.strftime("%d %B %Y (%A) at %H:%M:%S")+'</p></h2>'
                msg += chart.text
            else:
                print(form.errors.as_data())
        except:
            msg += "Sorry error"
        
        return render(request, 'chart.html', {'msg':msg})
        
    else:
        try:
            form = ChartPast()
        except:
            print(form.errors.as_data())
       
    return render(request, 'list_of_past_charts.html', {'msg':msg,'form':form})
    

def handler404(request, exception):
    return render(request, '404.html')


def handler500(request, exception):
    return render(request, '500.html')
    
from django.contrib.auth import logout
def delete_account(request):
    msg = ''
    if request.method == 'POST':
        try:
            if 'Delete Account' in request.POST:
                if request.user.is_superuser:
                    raise UserIsAdmin
                else:
                    user = request.user
                    user.delete()
                   
                    msg += "User "+str(user)+" deleted"
        except UserIsAdmin:
            msg += "User not deleted, because he's admin" 
        except:
            msg += "User not deleted"
        logout(request)
    return render(request, 'delete_account.html', {'msg':msg})
        
