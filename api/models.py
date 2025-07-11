from unicodedata import category
from xmlrpc.client import Boolean
from django.db import models
from django.forms import BooleanField, DateTimeField


class Category(models.Model):
    name = models.CharField(max_length=50)

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=50)
    subtitle = models.CharField(max_length=50)
    description = models.TextField()
    github = models.URLField()
    category = models.ForeignKey(on_delete=models.CASCADE, to=Category)


class ExperiencePost(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=50)
    date = models.CharField(max_length=50)

class FormPost(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    message = models.TextField()
