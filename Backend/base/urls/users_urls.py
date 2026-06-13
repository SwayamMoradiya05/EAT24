from django.urls import path
from base.views import users_views as views
from base.views import users_views as views

urlpatterns=[
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/',views.getUserProfile,name="users-profile"),
    path('register/',views.getRegisterUser,name="register"),
    path('profile/update/',views.updateUserProfile,name="users-profile-update"),
    path('',views.getUsers,name="users"),

    path('send-otp/', views.send_otp, name='send-otp'),
    path('verify-otp/', views.verify_otp, name='verify-otp'),
]