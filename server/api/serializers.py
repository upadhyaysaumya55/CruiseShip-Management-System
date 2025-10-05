from rest_framework import serializers
from .models import Item, Booking

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'category', 'price', 'description']


class BookingSerializer(serializers.ModelSerializer):
    # Optionally show nested item or user fields; keep simple for now
    class Meta:
        model = Booking
        fields = ['id', 'user', 'type', 'date', 'status']
        read_only_fields = ['user']
