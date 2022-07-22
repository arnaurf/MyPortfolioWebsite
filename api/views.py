from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import PostSerializer, CreatePostSerializer
from .models import Post

from rest_framework.views import APIView
from rest_framework.response import Response

class PostView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CreatePostView(APIView):
    serializer_class = CreatePostSerializer

    def post(self, request, format=None):

        #convert user sent data to python data
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            title = serializer.data.get('title')
            subtitle = serializer.data.get('subtitle')
            description = serializer.data.get('description')
            github = serializer.data.get('github')

            mypost = Post(title=title, subtitle=subtitle, description=description, github=github)
            mypost.save()
            return Response(PostSerializer(mypost).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

