import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { PageHeader } from "@/components/layout";
import { ProfileView } from "@/components/profile/ProfileView";
import { Button, Spinner, Alert, EmptyState } from "@/components/common";
import { ChatBubbleLeftIcon, UserIcon } from "@heroicons/react/24/outline";
import { ROUTES } from "@/utils/constants";

export const PublicProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userId = Number(id);

  const { data: user, isLoading, error } = useUser(userId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-4xl mx-auto">
        <EmptyState
          icon={<UserIcon className="h-12 w-12" />}
          title="User not found"
          description="The user you're looking for doesn't exist or has been removed."
          actionLabel="Back to Projects"
          onAction={() => navigate(ROUTES.PROJECTS)}
        />
      </div>
    );
  }

  const handleSendMessage = () => {
    navigate(`${ROUTES.MESSAGES}?userId=${user.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title={`${user.firstName} ${user.lastName}'s Profile`}
        actions={
          <Button
            onClick={handleSendMessage}
            leftIcon={<ChatBubbleLeftIcon className="h-4 w-4" />}
          >
            Send Message
          </Button>
        }
      />

      <div className="mt-8">
        <ProfileView user={user} isOwnProfile={false} />
      </div>
    </div>
  );
};
