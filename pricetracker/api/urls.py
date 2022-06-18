from django.urls import path
from .views import GetFuel,AddFuel,Edit,GetPrice

urlpatterns = [
    path('', GetFuel), 
    path('add/',AddFuel),
    path('edit/',Edit),
    path('price/', GetPrice)
]