import React from "react";
import { Link } from "react-router-dom";
import { Badge, Button } from "@/components/common";
import { formatRelativeTime } from "@/utils/helpers";
import { ROUTES } from "@/utils/constants";

interface NotificationDropdownProps {
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  onClose,
}) => {
  // Placeholder notifications
  const notifications = [
    {
      id: 1,
      title: "New volunteer application",
      message: 'John Doe applied to your "Beach Cleanup" project',
      time: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
      read: false,
    },
    {
      id: 2,
      title: "Application approved",
      message: 'Your application for "Food Drive" was approved',
      time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
    },
    {
      id: 3,
      title: "Project update",
      message: 'The "Community Garden" project has been updated',
      time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
    },
  ];

  return (
    <div className="absolute right-0 top-16 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 animate-slide-down">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          <Badge variant="primary" size="sm">
            {notifications.filter((n) => !n.read).length} new
          </Badge>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
              !notification.read ? "bg-primary-50" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">
                  {notification.title}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {formatRelativeTime(notification.time)}
                </p>
              </div>
              {!notification.read && (
                <div className="ml-3">
                  <div className="h-2 w-2 bg-primary-600 rounded-full" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-gray-200">
        <Link to={ROUTES.NOTIFICATIONS} onClick={onClose}>
          <Button variant="ghost" fullWidth size="sm">
            View all notifications
          </Button>
        </Link>
      </div>
    </div>
  );
};
