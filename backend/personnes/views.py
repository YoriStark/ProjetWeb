from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Personne
from .serializers import PersonneSerializer

class PersonneListCreate(generics.ListCreateAPIView):
    queryset = Personne.objects.all().order_by('-id')
    serializer_class = PersonneSerializer