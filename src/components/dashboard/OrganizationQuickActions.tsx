import React from "react";
import { Link } from "react-router-dom";
import {
  PlusIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ChartBarIcon,
  MegaphoneIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { ROUTES } from "@/utils/constants";

interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

export const OrganizationQuickActions: React.FC = () => {
  const actions: QuickAction[] = [
    {
      title: "Create Project",
      description: "Post a new volunteer opportunity",
      icon: <PlusIcon className="h-6 w-6" />,
      href: ROUTES.CREATE_PROJECT,
      color: "bg-primary-100 text-primary-600",
    },
    {
      title: "Manage Projects",
      description: "View and edit your projects",
      icon: <ClipboardDocumentListIcon className="h-6 w-6" />,
      href: ROUTES.MY_PROJECTS,
      color: "bg-secondary-100 text-secondary-600",
    },
    {
      title: "Applications",
      description: "Review volunteer applications",
      icon: <DocumentTextIcon className="h-6 w-6" />,
      href: "/applications",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Volunteers",
      description: "Manage your volunteers",
      icon: <UserGroupIcon className="h-6 w-6" />,
      href: "/volunteers",
      color: "bg-accent-100 text-accent-600",
    },
    {
      title: "Analytics",
      description: "View performance metrics",
      icon: <ChartBarIcon className="h-6 w-6" />,
      href: ROUTES.ANALYTICS,
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Announcements",
      description: "Send updates to volunteers",
      icon: <MegaphoneIcon className="h-6 w-6" />,
      href: "/announcements",
      color: "bg-indigo-100 text-indigo-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {actions.map((action, index) => (
        <Link key={index} to={action.href} className="group">
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all group-hover:border-primary-300">
            <div className={`inline-flex p-3 rounded-lg ${action.color} mb-4`}>
              {action.icon}
            </div>
            <h4 className="text-base font-semibold text-gray-900 mb-1">
              {action.title}
            </h4>
            <p className="text-sm text-gray-600">{action.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
