from django.contrib import admin
from .models import Booking, Item

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('user', 'type', 'date', 'status')
    list_filter = ('type', 'status')
    search_fields = ('user__email', 'type')
    ordering = ('-date',)

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price')
    list_filter = ('category',)
    search_fields = ('name',)
    ordering = ('name',)
