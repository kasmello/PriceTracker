from .fuelwatch import FuelWatch
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import FuelSerializer
from .models import Fuel

# from .models import GetFuel

@api_view(['GET'])
def GetFuel(request):
    fuels = Fuel.objects.all()
    serializer = FuelSerializer(fuels, many = True)
    return Response(serializer.data)

@api_view(['POST'])
def AddFuel(request):
    serializer = FuelSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response()

def Edit(request):
    context = {}
    if request.method == 'POST':
        data = FuelWatch()
        data.query()
        data_json = data.get_json
        print(data_json)
        context['test'] = 'test'
    return render(request, 'api.html', context)


