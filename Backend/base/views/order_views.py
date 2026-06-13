from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from base.models import Restaurant,Restaurantmenu, Order, OrderItem, ShippingAddress,LaPinozz,LaMilano,StreetFood,KarnavatiDabeli,ShreeMarutinandan,DominosPizza,BurgerKing,PavBhaji
from base.serializers import RestaurantSerializer, OrderSerializer,RestaurantmenuSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User
from base.serializers import UserSerializer,UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status
from datetime import datetime   
from django.utils import timezone

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create order

        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            itemsPrice=data['itemsPrice'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )
        # (2) Create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            street=data['shippingAddress']['street'],
            city=data['shippingAddress']['city'],
            state=data['shippingAddress']['state'],
            postalCode=data['shippingAddress']['postalCode']
        )
         
       # Clone to restaurant-specific model (without affecting anything else)
        rest_id = orderItems[0].get('restaurantid')
        if rest_id == 4:
            LaPinozz.objects.create(
                original_order=order,  # Link to the order
                user=user,
                totalPrice=order.totalPrice,
                restaurant_id=4
    )
        elif rest_id == 16:
            LaMilano.objects.create(
        original_order=order,  # Link to the order
        user=user,
        totalPrice=order.totalPrice,
        restaurant_id=16
    )
        elif rest_id == 17:
            StreetFood.objects.create(
        original_order=order,  # Link to the order
        user=user,
        totalPrice=order.totalPrice,
        restaurant_id=17
    )
        elif rest_id == 18:
            KarnavatiDabeli.objects.create(
        original_order=order,  # Link to the order
        user=user,
        totalPrice=order.totalPrice,
        restaurant_id=18
    )
        elif rest_id == 19:
            ShreeMarutinandan.objects.create(
        original_order=order,  # Link to the order
        user=user,
        totalPrice=order.totalPrice,
        restaurant_id=19
    )
        elif rest_id == 20:
            DominosPizza.objects.create(
        original_order=order,  # Link to the order
        user=user,
        totalPrice=order.totalPrice,
        restaurant_id=20
    )
        elif rest_id == 22:
            BurgerKing.objects.create(
        original_order=order,  # Link to the order
        user=user,
        totalPrice=order.totalPrice,
        restaurant_id=22
    )
        elif rest_id == 23:
            PavBhaji.objects.create(
        original_order=order,  # Link to the order
        user=user,
        totalPrice=order.totalPrice,
        restaurant_id=23
    )
        # elif rest_id == 16:
        #     LaMilano.objects.create(original_order=order, user=user, totalPrice=order.totalPrice, restaurant_id=16)
        # Add similar lines for other restaurants (ID 17, 18, etc.)

        # Return main order response (important for payment to work)
        # serializer = OrderSerializer(order, many=False)
        # return Response(serializer.data) 

        # (3) Create order items adn set order to orderItem relationship
        for i in orderItems:
            dishid = Restaurantmenu.objects.get(id=i['id'])

            item = OrderItem.objects.create(
                dishid=dishid,
                order=order,
                name=dishid.name,
                quantity=i['quantity'],
                price=i['price'],
                img=dishid.img,
            )

            dishid.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Order was paid')

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

@api_view(['PUT'])

@permission_classes([IsAdminUser])
def updateOrderToReceived(request, pk):
    order = Order.objects.get(id=pk)
    order.isReceived = True
    order.receivedAt = timezone.now()
    order.save()
    return Response('Order marked as received')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToOutForDelivery(request, pk):
    order = Order.objects.get(id=pk)
    minutes = request.data.get('minutes', 0)
    try:
        minutes = int(minutes)
    except ValueError:
        return Response({'detail': 'Invalid minutes value'}, status=400)
    
    order.isOutForDelivery = True
    order.outForDeliveryInMinutes = minutes
    order.save()
    return Response({'detail': f'Order set to go out for delivery in {minutes} minutes'})

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(id=pk)
    order.isDelivered = True
    order.deliveredAt = timezone.now()
    order.save()
    return Response('Order marked as delivered')
