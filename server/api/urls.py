from django.urls import path
from .views import ItemListCreateView, BookingListCreateView

urlpatterns = [
    path('items/', ItemListCreateView.as_view(), name='items'),
    path('bookings/', BookingListCreateView.as_view(), name='bookings'),
]
