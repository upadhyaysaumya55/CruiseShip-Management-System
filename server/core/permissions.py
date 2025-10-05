from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied


class IsRole(BasePermission):
    """
    Base permission class for role-based access.
    Views must define `allowed_roles = ['role1', 'role2', ...]`
    or use the specific role-based classes below.
    """

    def has_permission(self, request, view):
        # User must be authenticated
        if not request.user or not request.user.is_authenticated:
            return False

        # Get roles defined in the view
        allowed_roles = getattr(view, "allowed_roles", [])
        user_role = getattr(request.user, "role", None)

        # Normalize roles to lowercase for comparison
        if isinstance(user_role, str):
            user_role = user_role.lower()
        allowed_roles = [r.lower() for r in allowed_roles]

        # If no allowed roles are defined, block access
        if not allowed_roles:
            raise PermissionDenied("No roles defined for this endpoint.")

        # If user role does not match allowed roles → deny
        if user_role not in allowed_roles:
            raise PermissionDenied(
                f"Access denied for role '{user_role}'. "
                f"Allowed roles: {allowed_roles}"
            )

        return True


# 🔹 Easy role-specific permissions
class IsVoyager(IsRole):
    def has_permission(self, request, view):
        view.allowed_roles = ["voyager"]
        return super().has_permission(request, view)


class IsAdmin(IsRole):
    def has_permission(self, request, view):
        view.allowed_roles = ["admin"]
        return super().has_permission(request, view)


class IsManager(IsRole):
    def has_permission(self, request, view):
        view.allowed_roles = ["manager"]
        return super().has_permission(request, view)


class IsHeadCook(IsRole):
    def has_permission(self, request, view):
        view.allowed_roles = ["head_cook"]
        return super().has_permission(request, view)


class IsSupervisor(IsRole):
    def has_permission(self, request, view):
        view.allowed_roles = ["supervisor"]
        return super().has_permission(request, view)
