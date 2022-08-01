from django.urls import path
from .views import PostView, CreatePostView, ExperiencePostView, CreateExperiencePostView, CategoryView, CreateCategoryView, CreateFormView

urlpatterns = [
    path('post/', PostView.as_view()),
    path('create-post/', CreatePostView.as_view()),
    path('create-experience', CreateExperiencePostView.as_view()),
    path('experience', ExperiencePostView.as_view()),
    path('category', CategoryView.as_view()),
    path('create-category', CreateCategoryView.as_view()),
    path('create-form', CreateFormView.as_view())
]