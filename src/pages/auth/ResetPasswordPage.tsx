import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LockClosedIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button, Input, Alert } from "@/components/common";
import { ROUTES } from "@/utils/constants";
import { passwordSchema } from "@/utils/validators";
import toast from "react-hot-toast";
import { authAPI } from "@/api/endpoints/auth.api";

const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  if (!token) {
    return (
      <AuthLayout title="Invalid Reset Link">
        <Alert
          variant="error"
          message="This password reset link is invalid or has expired. Please request a new one."
        />
        <div className="mt-6">
          <Button fullWidth onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}>
            Request New Reset Link
          </Button>
        </div>
      </AuthLayout>
    );
  }

  const onSubmit = async (data: ResetPasswordData) => {
    setIsLoading(true);
    try {
      await authAPI.resetPassword(token, data.password);
      setIsSuccess(true);
      toast.success("Password reset successfully!");
      navigate(ROUTES.LOGIN);
    } catch (error) {
      toast.error("Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <AuthLayout title="Password Reset Successful">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircleIcon className="h-16 w-16 text-green-500" />
          </div>
          <p className="text-gray-600">
            Your password has been reset successfully. Redirecting to login...
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your new password below"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="New Password"
          type="password"
          autoComplete="new-password"
          leftIcon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
          error={errors.password?.message}
          hint="At least 6 characters"
          {...register("password")}
        />

        <Input
          label="Confirm New Password"
          type="password"
          autoComplete="new-password"
          leftIcon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
          Reset Password
        </Button>
      </form>
    </AuthLayout>
  );
};
