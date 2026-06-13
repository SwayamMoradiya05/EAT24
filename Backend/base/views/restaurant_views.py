from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Restaurant
from base.serializers import RestaurantSerializer
@api_view(['GET'])
def getRestaurant(request,pk):
    restaurant=Restaurant.objects.get(pk=pk)
    serializer=RestaurantSerializer(restaurant,context={"request":request})
    return Response(serializer.data)