from django.urls import path
from base.views import order_views as views

urlpatterns=[
    path('add/',views.addOrderItems,name='orders-add'),
    path('myorders/', views.getMyOrders, name='myorders'),
    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='user-order'),
    path('<int:pk>/received/', views.updateOrderToReceived, name='order-received'),
    path('<int:pk>/deliver/', views.updateOrderToDelivered, name='order-delivered'), 
    path('<str:pk>/out-for-delivery/', views.updateOrderToOutForDelivery, name='order-out-for-delivery'),

]