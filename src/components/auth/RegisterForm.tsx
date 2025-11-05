import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { registerSchema } from "@/utils/validators";
import { RegisterData } from "@/types/auth.types";
import { Button, Input, Select } from "@/components/common";
import { ROUTES, USER_ROLES } from "@/utils/constants";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/common";

interface RegisterFormData extends RegisterData {
  confirmPassword: string;
}

export const RegisterForm: React.FC = () => {
  const { register: registerUser, isRegistering } = useAuth();
  const [selectedRole, setSelectedRole] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      role: undefined,
      organizationName: "",
      phoneNumber: "",
    },
  });

  const role = watch("role");

  const onSubmit = (data: RegisterFormData) => {
    const { confirmPassword, ...registerData } = data;
    registerUser(registerData);
  };

  const roleOptions = [
    { value: USER_ROLES.VOLUNTEER, label: "Volunteer" },
    { value: USER_ROLES.ORGANIZATION, label: "Organization" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Role Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          I want to register as:
        </label>
        <div className="grid grid-cols-2 gap-4">
          <Card
            className={`cursor-pointer transition-all ${
              role === USER_ROLES.VOLUNTEER
                ? "ring-2 ring-primary-600 bg-primary-50"
                : "hover:shadow-md"
            }`}
            onClick={() => {
              setSelectedRole(USER_ROLES.VOLUNTEER);
              register("role").onChange({
                target: { value: USER_ROLES.VOLUNTEER },
              });
            }}
            clickable
            padding="sm"
          >
            <div className="text-center">
              <UsersIcon className="h-12 w-12 mx-auto text-primary-600 mb-2" />
              <h4 className="font-semibold text-gray-900">Volunteer</h4>
              <p className="text-sm text-gray-600 mt-1">
                Join projects and make an impact
              </p>
            </div>
          </Card>

          <Card
            className={`cursor-pointer transition-all ${
              role === USER_ROLES.ORGANIZATION
                ? "ring-2 ring-primary-600 bg-primary-50"
                : "hover:shadow-md"
            }`}
            onClick={() => {
              setSelectedRole(USER_ROLES.ORGANIZATION);
              register("role").onChange({
                target: { value: USER_ROLES.ORGANIZATION },
              });
            }}
            clickable
            padding="sm"
          >
            <div className="text-center">
              <BuildingOfficeIcon className="h-12 w-12 mx-auto text-primary-600 mb-2" />
              <h4 className="font-semibold text-gray-900">Organization</h4>
              <p className="text-sm text-gray-600 mt-1">
                Post projects and find volunteers
              </p>
            </div>
          </Card>
        </div>
        {errors.role && (
          <p className="mt-2 text-sm text-red-600">{errors.role.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="First Name"
          leftIcon={<UserIcon className="h-5 w-5 text-gray-400" />}
          error={errors.firstName?.message}
          {...register("firstName")}
        />

        <Input
          label="Last Name"
          leftIcon={<UserIcon className="h-5 w-5 text-gray-400" />}
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        autoComplete="email"
        leftIcon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
        error={errors.email?.message}
        {...register("email")}
      />

      {role === USER_ROLES.ORGANIZATION && (
        <Input
          label="Organization Name"
          leftIcon={<BuildingOfficeIcon className="h-5 w-5 text-gray-400" />}
          error={errors.organizationName?.message}
          {...register("organizationName")}
        />
      )}

      <Input
        label="Phone Number"
        type="tel"
        placeholder="+1234567890"
        leftIcon={<PhoneIcon className="h-5 w-5 text-gray-400" />}
        error={errors.phoneNumber?.message}
        hint="Optional"
        {...register("phoneNumber")}
      />

      <Input
        label="Password"
        type="password"
        autoComplete="new-password"
        leftIcon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
        error={errors.password?.message}
        hint="At least 6 characters"
        {...register("password")}
      />

      <Input
        label="Confirm Password"
        type="password"
        autoComplete="new-password"
        leftIcon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <Button type="submit" fullWidth size="lg" isLoading={isRegistering}>
        Create Account
      </Button>

      <div className="text-center">
        <span className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to={ROUTES.LOGIN}
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Sign in
          </Link>
        </span>
      </div>
    </form>
  );
};
