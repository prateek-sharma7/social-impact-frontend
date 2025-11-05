import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { ROUTES } from "@/utils/constants";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, fallback }) => {
  const navigate = useNavigate();
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    const isValid = checkAuth();
    if (!isValid) {
      navigate(ROUTES.LOGIN);
    }
  }, [checkAuth, navigate]);

  if (!isAuthenticated) {
    return <>{fallback || null}</>;
  }

  return <>{children}</>;
};
