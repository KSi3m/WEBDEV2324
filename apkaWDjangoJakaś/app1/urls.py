"""proj4 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from django.views.generic import ListView
from . import views
from .views import SignUpView
from django.views.generic.base import TemplateView

urlpatterns = [
    path('list_of_past_charts/', views.list_of_past_charts ,name='list_of_past_charts'),
    path('voting_page/', views.voting_page ,name='voting_page'),
    path('song_add/', views.song_add ,name='song_add'),
    path('latest_chart/', views.latest_chart ,name='latest_chart'),
    path('', TemplateView.as_view(template_name='welcomePage.html'), name="main"),
    path('signup_page/', SignUpView.as_view(), name= 'signup'),
    path('delete_account/', views.delete_account, name='delete_account')
 
]