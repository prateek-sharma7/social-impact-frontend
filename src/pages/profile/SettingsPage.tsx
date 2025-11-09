import React from "react";
import { PageHeader } from "@/components/layout";
import { Tabs, TabItem } from "@/components/common";
import { AccountSettingsPage } from "./AccountSettingsPage";
import { NotificationPreferences } from "@/components/profile/NotificationPreferences";

export const SettingsPage: React.FC = () => {
  const tabItems: TabItem[] = [
    {
      id: "notifications",
      label: "Notifications",
      content: <NotificationPreferences />,
    },
    {
      id: "account",
      label: "Account",
      content: <AccountSettingsPage />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Settings"
        subtitle="Manage your account settings and preferences"
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
