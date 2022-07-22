from rest_framework import serializers
from .models import FuelPrice, FuelPlace


class FuelSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuelPlace
        fields = '__all__'

class FuelPriceSerializer(serializers.ModelSerializer):
    address = serializers.StringRelatedField(many=False, read_only=True)
    class Meta:
        model = FuelPrice
        fields = '__all__'