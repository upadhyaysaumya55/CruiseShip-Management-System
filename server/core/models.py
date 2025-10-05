from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.conf import settings

# =======================
# Custom User Model
# =======================
class User(AbstractUser):
    email = models.EmailField(unique=True)

    class Role(models.TextChoices):
        VOYAGER = 'voyager', _('Voyager')
        ADMIN = 'admin', _('Admin')
        MANAGER = 'manager', _('Manager')
        HEAD_COOK = 'head_cook', _('Head Cook')
        SUPERVISOR = 'supervisor', _('Supervisor')

    role = models.CharField(max_length=20, choices=Role.choices, default=Role.VOYAGER)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email


# =======================
# Voyager Profile Model
# =======================
class Voyager(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="voyager_profile"
    )
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    joined_at = models.DateTimeField(default=timezone.now, editable=False)

    class Meta:
        verbose_name = "Voyager"
        verbose_name_plural = "Voyagers"

    def __str__(self):
        return self.user.email


# =======================
# CruiseShip Model
# =======================
class CruiseShip(models.Model):
    name = models.CharField(max_length=100)
    capacity = models.IntegerField()
    destination = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# =======================
# ContactMessage Model
# =======================
class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return f"{self.name} - {self.email}"

# =======================
# Item Model
# =======================
class Item(models.Model):
    CATEGORY_CHOICES = [
        ("catering", "Catering"),
        ("stationery", "Stationery"),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.category})"
    
# =======================
# Booking Model
# =======================
class Booking(models.Model):
    BOOKING_TYPES = [
        ("resort", "Resort"),
        ("movie", "Movie"),
        ("salon", "Salon"),
        ("fitness", "Fitness"),
        ("party", "Party"),
    ]

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("cancelled", "Cancelled"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="bookings"
    )
    type = models.CharField(max_length=50, choices=BOOKING_TYPES)
    date = models.DateField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.type} on {self.date} ({self.status})"