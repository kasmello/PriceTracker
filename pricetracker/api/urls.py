from django.urls import path
from .views import GetFuelView

urlpatterns = [
    path('get_fuel', GetFuelView.as_view()), 
]