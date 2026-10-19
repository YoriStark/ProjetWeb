from django.contrib import admin
from django.urls import path
from personnes.views import PersonneListCreate

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/personnes/', PersonneListCreate.as_view()),
]