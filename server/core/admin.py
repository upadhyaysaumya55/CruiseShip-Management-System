from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, CruiseShip, ContactMessage

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'role', 'is_active')
    search_fields = ('username', 'email')
    list_filter = ('role', 'is_active')
    ordering = ('email',)

@admin.register(CruiseShip)
class CruiseShipAdmin(admin.ModelAdmin):
    list_display = ('name', 'capacity', 'destination')
    search_fields = ('name', 'destination')
    ordering = ('name',)

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'message')
    search_fields = ('name', 'email')
    ordering = ('name',)
