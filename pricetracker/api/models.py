from curses import def_prog_mode
import datetime
from django.db import models

DATE_INPUT_FORMATS = ['%Y-%m-%d']

class FuelPlaces(models.Model):
    brand = models.CharField(max_length=70, default='Unknown')
    location = models.CharField(max_length=70, null=True)
    address = models.CharField(max_length=70, null=True)
    phone = models.CharField(max_length=70, null=True)
    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)

    # def __str__(self):
    #     return str(self.id)


class FuelPrices(models.Model):
    brand = models.CharField(max_length=70, default='Unknown')
    date = models.DateField(auto_now_add=False, default = datetime.date.today())
    price = models.FloatField()
    address = models.CharField(max_length=70, null=True)
    place = models.ForeignKey(FuelPlaces, on_delete=models.CASCADE)

    # def __str__(self):
    #     return (self.brand , self.address)

