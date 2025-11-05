import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { authAPI } from "@/api/endpoints/auth.api";
import { useAuthStore } from "@/store/authStore";
import { LoginCredentials, RegisterData } from "@/types/auth.types";
import { ROUTES } from "@/utils/constants";
import toast from "react-hot-toast";

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth, logout: logoutStore } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authAPI.login(credentials),
    onSuccess: (data) => {
      // Store auth data
      setAuth(
        {
          id: data.userId,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role,
        } as any,
        data.token
      );

      toast.success("Welcome back!");

      // Redirect based on role
      const from =
        (location.state as any)?.from ||
        (data.role === "VOLUNTEER"
          ? ROUTES.VOLUNTEER_DASHBOARD
          : ROUTES.ORGANIZATION_DASHBOARD);
      navigate(from, { replace: true });
    },
    onError: (error: any) => {
      toast.error(error.message || "Invalid email or password");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => authAPI.register(data),
    onSuccess: (data) => {
      // Store auth data
      setAuth(
        {
          id: data.userId,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role,
        } as any,
        data.token
      );

      toast.success("Registration successful!");

      // Redirect to appropriate dashboard
      navigate(
        data.role === "VOLUNTEER"
          ? ROUTES.VOLUNTEER_DASHBOARD
          : ROUTES.ORGANIZATION_DASHBOARD,
        { replace: true }
      );
    },
    onError: (error: any) => {
      toast.error(error.message || "Registration failed");
    },
  });

  const logout = () => {
    logoutStore();
    toast.success("Logged out successfully");
    navigate(ROUTES.LOGIN);
  };

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
  };
};
