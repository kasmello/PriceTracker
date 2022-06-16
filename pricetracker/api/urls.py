from django.urls import path
from . import views

urlpatterns = [
    path('', views.GetFuel), 
    path('add/',views.AddFuel)
]