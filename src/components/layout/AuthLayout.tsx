import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { APP_NAME } from "@/utils/constants";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  const { isAuthenticated } = useAuthStore();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-primary-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold text-white">SI</span>
          </div>
        </div>
        <h1 className="mt-6 text-center text-3xl font-bold font-display text-gray-900">
          {APP_NAME}
        </h1>
        <h2 className="mt-2 text-center text-xl font-semibold text-gray-700">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-center text-sm text-gray-600">{subtitle}</p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-soft sm:rounded-xl sm:px-10">
          {children}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          © 2024 {APP_NAME}. All rights reserved.
        </p>
      </div>
    </div>
  );
};
