from django.urls import path
from . import views
urlpatterns = [
    path('download/twitter-video/', views.twitter_video_download),
    path('download/facebook-video/', views.facebook_video_download),
]