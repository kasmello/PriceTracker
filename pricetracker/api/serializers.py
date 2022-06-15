from rest_framework import serializers
from .models import GetFuel


class GetFuelSerializer(serializers.ModelSerializer):
    class Meta:
        model = GetFuel
        fields = ('id', 'name',)