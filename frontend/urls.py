from django.contrib import admin
from django.urls import path, re_path
from .views import HomePage, Google
urlpatterns = [
    path('', HomePage),
    path('google15457510d2cba688.html', Google),
    re_path(r'^.*$', HomePage),
]