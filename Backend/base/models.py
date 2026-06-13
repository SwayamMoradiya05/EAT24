from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.
class Restaurant(models.Model):
    id=models.AutoField(primary_key=True,editable=False)
    name=models.CharField(max_length=100,null=False,blank=False)
    description=models.TextField(max_length=200,null=False,blank=False)
    rating=models.DecimalField(max_digits=2,decimal_places=1,null=False,blank=False)
    time=models.IntegerField(null=False,blank=False)
    price=models.IntegerField(null=False,blank=False)
    path=models.ImageField(null=False,blank=False)
    def __str__(self):
        return self.name
class Restaurantmenu(models.Model):
    restaurant=models.ForeignKey(Restaurant,on_delete=models.CASCADE,related_name='content',default="")
    name=models.CharField(max_length=100,null=False,blank=False)
    price=models.IntegerField(null=False,blank=False)
    quantity=models.IntegerField(null=False,blank=False,default=1)
    description=models.TextField(max_length=200,null=False,blank=False)
    img=models.ImageField(null=False,blank=False)

    def __str__(self):
        return self.name
    
class Order(models.Model):
    isReceived = models.BooleanField(default=False)
    receivedAt = models.DateTimeField(null=True, blank=True)

    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(null=True, blank=True)
    
    isOutForDelivery = models.BooleanField(default=False)
    outForDeliveryInMinutes = models.IntegerField(null=True, blank=True)

    # isPreparing = models.BooleanField(default=False)
    # PreparingAt = models.DateTimeField(null=True, blank=True)
       
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    itemsPrice=models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False,default=0)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False,default=0)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False,default=0)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False,default=0)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=False)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)
    def __str__(self):
        return str(self.createdAt)


class OrderItem(models.Model):
    dishid = models.ForeignKey(Restaurantmenu, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    img = models.ImageField(null=False,blank=False,default="")
    id = models.AutoField(primary_key=True, editable=False)
    def __str__(self):
        return str(self.name)
    
class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    street = models.CharField(max_length=500, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    state = models.CharField(max_length=200, null=True, blank=True,default="")
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    id = models.AutoField(primary_key=True, editable=False)
    def __str__(self):
        return str(self.street)

# Example for LaPinozz
class LaPinozz(models.Model):
    isReceived = models.BooleanField(default=False)
    receivedAt = models.DateTimeField(null=True, blank=True)

    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(null=True, blank=True)
    
    isOutForDelivery = models.BooleanField(default=False)
    outForDeliveryInMinutes = models.IntegerField(null=True, blank=True)

    # isPreparing = models.BooleanField(default=False)
    # PreparingAt = models.DateTimeField(null=True, blank=True)

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    itemsPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=False)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    # Add foreign key relationship to the Order model
    original_order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='lapinozz_orders', null=True, blank=True)
    restaurant_id = models.IntegerField(null=True, blank=True)  # Restaurant ID, specific for LaPinozz

    def __str__(self):
        return str(self.original_order)
    class Meta:
        permissions = [
            ("can_access_Lapinoz", "Can access La Pino'z orders"),
        ]

# La Milano Pizzeria
class LaMilano(models.Model):
    isReceived = models.BooleanField(default=False)
    receivedAt = models.DateTimeField(null=True, blank=True)

    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(null=True, blank=True)

    isOutForDelivery = models.BooleanField(default=False)
    outForDeliveryInMinutes = models.IntegerField(null=True, blank=True)

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    itemsPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=False)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    original_order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='lamilano_orders', null=True, blank=True)
    restaurant_id = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return str(self.original_order)
    class Meta:
     permissions = [
        ("can_access_LaMilano", "Can access La Milano orders"),
    ]

 


# 99 Street Food
class StreetFood(models.Model):
    isReceived = models.BooleanField(default=False)
    receivedAt = models.DateTimeField(null=True, blank=True)

    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(null=True, blank=True)

    isOutForDelivery = models.BooleanField(default=False)
    outForDeliveryInMinutes = models.IntegerField(null=True, blank=True)

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    itemsPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=False)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    original_order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='streetfood_orders', null=True, blank=True)
    restaurant_id = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return str(self.original_order)
    class Meta:
        permissions = [
        ("can_access_StreetFood", "Can access Street Food orders")
    ]


# Karnavati Dabeli
class KarnavatiDabeli(models.Model):
    isReceived = models.BooleanField(default=False)
    receivedAt = models.DateTimeField(null=True, blank=True)

    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(null=True, blank=True)

    isOutForDelivery = models.BooleanField(default=False)
    outForDeliveryInMinutes = models.IntegerField(null=True, blank=True)

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    itemsPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=False)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    original_order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='karnavatidabeli_orders', null=True, blank=True)
    restaurant_id = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return str(self.original_order)

    class Meta:
     permissions = [
        ("can_access_KarnavatiDabeli", "Can access Karnavati Dabeli orders"),
    ]

# Shree Marutinandan
class ShreeMarutinandan(models.Model):
    isReceived = models.BooleanField(default=False)
    receivedAt = models.DateTimeField(null=True, blank=True)

    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(null=True, blank=True)

    isOutForDelivery = models.BooleanField(default=False)
    outForDeliveryInMinutes = models.IntegerField(null=True, blank=True)

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    itemsPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=False)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    original_order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='shreemarutinandan_orders', null=True, blank=True)
    restaurant_id = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return str(self.original_order)

    class Meta:
     permissions = [
       ("can_access_ShreeMarutinandan", "Can access Shree Marutinandan orders"),
    ]

# Dominos Pizza
class DominosPizza(models.Model):
    isReceived = models.BooleanField(default=False)
    receivedAt = models.DateTimeField(null=True, blank=True)

    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(null=True, blank=True)

    isOutForDelivery = models.BooleanField(default=False)
    outForDeliveryInMinutes = models.IntegerField(null=True, blank=True)

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    itemsPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=False)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    original_order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='dominospizza_orders', null=True, blank=True)
    restaurant_id = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return str(self.original_order)
    class Meta:
        permissions = [
       ("can_access_DominosPizza", "Can access Domino's Pizza orders"),
    ]

# Burger King
class BurgerKing(models.Model):
    isReceived = models.BooleanField(default=False)
    receivedAt = models.DateTimeField(null=True, blank=True)

    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(null=True, blank=True)

    isOutForDelivery = models.BooleanField(default=False)
    outForDeliveryInMinutes = models.IntegerField(null=True, blank=True)

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    itemsPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=False)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    original_order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='burgerking_orders', null=True, blank=True)
    restaurant_id = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return str(self.original_order)
    class Meta:
        permissions = [
       ("can_access_BurgerKing", "Can access Burger King orders"),
    ]


# Pav Bhaji
class PavBhaji(models.Model):
    isReceived = models.BooleanField(default=False)
    receivedAt = models.DateTimeField(null=True, blank=True)

    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(null=True, blank=True)

    isOutForDelivery = models.BooleanField(default=False)
    outForDeliveryInMinutes = models.IntegerField(null=True, blank=True)

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    itemsPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False, default=0)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=False)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    original_order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='pavbhaji_orders', null=True, blank=True)
    restaurant_id = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return str(self.original_order)
    class Meta:
        permissions = [
        ("can_access_PavBhaji", "Can access Pav Bhaji orders"),
    ]
