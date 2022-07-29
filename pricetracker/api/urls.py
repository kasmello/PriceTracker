from django.urls import path
from .views import GetFuel,AddFuel,Edit,GetPrice

urlpatterns = [
    path('', GetFuel), 
    path('add/',AddFuel),
    path('edit/',Edit),
    path('price/', GetPrice),
    path('price/address_id=<int:address_id>/', GetPrice),
    path('price/from=<str:date_from>_to=<str:date_to>/', GetPrice),
    path('price/from=<str:date_from>/', GetPrice),
    path('price/to=<str:date_to>/', GetPrice),
   
    
]