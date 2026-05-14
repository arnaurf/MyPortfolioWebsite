from django.contrib import admin
from django.urls import path, re_path
from django.views.generic.base import TemplateView
from .views import HomePage, Google
urlpatterns = [
    path('', HomePage),
    path('google15457510d2cba688.html', Google),
    re_path(r'^(?P<path>bio|experience|projects|contact|skills)/?$', HomePage),
    path('sitemap.xml', TemplateView.as_view(template_name="sitemap.xml", content_type="text/xml")),
]