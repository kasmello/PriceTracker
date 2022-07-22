from curses import def_prog_mode
import datetime
from django.db import models

class FuelPlace(models.Model):
    brand = models.CharField(max_length=70, default='Unknown')
    location = models.CharField(max_length=70, null=True)
    address = models.CharField(max_length=70, null=True)
    phone = models.CharField(max_length=70, null=True)
    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)

    def __str__(self):
        return str(self.address + ', ' + self.location)


class FuelPrice(models.Model):
    brand = models.CharField(max_length=70, default='Unknown')
    price = models.FloatField()
    date = models.DateField(auto_now_add=False, default = datetime.date.today())
    place = models.ForeignKey(FuelPlace, related_name="places", on_delete=models.CASCADE)
    

    # def __str__(self):
    #     return (self.brand , self.address)

