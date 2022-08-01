from rest_framework import serializers
from .models import ExperiencePost, Post, Category, FormPost

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'subtitle', 'description', 'github', 'category')

class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('title', 'subtitle', 'description', 'github', 'category')

        
class ExperiencePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperiencePost
        fields = ('id', 'title', 'description', 'date')

class CreateExperiencePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperiencePost
        fields = ('title', 'description', 'date')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')

class CreateCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name')
        
class CreateFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormPost
        fields = ('name', 'email', 'message')