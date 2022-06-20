import datetime
import random
from .fuelwatch import FuelWatch
from django.shortcuts import render
from django.db.models import Q
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import FuelSerializer, FuelPriceSerializer
from .models import FuelPrices, FuelPlaces


@api_view(['GET'])
def GetFuel(request):
    fuels = FuelPlaces.objects.all()
    serializer = FuelSerializer(fuels, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def GetPrice(request, date_from=None, date_to=None):
    fuels = FuelPrices.objects.all()
    if date_from:
        fuels = fuels.filter(date__gte = date_from)
    if date_to:
        fuels = fuels.filter(date__lte = date_to)
    serializer = FuelPriceSerializer(fuels, many = True)
    return Response(serializer.data)


@api_view(['POST'])
def AddFuel(request):
    serializer = FuelSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response()

def AddData(days_from_today = 0):
    data = FuelWatch()
    for delta in range(days_from_today+1):
        d = datetime.date.today()-datetime.timedelta(days=delta)
        date_str=f'{d.day}/{d.month}/{d.year}'
        data.query(day=date_str)
        try:
            data_xml = data.get_xml
            FuelPrices.objects.filter(date__lt = datetime.date.today()-datetime.timedelta(days=30)).delete() #lt = less than 
            for store in data_xml:
                place, created = FuelPlaces.objects.get_or_create(
                    brand = store['brand'], address=store['address'],
                    defaults={
                        'location': store['location'].title(),
                        'phone': store['phone'],
                        'latitude': store['latitude'],
                        'longitude': store['longitude']
                    }
                )
                FuelPrices.objects.get_or_create(
                    place = place, date=store['date'],
                    defaults={
                        'brand': store['brand'],
                        'address': store['address'],
                        'price': store['price']
                    }
                )
                
                
                        
        except TypeError as e: ##happens when we cannot connect to rss
            print(f'ERROR: {e}')
            print('rip')


def Edit(request):
    context = {}
    if request.method == 'POST':
        AddData(days_from_today=7)
        
    return render(request, 'api.html')


