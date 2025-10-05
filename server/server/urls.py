from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from django.conf import settings
from django.conf.urls.static import static

def home_view(request):
    return HttpResponse("Welcome to the Cruise Ship Management System API.")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", home_view, name="home"),

    # Core app (auth, token, registration, session, items, bookings, etc.)
    path("api/", include("core.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
