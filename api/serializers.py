from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'subtitle', 'description', 'github')

class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('title', 'subtitle', 'description', 'github')
