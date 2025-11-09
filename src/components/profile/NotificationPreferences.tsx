import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsAPI } from "@/api/endpoints/notification.api";
import {
  Card,
  CardContent,
  Checkbox,
  Select,
  Button,
  Spinner,
  Alert,
} from "@/components/common";
import { NotificationPreferencesRequest } from "@/types/notification.types";
import { EmailFrequency } from "@/utils/constants";
import { EMAIL_FREQUENCY, NOTIFICATION_TYPES } from "@/utils/constants";
import toast from "react-hot-toast";

export const NotificationPreferences: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    data: preferences,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notificationPreferences"],
    queryFn: notificationsAPI.getPreferences,
  });

  const updateMutation = useMutation({
    mutationFn: (data: NotificationPreferencesRequest) =>
      notificationsAPI.updatePreferences(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificationPreferences"] });
      toast.success("Notification preferences updated!");
    },
    onError: () => {
      toast.error("Failed to update preferences");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !preferences) {
    return (
      <Alert
        variant="error"
        message="Failed to load notification preferences"
      />
    );
  }

  const handleToggle = (
    field: keyof NotificationPreferencesRequest,
    value: boolean
  ) => {
    updateMutation.mutate({
      ...preferences,
      [field]: value,
    });
  };

  const handleArrayToggle = (
    field: "emailNotificationTypes" | "pushNotificationTypes",
    type: string
  ) => {
    const current = preferences[field] || [];
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];

    updateMutation.mutate({
      ...preferences,
      [field]: updated,
    });
  };

  const handleFrequencyChange = (frequency: EmailFrequency) => {
    updateMutation.mutate({
      ...preferences,
      emailFrequency: frequency,
    });
  };

  const notificationOptions = [
    {
      type: NOTIFICATION_TYPES.APPLICATION_RECEIVED,
      label: "New Applications",
    },
    {
      type: NOTIFICATION_TYPES.APPLICATION_APPROVED,
      label: "Application Approved",
    },
    {
      type: NOTIFICATION_TYPES.APPLICATION_REJECTED,
      label: "Application Rejected",
    },
    { type: NOTIFICATION_TYPES.PROJECT_UPDATED, label: "Project Updates" },
    { type: NOTIFICATION_TYPES.NEW_MESSAGE, label: "New Messages" },
    { type: NOTIFICATION_TYPES.REVIEW_RECEIVED, label: "New Reviews" },
  ];

  const frequencyOptions = [
    { value: EMAIL_FREQUENCY.IMMEDIATELY, label: "Immediately" },
    { value: EMAIL_FREQUENCY.DAILY, label: "Daily Digest" },
    { value: EMAIL_FREQUENCY.WEEKLY, label: "Weekly Summary" },
    { value: EMAIL_FREQUENCY.NEVER, label: "Never" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Email Notifications
          </h3>

          <div className="space-y-4">
            <Checkbox
              label="Enable email notifications"
              checked={preferences.emailEnabled}
              onChange={(e) => handleToggle("emailEnabled", e.target.checked)}
            />

            {preferences.emailEnabled && (
              <>
                <div className="ml-6 space-y-3 mt-4">
                  <p className="text-sm font-medium text-gray-700">
                    Send me emails for:
                  </p>
                  {notificationOptions.map(({ type, label }) => (
                    <Checkbox
                      key={type}
                      label={label}
                      checked={
                        preferences.emailNotificationTypes?.includes(type) ||
                        false
                      }
                      onChange={() =>
                        handleArrayToggle("emailNotificationTypes", type)
                      }
                    />
                  ))}
                </div>

                <div className="mt-6">
                  <Select
                    label="Email Frequency"
                    options={frequencyOptions}
                    value={preferences.emailFrequency}
                    onChange={(e) =>
                      handleFrequencyChange(e.target.value as EmailFrequency)
                    }
                  />
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Push Notifications
          </h3>

          <div className="space-y-4">
            <Checkbox
              label="Enable push notifications"
              checked={preferences.pushEnabled}
              onChange={(e) => handleToggle("pushEnabled", e.target.checked)}
            />

            {preferences.pushEnabled && (
              <div className="ml-6 space-y-3 mt-4">
                <p className="text-sm font-medium text-gray-700">
                  Send me push notifications for:
                </p>
                {notificationOptions.map(({ type, label }) => (
                  <Checkbox
                    key={type}
                    label={label}
                    checked={
                      preferences.pushNotificationTypes?.includes(type) || false
                    }
                    onChange={() =>
                      handleArrayToggle("pushNotificationTypes", type)
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
