from xmlrpc.client import Boolean
from django.db import models
from django.forms import BooleanField, DateTimeField
import string
import random


# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=50)
    subtitle = models.CharField(max_length=50)
    description = models.TextField()
    github = models.URLField()
