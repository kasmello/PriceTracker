from django.db import models

class Fuel(models.Model):
    name = models.CharField(max_length=70)
    price = models.IntegerField(default=0)


    def __str__(self):
        return self.name

