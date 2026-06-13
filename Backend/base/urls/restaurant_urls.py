from django.urls import path
from base.views import restaurant_views as views
urlpatterns=[
    path('<str:pk>/',views.getRestaurant,name="restaurant"),
]