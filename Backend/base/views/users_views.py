from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User
from base.serializers import UserSerializer,UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.core.cache import cache
import random
from django.core.mail import send_mail
from django.conf import settings 



# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self,attrs):
        data=super().validate(attrs)
        serializer=UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v
        return data
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer



@api_view(['POST'])
def getRegisterUser(request):
    data=request.data
    try:
        user=User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer=UserSerializerWithToken(user,many=False)
        return Response(serializer.data)
    except:
        message={'detail':"User with this email already exists!"}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user=request.user
    serializer=UserSerializerWithToken(user,many=False)
    data=request.data
    if data['password']!='':
        user.password=make_password(data['password'])
    user.save()
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user=request.user
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users=User.objects.all()
    serializer=UserSerializer(users,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getRoutes(request):
    return Response('Hello')


# OTP Generation and Email Sending
def generate_otp():
    return str(random.randint(100000, 999999))


def send_otp_email(email, otp):
    try:
        subject = 'Your OTP for Password Reset'
        message = f'Your OTP is: {otp}. It will expire in 5 minutes.'
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [email] 

        send_mail(subject, message, email_from, recipient_list)
 
    except Exception as e: 
        raise  # Re-raise so the outer try/except can catch it too


# Add this import if not already present
# from your_app.utils import generate_otp, send_otp_email

@api_view(['POST'])
def send_otp(request):
    email = request.data.get('email')
    
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Generate and store OTP
        otp = generate_otp() 

        cache_key = f'otp_{email}'
        cache.set(cache_key, otp, timeout=300) 

        # Send email
        send_otp_email(email, otp) 
        
        return Response({'message': 'OTP sent successfully'}, status=status.HTTP_200_OK)
    
    except Exception as e: 
        return Response({'error': 'Failed to send OTP', 'detail': str(e)},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
def verify_otp(request):
    email = request.data.get('email')
    otp = request.data.get('otp')
    new_password = request.data.get('new_password') 
    
    if not all([email, otp, new_password]):
         return Response({'error': 'Email, OTP and new password are required'}, 
                        status=status.HTTP_400_BAD_REQUEST)
    
    # Verify OTP
    cache_key = f'otp_{email}'
    stored_otp = cache.get(cache_key)
    
    
    if not stored_otp:
         return Response({'error': 'OTP expired or not generated'}, 
                        status=status.HTTP_400_BAD_REQUEST)
    
    if stored_otp != otp:
         return Response({'error': 'Invalid OTP'}, 
                        status=status.HTTP_400_BAD_REQUEST)
    
    # OTP verified - update password
    try:
        user = User.objects.get(email=email)
        user.set_password(new_password)
        user.save()

          
        # Clear OTP from cache
        cache.delete(cache_key)
        
        return Response({'message': 'Password updated successfully'}, 
                        status=status.HTTP_200_OK)
    
    except User.DoesNotExist:
          return Response({'error': 'User not found'}, 
                        status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
         return Response({'error': 'Password update failed'}, 
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)