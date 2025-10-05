from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Item, Booking
from .serializers import ItemSerializer, BookingSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

# Items: list all items (public or require auth depending on your app)
class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Item.objects.all().order_by('name')
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]  # require JWT auth to see items

    def perform_create(self, serializer):
        # Optionally restrict creation to staff users:
        if not self.request.user.is_staff:
            raise permissions.PermissionDenied("Only staff can create items.")
        serializer.save()

# Bookings: each user sees their own bookings; create attaches user
class BookingListCreateView(generics.ListCreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # show only bookings for the requesting user
        return Booking.objects.filter(user=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
