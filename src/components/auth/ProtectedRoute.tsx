import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { ROUTES, UserRole } from "@/utils/constants";
import { LoadingOverlay } from "@/components/common";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = ROUTES.LOGIN,
}) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // Show loading while checking auth status
  if (isAuthenticated === null) {
    return <LoadingOverlay message="Checking authentication..." />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate to={redirectTo} state={{ from: location.pathname }} replace />
    );
  }

  // Check role-based access
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return;
  }

  // Render children if all checks pass
  return <>{children}</>;
};

export const VolunteerRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ProtectedRoute allowedRoles={["VOLUNTEER"]}>{children}</ProtectedRoute>
  );
};

export const OrganizationRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ProtectedRoute allowedRoles={["ORGANIZATION"]}>{children}</ProtectedRoute>
  );
};
