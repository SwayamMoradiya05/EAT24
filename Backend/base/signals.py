from django.db.models.signals import pre_save,post_save
from django.contrib.auth.models import User  
from django.dispatch import receiver
from base.models import LaPinozz, LaMilano,StreetFood,BurgerKing,DominosPizza,KarnavatiDabeli,ShreeMarutinandan,PavBhaji

def updateUser(sender,instance,**kwargs):
    user=instance
    if user.email!= '':
        user.username=user.email
pre_save.connect(updateUser,sender=User)


def sync_order_from_restaurant(instance):
    order = instance.original_order
    order.isReceived = instance.isReceived
    order.isDelivered = instance.isDelivered
    order.isPaid = instance.isPaid
    order.receivedAt = instance.receivedAt
    order.deliveredAt = instance.deliveredAt
    order.isOutForDelivery = instance.isOutForDelivery
    order.outForDeliveryInMinutes = instance.outForDeliveryInMinutes
    order.itemsPrice = instance.itemsPrice
    order.paymentMethod = instance.paymentMethod
    order.taxPrice = instance.taxPrice
    order.shippingPrice = instance.shippingPrice
    order.totalPrice = instance.totalPrice
    order.paidAt = instance.paidAt

    order.save(update_fields=[
        'isReceived', 'isDelivered', 'isPaid', 'receivedAt', 'deliveredAt',
        'isOutForDelivery', 'outForDeliveryInMinutes', 'itemsPrice', 'paymentMethod',
        'taxPrice', 'shippingPrice', 'totalPrice', 'paidAt'
    ])


@receiver(post_save, sender=LaPinozz)
def update_from_lapinozz(sender, instance, created, **kwargs):
    if not created:
        sync_order_from_restaurant(instance)

@receiver(post_save, sender=LaMilano)
def update_from_lamilano(sender, instance, created, **kwargs):
    if not created:
        sync_order_from_restaurant(instance)

@receiver(post_save, sender=StreetFood)
def update_from_streetfood(sender, instance, created, **kwargs):
    if not created:
        sync_order_from_restaurant(instance)

@receiver(post_save, sender=KarnavatiDabeli)
def update_from_karnavati(sender, instance, created, **kwargs):
    if not created:
        sync_order_from_restaurant(instance)

@receiver(post_save, sender=ShreeMarutinandan)
def update_from_marutinandan(sender, instance, created, **kwargs):
    if not created:
        sync_order_from_restaurant(instance)

@receiver(post_save, sender=DominosPizza)
def update_from_dominos(sender, instance, created, **kwargs):
    if not created:
        sync_order_from_restaurant(instance)

@receiver(post_save, sender=BurgerKing)
def update_from_burgerking(sender, instance, created, **kwargs):
    if not created:
        sync_order_from_restaurant(instance)

@receiver(post_save, sender=PavBhaji)
def update_from_pavbhaji(sender, instance, created, **kwargs):
    if not created:
        sync_order_from_restaurant(instance)

# @receiver(post_save, sender=LaPinozz)
# def update_order_status_from_lapinozz(sender, instance, created, **kwargs):
    if not created:  # Only run if the LaPinozz instance was updated (not created)
        order = instance.original_order  # Get the related order

        # Update the corresponding order based on the LaPinozz fields
        order.isReceived = instance.isReceived
        order.isDelivered = instance.isDelivered
        order.isPaid = instance.isPaid  # Sync the isPaid field
        order.receivedAt = instance.receivedAt
        order.deliveredAt = instance.deliveredAt
        order.isOutForDelivery = instance.isOutForDelivery
        order.outForDeliveryInMinutes = instance.outForDeliveryInMinutes
        order.itemsPrice = instance.itemsPrice
        order.paymentMethod = instance.paymentMethod
        order.taxPrice = instance.taxPrice
        order.shippingPrice = instance.shippingPrice
        order.totalPrice = instance.totalPrice

        order.paidAt = instance.paidAt  # Sync the paidAt field if applicable

        # Save the updated order, but make sure we don't trigger the signal again
        order.save(update_fields=[
            'isReceived', 'isDelivered', 'isPaid', 'receivedAt', 'deliveredAt', 
            'isOutForDelivery', 'outForDeliveryInMinutes', 'itemsPrice', 'paymentMethod', 
            'taxPrice', 'shippingPrice', 'totalPrice', 'paidAt'
        ])