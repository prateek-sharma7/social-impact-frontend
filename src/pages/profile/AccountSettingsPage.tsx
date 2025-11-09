import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHeader } from "@/components/layout";
import {
  Card,
  CardContent,
  Input,
  Button,
  Tabs,
  TabItem,
  Alert,
} from "@/components/common";
import { passwordSchema } from "@/utils/validators";
import { useCurrentUser } from "@/hooks/useUser";
import toast from "react-hot-toast";

const changePasswordSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ChangePasswordData = z.infer<typeof changePasswordSchema>;

export const AccountSettingsPage: React.FC = () => {
  const { data: user } = useCurrentUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onPasswordSubmit = async (data: ChangePasswordData) => {
    try {
      // TODO: Implement password change API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Password changed successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to change password");
    }
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      // TODO: Implement account deletion
      toast.error("Account deletion is not implemented yet");
    }
  };

  const tabItems: TabItem[] = [
    {
      id: "security",
      label: "Security",
      content: (
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Change Password
            </h3>

            <form
              onSubmit={handleSubmit(onPasswordSubmit)}
              className="space-y-6 max-w-md"
            >
              <Input
                label="Current Password"
                type="password"
                error={errors.currentPassword?.message}
                {...register("currentPassword")}
              />

              <Input
                label="New Password"
                type="password"
                error={errors.newPassword?.message}
                {...register("newPassword")}
              />

              <Input
                label="Confirm New Password"
                type="password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              <Button type="submit">Update Password</Button>
            </form>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "danger",
      label: "Danger Zone",
      content: (
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delete Account
            </h3>

            <Alert
              variant="warning"
              message="Once you delete your account, there is no going back. All your data will be permanently removed."
            />

            <div className="mt-6">
              <Button variant="danger" onClick={handleDeleteAccount}>
                Delete My Account
              </Button>
            </div>
          </CardContent>
        </Card>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Account Settings"
        subtitle="Manage your account security and preferences"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings" },
        ]}
      />

      <div className="mt-8">
        <Tabs items={tabItems} />
      </div>
    </div>
  );
};
