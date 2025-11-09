import React, { useState } from "react";
import { useCurrentUser } from "@/hooks/useUser";
import { PageHeader } from "@/components/layout";
import { ProfileView } from "@/components/profile/ProfileView";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import { Spinner, Alert } from "@/components/common";

export const ProfilePage: React.FC = () => {
  const { data: user, isLoading, error } = useCurrentUser();
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <Alert
        variant="error"
        title="Error loading profile"
        message="Failed to load your profile. Please try again."
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title={isEditing ? "Edit Profile" : "My Profile"}
        subtitle={
          isEditing
            ? "Update your profile information"
            : "Manage your personal information and preferences"
        }
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Profile" },
        ]}
      />

      <div className="mt-8">
        {isEditing ? (
          <ProfileEditForm
            user={user}
            onCancel={() => setIsEditing(false)}
            onSuccess={() => setIsEditing(false)}
          />
        ) : (
          <ProfileView
            user={user}
            isOwnProfile={true}
            onEditClick={() => setIsEditing(true)}
          />
        )}
      </div>
    </div>
  );
};
