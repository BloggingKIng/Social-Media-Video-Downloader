from django.shortcuts import render
from django.core.files import File
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests
import bs4
import os
import re
from .models import Video
from .serializers import VideoSerializer
import random


# This piece of code was taken and modified from https://github.com/z1nc0r3/twitter-video-downloader/blob/main/twitter_downloader.py
##################################################################################################
def download_video(url):
    name = "".join(random.choices('abcdefghijklmnopqrstuvwxyz', k=20))+".mp4"
    response = requests.get(url, stream=True)
    block_size = 1024
    download_path = os.path.join(os.getcwd(),'media','temp', name)

    with open(download_path, "wb") as file:
        for data in response.iter_content(block_size):
            file.write(data)
    print(download_path)

    video_instance = Video()
    with open(download_path, 'rb') as file:
        video_instance.video.save(name, File(file), save=True)
    os.remove(download_path)
    return video_instance

def download_twitter_video(url):
    api_url = f"https://twitsave.com/info?url={url}"
    response = requests.get(api_url)
    data = bs4.BeautifulSoup(response.text, "html.parser")
    download_button = data.find_all("div", class_="origin-top-right")[0]
    quality_buttons = download_button.find_all("a")
    highest_quality_url = quality_buttons[0].get("href") 
    video = download_video(highest_quality_url)
    return video

#################################################################################

@api_view(['POST'])
def twitter_video_download(request):
    # try:
        url = request.data['url']
        video = download_twitter_video(url)
        serializer = VideoSerializer(video)
        return Response({"video":serializer.data}, status=status.HTTP_201_CREATED)
    # except Exception as e:
    #     return Response(status=status.HTTP_400_BAD_REQUEST)
