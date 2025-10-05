from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate, get_user_model
from .models import ContactMessage, Item, Booking

User = get_user_model()


# ========= BASE SERIALIZER FOR REGISTER ========= #
class BaseRegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        read_only_fields = ["id"]

    role = None  # To be set in child classes

    def validate_email(self, value):
        """Normalize email and check duplicates clearly"""
        email = value.strip().lower()   # normalize
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("This email is already registered.")
        return email

    def create(self, validated_data):
        password = validated_data.pop("password")
        email = validated_data["email"].strip().lower()
        username = validated_data.get("username") or email.split("@")[0]

        # ensure username is unique fallback
        if User.objects.filter(username=username).exists():
            base_username = username
            counter = 1
            while User.objects.filter(username=f"{base_username}{counter}").exists():
                counter += 1
            username = f"{base_username}{counter}"

        user = User.objects.create_user(
            email=email,
            username=username,
            password=password
        )
        if self.role:
            user.role = self.role
        user.save()
        return user


# ========= SPECIFIC ROLE REGISTRATIONS ========= #
class VoyagerRegisterSerializer(BaseRegisterSerializer):
    role = User.Role.VOYAGER


class AdminRegisterSerializer(BaseRegisterSerializer):
    role = User.Role.ADMIN


class ManagerRegisterSerializer(BaseRegisterSerializer):
    role = User.Role.MANAGER


class HeadCookRegisterSerializer(BaseRegisterSerializer):
    role = User.Role.HEAD_COOK


class SupervisorRegisterSerializer(BaseRegisterSerializer):
    role = User.Role.SUPERVISOR


# ========= CUSTOM TOKEN SERIALIZER ========= #
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom JWT serializer that:
    - Authenticates with email & password
    - Returns access + refresh tokens
    - Adds role, username, email, user_id in both the token and the response
    """

    username_field = "email"

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Embed custom claims inside the JWT itself
        token["user_id"] = user.id
        token["username"] = user.username
        token["email"] = user.email
        token["role"] = getattr(user, "role", "voyager")
        return token

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if not email or not password:
            raise serializers.ValidationError({"error": "Email and password are required."})

        user = authenticate(
            request=self.context.get("request"),
            email=email.lower().strip(),
            password=password
        )
        if user is None:
            raise serializers.ValidationError({"non_field_errors": ["Invalid email or password."]})

        # DEBUG: print the exact role for this user
        print(f"User '{user.username}' has role: '{user.role}'")

        # For parent class compatibility
        attrs["username"] = getattr(user, self.username_field)
        attrs["password"] = password

        data = super().validate(attrs)

        # Add extra info in the login response
        data.update({
            "user_id": user.id,
            "username": user.username,
            "email": user.email,
            "role": getattr(user, "role", "voyager"),
        })

        return data


# ========= CONTACT MESSAGE SERIALIZER ========= #
class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "message", "created_at"]
        read_only_fields = ["id", "created_at"]


# ========= ITEM SERIALIZER ========= #
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ["id", "name", "description", "category", "price", "created_at"]
        read_only_fields = ["id", "created_at"]


# ========= BOOKING SERIALIZER ========= #
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["id", "user", "type", "date", "status", "created_at"]
        read_only_fields = ["id", "user", "created_at"]
