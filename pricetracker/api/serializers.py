from rest_framework import serializers
from .models import FuelPrices, FuelPlaces


class FuelSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuelPlaces
        fields = '__all__'

class FuelPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuelPrices
        fields = '__all__'