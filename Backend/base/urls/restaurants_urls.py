from django.urls import path
from base.views import restaurants_views as views
urlpatterns=[
    path('',views.getRestaurants,name="restaurants"),
]