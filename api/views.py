from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import PostSerializer, CreatePostSerializer, ExperiencePostSerializer, CreateExperiencePostSerializer, CategorySerializer, CreateCategorySerializer, CreateFormSerializer
from .models import Post, ExperiencePost, Category, FormPost
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail

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
            category = serializer.data.get('category')
            mypost = Post(title=title, subtitle=subtitle, description=description, github=github, category=category)
            mypost.save()
            return Response(PostSerializer(mypost).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class ExperiencePostView(generics.ListAPIView):
    queryset = ExperiencePost.objects.all()
    serializer_class = ExperiencePostSerializer


class CreateExperiencePostView(APIView):
    serializer_class = CreateExperiencePostSerializer

    def post(self, request, format=None):

        #convert user sent data to python data
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            title = serializer.data.get('title')
            description = serializer.data.get('description')
            date = serializer.data.get('date')
            mypost = ExperiencePost(title=title, description=description, date=date)
            mypost.save()
            return Response(ExperiencePostSerializer(mypost).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class CategoryView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CreateCategoryView(APIView):
    serializer_class = CreateCategorySerializer

    def post(self, request, format=None):

        #convert user sent data to python data
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            mypost = Category(name=name)
            mypost.save()
            return Response(CategorySerializer(mypost).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

#@csrf_exempt
class CreateFormView(APIView):
    serializer_class = CreateFormSerializer

    def post(self, request, format=None):

        #convert user sent data to python data
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()

            subject = 'Nuevo mensaje de contacto desde tu portfolio'
            message = f"Has recibido un nuevo mensaje:\n\nNombre: {serializer.validated_data['name']}\nCorreo: {serializer.validated_data['email']}\nMensaje:\n{serializer.validated_data['message']}"
            from_email = 'tu_correo@tudominio.com'  # Correo configurado en settings.py
            recipient_list = ['arnauruiz1998@gmail.com'] # Tu correo para recibir el mensaje

            send_mail(
                subject,
                message,
                from_email,
                recipient_list,
                fail_silently=False,
            )

            return Response(status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)