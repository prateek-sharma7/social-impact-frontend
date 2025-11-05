import React from "react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const RegisterPage: React.FC = () => {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Join our community and make a difference"
    >
      <RegisterForm />
    </AuthLayout>
  );
};
