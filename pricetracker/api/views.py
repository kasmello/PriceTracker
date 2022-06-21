import datetime
import random
from .fuelwatch import FuelWatch
from django.shortcuts import render
from django.db.models import Q
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import FuelSerializer, FuelPriceSerializer
from .models import FuelPrice, FuelPlace, Date


@api_view(['GET'])
def GetFuel(request):
    fuels = FuelPlace.objects.all()
    serializer = FuelSerializer(fuels, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def GetPrice(request, date_from=None, date_to=None):

    dates = Date.objects.all()
    if date_from:
        dates = dates.filter(date__gte = date_from)
    if date_to:
        dates = dates.filter(date__lte = date_to)
    # if not dates:
    #     AddData(0) #very temp solution
    #     dates = dates.filter(date__gte = date_from).filter(date__lte = date_to)
    fuels = FuelPrice.objects.filter(date__in = dates)
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
            Date.objects.filter(date__lt = datetime.date.today()-datetime.timedelta(days=30)).delete() #lt = less than 
            for store in data_xml:
                place, created = FuelPlace.objects.get_or_create(
                    brand = store['brand'], address=store['address'],
                    defaults={
                        'location': store['location'].title(),
                        'phone': store['phone'],
                        'latitude': store['latitude'],
                        'longitude': store['longitude']
                    }
                )
                date, created = Date.objects.get_or_create(
                    date = store['date']
                )

                FuelPrice.objects.get_or_create(
                    place = place, date=date,
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
    if request.method == 'POST':
        if 'refresh' in request.POST:
            AddData(days_from_today=7)
        elif 'delete' in request.POST:
            FuelPrice.objects.all().delete()
    return render(request, 'api.html')




