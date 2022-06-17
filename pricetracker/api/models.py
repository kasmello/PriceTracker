from curses import def_prog_mode
import datetime
from django.db import models

DATE_INPUT_FORMATS = ['%Y-%m-%d']

class Fuel(models.Model):
    title = models.CharField(max_length=70, null=True)
    description = models.CharField(max_length=70, null=True)
    brand = models.CharField(max_length=70, default='Unknown')
    date = models.DateField(auto_now_add=False, default = datetime.date.today())
    price = models.FloatField()
    trading_name = models.CharField(max_length=70, null=True)
    location = models.CharField(max_length=70, null=True)
    address = models.CharField(max_length=70, null=True)
    phone = models.CharField(max_length=70, null=True)
    latitude = models.CharField(max_length=70, null=True)
    longitude = models.CharField(max_length=70, null=True)



    def __str__(self):
        return self.name

