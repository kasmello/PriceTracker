from django.shortcuts import render
from rest_framework import generics, status
from .serializers import GetFuelSerializer

from .models import GetFuel

class GetFuelView(generics.ListAPIView):
    model = GetFuel
    serializer_class = GetFuelSerializer
