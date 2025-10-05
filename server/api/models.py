from django.db import models
from django.conf import settings
from django.utils import timezone

User = settings.AUTH_USER_MODEL  # string reference avoids import cycles

# =======================
# Booking Model
# =======================
class Booking(models.Model):
    BOOKING_TYPES = [
        ('resort', 'Resort'),
        ('movie', 'Movie'),
        ('salon', 'Salon'),
        ('fitness', 'Fitness'),
        ('party', 'Party'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='api_bookings',
        default=1  # default user id for existing rows
    )
    type = models.CharField(max_length=20, choices=BOOKING_TYPES, default='resort')
    date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return f"{self.user} - {self.get_type_display()} ({self.get_status_display()})"


# =======================
# Item Model
# =======================
class Item(models.Model):
    CATEGORY_CHOICES = [
        ('catering', 'Catering'),
        ('stationery', 'Stationery'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='catering')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"
