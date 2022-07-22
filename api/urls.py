from django.urls import path
from .views import PostView, CreatePostView

urlpatterns = [
    path('post/', PostView.as_view()),
    path('create-post', CreatePostView.as_view()),
]