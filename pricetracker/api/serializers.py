from rest_framework import serializers
from .models import FuelPrice, FuelPlace


class FuelSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuelPlace
        fields = '__all__'

class FuelPriceSerializer(serializers.ModelSerializer):
    date = serializers.StringRelatedField(many=False)
    place = serializers.StringRelatedField(many=False)
    class Meta:
        model = FuelPrice
        fields = '__all__'