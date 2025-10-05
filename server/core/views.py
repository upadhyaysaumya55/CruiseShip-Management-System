from django.contrib.auth import get_user_model, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import (
    VoyagerRegisterSerializer,
    AdminRegisterSerializer,
    ManagerRegisterSerializer,
    HeadCookRegisterSerializer,
    SupervisorRegisterSerializer,
    CustomTokenObtainPairSerializer,
    ContactMessageSerializer,
    ItemSerializer,
    BookingSerializer,
)
from .models import Item, Booking
from .permissions import IsVoyager, IsAdmin, IsManager, IsHeadCook, IsSupervisor

User = get_user_model()


# ========= INDEX =========
def index(request):
    return JsonResponse({"message": "Welcome to the Cruise Ship Management System API"})


# ========= SESSION LOGIN / LOGOUT =========
@csrf_exempt
def session_login(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST method required"}, status=405)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return JsonResponse(
            {"success": False, "message": "Email and password required"}, status=400
        )

    try:
        user = User.objects.get(email=email.lower().strip())
    except User.DoesNotExist:
        return JsonResponse({"success": False, "message": "Invalid credentials"}, status=401)

    if user.check_password(password):
        login(request, user)
        return JsonResponse(
            {
                "success": True,
                "username": user.username,
                "role": user.role,
                "user_id": user.id,
            }
        )
    return JsonResponse({"success": False, "message": "Invalid credentials"}, status=401)


@csrf_exempt
def session_logout(request):
    logout(request)
    return JsonResponse({"success": True, "message": "Logged out"})


# ========= CONTACT API =========
@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def contact_api(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": True, "message": "Message received successfully!"})
    return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# ========= REGISTER VIEWS =========
@method_decorator(csrf_exempt, name="dispatch")
class RegisterVoyagerView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = VoyagerRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "success": True,
                    "message": "Voyager registered successfully",
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "role": user.role,
                    },
                },
                status=status.HTTP_201_CREATED,
            )
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_exempt, name="dispatch")
class RegisterAdminView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = AdminRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {"success": True, "message": "Admin registered successfully", "user_id": user.id},
                status=status.HTTP_201_CREATED,
            )
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_exempt, name="dispatch")
class RegisterManagerView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = ManagerRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {"success": True, "message": "Manager registered successfully", "user_id": user.id},
                status=status.HTTP_201_CREATED,
            )
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_exempt, name="dispatch")
class RegisterHeadCookView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = HeadCookRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {"success": True, "message": "HeadCook registered successfully", "user_id": user.id},
                status=status.HTTP_201_CREATED,
            )
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_exempt, name="dispatch")
class RegisterSupervisorView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = SupervisorRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {"success": True, "message": "Supervisor registered successfully", "user_id": user.id},
                status=status.HTTP_201_CREATED,
            )
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# ========= CUSTOM LOGIN WITH JWT =========
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# ========= ROLE-BASED FEATURES =========
# ---- VOYAGER (also allow HeadCook here) ----
class VoyagerCateringOrdersView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, (IsVoyager | IsHeadCook)]

    def get(self, request):
        catering_items = Item.objects.filter(category="catering")
        return Response(ItemSerializer(catering_items, many=True).data)

    def post(self, request):
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, type="catering")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class VoyagerStationeryOrdersView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, (IsVoyager | IsHeadCook)]

    def get(self, request):
        stationery_items = Item.objects.filter(category="stationery")
        return Response(ItemSerializer(stationery_items, many=True).data)

    def post(self, request):
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, type="stationery")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class VoyagerBookingView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, (IsVoyager | IsHeadCook)]

    def post(self, request):
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# ---- ADMIN ----
class AdminItemManagementView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    def get(self, request, pk=None):
        if pk:
            try:
                item = Item.objects.get(pk=pk)
                return Response(ItemSerializer(item).data)
            except Item.DoesNotExist:
                return Response({"detail": "Item not found."}, status=status.HTTP_404_NOT_FOUND)
        items = Item.objects.all()
        return Response(ItemSerializer(items, many=True).data)

    def post(self, request):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            item = Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            return Response({"detail": "Item not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ItemSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            item = Item.objects.get(pk=pk)
            item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Item.DoesNotExist:
            return Response({"detail": "Item not found."}, status=status.HTTP_404_NOT_FOUND)


# ---- MANAGER ----
class ManagerViewBookings(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsManager]

    def get(self, request):
        bookings = Booking.objects.all()
        return Response(BookingSerializer(bookings, many=True).data)


# ---- HEAD COOK ----
class HeadCookViewOrders(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsHeadCook]

    def get(self, request):
        catering_orders = Booking.objects.filter(type="catering")
        return Response(BookingSerializer(catering_orders, many=True).data)


# ---- SUPERVISOR ----
class SupervisorViewOrders(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsSupervisor]

    def get(self, request):
        stationery_orders = Booking.objects.filter(type="stationery")
        return Response(BookingSerializer(stationery_orders, many=True).data)


# ---- VOYAGER BASE ----
class VoyagerBaseView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, (IsVoyager | IsHeadCook)]

    def get(self, request):
        return Response({
            "message": "Voyager API is working",
            "endpoints": [
                "/api/voyager/catering/",
                "/api/voyager/stationery/",
                "/api/voyager/bookings/"
            ]
        })

# ---- HEAD COOK BASE ----
class HeadCookBaseView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsHeadCook]

    def get(self, request):
        return Response({
            "role": "head_cook",
            "location": "Head Cook Dashboard",
            "message": "Welcome Head Cook!"
        })