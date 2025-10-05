from django.urls import path
from .views import (
    # Base
    index,

    # Registration
    RegisterVoyagerView,
    RegisterAdminView,
    RegisterManagerView,
    RegisterHeadCookView,
    RegisterSupervisorView,
    VoyagerBaseView,
    HeadCookBaseView,
    # Session login/logout
    session_login,
    session_logout,

    # Contact
    contact_api,

    # JWT
    CustomTokenObtainPairView,

    # Role-based features
    VoyagerCateringOrdersView,
    VoyagerStationeryOrdersView,
    VoyagerBookingView,
    AdminItemManagementView,
    ManagerViewBookings,
    HeadCookViewOrders,
    SupervisorViewOrders,
)
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path("", index, name="index"),

    # ===== Registration APIs =====
    path("voyager/register/", RegisterVoyagerView.as_view(), name="voyager-register"),
    path("admin/register/", RegisterAdminView.as_view(), name="admin-register"),
    path("manager/register/", RegisterManagerView.as_view(), name="manager-register"),
    path("head_cook/register/", RegisterHeadCookView.as_view(), name="head_cook-register"),
    path("supervisor/register/", RegisterSupervisorView.as_view(), name="supervisor-register"),

    # ===== Session login/logout =====
    path("session/login/", session_login, name="session-login"),
    path("session/logout/", session_logout, name="session-logout"),

    # ===== JWT Auth =====
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # ===== Contact =====
    path("contact/", contact_api, name="contact-api"),

    # ===== Voyager APIs =====
    path("voyager/", VoyagerBaseView.as_view(), name="voyager-base"),
    path("voyager/catering/", VoyagerCateringOrdersView.as_view(), name="voyager-catering"),
    path("voyager/stationery/", VoyagerStationeryOrdersView.as_view(), name="voyager-stationery"),
    path("voyager/bookings/", VoyagerBookingView.as_view(), name="voyager-bookings"),

    # ===== Admin APIs =====
    path("admin/items/", AdminItemManagementView.as_view(), name="admin-items"),
    path("admin/items/<int:pk>/", AdminItemManagementView.as_view(), name="admin-item-detail"),

    # ===== Manager APIs =====
    path("manager/bookings/", ManagerViewBookings.as_view(), name="manager-bookings"),

    # ===== HeadCook APIs =====
    path("head_cook/", HeadCookBaseView.as_view(), name="head_cook-base"),
    path("head_cook/orders/", HeadCookViewOrders.as_view(), name="head_cook-orders"),

    # ===== Supervisor APIs =====
    path("supervisor/orders/", SupervisorViewOrders.as_view(), name="supervisor-orders"),
]
