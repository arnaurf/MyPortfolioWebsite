from django.contrib import admin
from django.urls import path
from .views import HomePage, Google
urlpatterns = [
    path('', HomePage),
    path('google15457510d2cba688.html', Google),
]