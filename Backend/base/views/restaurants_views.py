from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Restaurant
from base.serializers import RestaurantSerializer
@api_view(['GET'])
def getRestaurants(request):
    restaurants=Restaurant.objects.all()
    serializer=RestaurantSerializer(restaurants,many=True)
    return Response(serializer.data)
