import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { loginSchema } from "@/utils/validators";
import { LoginCredentials } from "@/types/auth.types";
import { Button, Input, Checkbox } from "@/components/common";
import { ROUTES } from "@/utils/constants";
import { useAuth } from "@/hooks/useAuth";

export const LoginForm: React.FC = () => {
  const { login, isLoggingIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginCredentials) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input
          label="Email Address"
          type="email"
          autoComplete="email"
          leftIcon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div>
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          leftIcon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
          error={errors.password?.message}
          {...register("password")}
        />
      </div>

      <div className="flex items-center justify-between">
        <Checkbox id="remember" label="Remember me" />

        <Link
          to={ROUTES.FORGOT_PASSWORD}
          className="text-sm text-primary-600 hover:text-primary-500"
        >
          Forgot your password?
        </Link>
      </div>

      <Button type="submit" fullWidth size="lg" isLoading={isLoggingIn}>
        Sign in
      </Button>

      <div className="text-center">
        <span className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to={ROUTES.REGISTER}
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Sign up
          </Link>
        </span>
      </div>
    </form>
  );
};
