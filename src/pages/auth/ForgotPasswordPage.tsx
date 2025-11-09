import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EnvelopeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button, Input, Alert } from "@/components/common";
import { ROUTES } from "@/utils/constants";
import { emailSchema } from "@/utils/validators";
import toast from "react-hot-toast";
import { authAPI } from "@/api/endpoints/auth.api";

const forgotPasswordSchema = z.object({
  email: emailSchema,
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    setIsLoading(true);
    try {
      await authAPI.forgotPassword(data.email);
      setIsSubmitted(true);
      toast.success("Password reset link sent!");
    } catch (error) {
      toast.error("Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent you a password reset link"
      >
        <div className="space-y-6">
          <Alert
            variant="success"
            message="If an account exists with that email, you will receive a password reset link shortly."
          />

          <p className="text-sm text-gray-600 text-center">
            Didn't receive the email? Check your spam folder or try again.
          </p>

          <Link to={ROUTES.LOGIN}>
            <Button
              variant="outline"
              fullWidth
              leftIcon={<ArrowLeftIcon className="h-4 w-4" />}
            >
              Back to login
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a reset link"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          autoComplete="email"
          leftIcon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
          error={errors.email?.message}
          {...register("email")}
        />

        <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
          Send Reset Link
        </Button>

        <div className="text-center">
          <Link
            to={ROUTES.LOGIN}
            className="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            <span className="flex items-center justify-center gap-2">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to login
            </span>
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
