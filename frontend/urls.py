from django.contrib import admin
from django.urls import path
from .views import HomePage
urlpatterns = [
    path('', HomePage),

]